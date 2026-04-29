'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import type { Dictionary, Locale } from '@/i18n'

interface HeaderProps {
  dict: Dictionary
  locale: Locale
}

export default function Header({ dict, locale }: HeaderProps) {
  const pathname = usePathname()
  const [toolsOpen, setToolsOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const tools = [
    { href: `/${locale}/tools/time`, icon: '🕐', label: dict.nav.time },
    { href: `/${locale}/tools/json`, icon: '📋', label: dict.nav.json },
    { href: `/${locale}/tools/base64`, icon: '🖼️', label: dict.nav.base64 },
    { href: `/${locale}/tools/password`, icon: '🔑', label: dict.nav.password },
    { href: `/${locale}/tools/cron`, icon: '⏰', label: dict.nav.cron },
    { href: `/${locale}/tools/case`, icon: '🔤', label: dict.nav.case },
    { href: `/${locale}/tools/qrcode`, icon: '📱', label: dict.nav.qrcode },
    { href: `/${locale}/tools/hash`, icon: '#️⃣', label: dict.nav.hash },
    { href: `/${locale}/tools/encoding`, icon: '🔡', label: dict.nav.encoding },
    { href: `/${locale}/tools/regex`, icon: '🔍', label: dict.nav.regex },
    { href: `/${locale}/tools/config`, icon: '⚙️', label: dict.nav.config },
    { href: `/${locale}/tools/crypto`, icon: '🔐', label: dict.nav.crypto },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const switchLocale = locale === 'zh' ? 'en' : 'zh'
  const switchPath = pathname.replace(/^\/(zh|en)/, `/${switchLocale}`)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-dark-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-dark-950/60">
      {/* Glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-sm opacity-50 group-hover:opacity-70 transition-opacity" />
            <span className="relative text-sm font-bold text-white">K</span>
          </div>
          <span className="text-lg font-bold gradient-text">ken</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href={`/${locale}`} active={pathname === `/${locale}`}>
            {dict.nav.home}
          </NavLink>

          <NavLink href={`/${locale}/articles`} active={isActive(`/${locale}/articles`)}>
            {dict.nav.articles}
          </NavLink>

          {/* Tools Dropdown */}
          <li ref={dropdownRef} className="relative list-none">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                isActive(`/${locale}/tools`)
                  ? 'text-indigo-300 bg-indigo-500/10'
                  : 'text-dark-200 hover:text-dark-50 hover:bg-white/[0.06]'
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              {dict.nav.tools}
              <svg className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setToolsOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 w-56 overflow-hidden rounded-xl border border-white/[0.08] bg-dark-800/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/5">
                  <div className="p-1.5">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setToolsOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                          isActive(tool.href)
                            ? 'text-indigo-300 bg-indigo-500/10 font-medium'
                            : 'text-dark-200 hover:text-dark-50 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className="text-base">{tool.icon}</span>
                        <span>{tool.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </li>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href={switchPath}
            className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm font-medium text-dark-200 hover:text-dark-50 hover:bg-white/[0.06] transition-all"
          >
            {locale === 'zh' ? 'English' : '中文'}
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="flex md:hidden border-t border-white/[0.06] px-4 py-2 gap-1 overflow-x-auto bg-dark-950/50">
        <MobileNavLink href={`/${locale}`} active={pathname === `/${locale}`}>
          {dict.nav.home}
        </MobileNavLink>
        <MobileNavLink href={`/${locale}/articles`} active={isActive(`/${locale}/articles`)}>
          {dict.nav.articles}
        </MobileNavLink>
        {tools.map((tool) => (
          <MobileNavLink key={tool.href} href={tool.href} active={isActive(tool.href)}>
            {tool.icon} {tool.label}
          </MobileNavLink>
        ))}
      </div>
    </header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        active
          ? 'text-indigo-300 bg-indigo-500/10'
          : 'text-dark-200 hover:text-dark-50 hover:bg-white/[0.06]'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
        active ? 'text-indigo-300 bg-indigo-500/10' : 'text-dark-300'
      }`}
    >
      {children}
    </Link>
  )
}
