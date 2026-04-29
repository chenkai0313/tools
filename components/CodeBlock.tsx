'use client'

import { useState, useCallback } from 'react'

export default function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setFlash(true)
    setTimeout(() => setCopied(false), 1500)
    setTimeout(() => setFlash(false), 400)
  }, [code])

  return (
    <div className="group relative mb-6">
      <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-white/[0.06] bg-dark-900 px-4 py-1.5">
        <span className="text-[10px] text-dark-500 font-mono">{lang || 'code'}</span>
        {copied ? (
          <span className="text-[10px] text-indigo-300 animate-pulse">{'已复制 ✓'}</span>
        ) : (
          <span className="text-[10px] text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">{'双击代码复制'}</span>
        )}
      </div>
      <pre
        onDoubleClick={handleCopy}
        className={`overflow-x-auto rounded-b-xl border border-white/[0.06] p-4 text-sm text-dark-100 cursor-pointer select-none transition-all ${
          flash
            ? 'border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.15)]'
            : 'bg-dark-800 hover:border-white/[0.1]'
        }`}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
