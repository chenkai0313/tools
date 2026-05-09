import type { Metadata } from 'next'

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
        : 'Online random test data generator. Generate fake names,...',
    },
    alternates: {
      languages: { 'zh': '/zh/tools/random-data', 'en': '/en/tools/random-data' },
      canonical: `https://schg.xyz/${lang}/tools/random-data`,
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
