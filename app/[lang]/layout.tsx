import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)

  return (
    <>
      <Header dict={dict} locale={lang} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} locale={lang} />
    </>
  )
}
