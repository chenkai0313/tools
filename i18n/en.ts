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
    siteIntro: 'Ken Webmaster Tools is a free online toolset for developers and webmasters. All tools run entirely in the browser — no backend server, no data upload. Currently offering 12 tools including timestamp conversion, JSON formatting & validation, Base64 image conversion, password generation, Cron expression parsing, case conversion, QR code generation, hash calculation, encoding conversion, regex testing, config format conversion, and AES/DES/RSA encryption/decryption. Covers everyday scenarios in development, deployment, and security.',
    whyUs: {
      title: 'Why Choose Us',
      points: [
        { title: 'Client-Side Processing, Privacy First', desc: 'All computation happens in your browser. Your data never leaves your device — safe for handling code, configs, and sensitive keys.' },
        { title: 'Completely Free, No Sign-Up', desc: 'All tools are free with no usage limits. No registration, no login, no configuration required. Just open and use.' },
        { title: 'Built for Developer Experience', desc: 'Clean terminal-inspired UI, responsive design for desktop and mobile. Double-click to copy results, real-time preview, and more.' },
      ],
    },
    toolCategories: {
      title: 'Tool Categories',
      dev: { title: 'Development', desc: 'JSON formatting & validation, regex testing, case conversion, encoding conversion — essential tools for daily coding.' },
      security: { title: 'Security & Encryption', desc: 'Hash calculation, AES/DES/RSA encryption, password generator — for data protection and password management.' },
      convert: { title: 'Format Conversion', desc: 'Timestamp & date conversion, Base64 & image conversion, YAML/TOML/JSON config format conversion.' },
      utility: { title: 'Utilities', desc: 'QR code generation, Cron expression parsing — handy tools for everyday needs.' },
    },
    scenarios: {
      title: 'Use Scenarios',
      items: [
        { title: 'Web Development', desc: 'Quickly format JSON during API integration, write and test regex patterns, convert naming conventions and URL encoding.' },
        { title: 'DevOps & Deployment', desc: 'Convert timestamps to readable dates, parse Cron expressions, transform config files between YAML, TOML, and JSON.' },
        { title: 'Security Needs', desc: 'Compute hashes for files and strings locally, encrypt sensitive configs with AES/RSA, generate strong random passwords.' },
      ],
    },
    popularTools: 'Popular Tools',
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
    friends: 'Friends',
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
