'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
import yaml from 'js-yaml'
import { parse as parseToml, stringify as stringifyToml } from 'smol-toml'

type Format = 'yaml' | 'json' | 'toml' | 'ini' | 'properties' | 'env' | 'xml'

function detectFormat(input: string): Format | null {
  if (!input.trim()) return null
  const t = input.trim()
  // XML starts with <
  if (/^\s*</.test(t)) return 'xml'
  // JSON starts with { or [
  if (/^\s*[{[]/.test(t)) return 'json'
  // INI has [section]
  if (/^\[[\w.]+\]\s*$/m.test(t)) return 'ini'
  // TOML has key = "value" or [sections]
  if (/^[\w.]+ =\s/m.test(t) || /^\[[\w.]+\]/m.test(t)) return 'toml'
  // YAML has key: value
  if (/^[\w.]+:\s/m.test(t)) return 'yaml'
  // .env has KEY=VALUE (uppercase key)
  if (/^[A-Z_][A-Z0-9_]*=/m.test(t)) return 'env'
  // Properties key=value or key: value
  if (/^[\w.]+[=:]/m.test(t)) return 'properties'
  return 'yaml'
}

// --- JSON ---
function parseJSON(input: string): Record<string, unknown> {
  const parsed = JSON.parse(input)
  if (Array.isArray(parsed)) return { items: parsed }
  return parsed as Record<string, unknown>
}

// --- INI ---
function parseINI(input: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  let section = ''
  for (const raw of input.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith(';') || line.startsWith('#')) continue
    const m = line.match(/^\[(.+)\]$/)
    if (m) { section = m[1]; continue }
    const eq = line.indexOf('=')
    if (eq < 0) continue
    const key = line.slice(0, eq).trim()
    let val = line.slice(eq + 1).trim()
    // strip inline comment (respecting quotes)
    const ci = val.search(/[;#](?=(?:[^"]*"[^"]*")*[^"]*$)/)
    if (ci > 0) val = val.slice(0, ci).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
    if (section) {
      if (!result[section]) result[section] = {}
      ;(result[section] as Record<string, string>)[key] = val
    } else {
      result[key] = val
    }
  }
  return result
}

function stringifyINI(obj: Record<string, unknown>): string {
  let out = ''
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out += `[${k}]\n`
      for (const [sk, sv] of Object.entries(v as Record<string, unknown>))
        out += `${sk}=${String(sv)}\n`
      out += '\n'
    } else {
      out += `${k}=${String(v)}\n`
    }
  }
  return out
}

// --- .env ---
function parseEnv(input: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const raw of input.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq < 0) continue
    const key = line.slice(0, eq).trim()
    let val = line.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
    result[key] = val
  }
  return result
}

function stringifyEnv(obj: Record<string, unknown>): string {
  let out = ''
  for (const [k, v] of Object.entries(obj))
    if (typeof v !== 'object') out += `${k}=${String(v)}\n`
  return out
}

// --- XML ---
function parseXML(input: string): Record<string, unknown> {
  const doc = new DOMParser().parseFromString(input, 'text/xml')
  const root = doc.documentElement
  return { [root.tagName]: xmlNodeToObj(root) }
}

function xmlNodeToObj(node: Element): unknown {
  const obj: Record<string, unknown> = {}
  for (const attr of node.attributes) obj[`@${attr.name}`] = attr.value
  const children = [...node.children]
  const text = node.textContent?.trim() || ''
  if (children.length) {
    for (const child of children) {
      const tag = child.tagName
      const val = xmlNodeToObj(child)
      if (tag in obj) {
        if (!Array.isArray(obj[tag])) obj[tag] = [obj[tag]]
        ;(obj[tag] as unknown[]).push(val)
      } else {
        obj[tag] = val
      }
    }
    return obj
  }
  return text || obj
}

function stringifyXML(obj: Record<string, unknown>): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  for (const [k, v] of Object.entries(obj)) xml += xmlValToStr(v, k, 0)
  return xml
}

