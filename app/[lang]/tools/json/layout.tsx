import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'JSON 工具' : 'JSON Tools'} - 站长工具`,
    description: lang === 'zh'
      ? '在线JSON格式化校验工具，支持JSON语法高亮、压缩、字段提取，一键生成Go/TypeScript/Rust/Python/Java结构体定义。'
      : 'Online JSON formatter and validator. Format, validate, compress JSON, and generate struct definitions for Go, TypeScript, Rust, Python, and Java.',
    keywords: 'JSON格式化, JSON校验, JSON解析, JSON转结构体, 在线JSON工具',
    openGraph: {
      title: `${lang === 'zh' ? 'JSON 工具' : 'JSON Tools'} - 站长工具`,
      description: lang === 'zh'
        ? '在线JSON格式化、校验、字段提取，支持多语言结构体生成。'
        : 'Online JSON formatter, validator, and struct generator for multiple languages.',
    },
    alternates: { languages: { 'zh': '/zh/tools/json', 'en': '/en/tools/json' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
