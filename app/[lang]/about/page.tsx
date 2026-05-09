import Link from 'next/link'
import { getDictionary, isLocale } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '关于我们' : 'About Us'} - 站长工具`,
    description: lang === 'zh' ? 'Ken 站长工具是一个免费在线的开发者工具集合。所有工具均在浏览器端运行，无后端服务器，保护你的数据隐私。' : 'Ken Webmaster Tools is a free online toolkit for developers. All tools run in the browser with no backend server.',
    keywords: '站长工具, 在线工具, 开发者工具, webmaster tools, free online tools, about us',
    alternates: { languages: { 'zh': '/zh/about', 'en': '/en/about' } },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{lang === 'zh' ? '关于我们' : 'About'}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{lang === 'zh' ? '关于我们' : 'About Us'}</h1>
      <p className="mb-8 text-sm text-dark-300">
        {lang === 'zh' ? '免费、隐私优先的在线开发者工具集' : 'A free, privacy-first online toolkit for developers'}
      </p>

      <div className="space-y-6">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '关于本站' : 'Who We Are'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? 'Ken 站长工具是一个面向开发者和站长的免费在线工具集。我们提供 12 个基于浏览器的工具，覆盖开发调试、运维部署、安全加密和日常实用场景。'
              : 'Ken Webmaster Tools is a free online toolkit built for developers and webmasters. We provide 12 browser-based tools covering development, operations, security, and everyday utility tasks.'}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '所有工具完全在客户端运行。你的数据不会离开你的设备——无需后端服务器，无需上传，无需注册账号。所有计算都在你的浏览器中完成。'
              : 'All tools run entirely on the client side. Your data never leaves your device — no backend servers, no uploads, no accounts required. Every calculation happens in your browser.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '提供的工具' : 'What We Offer'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh' ? '工具集目前包含 12 个工具，每个针对特定的开发需求：' : 'Our toolkit currently includes 12 tools, each designed for a specific developer need:'}
          </p>
          <ul className="space-y-1.5 text-sm text-dark-200">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">开发辅助</strong> — JSON 格式化与校验、正则表达式测试、命名格式转换、URL/Unicode 编码转换</span>
                : <span><strong className="text-dark-100">Development</strong> — JSON formatting & validation, regex testing, case conversion, URL/Unicode encoding</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">安全加密</strong> — 哈希计算（MD5/SHA）、AES/DES/RSA 加解密、密码生成器</span>
                : <span><strong className="text-dark-100">Security</strong> — Hash calculation (MD5/SHA), AES/DES/RSA encryption, password generation</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">格式转换</strong> — 时间戳与日期互转、Base64 与图片互转、YAML/TOML/JSON 配置文件格式互转</span>
                : <span><strong className="text-dark-100">Conversion</strong> — Timestamp & date conversion, Base64 & image conversion, config format (YAML/TOML/JSON) conversion</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">实用工具</strong> — 二维码生成、Cron 表达式解析</span>
                : <span><strong className="text-dark-100">Utilities</strong> — QR code generation, Cron expression parsing</span>}
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '我们的原则' : 'Our Principles'}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-dark-100 mb-1">{lang === 'zh' ? '隐私优先' : 'Privacy First'}</h3>
              <p className="text-sm text-dark-200 leading-relaxed">
                {lang === 'zh'
                  ? '所有工具在浏览器中运行，不向任何服务器发送数据。你可以打开浏览器开发者工具的网络面板验证——没有 API 调用，没有追踪信标，没有数据收集。'
                  : 'All tools run in your browser. No data is sent to any server. You can inspect the network tab to verify — there are no API calls, no tracking beacons, no data collection.'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-dark-100 mb-1">{lang === 'zh' ? '免费开放' : 'Free & Open'}</h3>
              <p className="text-sm text-dark-200 leading-relaxed">
                {lang === 'zh'
                  ? '所有工具完全免费使用，无次数限制、无付费墙、无需注册。我们认为基础开发者工具应该对所有人开放。'
                  : 'Every tool is completely free to use with no limits, no paywalls, and no registration. We believe essential developer tools should be accessible to everyone.'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-dark-100 mb-1">{lang === 'zh' ? '简洁高效' : 'Simple & Fast'}</h3>
              <p className="text-sm text-dark-200 leading-relaxed">
                {lang === 'zh'
                  ? '没有多余的界面装饰，没有加载转圈，没有注册表单。打开工具、粘贴输入、立即得到结果。支持双击复制和实时预览。'
                  : 'No unnecessary UI clutter, no loading spinners, no sign-up forms. Open a tool, paste your input, and get results instantly. Keyboard-friendly with copy-on-double-click and real-time preview.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
