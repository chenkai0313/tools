import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '二维码生成' : 'QR Code Generator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线二维码生成器，支持文本、网址、联系方式等内容生成二维码，可自定义尺寸(128-1024px)并上传Logo图片嵌入二维码中央，一键下载PNG格式。'
      : 'Online QR code generator. Generate QR codes from text or URLs with adjustable size (128-1024px) and custom logo overlay. Download as PNG.',
    keywords: '二维码生成, QR Code, 二维码制作, 二维码工具, QR生成器, 二维码带Logo',
    openGraph: {
      title: `${lang === 'zh' ? '二维码生成' : 'QR Code Generator'} - 站长工具`,
      description: lang === 'zh'
        ? '自定义尺寸和Logo的在线二维码生成器。'
        : 'Online QR code generator with custom size and logo support.',
    },
    alternates: { languages: { 'zh': '/zh/tools/qrcode', 'en': '/en/tools/qrcode' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
