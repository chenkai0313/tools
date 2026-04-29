'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { convertAll, detectCase, CASE_FORMATS, type CaseFormat } from '@/lib/case'

export default function CaseToolPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)

  const [input, setInput] = useState('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [flashKey, setFlashKey] = useState<string | null>(null)

  const results = useMemo(() => {
    if (!input.trim()) return null
    return convertAll(input)
  }, [input])

  const detected = useMemo(() => {
    if (!input.trim()) return null
    return detectCase(input)
  }, [input])

  const handleCopy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setFlashKey(key)
    setTimeout(() => setCopiedKey(null), 1500)
    setTimeout(() => setFlashKey(null), 400)
  }, [])

  const handleSample = useCallback(() => {
    setInput('user_login_count')
  }, [])

  const DETECT_LABELS: Record<CaseFormat, string> = {
    camel: lang === 'zh' ? '驼峰' : 'camelCase',
    pascal: lang === 'zh' ? '帕斯卡' : 'PascalCase',
    snake: lang === 'zh' ? '下划线' : 'snake_case',
    screaming_snake: lang === 'zh' ? '大写下划线' : 'SCREAMING_SNAKE',
    kebab: lang === 'zh' ? '连字符' : 'kebab-case',
    screaming_kebab: lang === 'zh' ? '大写连字符' : 'SCREAMING-KEBAB',
    dot: lang === 'zh' ? '点号' : 'dot.case',
    screaming_dot: lang === 'zh' ? '大写点号' : 'SCREAMING.DOT',
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{lang === 'zh' ? '命名转换' : 'Case Converter'}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">
        {lang === 'zh' ? '命名风格转换' : 'Case Converter'}
      </h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? '驼峰、下划线、连字符、帕斯卡等命名风格互转，自动检测输入格式' : 'Convert between camelCase, snake_case, kebab-case, PascalCase and more. Auto-detects input format.'}
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
        {/* Input */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-dark-400">
            {lang === 'zh' ? '输入文本' : 'Input'}
          </span>
          <div className="flex gap-2">
            <button onClick={handleSample} className="text-[10px] text-dark-400 hover:text-dark-200 transition-colors">
              {lang === 'zh' ? '示例' : 'Sample'}
            </button>
            <button onClick={() => setInput('')} className="text-[10px] text-dark-400 hover:text-dark-200 transition-colors">
              {dict.tool.clear}
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'zh' ? '输入变量名，如 user_name、userName 等...' : 'Enter variable name, e.g. user_name, userName...'}
            rows={3}
            className="w-full rounded-lg border border-white/[0.06] bg-dark-800 px-4 py-3 text-sm font-mono text-dark-100 placeholder-dark-500 outline-none resize-none focus:border-indigo-500/40 transition-all"
          />
          {detected && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
              {DETECT_LABELS[detected]}
            </div>
          )}
        </div>

        {/* Results */}
        {results && (
          <div className="mt-6 space-y-1.5">
            {CASE_FORMATS.map(({ key, labelZh, labelEn }) => {
              const label = lang === 'zh' ? labelZh : labelEn
              const value = results[key]
              return (
                <div key={key}
                  onDoubleClick={() => handleCopy(value, key)}
                  className={`group relative flex items-center justify-between rounded-lg border px-4 py-2.5 cursor-pointer transition-all select-none ${
                    flashKey === key
                      ? 'border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                      : 'border-white/[0.06] bg-dark-800 hover:border-white/[0.1]'
                  }`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] text-dark-300 w-20 shrink-0 text-right font-medium">{label}</span>
                    <span className="text-sm font-mono text-dark-100">{value}</span>
                  </div>
                  <div className="shrink-0 ml-3">
                    {copiedKey === key ? (
                      <span className="text-[10px] font-medium text-indigo-300 animate-pulse">
                        {lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {lang === 'zh' ? '双击复制' : 'Double-click to copy'}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!input.trim() && (
          <div className="flex flex-col items-center justify-center py-16 text-dark-500">
            <span className="text-3xl mb-3">🔀</span>
            <p className="text-sm">
              {lang === 'zh' ? '输入变量名自动转换所有命名风格' : 'Enter a variable name to convert to all naming conventions'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
