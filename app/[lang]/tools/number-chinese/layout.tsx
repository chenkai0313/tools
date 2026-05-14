import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '数字转中文大写' : 'Number to Chinese Characters'} - 站长工具`,
    description: lang === 'zh'
      ? '在线数字转中文工具，支持阿拉伯数字转中文小写、大写金额两种格式。适用于中文数字读数、财务凭证、发票金额大写转换。'
      : 'Online number to Chinese characters converter. Convert Arabic numbers to Chinese numerals and financial uppercase. Perfect for invoices and financial documents.',
    keywords: 'number to Chinese, Chinese numeral converter, 数字转中文, 大写金额, 数字转大写, 中文数字, 金额大写, 财务数字转换',
    openGraph: {
      title: `${lang === 'zh' ? '数字转中文大写' : 'Number to Chinese Characters'} - 站长工具`,
      description: lang === 'zh'
        ? '在线数字转中文工具，支持阿拉伯数字转中文小写、大写金额两种格式。适用于中文数字读数、财务凭证。'
        : 'Online number to Chinese characters converter. Convert Arabic numbers to Chinese numerals and financial uppercase.',
    },
    alternates: { languages: { 'zh': '/zh/tools/number-chinese/', 'en': '/en/tools/number-chinese/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '数字转中文大写'
  const enName = 'Number to Chinese Characters'
  const zhDesc = '在线数字转中文工具，支持阿拉伯数字转中文小写、大写金额两种格式。'
  const enDesc = 'Online number to Chinese characters converter. Convert Arabic numbers to Chinese numerals and financial uppercase.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/number-chinese/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/number-chinese/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/number-chinese/` },
      ]} />
      {children}
    </>
  )
}
