import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'Base64 图片' : 'Base64 Image'} - 站长工具`,
    description: lang === 'zh'
      ? '在线Base64与图片互转工具，支持PNG/JPG/GIF/WebP格式，上传图片自动生成Base64编码，粘贴Base64实时预览图片。'
      : 'Online Base64 image converter. Convert images to Base64 strings and vice versa, supports PNG/JPG/GIF/WebP with live preview.',
    keywords: 'Base64 encoder, Base64 decoder, image to Base64, Base64 image converter, online Base64 tool, Base64, 图片转Base64, Base64转图片, Base64编码, 在线Base64工具',
    openGraph: {
      title: `${lang === 'zh' ? 'Base64 图片' : 'Base64 Image'} - 站长工具`,
      description: lang === 'zh'
        ? 'Base64与图片互转工具，支持PNG/JPG/GIF/WebP格式。'
        : 'Convert between Base64 strings and images, supports PNG/JPG/GIF/WebP.',
    },
    alternates: { languages: { 'zh': '/zh/tools/base64', 'en': '/en/tools/base64' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
