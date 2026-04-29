'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import yaml from 'js-yaml'
import { parse as parseToml, stringify as stringifyToml } from 'smol-toml'

type Format = 'yaml' | 'toml' | 'properties'

function detectFormat(input: string): Format | null {
  if (!input.trim()) return null
  // Try YAML first
  if (input.includes(': ') || input.includes(':\n')) return 'yaml'
  // TOML has [sections] or key = "value"
  if (/^\[[\w.]+\]/m.test(input) || /^[\w.]+ =\s/m.test(input)) return 'toml'
  // Properties has key=value or key: value
  if (/^[\w.]+[=:]/m.test(input)) return 'properties'
  return 'yaml'
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

function yamlToObject(input: string): Record<string, unknown> {
  return yaml.load(input) as Record<string, unknown>
}

function objectToYaml(obj: Record<string, unknown>): string {
  return yaml.dump(obj, { indent: 2, lineWidth: -1, noRefs: true })
}

export default function ConfigPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [input, setInput] = useState('')
  const [sourceFormat, setSourceFormat] = useState<Format>('yaml')
  const [targetFormat, setTargetFormat] = useState<Format>('toml')
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)
  const [convertError, setConvertError] = useState('')

  const result = useMemo(() => {
    if (!input.trim()) return ''
    setConvertError('')
    try {
      let obj: Record<string, unknown>
      switch (sourceFormat) {
        case 'yaml':
          obj = yamlToObject(input)
          break
        case 'toml':
          obj = tomlToObject(input)
          break
        case 'properties':
          obj = parseProperties(input)
          break
      }
      switch (targetFormat) {
        case 'yaml':
          return objectToYaml(obj)
        case 'toml':
          return objectToToml(obj)
        case 'properties':
          return stringifyProperties(obj)
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

  const formats: Format[] = ['yaml', 'toml', 'properties']
  const formatLabels: Record<Format, string> = { yaml: 'YAML', toml: 'TOML', properties: 'Properties' }

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
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? 'YAML、TOML、Properties 格式互转' : 'Convert between YAML, TOML, and Properties'}
      </p>

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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'zh' ? `输入 ${formatLabels[sourceFormat]} 内容...` : `Enter ${formatLabels[sourceFormat]} content...`}
              rows={12}
              className="w-full rounded-lg border border-white/[0.06] bg-dark-950/50 px-4 py-2.5 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all resize-y"
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
    </div>
  )
}
