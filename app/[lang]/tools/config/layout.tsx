import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '格式转化' : 'Config Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线配置文件格式互转工具，支持 YAML、TOML、Properties 格式之间的相互转换。'
      : 'Online config format converter. Convert between YAML, TOML, and Properties file formats.',
    keywords: 'YAML, TOML, Properties, 配置文件, 格式转换, 在线转换',
    alternates: { languages: { 'zh': '/zh/tools/config', 'en': '/en/tools/config' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
