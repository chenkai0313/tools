'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'

export default function ChineseConvertPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [direction, setDirection] = useState<'s2t' | 't2s'>('s2t')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')
  const converterRef = useRef<((text: string) => string) | null>(null)

  // Lazy init opencc-js WASM
  useEffect(() => {
    let cancelled = false
    async function init() {
      try {
        const { Converter, Locale } = await import('opencc-js')
        if (cancelled) return
        converterRef.current = direction === 's2t'
          ? Converter({ from: Locale.from.cn, to: Locale.to.tw })
          : Converter({ from: Locale.from.tw, to: Locale.to.cn })
      } catch {
        // WASM may fail in some environments
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    init()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Convert when input or direction changes
  useEffect(() => {
    if (!converterRef.current || !input.trim()) {
      setOutput('')
      return
    }
    try {
      const result = converterRef.current(input)
      setOutput(result)
    } catch {
      setOutput('')
    }
  }, [input, direction])

  // Reset converter when direction changes
  const toggleDirection = useCallback(() => {
    setDirection((prev) => prev === 's2t' ? 't2s' : 's2t')
  }, [])

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const inputLen = input.replace(/\s/g, '').length
  const outputLen = output.replace(/\s/g, '').length

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-dark-50 mb-2">{dict.nav['chinese-convert']}</h1>
      <p className="text-sm text-dark-400 mb-6">
        {lang === 'zh' ? '简体中文与繁体中文互转，支持常用词汇转换' : 'Convert between Simplified and Traditional Chinese'}
      </p>

      {/* Direction toggle */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className={`text-sm font-medium ${direction === 's2t' ? 'text-indigo-300' : 'text-dark-400'}`}>
          {lang === 'zh' ? '简体' : 'Simplified'}
        </span>
        <button onClick={toggleDirection}
          className="rounded-lg bg-white/[0.04] px-3 py-2 hover:bg-white/[0.08] transition-all"
          title={lang === 'zh' ? '切换方向' : 'Toggle direction'}
        >
          <svg className={`w-5 h-5 text-dark-300 transition-transform ${direction === 't2s' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
        <span className={`text-sm font-medium ${direction === 't2s' ? 'text-indigo-300' : 'text-dark-400'}`}>
          {lang === 'zh' ? '繁体' : 'Traditional'}
        </span>
      </div>

      {loading && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-8 text-center mb-6">
          <p className="text-sm text-dark-400">{lang === 'zh' ? '加载转换引擎...' : 'Loading conversion engine...'}</p>
        </div>
      )}

      {/* Editor area */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        {/* Input */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-dark-400">
              {direction === 's2t' ? (lang === 'zh' ? '简体' : 'Simplified') : (lang === 'zh' ? '繁体' : 'Traditional')}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-dark-500">{inputLen}{lang === 'zh' ? '字' : ' chars'}</span>
              <button onClick={() => { setInput(''); setOutput('') }}
                className="text-xs text-dark-400 hover:text-dark-200 transition-colors"
              >
                {lang === 'zh' ? '清空' : 'Clear'}
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'zh' ? '请输入要转换的文字...' : 'Enter text to convert...'}
            className="w-full h-48 rounded-lg border border-white/[0.08] bg-dark-800/50 px-4 py-3 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
          />
        </div>

        {/* Output */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-dark-400">
              {direction === 's2t' ? (lang === 'zh' ? '繁体' : 'Traditional') : (lang === 'zh' ? '简体' : 'Simplified')}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-dark-500">{outputLen}{lang === 'zh' ? '字' : ' chars'}</span>
              {output && (
                <button onClick={() => setInput(output)}
                  className="text-xs text-dark-400 hover:text-indigo-300 transition-colors"
                >
                  {lang === 'zh' ? '互换' : 'Swap'}
                </button>
              )}
            </div>
          </div>
          <div
            className="w-full h-48 rounded-lg border border-white/[0.08] bg-dark-800/50 px-4 py-3 text-sm text-dark-50 overflow-y-auto whitespace-pre-wrap cursor-pointer hover:border-indigo-500/30 transition-colors"
            onClick={() => output && copy(output, 'output')}
            title={lang === 'zh' ? '点击复制' : 'Click to copy'}
          >
            {output || <span className="text-dark-500">{lang === 'zh' ? '转换结果...' : 'Converted text...'}</span>}
          </div>
          {copied === 'output' && <span className="text-xs text-green-400 mt-1 block">{dict.tool.copied}</span>}
        </div>
      </div>

      {toolContent['chinese-convert'][lang as 'zh' | 'en']}
    </div>
  )
}
