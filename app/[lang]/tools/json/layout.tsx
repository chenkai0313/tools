import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'JSON 工具' : 'JSON Tools'} - 站长工具`,
    description: lang === 'zh'
      ? '在线JSON格式化、校验、字段提取，支持生成Go/TypeScript/Rust/Python/Java结构体。'
      : 'Online JSON formatter, validator, field extractor, and struct generator for Go/TS/Rust/Python/Java.',
    alternates: { languages: { 'zh': '/zh/tools/json', 'en': '/en/tools/json' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
