import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '数字转中文大写' : 'Number to Chinese Characters'} - 站长工具`,
    description: lang === 'zh'
      ? '在线数字转中文工具，支持阿拉伯数字转中文小写、大写金额两种格式。适用于中文数字读数、财务凭证、发票金额大写转换。'
      : 'Online number to Chinese characters converter. Convert Arabic numbers to Chinese numerals and financial uppercase. Perfect for invoices and financial documents.',
    keywords: 'number to Chinese, Chinese numeral converter, 数字转中文, 大写金额, 数字转大写, 中文数字, 金额大写, 财务数字转换',
    alternates: { languages: { 'zh': '/zh/tools/number-chinese', 'en': '/en/tools/number-chinese' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
