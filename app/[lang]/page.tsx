import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { getDictionary, isLocale } from '@/i18n'
import { articles, categories, getHotArticles } from '@/data/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = getDictionary(lang as any)
  return {
    title: `${dict.nav.home} - 站长工具`,
    description: '免费在线站长工具集合，提供时间戳转换、JSON格式化、Base64图片转换等实用工具。',
    openGraph: {
      title: '站长工具',
      description: '为站长和开发者提供实用的在线工具',
    },
    alternates: { languages: { 'zh': '/zh', 'en': '/en' } },
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const hotArticles = getHotArticles()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero section */}
      <section className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">ken 站长工具</span>
        </h1>
        <p className="text-dark-300 text-sm max-w-xl mx-auto">
          {lang === 'zh'
            ? '为站长和开发者打造的在线工具集'
            : 'Online toolset for webmasters and developers · 100% client-side · Secure · Free'}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-dark-400">
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-3 py-1 text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> 6 {lang === 'zh' ? '个可用工具' : 'tools available'}
          </span>
        </div>
      </section>

      {/* Divider */}
      <div className="mb-10 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Tools Grid - Tiled */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold text-dark-50 flex items-center gap-2">
          <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          {dict.nav.tools}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {[
            { href: `/${lang}/tools/time`, icon: '🕐', label: dict.nav.time, desc: lang === 'zh' ? '时间戳与日期互转' : 'Timestamp & date' },
            { href: `/${lang}/tools/json`, icon: '📋', label: dict.nav.json, desc: lang === 'zh' ? '格式化/校验/结构体' : 'Format / Validate / Struct' },
            { href: `/${lang}/tools/base64`, icon: '🖼️', label: dict.nav.base64, desc: lang === 'zh' ? 'Base64与图片互转' : 'Base64 & images' },
            { href: `/${lang}/tools/password`, icon: '🔑', label: dict.nav.password, desc: lang === 'zh' ? '随机密码生成' : 'Password generator' },
            { href: `/${lang}/tools/cron`, icon: '⏰', label: dict.nav.cron, desc: lang === 'zh' ? 'Cron 表达式解析' : 'Cron expression' },
            { href: `/${lang}/tools/case`, icon: '🔤', label: dict.nav.case, desc: lang === 'zh' ? '驼峰/下划线互转' : 'Camel / snake case' },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="tool-tile flex flex-col items-center rounded-xl py-5 px-3 text-center group"
            >
              <span className="mb-2 text-2xl">{tool.icon}</span>
              <span className="text-sm font-semibold text-dark-50 group-hover:text-indigo-300 transition-colors">{tool.label}</span>
              <span className="mt-0.5 text-xs text-dark-400">{tool.desc}</span>
            </Link>
          ))}
        </div>
      </section>

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
        {categories.map((category) => {
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
