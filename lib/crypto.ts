function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64.replace(/\s/g, ''))
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

export function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem.replace(/-----BEGIN [\w ]+-----/, '').replace(/-----END [\w ]+-----/, '').replace(/\s/g, '')
  return base64ToArrayBuffer(b64)
}

export function arrayBufferToPem(buf: ArrayBuffer, label: string): string {
  const b64 = arrayBufferToBase64(buf)
  const lines = b64.match(/.{1,64}/g) || []
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`
}

export async function generateRSAKeyPair(): Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }> {
  return crypto.subtle.generateKey(
    { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true,
    ['encrypt', 'decrypt']
  )
}

export async function exportPublicKey(key: CryptoKey): Promise<string> {
  const spki = await crypto.subtle.exportKey('spki', key)
  return arrayBufferToPem(spki, 'PUBLIC KEY')
}

export async function exportPrivateKey(key: CryptoKey): Promise<string> {
  const pkcs8 = await crypto.subtle.exportKey('pkcs8', key)
  return arrayBufferToPem(pkcs8, 'PRIVATE KEY')
}

export async function importPublicKey(pem: string): Promise<CryptoKey> {
  const buf = pemToArrayBuffer(pem)
  return crypto.subtle.importKey('spki', buf, { name: 'RSA-OAEP', hash: 'SHA-256' }, true, ['encrypt'])
}

export async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const buf = pemToArrayBuffer(pem)
  return crypto.subtle.importKey('pkcs8', buf, { name: 'RSA-OAEP', hash: 'SHA-256' }, true, ['decrypt'])
}

export async function rsaEncrypt(publicKey: CryptoKey, data: string): Promise<string> {
  const encoded = new TextEncoder().encode(data)
  const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encoded)
  return arrayBufferToBase64(encrypted)
}

export async function rsaDecrypt(privateKey: CryptoKey, b64data: string): Promise<string> {
  const encrypted = base64ToArrayBuffer(b64data)
  const decrypted = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, encrypted)
  return new TextDecoder().decode(decrypted)
}

// RSA Sign (private key "encrypt" equivalent)
export async function generateRSASigningKeyPair(): Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }> {
  return crypto.subtle.generateKey(
    { name: 'RSA-PSS', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true,
    ['sign', 'verify']
  )
}

export async function exportPublicVerifyKey(key: CryptoKey): Promise<string> {
  const spki = await crypto.subtle.exportKey('spki', key)
  return arrayBufferToPem(spki, 'PUBLIC KEY')
}

export async function exportPrivateSignKey(key: CryptoKey): Promise<string> {
  const pkcs8 = await crypto.subtle.exportKey('pkcs8', key)
  return arrayBufferToPem(pkcs8, 'PRIVATE KEY')
}

export async function importPublicVerifyKey(pem: string): Promise<CryptoKey> {
  const buf = pemToArrayBuffer(pem)
  return crypto.subtle.importKey('spki', buf, { name: 'RSA-PSS', hash: 'SHA-256' }, true, ['verify'])
}

export async function importPrivateSignKey(pem: string): Promise<CryptoKey> {
  const buf = pemToArrayBuffer(pem)
  return crypto.subtle.importKey('pkcs8', buf, { name: 'RSA-PSS', hash: 'SHA-256' }, true, ['sign'])
}

export async function rsaSign(privateKey: CryptoKey, data: string): Promise<string> {
  const encoded = new TextEncoder().encode(data)
  const signature = await crypto.subtle.sign({ name: 'RSA-PSS', saltLength: 32 }, privateKey, encoded)
  return arrayBufferToBase64(signature)
}

export async function rsaVerify(publicKey: CryptoKey, data: string, b64signature: string): Promise<boolean> {
  const encoded = new TextEncoder().encode(data)
  const signature = base64ToArrayBuffer(b64signature)
  return crypto.subtle.verify({ name: 'RSA-PSS', saltLength: 32 }, publicKey, signature, encoded)
}
