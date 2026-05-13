'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
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
      <div className="mb-8 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '哈希函数（Hash Function）将任意长度的输入数据映射为固定长度的输出（摘要），是密码学和数据完整性校验的基础工具。SHA-256 用于 API 签名和区块链，MD5 用于文件校验，SHA-512 用于密码哈希——不同的场景需要不同的算法。这个工具在浏览器本地计算五种主流哈希值，你的数据不会离开设备。'
            : 'Hash functions map arbitrary-length input to a fixed-size output (digest), forming the foundation of cryptography and data integrity verification. SHA-256 for API signing and blockchain, MD5 for file checksums, SHA-512 for password hashing — different scenarios demand different algorithms. This tool computes five hash algorithms locally in your browser; your data never leaves your device.'}
        </p>
        <p>
          {lang === 'zh'
            ? '支持 MD5、SHA-1、SHA-256、SHA-384、SHA-512 五种算法，实时计算，支持大小写输出切换。注意：MD5 和 SHA-1 已被证明存在碰撞漏洞，不应用于安全场景；密码存储请使用 bcrypt/argon2 等专用算法，而非裸哈希。'
            : 'Supports MD5, SHA-1, SHA-256, SHA-384, SHA-512 with real-time computation and uppercase/lowercase toggle. Note: MD5 and SHA-1 have known collision vulnerabilities and should not be used for security purposes. For password storage, use bcrypt/argon2 rather than raw hashes.'}
        </p>
      </div>

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

        <div className="mb-3 flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 rounded border-white/[0.12] bg-white/[0.04] checked:bg-amber-500/80 checked:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40 focus:outline-none transition-all cursor-pointer"
            />
            <span className="text-xs font-mono font-medium text-dark-300">
              {dict.tool.uppercase}
            </span>
          </label>
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
            <span className="text-dark-100">{display}</span>
          </div>
        )}
      </div>

      {toolContent.hash[lang as 'zh' | 'en']}
    </div>
  )
}
