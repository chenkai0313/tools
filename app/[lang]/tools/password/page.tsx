'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { generatePasswords, calculateStrength, type PasswordOptions } from '@/lib/password'

export default function PasswordToolPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)

  const [opts, setOpts] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    firstLetter: false,
    capitalize: false,
    customChars: '',
  })
  const [passwords, setPasswords] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [flashIndex, setFlashIndex] = useState<number | null>(null)

  const strength = passwords.length > 0 ? calculateStrength(passwords[0]) : null

  const generate = useCallback(() => {
    setPasswords(generatePasswords(opts, 5))
  }, [opts])

  const handleCopy = useCallback(async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setFlashIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
    setTimeout(() => setFlashIndex(null), 400)
  }, [])

  const strengthColors = {
    weak: { bg: 'bg-red-500', text: 'text-red-400', label: lang === 'zh' ? '弱' : 'Weak' },
    medium: { bg: 'bg-yellow-500', text: 'text-yellow-400', label: lang === 'zh' ? '中等' : 'Medium' },
    good: { bg: 'bg-green-500', text: 'text-green-400', label: lang === 'zh' ? '良好' : 'Good' },
    strong: { bg: 'bg-emerald-500', text: 'text-emerald-400', label: lang === 'zh' ? '强' : 'Strong' },
  }

  const sc = strength ? strengthColors[strength.label as keyof typeof strengthColors] : null

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.password}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.password}</h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? '随机密码生成，支持多种字符组合与长度自定义' : 'Generate secure random passwords with customizable options.'}
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
        {/* Options */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={opts.uppercase} onChange={(e) => setOpts({ ...opts, uppercase: e.target.checked })}
                className="w-4 h-4 rounded border-white/[0.1] bg-dark-800 text-indigo-500 focus:ring-indigo-500/30" />
              <span className="text-sm text-dark-200">A-Z {lang === 'zh' ? '大写字母' : 'Uppercase'}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={opts.lowercase} onChange={(e) => setOpts({ ...opts, lowercase: e.target.checked })}
                className="w-4 h-4 rounded border-white/[0.1] bg-dark-800 text-indigo-500 focus:ring-indigo-500/30" />
              <span className="text-sm text-dark-200">a-z {lang === 'zh' ? '小写字母' : 'Lowercase'}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={opts.firstLetter} onChange={(e) => setOpts({ ...opts, firstLetter: e.target.checked })}
                className="w-4 h-4 rounded border-white/[0.1] bg-dark-800 text-indigo-500 focus:ring-indigo-500/30" />
              <span className="text-sm text-dark-200">{lang === 'zh' ? '首字符为字母' : 'First char is letter'}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={opts.numbers} onChange={(e) => setOpts({ ...opts, numbers: e.target.checked })}
                className="w-4 h-4 rounded border-white/[0.1] bg-dark-800 text-indigo-500 focus:ring-indigo-500/30" />
              <span className="text-sm text-dark-200">0-9 {lang === 'zh' ? '数字' : 'Numbers'}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={opts.symbols} onChange={(e) => setOpts({ ...opts, symbols: e.target.checked })}
                className="w-4 h-4 rounded border-white/[0.1] bg-dark-800 text-indigo-500 focus:ring-indigo-500/30" />
              <span className="text-sm text-dark-200">!@# $% {lang === 'zh' ? '符号' : 'Symbols'}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={opts.capitalize} onChange={(e) => setOpts({ ...opts, capitalize: e.target.checked })}
                className="w-4 h-4 rounded border-white/[0.1] bg-dark-800 text-indigo-500 focus:ring-indigo-500/30" />
              <span className="text-sm text-dark-200">{lang === 'zh' ? '首字母大写' : 'Capitalize'}</span>
            </label>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={opts.excludeSimilar} onChange={(e) => setOpts({ ...opts, excludeSimilar: e.target.checked })}
                className="w-4 h-4 rounded border-white/[0.1] bg-dark-800 text-indigo-500 focus:ring-indigo-500/30" />
              <span className="text-sm text-dark-200">{lang === 'zh' ? '排除相似字符 (1lI0O)' : 'Exclude similar (1lI0O)'}</span>
            </label>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-dark-200">{lang === 'zh' ? '密码长度' : 'Length'}</span>
                <span className="text-sm font-mono text-indigo-300">{opts.length}</span>
              </div>
              <input type="range" min={4} max={128} value={opts.length} onChange={(e) => setOpts({ ...opts, length: parseInt(e.target.value) })}
                className="w-full h-1.5 rounded-full appearance-none bg-white/[0.08] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm text-dark-200 mb-1">{lang === 'zh' ? '包含字符（逗号分隔）' : 'Include chars (comma separated)'}</label>
              <input type="text" value={opts.customChars} onChange={(e) => setOpts({ ...opts, customChars: e.target.value })}
                placeholder="e.g. 2024,admin,xyz"
                className="w-full rounded-lg border border-white/[0.06] bg-dark-800 px-3 py-2 text-xs text-dark-100 placeholder-dark-500 outline-none focus:border-indigo-500/40 transition-all" />
            </div>
          </div>
        </div>

        <button onClick={generate} className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-400 hover:to-purple-400 transition-all">
          {lang === 'zh' ? '生成密码' : 'Generate Passwords'}
        </button>

        {/* Results */}
        {passwords.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-dark-400">
                {lang === 'zh' ? '生成结果' : 'Generated Passwords'}
              </span>
              {sc && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-4 h-1.5 rounded-full ${i * 20 <= (strength?.score || 0) ? sc.bg : 'bg-white/[0.06]'}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${sc.text}`}>{sc.label}</span>
                </div>
              )}
            </div>
            {passwords.map((pwd, i) => (
              <div key={i}
                onDoubleClick={() => handleCopy(pwd, i)}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 cursor-pointer select-none group transition-all ${
                  flashIndex === i
                    ? 'border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                    : 'border-white/[0.06] bg-dark-800 hover:border-white/[0.1]'
                }`}>
                <span className="text-sm font-mono text-dark-100 tracking-wide">{pwd}</span>
                <div className="shrink-0 ml-3">
                  {copiedIndex === i ? (
                    <span className="text-xs font-medium text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
                  ) : (
                    <span className="text-[10px] text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'zh' ? '双击复制' : 'Double-click to copy'}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
