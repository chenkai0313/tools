'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import {
  timestampToDateTime,
  dateTimeToTimestamp,
  formatDate,
  formatPresets,
  formatISO,
  formatRFC,
  detectTimestamp,
  type TimestampUnit,
} from '@/lib/time'

export default function TimeToolPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)

  const [unit, setUnit] = useState<TimestampUnit>('seconds')
  const [timestampInput, setTimestampInput] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [second, setSecond] = useState('')
  const [copiedKeys, setCopiedKeys] = useState<Set<string>>(new Set())
  const [flashKeys, setFlashKeys] = useState<Set<string>>(new Set())

  const handleCopy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedKeys((prev) => new Set(prev).add(key))
    setFlashKeys((prev) => new Set(prev).add(key))
    setTimeout(() => setCopiedKeys((prev) => { const n = new Set(prev); n.delete(key); return n }), 1500)
    setTimeout(() => setFlashKeys((prev) => { const n = new Set(prev); n.delete(key); return n }), 400)
  }, [])

  const tsToDate = timestampInput.trim()
    ? (() => {
        const detected = detectTimestamp(timestampInput)
        if (!detected) return null
        const date = timestampToDateTime(detected.value, detected.unit)
        return { date, detectedUnit: detected.unit }
      })()
    : null

  const formattedResults = tsToDate
    ? formatPresets.map((p) => {
        let val = ''
        if (p.value === 'ISO') val = formatISO(tsToDate.date)
        else if (p.value === 'RFC') val = formatRFC(tsToDate.date)
        else val = formatDate(tsToDate.date, p.value)
        return { label: p.label, value: val }
      })
    : []

  const dateToTs = useMemo(() => {
    const y = parseInt(year)
    const m = parseInt(month)
    const d = parseInt(day)
    const h = parseInt(hour) || 0
    const min = parseInt(minute) || 0
    const s = parseInt(second) || 0
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null
    const date = new Date(y, m - 1, d, h, min, s)
    if (isNaN(date.getTime())) return null
    return {
      seconds: dateTimeToTimestamp(date, 'seconds'),
      ms: dateTimeToTimestamp(date, 'milliseconds'),
    }
  }, [year, month, day, hour, minute, second])

  const setNow = () => {
    const now = new Date()
    setYear(String(now.getFullYear()))
    setMonth(String(now.getMonth() + 1))
    setDay(String(now.getDate()))
    setHour(String(now.getHours()))
    setMinute(String(now.getMinutes()))
    setSecond(String(now.getSeconds()))
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.time}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.time}</h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? '时间戳与日期时间互转，支持秒/毫秒' : 'Convert between timestamps and date strings, supports seconds and milliseconds.'}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Timestamp → Date */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="mb-4 text-sm font-semibold text-dark-50">
            {lang === 'zh' ? '时间戳 → 日期' : 'Timestamp → Date'}
          </h2>
          <div className="mb-3 flex items-center gap-3">
            <button
              onClick={() => setUnit('seconds')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                unit === 'seconds' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              {lang === 'zh' ? '秒' : 'Seconds'}
            </button>
            <button
              onClick={() => setUnit('milliseconds')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                unit === 'milliseconds' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              {lang === 'zh' ? '毫秒' : 'Milliseconds'}
            </button>
            <button
              onClick={() => setTimestampInput(String(Date.now()))}
              className="ml-auto px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]"
            >
              {lang === 'zh' ? '现在' : 'Now'}
            </button>
          </div>
          <input
            type="text"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            placeholder={lang === 'zh' ? '输入时间戳...' : 'Enter timestamp...'}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 text-sm text-dark-50 placeholder-dark-400 outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all"
          />
          {tsToDate && (
            <div className="mt-4 space-y-2">
              {formattedResults.map((r) => (
                <div key={r.label}
                  onDoubleClick={() => handleCopy(r.value, r.label)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer select-none group transition-all ${
                    flashKeys.has(r.label)
                      ? 'bg-indigo-500/15 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
                      : 'bg-white/[0.04] hover:bg-white/[0.06]'
                  }`}>
                  <span className="text-xs text-dark-400 w-40 shrink-0">{r.label}</span>
                  <span className="text-sm text-dark-100 font-mono truncate mx-2">{r.value}</span>
                  <div className="shrink-0 text-xs text-right min-w-[5rem]">
                    {copiedKeys.has(r.label) ? (
                      <span className="text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
                    ) : (
                      <span className="text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'zh' ? '双击复制' : 'Copy'}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="mb-4 text-sm font-semibold text-dark-50">
            {lang === 'zh' ? '日期 → 时间戳' : 'Date → Timestamp'}
          </h2>

          <div className="mb-3 flex justify-end">
            <button
              onClick={setNow}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]"
            >
              {lang === 'zh' ? '现在' : 'Now'}
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
            <div>
              <label className="block text-[10px] text-dark-400 mb-1 text-center">{lang === 'zh' ? '年' : 'Y'}</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2025"
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-2 text-sm text-dark-50 text-center outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-dark-400 mb-1 text-center">{lang === 'zh' ? '月' : 'M'}</label>
              <input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="1"
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-2 text-sm text-dark-50 text-center outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-dark-400 mb-1 text-center">{lang === 'zh' ? '日' : 'D'}</label>
              <input
                type="number"
                min={1}
                max={31}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="1"
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-2 text-sm text-dark-50 text-center outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-dark-400 mb-1 text-center">{lang === 'zh' ? '时' : 'h'}</label>
              <input
                type="number"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-2 text-sm text-dark-50 text-center outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-dark-400 mb-1 text-center">{lang === 'zh' ? '分' : 'm'}</label>
              <input
                type="number"
                min={0}
                max={59}
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-2 text-sm text-dark-50 text-center outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-dark-400 mb-1 text-center">{lang === 'zh' ? '秒' : 's'}</label>
              <input
                type="number"
                min={0}
                max={59}
                value={second}
                onChange={(e) => setSecond(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-2 text-sm text-dark-50 text-center outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {dateToTs && (
            <div className="mt-4 space-y-3">
              <div
                onDoubleClick={() => handleCopy(String(dateToTs.seconds), 's')}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer select-none group transition-all ${
                  flashKeys.has('s')
                    ? 'bg-indigo-500/15 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.06]'
                }`}>
                <span className="text-xs text-dark-400">{lang === 'zh' ? '秒级时间戳' : 'Seconds'}</span>
                <span className="text-sm text-dark-100 font-mono">{dateToTs.seconds}</span>
                <div className="shrink-0 text-xs text-right min-w-[5rem]">
                  {copiedKeys.has('s') ? (
                    <span className="text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
                  ) : (
                    <span className="text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'zh' ? '双击复制' : 'Copy'}</span>
                  )}
                </div>
              </div>
              <div
                onDoubleClick={() => handleCopy(String(dateToTs.ms), 'ms')}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer select-none group transition-all ${
                  flashKeys.has('ms')
                    ? 'bg-indigo-500/15 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.06]'
                }`}>
                <span className="text-xs text-dark-400">{lang === 'zh' ? '毫秒级时间戳' : 'Milliseconds'}</span>
                <span className="text-sm text-dark-100 font-mono">{dateToTs.ms}</span>
                <div className="shrink-0 text-xs text-right min-w-[5rem]">
                  {copiedKeys.has('ms') ? (
                    <span className="text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
                  ) : (
                    <span className="text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'zh' ? '双击复制' : 'Copy'}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
