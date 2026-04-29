export interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
  excludeSimilar: boolean
  firstLetter: boolean
  capitalize: boolean
  customChars: string
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const SIMILAR = '1lI0O'

function getCharSet(options: PasswordOptions): string {
  let chars = ''
  if (options.uppercase) chars += UPPERCASE
  if (options.lowercase) chars += LOWERCASE
  if (options.numbers) chars += NUMBERS
  if (options.symbols) chars += SYMBOLS
  if (options.customChars) chars += options.customChars
  if (!chars) chars = LOWERCASE

  if (options.excludeSimilar) {
    for (const ch of SIMILAR) {
      chars = chars.replace(ch, '')
    }
  }
  return chars
}

export function generatePassword(options: PasswordOptions): string {
  const chars = getCharSet(options)
  const array = new Uint32Array(options.length)
  crypto.getRandomValues(array)

  let password = ''
  for (let i = 0; i < options.length; i++) {
    password += chars[array[i] % chars.length]
  }

  // Ensure at least one char from each selected type
  if (options.length >= 4) {
    const has = (set: string) => [...set].some(c => password.includes(c))
    if (options.uppercase && !has(UPPERCASE)) {
      password = password.slice(0, -1) + UPPERCASE[array[0] % UPPERCASE.length]
    }
    if (options.lowercase && !has(LOWERCASE)) {
      password = password.slice(0, -1) + LOWERCASE[array[1] % LOWERCASE.length]
    }
    if (options.numbers && !has(NUMBERS)) {
      password = password.slice(0, -1) + NUMBERS[array[2] % NUMBERS.length]
    }
    if (options.symbols && !has(SYMBOLS)) {
      password = password.slice(0, -1) + SYMBOLS[array[3] % SYMBOLS.length]
    }
  }

  // Ensure first character is a letter
  if (options.firstLetter && password.length > 0) {
    let letters = ''
    if (options.uppercase) letters += UPPERCASE
    if (options.lowercase) letters += LOWERCASE
    if (options.excludeSimilar) {
      for (const ch of SIMILAR) {
        letters = letters.replace(ch, '')
      }
    }
    if (letters) {
      password = letters[array[array.length - 1] % letters.length] + password.slice(1)
    }
  }

  if (options.capitalize && password.length > 0) {
    password = password.charAt(0).toUpperCase() + password.slice(1)
  }

  return password
}

export function generatePasswords(options: PasswordOptions, count: number): string[] {
  return Array.from({ length: count }, () => generatePassword(options))
}

export function calculateStrength(password: string): { score: number; label: string } {
  let score = 0
  if (password.length >= 8) score += 25
  if (password.length >= 12) score += 15
  if (password.length >= 16) score += 10
  if (/[a-z]/.test(password)) score += 10
  if (/[A-Z]/.test(password)) score += 10
  if (/[0-9]/.test(password)) score += 10
  if (/[^a-zA-Z0-9]/.test(password)) score += 10
  if (password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) score += 10

  if (score >= 80) return { score, label: 'strong' }
  if (score >= 60) return { score, label: 'good' }
  if (score >= 40) return { score, label: 'medium' }
  return { score, label: 'weak' }
}
