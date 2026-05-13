'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
import { parseCron, cronToText, getNextExecutions, getCronPresets } from '@/lib/cron'

type FieldMode = 'every' | 'step' | 'value' | 'range'
type FieldKey = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek'

interface FieldConfig {
  mode: FieldMode
  step: number
  value: number
  rangeStart: number
  rangeEnd: number
}

type FormFields = Record<FieldKey, FieldConfig>

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const FIELD_META: Record<FieldKey, {
  labelZh: string; labelEn: string; min: number; max: number; stepMin: number; stepMax: number
}> = {
  minute: { labelZh: '分钟', labelEn: 'Minute', min: 0, max: 59, stepMin: 2, stepMax: 30 },
  hour: { labelZh: '小时', labelEn: 'Hour', min: 0, max: 23, stepMin: 2, stepMax: 12 },
  dayOfMonth: { labelZh: '日', labelEn: 'Day', min: 1, max: 31, stepMin: 2, stepMax: 15 },
  month: { labelZh: '月', labelEn: 'Month', min: 1, max: 12, stepMin: 2, stepMax: 6 },
  dayOfWeek: { labelZh: '周', labelEn: 'Weekday', min: 0, max: 7, stepMin: 2, stepMax: 6 },
}

function fieldToSegment(field: FieldConfig): string {
  switch (field.mode) {
    case 'every': return '*'
    case 'step': return `*/${field.step}`
    case 'value': return String(field.value)
    case 'range': return `${field.rangeStart}-${field.rangeEnd}`
  }
}

function buildCronExpr(fields: FormFields): string {
  return (['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'] as FieldKey[])
    .map(k => fieldToSegment(fields[k]))
    .join(' ')
}

function defaultFields(): FormFields {
  return {
    minute: { mode: 'step', step: 5, value: 0, rangeStart: 0, rangeEnd: 30 },
    hour: { mode: 'every', step: 2, value: 12, rangeStart: 0, rangeEnd: 12 },
    dayOfMonth: { mode: 'every', step: 2, value: 1, rangeStart: 1, rangeEnd: 15 },
    month: { mode: 'every', step: 2, value: 1, rangeStart: 1, rangeEnd: 6 },
    dayOfWeek: { mode: 'every', step: 2, value: 1, rangeStart: 1, rangeEnd: 5 },
  }
}

const MODE_BTNS: { mode: FieldMode; label: string }[] = [
  { mode: 'every', label: '*' },
  { mode: 'step', label: '*/N' },
  { mode: 'value', label: 'N' },
  { mode: 'range', label: 'N-M' },
]

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

function safeInt(val: string, fallback: number): number {
  const n = parseInt(val)
  return isNaN(n) ? fallback : n
}

