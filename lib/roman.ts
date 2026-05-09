const romanMap: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(num: number): string {
  if (!Number.isInteger(num) || num < 1 || num > 3999) {
    return ''
  }
  let result = ''
  let n = num
  for (const [value, symbol] of romanMap) {
    while (n >= value) {
      result += symbol
      n -= value
    }
  }
  return result
}

const romanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i

export function fromRoman(roman: string): number | null {
  const trimmed = roman.trim()
  if (!romanRegex.test(trimmed)) return null

  const romanNumeralMap: Record<string, number> = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1,
  }

  let result = 0
  let i = 0
  const upper = trimmed.toUpperCase()

  while (i < upper.length) {
    const two = upper.slice(i, i + 2)
    if (romanNumeralMap[two]) {
      result += romanNumeralMap[two]
      i += 2
    } else {
      result += romanNumeralMap[upper[i]]
      i++
    }
  }

  return result
}

export function isRoman(str: string): boolean {
  return romanRegex.test(str.trim())
}

export function getCurrentYearRoman(): string {
  return toRoman(new Date().getFullYear())
}
