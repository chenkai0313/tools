import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '编码转换' : 'Encoding Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线编码转换工具，支持Unicode(\\uXXXX)编解码和URL百分号编解码，输入文本实时转换，双击复制结果。'
      : 'Online encoding converter supporting Unicode (\\uXXXX) and URL percent-encoding/decoding with real-time results.',
    keywords: 'URL encoder, URL decoder, Unicode converter, percent encoding, online encoder decoder, Unicode, URL编码, URL解码, 编码转换, 百分号编码, 在线编码工具',
    openGraph: {
      title: `${lang === 'zh' ? '编码转换' : 'Encoding Converter'} - 站长工具`,
      description: lang === 'zh'
        ? 'Unicode和URL编解码在线转换工具。'
        : 'Online Unicode and URL encoding/decoding converter.',
    },
    alternates: { languages: { 'zh': '/zh/tools/encoding', 'en': '/en/tools/encoding' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
