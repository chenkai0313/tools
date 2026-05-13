'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'

const MAX_SIZE = 20 * 1024 * 1024 // 20MB

type FormatType = 'png' | 'jpeg' | 'webp' | 'original'

export default function ImageToolsPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [tab, setTab] = useState<'compress' | 'crop'>('compress')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  // Compress state
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState<FormatType>('original')
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null)
  const [compressedSize, setCompressedSize] = useState(0)

  // Crop state
  const [cropX, setCropX] = useState(0)
  const [cropY, setCropY] = useState(0)
  const [cropW, setCropW] = useState(200)
  const [cropH, setCropH] = useState(200)
  const [lockAspect, setLockAspect] = useState(false)
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = useCallback((f: File) => {
    setError('')
    setCompressedUrl(null)
    setCroppedUrl(null)
    if (f.size > MAX_SIZE) {
      setError(lang === 'zh' ? '文件大小不能超过 20MB' : 'File size must not exceed 20MB')
      return
    }
    if (!f.type.startsWith('image/')) {
      setError(lang === 'zh' ? '请选择图片文件' : 'Please select an image file')
      return
    }
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreviewUrl(url)
  }, [lang])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [handleFile])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }, [handleFile])

  // Compress
  const doCompress = useCallback(() => {
    if (!previewUrl) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const mime = format === 'original' ? (file?.type || 'image/jpeg') : `image/${format}`
      canvas.toBlob((blob) => {
        if (!blob) return
        if (compressedUrl) URL.revokeObjectURL(compressedUrl)
        const url = URL.createObjectURL(blob)
        setCompressedUrl(url)
        setCompressedSize(blob.size)
      }, mime, quality / 100)
    }
    img.src = previewUrl
  }, [previewUrl, format, quality, file])

  // Crop
  const doCrop = useCallback(() => {
    const img = imgRef.current
    if (!img) return
    const canvas = canvasRef.current!
    canvas.width = cropW
    canvas.height = cropH
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)
    canvas.toBlob((blob) => {
      if (!blob) return
      if (croppedUrl) URL.revokeObjectURL(croppedUrl)
      const url = URL.createObjectURL(blob)
      setCroppedUrl(url)
    }, 'image/png')
  }, [cropX, cropY, cropW, cropH, croppedUrl])

  const download = (url: string, name: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const aspectRatio = useMemo(() => {
    if (cropW && cropH && cropW > 0 && cropH > 0) return cropW / cropH
    return 1
  }, [cropW, cropH])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-dark-50 mb-2">{dict.nav['image-tools']}</h1>
      <div className="mb-6 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '图片压缩和裁剪是 Web 开发中最高频的图片处理需求——压缩减小页面加载体积、裁剪调整展示尺寸。这个工具使用浏览器 Canvas API 完成所有操作，图片文件不会上传到任何服务器，保护你的隐私和敏感图片安全。'
            : 'Image compression and cropping are the most frequent image processing tasks in web development — compression reduces page load size, cropping adjusts display dimensions. This tool uses the browser Canvas API for all operations; image files are never uploaded anywhere, protecting your privacy and sensitive images.'}
        </p>
        <p>
          {lang === 'zh'
            ? '支持 PNG/JPG/WebP 三种格式，最大 20MB 文件。压缩支持质量调节和格式切换（JPEG 体积最小，WebP 平衡体积和质量）。裁剪支持自定义 X/Y/宽/高和锁定宽高比。处理后一键下载。'
            : 'Supports PNG/JPG/WebP formats, max 20MB. Compression with quality adjustment and format switching (JPEG for smallest size, WebP for balanced size/quality). Cropping with custom X/Y/Width/Height and aspect ratio lock. One-click download after processing.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['compress', 'crop'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${tab === t ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08]'}`}
          >
            {t === 'compress' ? (lang === 'zh' ? '压缩' : 'Compress') : (lang === 'zh' ? '裁剪' : 'Crop')}
          </button>
        ))}
      </div>

      {/* Upload area */}
      {!previewUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('image-input')?.click()}
          className="rounded-xl border-2 border-dashed border-white/[0.1] bg-white/[0.02] p-12 text-center cursor-pointer hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all mb-6"
        >
          <svg className="w-10 h-10 mx-auto text-dark-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-dark-300 mb-1">
            {lang === 'zh' ? '点击上传或拖拽图片到此处' : 'Click or drag & drop an image'}
          </p>
          <p className="text-xs text-dark-500">{lang === 'zh' ? '支持 PNG / JPG / WebP，最大 20MB' : 'PNG / JPG / WebP, max 20MB'}</p>
          <input id="image-input" type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4 mb-6">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {previewUrl && (
        <>
          {/* Preview */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-dark-100">{lang === 'zh' ? '预览' : 'Preview'}</h3>
              <button onClick={() => { setPreviewUrl(null); setFile(null); setCompressedUrl(null); setCroppedUrl(null) }}
                className="text-xs text-dark-400 hover:text-red-400 transition-colors"
              >
                {lang === 'zh' ? '移除' : 'Remove'}
              </button>
            </div>
            <img ref={imgRef} src={previewUrl} alt="preview" className="max-h-64 mx-auto rounded-lg" />
            {file && (
              <p className="text-xs text-dark-400 text-center mt-2">
                {file.name} — {formatFileSize(file.size)}
              </p>
            )}
          </div>

          {/* Compress controls */}
          {tab === 'compress' && (
            <>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-6">
                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  <div>
                    <label className="text-xs text-dark-400 mb-1.5 block">{lang === 'zh' ? '质量' : 'Quality'}: {quality}%</label>
                    <input type="range" min="1" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 mb-1.5 block">{lang === 'zh' ? '格式' : 'Format'}</label>
                    <select value={format} onChange={(e) => setFormat(e.target.value as FormatType)}
                      className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
                    >
                      <option value="original">{lang === 'zh' ? '保持原格式' : 'Original'}</option>
                      <option value="jpeg">JPEG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WebP</option>
                    </select>
                  </div>
                </div>
                <button onClick={doCompress}
                  className="rounded-lg bg-indigo-500/20 px-6 py-2 text-sm font-medium text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
                >
                  {lang === 'zh' ? '应用压缩' : 'Apply Compression'}
                </button>
              </div>

              {/* Compress result */}
              {compressedUrl && (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-8">
                  <div className="grid gap-4 sm:grid-cols-2 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-dark-500 mb-1">{lang === 'zh' ? '原始大小' : 'Original'}</p>
                      <p className="text-lg font-bold text-dark-50">{file ? formatFileSize(file.size) : '-'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-dark-500 mb-1">{lang === 'zh' ? '压缩后' : 'Compressed'}</p>
                      <p className="text-lg font-bold text-green-400">{formatFileSize(compressedSize)}</p>
                      {file && (
                        <p className="text-xs text-dark-400">
                          {Math.round((1 - compressedSize / file.size) * 100)}% {lang === 'zh' ? '减少' : 'smaller'}
                        </p>
                      )}
                    </div>
                  </div>
                  <img src={compressedUrl} alt="compressed" className="max-h-48 mx-auto rounded-lg mb-3" />
                  <button onClick={() => download(compressedUrl, `compressed.${format === 'original' ? (file?.name.split('.').pop() || 'jpg') : format}`)}
                    className="w-full rounded-lg bg-indigo-500/20 py-2 text-sm font-medium text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
                  >
                    {lang === 'zh' ? '下载' : 'Download'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Crop controls */}
          {tab === 'crop' && (
            <>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-dark-400 mb-1 block">X</label>
                    <input type="number" value={cropX} onChange={(e) => setCropX(Math.max(0, Number(e.target.value)))}
                      min="0" className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 mb-1 block">Y</label>
                    <input type="number" value={cropY} onChange={(e) => setCropY(Math.max(0, Number(e.target.value)))}
                      min="0" className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 mb-1 block">{lang === 'zh' ? '宽度' : 'Width'}</label>
                    <input type="number" value={cropW} onChange={(e) => {
                      const v = Math.max(1, Number(e.target.value))
                      setCropW(v)
                      if (lockAspect) setCropH(Math.round(v / aspectRatio))
                    }}
                      min="1" className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 mb-1 block">{lang === 'zh' ? '高度' : 'Height'}</label>
                    <input type="number" value={cropH} onChange={(e) => {
                      const v = Math.max(1, Number(e.target.value))
                      setCropH(v)
                      if (lockAspect) setCropW(Math.round(v * aspectRatio))
                    }}
                      min="1" className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 mb-4">
                  <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)}
                    className="accent-indigo-500"
                  />
                  <span className="text-xs text-dark-400">{lang === 'zh' ? '锁定宽高比' : 'Lock aspect ratio'}</span>
                </label>
                <button onClick={doCrop}
                  className="rounded-lg bg-indigo-500/20 px-6 py-2 text-sm font-medium text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
                >
                  {lang === 'zh' ? '应用裁剪' : 'Apply Crop'}
                </button>
              </div>

              {/* Crop result */}
              {croppedUrl && (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-8">
                  <img src={croppedUrl} alt="cropped" className="max-h-64 mx-auto rounded-lg mb-3" />
                  <button onClick={() => download(croppedUrl, `cropped_${cropW}x${cropH}.png`)}
                    className="w-full rounded-lg bg-indigo-500/20 py-2 text-sm font-medium text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
                  >
                    {lang === 'zh' ? '下载' : 'Download'}
                  </button>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </>
          )}
        </>
      )}

      {toolContent['image-tools'][lang as 'zh' | 'en']}
    </div>
  )
}
