import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '密码生成器' : 'Password Generator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线密码生成器，支持大小写字母、数字、特殊符号混合，可自定义长度和排除相似字符。'
      : 'Online password generator with customizable length, character types, and similar character exclusion.',
    alternates: { languages: { 'zh': '/zh/tools/password', 'en': '/en/tools/password' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
