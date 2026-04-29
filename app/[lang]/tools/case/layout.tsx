import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '命名转换' : 'Case Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线命名格式转换工具，支持驼峰、下划线、帕斯卡、短横线、点号等8种命名格式互转。'
      : 'Online case converter supporting camelCase, snake_case, PascalCase, kebab-case, dot.case and more.',
    keywords: '驼峰, 下划线, 命名转换, camelCase, snake_case, 代码命名',
    alternates: { languages: { 'zh': '/zh/tools/case', 'en': '/en/tools/case' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
