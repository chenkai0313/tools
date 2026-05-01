import Link from 'next/link'
import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '隐私政策' : 'Privacy Policy'} - 站长工具`,
    description: lang === 'zh' ? 'Ken 站长工具的隐私政策。了解我们收集哪些信息、如何使用以及你的权利。' : 'Privacy policy for Ken Webmaster Tools. Learn about what data we collect, how we use it, and your rights.',
    alternates: { languages: { 'zh': '/zh/privacy', 'en': '/en/privacy' } },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{lang === 'zh' ? '隐私政策' : 'Privacy Policy'}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{lang === 'zh' ? '隐私政策' : 'Privacy Policy'}</h1>
      <p className="mb-1 text-sm text-dark-400">{lang === 'zh' ? '最后更新：2026 年 4 月 30 日' : 'Last updated: April 30, 2026'}</p>
      <p className="mb-8 text-sm text-dark-300">{lang === 'zh' ? '我们如何处理你的数据和隐私' : 'How we handle your data and privacy'}</p>

      <div className="space-y-6">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '引言' : 'Introduction'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? 'Ken 站长工具（以下简称"我们"）尊重你的隐私。本隐私政策说明当您访问我们的网站 schg.xyz（以下简称"本站"）时，我们收集哪些信息、如何使用以及你对自己数据的选择权。'
              : 'Ken Webmaster Tools (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This Privacy Policy explains what information we collect, how we use it, and your choices regarding your data when you visit our website at schg.xyz (the &quot;Site&quot;).'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '我们收集的信息' : 'Information We Collect'}</h2>

          <h3 className="text-sm font-semibold text-dark-100 mb-2">{lang === 'zh' ? '1. 你提供的信息' : '1. Information You Provide'}</h3>
          <p className="text-sm text-dark-200 leading-relaxed mb-4">
            {lang === 'zh'
              ? '我们的工具完全在浏览器中运行。你在工具中输入的任何数据（文本、文件、JSON、代码等）都在你的设备上本地处理，绝不会发送到我们的服务器。我们不会收集、存储或传输你处理的内容。'
              : 'Our tools run entirely in your browser. Any data you enter into a tool (text, files, JSON, code, etc.) is processed locally on your device and is never sent to our servers. We do not collect, store, or transmit the content you work with.'}
          </p>

          <h3 className="text-sm font-semibold text-dark-100 mb-2">{lang === 'zh' ? '2. 自动收集的信息' : '2. Information Collected Automatically'}</h3>
          <p className="text-sm text-dark-200 leading-relaxed mb-4">
            {lang === 'zh'
              ? '当你访问本站时，某些信息会通过 Cookie 和类似技术自动收集：'
              : 'When you visit our Site, certain information is automatically collected through cookies and similar technologies:'}
          </p>
          <ul className="space-y-1.5 text-sm text-dark-200 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '访问的页面和停留时间' : 'Pages visited and time spent on each page'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '浏览器类型和版本' : 'Browser type and version'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '设备类型和操作系统' : 'Device type and operating system'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '大致地理位置（国家/城市级别）' : 'Approximate geographic location (country/city level)'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '来源网站或渠道' : 'Referring website or source'}</span>
            </li>
          </ul>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '这些信息以匿名方式收集，用于数据分析和站点改进。'
              : 'This information is collected anonymously and is used for analytics and site improvement purposes.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">Cookie</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? '本站使用 Cookie 和类似的追踪技术。Cookie 是你的网页浏览器存储在设备上的小文本文件。我们使用以下类型的 Cookie：'
              : 'Our Site uses cookies and similar tracking technologies. Cookies are small text files stored on your device by your web browser. We use the following types of cookies:'}
          </p>
          <ul className="space-y-1.5 text-sm text-dark-200 mb-3">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">必要 Cookie</strong> — 用于基本站点功能，如记住你的语言偏好。</span>
                : <span><strong className="text-dark-100">Essential cookies</strong> — Required for basic site functionality, such as remembering your language preference.</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">分析 Cookie</strong> — 用于了解访客如何与本站交互（见下方分析章节）。</span>
                : <span><strong className="text-dark-100">Analytics cookies</strong> — Used to understand how visitors interact with the Site (see Analytics section below).</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">广告 Cookie</strong> — 由 Google AdSense 用于投放个性化广告（见下方广告章节）。</span>
                : <span><strong className="text-dark-100">Advertising cookies</strong> — Used by Google AdSense to deliver personalized advertisements (see Advertising section below).</span>}
            </li>
          </ul>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '你可以在浏览器设置中管理和控制 Cookie。请注意，禁用某些 Cookie 可能影响站点功能。'
              : 'You can control and manage cookies in your browser settings. Note that disabling certain cookies may affect site functionality.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '网站分析' : 'Analytics'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '我们使用百度统计来收集匿名使用数据，了解访客如何使用本站。百度统计使用 Cookie 收集页面浏览量、访问时长、浏览器类型等信息。这些数据传输至百度在中国境内的服务器。关于百度如何处理这些数据的详细信息，请访问百度统计隐私政策。'
              : 'We use Baidu Analytics (百度统计) to collect anonymous usage data about how visitors use our Site. Baidu Analytics uses cookies to collect information such as page views, visit duration, and browser type. This data is transmitted to and stored by Baidu on servers located in China.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '广告（Google AdSense）' : 'Advertising (Google AdSense)'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? '我们使用 Google AdSense 在本站展示广告。Google AdSense 使用 Cookie 根据你之前访问本站和其他网站的情况投放广告。'
              : 'We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies to serve ads based on your prior visits to our Site and other websites across the internet.'}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? 'Google 使用广告 Cookie 使其及其合作伙伴能够根据你访问本站和互联网上其他网站的情况投放广告。你可以通过访问 Google 广告设置来关闭个性化广告。'
              : <>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and other sites on the internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 transition-colors">Google Ads Settings</a>.</>}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? '你也可以通过访问 www.aboutads.info 关闭第三方 Cookie 的个性化广告。'
              : <>You can also opt out of third-party cookies used for personalized advertising by visiting <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 transition-colors ml-1">www.aboutads.info</a>.</>}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? 'AdSense 还使用 DoubleClick Cookie。你可以在 Google 隐私与条款页面了解更多。'
              : <>AdSense also uses the DoubleClick cookie. You can learn more about Google&apos;s privacy practices at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 transition-colors">Google Privacy & Terms</a>.</>}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '第三方服务' : 'Third-Party Services'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh' ? '本站使用以下第三方服务：' : 'Our Site uses the following third-party services:'}
          </p>
          <ul className="space-y-1.5 text-sm text-dark-200">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">Google AdSense</strong> — 广告展示（见上文）</span>
                : <span><strong className="text-dark-100">Google AdSense</strong> — Advertising (see section above)</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">百度统计</strong> — 网站分析</span>
                : <span><strong className="text-dark-100">Baidu Analytics</strong> — Website analytics</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">Vercel</strong> — 网站托管</span>
                : <span><strong className="text-dark-100">Vercel</strong> — Website hosting</span>}
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '数据安全' : 'Data Security'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '我们非常重视数据安全。由于工具完全在前端浏览器中运行，用户在工具使用过程中的数据不会传输或存储到我们的服务器。本站通过 HTTPS 提供访问，确保页面本身的安全传输。我们没有任何处理后端用户内容的服务器。'
              : 'We take data security seriously. Since our tools process data entirely in your browser using client-side JavaScript, no user data from tool usage is ever transmitted to or stored on our servers. The Site is served over HTTPS to ensure secure transmission.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '儿童隐私' : 'Children\'s Privacy'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '本站不面向 13 岁以下儿童。我们不会故意收集 13 岁以下儿童的个人信息。如果您认为有儿童向我们提供了个人信息，请联系我们以便删除。'
              : 'Our Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '政策更新' : 'Changes to This Policy'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '我们可能会不时更新本隐私政策。变更将在此页面发布，并更新"最后更新"日期。建议你定期查阅本政策。'
              : 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '联系方式' : 'Contact'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh' ? '如对本隐私政策有任何疑问，请联系我们：' : 'If you have any questions about this Privacy Policy, please contact us at:'}
          </p>
          <a href="mailto:ckck0313@gmail.com"
            className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors font-mono">
            ckck0313@gmail.com
          </a>
        </section>
      </div>
    </div>
  )
}
