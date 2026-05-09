import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '世界时钟 / 时区转换' : 'World Clock / Timezone Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线世界时钟和时区转换工具，多城市时间对照，添加任意时区查看当前时间，支持时区转换计算，旅行规划必备。'
      : 'Online world clock and timezone converter. Add multiple cities to compare current times, convert between timezones. Perfect for travel planning.',
    keywords: 'world clock, timezone converter, time zone map, UTC converter, world time, 世界时钟, 时区转换, 全球时间, 时差查询, UTC时间, 多城市时间',
    alternates: { languages: { 'zh': '/zh/tools/world-clock', 'en': '/en/tools/world-clock' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
