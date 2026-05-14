import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

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
        ? '在线图片压缩和裁剪工具，浏览器本地处理不上传服务器。支持调整图片质量、尺寸裁剪、格式转换（PNG/JPEG/WebP）。'
        : 'Online image compressor and cropper. All processing done locally. Supports quality, crop, and format conversion.',
    },
    alternates: { languages: { 'zh': '/zh/tools/image-tools/', 'en': '/en/tools/image-tools/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '图片压缩裁剪工具'
  const enName = 'Image Compressor & Cropper'
  const zhDesc = '在线图片压缩和裁剪工具，浏览器本地处理。支持质量调整、裁剪、格式转换。'
  const enDesc = 'Online image compressor and cropper. All processing done locally. Supports quality, crop, format conversion.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/image-tools/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/image-tools/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/image-tools/` },
      ]} />
      {children}
    </>
  )
}
