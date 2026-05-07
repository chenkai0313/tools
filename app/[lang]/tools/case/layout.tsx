import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '命名转换' : 'Case Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线命名格式转换工具，支持驼峰(camelCase)、帕斯卡(PascalCase)、下划线(snake_case)、短横线(kebab-case)、点号(dot.case)等8种编程命名格式互转，实时预览结果。'
      : 'Online case converter supporting camelCase, PascalCase, snake_case, kebab-case, dot.case and more. Real-time conversion between 8 naming conventions.',
    keywords: 'camelCase converter, snake_case converter, case converter online, naming convention converter, string case converter, 驼峰, 下划线, 命名转换, camelCase, snake_case, 代码命名, 大小写转换',
    openGraph: {
      title: `${lang === 'zh' ? '命名转换' : 'Case Converter'} - 站长工具`,
      description: lang === 'zh'
        ? '支持8种编程命名格式互转，实时预览。'
        : 'Convert between 8 programming naming conventions in real time.',
    },
    alternates: { languages: { 'zh': '/zh/tools/case', 'en': '/en/tools/case' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
