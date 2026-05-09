import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: `${lang === 'zh' ? '贷款还款计算器' : 'Loan Calculator'} - 站长工具`,
    description: lang === 'zh'
      ? '在线贷款计算器，支持等额本息和等额本金两种还款方式。输入贷款金额、年利率、期限，输出每月还款明细和累计利息。'
      : 'Online loan calculator with amortization schedule. Supports equal principal and equal interest payment methods. Enter loan amount, rate, and term to view monthly payments and total interest.',
    keywords: 'loan calculator, mortgage calculator, amortization, equal principal, equal interest, 贷款计算器, 房贷计算器, 等额本息, 等额本金, 还款计算, 月供计算',
    alternates: { languages: { 'zh': '/zh/tools/loan-calc', 'en': '/en/tools/loan-calc' } },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
