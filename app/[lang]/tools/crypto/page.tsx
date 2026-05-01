'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useRef } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
import CryptoJS from 'crypto-js'
import {
  generateRSAKeyPair, exportPublicKey, exportPrivateKey,
  importPublicKey, importPrivateKey,
  rsaEncrypt, rsaDecrypt,
  rsaSign, rsaVerify,
} from '@/lib/crypto'

type SymAlgo = 'AES' | 'DES'
type SymMode = 'encrypt' | 'decrypt'

export default function CryptoPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [tab, setTab] = useState<'sym' | 'rsa'>('sym')

  // Symmetric state
  const [symAlgo, setSymAlgo] = useState<SymAlgo>('AES')
  const [symMode, setSymMode] = useState<SymMode>('encrypt')
  const [symKey, setSymKey] = useState('')
  const [symInput, setSymInput] = useState('')
  const [symResult, setSymResult] = useState('')
  const [symError, setSymError] = useState('')

  // RSA state
  const [rsaMode, setRsaMode] = useState<'encrypt' | 'sign'>('encrypt')
  const [publicKeyPem, setPublicKeyPem] = useState('')
  const [privateKeyPem, setPrivateKeyPem] = useState('')
  const [rsaInput, setRsaInput] = useState('')
  const [rsaResult, setRsaResult] = useState('')
  const [rsaError, setRsaError] = useState('')
  const [rsaProcessing, setRsaProcessing] = useState(false)

  // Copy states
  const [copiedSym, setCopiedSym] = useState(false)
  const [flashSym, setFlashSym] = useState(false)
  const [copiedRsa, setCopiedRsa] = useState(false)
  const [flashRsa, setFlashRsa] = useState(false)

  const symResultRef = useRef<HTMLDivElement>(null)
  const rsaResultRef = useRef<HTMLDivElement>(null)

  // Symmetric operations
  const doSymmetric = useCallback(() => {
    if (!symInput.trim() || !symKey) { setSymResult(''); return }
    setSymError('')
    try {
      if (symMode === 'encrypt') {
        const encrypted = symAlgo === 'AES'
          ? CryptoJS.AES.encrypt(symInput, symKey).toString()
          : CryptoJS.DES.encrypt(symInput, symKey).toString()
        setSymResult(encrypted)
      } else {
        const decrypted = symAlgo === 'AES'
          ? CryptoJS.AES.decrypt(symInput, symKey).toString(CryptoJS.enc.Utf8)
          : CryptoJS.DES.decrypt(symInput, symKey).toString(CryptoJS.enc.Utf8)
        if (!decrypted) throw new Error(lang === 'zh' ? '解密失败：密钥错误或数据损坏' : 'Decryption failed: wrong key or corrupted data')
        setSymResult(decrypted)
      }
    } catch (e) {
      setSymError(e instanceof Error ? e.message : String(e))
      setSymResult('')
    }
  }, [symAlgo, symMode, symKey, symInput, lang])

  const generateSymKey = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
    let key = ''
    for (let i = 0; i < 16; i++) key += chars.charAt(Math.floor(Math.random() * chars.length))
    setSymKey(key)
  }, [])

  // RSA operations
  const generateRSA = useCallback(async () => {
    setRsaProcessing(true)
    setRsaError('')
    try {
      const { publicKey, privateKey } = await generateRSAKeyPair()
      const [pubPem, privPem] = await Promise.all([exportPublicKey(publicKey), exportPrivateKey(privateKey)])
      setPublicKeyPem(pubPem)
      setPrivateKeyPem(privPem)
    } catch (e) {
      setRsaError(e instanceof Error ? e.message : String(e))
    } finally {
      setRsaProcessing(false)
    }
  }, [])

  const doRSA = useCallback(async () => {
    if (!rsaInput.trim()) { setRsaResult(''); return }
    setRsaError('')
    setRsaProcessing(true)
    try {
      if (rsaMode === 'encrypt') {
        // Public key encrypt
        if (!publicKeyPem) throw new Error(lang === 'zh' ? '请先生成或粘贴公钥' : 'Generate or paste a public key first')
        const pubKey = await importPublicKey(publicKeyPem)
        const encrypted = await rsaEncrypt(pubKey, rsaInput)
        setRsaResult(encrypted)
      } else {
        // Private key sign (as "私钥加密" equivalent)
        if (!privateKeyPem) throw new Error(lang === 'zh' ? '请先生成或粘贴私钥' : 'Generate or paste a private key first')
        const privKey = await importPrivateKey(privateKeyPem)
        const signature = await rsaSign(privKey, rsaInput)
        setRsaResult(signature)
      }
    } catch (e) {
      setRsaError(e instanceof Error ? e.message : String(e))
      setRsaResult('')
    } finally {
      setRsaProcessing(false)
    }
  }, [rsaMode, rsaInput, publicKeyPem, privateKeyPem, lang])

  const doRsaDecrypt = useCallback(async () => {
    if (!rsaInput.trim()) { setRsaResult(''); return }
    setRsaError('')
    setRsaProcessing(true)
    try {
      if (!privateKeyPem) throw new Error(lang === 'zh' ? '请先生成或粘贴私钥' : 'Generate or paste a private key first')
      const privKey = await importPrivateKey(privateKeyPem)
      const decrypted = await rsaDecrypt(privKey, rsaInput)
      setRsaResult(decrypted)
    } catch (e) {
      setRsaError(e instanceof Error ? e.message : String(e))
      setRsaResult('')
    } finally {
      setRsaProcessing(false)
    }
  }, [rsaInput, privateKeyPem, lang])

  const doRsaVerify = useCallback(async () => {
    if (!rsaInput.trim()) { setRsaResult(''); return }
    setRsaError('')
    setRsaProcessing(true)
    try {
      // Format: data and signature separated by newline
      const lines = rsaInput.split('\n')
      if (lines.length < 2) throw new Error(lang === 'zh' ? '格式: 第一行原始数据，第二行签名(base64)' : 'Format: line 1 = data, line 2 = signature (base64)')
      const data = lines[0]
      const signatureB64 = lines.slice(1).join('\n').trim()
      if (!publicKeyPem) throw new Error(lang === 'zh' ? '请先生成或粘贴公钥' : 'Generate or paste a public key first')
      const pubKey = await importPublicKey(publicKeyPem)
      const valid = await rsaVerify(pubKey, data, signatureB64)
      setRsaResult(valid ? (lang === 'zh' ? '✓ 签名验证通过' : '✓ Signature verified') : (lang === 'zh' ? '✗ 签名验证失败' : '✗ Signature invalid'))
    } catch (e) {
      setRsaError(e instanceof Error ? e.message : String(e))
      setRsaResult('')
    } finally {
      setRsaProcessing(false)
    }
  }, [rsaInput, publicKeyPem, lang])

  const copySymResult = useCallback(async () => {
    if (!symResult) return
    await navigator.clipboard.writeText(symResult)
    setCopiedSym(true); setFlashSym(true)
    setTimeout(() => setCopiedSym(false), 1500)
    setTimeout(() => setFlashSym(false), 400)
  }, [symResult])

  const copyRsaResult = useCallback(async () => {
    if (!rsaResult) return
    await navigator.clipboard.writeText(rsaResult)
    setCopiedRsa(true); setFlashRsa(true)
    setTimeout(() => setCopiedRsa(false), 1500)
    setTimeout(() => setFlashRsa(false), 400)
  }, [rsaResult])

  const copyPem = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.crypto}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.crypto}</h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? 'AES/DES 对称加密 和 RSA 非对称加密' : 'AES/DES symmetric encryption and RSA asymmetric encryption'}
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('sym')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === 'sym'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
          }`}
        >
          AES / DES
        </button>
        <button
          onClick={() => setTab('rsa')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === 'rsa'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
          }`}
        >
          RSA
        </button>
      </div>

      {tab === 'sym' ? (
        /* ============ SYMMETRIC ============ */
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          {/* Algorithm + Mode */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(['AES', 'DES'] as SymAlgo[]).map((a) => (
              <button key={a} onClick={() => setSymAlgo(a)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  symAlgo === a
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
                }`}>{a}</button>
            ))}
            <span className="w-px bg-white/[0.06] mx-1" />
            <button onClick={() => setSymMode('encrypt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                symMode === 'encrypt'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
              }`}>{lang === 'zh' ? '加密' : 'Encrypt'}</button>
            <button onClick={() => setSymMode('decrypt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                symMode === 'decrypt'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
              }`}>{lang === 'zh' ? '解密' : 'Decrypt'}</button>
          </div>

          {/* Key */}
          <div className="mb-4">
            <label className="block text-xs text-dark-300 mb-2">{lang === 'zh' ? '密钥' : 'Key'}</label>
            <div className="flex gap-2">
              <input type="text" value={symKey} onChange={(e) => setSymKey(e.target.value)}
                placeholder={lang === 'zh' ? '输入密钥或点击生成...' : 'Enter a key or generate...'}
                className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all"
              />
              <button onClick={generateSymKey}
                className="shrink-0 px-3 py-2 rounded-lg text-xs font-medium bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.06] transition-all">
                {lang === 'zh' ? '生成' : 'Generate'}
              </button>
            </div>
          </div>

          {/* Input */}
          <textarea value={symInput} onChange={(e) => setSymInput(e.target.value)}
            placeholder={symMode === 'encrypt'
              ? (lang === 'zh' ? '输入要加密的文本...' : 'Enter text to encrypt...')
              : (lang === 'zh' ? '输入要解密的密文 (Base64)...' : 'Enter ciphertext (Base64) to decrypt...')}
            rows={4}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all resize-y"
          />

          {/* Execute */}
          <button onClick={doSymmetric}
            className="mt-3 px-4 py-2 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all">
            {symMode === 'encrypt'
              ? (lang === 'zh' ? '加密 ▸' : 'Encrypt ▸')
              : (lang === 'zh' ? '解密 ▸' : 'Decrypt ▸')}
          </button>

          {/* Result */}
          {symResult && (
            <div ref={symResultRef}
              onDoubleClick={copySymResult}
              className={`mt-4 rounded-lg px-4 py-3 cursor-pointer select-none group transition-all font-mono text-sm break-all ${
                flashSym
                  ? 'bg-indigo-500/15 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
                  : 'bg-white/[0.04] hover:bg-white/[0.06]'
              }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-dark-300">{symMode === 'encrypt' ? (lang === 'zh' ? '密文' : 'Ciphertext') : (lang === 'zh' ? '明文' : 'Plaintext')}</span>
                {copiedSym && <span className="text-xs text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>}
              </div>
              <span className="text-dark-100">{symResult}</span>
            </div>
          )}
          {symError && <p className="mt-3 text-sm text-red-300">{symError}</p>}
        </div>
      ) : (
        /* ============ RSA ============ */
        <div className="space-y-6">
          {/* Key Management */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-dark-50">{lang === 'zh' ? 'RSA 密钥对' : 'RSA Key Pair'}</span>
              <button onClick={generateRSA} disabled={rsaProcessing}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all disabled:opacity-50">
                {rsaProcessing ? (lang === 'zh' ? '生成中...' : 'Generating...') : (lang === 'zh' ? '生成密钥对' : 'Generate Keys')}
              </button>
            </div>

            {/* Public Key */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-dark-300">{lang === 'zh' ? '公钥 (加密用)' : 'Public Key (for encryption)'}</span>
                {publicKeyPem && (
                  <button onClick={() => copyPem(publicKeyPem)} className="text-xs text-indigo-400 hover:text-indigo-300">
                    {lang === 'zh' ? '复制' : 'Copy'}
                  </button>
                )}
              </div>
              <textarea value={publicKeyPem} onChange={(e) => setPublicKeyPem(e.target.value)}
                placeholder={lang === 'zh' ? '粘贴公钥 PEM 或点击生成...' : 'Paste public key PEM or generate...'}
                rows={4}
                className="w-full rounded-lg border border-white/[0.06] bg-dark-950/50 px-3 py-2 text-xs text-dark-100 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all resize-y"
              />
            </div>

            {/* Private Key */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-dark-300">{lang === 'zh' ? '私钥 (解密用)' : 'Private Key (for decryption)'}</span>
                {privateKeyPem && (
                  <button onClick={() => copyPem(privateKeyPem)} className="text-xs text-indigo-400 hover:text-indigo-300">
                    {lang === 'zh' ? '复制' : 'Copy'}
                  </button>
                )}
              </div>
              <textarea value={privateKeyPem} onChange={(e) => setPrivateKeyPem(e.target.value)}
                placeholder={lang === 'zh' ? '粘贴私钥 PEM 或点击生成...' : 'Paste private key PEM or generate...'}
                rows={4}
                className="w-full rounded-lg border border-white/[0.06] bg-dark-950/50 px-3 py-2 text-xs text-dark-100 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all resize-y"
              />
            </div>
          </div>

          {/* Operations */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="flex gap-2 mb-4">
              <button onClick={() => setRsaMode('encrypt')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  rsaMode === 'encrypt'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
                }`}>
                {lang === 'zh' ? '公钥加密 / 私钥解密' : 'Encrypt/Decrypt'}
              </button>
              <button onClick={() => setRsaMode('sign')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  rsaMode === 'sign'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-dark-300 border border-white/[0.06] hover:bg-white/[0.06]'
                }`}>
                {lang === 'zh' ? '私钥签名 / 公钥验证' : 'Sign/Verify'}
              </button>
            </div>

            {rsaMode === 'encrypt' ? (
              <>
                <p className="text-xs text-dark-400 mb-3">
                  {lang === 'zh' ? '输入明文 → 点击"公钥加密" → 输出 Base64 密文；粘贴密文 → 点击"私钥解密" → 还原明文' : 'Enter plaintext → "Encrypt" → Base64 output; paste ciphertext → "Decrypt" → plaintext'}
                </p>
                <textarea value={rsaInput} onChange={(e) => setRsaInput(e.target.value)}
                  placeholder={lang === 'zh' ? '输入要加密的文本或要解密的 Base64 密文...' : 'Enter text to encrypt or Base64 ciphertext to decrypt...'}
                  rows={4}
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all resize-y"
                />
                <div className="flex gap-2 mt-3">
                  <button onClick={doRSA} disabled={rsaProcessing}
                    className="px-4 py-2 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all disabled:opacity-50">
                    {lang === 'zh' ? '公钥加密 ▸' : 'Encrypt ▸'}
                  </button>
                  <button onClick={doRsaDecrypt} disabled={rsaProcessing}
                    className="px-4 py-2 rounded-lg text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-all disabled:opacity-50">
                    {lang === 'zh' ? '私钥解密 ▸' : 'Decrypt ▸'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-dark-400 mb-3">
                  {lang === 'zh'
                    ? '输入原始数据 → 点击"私钥签名" → 输出 Base64 签名。验证时：第一行原始数据，换行后粘贴签名，点击"公钥验证"'
                    : 'Enter data → "Sign" → Base64 signature. To verify: line 1 = data, line 2 = signature, click "Verify"'}
                </p>
                <textarea value={rsaInput} onChange={(e) => setRsaInput(e.target.value)}
                  placeholder={lang === 'zh' ? '签名模式：输入要签名的文本\n验证模式：第一行原始数据\n第二行签名(base64)' : 'Sign: enter text to sign\nVerify: line 1 = data\nline 2 = signature (base64)'}
                  rows={4}
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 transition-all resize-y"
                />
                <div className="flex gap-2 mt-3">
                  <button onClick={doRSA} disabled={rsaProcessing}
                    className="px-4 py-2 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all disabled:opacity-50">
                    {lang === 'zh' ? '私钥签名 ▸' : 'Sign ▸'}
                  </button>
                  <button onClick={doRsaVerify} disabled={rsaProcessing}
                    className="px-4 py-2 rounded-lg text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-all disabled:opacity-50">
                    {lang === 'zh' ? '公钥验证 ▸' : 'Verify ▸'}
                  </button>
                </div>
              </>
            )}

            {/* RSA Result */}
            {rsaResult && (
              <div ref={rsaResultRef}
                onDoubleClick={copyRsaResult}
                className={`mt-4 rounded-lg px-4 py-3 cursor-pointer select-none group transition-all font-mono text-sm break-all ${
                  flashRsa
                    ? 'bg-indigo-500/15 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.06]'
                }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-dark-400">{lang === 'zh' ? '结果' : 'Result'}</span>
                  {copiedRsa && <span className="text-xs text-indigo-300 animate-pulse">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>}
                </div>
                <span className="text-dark-100 whitespace-pre-wrap">{rsaResult}</span>
              </div>
            )}
            {rsaError && <p className="mt-3 text-sm text-red-300">{rsaError}</p>}
          </div>
        </div>
      )}

      {toolContent.crypto[lang as 'zh' | 'en']}
    </div>
  )
}
