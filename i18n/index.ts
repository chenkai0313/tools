// Extract the shape of the locale object, converting all string literals to `string`
type ExtractStrings<T> = T extends object
  ? { [K in keyof T]: ExtractStrings<T[K]> }
  : string

import zh from './zh'
import en from './en'

export type Locale = 'zh' | 'en'
export type Dictionary = ExtractStrings<typeof zh>

const dictionaries: Record<Locale, Dictionary> = { zh, en } as unknown as Record<Locale, Dictionary>

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.zh
}

export function isLocale(value: string): value is Locale {
  return value === 'zh' || value === 'en'
}
