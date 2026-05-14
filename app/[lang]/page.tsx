import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import HotNewsSection from '@/components/HotNewsSection'
import { getDictionary, isLocale } from '@/i18n'
import { articles, categories as articleCats, getHotArticles } from '@/data/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { OrganizationSchema, WebSiteSchema, BreadcrumbListSchema } from '@/components/JsonLd'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = getDictionary(lang as any)
  return {
    title: `${dict.nav.home} - Ken Webmaster Tools`,
    description: lang === 'zh'
      ? '免费在线站长工具集合，提供时间戳转换、JSON格式化、Base64图片转换、正则表达式测试、哈希计算、AES/RSA加解密等19种开发者工具。所有工具在浏览器本地运行，不上传服务器。'
      : 'Free online developer tools: JSON formatter, timestamp converter, Base64 encoder, regex tester, hash calculator, password generator, and more. 100% client-side, no data upload.',
    openGraph: {
      title: `${dict.nav.home} - Ken Webmaster Tools`,
      description: lang === 'zh'
        ? '为站长和开发者提供实用的在线工具，所有工具均在浏览器本地运行，保护你的数据隐私。'
        : 'Free online toolkit for developers and webmasters. All tools run in your browser - no upload, no backend, privacy first.',
    },
    alternates: { languages: { 'zh': '/zh', 'en': '/en' } },
  }
}

const tools = [
  { key: 'time', icon: '🕐', category: 'convert' as const, popular: true, descZh: '时间戳与日期互转', descEn: 'Timestamp & date' },
  { key: 'json', icon: '📋', category: 'dev' as const, popular: true, descZh: '格式化/校验/生成结构体', descEn: 'Format / Validate / Struct' },
  { key: 'base64', icon: '🖼️', category: 'convert' as const, popular: true, descZh: 'Base64 与图片互转', descEn: 'Base64 & images' },
  { key: 'password', icon: '🔑', category: 'security' as const, popular: true, descZh: '随机高强度密码生成', descEn: 'Password generator' },
  { key: 'cron', icon: '⏰', category: 'utility' as const, popular: false, descZh: 'Cron 表达式解析', descEn: 'Cron expression' },
  { key: 'case', icon: '🔤', category: 'dev' as const, popular: false, descZh: '驼峰/蛇形/中划线互转', descEn: 'Camel / snake / kebab' },
  { key: 'qrcode', icon: '📱', category: 'utility' as const, popular: false, descZh: '文本/链接生成二维码', descEn: 'Generate QR codes' },
  { key: 'hash', icon: '#️⃣', category: 'security' as const, popular: true, descZh: 'MD5 / SHA 哈希', descEn: 'MD5 / SHA hash' },
  { key: 'encoding', icon: '🔡', category: 'dev' as const, popular: false, descZh: 'Unicode / URL 编码', descEn: 'Unicode / URL encode' },
  { key: 'regex', icon: '🔍', category: 'dev' as const, popular: true, descZh: '正则表达式测试', descEn: 'Regex testing' },
  { key: 'config', icon: '⚙️', category: 'convert' as const, popular: false, descZh: 'YAML/TOML/JSON 互转', descEn: 'YAML / TOML / JSON' },
  { key: 'crypto', icon: '🔐', category: 'security' as const, popular: false, descZh: 'AES / DES / RSA 加解密', descEn: 'AES / DES / RSA' },
  // New tools
  { key: 'bmi', icon: '⚖️', category: 'utility' as const, popular: true, descZh: 'BMI 计算与年龄计算', descEn: 'BMI & age calculator' },
  { key: 'random-data', icon: '🎲', category: 'dev' as const, popular: false, descZh: '随机测试数据生成', descEn: 'Random test data' },
  { key: 'image-tools', icon: '🗜️', category: 'utility' as const, popular: true, descZh: '图片压缩与裁剪编辑', descEn: 'Image compress & crop' },
  { key: 'world-clock', icon: '🌍', category: 'utility' as const, popular: false, descZh: '世界时钟与时区转换', descEn: 'World clock & timezone' },
  { key: 'roman-numeral', icon: '🏛️', category: 'dev' as const, popular: false, descZh: '阿拉伯/罗马数字互转', descEn: 'Roman numeral' },
  { key: 'number-chinese', icon: '🔢', category: 'dev' as const, popular: false, descZh: '数字转中文大写金额', descEn: 'Number to Chinese' },
  { key: 'loan-calc', icon: '💰', category: 'convert' as const, popular: true, descZh: '贷款还款计算器', descEn: 'Loan calculator' },
]

