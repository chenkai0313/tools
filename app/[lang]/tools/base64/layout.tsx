import type { Metadata } from 'next'
import { WebApplicationSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'Base64 图片' : 'Base64 Image'} - 站长工具`,
    description: lang === 'zh'
      ? '在线Base64与图片互转工具，支持PNG/JPG/GIF/WebP格式，上传图片自动生成Base64编码，粘贴Base64实时预览图片。'
      : 'Online Base64 image converter. Convert images to Base64 strings and vice versa, supports PNG/JPG/GIF/WebP with live preview.',
    keywords: 'Base64 encoder, Base64 decoder, image to Base64, Base64 image converter, online Base64 tool, Base64, 图片转Base64, Base64转图片, Base64编码, 在线Base64工具',
    openGraph: {
      title: `${lang === 'zh' ? 'Base64 图片' : 'Base64 Image'} - 站长工具`,
      description: lang === 'zh'
        ? 'Base64与图片互转工具，支持PNG/JPG/GIF/WebP格式。'
        : 'Convert between Base64 strings and images, supports PNG/JPG/GIF/WebP.',
    },
    alternates: { languages: { 'zh': '/zh/tools/base64/', 'en': '/en/tools/base64/' } },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const zhName = 'Base64 图片'
  const enName = 'Base64 Image'
  const zhDesc = '在线Base64与图片互转工具，支持PNG/JPG/GIF/WebP格式，上传自动编码，粘贴Base64实时预览。'
  const enDesc = 'Online Base64 image converter. Convert images to Base64 and vice versa with live preview.'
  const home = lang === 'zh' ? '首页' : 'Home'
  const tools = lang === 'zh' ? '工具' : 'Tools'
  const base = 'https://schg.xyz'

  return (
    <>
      <WebApplicationSchema
        name={lang === 'zh' ? zhName : enName}
        description={lang === 'zh' ? zhDesc : enDesc}
        url={`${base}/${lang}/tools/base64/`}
        lang={lang}
      />
      <BreadcrumbListSchema items={[
        { name: home, url: `${base}/${lang}/` },
        { name: tools, url: `${base}/${lang}/tools/base64/` },
        { name: lang === 'zh' ? zhName : enName, url: `${base}/${lang}/tools/base64/` },
      ]} />
      {children}
    </>
  )
}
