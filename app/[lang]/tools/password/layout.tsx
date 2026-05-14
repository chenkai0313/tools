import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '密码生成器' : 'Password Generator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线随机密码生成器，支持大写字母、小写字母、数字、特殊符号自由组合，可自定义密码长度并排除相似容易混淆的字符。'
      : 'Online random password generator. Customize length, include uppercase/lowercase/numbers/symbols, and exclude similar characters.',
    keywords: 'password generator, random password, strong password creator, secure password, online password tool, 密码生成, 随机密码, 密码生成器, 强密码, 在线密码工具',
    openGraph: {
      title: `${lang === 'zh' ? '密码生成器' : 'Password Generator'} - 站长工具`,
      description: lang === 'zh'
        ? '在线密码生成器，自定义长度和字符类型，生成强密码。'
        : 'Online password generator with customizable length and character types.',
    },
    alternates: { languages: { 'zh': '/zh/tools/password/', 'en': '/en/tools/password/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '密码生成器'
  const enName = 'Password Generator'
  const zhDesc = '在线随机密码生成器，支持大小写字母、数字、特殊符号自由组合，可自定义长度并排除易混淆字符。'
  const enDesc = 'Online random password generator. Customize length, character types, and exclude similar characters.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/password/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/password/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/password/` },
      ]} />
      {children}
    </>
  )
}
