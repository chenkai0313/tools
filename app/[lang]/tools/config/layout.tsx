import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '配置文件格式转化' : 'Config Format Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线配置文件格式互转工具，支持 YAML、JSON、TOML、INI、Properties、.env、XML 七种格式之间的相互转换，实时转换并自动检测输入格式。'
      : 'Online config format converter supporting YAML, JSON, TOML, INI, Properties, .env, and XML. Auto-detect input format and convert between any formats.',
    keywords: 'YAML to JSON converter, TOML to YAML, config format converter, online YAML parser, JSON to TOML, YAML, JSON, TOML, INI, Properties, .env, XML, 配置文件, 格式转换, 在线转换',
    openGraph: {
      title: `${lang === 'zh' ? '配置文件格式转化' : 'Config Format Converter'} - 站长工具`,
      description: lang === 'zh'
        ? 'YAML/JSON/TOML/INI/Properties/.env/XML 七种格式互转。'
        : 'Convert between YAML, JSON, TOML, INI, Properties, .env, and XML.',
    },
    alternates: { languages: { 'zh': '/zh/tools/config/', 'en': '/en/tools/config/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '配置文件格式转化'
  const enName = 'Config Format Converter'
  const zhDesc = '在线配置文件格式互转工具，支持YAML/JSON/TOML/INI/Properties/.env/XML七种格式互转。'
  const enDesc = 'Online config format converter. Convert between YAML, JSON, TOML, INI, Properties, .env, and XML.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/config/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/config/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/config/` },
      ]} />
      {children}
    </>
  )
}
