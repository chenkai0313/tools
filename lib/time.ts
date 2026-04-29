export type TimestampUnit = 'seconds' | 'milliseconds'

export function timestampToDateTime(timestamp: number, unit: TimestampUnit): Date {
  const ms = unit === 'seconds' ? timestamp * 1000 : timestamp
  return new Date(ms)
}

export function dateTimeToTimestamp(date: Date, unit: TimestampUnit): number {
  const ms = date.getTime()
  return unit === 'seconds' ? Math.floor(ms / 1000) : ms
}

export function formatDate(date: Date, format: string): string {
  const map: Record<string, string> = {
    'YYYY': date.getFullYear().toString(),
    'MM': String(date.getMonth() + 1).padStart(2, '0'),
    'DD': String(date.getDate()).padStart(2, '0'),
    'HH': String(date.getHours()).padStart(2, '0'),
    'mm': String(date.getMinutes()).padStart(2, '0'),
    'ss': String(date.getSeconds()).padStart(2, '0'),
    'ZZZ': String(date.getMilliseconds()).padStart(3, '0'),
  }
  let result = format
  for (const [key, val] of Object.entries(map)) {
    result = result.replace(key, val)
  }
  return result
}

export function getNow(unit: TimestampUnit): number {
  return dateTimeToTimestamp(new Date(), unit)
}

export const formatPresets = [
  { label: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
  { label: 'YYYY/MM/DD HH:mm:ss', value: 'YYYY/MM/DD HH:mm:ss' },
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  { label: 'HH:mm:ss', value: 'HH:mm:ss' },
  { label: 'YYYY年MM月DD日', value: 'YYYY年MM月DD日' },
  { label: 'ISO 8601', value: 'ISO' },
  { label: 'RFC 3339', value: 'RFC' },
]

export function formatISO(date: Date): string {
  return date.toISOString()
}

export function formatRFC(date: Date): string {
  return date.toUTCString()
}

export function detectTimestamp(input: string): { value: number; unit: TimestampUnit } | null {
  const num = Number(input)
  if (isNaN(num) || !input.trim()) return null
  if (num > 1e12) return { value: num, unit: 'milliseconds' }
  if (num > 1e9) return { value: num, unit: 'seconds' }
  return null
}
