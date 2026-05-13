'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/i18n'
import { numberToChinese, numberToChineseUpper } from '@/lib/numberchinese'
import { toolContent } from '@/components/ToolContent'

export default function NumberChinesePage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState('')

  const result = useMemo(() => {
    const trimmed = input.trim()
    if (!trimmed) return { lower: '', upper: '', error: null }
    const num = parseFloat(trimmed)
    if (isNaN(num)) {
      return { lower: '', upper: '', error: lang === 'zh' ? '请输入有效数字' : 'Enter a valid number' }
    }
    if (num > 999999999999) {
      return { lower: '', upper: '', error: lang === 'zh' ? '数字太大，最大支持 999999999999' : 'Number too large (max 999999999999)' }
    }
    return {
      lower: numberToChinese(trimmed),
      upper: numberToChineseUpper(trimmed),
      error: null,
    }
  }, [input, lang])

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const examples = ['100', '10000', '999999', '125000', String(new Date().getFullYear()), '3.14']

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-dark-50 mb-2">{dict.nav['number-chinese']}</h1>
      <div className="mb-6 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '阿拉伯数字转中文不是简单的逐位替换——中文数字有"零"的特殊处理规则（如 10001 读作"一万零一"而非"一万零零一"），还有"万"和"亿"的分组进位逻辑。这个工具准确处理所有边界情况，同时输出<strong>中文小写</strong>和<strong>中文大写（财务用）</strong>两种格式。'
            : 'Converting Arabic numbers to Chinese is not simple digit substitution — Chinese numbers have special "zero" handling rules (10001 reads as "一万零一" not "一万零零一") and grouping logic for "万" and "亿". This tool handles all edge cases and outputs both <strong>Chinese lowercase</strong> and <strong>financial uppercase</strong> formats.'}
        </p>
        <p>
          {lang === 'zh'
            ? '财务大写数字（壹贰叁肆伍陆柒捌玖拾佰仟万亿）是中文发票、支票、合同等正式文书中金额的标准书写方式。支持整数和小数，最大 999999999999（近万亿）。双击复制结果。'
            : 'Financial uppercase characters (壹贰叁肆伍陆柒捌玖拾佰仟万亿) are the standard for amounts in Chinese invoices, checks, and contracts. Supports integers and decimals up to 999999999999 (~1 trillion). Double-click to copy.'}
        </p>
      </div>

      {/* Input */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-6">
        <label className="text-sm font-medium text-dark-200 mb-2 block">
          {lang === 'zh' ? '输入数字' : 'Enter a number'}
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'zh' ? '例如：125000' : 'e.g. 125000'}
          className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-4 py-3 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50 transition-colors font-mono"
          autoFocus
        />
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-2 mb-6">
        {examples.map((ex) => (
          <button
            key={ex}
            onClick={() => setInput(ex)}
            className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-dark-300 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Results */}
      {result.error && (
        <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4 mb-6">
          <p className="text-sm text-red-400">{result.error}</p>
        </div>
      )}

      {result.lower && !result.error && (
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <p className="text-xs text-dark-500 mb-2">
              {lang === 'zh' ? '中文小写' : 'Chinese lowercase'}
            </p>
            <p
              className="text-lg font-bold text-indigo-300 cursor-pointer hover:text-indigo-200 transition-colors"
              onDoubleClick={() => copy(result.lower, 'lower')}
              title={lang === 'zh' ? '双击复制' : 'Double-click to copy'}
            >
              {result.lower}
            </p>
            {copied === 'lower' && <span className="text-xs text-green-400">{dict.tool.copied}</span>}
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <p className="text-xs text-dark-500 mb-2">
              {lang === 'zh' ? '大写金额（财务用）' : 'Financial uppercase'}
            </p>
            <p
              className="text-lg font-bold text-indigo-300 cursor-pointer hover:text-indigo-200 transition-colors"
              onDoubleClick={() => copy(result.upper, 'upper')}
              title={lang === 'zh' ? '双击复制' : 'Double-click to copy'}
            >
              {result.upper}
            </p>
            {copied === 'upper' && <span className="text-xs text-green-400">{dict.tool.copied}</span>}
          </div>
        </div>
      )}

      {toolContent['number-chinese'][lang as 'zh' | 'en']}
    </div>
  )
}
