'use client'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import ArticleCard from '@/components/ArticleCard'
import { getDictionary, type Locale } from '@/i18n'
import { articles, categories } from '@/data/articles'

function ArticleList() {
  const { lang } = useParams() as { lang: Locale }
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const dict = getDictionary(lang)

  const filtered = useMemo(() => {
    return category ? articles.filter((a) => a.categoryKey === category) : articles
  }, [category])

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-dark-50">{dict.article.title}</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href={`/${lang}/articles`}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            !category
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08] hover:text-dark-100'
          }`}
        >
          {dict.article.allCategories}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={`/${lang}/articles?category=${cat.key}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              category === cat.key
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08] hover:text-dark-100'
            }`}
          >
            {cat.label[lang]}
          </Link>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={lang} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-dark-400">
          <p className="text-lg">{lang === 'zh' ? '该分类暂无文章' : 'No articles in this category'}</p>
          <Link href={`/${lang}/articles`} className="mt-2 text-sm text-indigo-400 hover:text-indigo-300">
            {lang === 'zh' ? '查看全部文章 →' : 'View all articles →'}
          </Link>
        </div>
      )}
    </>
  )
}

export default function ArticlesPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.articles}</span>
      </nav>

      <Suspense fallback={<div className="text-dark-400 py-8">{lang === 'zh' ? '加载中...' : 'Loading...'}</div>}>
        <ArticleList />
      </Suspense>
    </div>
  )
}
