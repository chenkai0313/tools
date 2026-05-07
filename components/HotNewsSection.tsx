'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NewsItem {
  id: number
  title: string
  img?: string
  source_name: string
  content: string
  is_manual: boolean
  is_markdown: boolean
  created_at: string
}

interface NewsResponse {
  code: number
  message: string
  data: {
    list: NewsItem[]
  }
}

const IMG_BASE = 'https://sitehub.schg.xyz'

export default function HotNewsSection({ lang }: { lang: string }) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://sitehub.schg.xyz/api/v1/news/list?page=1&page_size=6', {
      signal: controller.signal,
    })
      .then((res) => res.json() as Promise<NewsResponse>)
      .then((json) => {
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
      <div>
        <h3 className="mb-3 text-sm font-bold text-dark-50 flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
          {lang === 'zh' ? '热点资讯' : 'Hot News'}
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
              <div className="mb-2 h-3 w-3/4 rounded bg-white/[0.06]" />
              <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || news.length === 0) {
    return null
  }

  return (
    <div className="lg:sticky lg:top-24">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-dark-50 flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-orange-400" />
          {lang === 'zh' ? '🔥 热点资讯' : '🔥 Hot News'}
          <span className="ml-1 rounded-full bg-orange-500/15 px-1.5 py-0.5 text-[10px] text-orange-400">{news.length}</span>
        </h3>
        <Link
          href={`/${lang}/articles?category=news`}
          className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {lang === 'zh' ? '更多 →' : 'More →'}
        </Link>
      </div>

      <div className="space-y-2.5">
        {news.map((item) => {
          const isExpanded = expandedId === item.id
          const imgUrl = item.img
            ? item.img.startsWith('http') ? item.img : `${IMG_BASE}${item.img}`
            : null

          return (
            <div
              key={item.id}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] overflow-hidden cursor-pointer hover:border-white/[0.12] transition-colors"
              onClick={() => toggleExpand(item.id)}
            >
              {/* collapsed view */}
              <div className="flex items-start gap-3 p-3">
                {imgUrl && (
                  <div className="shrink-0 w-16 h-12 rounded overflow-hidden bg-white/[0.04]">
                    <img
                      src={imgUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className={`text-xs font-semibold text-dark-50 leading-snug ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {item.title}
                  </h4>
                  {!isExpanded && (
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-dark-500">
                      <span>{item.source_name}</span>
                      <span>·</span>
                      <span>{item.created_at?.slice(0, 10)}</span>
                    </div>
                  )}
                </div>
                <svg
                  className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-dark-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* expanded content */}
              {isExpanded && (
                <div className="border-t border-white/[0.06] px-3 pb-3 pt-2">
                  {imgUrl && (
                    <div className="mb-2 rounded-lg overflow-hidden bg-white/[0.04]">
                      <img
                        src={imgUrl}
                        alt={item.title}
                        className="w-full max-h-48 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <p className="text-xs text-dark-300 leading-relaxed whitespace-pre-wrap">
                    {item.is_markdown
                      ? item.content
                      : item.content?.replace(/<[^>]+>/g, '')}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-dark-500">
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
    </div>
  )
}
