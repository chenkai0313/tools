import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '正则表达式测试' : 'Regex Tester'} - 站长工具`,
    description: lang === 'zh'
      ? '在线正则表达式测试工具，支持g/i/m/s/u/y全部flags，输入正则实时匹配高亮，展示匹配位置和捕获分组结果，快速验证正则表达式。'
      : 'Online regex tester with real-time match highlighting, all flags (g/i/m/s/u/y), group capture display, and match position indicators.',
    keywords: '正则表达式, regex, 正则测试, 正则匹配, 在线正则工具, 正则验证',
    openGraph: {
      title: `${lang === 'zh' ? '正则表达式测试' : 'Regex Tester'} - 站长工具`,
      description: lang === 'zh'
        ? '在线正则测试，实时匹配高亮，支持完整flags。'
        : 'Online regex tester with real-time highlighting and full flag support.',
    },
    alternates: { languages: { 'zh': '/zh/tools/regex', 'en': '/en/tools/regex' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
