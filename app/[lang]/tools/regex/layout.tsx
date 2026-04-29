import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '正则表达式测试' : 'Regex Tester'} - 站长工具`,
    description: lang === 'zh'
      ? '在线正则表达式测试工具，支持实时匹配高亮、多组捕获结果展示、flags 切换。'
      : 'Online regex tester with real-time match highlighting, group capture display, and flags support.',
    keywords: '正则表达式, regex, 正则测试, 正则匹配, 在线正则工具',
    alternates: { languages: { 'zh': '/zh/tools/regex', 'en': '/en/tools/regex' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
