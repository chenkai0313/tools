# Ken Webmaster Tools (ken 站长工具)

A free, privacy-first online toolkit for developers and webmasters. All tools run entirely in the browser — no backend server, no data upload, no registration required.

Site: [schg.xyz](https://schg.xyz)

## Features

- **12 browser-based tools** covering development, security, conversion, and everyday utilities
- **Bilingual** (Chinese / English) with automatic locale detection
- **Privacy-first**: all computation happens client-side, your data never leaves your device
- **Static export**: built with Next.js static generation, deployable anywhere

### Tools

| Category | Tools |
|---|---|
| Development | JSON formatter & validator, Regex tester, Case converter, URL/Unicode encoder |
| Security | Hash calculator (MD5/SHA), AES/DES/RSA encryption, Password generator |
| Conversion | Timestamp converter, Base64 image converter, Config format (YAML/TOML/JSON) converter |
| Utilities | QR code generator, Cron expression parser |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4
- **Font**: Geist (via `next/font`)
- **Icons**: Inline SVG / lucide-react
- **Internationalization**: Custom dictionary-based i18n

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

Static files are output to the `out/` directory, ready for deployment.

## Project Structure

```
app/[lang]/          # Locale-based routes (zh/en)
  ├── page.tsx       # Homepage
  ├── tools/         # 12 tool pages
  ├── articles/      # Blog articles
  ├── about/         # About page
  ├── contact/       # Contact page
  ├── privacy/       # Privacy policy
  └── terms/         # Terms of service
components/          # Shared UI components
data/                # Static article data
i18n/                # Translation dictionaries (zh.ts, en.ts)
lib/                 # Utility functions
proxy.ts             # Locale detection middleware
```

## License

MIT
