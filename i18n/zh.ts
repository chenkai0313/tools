const zh = {
  nav: {
    home: '首页',
    articles: '文章',
    tools: '工具',
    time: '时间转换',
    json: 'JSON 工具',
    base64: 'Base64 图片',
    password: '密码生成',
    cron: 'Cron 表达式',
    case: '命名转换',
    qrcode: '二维码生成',
    crypto: '加解密',
    hash: '哈希计算',
    encoding: '编码转换',
    regex: '正则表达式',
    config: '配置文件格式转化',
  },
  home: {
    hotArticles: '🔥 热点文章',
    categories: {
      frontend: '前端开发',
      devops: '运维监控',
      tools: '站长工具',
      security: '安全相关',
    },
  },
  article: {
    title: '全部文章',
    category: '分类',
    sort: '排序',
    latest: '最新',
    popular: '最热',
    readMore: '阅读更多',
    prev: '上一篇',
    next: '下一篇',
    minRead: '分钟阅读',
    allCategories: '全部分类',
  },
  tool: {
    placeholder: '功能开发中，敬请期待...',
    input: '输入',
    output: '结果',
    copy: '复制',
    copied: '已复制',
    clear: '清空',
    uppercase: '大写',
    flags: {
      g: '全局匹配',
      i: '忽略大小写',
      m: '多行模式',
      s: '点号匹配换行',
      u: 'Unicode 模式',
      y: '粘性匹配',
    },
  },
  footer: {
    copyright: '© 2025 站长工具',
    desc: '为站长和开发者提供实用的在线工具',
  },
  common: {
    breadcrumb: {
      home: '首页',
      articles: '文章',
      tools: '工具',
    },
  },
} as const

export default zh
export type ZhLocale = typeof zh