const categoryKeys = ['dev', 'security', 'convert', 'utility'] as const

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const hotArticles = getHotArticles()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <OrganizationSchema />
      <WebSiteSchema />
      <BreadcrumbListSchema items={[
        { name: lang === 'zh' ? '首页' : 'Home', url: `https://schg.xyz/${lang}/` },
      ]} />
      {/* Hero + Site Intro */}
      <section className="mb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">ken 站长工具</span>
        </h1>
        <p className="text-dark-300 text-sm max-w-2xl mx-auto leading-relaxed">
          {dict.home.siteIntro}
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-dark-400">
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-3 py-1 text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> 19 {lang === 'zh' ? '个工具' : 'tools'}
          </span>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mb-12">
        <h2 className="mb-5 text-lg font-bold text-dark-50">{lang === "zh" ? "全部工具" : "All Tools"}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {tools.map((tool) => (
            <Link
              key={tool.key}
              href={`/${lang}/tools/${tool.key}`}
              className="tool-tile flex flex-col items-center rounded-xl py-5 px-3 text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="mb-2 text-2xl relative">{tool.icon}</span>
              <span className="text-sm font-semibold text-dark-50 group-hover:text-indigo-300 transition-colors relative">{dict.nav[tool.key as keyof typeof dict.nav]}</span>
              <span className="mt-0.5 text-xs text-dark-400 relative">{lang === 'zh' ? tool.descZh : tool.descEn}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Main content + Hot News sidebar */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8 mb-12">
        {/* Left: main content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Tool Categories */}
          <section>
            <h2 className="mb-5 text-lg font-bold text-dark-50">{dict.home.toolCategories.title}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {categoryKeys.map((catKey) => {
                const cat = dict.home.toolCategories[catKey]
                const catTools = tools.filter(t => t.category === catKey)
                return (
                  <div key={catKey} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                    <h3 className="text-sm font-bold text-dark-50 mb-1">{cat.title}</h3>
                    <p className="text-xs text-dark-400 mb-4 leading-relaxed">{cat.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {catTools.map((tool) => (
                        <Link
                          key={tool.key}
                          href={`/${lang}/tools/${tool.key}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-dark-300 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
                        >
                          <span>{tool.icon}</span>
                          {dict.nav[tool.key as keyof typeof dict.nav]}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Use Scenarios */}
          <section>
            <h2 className="mb-5 text-lg font-bold text-dark-50">{dict.home.scenarios.title}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {dict.home.scenarios.items.map((item, i) => (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <h3 className="text-sm font-bold text-dark-50 mb-2">{item.title}</h3>
                  <p className="text-xs text-dark-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section>
            <h2 className="mb-5 text-lg font-bold text-dark-50">{dict.home.whyUs.title}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {dict.home.whyUs.points.map((point, i) => (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <h3 className="text-sm font-bold text-dark-50 mb-2">{point.title}</h3>
                  <p className="text-xs text-dark-400 leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Hot News sidebar */}
        <div className="mt-10 lg:mt-0">
          <div className="rounded-xl border border-orange-500/15 bg-gradient-to-b from-orange-500/5 to-transparent p-4">
            <HotNewsSection lang={lang} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-10 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      {/* Hot Articles */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-dark-50 flex items-center gap-2">
          <svg className="h-5 w-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          {dict.home.hotArticles}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {hotArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={lang} />
          ))}
        </div>
      </section>

      {/* Article Categories */}
      <div className="grid gap-8 sm:grid-cols-2">
        {articleCats.filter((c) => c.key !== 'news').map((category) => {
          const categoryArticles = articles.filter((a) => a.categoryKey === category.key)
          return (
            <section key={category.key}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-dark-50">
                  {category.label[lang as 'zh' | 'en']}
                </h2>
                <Link
                  href={`/${lang}/articles?category=${category.key}`}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {lang === 'zh' ? '更多 →' : 'More →'}
                </Link>
              </div>
              <div className="space-y-3">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} locale={lang} />
                ))}
              </div>
              {categoryArticles.length === 0 && (
                <p className="text-sm text-dark-400 py-4">
                  {lang === 'zh' ? '暂无文章' : 'No articles yet'}
                </p>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
