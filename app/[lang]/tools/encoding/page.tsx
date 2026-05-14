'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
import RelatedTools from '@/components/RelatedTools'

type Mode = 'encode' | 'decode'
type Encoding = 'unicode' | 'url'

export default function EncodingPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [input, setInput] = useState('')
  const [encoding, setEncoding] = useState<Encoding>('url')
  const [mode, setMode] = useState<Mode>('encode')
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)

  const result = useMemo(() => {
    if (!input.trim()) return ''
    try {
      if (encoding === 'url') {
        return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input)
      } else {
        // Unicode
        if (mode === 'encode') {
          return [...input].map(c => {
            const code = c.charCodeAt(0)
            return code > 127 ? `\\u${code.toString(16).padStart(4, '0')}` : c
          }).join('')
        } else {
          return input.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        }
      }
    } catch {
      return lang === 'zh' ? '转换失败，请检查输入内容' : 'Conversion failed, check input'
    }
  }, [input, encoding, mode, lang])

  const handleCopy = useCallback(async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setFlash(true)
    setTimeout(() => setCopied(false), 1500)
    setTimeout(() => setFlash(false), 400)
  }, [result])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.encoding}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.encoding}</h1>
      <div className="mb-8 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '编码（Encoding）不是加密——它不保护数据安全，而是解决"如何让计算机安全地处理特殊字符"的问题。URL 编码将中文和特殊符号转为 %XX 格式以便在网址中传输；Unicode 编码将非 ASCII 字符转为 \\uXXXX 格式以便在 JavaScript 源码中使用。这是每个 Web 开发者的日常工具。'
            : 'Encoding is not encryption — it doesn\'t protect data; it solves the problem of "how to safely handle special characters in computers." URL encoding converts Chinese characters and special symbols to %XX format for safe URL transmission. Unicode encoding converts non-ASCII characters to \\uXXXX format for use in JavaScript source code. A daily tool for every web developer.'}
        </p>
        <p>
          {lang === 'zh'
            ? '支持 Unicode 编解码和 URL 百分号编解码双向转换。输入中文自动得到 \\uXXXX 格式，粘贴百分号编码的 URL 自动还原为可读文本。所有处理在浏览器端完成。'
            : 'Bidirectional Unicode and URL percent-encoding/decoding. Type Chinese to instantly get \\uXXXX format; paste a percent-encoded URL to decode it back to readable text. All processing is client-side.'}
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
        {/* Encoding Type */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setEncoding('url')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              encoding === 'url'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
            }`}
          >
            URL
          </button>
          <button
            onClick={() => setEncoding('unicode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              encoding === 'unicode'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
            }`}
          >
            Unicode
          </button>
        </div>

        {/* Mode */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'encode'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
            }`}
          >
            {lang === 'zh' ? '编码 ▸' : 'Encode ▸'}
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'decode'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
            }`}
          >
            {lang === 'zh' ? '◂ 解码' : '◂ Decode'}
          </button>
        </div>

        {/* Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'zh' ? `输入要${mode === 'encode' ? '编码' : '解码'}的文本...` : `Enter text to ${mode}...`}
          rows={4}
          className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 text-sm text-dark-50 placeholder-dark-400 outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all font-mono resize-y"
        />

        {/* Result */}
        {result && (
          <div
            onDoubleClick={handleCopy}
            className={`mt-4 rounded-lg px-4 py-3 cursor-pointer select-none group transition-all ${
              flash
                ? 'bg-indigo-500/15 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
                : 'bg-white/[0.04] hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-dark-400">
                {mode === 'encode' ? (lang === 'zh' ? '编码结果' : 'Encoded') : (lang === 'zh' ? '解码结果' : 'Decoded')}
              </span>
              <span className="text-xs text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {copied ? (
                  <span className="text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
                ) : (
                  lang === 'zh' ? '双击复制' : 'Double-click to copy'
                )}
              </span>
            </div>
            <span className="text-sm text-dark-100 font-mono break-all">{result}</span>
          </div>
        )}
      </div>

      {toolContent.encoding[lang as 'zh' | 'en']}
      <RelatedTools lang={lang} current="encoding" />
    </div>
  )
}
