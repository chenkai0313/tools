import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '哈希计算' : 'Hash Calculator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线哈希值计算工具，支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法，输入文本实时计算哈希值，支持大写输出和一键复制。'
      : 'Online hash calculator supporting MD5, SHA-1, SHA-256, SHA-384, SHA-512. Real-time computation with uppercase output and one-click copy.',
    keywords: 'MD5 hash generator, SHA256 calculator, SHA512 hash, online hash tool, message digest, MD5, SHA-256, SHA-512, SHA-1, 哈希计算, hash, 加密哈希, 消息摘要',
    openGraph: {
      title: `${lang === 'zh' ? '哈希计算' : 'Hash Calculator'} - 站长工具`,
      description: lang === 'zh'
        ? '支持MD5/SHA-1/SHA-256/SHA-384/SHA-512的在线哈希计算工具。'
        : 'Online hash calculator for MD5, SHA-1, SHA-256, SHA-384, SHA-512.',
    },
    alternates: { languages: { 'zh': '/zh/tools/hash/', 'en': '/en/tools/hash/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = '哈希计算'
  const enName = 'Hash Calculator'
  const zhDesc = '在线哈希值计算工具，支持MD5、SHA-1、SHA-256、SHA-384、SHA-512算法，实时计算。'
  const enDesc = 'Online hash calculator supporting MD5, SHA-1, SHA-256, SHA-384, SHA-512 with real-time computation.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/hash/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/hash/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/hash/` },
      ]} />
      {children}
    </>
  )
}
