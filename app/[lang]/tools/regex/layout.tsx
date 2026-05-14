import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '正则表达式测试' : 'Regex Tester'} - 站长工具`,
    description: lang === 'zh'
      ? '在线正则表达式测试工具，支持g/i/m/s/u/y全部flags，输入正则实时匹配高亮，展示匹配位置和捕获分组结果，快速验证正则表达式。'
      : 'Online regex tester with real-time match highlighting, all flags (g/i/m/s/u/y), group capture display, and match position indicators.',
    keywords: 'regex tester, regular expression tester, regex validator, online regex tool, regex debugger, 正则表达式, regex, 正则测试, 正则匹配, 在线正则工具, 正则验证',
    openGraph: {
      title: `${lang === 'zh' ? '正则表达式测试' : 'Regex Tester'} - 站长工具`,
      description: lang === 'zh'
        ? '在线正则测试，实时匹配高亮，支持完整flags。'
        : 'Online regex tester with real-time highlighting and full flag support.',
    },
    alternates: { languages: { 'zh': '/zh/tools/regex/', 'en': '/en/tools/regex/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '正则表达式测试'
  const enName = 'Regex Tester'
  const zhDesc = '在线正则表达式测试工具，实时匹配高亮，支持全部flags，展示匹配位置和捕获分组。'
  const enDesc = 'Online regex tester with real-time match highlighting, full flag support, and group capture display.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/regex/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/regex/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/regex/` },
      ]} />
      {children}
    </>
  )
}
