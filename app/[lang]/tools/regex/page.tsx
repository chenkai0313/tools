'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
import RelatedTools from '@/components/RelatedTools'

export default function RegexPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [text, setText] = useState('')
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('gm')
  const [error, setError] = useState('')

  const matches = useMemo(() => {
    if (!text.trim() || !pattern.trim()) return null
    setError('')
    try {
      const regex = new RegExp(pattern, flags)
      const results: Array<{ full: string; groups: string[]; index: number }> = []
      let match: RegExpExecArray | null
      const global = flags.includes('g')

      if (global) {
        while ((match = regex.exec(text)) !== null) {
          results.push({
            full: match[0],
            groups: match.slice(1),
            index: match.index,
          })
          if (match.index === regex.lastIndex) regex.lastIndex++
        }
      } else {
        match = regex.exec(text)
        if (match) {
          results.push({
            full: match[0],
            groups: match.slice(1),
            index: match.index,
          })
        }
      }

      return results
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      return null
    }
  }, [text, pattern, flags])

  // Highlight matches in text
  const highlighted = useMemo(() => {
    if (!text.trim() || !pattern.trim()) return null
    try {
      const regex = new RegExp(pattern, flags)
      const parts: Array<{ type: 'match' | 'text'; content: string }> = []
      let lastIndex = 0
      const global = flags.includes('g')

      let match: RegExpExecArray | null
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
        }
        parts.push({ type: 'match', content: match[0] })
        lastIndex = match.index + match[0].length
        if (!global || match.index === regex.lastIndex) break
      }
      if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.slice(lastIndex) })
      }
      return parts.length > 0 ? parts : null
    } catch {
      return null
    }
  }, [text, pattern, flags])

  const toggleFlag = (f: string) => {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.regex}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.regex}</h1>
      <div className="mb-8 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '正则表达式（Regular Expression）是文本处理的"瑞士军刀"——表单验证、日志解析、数据清洗、代码重构中的查找替换，正则无处不在。但正则的语法晦涩难读，写错一个字符就完全匹配不到。实时反馈是调试正则的最有效方式。'
            : 'Regular expressions are the Swiss Army knife of text processing — form validation, log parsing, data cleaning, find-and-replace in code refactoring — regex is everywhere. But the syntax is dense and unforgiving; one wrong character and nothing matches. Real-time feedback is the most effective way to debug regex.'}
        </p>
        <p>
          {lang === 'zh'
            ? '这个工具提供实时匹配高亮、捕获分组展示、匹配位置定位和语法错误提示。支持 g/i/m/s/u/y 全部 6 种 flags。输入正则和测试文本，毫秒级看到匹配结果——所见即所得。'
            : 'This tool provides real-time match highlighting, capture group display, match position tracking, and syntax error feedback. Supports all 6 flags: g, i, m, s, u, y. Enter a pattern and test text to see matches in milliseconds — WYSIWYG for regex.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Pattern Input */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <label className="block text-xs text-dark-300 mb-2">
            {lang === 'zh' ? '正则表达式' : 'Regular Expression'}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-dark-400 text-sm font-mono">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder={lang === 'zh' ? '输入正则...' : 'Enter regex...'}
              className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all"
            />
            <span className="text-dark-400 text-sm font-mono">/{flags}</span>
          </div>

          {/* Flags */}
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
            {(['g', 'i', 'm', 's', 'u', 'y'] as const).map((f) => (
              <button
                key={f}
                onClick={() => toggleFlag(f)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
                  flags.includes(f)
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-dark-400 border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                <span className="font-mono">{f}</span>
                <span className="text-dark-300 font-mono">{dict.tool.flags[f]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Test Text */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <label className="block text-xs text-dark-300 mb-2">
            {lang === 'zh' ? '测试文本' : 'Test Text'}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={lang === 'zh' ? '输入要匹配的文本...' : 'Enter text to match...'}
            rows={6}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all resize-y"
          />

          {/* Highlighted result */}
          {highlighted && (
            <div className="mt-3 rounded-lg bg-dark-950/50 px-4 py-3 text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {highlighted.map((part, i) =>
                part.type === 'match' ? (
                  <span key={i} className="bg-indigo-500/30 text-indigo-200 rounded px-0.5">{part.content}</span>
                ) : (
                  <span key={i} className="text-dark-200">{part.content}</span>
                )
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-sm text-red-300 font-mono">{error}</p>
          </div>
        )}

        {matches !== null && !error && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-dark-400">
                {lang === 'zh' ? `匹配结果 (${matches.length} 处)` : `Matches (${matches.length})`}
              </span>
            </div>
            {matches.length === 0 ? (
              <p className="text-sm text-dark-400">{lang === 'zh' ? '无匹配' : 'No matches'}</p>
            ) : (
              <div className="space-y-1">
                {matches.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-white/[0.04] px-3 py-2 text-sm font-mono">
                    <span className="shrink-0 text-xs text-dark-500 w-6">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-indigo-200 truncate">{m.full}</div>
                      {m.groups.length > 0 && (
                        <div className="text-xs text-dark-400 mt-0.5">
                          {lang === 'zh' ? '捕获组' : 'Groups'}: {m.groups.map((g, j) => (
                            <span key={j} className="mr-2">${j + 1}=<span className="text-dark-300">{g}</span></span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-dark-500">{lang === 'zh' ? '位置' : 'pos'}: {m.index}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {toolContent.regex[lang as 'zh' | 'en']}
      <RelatedTools lang={lang} current="regex" />
    </div>
  )
}
