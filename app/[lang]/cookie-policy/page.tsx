import Link from 'next/link'
import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'Cookie 政策' : 'Cookie Policy'} - 站长工具`,
    description: lang === 'zh' ? '了解本站如何使用 Cookie 以及你如何管理 Cookie 偏好设置。' : 'Learn how this site uses cookies and how you can manage your cookie preferences.',
    alternates: { languages: { 'zh': '/zh/cookie-policy/', 'en': '/en/cookie-policy/' } },
  }
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{lang === 'zh' ? 'Cookie 政策' : 'Cookie Policy'}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{lang === 'zh' ? 'Cookie 政策' : 'Cookie Policy'}</h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? '最后更新：2026年5月13日' : 'Last updated: May 13, 2026'}
      </p>

      <div className="space-y-6 text-sm text-dark-200 leading-relaxed">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '什么是 Cookie' : 'What Are Cookies'}</h2>
          <p className="mb-3">
            {lang === 'zh'
              ? 'Cookie 是网站在你设备上存储的小型文本文件，用于记住你的偏好、保持登录状态或分析网站使用情况。Cookie 不包含可执行代码，不会传播病毒。'
              : 'Cookies are small text files stored on your device by websites to remember preferences, maintain sessions, or analyze site usage. Cookies contain no executable code and cannot spread viruses.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '本站如何使用 Cookie' : 'How We Use Cookies'}</h2>
          <p className="mb-3">
            {lang === 'zh'
              ? '本站（schg.xyz）是一个纯前端工具网站，不使用任何后端服务器。我们对 Cookie 的使用极其有限：'
              : 'This site (schg.xyz) is a pure frontend toolkit with no backend server. Our use of cookies is extremely minimal:'}
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              {lang === 'zh'
                ? <span><strong>语言偏好 Cookie</strong> — 本站存储一个名为 <code className="bg-dark-800/50 px-1 rounded text-xs">lang</code> 的 Cookie 来记住你的语言选择（中文或英文）。这是功能性 Cookie，不跟踪你的行为，不用于广告目的。有效期：一年。</span>
                : <span><strong>Language Preference Cookie</strong> — We store a single cookie named <code className="bg-dark-800/50 px-1 rounded text-xs">lang</code> to remember your language preference (English or Chinese). This is a functional cookie. It does not track your behavior and is not used for advertising. Duration: 1 year.</span>}
            </li>
            <li>
              {lang === 'zh'
                ? <span><strong>第三方 Cookie（Google AdSense）</strong> — 本站使用 Google AdSense 展示广告。Google 可能会在你的设备上放置 Cookie 来投放基于兴趣的广告。这些 Cookie 由 Google 管理，受 Google 隐私政策约束。</span>
                : <span><strong>Third-Party Cookies (Google AdSense)</strong> — We use Google AdSense to display ads. Google may place cookies on your device to serve interest-based advertisements. These cookies are managed by Google and subject to Google\'s Privacy Policy.</span>}
            </li>
            <li>
              {lang === 'zh'
                ? <span><strong>百度统计 Cookie</strong> — 本站使用百度统计（Baidu Analytics）来了解网站访问情况。百度统计使用 Cookie 收集匿名的访问数据（页面浏览、访问时长等），不包含个人身份信息。</span>
                : <span><strong>Baidu Analytics Cookie</strong> — We use Baidu Analytics to understand site traffic. Baidu Analytics uses cookies to collect anonymous visit data (page views, visit duration, etc.) that does not include personally identifiable information.</span>}
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? 'Google AdSense 和个性化广告' : 'Google AdSense & Personalized Ads'}</h2>
          <p className="mb-3">
            {lang === 'zh'
              ? 'Google 使用广告 Cookie 来向用户展示更相关的广告。这些 Cookie 帮助 Google 根据你访问本站及其他网站的情况投放个性化广告。'
              : 'Google uses advertising cookies to show users more relevant ads. These cookies help Google serve personalized ads based on your visits to this site and other websites.'}
          </p>
          <p className="mb-3">
            {lang === 'zh'
              ? '你可以随时通过 Google 广告设置页面（google.com/settings/ads）管理你的广告偏好，或者通过 Network Advertising Initiative（optout.networkadvertising.org）选择退出个性化广告。'
              : 'You can manage your ad preferences anytime through Google Ads Settings (google.com/settings/ads), or opt out of personalized advertising via the Network Advertising Initiative (optout.networkadvertising.org).'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '如何管理 Cookie' : 'How to Manage Cookies'}</h2>
          <p className="mb-3">
            {lang === 'zh'
              ? '你可以在浏览器设置中控制或删除 Cookie。以下是主流浏览器的 Cookie 设置指南：'
              : 'You can control or delete cookies in your browser settings. Here are guides for major browsers:'}
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>{lang === 'zh' ? 'Chrome：设置 → 隐私与安全 → Cookie 及其他网站数据' : 'Chrome: Settings → Privacy and security → Cookies and other site data'}</li>
            <li>{lang === 'zh' ? 'Firefox：选项 → 隐私与安全 → Cookie 与网站数据' : 'Firefox: Options → Privacy & Security → Cookies and Site Data'}</li>
            <li>{lang === 'zh' ? 'Safari：偏好设置 → 隐私 → Cookie 与网站数据' : 'Safari: Preferences → Privacy → Cookies and website data'}</li>
            <li>{lang === 'zh' ? 'Edge：设置 → Cookie 与网站权限' : 'Edge: Settings → Cookies and site permissions'}</li>
          </ul>
          <p className="mt-3">
            {lang === 'zh'
              ? '请注意：禁用 Cookie 可能会影响网站的某些功能（如语言偏好记忆），但不会影响工具的正常使用。'
              : 'Please note: Disabling cookies may affect some site features (like language preference memory), but will not affect the functionality of the tools themselves.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '联系我们' : 'Contact Us'}</h2>
          <p>
            {lang === 'zh'
              ? '如果你对本站的 Cookie 使用有任何疑问，请通过 ckck0313@gmail.com 联系我们。'
              : 'If you have any questions about our cookie practices, please contact us at ckck0313@gmail.com.'}
          </p>
        </section>
      </div>
    </div>
  )
}
