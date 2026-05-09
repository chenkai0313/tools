'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/i18n'
import { toRoman, fromRoman, getCurrentYearRoman } from '@/lib/roman'
import { toolContent } from '@/components/ToolContent'

export default function RomanNumeralPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState('')

  const result = useMemo(() => {
    const trimmed = input.trim()
    if (!trimmed) return { arabic: null, roman: null, error: null }

    // Try as Arabic number
    const num = parseInt(trimmed, 10)
    if (!isNaN(num) && num >= 1 && num <= 3999) {
      return { arabic: num, roman: toRoman(num), error: null }
    }

    // Try as Roman numeral
    const romanVal = fromRoman(trimmed)
    if (romanVal !== null) {
      return { arabic: romanVal, roman: trimmed.toUpperCase(), error: null }
    }

    return { arabic: null, roman: null, error: lang === 'zh' ? '请输入有效数字（1-3999）或罗马数字' : 'Enter a valid number (1-3999) or Roman numeral' }
  }, [input, lang])

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const currentYearRoman = getCurrentYearRoman()

  const guide = [
    { roman: 'I', arabic: 1 },
    { roman: 'V', arabic: 5 },
    { roman: 'X', arabic: 10 },
    { roman: 'L', arabic: 50 },
    { roman: 'C', arabic: 100 },
    { roman: 'D', arabic: 500 },
    { roman: 'M', arabic: 1000 },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-dark-50 mb-2">{dict.nav['roman-numeral']}</h1>
      <p className="text-sm text-dark-400 mb-6">
        {lang === 'zh' ? '输入阿拉伯数字或罗马数字，自动识别并双向转换' : 'Enter Arabic or Roman numerals — auto-detected and converted both ways'}
      </p>

      {/* Input */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-6">
        <label className="text-sm font-medium text-dark-200 mb-2 block">
          {lang === 'zh' ? '输入数字或罗马数字' : 'Enter number or Roman numeral'}
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'zh' ? '例如：2024 或 MMXXIV' : 'e.g. 2024 or MMXXIV'}
          className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-4 py-3 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50 transition-colors font-mono"
          autoFocus
        />
      </div>

      {/* Results */}
      {result.error && (
        <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4 mb-6">
          <p className="text-sm text-red-400">{result.error}</p>
        </div>
      )}

      {result.arabic !== null && result.roman && !result.error && (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <p className="text-xs text-dark-500 mb-2">{lang === 'zh' ? '阿拉伯数字 → 罗马数字' : 'Arabic to Roman'}</p>
            <p
              className="text-2xl font-bold text-indigo-300 cursor-pointer hover:text-indigo-200 transition-colors"
              onDoubleClick={() => copy(String(result.arabic), 'arabic')}
              title={lang === 'zh' ? '双击复制' : 'Double-click to copy'}
            >
              {result.arabic}
            </p>
            {copied === 'arabic' && <span className="text-xs text-green-400">{dict.tool.copied}</span>}
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <p className="text-xs text-dark-500 mb-2">{lang === 'zh' ? '罗马数字 → 阿拉伯数字' : 'Roman to Arabic'}</p>
            <p
              className="text-2xl font-bold text-indigo-300 cursor-pointer hover:text-indigo-200 transition-colors"
              onDoubleClick={() => copy(result.roman!, 'roman')}
              title={lang === 'zh' ? '双击复制' : 'Double-click to copy'}
            >
              {result.roman}
            </p>
            {copied === 'roman' && <span className="text-xs text-green-400">{dict.tool.copied}</span>}
          </div>
        </div>
      )}

      {/* Current year bonus */}
      <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/5 p-4 mb-6">
        <p className="text-xs text-dark-500 mb-1">
          {lang === 'zh' ? '今年年份' : 'Current Year'}
        </p>
        <p className="text-lg font-bold text-indigo-300">
          {new Date().getFullYear()} = {currentYearRoman}
        </p>
      </div>

      {/* Reference chart */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-8">
        <h3 className="text-sm font-semibold text-dark-100 mb-3">
          {lang === 'zh' ? '常用对照表' : 'Reference Chart'}
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {guide.map((item) => (
            <div key={item.roman} className="text-center p-2 rounded-lg bg-white/[0.04]">
              <p className="text-lg font-bold text-dark-50">{item.roman}</p>
              <p className="text-xs text-dark-400">{item.arabic}</p>
            </div>
          ))}
        </div>
      </div>

      {toolContent['roman-numeral'][lang as 'zh' | 'en']}
    </div>
  )
}
