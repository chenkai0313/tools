<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

**Key breaking changes in this version (16.2.4):**
- `middleware.ts` is **deprecated**, renamed to `proxy.ts` — use `proxy.ts` at project root for request interception
- `params` is a **Promise** — must use `await params` or `React.use()` in pages/layouts
- `PageProps` and `LayoutProps` are globally available TypeScript helpers
- `searchParams` is also a Promise
<!-- END:nextjs-agent-rules -->

---

# Project Rules: 站长工具站 (Webmaster Tools)

## Project Overview
A pure frontend, bilingual (zh/en) webmaster tools portal. All tools run in the browser with no backend dependency. Deployed on Vercel.

## Tech Stack
- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 (utility-first, no custom CSS files)
- **Icons**: Use inline SVG or `lucide-react`
- **Internationalization**: Custom dictionary-based approach with `proxy.ts` locale detection
- **Font**: Geist (via `next/font`)

## SEO Requirements
Every page MUST export static metadata:

```typescript
export const metadata: Metadata = {
  title: '页面标题 - 站长工具',
  description: '页面描述，120字以内',
  keywords: '关键词1, 关键词2',
  alternates: {
    languages: {
      'zh': '/zh/page-path',
      'en': '/en/page-path',
    },
  },
}
```

- Tool pages should include JSON-LD structured data via `<script>` tag
- Each page must have unique title and description

## Project Structure

```
app/
├── [lang]/                    # Locale-based routing
│   ├── layout.tsx             # Locale layout (Header + Footer wrapper)
│   ├── page.tsx               # Homepage
│   ├── articles/
│   │   ├── page.tsx           # Article list
│   │   └── [slug]/page.tsx    # Article detail
│   └── tools/
│       ├── time/page.tsx      # Time conversion tool
│       ├── json/page.tsx      # JSON tool
│       ├── base64/page.tsx    # Base64 image tool
│       ├── password/page.tsx  # Password generator
│       └── cron/page.tsx      # Cron expression tool
├── layout.tsx                 # Root layout (html/body only)
├── globals.css                # Global Tailwind imports
components/
├── Header.tsx                 # Navigation bar
├── Footer.tsx                 # Site footer
├── ArticleCard.tsx            # Article card component
└── ...                        # Other shared components
lib/
├── utils.ts                   # General utilities
├── i18n.ts                    # i18n setup
└── ...                        # Tool-specific logic
i18n/
├── zh.ts                      # Chinese translations
└── en.ts                      # English translations
data/
└── articles.ts                # Static article data
proxy.ts                       # Locale detection & redirect
```

## Naming Conventions
- **Components**: PascalCase (`ArticleCard.tsx`), one component per file, default export
- **Utilities**: camelCase (`formatTimestamp.ts`), named exports
- **Translation keys**: dot-notation (`nav.home`, `tool.time.title`)
- **Files**: kebab-case for data files, camelCase for utilities

## Component Patterns
- Use **Server Components** by default; add `'use client'` only when needed (event handlers, browser APIs, state)
- One default export per component file
- Props typed with `interface` (not `type`), prefixed with component name: `HeaderProps`
- Use Tailwind CSS for all styling, no CSS modules or styled-components

## i18n Approach
- Locale routing via `app/[lang]/` with `proxy.ts` for auto-detection
- Two supported locales: `zh` (default) and `en`
- Translations stored in `i18n/zh.ts` and `i18n/en.ts` as typed objects
- Use `useTranslations()` hook in client components, `dictionary` lookup in server components
- Language switcher in Header, stored in cookie

## Tailwind CSS v4 Notes
- Configuration is in CSS via `@import` in `globals.css`, NOT `tailwind.config.ts`
- Use `@theme` directive for custom values
- v4 uses CSS-first configuration — no JS config file needed

## Development
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
