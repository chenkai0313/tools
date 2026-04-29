import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'Cron 表达式' : 'Cron Expression'} - 站长工具`,
    description: lang === 'zh'
      ? '在线Cron表达式解析生成工具，支持5位和6位Cron格式，将Cron转换为可读的时间描述，实时预览最近5次执行时间。'
      : 'Online cron expression parser and generator. Parse cron expressions to human-readable schedules, preview next 5 execution times.',
    keywords: 'Cron, Cron表达式, 定时任务, 计划任务, crontab, 在线Cron工具',
    openGraph: {
      title: `${lang === 'zh' ? 'Cron 表达式' : 'Cron Expression'} - 站长工具`,
      description: lang === 'zh'
        ? 'Cron表达式解析与生成，支持转可读文本和执行时间预览。'
        : 'Cron expression parser and generator with human-readable output.',
    },
    alternates: { languages: { 'zh': '/zh/tools/cron', 'en': '/en/tools/cron' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
