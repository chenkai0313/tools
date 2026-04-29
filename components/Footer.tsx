import Link from 'next/link'
import type { Dictionary, Locale } from '@/i18n'

interface FooterProps {
  dict: Dictionary
  locale: Locale
}

const toolIcons: Record<string, string> = {
  time: '🕐',
  json: '📋',
  base64: '🖼️',
  password: '🔑',
  cron: '⏰',
  case: '🔤',
  qrcode: '📱',
  hash: '#️⃣',
  encoding: '🔡',
  regex: '🔍',
  config: '⚙️',
  crypto: '🔐',
}

export default function Footer({ dict, locale }: FooterProps) {
  const tools = [
    { key: 'time', href: `/${locale}/tools/time` },
    { key: 'json', href: `/${locale}/tools/json` },
    { key: 'base64', href: `/${locale}/tools/base64` },
    { key: 'password', href: `/${locale}/tools/password` },
    { key: 'cron', href: `/${locale}/tools/cron` },
    { key: 'case', href: `/${locale}/tools/case` },
    { key: 'qrcode', href: `/${locale}/tools/qrcode` },
    { key: 'hash', href: `/${locale}/tools/hash` },
    { key: 'encoding', href: `/${locale}/tools/encoding` },
    { key: 'regex', href: `/${locale}/tools/regex` },
    { key: 'config', href: `/${locale}/tools/config` },
    { key: 'crypto', href: `/${locale}/tools/crypto` },
  ]

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'articles', href: `/${locale}/articles` },
  ]

  return (
    <footer className="border-t border-white/[0.06] bg-dark-950">
      {/* Glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Top section: Brand + Tools grid */}
        <div className="flex flex-col gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <Link href={`/${locale}`} className="group flex items-center gap-3 mb-2">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
                <span className="relative text-xs font-bold text-white">K</span>
              </div>
              <span className="text-lg font-bold gradient-text">ken</span>
            </Link>
            <p className="text-sm text-dark-300">{dict.footer.desc}</p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {tools.map((tool) => (
              <Link
                key={tool.key}
                href={tool.href}
                className="tool-tile flex flex-col items-center rounded-xl py-4 px-3 text-center"
              >
                <span className="mb-1.5 text-xl">{toolIcons[tool.key]}</span>
                <span className="text-xs font-medium text-dark-100">
                  {dict.nav[tool.key as keyof typeof dict.nav]}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-xs text-dark-400">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="hover:text-dark-200 transition-colors">
                {dict.nav[item.key as keyof typeof dict.nav]}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-dark-500">
            <span>{dict.footer.copyright}</span>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-dark-200 transition-colors">
              浙ICP备2025148458号-1
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
