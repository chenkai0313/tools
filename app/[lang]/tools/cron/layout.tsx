import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'Cron 表达式' : 'Cron Expression'} - 站长工具`,
    description: lang === 'zh'
      ? '在线Cron表达式解析生成工具，支持5位和6位Cron格式，将Cron转换为可读的时间描述，实时预览最近5次执行时间。'
      : 'Online cron expression parser and generator. Parse cron expressions to human-readable schedules, preview next 5 execution times.',
    keywords: 'cron expression parser, crontab generator, cron schedule builder, cron translator, online cron tool, Cron, Cron表达式, 定时任务, 计划任务, crontab, 在线Cron工具',
    openGraph: {
      title: `${lang === 'zh' ? 'Cron 表达式' : 'Cron Expression'} - 站长工具`,
      description: lang === 'zh'
        ? 'Cron表达式解析与生成，支持转可读文本和执行时间预览。'
        : 'Cron expression parser and generator with human-readable output.',
    },
    alternates: { languages: { 'zh': '/zh/tools/cron/', 'en': '/en/tools/cron/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = 'Cron 表达式'
  const enName = 'Cron Expression'
  const zhDesc = '在线Cron表达式解析生成工具，将Cron转为可读时间描述，实时预览最近5次执行时间。'
  const enDesc = 'Online cron expression parser. Parse cron schedules to readable text and preview next execution times.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/cron/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/cron/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/cron/` },
      ]} />
      {children}
    </>
  )
}
