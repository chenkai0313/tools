'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'

type TimezoneEntry = { id: string; label: string }

const COMMON_ZONES = [
  { id: 'Asia/Shanghai', label: '中国标准时间 (UTC+8)' },
  { id: 'Asia/Tokyo', label: '日本标准时间 (UTC+9)' },
  { id: 'Asia/Seoul', label: '韩国标准时间 (UTC+9)' },
  { id: 'Asia/Singapore', label: '新加坡时间 (UTC+8)' },
  { id: 'Asia/Hong_Kong', label: '香港时间 (UTC+8)' },
  { id: 'Asia/Taipei', label: '台北时间 (UTC+8)' },
  { id: 'America/New_York', label: '美东时间 (UTC-5)' },
  { id: 'America/Chicago', label: '中部时间 (UTC-6)' },
  { id: 'America/Denver', label: '山地时间 (UTC-7)' },
  { id: 'America/Los_Angeles', label: '美西时间 (UTC-8)' },
  { id: 'Europe/London', label: '伦敦时间 (UTC+0)' },
  { id: 'Europe/Paris', label: '巴黎时间 (UTC+1)' },
  { id: 'Europe/Berlin', label: '柏林时间 (UTC+1)' },
  { id: 'Australia/Sydney', label: '悉尼时间 (UTC+10)' },
  { id: 'Pacific/Auckland', label: '奥克兰时间 (UTC+12)' },
  { id: 'Asia/Dubai', label: '迪拜时间 (UTC+4)' },
  { id: 'Asia/Kolkata', label: '印度时间 (UTC+5:30)' },
  { id: 'America/Sao_Paulo', label: '巴西时间 (UTC-3)' },
  { id: 'UTC', label: '协调世界时 (UTC+0)' },
]

const ALL_TIMEZONES = Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : COMMON_ZONES.map((z) => z.id)

