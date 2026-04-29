import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '哈希计算' : 'Hash Calculator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线哈希计算工具，支持 MD5、SHA-1、SHA-256、SHA-384、SHA-512 等哈希算法，实时计算结果。'
      : 'Online hash calculator supporting MD5, SHA-1, SHA-256, SHA-384, SHA-512 algorithms.',
    keywords: 'MD5, SHA-256, SHA-512, 哈希计算, hash, 加密哈希',
    alternates: { languages: { 'zh': '/zh/tools/hash', 'en': '/en/tools/hash' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
