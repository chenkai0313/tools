import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '编码转换' : 'Encoding Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线编码转换工具，支持 Unicode 编解码、URL 编解码，实时转换结果。'
      : 'Online encoding converter supporting Unicode and URL encoding/decoding with real-time results.',
    keywords: 'Unicode, URL编码, 编码转换, 解码, 在线编码工具',
    alternates: { languages: { 'zh': '/zh/tools/encoding', 'en': '/en/tools/encoding' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