function xmlValToStr(val: unknown, tag: string, indent: number): string {
  const pad = '  '.repeat(indent)
  if (val == null) return `${pad}<${tag}/>\n`
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
    const esc = String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    return `${pad}<${tag}>${esc}</${tag}>\n`
  }
  if (Array.isArray(val)) return val.map(v => xmlValToStr(v, tag, indent)).join('')
  const obj = val as Record<string, unknown>
  let attrs = ''
  let body = ''
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('@')) attrs += ` ${k.slice(1)}="${String(v).replace(/"/g, '&quot;')}"`
    else body += xmlValToStr(v, k, indent + 1)
  }
  if (body) return `${pad}<${tag}${attrs}>\n${body}${pad}</${tag}>\n`
  return `${pad}<${tag}${attrs}/>\n`
}

function parseProperties(input: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const line of input.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('!')) continue
    const eqIdx = trimmed.indexOf('=')
    const colonIdx = trimmed.indexOf(':')
    const sepIdx = eqIdx > -1 && (colonIdx === -1 || eqIdx < colonIdx) ? eqIdx : colonIdx
    if (sepIdx === -1) continue
    const key = trimmed.slice(0, sepIdx).trim()
    let value = trimmed.slice(sepIdx + 1).trim()
    // Remove trailing comment
    const hashIdx = value.indexOf('#')
    if (hashIdx > 0) value = value.slice(0, hashIdx).trim()
    result[key] = value
  }
  return result
}

function stringifyProperties(obj: Record<string, unknown>, prefix = ''): string {
  let result = ''
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result += stringifyProperties(value as Record<string, unknown>, fullKey)
    } else {
      result += `${fullKey}=${String(value)}\n`
    }
  }
  return result
}

function tomlToObject(input: string): Record<string, unknown> {
  return parseToml(input) as unknown as Record<string, unknown>
}

function objectToToml(obj: Record<string, unknown>): string {
  return stringifyToml(obj as any)
}

function objectToYaml(obj: Record<string, unknown>): string {
  return yaml.dump(obj, { indent: 2, lineWidth: -1, noRefs: true })
}

