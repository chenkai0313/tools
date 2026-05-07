import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '加解密工具' : 'Encryption/Decryption'} - 站长工具`,
    description: lang === 'zh'
      ? '在线加解密工具，支持 AES/DES 对称加密解密和 RSA 非对称加密解密，密钥生成、签名验证，所有计算在浏览器端完成，不上传服务器。'
      : 'Online encryption/decryption tool. Supports AES/DES symmetric encryption and RSA asymmetric encryption with key generation and signing. All processing runs in-browser.',
    keywords: 'AES encrypt decrypt online, RSA key generator, DES encryption tool, online encryption tool, crypto tool, AES, DES, RSA, 加密, 解密, 对称加密, 非对称加密, 签名, 密钥生成',
    openGraph: {
      title: `${lang === 'zh' ? '加解密工具' : 'Encryption/Decryption'} - 站长工具`,
      description: lang === 'zh'
        ? 'AES/DES/RSA在线加解密，密钥生成、签名验证，浏览器端处理。'
        : 'Online AES/DES/RSA encryption/decryption with key generation and signing.',
    },
    alternates: { languages: { 'zh': '/zh/tools/crypto', 'en': '/en/tools/crypto' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
