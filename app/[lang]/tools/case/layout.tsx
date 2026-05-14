import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

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
    alternates: { languages: { 'zh': '/zh/tools/case/', 'en': '/en/tools/case/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '命名转换'
  const enName = 'Case Converter'
  const zhDesc = '在线命名格式转换工具，支持驼峰、帕斯卡、下划线、短横线等8种编程命名格式互转。'
  const enDesc = 'Online case converter. Convert between camelCase, PascalCase, snake_case, kebab-case and more naming conventions.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/case/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/case/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/case/` },
      ]} />
      {children}
    </>
  )
}
