const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const digitsUpper = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
const units = ['', '十', '百', '千']
const bigUnits = ['', '万', '亿', '兆']
const unitsUpper = ['', '拾', '佰', '仟']
const bigUnitsUpper = ['', '万', '亿', '兆']

function convertChunk(n: number, useUpper: boolean): string {
  const d = useUpper ? digitsUpper : digits
  const u = useUpper ? unitsUpper : units
  let result = ''
  let zero = false

  for (let i = 3; i >= 0; i--) {
    const factor = Math.pow(10, i)
    const digit = Math.floor(n / factor)
    n %= factor

    if (digit > 0) {
      if (zero) {
        result += d[0]
        zero = false
      }
      result += (i > 0 ? d[digit] + u[i] : d[digit])
    } else {
      if (result.length > 0) {
        zero = true
      }
    }
  }

  return result
}

export function numberToChinese(num: number | string): string {
  const n = typeof num === 'string' ? parseFloat(num) : num
  if (isNaN(n)) return ''
  if (n === 0) return '零'

  // Handle decimals
  const parts = n.toString().split('.')
  const intPart = parseInt(parts[0])

  let result = ''
  let remaining = intPart
  let bigIdx = 0

  while (remaining > 0) {
    const chunk = remaining % 10000
    remaining = Math.floor(remaining / 10000)

    const chunkStr = convertChunk(chunk, false)
    if (chunkStr) {
      result = chunkStr + (bigUnits[bigIdx] || '') + result
    } else if (result.length > 0 && !result.startsWith('零')) {
      result = '零' + result
    }

    bigIdx++
  }

  // Handle decimal part
  if (parts.length > 1 && parts[1]) {
    result += '点'
    for (const ch of parts[1]) {
      result += digits[parseInt(ch)]
    }
  }

  return result
}

export function numberToChineseUpper(num: number | string): string {
  const n = typeof num === 'string' ? parseFloat(num) : num
  if (isNaN(n)) return ''
  if (n === 0) return '零'

  const yuan = Math.floor(n)
  const jiao = Math.floor((n * 10) % 10)
  const fen = Math.floor((n * 100) % 10)

  if (yuan === 0 && jiao === 0 && fen === 0) return '零元整'

  let result = ''
  let remaining = yuan
  let bigIdx = 0

  while (remaining > 0) {
    const chunk = remaining % 10000
    remaining = Math.floor(remaining / 10000)

    const chunkStr = convertChunk(chunk, true)
    if (chunkStr) {
      result = chunkStr + (bigUnitsUpper[bigIdx] || '') + result
    } else if (result.length > 0 && !result.startsWith('零')) {
      result = '零' + result
    }

    bigIdx++
  }

  if (yuan > 0) result += '元'

  if (jiao === 0 && fen === 0) {
    result += '整'
  } else {
    if (jiao > 0) result += digitsUpper[jiao] + '角'
    if (fen > 0) result += digitsUpper[fen] + '分'
  }

  return result
}
