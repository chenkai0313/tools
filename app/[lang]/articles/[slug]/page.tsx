import Link from 'next/link'
import { getDictionary, isLocale } from '@/i18n'
import { articles, getArticleBySlug } from '@/data/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CodeBlock from '@/components/CodeBlock'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = []
  for (const article of articles) {
    paths.push({ lang: 'zh', slug: article.slug })
    paths.push({ lang: 'en', slug: article.slug })
  }
  return paths
}

const categoryKeywords: Record<string, Record<string, string>> = {
  frontend: {
    zh: '前端开发, JSON, 编程教程, Web开发',
    en: 'frontend development, web development, JSON, programming tutorial',
  },
  devops: {
    zh: '运维, Docker, K3s, DevOps, 容器化, 部署',
    en: 'DevOps, Docker, K3s, containerization, deployment',
  },
  security: {
    zh: '安全, 加密, 哈希, Base64, 算法',
    en: 'security, encryption, hash, Base64, cryptography',
  },
  ai: {
    zh: 'AI, 人工智能, DeepSeek, 大模型, 编程, Typeless, AI写作, Obsidian, 笔记软件, 知识管理',
    en: 'AI, artificial intelligence, DeepSeek, LLM, programming, Typeless, AI writing, Obsidian, note-taking, knowledge management',
  },
  tools: {
    zh: '站长工具, Cron, IP地址',
    en: 'webmaster tools, cron, IP address',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  const ck = categoryKeywords[article.categoryKey]
  const kw = ck ? ck[lang === 'zh' ? 'zh' : 'en'] : ''
  return {
    title: `${article.title} - 站长工具`,
    description: article.description,
    keywords: kw,
    alternates: {
      languages: { 'zh': `/zh/articles/${slug}`, 'en': `/en/articles/${slug}` },
      canonical: `https://schg.xyz/zh/articles/${slug}`,
    },
  }
}

function renderMarkdown(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeContent: string[] = []
  let codeLang = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <CodeBlock key={i} code={codeContent.join('\n')} lang={codeLang} />
        )
        codeContent = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLang = line.slice(3)
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="mt-8 mb-4 text-xl font-bold text-dark-50">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="mt-6 mb-3 text-lg font-bold text-dark-50">{line.slice(4)}</h3>)
    } else if (line.startsWith('- ')) {
      elements.push(<li key={i} className="ml-5 mb-1.5 text-dark-200 list-disc">{line.slice(2)}</li>)
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-3" />)
    } else {
      elements.push(<p key={i} className="mb-4 text-dark-200 leading-relaxed">{line}</p>)
    }
  }

  // Handle unclosed code block
  if (inCodeBlock && codeContent.length > 0) {
    elements.push(<CodeBlock key="last-code" code={codeContent.join('\n')} lang={codeLang} />)
  }

  return elements
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const currentIndex = articles.findIndex((a) => a.slug === slug)
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null
  const next = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <Link href={`/${lang}/articles`} className="hover:text-dark-200 transition-colors">{dict.nav.articles}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{article.title}</span>
      </nav>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            author: {
              "@type": "Person",
              name: "Ken",
            },
            publisher: {
              "@type": "Organization",
              name: "Webmaster Tools",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://schg.xyz/${lang}/articles/${article.slug}`,
            },
          }),
        }}
      />

      <article>
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-300">
              {article.category}
            </span>
            {article.hot && (
              <span className="inline-flex items-center rounded-md bg-pink-500/10 px-2 py-0.5 text-xs font-medium text-pink-300">
                HOT
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-dark-50 mb-3">{article.title}</h1>
          <div className="flex items-center gap-3 text-sm text-dark-400">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime} {lang === 'zh' ? '分钟阅读' : 'min read'}</span>
          </div>
        </header>

        {/* Content */}
        <div className="border-t border-white/[0.06] pt-8">
          {renderMarkdown(article.content)}
        </div>
      </article>

      {/* Prev/Next */}
      <div className="mt-12 border-t border-white/[0.06] pt-6 flex items-center justify-between">
        <div>
          {prev && (
            <Link
              href={`/${lang}/articles/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-dark-300 hover:text-indigo-300 transition-colors"
            >
              <span className="text-lg">←</span>
              <div>
                <div className="text-xs text-dark-500">{dict.article.prev}</div>
                <div className="font-medium line-clamp-1">{prev.title}</div>
              </div>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link
              href={`/${lang}/articles/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-dark-300 hover:text-indigo-300 transition-colors"
            >
              <div>
                <div className="text-xs text-dark-500">{dict.article.next}</div>
                <div className="font-medium line-clamp-1">{next.title}</div>
              </div>
              <span className="text-lg">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
