'use client'

import Link from 'next/link'

const toolDisplay: Record<string, { zh: string; en: string }> = {
  time: { zh: '时间戳转换', en: 'Timestamp' },
  json: { zh: 'JSON 工具', en: 'JSON Tools' },
  base64: { zh: 'Base64 图片', en: 'Base64 Image' },
  password: { zh: '密码生成器', en: 'Password' },
  cron: { zh: 'Cron 表达式', en: 'Cron' },
  case: { zh: '命名转换', en: 'Case' },
  qrcode: { zh: '二维码生成', en: 'QR Code' },
  hash: { zh: '哈希计算', en: 'Hash' },
  encoding: { zh: '编码转换', en: 'Encoding' },
  regex: { zh: '正则测试', en: 'Regex' },
  config: { zh: '配置转化', en: 'Config' },
  crypto: { zh: '加解密', en: 'Crypto' },
  bmi: { zh: 'BMI 计算', en: 'BMI' },
  'random-data': { zh: '随机数据', en: 'Random Data' },
  'image-tools': { zh: '图片工具', en: 'Image Tools' },
  'world-clock': { zh: '世界时钟', en: 'World Clock' },
  'roman-numeral': { zh: '罗马数字', en: 'Roman Numeral' },
  'number-chinese': { zh: '数字中文', en: 'Num→Chinese' },
  'loan-calc': { zh: '贷款计算', en: 'Loan Calc' },
}

const relatedMap: Record<string, string[]> = {
  time: ['cron', 'world-clock'],
  json: ['config', 'regex', 'encoding'],
  base64: ['encoding', 'image-tools', 'json'],
  password: ['hash', 'crypto', 'random-data'],
  cron: ['time', 'world-clock'],
  case: ['regex', 'encoding', 'json'],
  qrcode: ['image-tools', 'base64'],
  hash: ['crypto', 'password', 'encoding'],
  encoding: ['base64', 'hash', 'case'],
  regex: ['case', 'json', 'encoding'],
  config: ['json', 'encoding'],
  crypto: ['hash', 'password', 'encoding'],
  bmi: ['loan-calc', 'random-data'],
  'random-data': ['password', 'bmi', 'loan-calc'],
  'image-tools': ['qrcode', 'base64'],
  'world-clock': ['time', 'cron'],
  'roman-numeral': ['number-chinese', 'case'],
  'number-chinese': ['roman-numeral', 'case'],
  'loan-calc': ['bmi', 'random-data'],
}

export default function RelatedTools({ lang, current }: { lang: string; current: string }) {
  const related = relatedMap[current]
  if (!related || related.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-white/[0.06]">
      <h2 className="text-sm font-semibold text-dark-50 mb-4">
        {lang === 'zh' ? '相关工具' : 'Related Tools'}
      </h2>
      <div className="flex flex-wrap gap-2">
        {related.map((slug) => {
          const info = toolDisplay[slug]
          if (!info) return null
          return (
            <Link
              key={slug}
              href={`/${lang}/tools/${slug}/`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 py-2 text-sm text-dark-300 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
            >
              {lang === 'zh' ? info.zh : info.en}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
