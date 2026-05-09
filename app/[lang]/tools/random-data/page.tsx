'use client'

import { useState, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/i18n'
import { generateRandomData, dataToCSV, dataToJSON, getFieldLabels, type RandomField } from '@/lib/random'
import { toolContent } from '@/components/ToolContent'

const ALL_FIELDS: RandomField[] = ['name', 'email', 'phone', 'address', 'company', 'id', 'ip', 'color']

export default function RandomDataPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [locale, setLocale] = useState<'zh' | 'en'>(lang === 'zh' ? 'zh' : 'en')
  const [fields, setFields] = useState<RandomField[]>(['name', 'email', 'phone', 'address'])
  const [count, setCount] = useState('10')
  const [generated, setGenerated] = useState(false)

  const labels = useMemo(() => getFieldLabels(locale), [locale])

  const data = useMemo(() => {
    if (!generated) return null
    const c = parseInt(count, 10)
    if (!c || c < 1 || c > 100) return null
    return generateRandomData(c, fields, locale)
  }, [count, fields, locale, generated])

  const toggleField = (f: RandomField) => {
    setFields((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f])
    setGenerated(false)
  }

  const selectAllFields = () => { setFields([...ALL_FIELDS]); setGenerated(false) }

  const exportCSV = useCallback(() => {
    if (!data || data.length === 0) return
    const csv = dataToCSV(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'random_data.csv'; a.click()
    URL.revokeObjectURL(url)
  }, [data])

  const exportJSON = useCallback(() => {
    if (!data || data.length === 0) return
    const json = dataToJSON(data)
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'random_data.json'; a.click()
    URL.revokeObjectURL(url)
  }, [data])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-dark-50 mb-2">{dict.nav['random-data']}</h1>
      <p className="text-sm text-dark-400 mb-6">
        {lang === 'zh' ? '生成随机姓名、邮箱、电话、地址等测试数据' : 'Generate random names, emails, phones, addresses and more'}
      </p>

      {/* Controls */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-6">
        {/* Locale + Count row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-1 rounded-lg bg-white/[0.04] p-0.5">
            <button onClick={() => setLocale('zh')} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${locale === 'zh' ? 'bg-indigo-500/20 text-indigo-300' : 'text-dark-400 hover:text-dark-200'}`}>中文</button>
            <button onClick={() => setLocale('en')} className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${locale === 'en' ? 'bg-indigo-500/20 text-indigo-300' : 'text-dark-400 hover:text-dark-200'}`}>English</button>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-dark-400">{lang === 'zh' ? '数量' : 'Count'}</label>
            <input type="number" value={count} onChange={(e) => { setCount(e.target.value); setGenerated(false) }} min="1" max="100" className="w-20 rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-1.5 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50" />
          </div>
        </div>

        {/* Field checkboxes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ALL_FIELDS.map((f) => (
            <button key={f} onClick={() => toggleField(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${fields.includes(f) ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-white/[0.04] text-dark-400 border border-white/[0.06] hover:bg-white/[0.08]'}`}
            >
              {labels[f]}
            </button>
          ))}
          <button onClick={selectAllFields} className="rounded-lg px-3 py-1.5 text-xs text-dark-500 hover:text-dark-300 transition-all">
            {lang === 'zh' ? '全选' : 'All'}
          </button>
        </div>

        {/* Generate */}
        <button onClick={() => setGenerated(true)}
          className="rounded-lg bg-indigo-500/20 px-6 py-2 text-sm font-medium text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
        >
          {lang === 'zh' ? '生成数据' : 'Generate'}
        </button>
      </div>

      {/* Data table */}
      {data && data.length > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-dark-100">{lang === 'zh' ? '生成结果' : 'Results'}</h3>
            <div className="flex gap-2">
              <button onClick={exportCSV} className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-dark-300 hover:text-indigo-300 transition-all">CSV</button>
              <button onClick={exportJSON} className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-dark-300 hover:text-indigo-300 transition-all">JSON</button>
            </div>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-dark-400 border-b border-white/[0.06]">
                  {fields.map((f) => (
                    <th key={f} className="text-left py-2 pr-3 whitespace-nowrap">{labels[f]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.03] text-dark-300">
                    {fields.map((f) => {
                      const val = row[labels[f]]
                      return (
                        <td key={f} className="py-2 pr-3 whitespace-nowrap">
                          {f === 'color' && val ? (
                            <span className="flex items-center gap-2">
                              <span className="inline-block w-4 h-4 rounded border border-white/[0.1]" style={{ backgroundColor: val }} />
                              {val}
                            </span>
                          ) : val}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {toolContent['random-data'][lang as 'zh' | 'en']}
    </div>
  )
}
