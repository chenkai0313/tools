import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'JSON 工具' : 'JSON Tools'} - 站长工具`,
    description: lang === 'zh'
      ? '在线JSON格式化校验工具，支持JSON语法高亮、压缩、字段提取，一键生成Go/TypeScript/Rust/Python/Java结构体定义。'
      : 'Online JSON formatter and validator. Format, validate, compress JSON, and generate struct definitions for Go, TypeScript, Rust, Python, and Java.',
    keywords: 'JSON formatter, JSON validator, JSON beautifier, online JSON tool, JSON to struct, JSON格式化, JSON校验, JSON解析, JSON转结构体, 在线JSON工具',
    openGraph: {
      title: `${lang === 'zh' ? 'JSON 工具' : 'JSON Tools'} - 站长工具`,
      description: lang === 'zh'
        ? '在线JSON格式化、校验、字段提取，支持多语言结构体生成。'
        : 'Online JSON formatter, validator, and struct generator for multiple languages.',
    },
    alternates: { languages: { 'zh': '/zh/tools/json/', 'en': '/en/tools/json/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = 'JSON 工具'
  const enName = 'JSON Tools'
  const zhDesc = '在线JSON格式化校验工具，支持语法高亮、压缩、字段提取，一键生成多语言结构体定义。'
  const enDesc = 'Online JSON formatter and validator. Format, validate, compress JSON, and generate struct definitions for multiple languages.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/json/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/json/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/json/` },
      ]} />
      {children}
    </>
  )
}
