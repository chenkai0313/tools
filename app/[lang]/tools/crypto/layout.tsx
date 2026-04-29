import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '加解密工具' : 'Encryption/Decryption'} - 站长工具`,
    description: lang === 'zh'
      ? '在线加解密工具，支持 AES/DES 对称加密和 RSA 非对称加密，密钥生成、签名验证。'
      : 'Online encryption/decryption tool. Supports AES/DES symmetric and RSA asymmetric encryption with key generation and signing.',
    keywords: 'AES, DES, RSA, 加密, 解密, 对称加密, 非对称加密, 签名',
    alternates: { languages: { 'zh': '/zh/tools/crypto', 'en': '/en/tools/crypto' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
