import Link from 'next/link'
import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '免责声明' : 'Disclaimer'} - 站长工具`,
    description: lang === 'zh' ? '本站工具的免责声明和使用条款说明。' : 'Disclaimer and terms of use for the tools on this website.',
    alternates: { languages: { 'zh': '/zh/disclaimer/', 'en': '/en/disclaimer/' } },
  }
}

export default async function DisclaimerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{lang === 'zh' ? '免责声明' : 'Disclaimer'}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{lang === 'zh' ? '免责声明' : 'Disclaimer'}</h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? '最后更新：2026年5月13日' : 'Last updated: May 13, 2026'}
      </p>

      <div className="space-y-6 text-sm text-dark-200 leading-relaxed">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '工具使用免责' : 'Tool Usage Disclaimer'}</h2>
          <p className="mb-3">
            {lang === 'zh'
              ? '本站（schg.xyz）提供的所有在线工具均按"原样"提供，不附带任何明示或暗示的保证。使用这些工具所产生的任何结果，由使用者自行承担风险。'
              : 'All online tools provided on this site (schg.xyz) are offered "as is" without any warranties, express or implied. Any results produced by using these tools are at your own risk.'}
          </p>
          <p className="mb-3">
            {lang === 'zh'
              ? '具体而言，我们不保证：'
              : 'Specifically, we do not guarantee:'}
          </p>
          <ul className="list-disc ml-5 space-y-1.5">
            <li>{lang === 'zh' ? '加密/解密工具的军事级安全性 — 这些工具适用于学习和非生产场景，请勿用于处理真实敏感数据' : 'Military-grade security of encryption tools — these are for learning and non-production use; do not use them for real sensitive data'}</li>
            <li>{lang === 'zh' ? '贷款计算器结果的财务准确性 — 计算结果仅供参考，实际贷款条件以金融机构合同为准' : 'Financial accuracy of loan calculator results — calculations are for reference only; actual loan terms are governed by financial institution contracts'}</li>
            <li>{lang === 'zh' ? 'BMI 计算器的医学准确性 — BMI 仅作为参考指标，不代表医学诊断。如有健康疑虑，请咨询专业医生' : 'Medical accuracy of the BMI calculator — BMI is a reference metric only and does not constitute medical diagnosis. Consult a healthcare professional for health concerns'}</li>
            <li>{lang === 'zh' ? '所有工具 100% 可用性 — 我们尽力维护，但不保证服务不中断' : '100% availability of all tools — we strive to maintain uptime but do not guarantee uninterrupted service'}</li>
          </ul>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '内容免责' : 'Content Disclaimer'}</h2>
          <p className="mb-3">
            {lang === 'zh'
              ? '本站上的技术文章和指南反映作者的个人经验和观点，不代表任何雇主或组织的立场。技术领域变化迅速，文章内容可能在发布后过时。我们建议读者在实际应用前验证信息的时效性。'
              : 'Technical articles and guides on this site reflect the author\'s personal experience and views, not those of any employer or organization. Technology evolves rapidly; content may become outdated after publication. Readers should verify timeliness before applying the information.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '第三方服务免责' : 'Third-Party Services Disclaimer'}</h2>
          <p className="mb-3">
            {lang === 'zh'
              ? '本站使用以下第三方服务，我们对其隐私实践和数据收集行为不承担责任：'
              : 'This site uses the following third-party services. We are not responsible for their privacy practices or data collection:'}
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li><strong>Google AdSense</strong> — {lang === 'zh' ? '用于展示广告。受 Google 隐私政策约束。' : 'For displaying advertisements. Subject to Google\'s Privacy Policy.'}</li>
            <li><strong>{lang === 'zh' ? '百度统计' : 'Baidu Analytics'}</strong> — {lang === 'zh' ? '用于网站访问分析。受百度隐私政策约束。' : 'For website analytics. Subject to Baidu\'s Privacy Policy.'}</li>
            <li><strong>{lang === 'zh' ? '外部链接' : 'External Links'}</strong> — {lang === 'zh' ? '本站可能包含指向外部网站的链接（如 resbu.top）。我们不对这些第三方网站的内容或隐私实践负责。' : 'This site may contain links to external websites (e.g., resbu.top). We are not responsible for the content or privacy practices of these third-party sites.'}</li>
          </ul>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '知识产权' : 'Intellectual Property'}</h2>
          <p className="mb-3">
            {lang === 'zh'
              ? '本站的工具逻辑和文章内容均为原创（除特别注明外）。工具实现的源代码可公开获取但保留版权。第三方库（crypto-js、js-yaml、qrcode 等）保留其各自的许可证。'
              : 'The tool logic and article content on this site are original (unless otherwise noted). Source code for tool implementations is publicly available but retains copyright. Third-party libraries (crypto-js, js-yaml, qrcode, etc.) retain their respective licenses.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '联系我们' : 'Contact'}</h2>
          <p>
            {lang === 'zh'
              ? '如对本免责声明有疑问，请联系：ckck0313@gmail.com'
              : 'For questions about this disclaimer, contact: ckck0313@gmail.com'}
          </p>
        </section>
      </div>
    </div>
  )
}
