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
    alternates: { languages: { 'zh': '/zh/about/', 'en': '/en/about/' } },
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
        {lang === 'zh' ? '免费、隐私优先的在线开发者工具集 — 由开发者维护的独立工具站' : 'A free, privacy-first online toolkit for developers — independently maintained by a working developer'}
      </p>

      <div className="space-y-6">
        {/* Author section — E-E-A-T critical */}
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '关于作者' : 'About the Author'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? '我是 Ken，一名全栈开发者，主要使用 TypeScript、Go 和 Python 构建 Web 应用和后端服务。过去工作中我频繁需要各种小工具 — 格式化 JSON、转换时间戳、算哈希值、生成密码 — 于是我把这些需求做成了一套在线工具，方便自己也方便其他开发者。'
              : "I'm Ken, a full-stack developer building web apps and backend services with TypeScript, Go, and Python. Over the years I've needed countless small utilities — format JSON, convert timestamps, compute hashes, generate passwords — so I built this toolkit for myself first, and opened it up for everyone else."}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? '这个网站使用 Next.js 16 + TypeScript + Tailwind CSS 构建，采用纯静态导出（Static Export）部署在 GitHub Pages 上。源码完全开放，欢迎访问 GitHub 仓库。'
              : 'This site is built with Next.js 16 + TypeScript + Tailwind CSS, statically exported and deployed on GitHub Pages. The source code is open.'}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '所有工具均为原创实现，非第三方服务封装。每个工具的算法都可以在源码中的 lib/ 目录查看。'
              : 'Every tool is an original implementation, not a wrapper around a third-party API. All algorithms are visible in the lib/ directory of the source.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '关于本站' : 'Who We Are'}</h2>
          <p className="text-sm text-dark-200 leading-relaxed mb-3">
            {lang === 'zh'
              ? 'Ken 站长工具是一个面向开发者和站长的免费在线工具集。目前提供 19 个基于浏览器的工具，覆盖开发调试、运维部署、安全加密、金融计算和日常实用场景。'
              : 'Ken Webmaster Tools is a free online toolkit built for developers and webmasters. We currently offer 19 browser-based tools covering development, DevOps, security, finance, and everyday utility tasks.'}
          </p>
          <p className="text-sm text-dark-200 leading-relaxed">
            {lang === 'zh'
              ? '所有工具完全在客户端运行。你的数据不会离开你的设备 — 无需后端服务器、无需上传、无需注册账号。打开浏览器的开发者工具 → 网络面板即可验证：没有 API 调用，没有追踪信标，没有数据采集。'
              : 'All tools run entirely on the client side. Your data never leaves your device — no backend servers, no uploads, no accounts required. Open DevTools → Network tab to verify: zero API calls, zero tracking beacons, zero data collection.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '提供的工具（19个）' : 'What We Offer (19 Tools)'}</h2>
          <ul className="space-y-1.5 text-sm text-dark-200">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">开发辅助</strong> — JSON 格式化与校验、正则测试、命名格式转换、编码转换、配置格式互转</span>
                : <span><strong className="text-dark-100">Development</strong> — JSON formatting & validation, regex testing, case conversion, encoding, config format conversion</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">安全加密</strong> — 哈希计算（MD5/SHA等）、AES/DES/RSA 加解密、密码生成器</span>
                : <span><strong className="text-dark-100">Security</strong> — Hash calculation (MD5/SHA/etc), AES/DES/RSA encryption, password generation</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">格式转换</strong> — 时间戳与日期互转、Base64 与图片互转、数字转中文、罗马数字互转</span>
                : <span><strong className="text-dark-100">Conversion</strong> — Timestamp & date, Base64 & image, number to Chinese, Roman numerals</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">生活实用</strong> — BMI/年龄计算、贷款计算器、世界时钟、随机数据生成、图片压缩裁剪</span>
                : <span><strong className="text-dark-100">Practical</strong> — BMI/age calculator, loan calculator, world clock, random data, image tools</span>}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              {lang === 'zh'
                ? <span><strong className="text-dark-100">工具辅助</strong> — 二维码生成、Cron 表达式解析</span>
                : <span><strong className="text-dark-100">Utilities</strong> — QR code generation, Cron expression parsing</span>}
            </li>
          </ul>
          <p className="text-xs text-dark-400 mt-3">
            {lang === 'zh' ? '最后更新：2026年5月 — 持续增加新工具和优化现有工具。' : 'Last updated: May 2026 — New tools and improvements added regularly.'}
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="text-sm font-bold text-dark-50 mb-3">{lang === 'zh' ? '我们的原则' : 'Our Principles'}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-dark-100 mb-1">{lang === 'zh' ? '隐私优先' : 'Privacy First'}</h3>
              <p className="text-sm text-dark-200 leading-relaxed">
                {lang === 'zh'
                  ? '所有计算在浏览器中完成。不会将你的数据发送到任何服务器。你可以在浏览器开发者工具的网络面板验证 — 没有 API 调用，没有追踪信标，没有数据收集。这对于处理代码、配置文件、密钥等敏感数据尤为重要。'
                  : 'All computation happens in your browser. No data is ever sent to any server. You can verify this in DevTools → Network tab — there are no API calls, no tracking beacons, no data collection. This matters when handling sensitive data like source code, configuration files, and encryption keys.'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-dark-100 mb-1">{lang === 'zh' ? '完全免费' : 'Free & Open'}</h3>
              <p className="text-sm text-dark-200 leading-relaxed">
                {lang === 'zh'
                  ? '所有工具完全免费，无使用次数限制，无付费墙，无需注册。我们认为基础开发者工具应该对所有人开放 — 学生、自由职业者、小团队、独立开发者。'
                  : 'Every tool is completely free with no usage limits, no paywalls, and no registration required. We believe essential developer tools should be accessible to everyone — students, freelancers, small teams, and indie developers alike.'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-dark-100 mb-1">{lang === 'zh' ? '原创实现' : 'Original Implementation'}</h3>
              <p className="text-sm text-dark-200 leading-relaxed">
                {lang === 'zh'
                  ? '每个工具都是独立实现的，不是第三方 API 的封装。加密算法基于 crypto-js 库，配置文件解析基于 js-yaml 和 smol-toml，其余工具均为纯手写逻辑。算法可在源码的 lib/ 目录查看。'
                  : 'Every tool is independently implemented, not a wrapper around a third-party API. Encryption leverages crypto-js, config parsing uses js-yaml and smol-toml, and everything else is hand-written logic. Algorithms are visible in the lib/ directory.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
