import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '世界时钟 / 时区转换' : 'World Clock / Timezone Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线世界时钟和时区转换工具，多城市时间对照，添加任意时区查看当前时间，支持时区转换计算，旅行规划必备。'
      : 'Online world clock and timezone converter. Add multiple cities to compare current times, convert between timezones. Perfect for travel planning.',
    keywords: 'world clock, timezone converter, time zone map, UTC converter, world time, 世界时钟, 时区转换, 全球时间, 时差查询, UTC时间, 多城市时间',
    openGraph: {
      title: `${lang === 'zh' ? '世界时钟 / 时区转换' : 'World Clock / Timezone Converter'} - 站长工具`,
      description: lang === 'zh'
        ? '在线世界时钟和时区转换工具，多城市时间对照，添加任意时区查看当前时间，支持时区转换计算。'
        : 'Online world clock and timezone converter. Add multiple cities to compare current times.',
    },
    alternates: { languages: { 'zh': '/zh/tools/world-clock/', 'en': '/en/tools/world-clock/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '世界时钟 / 时区转换'
  const enName = 'World Clock / Timezone Converter'
  const zhDesc = '在线世界时钟和时区转换工具，多城市时间对照，添加任意时区查看当前时间。'
  const enDesc = 'Online world clock and timezone converter. Compare times across multiple cities and timezones.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/world-clock/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/world-clock/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/world-clock/` },
      ]} />
      {children}
    </>
  )
}
