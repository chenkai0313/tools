export type CaseFormat = 'camel' | 'pascal' | 'snake' | 'screaming_snake' | 'kebab' | 'screaming_kebab' | 'dot' | 'screaming_dot'

export const CASE_FORMATS: { key: CaseFormat; labelZh: string; labelEn: string; example: string }[] = [
  { key: 'camel', labelZh: '驼峰', labelEn: 'camelCase', example: 'userName' },
  { key: 'pascal', labelZh: '帕斯卡', labelEn: 'PascalCase', example: 'UserName' },
  { key: 'snake', labelZh: '下划线', labelEn: 'snake_case', example: 'user_name' },
  { key: 'screaming_snake', labelZh: '大写下划线', labelEn: 'SCREAMING_SNAKE', example: 'USER_NAME' },
  { key: 'kebab', labelZh: '连字符', labelEn: 'kebab-case', example: 'user-name' },
  { key: 'screaming_kebab', labelZh: '大写连字符', labelEn: 'SCREAMING-KEBAB', example: 'USER-NAME' },
  { key: 'dot', labelZh: '点号', labelEn: 'dot.case', example: 'user.name' },
  { key: 'screaming_dot', labelZh: '大写点号', labelEn: 'SCREAMING.DOT', example: 'USER.NAME' },
]

function tokenize(str: string): string[] {
  let s = str.replace(/[-_.\s]+/g, '|')
  s = s.replace(/([a-z])([A-Z])/g, '$1|$2')
  s = s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1|$2')
  return s.split('|').filter(Boolean).map(w => w.toLowerCase())
}

function capitalize(w: string): string {
  return w.charAt(0).toUpperCase() + w.slice(1)
}

export function detectCase(str: string): CaseFormat | null {
  const trimmed = str.trim()
  if (!trimmed) return null

  const hasUpper = /[A-Z]/.test(trimmed)
  const hasLower = /[a-z]/.test(trimmed)
  const hasUnderscore = trimmed.includes('_')
  const hasHyphen = trimmed.includes('-')
  const hasDot = trimmed.includes('.')
  const hasSpace = /\s/.test(trimmed)
  const startsUpper = /^[A-Z]/.test(trimmed)

  if (hasUnderscore && !hasHyphen && !hasDot) {
    return hasUpper && !hasLower ? 'screaming_snake' : 'snake'
  }
  if (hasHyphen && !hasUnderscore && !hasDot) {
    return hasUpper && !hasLower ? 'screaming_kebab' : 'kebab'
  }
  if (hasDot && !hasUnderscore && !hasHyphen) {
    return hasUpper && !hasLower ? 'screaming_dot' : 'dot'
  }
  if (hasSpace || hasUpper) {
    if (startsUpper) return 'pascal'
    return 'camel'
  }
  if (!hasUpper && !hasUnderscore && !hasHyphen && !hasDot) {
    return 'snake'
  }
  return null
}

export function convert(str: string, format: CaseFormat): string {
  const words = tokenize(str)
  if (words.length === 0) return ''

  switch (format) {
    case 'camel':
      return words[0] + words.slice(1).map(capitalize).join('')
    case 'pascal':
      return words.map(capitalize).join('')
    case 'snake':
      return words.join('_')
    case 'screaming_snake':
      return words.map(w => w.toUpperCase()).join('_')
    case 'kebab':
      return words.join('-')
    case 'screaming_kebab':
      return words.map(w => w.toUpperCase()).join('-')
    case 'dot':
      return words.join('.')
    case 'screaming_dot':
      return words.map(w => w.toUpperCase()).join('.')
  }
}

export function convertAll(str: string): Record<CaseFormat, string> {
  const result = {} as Record<CaseFormat, string>
  for (const fmt of CASE_FORMATS) {
    result[fmt.key] = convert(str, fmt.key)
  }
  return result
}
