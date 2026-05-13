'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useRef, useEffect, useCallback } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
import QRCode from 'qrcode'

export default function QRCodePage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const logoRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')
  const [size, setSize] = useState(320)
  const [logo, setLogo] = useState<string | null>(null)
  const [error, setError] = useState('')

  const generate = useCallback(async () => {
    if (!text.trim()) return
    setError('')
    try {
      await QRCode.toCanvas(canvasRef.current, text.trim(), {
        width: size,
        margin: 2,
        color: { dark: '#ffffff', light: '#00000000' },
      })

      if (logo && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          const img = new Image()
          img.onload = () => {
            const logoSize = size * 0.2
            const x = (size - logoSize) / 2
            const y = (size - logoSize) / 2
            // White background for logo
            ctx.fillStyle = '#0a0a0f'
            ctx.beginPath()
            ctx.roundRect(x - 4, y - 4, logoSize + 8, logoSize + 8, 6)
            ctx.fill()
            ctx.drawImage(img, x, y, logoSize, logoSize)
          }
          img.src = logo
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }, [text, size, logo])

  useEffect(() => {
    generate()
  }, [generate])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setLogo(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const download = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = `qrcode_${Date.now()}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.qrcode}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.qrcode}</h1>
      <div className="mb-8 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '二维码（QR Code）是当今连接物理世界和数字世界最便捷的桥梁——扫一扫就能访问网站、连接 Wi-Fi、添加联系人、完成支付。这个工具让你在浏览器中即时生成高质量的 QR Code，无需安装任何软件或依赖第三方 API。'
            : 'QR codes are the most convenient bridge between the physical and digital worlds — scan to visit a website, connect to Wi-Fi, add a contact, or complete a payment. This tool generates high-quality QR codes instantly in your browser — no software installation or third-party API calls needed.'}
        </p>
        <p>
          {lang === 'zh'
            ? '支持自定义尺寸（128px-1024px）、在二维码中央嵌入 Logo 图片、一键下载为高清 PNG。所有生成在浏览器本地使用 Canvas API 完成，输入的文本内容不会上传到任何服务器——扫码内容只有你和扫码者知道。'
            : 'Customizable size (128px-1024px), optional center logo overlay, and one-click PNG download. All generation uses the Canvas API locally in your browser — your input text is never uploaded anywhere. Only you and the person scanning know what\'s encoded.'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <label className="block text-xs text-dark-300 mb-2">
            {lang === 'zh' ? '内容' : 'Content'}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={lang === 'zh' ? '输入文本或URL...' : 'Enter text or URL...'}
            rows={3}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 text-sm text-dark-50 font-mono placeholder-dark-400 outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all resize-y"
          />

          <label className="block text-xs text-dark-300 mt-4 mb-2">
            {lang === 'zh' ? '尺寸: ' : 'Size: '}{size}px
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="128"
              max="1024"
              step="32"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="flex-1 accent-indigo-500"
            />
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Math.max(64, Math.min(2048, Number(e.target.value) || 320)))}
              className="w-20 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-1.5 text-sm text-dark-50 text-center outline-none focus:border-indigo-500/40 transition-all"
            />
          </div>

          <label className="block text-xs text-dark-300 mt-4 mb-2">
            {lang === 'zh' ? 'Logo (可选)' : 'Logo (optional)'}
          </label>
          <div className="flex items-center gap-3">
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <button
              onClick={() => logoRef.current?.click()}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.06] transition-all"
            >
              {lang === 'zh' ? '选择图片' : 'Choose Image'}
            </button>
            {logo && (
              <button
                onClick={() => { setLogo(null); if (logoRef.current) logoRef.current.value = '' }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition-all"
              >
                {lang === 'zh' ? '清除' : 'Clear'}
              </button>
            )}
          </div>
          {logo && (
            <p className="mt-1 text-xs text-dark-300">
              {lang === 'zh' ? '已选择 Logo' : 'Logo selected'}
            </p>
          )}

          {error && (
            <p className="mt-3 text-sm text-red-300">{error}</p>
          )}
        </div>

        {/* QR Code Display */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 flex flex-col items-center justify-center">
          {text.trim() ? (
            <>
              <div className="rounded-xl bg-dark-950/50 p-4">
                <canvas ref={canvasRef} className="block" />
              </div>
              <button
                onClick={download}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
              >
                {lang === 'zh' ? '下载 PNG' : 'Download PNG'}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-dark-400">
              <span className="text-4xl mb-3">📱</span>
              <p className="text-sm">{lang === 'zh' ? '输入内容后自动生成' : 'Enter content to generate'}</p>
            </div>
          )}
        </div>
      </div>

      {toolContent.qrcode[lang as 'zh' | 'en']}
    </div>
  )
}
