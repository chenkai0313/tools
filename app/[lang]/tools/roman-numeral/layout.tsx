import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '罗马数字转换器' : 'Roman Numeral Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线阿拉伯数字与罗马数字互转工具，支持 1-3999 范围。识别罗马数字规则，实时转换，附带常用数值对照表。'
      : 'Online Roman numeral converter. Convert between Arabic numbers and Roman numerals (1-3999). Real-time conversion with reference chart.',
    keywords: 'Roman numeral converter, Roman numeral to number, Arabic to Roman, numeral converter, 罗马数字, 罗马数字转换, 阿拉伯数字转罗马数字, 罗马数字对照表',
    openGraph: {
      title: `${lang === 'zh' ? '罗马数字转换器' : 'Roman Numeral Converter'} - 站长工具`,
      description: lang === 'zh'
        ? '在线阿拉伯数字与罗马数字互转工具，支持1-3999范围。实时转换，附带常用数值对照表。'
        : 'Online Roman numeral converter. Convert between Arabic numbers and Roman numerals (1-3999).',
    },
    alternates: { languages: { 'zh': '/zh/tools/roman-numeral/', 'en': '/en/tools/roman-numeral/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '罗马数字转换器'
  const enName = 'Roman Numeral Converter'
  const zhDesc = '在线阿拉伯数字与罗马数字互转工具，支持1-3999范围，实时转换，附带常用数值对照表。'
  const enDesc = 'Online Roman numeral converter. Convert between Arabic numbers and Roman numerals (1-3999).'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/roman-numeral/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/roman-numeral/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/roman-numeral/` },
      ]} />
      {children}
    </>
  )
}
