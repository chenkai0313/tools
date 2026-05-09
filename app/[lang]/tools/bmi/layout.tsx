import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? 'BMI 计算器 / 年龄计算' : 'BMI Calculator / Age Calculator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线 BMI 身体质量指数计算器和年龄计算器，输入身高体重计算 BMI 值并判断体重状况，输入生日精确计算年龄。'
      : 'Online BMI calculator and age calculator. Enter height and weight to calculate BMI and body fat category. Calculate exact age from birthday.',
    keywords: 'BMI calculator, body mass index, BMI chart, healthy weight, age calculator, BMI 计算器, 身体质量指数, 体重指数, 年龄计算, 身高体重计算',
          openGraph: {
      title: `${lang === 'zh' ? 'BMI 计算器 / 年龄计算' : 'BMI Calculator / Age Calculator'} - 站长工具`,
      description: lang === 'zh'
        ? '在线BMI计算器和年龄计算器，输入身高体重计算BMI值，输入生日精确计算年龄。'
        : 'Online BMI and age calculator. Calculate your body mass...',
    },
    alternates: {
      languages: { 'zh': '/zh/tools/bmi', 'en': '/en/tools/bmi' },
      canonical: `https://schg.xyz/${lang}/tools/bmi`,
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