export default function CronToolPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const presets = getCronPresets(lang)

  const [cronInput, setCronInput] = useState('')
  const [textInput, setTextInput] = useState('')
  const [nextExecutions, setNextExecutions] = useState<Date[]>([])
  const [formFields, setFormFields] = useState<FormFields>(defaultFields)
  const [copiedCron, setCopiedCron] = useState(false)
  const [flashCron, setFlashCron] = useState(false)

  const generatedCron = useMemo(() => buildCronExpr(formFields), [formFields])
  const isValid = parseCron(cronInput)

  const handleCronInput = useCallback((value: string) => {
    setCronInput(value)
    if (parseCron(value)) {
      setTextInput(cronToText(value))
      setNextExecutions(getNextExecutions(value, 5))
    } else {
      setTextInput('')
      setNextExecutions([])
    }
  }, [])

  const selectPreset = useCallback((value: string) => {
    setCronInput(value)
    handleCronInput(value)
  }, [handleCronInput])

  const updateField = useCallback((key: FieldKey, partial: Partial<FieldConfig>) => {
    setFormFields(prev => ({ ...prev, [key]: { ...prev[key], ...partial } }))
  }, [])

  const applyGenerated = useCallback(() => {
    handleCronInput(generatedCron)
  }, [generatedCron, handleCronInput])

  const handleCopyCron = useCallback(async () => {
    await navigator.clipboard.writeText(generatedCron)
    setCopiedCron(true)
    setFlashCron(true)
    setTimeout(() => setCopiedCron(false), 1500)
    setTimeout(() => setFlashCron(false), 400)
  }, [generatedCron])

  const formatDate = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  }

  const matchMode = (value: string): boolean => {
    return parseCron(value) !== null && cronToText(value) !== 'Invalid cron expression'
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.cron}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.cron}</h1>
      <div className="mb-8 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? 'Cron 表达式是 Unix/Linux 系统中用于定义定时任务的标准语法——五个字段分别代表分、时、日、月、周，用空格分隔。从 GitHub Actions 的 schedule 触发器到 Kubernetes 的 CronJob，从 Jenkins 的定时构建到系统的 crontab，Cron 表达式是自动化运维的通用语言。但它的语法对不熟悉的人来说并不直观——`*/5 * * * *` 到底是什么时候执行？'
            : 'Cron expressions are the standard syntax for scheduling recurring tasks on Unix/Linux — five fields representing minute, hour, day, month, and weekday, separated by spaces. From GitHub Actions schedule triggers to Kubernetes CronJobs, from Jenkins pipelines to system crontabs, cron expressions are the universal language of automation. But the syntax isn\'t intuitive at first glance — when exactly does `*/5 * * * *` run?'}
        </p>
        <p>
          {lang === 'zh'
            ? '这个工具双向解析 Cron 表达式：粘贴表达式获得人类可读的描述和接下来 5 次执行时间；或者通过可视化构建器点选生成表达式，无需记忆字段含义。内置 20+ 常用预设模板，覆盖日志轮转、数据库备份、缓存清理等典型场景。'
            : 'This tool works both ways: paste a cron expression to get a human-readable description and the next 5 execution times; or use the visual builder to construct expressions by clicking — no memorization needed. Includes 20+ preset templates covering log rotation, database backups, cache clearing, and other common scenarios.'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Cron → Readable + Next Executions */}
        <div className="space-y-6">
          {/* Cron → Text */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <h2 className="mb-4 text-sm font-semibold text-dark-50">
              {lang === 'zh' ? 'Cron → 可读文本' : 'Cron → Readable'}
            </h2>
            <input
              type="text"
              value={cronInput}
              onChange={(e) => handleCronInput(e.target.value)}
              placeholder="*/5 * * * *"
              className="w-full rounded-lg border border-white/[0.06] bg-dark-800 px-4 py-2.5 text-sm font-mono text-dark-100 placeholder-dark-500 outline-none focus:border-indigo-500/40 transition-all"
            />

            <div className="mt-4 flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.value}
                  onClick={() => selectPreset(p.value)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.06] hover:text-dark-100 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {isValid && textInput && (
              <div className="mt-4 rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-4 py-3">
                <p className="text-sm text-indigo-300">{textInput}</p>
              </div>
            )}
            {!isValid && cronInput.trim() && (
              <p className="mt-3 text-xs text-red-400">
                {lang === 'zh' ? '无效的 Cron 表达式（需要5个字段）' : 'Invalid cron expression (requires 5 fields)'}
              </p>
            )}
          </div>

          {/* Next Executions */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <h2 className="mb-4 text-sm font-semibold text-dark-50">
              {lang === 'zh' ? '最近执行时间' : 'Next Executions'}
            </h2>
            {isValid && nextExecutions.length > 0 ? (
              <div className="space-y-2">
                {nextExecutions.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-dark-800 px-4 py-2.5 border border-white/[0.04]">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/10 text-xs font-medium text-indigo-300">
                      {i + 1}
                    </span>
                    <span className="text-sm font-mono text-dark-100">{formatDate(d)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-dark-500">
                <span className="text-3xl mb-3">⏰</span>
                <p className="text-sm">
                  {lang === 'zh' ? '输入 Cron 表达式查看执行时间' : 'Enter a cron expression to see next execution times'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Cron Builder */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 h-fit">
          <h2 className="mb-4 text-sm font-semibold text-dark-50">
            {lang === 'zh' ? '可视化构建' : 'Visual Builder'}
          </h2>

          {/* Generated expression */}
          <div className={`mb-5 rounded-lg border p-3 cursor-pointer select-none group transition-all ${
            flashCron
              ? 'border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.15)]'
              : 'border-indigo-500/20 bg-indigo-500/5'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-dark-400">
                {lang === 'zh' ? '生成表达式' : 'Generated'}
              </span>
              {copiedCron ? (
                <span className="text-xs font-medium text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
              ) : (
                <span className="text-xs text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'zh' ? '双击复制' : 'Copy'}</span>
              )}
            </div>
            <p onDoubleClick={handleCopyCron} className="text-lg font-mono font-bold text-indigo-200 tracking-wider">{generatedCron}</p>
            <button onClick={applyGenerated}
              className="mt-2 w-full py-1.5 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 hover:text-indigo-200 transition-all">
              {lang === 'zh' ? '应用并解析' : 'Apply & Parse'}
            </button>
          </div>

          {/* Field rows */}
          <div className="space-y-4">
            {(Object.keys(FIELD_META) as FieldKey[]).map(key => {
              const meta = FIELD_META[key]
              const field = formFields[key]
              const label = lang === 'zh' ? meta.labelZh : meta.labelEn

              return (
                <div key={key}>
                  <div className="text-[10px] text-dark-500 mb-1.5">{label}</div>
                  <div className="flex items-center gap-2">
                    {/* Mode toggle pills */}
                    <div className="flex gap-0.5 rounded-lg border border-white/[0.06] p-0.5 shrink-0">
                      {MODE_BTNS.map(({ mode, label: btnLabel }) => (
                        <button key={mode}
                          onClick={() => updateField(key, { mode })}
                          className={`px-2 py-0.5 rounded text-xs font-mono transition-all ${
                            field.mode === mode
                              ? 'bg-indigo-500/20 text-indigo-300'
                              : 'text-dark-500 hover:text-dark-300'
                          }`}>
                          {btnLabel}
                        </button>
                      ))}
                    </div>

                    {/* Input area */}
                    <div className="flex items-center gap-1 min-w-0">
                      {field.mode === 'every' && (
                        <span className="text-xs text-dark-500 italic">
                          {lang === 'zh' ? '任意' : 'Any'}
                        </span>
                      )}
                      {field.mode === 'step' && (
                        <>
                          <span className="text-[10px] text-dark-500">/</span>
                          <input type="number"
                            value={field.step}
                            onChange={e => updateField(key, { step: clamp(safeInt(e.target.value, meta.stepMin), meta.stepMin, meta.stepMax) })}
                            min={meta.stepMin} max={meta.stepMax}
                            className="w-14 rounded border border-white/[0.06] bg-dark-800 px-2 py-1 text-xs text-center text-dark-100 outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </>
                      )}
                      {field.mode === 'value' && (
                        <input type="number"
                          value={field.value}
                          onChange={e => updateField(key, { value: clamp(safeInt(e.target.value, meta.min), meta.min, meta.max) })}
                          min={meta.min} max={meta.max}
                          className="w-16 rounded border border-white/[0.06] bg-dark-800 px-2 py-1 text-xs text-center text-dark-100 outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      )}
                      {field.mode === 'range' && (
                        <div className="flex items-center gap-1">
                          <input type="number"
                            value={field.rangeStart}
                            onChange={e => updateField(key, { rangeStart: clamp(safeInt(e.target.value, meta.min), meta.min, meta.max) })}
                            min={meta.min} max={meta.max}
                            className="w-14 rounded border border-white/[0.06] bg-dark-800 px-2 py-1 text-xs text-center text-dark-100 outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                          <span className="text-dark-500 text-xs">-</span>
                          <input type="number"
                            value={field.rangeEnd}
                            onChange={e => updateField(key, { rangeEnd: clamp(safeInt(e.target.value, meta.min), meta.min, meta.max) })}
                            min={meta.min} max={meta.max}
                            className="w-14 rounded border border-white/[0.06] bg-dark-800 px-2 py-1 text-xs text-center text-dark-100 outline-none focus:border-indigo-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                      )}
                      {key === 'dayOfWeek' && field.mode === 'value' && field.value >= 0 && field.value <= 6 && (
                        <span className="text-[10px] text-dark-500 ml-0.5">({DAY_SHORT[field.value]})</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Format guide */}
          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <h3 className="mb-2 text-xs font-semibold text-dark-400">
              {lang === 'zh' ? '格式说明' : 'Format Guide'}
            </h3>
            <div className="flex items-center gap-1.5 mb-3 font-mono text-[10px]">
              {[
                { label: lang === 'zh' ? '分' : 'min', color: 'bg-indigo-500/20 text-indigo-300' },
                { label: lang === 'zh' ? '时' : 'hr', color: 'bg-emerald-500/20 text-emerald-300' },
                { label: lang === 'zh' ? '日' : 'day', color: 'bg-amber-500/20 text-amber-300' },
                { label: lang === 'zh' ? '月' : 'mon', color: 'bg-rose-500/20 text-rose-300' },
                { label: lang === 'zh' ? '周' : 'dow', color: 'bg-cyan-500/20 text-cyan-300' },
              ].map(({ label, color }) => (
                <span key={label} className={`px-1.5 py-0.5 rounded ${color}`}>{label}</span>
              ))}
              <span className="text-dark-500">= {lang === 'zh' ? '表达式顺序' : 'expression order'}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              {[
                { pattern: '*', desc: lang === 'zh' ? '每/全部' : 'every/any' },
                { pattern: '*/N', desc: lang === 'zh' ? '每 N 个' : 'every N' },
                { pattern: 'N', desc: lang === 'zh' ? '指定值' : 'specific' },
                { pattern: 'N-M', desc: lang === 'zh' ? '范围' : 'range' },
              ].map(({ pattern, desc }) => (
                <div key={pattern} className="flex items-center gap-1.5">
                  <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-dark-200 font-mono">{pattern}</code>
                  <span className="text-dark-500">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toolContent.cron[lang as 'zh' | 'en']}
    </div>
  )
}
