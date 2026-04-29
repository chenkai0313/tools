import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'Base64 图片' : 'Base64 Image'} - 站长工具`,
    description: lang === 'zh'
      ? 'Base64与图片互转工具，支持PNG/JPG/GIF/WebP格式，实时预览。'
      : 'Convert between Base64 strings and images, supports PNG/JPG/GIF/WebP with live preview.',
    alternates: { languages: { 'zh': '/zh/tools/base64', 'en': '/en/tools/base64' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
