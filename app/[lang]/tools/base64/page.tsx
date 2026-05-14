'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useRef } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
import RelatedTools from '@/components/RelatedTools'
import { fileToBase64, base64ToImageSrc, isValidBase64, formatFileSize } from '@/lib/base64'

export default function Base64ToolPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [base64Input, setBase64Input] = useState('')
  const [previewSrc, setPreviewSrc] = useState('')
  const [previewError, setPreviewError] = useState('')
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; base64: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleBase64Input = useCallback((value: string) => {
    setBase64Input(value)
    setPreviewError('')
    if (!value.trim()) {
      setPreviewSrc('')
      return
    }
    if (isValidBase64(value)) {
      setPreviewSrc(base64ToImageSrc(value))
    } else {
      setPreviewError(lang === 'zh' ? '无效的 Base64 字符串' : 'Invalid Base64 string')
      setPreviewSrc('')
    }
  }, [lang])

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setPreviewError(lang === 'zh' ? '请选择图片文件' : 'Please select an image file')
      return
    }
    const b64 = await fileToBase64(file)
    setUploadedFile({ name: file.name, size: formatFileSize(file.size), base64: b64 })
    setPreviewError('')
  }, [lang])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setFlash(true)
    setTimeout(() => setCopied(false), 1500)
    setTimeout(() => setFlash(false), 400)
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.base64}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.base64}</h1>
      <div className="mb-8 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? 'Base64 是一种用 64 个可打印字符（A-Z、a-z、0-9、+、/）表示任意二进制数据的编码方式。它广泛应用于 Web 开发中——将小图标直接内嵌到 HTML/CSS 中减少 HTTP 请求、在邮件 HTML 中嵌入图片避免外部链接失效、在 JSON API 中传输二进制文件。这个工具让你在 Base64 字符串和图片文件之间即时互相转换，支持 PNG、JPEG、GIF、WebP 四种格式。'
            : 'Base64 encodes arbitrary binary data using 64 printable characters (A-Z, a-z, 0-9, +, /). It\'s widely used in web development — inlining small icons in HTML/CSS to reduce HTTP requests, embedding images in HTML emails to avoid broken links, and transmitting binary files in JSON APIs. This tool converts between Base64 strings and image files instantly, supporting PNG, JPEG, GIF, and WebP formats.'}
        </p>
        <p>
          {lang === 'zh'
            ? '所有图片处理完全在浏览器端完成，使用 Canvas API 和 FileReader——你的图片不会上传到任何服务器。支持拖拽上传、实时预览、一键复制 Base64 data URL。非常适合前端开发者在开发调试时快速获取图片的 Base64 编码。'
            : 'All processing happens entirely in your browser using the Canvas API and FileReader — your images are never uploaded anywhere. Supports drag-and-drop, live preview, and one-click copy of Base64 data URLs. Perfect for frontend developers who need quick Base64 encoding during development.'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Base64 → Image */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="mb-4 text-sm font-semibold text-dark-50">
            {lang === 'zh' ? 'Base64 → 图片' : 'Base64 → Image'}
          </h2>
          <textarea
            value={base64Input}
            onChange={(e) => handleBase64Input(e.target.value)}
            placeholder={lang === 'zh' ? '粘贴 Base64 字符串...' : 'Paste Base64 string...'}
            rows={6}
            className="w-full rounded-lg border border-white/[0.06] bg-dark-800 px-4 py-3 text-xs font-mono text-dark-100 placeholder-dark-500 outline-none resize-y focus:border-indigo-500/40 transition-all"
          />
          {previewError && (
            <p className="mt-2 text-xs text-red-400">{previewError}</p>
          )}
          {previewSrc && !previewError && (
            <div className="mt-4">
              <div className="flex items-center justify-center rounded-lg border border-white/[0.06] bg-dark-800 p-4 min-h-[150px]">
                <img src={previewSrc} alt="Preview" className="max-w-full max-h-[200px] rounded object-contain" />
              </div>
            </div>
          )}
        </div>

        {/* Image → Base64 */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="mb-4 text-sm font-semibold text-dark-50">
            {lang === 'zh' ? '图片 → Base64' : 'Image → Base64'}
          </h2>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-all cursor-pointer ${
              dragOver ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="text-3xl mb-3">🖼️</span>
            <p className="text-sm text-dark-300">
              {lang === 'zh' ? '点击或拖拽上传图片' : 'Click or drag to upload'}
            </p>
            <p className="mt-1 text-xs text-dark-500">PNG / JPG / GIF / WebP</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
            />
          </div>
          {uploadedFile && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-dark-800 p-3">
                <img src={uploadedFile.base64} alt="" className="w-12 h-12 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-dark-200 truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-dark-500">{uploadedFile.size}</p>
                </div>
              </div>
              <div className="relative group">
                <pre
                  onDoubleClick={() => handleCopy(uploadedFile.base64)}
                  className={`w-full rounded-lg border px-4 py-3 text-xs font-mono overflow-auto whitespace-pre-wrap break-all max-h-[300px] cursor-pointer select-none transition-all ${
                    flash
                      ? 'border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.15)] text-indigo-100'
                      : 'border-white/[0.06] bg-dark-800 text-dark-100 hover:border-white/[0.1]'
                  }`}>
                  {uploadedFile.base64}
                </pre>
                <div className="absolute top-2 right-2">
                  {copied ? (
                    <span className="px-2 py-1 rounded text-xs font-medium text-indigo-300 animate-pulse bg-indigo-500/10">{lang === 'zh' ? '已复制 ✓' : 'Copied ✓'}</span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs font-medium text-dark-500 bg-dark-800/80 opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'zh' ? '双击复制' : 'Copy'}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {toolContent.base64[lang as 'zh' | 'en']}
      <RelatedTools lang={lang} current="base64" />
    </div>
  )
}
