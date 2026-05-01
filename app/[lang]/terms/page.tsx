import Link from 'next/link'
import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '使用条款' : 'Terms of Service'} - 站长工具`,
    description: lang === 'zh' ? 'Ken 站长工具的使用条款。使用本站即表示你同意这些条款。' : 'Terms of service for Ken Webmaster Tools. By using this site, you agree to these terms.',
    alternates: { languages: { 'zh': '/zh/terms', 'en': '/en/terms' } },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{lang === 'zh' ? '使用条款' : 'Terms of Service'}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{lang === 'zh' ? '使用条款' : 'Terms of Service'}</h1>
      <p className="mb-1 text-sm text-dark-400">{lang === 'zh' ? '最后更新：2026 年 4 月 30 日' : 'Last updated: April 30, 2026'}</p>
      <p className="mb-8 text-sm text-dark-300">{lang === 'zh' ? '使用本站前请仔细阅读以下条款' : 'Please read these terms carefully before using the Site'}</p>

      <div className="space-y-6">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">1. {lang === 'zh' ? '接受条款' : 'Acceptance of Terms'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '访问或使用 Ken 站长工具（以下简称"本站"）即表示你同意受这些使用条款的约束。如果你不同意这些条款的任何部分，请勿使用本站。'
              : 'By accessing or using Ken Webmaster Tools (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Site.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">2. {lang === 'zh' ? '服务描述' : 'Description of Service'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? '本站为开发者和站长提供免费在线工具，包括但不限于时间戳转换、JSON 格式化、Base64 编码、密码生成、哈希计算和加解密工具。'
              : 'The Site provides free online tools for developers and webmasters, including but not limited to timestamp conversion, JSON formatting, Base64 encoding, password generation, hash calculation, and encryption utilities.'}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '所有工具按"现状"提供，完全在客户端运行。我们不在服务器上存储、处理或传输任何用户输入内容。'
              : 'All tools are provided &quot;as is&quot; and run entirely on the client side. We do not store, process, or transmit any user input on our servers.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">3. {lang === 'zh' ? '用户责任' : 'User Responsibilities'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">{lang === 'zh' ? '你同意：' : 'You agree to:'}</p>
          <ul className="space-y-1.5 text-sm text-dark-200 mb-3">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '仅将工具用于合法目的' : 'Use the tools for lawful purposes only'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '不得试图破坏、损坏或损害本站及其底层基础设施' : 'Not attempt to disrupt, damage, or impair the Site or its underlying infrastructure'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span>{lang === 'zh' ? '不得使用工具处理任何非法、有害或侵权内容' : 'Not use the tools to process any illegal, harmful, or infringing content'}</span>
            </li>
          </ul>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '你对自己使用工具处理的任何数据以及遵守适用法律负全部责任。'
              : 'You are solely responsible for any data you process using our tools and for compliance with applicable laws in your jurisdiction.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">4. {lang === 'zh' ? '知识产权' : 'Intellectual Property'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '本站的设计、代码和内容（不包括第三方服务和用户输入）归我们所有。未经我们事先书面同意，你不得复制、修改、分发或逆向工程本站的任何部分。'
              : 'The Site, including its design, code, and content (excluding third-party services and user input), is owned and operated by us. You may not copy, modify, distribute, or reverse-engineer any part of the Site without our prior written consent.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">5. {lang === 'zh' ? '免责声明' : 'Disclaimer'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? '本站提供的工具和服务基于"现状"和"可用"基础，不提供任何明示或暗示的保证。'
              : 'The tools and services on the Site are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, either express or implied.'}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '虽然我们努力确保准确性，但不保证工具的正确性、可靠性或可用性。工具输出应在生产环境或安全敏感场景使用前进行验证。我们对因使用工具导致的数据丢失、损坏或安全问题概不负责。'
              : 'While we strive to ensure accuracy, we make no guarantees regarding the correctness, reliability, or availability of the tools. Tool outputs should be verified before use in production or security-sensitive environments.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">6. {lang === 'zh' ? '责任限制' : 'Limitation of Liability'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '在任何情况下，我们均不对因使用或无法使用本站而产生的任何间接、附带、特殊、后果性或惩罚性损害赔偿负责，包括但不限于数据、利润或业务机会的损失。'
              : 'In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, profits, or business opportunities, arising out of or in connection with your use of the Site.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">7. {lang === 'zh' ? '第三方服务' : 'Third-Party Services'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '本站通过 Google AdSense 展示广告并使用百度统计进行网站分析。这些第三方服务有其自己的使用条款和隐私政策。我们不对这些第三方的内容和行为负责。'
              : 'The Site displays advertisements via Google AdSense and uses Baidu Analytics for website analytics. These third-party services have their own terms of service and privacy policies. We are not responsible for the content or practices of these third parties.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">8. {lang === 'zh' ? '条款变更' : 'Changes to Terms'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '我们保留随时修改这些条款的权利。变更将在此页面发布，并更新"最后更新"日期。变更后继续使用本站即表示接受新条款。'
              : 'We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the Site after changes constitutes acceptance of the new terms.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">9. {lang === 'zh' ? '适用法律' : 'Governing Law'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '这些条款受中华人民共和国法律管辖并依其解释。因这些条款产生的任何争议应受具有管辖权的法院专属管辖。'
              : 'These terms shall be governed by and construed in accordance with the laws of the People\'s Republic of China.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">10. {lang === 'zh' ? '联系方式' : 'Contact'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh' ? '如对这些条款有疑问，请联系我们：' : 'For questions about these terms, please contact us at:'}
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
