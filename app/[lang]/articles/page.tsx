'use client'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import { getDictionary, type Locale } from '@/i18n'
import { articles, categories } from '@/data/articles'

interface NewsItem {
  id: number
  title: string
  source_name: string
  content: string
  is_manual: boolean
  is_markdown: boolean
  created_at: string
}

function NewsList({ lang }: { lang: Locale }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://sitehub.schg.xyz/api/v1/news/list?page=1&page_size=12', {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json: any) => {
        if (json.code === 0 && json.data?.list) {
          setNews(json.data.list)
        }
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(true)
          setLoading(false)
        }
      })
    return () => controller.abort()
  }, [])

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-white/[0.06]" />
            <div className="mb-3 h-3 w-1/2 rounded bg-white/[0.04]" />
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded bg-white/[0.04]" />
              <div className="h-3 w-5/6 rounded bg-white/[0.04]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-dark-400">
        <p className="text-lg">{lang === 'zh' ? '资讯加载失败' : 'Failed to load news'}</p>
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-dark-400">
        <p className="text-lg">{lang === 'zh' ? '暂无资讯' : 'No news available'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {news.map((item) => {
        const isExpanded = expandedId === item.id
        return (
          <div
            key={item.id}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden cursor-pointer hover:border-white/[0.12] transition-colors"
            onClick={() => toggleExpand(item.id)}
          >
            <div className="flex items-start gap-3 p-4">
              <div className="min-w-0 flex-1">
                <h3 className={`text-sm font-semibold text-dark-50 leading-snug ${isExpanded ? '' : 'line-clamp-2'}`}>
                  {item.title}
                </h3>
                {!isExpanded && (
                  <p className="text-xs text-dark-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.content?.replace(/<[^>]+>/g, '').slice(0, 120)}
                  </p>
                )}
                {!isExpanded && (
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-dark-500">
                    <span>{item.source_name}</span>
                    <span>·</span>
                    <span>{item.created_at?.slice(0, 10)}</span>
                  </div>
                )}
              </div>
              <svg
                className={`mt-1 h-4 w-4 shrink-0 text-dark-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {isExpanded && (
              <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
                <p className="text-sm text-dark-300 leading-relaxed whitespace-pre-wrap">
                  {item.is_markdown
                    ? item.content
                    : item.content?.replace(/<[^>]+>/g, '')}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-dark-500">
                  <span>{item.source_name}</span>
                  <span>·</span>
                  <span>{item.created_at?.slice(0, 10)}</span>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ArticleList() {
  const { lang } = useParams() as { lang: Locale }
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const dict = getDictionary(lang)

  const filtered = useMemo(() => {
    if (!category) return articles
    if (category === 'news') return []
    return articles.filter((a) => a.categoryKey === category)
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

      {category === 'news' ? (
        <NewsList lang={lang} />
      ) : filtered.length > 0 ? (
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
