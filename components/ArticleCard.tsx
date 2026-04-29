import Link from 'next/link'
import type { Article } from '@/data/articles'
import type { Locale } from '@/i18n'

interface ArticleCardProps {
  article: Article
  locale: Locale
}

export default function ArticleCard({ article, locale }: ArticleCardProps) {
  return (
    <Link
      href={`/${locale}/articles/${article.slug}`}
      className="group block rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:bg-white/[0.06] hover:border-indigo-500/30 hover:shadow-[0_0_24px_rgba(99,102,241,0.1)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-300">
              {article.category}
            </span>
            {article.hot && (
              <span className="inline-flex items-center rounded-md bg-pink-500/10 px-2 py-0.5 text-xs font-medium text-pink-300">
                HOT
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-dark-50 group-hover:text-indigo-300 transition-colors line-clamp-1">
            {article.title}
          </h3>
          <p className="mt-1 text-sm text-dark-300 line-clamp-2">{article.description}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-dark-400">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime} {locale === 'zh' ? '分钟阅读' : 'min read'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
