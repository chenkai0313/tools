import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '二维码生成' : 'QR Code Generator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线二维码生成器，支持文本、URL等内容生成二维码，可自定义尺寸并添加Logo图片。'
      : 'Online QR code generator. Create QR codes from text or URLs with custom size and logo support.',
    keywords: '二维码生成, QR Code, 二维码制作, 二维码工具',
    alternates: { languages: { 'zh': '/zh/tools/qrcode', 'en': '/en/tools/qrcode' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
