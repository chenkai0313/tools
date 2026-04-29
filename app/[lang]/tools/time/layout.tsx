import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '时间戳转换' : 'Timestamp Converter'} - 站长工具`,
    description: lang === 'zh'
      ? '在线时间戳与日期时间互转工具，支持秒级和毫秒级时间戳转换，实时预览结果。'
      : 'Online timestamp to date converter, supports seconds and milliseconds.',
    alternates: { languages: { 'zh': '/zh/tools/time', 'en': '/en/tools/time' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
