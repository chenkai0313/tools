import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const tools = [
  'time', 'json', 'base64', 'password', 'cron', 'case',
  'qrcode', 'hash', 'encoding', 'regex', 'config', 'crypto',
]

const articles = [
  'json-format-guide',
  'base64-encoding-guide',
  'cron-expression-guide',
  'ip-address-guide',
  'encryption-algorithm-guide',
  'deepseek-intro-guide',
  'deepseek-coding-tips',
  'docker-install-ubuntu',
  'k3s-cluster-setup',
]

const staticPages = ['about', 'contact', 'privacy', 'terms']
const langs = ['en', 'zh']
const baseUrl = 'https://schg.xyz'
const lastMod = '2026-05-07'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of langs) {
    // Homepage
    entries.push({ url: `${baseUrl}/${lang}`, lastModified: lastMod, changeFrequency: 'weekly', priority: 1.0 })

    // Tool pages
    for (const tool of tools) {
      entries.push({
        url: `${baseUrl}/${lang}/tools/${tool}`,
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }

    // Article pages
    for (const slug of articles) {
      entries.push({
        url: `${baseUrl}/${lang}/articles/${slug}`,
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    // Article list
    entries.push({ url: `${baseUrl}/${lang}/articles`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.6 })

    // Static pages
    for (const page of staticPages) {
      entries.push({ url: `${baseUrl}/${lang}/${page}`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.5 })
    }
  }

  return entries
}
