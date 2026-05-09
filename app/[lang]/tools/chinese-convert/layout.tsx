import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '简繁体中文转换' : 'Chinese Converter (Simplified/Traditional)'} - 站长工具`,
    description: lang === 'zh'
      ? '在线简繁体中文互转工具，支持简体中文转繁体、繁体转简体，一键切换，所见即所得。覆盖大陆简体、港澳繁体、台湾正体。'
      : 'Online Chinese converter between Simplified and Traditional Chinese. One-click switch between Simplified to Traditional Chinese. Supports mainland China, Hong Kong/Macau, and Taiwan variants.',
    keywords: 'simplified Chinese to traditional, traditional to simplified, Chinese character converter, 简繁体转换, 简体转繁体, 繁体转简体, 中文转换, 正体字, 港澳繁体',
    alternates: { languages: { 'zh': '/zh/tools/chinese-convert', 'en': '/en/tools/chinese-convert' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
