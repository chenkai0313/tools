import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '密码生成器' : 'Password Generator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线随机密码生成器，支持大写字母、小写字母、数字、特殊符号自由组合，可自定义密码长度并排除相似容易混淆的字符。'
      : 'Online random password generator. Customize length, include uppercase/lowercase/numbers/symbols, and exclude similar characters.',
    keywords: '密码生成, 随机密码, 密码生成器, 强密码, 在线密码工具',
    openGraph: {
      title: `${lang === 'zh' ? '密码生成器' : 'Password Generator'} - 站长工具`,
      description: lang === 'zh'
        ? '在线密码生成器，自定义长度和字符类型，生成强密码。'
        : 'Online password generator with customizable length and character types.',
    },
    alternates: { languages: { 'zh': '/zh/tools/password', 'en': '/en/tools/password' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
