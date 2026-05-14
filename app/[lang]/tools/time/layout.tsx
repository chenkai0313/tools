import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '时间戳转换' : 'Timestamp Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线时间戳转换工具，支持秒级和毫秒级时间戳与日期时间互转，实时预览，双击复制结果。'
      : 'Online timestamp converter. Convert between Unix seconds/milliseconds timestamps and human-readable date/time with real-time preview.',
    keywords: 'timestamp converter, unix timestamp, epoch converter, date to timestamp, online timestamp tool, 时间戳, Unix时间戳, 日期转换, timestamp, 时间转换工具',
    openGraph: {
      title: `${lang === 'zh' ? '时间戳转换' : 'Timestamp Converter'} - 站长工具`,
      description: lang === 'zh'
        ? '在线时间戳与日期时间互转工具，支持秒级和毫秒级。'
        : 'Online timestamp to date converter, supports seconds and milliseconds.',
    },
    alternates: { languages: { 'zh': '/zh/tools/time/', 'en': '/en/tools/time/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '时间戳转换'
  const enName = 'Timestamp Converter'
  const zhDesc = '在线时间戳与日期时间互转工具，支持秒级和毫秒级，实时预览，双击复制结果。'
  const enDesc = 'Online timestamp to date converter. Supports seconds and milliseconds with real-time preview.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/time/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/time/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/time/` },
      ]} />
      {children}
    </>
  )
}
