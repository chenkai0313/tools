import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '时间戳转换' : 'Timestamp Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线时间戳转换工具，支持秒级和毫秒级时间戳与日期时间互转，实时预览，双击复制结果。'
      : 'Online timestamp converter. Convert between Unix seconds/milliseconds timestamps and human-readable date/time with real-time preview.',
    keywords: '时间戳, Unix时间戳, 日期转换, timestamp, 时间转换工具',
    openGraph: {
      title: `${lang === 'zh' ? '时间戳转换' : 'Timestamp Converter'} - 站长工具`,
      description: lang === 'zh'
        ? '在线时间戳与日期时间互转工具，支持秒级和毫秒级。'
        : 'Online timestamp to date converter, supports seconds and milliseconds.',
    },
    alternates: { languages: { 'zh': '/zh/tools/time', 'en': '/en/tools/time' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
