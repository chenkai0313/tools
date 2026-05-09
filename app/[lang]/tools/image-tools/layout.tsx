import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '图片压缩裁剪工具' : 'Image Compressor & Cropper'} - 站长工具`,
    description: lang === 'zh'
      ? '在线图片压缩和裁剪工具，浏览器本地处理不上传服务器。支持调整图片质量、尺寸裁剪、格式转换（PNG/JPEG/WebP）。'
      : 'Online image compressor and cropper. All processing done locally in your browser. Supports quality adjustment, cropping, and format conversion (PNG/JPEG/WebP).',
    keywords: 'image compressor, image cropper, resize image, reduce image size, PNG to WebP, online image tool, 图片压缩, 图片裁剪, 压缩图片, 调整图片大小, 证件照裁剪',
          openGraph: {
      title: `${lang === 'zh' ? '图片压缩裁剪工具' : 'Image Compressor & Cropper'} - 站长工具`,
      description: lang === 'zh'
        ? '在线图片压缩和裁剪工具，浏览器本地处理不上传服务器。支持调整图片质量、尺寸裁剪、格式转换（PNG/JPEG/W...'
        : 'Online image compressor and cropper. All processing don...',
    },
    alternates: {
      languages: { 'zh': '/zh/tools/image-tools', 'en': '/en/tools/image-tools' },
      canonical: `https://schg.xyz/${lang}/tools/image-tools`,
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
