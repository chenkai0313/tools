'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import CryptoJS from 'crypto-js'

const algorithms = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const

function computeHash(text: string, algo: string): string {
  switch (algo) {
    case 'MD5': return CryptoJS.MD5(text).toString()
    case 'SHA-1': return CryptoJS.SHA1(text).toString()
    case 'SHA-256': return CryptoJS.SHA256(text).toString()
    case 'SHA-384': return CryptoJS.SHA384(text).toString()
    case 'SHA-512': return CryptoJS.SHA512(text).toString()
    default: return ''
  }
}

export default function HashPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState('MD5')
  const [uppercase, setUppercase] = useState(false)
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)

  const result = input.trim() ? computeHash(input.trim(), selected) : ''
  const display = uppercase ? result.toUpperCase() : result

  const handleCopy = useCallback(async () => {
    if (!display) return
    await navigator.clipboard.writeText(display)
    setCopied(true)
    setFlash(true)
    setTimeout(() => setCopied(false), 1500)
    setTimeout(() => setFlash(false), 400)
  }, [display])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.hash}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.hash}</h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? '计算文本的 MD5 / SHA 哈希值' : 'Compute MD5 / SHA hash of text'}
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {algorithms.map((algo) => (
            <button
              key={algo}
              onClick={() => setSelected(algo)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selected === algo
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              {algo}
            </button>
          ))}
        </div>

        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={() => setUppercase(!uppercase)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              uppercase
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
            }`}
          >
            Aa → AA
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'zh' ? '输入要计算哈希的文本...' : 'Enter text to hash...'}
          rows={4}
          className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 text-sm text-dark-50 placeholder-dark-400 outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all font-mono resize-y"
        />

        {result && (
          <div
            onDoubleClick={handleCopy}
            className={`mt-4 rounded-lg px-4 py-3 cursor-pointer select-none group transition-all font-mono text-sm break-all ${
              flash
                ? 'bg-indigo-500/15 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
                : 'bg-white/[0.04] hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-dark-400">{selected} ({result.length / 2} bytes)</span>
              <span className="text-xs text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {copied ? (
                  <span className="text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
                ) : (
                  lang === 'zh' ? '双击复制' : 'Double-click to copy'
                )}
              </span>
            </div>
            <span className="text-dark-100">{result}</span>
          </div>
        )}
      </div>
    </div>
  )
}
