import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'Cron 表达式' : 'Cron Expression'} - 站长工具`,
    description: lang === 'zh'
      ? 'Cron表达式解析与生成工具，支持Cron转可读文本、自然语言转Cron、最近执行时间预览。'
      : 'Cron expression parser and generator, convert between cron and human-readable text.',
    alternates: { languages: { 'zh': '/zh/tools/cron', 'en': '/en/tools/cron' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
