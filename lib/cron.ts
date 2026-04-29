const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export interface ParsedCron {
  minute: string
  hour: string
  dayOfMonth: string
  month: string
  dayOfWeek: string
}

export function parseCron(expr: string): ParsedCron | null {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) return null
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  }
}

function describeField(value: string, type: 'minute' | 'hour' | 'day' | 'month'): string {
  if (value === '*') return ''

  // Handle step: */5
  const stepMatch = value.match(/^\*\/(\d+)$/)
  if (stepMatch) {
    const n = parseInt(stepMatch[1])
    switch (type) {
      case 'minute': return `every ${n} minutes`
      case 'hour': return `every ${n} hours`
      case 'day': return `every ${n} days`
      case 'month': return `every ${n} months`
    }
  }

  // Handle range: 1-5
  const rangeMatch = value.match(/^(\d+)-(\d+)$/)
  if (rangeMatch) {
    const [_, s, e] = rangeMatch
    switch (type) {
      case 'minute': return `minutes ${s} through ${e}`
      case 'hour': return `between ${s}:00 and ${e}:00`
      case 'day': return `days ${s} through ${e}`
      case 'month': return `months ${s} through ${e}`
    }
  }

  // Handle list: 1,2,3
  if (value.includes(',')) {
    const items = value.split(',').map(v => describeField(v, type)).filter(Boolean)
    return items.join(', ')
  }

  return `${value}`
}

export function cronToText(expr: string): string {
  const parsed = parseCron(expr)
  if (!parsed) return 'Invalid cron expression'

  const parts: string[] = []

  const minDesc = describeField(parsed.minute, 'minute')
  const hourDesc = describeField(parsed.hour, 'hour')
  const domDesc = describeField(parsed.dayOfMonth, 'day')
  const monthDesc = describeField(parsed.month, 'month')
  const dowDesc = describeField(parsed.dayOfWeek, 'day')

  // Common patterns
  if (parsed.minute === '*' && parsed.hour === '*' && parsed.dayOfMonth === '*' && parsed.month === '*' && parsed.dayOfWeek === '*') {
    return 'Every minute'
  }

  if (parsed.minute === '0' && parsed.hour === '*' && parsed.dayOfMonth === '*' && parsed.month === '*' && parsed.dayOfWeek === '*') {
    return 'Every hour'
  }

  if (parsed.minute === '0' && parsed.hour === '0' && parsed.dayOfMonth === '*' && parsed.month === '*' && parsed.dayOfWeek === '*') {
    return 'Every day at midnight'
  }

  if (parsed.minute === '0' && parsed.hour === '0' && parsed.dayOfMonth === '1' && parsed.month === '*' && parsed.dayOfWeek === '*') {
    return 'First day of every month'
  }

  // Build description
  if (minDesc) parts.push(minDesc)
  if (hourDesc) parts.push(hourDesc)
  if (domDesc) parts.push(`on ${domDesc}`)
  if (monthDesc) parts.push(`in ${monthDesc}`)
  if (dowDesc) parts.push(`on ${dowDesc}`)

  // At specific time
  if (parsed.minute !== '*' && parsed.minute !== '0' && !parsed.minute.includes('/') && parsed.hour !== '*' && !parsed.hour.includes('/')) {
    const time = `${parsed.hour.padStart(2, '0')}:${parsed.minute.padStart(2, '0')}`
    const prefix = parts.length > 0 ? parts.join(' ') + ' at' : 'At'

    // Check for specific day of week
    const dowMap: Record<string, string> = {
      '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', '4': 'Thursday',
      '5': 'Friday', '6': 'Saturday', '0': 'Sunday', '7': 'Sunday'
    }
    if (parsed.dayOfWeek !== '*' && parsed.dayOfMonth === '*') {
      if (parsed.dayOfWeek.includes('-')) {
        const [s, e] = parsed.dayOfWeek.split('-')
        return `At ${time}, ${dowMap[s] || '?'} through ${dowMap[e] || '?'}`
      }
      if (parsed.dayOfWeek === '1-5') return `At ${time}, Monday through Friday`
      if (parsed.dayOfWeek === '0,6' || parsed.dayOfWeek === '6,0') return `At ${time}, Saturday and Sunday`
      return `At ${time}, ${dowMap[parsed.dayOfWeek] || parsed.dayOfWeek}`
    }

    if (parsed.dayOfMonth !== '*' && parsed.month === '*') {
      return `At ${time}, day ${parsed.dayOfMonth} of every month`
    }

    return `${prefix} ${time}`
  }

  if (parts.length === 0) return `At ${parsed.minute} minutes past the hour`
  return parts.join(' ').charAt(0).toUpperCase() + parts.join(' ').slice(1)
}

export function getNextExecutions(expr: string, count: number = 5): Date[] {
  const parsed = parseCron(expr)
  if (!parsed) return []

  const results: Date[] = []
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())

  let current = new Date(start)
  const maxIterations = 525600 // 1 year of minutes
  let iterations = 0

  while (results.length < count && iterations < maxIterations) {
    current = new Date(current.getTime() + 60000) // add 1 minute
    iterations++

    if (matchesCron(current, parsed)) {
      results.push(new Date(current))
    }
  }

  return results
}

function matchesCron(date: Date, cron: ParsedCron): boolean {
  return (
    matchesField(date.getMinutes(), cron.minute) &&
    matchesField(date.getHours(), cron.hour) &&
    matchesField(date.getDate(), cron.dayOfMonth) &&
    matchesField(date.getMonth() + 1, cron.month) &&
    matchesField(date.getDay(), cron.dayOfWeek)
  )
}

function matchesField(value: number, pattern: string): boolean {
  if (pattern === '*') return true

  // Step: */5
  const stepMatch = pattern.match(/^\*\/(\d+)$/)
  if (stepMatch) {
    const step = parseInt(stepMatch[1])
    return step > 0 && value % step === 0
  }

  // Range: 1-5
  const rangeMatch = pattern.match(/^(\d+)-(\d+)$/)
  if (rangeMatch) {
    return parseInt(rangeMatch[1]) <= value && value <= parseInt(rangeMatch[2])
  }

  // List: 1,3,5
  if (pattern.includes(',')) {
    return pattern.split(',').map(Number).includes(value)
  }

  return parseInt(pattern) === value
}

export function getCronPresets(locale: string): { label: string; value: string }[] {
  return [
    { label: locale === 'zh' ? '每分钟' : 'Every minute', value: '* * * * *' },
    { label: locale === 'zh' ? '每小时' : 'Every hour', value: '0 * * * *' },
    { label: locale === 'zh' ? '每天凌晨' : 'Every day at midnight', value: '0 0 * * *' },
    { label: locale === 'zh' ? '每工作日9点' : 'Weekdays at 9:00', value: '0 9 * * 1-5' },
    { label: locale === 'zh' ? '每月1号' : '1st of every month', value: '0 0 1 * *' },
    { label: locale === 'zh' ? '每30分钟' : 'Every 30 minutes', value: '*/30 * * * *' },
    { label: locale === 'zh' ? '每周一凌晨' : 'Monday at midnight', value: '0 0 * * 1' },
  ]
}
