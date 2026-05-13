'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/i18n'
import { calcEqualInterest, calcEqualPrincipal } from '@/lib/loan'
import { toolContent } from '@/components/ToolContent'

export default function LoanCalcPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('')
  const [method, setMethod] = useState<'equal-interest' | 'equal-principal'>('equal-interest')
  const [calc, setCalc] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)

  const result = useMemo(() => {
    if (!calc) return null
    const p = parseFloat(amount)
    const r = parseFloat(rate)
    const m = parseInt(term, 10)
    if (!p || !r || !m || p <= 0 || r <= 0 || m <= 0) return { error: true }
    if (p > 9999999999) return { error: true }

    const schedule = method === 'equal-interest'
      ? calcEqualInterest(p, r, m)
      : calcEqualPrincipal(p, r, m)

    return { schedule, error: false }
  }, [amount, rate, term, method, calc])

  const handleCalc = () => {
    setCalc(true)
    setShowSchedule(true)
  }

  const presets = [
    { label: lang === 'zh' ? '房贷 30年' : 'Mortgage 30yr', amount: '1000000', rate: '3.85', term: '360' },
    { label: lang === 'zh' ? '车贷 5年' : 'Auto Loan 5yr', amount: '150000', rate: '4.75', term: '60' },
    { label: lang === 'zh' ? '消费贷 2年' : 'Personal 2yr', amount: '50000', rate: '6.5', term: '24' },
    { label: lang === 'zh' ? '经营贷 10年' : 'Business 10yr', amount: '500000', rate: '4.25', term: '120' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-dark-50 mb-2">{dict.nav['loan-calc']}</h1>
      <div className="mb-6 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? '贷款计算器是购房、购车等大额消费决策中的重要参考工具。支持两种主流还款方式：<strong>等额本息</strong>（每月还款金额固定，前期利息占比高）和<strong>等额本金</strong>（每月还相同本金，利息逐月递减，总利息更少）。输入贷款金额、年利率和期限，立即查看月供和总利息。'
            : 'A loan calculator is an essential tool for mortgage and auto loan decisions. Supports two repayment methods: <strong>Equal Interest</strong> (fixed monthly payment, higher initial interest portion) and <strong>Equal Principal</strong> (fixed principal repayment per month, decreasing interest — lower total interest). Enter loan amount, annual rate, and term to see monthly payments and total interest.'}
        </p>
        <p>
          {lang === 'zh'
            ? '快捷预设一键填入常见场景（房贷 100 万 30 年 3.85%、车贷 15 万 5 年 4.75% 等）。展开还款明细表查看逐月还款详情——每月还多少本金、多少利息、剩余本金。所有计算在浏览器本地完成，输入数据不存储不上传。注意：计算结果仅供参考，实际贷款条件以金融机构合同为准。'
            : 'Quick presets for common scenarios (mortgage $1M 30yr 3.85%, auto loan $150K 5yr 4.75%). Expand the amortization schedule for month-by-month details — principal, interest, and remaining balance. All calculations are client-side; input data is never stored or uploaded. Note: results are for reference only; actual loan terms are governed by financial institution contracts.'}
        </p>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => { setAmount(p.amount); setRate(p.rate); setTerm(p.term); setCalc(false) }}
            className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-dark-300 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input form */}
      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <label className="text-xs text-dark-400 mb-1.5 block">
            {lang === 'zh' ? '贷款金额' : 'Loan Amount'}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000000"
            className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2.5 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <label className="text-xs text-dark-400 mb-1.5 block">
            {lang === 'zh' ? '年利率 (%)' : 'Annual Rate (%)'}
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="3.85"
            step="0.01"
            className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2.5 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <label className="text-xs text-dark-400 mb-1.5 block">
            {lang === 'zh' ? '期限 (月)' : 'Term (months)'}
          </label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="360"
            className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-3 py-2.5 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Method selector */}
      <div className="flex gap-2 mb-6">
        {(['equal-interest', 'equal-principal'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMethod(m); setCalc(false) }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              method === m
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08]'
            }`}
          >
            {m === 'equal-interest'
              ? (lang === 'zh' ? '等额本息' : 'Equal Interest')
              : (lang === 'zh' ? '等额本金' : 'Equal Principal')}
          </button>
        ))}
        <button
          onClick={handleCalc}
          className="ml-auto rounded-lg bg-indigo-500/20 px-6 py-2 text-sm font-medium text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
        >
          {lang === 'zh' ? '计算' : 'Calculate'}
        </button>
      </div>

      {/* Results */}
      {result?.schedule && (
        <>
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <p className="text-xs text-dark-500 mb-1">{lang === 'zh' ? '还款总额' : 'Total Payment'}</p>
              <p className="text-xl font-bold text-dark-50">{result.schedule.totalPayment.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <p className="text-xs text-dark-500 mb-1">{lang === 'zh' ? '利息总额' : 'Total Interest'}</p>
              <p className="text-xl font-bold text-orange-400">{result.schedule.totalInterest.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <p className="text-xs text-dark-500 mb-1">{lang === 'zh' ? '月供' : 'Monthly Payment'}</p>
              <p className="text-xl font-bold text-indigo-300">
                {typeof result.schedule.monthlyPayment === 'number'
                  ? result.schedule.monthlyPayment.toLocaleString()
                  : `${result.schedule.monthlyPayment[1].toLocaleString()} ~ ${result.schedule.monthlyPayment[0].toLocaleString()}`}
              </p>
            </div>
          </div>

          {/* Schedule table */}
          {showSchedule && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-dark-100">
                  {lang === 'zh' ? '还款明细表' : 'Amortization Schedule'}
                </h3>
                <button
                  onClick={() => setShowSchedule(false)}
                  className="text-xs text-dark-400 hover:text-dark-200"
                >
                  {lang === 'zh' ? '收起' : 'Collapse'}
                </button>
              </div>
              <div className="overflow-x-auto max-h-80 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-dark-400 border-b border-white/[0.06]">
                      <th className="text-left py-2 pr-2">{lang === 'zh' ? '期数' : 'Month'}</th>
                      <th className="text-right py-2 px-2">{lang === 'zh' ? '月供' : 'Payment'}</th>
                      <th className="text-right py-2 px-2">{lang === 'zh' ? '本金' : 'Principal'}</th>
                      <th className="text-right py-2 px-2">{lang === 'zh' ? '利息' : 'Interest'}</th>
                      <th className="text-right py-2 pl-2">{lang === 'zh' ? '剩余' : 'Remaining'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.schedule.map((row) => (
                      <tr key={row.month} className="border-b border-white/[0.03] text-dark-300">
                        <td className="py-2 pr-2">{row.month}</td>
                        <td className="text-right py-2 px-2 font-mono">{row.payment.toLocaleString()}</td>
                        <td className="text-right py-2 px-2 font-mono">{row.principal.toLocaleString()}</td>
                        <td className="text-right py-2 px-2 font-mono">{row.interest.toLocaleString()}</td>
                        <td className="text-right py-2 pl-2 font-mono">{row.remaining.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {toolContent['loan-calc'][lang as 'zh' | 'en']}
    </div>
  )
}