export default function ConfigPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [input, setInput] = useState('')
  const [sourceFormat, setSourceFormat] = useState<Format>('yaml')
  const [targetFormat, setTargetFormat] = useState<Format>('toml')
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)
  const [convertError, setConvertError] = useState('')

  // Auto-resize input textarea
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [input])

  const result = useMemo(() => {
    if (!input.trim()) return ''
    setConvertError('')
    try {
      let obj: Record<string, unknown>
      switch (sourceFormat) {
        case 'yaml':
          obj = yaml.load(input) as Record<string, unknown>
          break
        case 'json':
          obj = parseJSON(input)
          break
        case 'toml':
          obj = parseToml(input) as unknown as Record<string, unknown>
          break
        case 'ini':
          obj = parseINI(input)
          break
        case 'properties':
          obj = parseProperties(input)
          break
        case 'env':
          obj = parseEnv(input)
          break
        case 'xml':
          obj = parseXML(input)
          break
      }
      switch (targetFormat) {
        case 'yaml':
          return objectToYaml(obj)
        case 'json':
          return JSON.stringify(obj, null, 2)
        case 'toml':
          return objectToToml(obj)
        case 'ini':
          return stringifyINI(obj)
        case 'properties':
          return stringifyProperties(obj)
        case 'env':
          return stringifyEnv(obj)
        case 'xml':
          return stringifyXML(obj)
      }
    } catch (e) {
      setConvertError(e instanceof Error ? e.message : String(e))
      return ''
    }
  }, [input, sourceFormat, targetFormat])

  const handleCopy = useCallback(async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setFlash(true)
    setTimeout(() => setCopied(false), 1500)
    setTimeout(() => setFlash(false), 400)
  }, [result])

  const formats: Format[] = ['yaml', 'json', 'toml', 'ini', 'properties', 'env', 'xml']
  const formatLabels: Record<Format, string> = {
    yaml: 'YAML', json: 'JSON', toml: 'TOML', ini: 'INI',
    properties: 'Properties', env: '.env', xml: 'XML',
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.config}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.config}</h1>
      <div className="mb-8 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '现代软件开发中配置文件格式繁多——Spring Boot 用 YAML，Node.js 用 JSON，Python 用 TOML，Java 用 Properties，Docker 用 .env，传统系统用 INI 和 XML。在不同项目之间切换时，格式转换是高频需求。这个工具支持 7 种配置格式之间的互相转换，一个粘贴即可完成。'
            : 'Modern software projects use a variety of config formats — Spring Boot uses YAML, Node.js uses JSON, Python uses TOML, Java uses Properties, Docker uses .env, and legacy systems use INI or XML. Switching between projects means constant format conversion. This tool converts between 7 config formats — paste once, convert instantly.'}
        </p>
        <p>
          {lang === 'zh'
            ? '支持 YAML、JSON、TOML、INI、Properties、.env、XML 七种格式互转。自动检测源格式，实时转换，格式不匹配时有明确提示。所有转换在浏览器本地完成——你的配置文件内容不会上传到任何服务器。'
            : 'Bidirectional conversion between YAML, JSON, TOML, INI, Properties, .env, and XML. Auto-detects source format, converts in real time, and warns on format mismatches. All conversion is client-side — your config file content never leaves your browser.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Format Selection */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-dark-400">{lang === 'zh' ? '从' : 'From'}:</span>
              {formats.map((f) => (
                <button
                  key={f}
                  onClick={() => setSourceFormat(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    sourceFormat === f
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
                >
                  {formatLabels[f]}
                </button>
              ))}
            </div>
            <span className="text-dark-500">→</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-dark-400">{lang === 'zh' ? '到' : 'To'}:</span>
              {formats.map((f) => (
                <button
                  key={f}
                  onClick={() => setTargetFormat(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    targetFormat === f
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
                >
                  {formatLabels[f]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Split editors */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Input */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-dark-400 font-mono">{formatLabels[sourceFormat]}</span>
              {detectFormat(input) && detectFormat(input) !== sourceFormat && (
                <span className="text-xs text-amber-400">
                  {lang === 'zh' ? '检测到格式不匹配' : 'Format mismatch detected'}
                </span>
              )}
            </div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'zh' ? `输入 ${formatLabels[sourceFormat]} 内容...` : `Enter ${formatLabels[sourceFormat]} content...`}
              className="w-full min-h-[200px] rounded-lg border border-white/[0.06] bg-dark-950/50 px-4 py-2.5 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all resize-y overflow-hidden"
            />
          </div>

          {/* Output */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-dark-400 font-mono">{formatLabels[targetFormat]}</span>
            </div>
            {result ? (
              <pre
                onDoubleClick={handleCopy}
                className={`relative rounded-lg px-4 py-3 cursor-pointer select-none group transition-all text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre ${
                  flash
                    ? 'bg-indigo-500/15 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
                    : 'bg-dark-950/50 hover:bg-dark-950/70'
                }`}
              >
                <div className="absolute top-2 right-3 text-xs text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied ? (
                    <span className="text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
                  ) : (
                    lang === 'zh' ? '双击复制' : 'Copy'
                  )}
                </div>
                <code className="text-dark-100">{result}</code>
              </pre>
            ) : (
              <div className="flex items-center justify-center py-12 text-dark-400">
                <span className="text-sm">{lang === 'zh' ? '输入内容后自动转换' : 'Enter content to convert'}</span>
              </div>
            )}
          </div>
        </div>

        {convertError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-sm text-red-300 font-mono">{convertError}</p>
          </div>
        )}
      </div>

      {toolContent.config[lang as 'zh' | 'en']}
    </div>
  )
}
