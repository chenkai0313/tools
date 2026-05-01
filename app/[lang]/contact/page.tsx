import Link from 'next/link'
import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Contact Us - 站长工具',
    description: 'Get in touch with the Ken Webmaster Tools team. Report bugs, suggest features, or send feedback.',
    alternates: { languages: { 'zh': '/zh/contact', 'en': '/en/contact' } },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">Contact</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">Contact Us</h1>
      <p className="mb-8 text-sm text-dark-300">Have feedback or found an issue? We&apos;d like to hear from you.</p>

      <div className="space-y-6">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">Email</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-2">
            For general inquiries, feedback, or support:
          </p>
          <a
            href="mailto:ckck0313@gmail.com"
            className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors font-mono"
          >
            ckck0313@gmail.com
          </a>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">Report a Bug</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            If you encounter a bug or unexpected behavior, please include the following information to help us
            resolve it quickly:
          </p>
          <ul className="space-y-1.5 text-sm text-dark-200">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>Which tool you were using</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>Steps to reproduce the issue</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>Expected vs actual behavior</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>Your browser and operating system version</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>Any error messages shown in the browser console</span>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">Feature Requests</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            Have an idea for a new tool or an improvement to an existing one? We&apos;re always looking to make
            the toolkit more useful. Send us your suggestions via email with &quot;Feature Request&quot; in the
            subject line.
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">Response Time</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            We typically respond to inquiries within 2–3 business days. For urgent issues, please include
            &quot;Urgent&quot; in the subject line.
          </p>
        </section>
      </div>
    </div>
  )
}
