import Link from 'next/link'
import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '联系我们' : 'Contact Us'} - 站长工具`,
    description: lang === 'zh'
      ? '联系 Ken 站长工具团队。报告工具问题、提交功能建议或提供反馈意见。'
      : 'Get in touch with the Ken Webmaster Tools team. Report bugs, suggest features, or send feedback.',
    keywords: lang === 'zh' ? '联系站长, 反馈建议, bug报告, 功能建议' : 'contact webmaster, feedback, feature request, bug report',
    alternates: { languages: { 'zh': '/zh/contact/', 'en': '/en/contact/' } },
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
        <span className="text-dark-200">{lang === 'zh' ? '联系我们' : 'Contact'}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{lang === 'zh' ? '联系我们' : 'Contact Us'}</h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh'
          ? '有问题、建议或发现了 Bug？欢迎随时联系。这是一个个人维护的项目，每封邮件我都会亲自阅读。'
          : 'Have feedback, suggestions, or found a bug? Reach out anytime. This is a personally maintained project — I read every email.'}
      </p>

      <div className="space-y-6">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">Email</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-2">
            {lang === 'zh' ? '如有任何反馈、建议或意见，请发送邮件至：' : 'For feedback, suggestions, or inquiries:'}
          </p>
          <a
            href="mailto:ckck0313@gmail.com"
            className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors font-mono"
          >
            ckck0313@gmail.com
          </a>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '报告 Bug' : 'Report a Bug'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? '如果某个工具出现异常行为或错误，请在邮件中包含以下信息，帮助我快速定位问题：'
              : 'If a tool behaves unexpectedly, please include the following in your email to help resolve it quickly:'}
          </p>
          <ul className="space-y-1.5 text-sm text-dark-200">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '你使用的是哪个工具' : 'Which tool you were using'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '复现问题的步骤' : 'Steps to reproduce the issue'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '预期结果与实际结果的差异' : 'Expected vs actual behavior'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '浏览器和操作系统版本' : 'Your browser and OS version'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '浏览器控制台中的错误信息（如有）' : 'Any error messages in the browser console'}</span>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '功能建议' : 'Feature Requests'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '有想要的新工具或功能改进想法？欢迎发送邮件建议，标题注明"功能建议"。这个工具站会持续更新，好的想法我会尽量实现。'
              : 'Have an idea for a new tool or an improvement? Send suggestions via email with "Feature Request" in the subject line. This toolkit is actively maintained — good ideas get built.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '响应时间' : 'Response Time'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '通常在 2-3 个工作日内回复。紧急问题请在邮件标题注明"紧急"。'
              : 'Typically respond within 2-3 business days. For urgent issues, include "Urgent" in the subject line.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '其他页面' : 'Other Pages'}</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href={`/${lang}/about`} className="text-indigo-300 hover:text-indigo-200 transition-colors">
              {lang === 'zh' ? '关于我们' : 'About Us'}
            </Link>
            <span className="text-dark-500">·</span>
            <Link href={`/${lang}/disclaimer`} className="text-indigo-300 hover:text-indigo-200 transition-colors">
              {lang === 'zh' ? '免责声明' : 'Disclaimer'}
            </Link>
            <span className="text-dark-500">·</span>
            <Link href={`/${lang}/cookie-policy`} className="text-indigo-300 hover:text-indigo-200 transition-colors">
              {lang === 'zh' ? 'Cookie 政策' : 'Cookie Policy'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