function formatTime(date: Date, tz: string): string {
  return date.toLocaleTimeString('en-US', { timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function formatDate(date: Date, tz: string, locale: string): string {
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' })
}

function formatOffset(tz: string): string {
  const d = new Date()
  const local = d.getTime()
  const tzTime = new Date(d.toLocaleString('en-US', { timeZone: tz })).getTime()
  const diff = Math.round((tzTime - local) / 60000)
  const hours = Math.floor(Math.abs(diff) / 60)
  const mins = Math.abs(diff) % 60
  const sign = diff >= 0 ? '+' : '-'
  return `UTC${sign}${hours}${mins ? ':' + String(mins).padStart(2, '0') : ''}`
}

function formatOffsetShort(tz: string): string {
  const d = new Date()
  const local = d.getTime()
  const tzTime = new Date(d.toLocaleString('en-US', { timeZone: tz })).getTime()
  const diff = Math.round((tzTime - local) / 60000)
  const hours = Math.floor(Math.abs(diff) / 60)
  const mins = Math.abs(diff) % 60
  const sign = diff >= 0 ? '+' : '-'
  return `${sign}${hours}${mins ? ':' + String(mins).padStart(2, '0') : ''}`
}

export default function WorldClockPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [tab, setTab] = useState<'clock' | 'convert'>('clock')
  const [selectedZones, setSelectedZones] = useState<TimezoneEntry[]>([
    { id: 'Asia/Shanghai', label: '中国标准时间 (UTC+8)' },
    { id: 'America/New_York', label: '美东时间 (UTC-5)' },
    { id: 'Europe/London', label: '伦敦时间 (UTC+0)' },
  ])
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Convert mode state
  const [convertDate, setConvertDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [convertTime, setConvertTime] = useState(() => new Date().toTimeString().slice(0, 5))
  const [sourceTz, setSourceTz] = useState('Asia/Shanghai')
  const [targetTz, setTargetTz] = useState('America/New_York')

  // Live clock tick
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filteredZones = useMemo(() => {
    const q = search.toLowerCase()
    return ALL_TIMEZONES.filter((tz) => !selectedZones.some((s) => s.id === tz) && tz.toLowerCase().includes(q)).slice(0, 10)
  }, [search, selectedZones])

  const addZone = (tzId: string) => {
    if (selectedZones.length >= 10) return
    const label = COMMON_ZONES.find((z) => z.id === tzId)?.label || formatOffsetShort(tzId)
    setSelectedZones((prev) => [...prev, { id: tzId, label }])
    setSearch('')
    setShowDropdown(false)
  }

  const removeZone = (tzId: string) => {
    setSelectedZones((prev) => prev.filter((z) => z.id !== tzId))
  }

  // Convert mode calculation
  const convertedTime = useMemo(() => {
    const dt = new Date(`${convertDate}T${convertTime}:00`)
    if (isNaN(dt.getTime())) return null
    const srcOffset = new Date(dt.toLocaleString('en-US', { timeZone: sourceTz })).getTime() - dt.getTime()
    const tgtOffset = new Date(dt.toLocaleString('en-US', { timeZone: targetTz })).getTime() - dt.getTime()
    const converted = new Date(dt.getTime() + (tgtOffset - srcOffset))
    return converted
  }, [convertDate, convertTime, sourceTz, targetTz])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-dark-50 mb-2">{dict.nav['world-clock']}</h1>
      <div className="mb-6 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '世界时钟是跨国团队协作和远程工作的必备工具——快速查看不同时区的当前时间，避免在不合适的时间打扰同事。这个工具实时显示全球各时区的当前时间和日期，每秒自动刷新，最多可同时查看 10 个时区。'
            : 'A world clock is essential for global team collaboration and remote work — quickly check current times across timezones to avoid messaging colleagues at inappropriate hours. This tool displays real-time clocks for timezones worldwide, refreshing every second, with up to 10 timezones simultaneously.'}
        </p>
        <p>
          {lang === 'zh'
            ? '支持搜索添加任意 IANA 时区（如 Asia/Shanghai），一键添加北京、纽约、伦敦、东京等常用时区。内置时区转换器——输入日期时间和源时区，自动转换为目标时区时间。所有时间使用浏览器的 Intl API 计算，精确可靠。'
            : 'Search and add any IANA timezone (e.g. Asia/Shanghai), with one-click quick add for Beijing, New York, London, Tokyo, and more. Built-in timezone converter — enter a date/time and source timezone to convert to any target timezone. All times computed via the browser Intl API for accuracy.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['clock', 'convert'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${tab === t ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08]'}`}
          >
            {t === 'clock' ? (lang === 'zh' ? '时钟' : 'Clock') : (lang === 'zh' ? '时区转换' : 'Convert')}
          </button>
        ))}
      </div>

      {tab === 'clock' && (
        <>
          {/* Search / Add timezone */}
          <div className="relative mb-6" ref={dropdownRef}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setShowDropdown(true) }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder={lang === 'zh' ? '搜索时区...' : 'Search timezone...'}
                  className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-4 py-2.5 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50"
                />
              </div>
              <span className="text-xs text-dark-500 whitespace-nowrap">
                {selectedZones.length}/10
              </span>
            </div>
            {showDropdown && search && filteredZones.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-white/[0.08] bg-dark-900 shadow-xl max-h-60 overflow-y-auto">
                {filteredZones.map((tz) => (
                  <button key={tz} onMouseDown={() => addZone(tz)}
                    className="w-full text-left px-4 py-2.5 text-sm text-dark-200 hover:bg-white/[0.06] transition-colors"
                  >
                    {tz.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clock cards */}
          {selectedZones.length === 0 && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-8 text-center mb-8">
              <p className="text-sm text-dark-400">{lang === 'zh' ? '搜索并添加要查看的时区' : 'Search and add timezones to view'}</p>
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2 mb-8">
            {selectedZones.map((zone) => (
              <div key={zone.id} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 relative">
                <button onClick={() => removeZone(zone.id)} className="absolute top-2 right-3 text-dark-500 hover:text-red-400 text-sm">&times;</button>
                <p className="text-xs text-dark-400 mb-1 font-mono">{formatOffset(zone.id)}</p>
                <p className="text-3xl font-bold text-dark-50 mb-1 font-mono tracking-tight">{formatTime(now, zone.id)}</p>
                <p className="text-xs text-dark-400">{formatDate(now, zone.id, lang)}</p>
                <p className="text-xs text-dark-500 mt-1">{zone.id.replace(/_/g, ' ')}</p>
              </div>
            ))}
          </div>

          {/* Quick add common zones */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-8">
            <h3 className="text-sm font-semibold text-dark-100 mb-3">{lang === 'zh' ? '常用时区' : 'Common Timezones'}</h3>
            <div className="flex flex-wrap gap-2">
              {COMMON_ZONES.filter((z) => !selectedZones.some((s) => s.id === z.id)).slice(0, 8).map((z) => (
                <button key={z.id} onClick={() => addZone(z.id)}
                  className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-dark-300 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
                >
                  {z.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'convert' && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 mb-8">
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">{lang === 'zh' ? '日期' : 'Date'}</label>
              <input type="date" value={convertDate} onChange={(e) => setConvertDate(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2.5 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">{lang === 'zh' ? '时间' : 'Time'}</label>
              <input type="time" value={convertTime} onChange={(e) => setConvertTime(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2.5 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">{lang === 'zh' ? '源时区' : 'From'}</label>
              <select value={sourceTz} onChange={(e) => setSourceTz(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2.5 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
              >
                {ALL_TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">{lang === 'zh' ? '目标时区' : 'To'}</label>
              <select value={targetTz} onChange={(e) => setTargetTz(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2.5 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
              >
                {ALL_TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          {convertedTime && (
            <div className="rounded-lg border border-indigo-500/15 bg-indigo-500/5 p-5 text-center">
              <p className="text-xs text-dark-400 mb-1">
                {sourceTz.replace(/_/g, ' ')} → {targetTz.replace(/_/g, ' ')}
              </p>
              <p className="text-2xl font-bold text-indigo-300 font-mono">
                {convertedTime.toLocaleTimeString(lang === 'zh' ? 'zh-CN' : 'en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
              <p className="text-xs text-dark-400 mt-1">
                {convertedTime.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          )}
        </div>
      )}

      {toolContent['world-clock'][lang as 'zh' | 'en']}
    </div>
  )
}
