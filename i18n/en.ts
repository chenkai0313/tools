const en = {
  nav: {
    home: 'Home',
    articles: 'Articles',
    tools: 'Tools',
    time: 'Time Converter',
    json: 'JSON Tools',
    base64: 'Base64 Image',
    password: 'Password Generator',
    cron: 'Cron Expression',
    case: 'Case Converter',
    qrcode: 'QR Code',
    crypto: 'Encrypt/Decrypt',
    hash: 'Hash',
    encoding: 'Encoding',
    regex: 'Regex Tester',
    config: 'Config Convert',
  },
  home: {
    hotArticles: '🔥 Hot Articles',
    categories: {
      frontend: 'Frontend',
      devops: 'DevOps',
      tools: 'Webmaster Tools',
      security: 'Security',
    },
  },
  article: {
    title: 'All Articles',
    category: 'Category',
    sort: 'Sort',
    latest: 'Latest',
    popular: 'Popular',
    readMore: 'Read More',
    prev: 'Previous',
    next: 'Next',
    minRead: 'min read',
    allCategories: 'All Categories',
  },
  tool: {
    placeholder: 'Tool functionality coming soon...',
    input: 'Input',
    output: 'Result',
    copy: 'Copy',
    copied: 'Copied!',
    clear: 'Clear',
    uppercase: 'Uppercase',
    flags: {
      g: 'Global match',
      i: 'Case insensitive',
      m: 'Multiline mode',
      s: 'Dot matches newline',
      u: 'Unicode mode',
      y: 'Sticky mode',
    },
  },
  footer: {
    copyright: '© 2025 Webmaster Tools',
    desc: 'Practical online tools for webmasters and developers',
  },
  common: {
    breadcrumb: {
      home: 'Home',
      articles: 'Articles',
      tools: 'Tools',
    },
  },
} as const

export default en
export type EnLocale = typeof en
