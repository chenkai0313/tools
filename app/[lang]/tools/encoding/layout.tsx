import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

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
    alternates: { languages: { 'zh': '/zh/tools/encoding/', 'en': '/en/tools/encoding/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '编码转换'
  const enName = 'Encoding Converter'
  const zhDesc = '在线编码转换工具，支持Unicode和URL百分号编解码，输入文本实时转换。'
  const enDesc = 'Online encoding converter supporting Unicode and URL percent-encoding/decoding with real-time results.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/encoding/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/encoding/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/encoding/` },
      ]} />
      {children}
    </>
  )
}
