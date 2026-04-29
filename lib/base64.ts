export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result)
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export function base64ToImageSrc(base64: string): string {
  const cleaned = base64.trim()
  if (cleaned.startsWith('data:')) return cleaned
  const mime = detectMimeType(cleaned)
  return `data:${mime};base64,${cleaned}`
}

export function detectMimeType(base64: string): string {
  const clean = base64.replace(/^data:[^;]+;base64,/, '').substring(0, 20)
  const bytes = atob(clean)
  const code = bytes.charCodeAt(0)

  if (code === 0xFF) return 'image/jpeg'
  if (code === 0x89) return 'image/png'
  if (code === 0x47) return 'image/gif'
  if (code === 0x52) return 'image/webp'
  if (bytes.startsWith('<svg')) return 'image/svg+xml'
  return 'image/png'
}

export function isValidBase64(str: string): boolean {
  const clean = str.replace(/^data:[^;]+;base64,/, '')
  try {
    atob(clean)
    return clean.length > 0
  } catch {
    return false
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
