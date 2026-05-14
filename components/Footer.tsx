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
  bmi: '⚖️',
  'random-data': '🎲',
  'image-tools': '🗜️',
  'world-clock': '🌍',
  'roman-numeral': '🏛️',
  'number-chinese': '🔢',
  'loan-calc': '💰',
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
    { key: 'bmi', href: `/${locale}/tools/bmi` },
    { key: 'random-data', href: `/${locale}/tools/random-data` },
    { key: 'image-tools', href: `/${locale}/tools/image-tools` },
    { key: 'world-clock', href: `/${locale}/tools/world-clock` },
    { key: 'roman-numeral', href: `/${locale}/tools/roman-numeral` },
    { key: 'number-chinese', href: `/${locale}/tools/number-chinese` },
    { key: 'loan-calc', href: `/${locale}/tools/loan-calc` },
  ]

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'articles', href: `/${locale}/articles` },
    { key: 'about', href: `/${locale}/about`, label: 'About' },
    { key: 'cookiePolicy', href: `/${locale}/cookie-policy`, label: locale === 'zh' ? 'Cookie' : 'Cookies' },
    { key: 'disclaimer', href: `/${locale}/disclaimer`, label: locale === 'zh' ? '免责' : 'Disclaimer' },
    { key: 'privacy', href: `/${locale}/privacy`, label: 'Privacy' },
    { key: 'terms', href: `/${locale}/terms`, label: locale === 'zh' ? '条款' : 'Terms' },
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

        {/* Friend links & Contact */}
        <div className="flex flex-col gap-4">

        {/* Friend links */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <span className="flex items-center gap-2 text-xs font-medium text-dark-400 whitespace-nowrap">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 text-xs">🤝</span>
              {dict.footer.friends}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a
                href="https://resbu.top"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm transition-colors"
              >
                <span className="font-medium text-dark-200 group-hover:text-indigo-400 transition-colors">Resbu</span>
                <span className="text-dark-500 group-hover:text-dark-400 transition-colors text-xs hidden sm:inline">-</span>
                <span className="text-dark-500 group-hover:text-dark-300 transition-colors text-xs">{dict.footer.friendDesc}</span>
              </a>
              <a
                href="https://ptable.top/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm transition-colors"
              >
                <span className="font-medium text-dark-200 group-hover:text-indigo-400 transition-colors">ptable.top</span>
                <span className="text-dark-500 group-hover:text-dark-400 transition-colors text-xs hidden sm:inline">-</span>
                <span className="text-dark-500 group-hover:text-dark-300 transition-colors text-xs">{locale === 'zh' ? '元素周期表查询' : 'Periodic Table'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <span className="flex items-center gap-2 text-xs font-medium text-dark-400 whitespace-nowrap">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-xs">✉️</span>
              {dict.footer.contactTitle}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <a
                href="mailto:ckck0313@gmail.com"
                className="group flex items-center gap-2 text-sm"
              >
                <span className="font-mono text-sm text-dark-200 group-hover:text-emerald-400 transition-colors">ckck0313@gmail.com</span>
              </a>
              <span className="text-dark-500 text-xs hidden sm:inline">|</span>
              <span className="text-dark-500 text-xs text-center">{dict.footer.contactDesc}</span>
            </div>
          </div>
        </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-xs text-dark-400">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="hover:text-dark-200 transition-colors">
                {item.label ?? dict.nav[item.key as keyof typeof dict.nav]}
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
