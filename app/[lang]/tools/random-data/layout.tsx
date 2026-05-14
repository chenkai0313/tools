import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '随机数据生成器' : 'Random Data Generator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线随机测试数据生成器，一键生成假名、邮箱、手机号、地址、UUID、IP 等测试数据，支持 CSV 和 JSON 导出。'
      : 'Online random test data generator. Generate fake names, emails, phone numbers, addresses, UUIDs, IPs and more. Export as CSV or JSON.',
    keywords: 'random data generator, fake data generator, mock data, test data, CSV export, 随机数据生成, 测试数据, 假数据, 模拟数据',
    openGraph: {
      title: `${lang === 'zh' ? '随机数据生成器' : 'Random Data Generator'} - 站长工具`,
      description: lang === 'zh'
        ? '在线随机测试数据生成器，一键生成假名、邮箱、手机号、地址、UUID、IP等测试数据，支持CSV和JSON导出。'
        : 'Online random test data generator. Generate fake names, emails, phone numbers, addresses, UUIDs, IPs and more.',
    },
    alternates: { languages: { 'zh': '/zh/tools/random-data/', 'en': '/en/tools/random-data/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '随机数据生成器'
  const enName = 'Random Data Generator'
  const zhDesc = '在线随机测试数据生成器，一键生成假名、邮箱、手机号、地址、UUID等测试数据。'
  const enDesc = 'Online random test data generator. Generate fake names, emails, phone numbers, addresses, UUIDs and more.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/random-data/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/random-data/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/random-data/` },
      ]} />
      {children}
    </>
  )
}
