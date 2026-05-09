'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/i18n'
import { calcBMI, getBMICategory, calcAge, getHealthyWeightRange, kgToLb, lbToKg, cmToIn, inToCm } from '@/lib/bmi'
import { toolContent } from '@/components/ToolContent'

export default function BMIPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)
  const [tab, setTab] = useState<'bmi' | 'age'>('bmi')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [birthday, setBirthday] = useState('')

  const bmiResult = useMemo(() => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    if (!w || !h || w <= 0 || h <= 0) return null

    const realW = unit === 'imperial' ? lbToKg(w) : w
    const realH = unit === 'imperial' ? inToCm(h) : h
    const bmi = calcBMI(realW, realH)
    const category = getBMICategory(bmi)
    const range = getHealthyWeightRange(realH)
    return {
      bmi,
      category,
      minWeight: unit === 'imperial' ? kgToLb(range.min) : range.min,
      maxWeight: unit === 'imperial' ? kgToLb(range.max) : range.max,
      weightUnit: unit === 'imperial' ? 'lb' : 'kg',
      heightUnit: unit === 'imperial' ? 'in' : 'cm',
    }
  }, [weight, height, unit])

  const ageResult = useMemo(() => {
    if (!birthday) return null
    return calcAge(birthday)
  }, [birthday])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-dark-50 mb-2">{dict.nav.bmi}</h1>
      <p className="text-sm text-dark-400 mb-6">
        {lang === 'zh' ? '计算身体质量指数和年龄' : 'Calculate BMI and age'}
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['bmi', 'age'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              tab === t
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08]'
            }`}
          >
            {t === 'bmi' ? (lang === 'zh' ? 'BMI 计算' : 'BMI') : (lang === 'zh' ? '年龄计算' : 'Age')}
          </button>
        ))}
      </div>

      {tab === 'bmi' && (
        <>
          {/* Unit toggle */}
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
              className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-dark-400 hover:text-indigo-300 transition-colors"
            >
              {unit === 'metric' ? (lang === 'zh' ? '切换英制 (lb/in)' : 'Switch to imperial') : (lang === 'zh' ? '切换公制 (kg/cm)' : 'Switch to metric')}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <label className="text-sm font-medium text-dark-200 mb-2 block">
                {unit === 'metric' ? (lang === 'zh' ? '身高 (cm)' : 'Height (cm)') : (lang === 'zh' ? '身高 (in)' : 'Height (in)')}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? '170' : '67'}
                className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-4 py-3 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <label className="text-sm font-medium text-dark-200 mb-2 block">
                {unit === 'metric' ? (lang === 'zh' ? '体重 (kg)' : 'Weight (kg)') : (lang === 'zh' ? '体重 (lb)' : 'Weight (lb)')}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? '70' : '154'}
                className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-4 py-3 text-sm text-dark-50 placeholder:text-dark-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          {/* BMI Result */}
          {bmiResult && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-xs text-dark-500 mb-1">BMI</p>
                <p className="text-4xl font-bold text-dark-50">{bmiResult.bmi}</p>
                <p className={`text-sm font-medium mt-1 ${bmiResult.category.colorClass}`}>
                  {lang === 'zh' ? bmiResult.category.labelZh : bmiResult.category.label}
                </p>
              </div>
              <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min((bmiResult.bmi / 40) * 100, 100)}%`,
                    backgroundColor: bmiResult.category.color,
                  }}
                />
              </div>
              <p className="text-xs text-dark-400 text-center mt-3">
                {lang === 'zh'
                  ? `健康体重范围: ${bmiResult.minWeight}${bmiResult.weightUnit} ~ ${bmiResult.maxWeight}${bmiResult.weightUnit}`
                  : `Healthy weight range: ${bmiResult.minWeight}${bmiResult.weightUnit} ~ ${bmiResult.maxWeight}${bmiResult.weightUnit}`}
              </p>
            </div>
          )}

          {/* BMI Categories */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-8">
            <h3 className="text-sm font-semibold text-dark-100 mb-3">
              {lang === 'zh' ? 'BMI 参考标准' : 'BMI Reference'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: '< 18.5', zh: '偏瘦', en: 'Underweight', color: 'text-amber-400' },
                { label: '18.5 - 24.9', zh: '正常', en: 'Normal', color: 'text-green-400' },
                { label: '25 - 29.9', zh: '偏胖', en: 'Overweight', color: 'text-orange-400' },
                { label: '≥ 30', zh: '肥胖', en: 'Obese', color: 'text-red-400' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 rounded-lg bg-white/[0.04]">
                  <p className="text-xs text-dark-400">{item.label}</p>
                  <p className={`text-sm font-bold ${item.color}`}>{lang === 'zh' ? item.zh : item.en}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'age' && (
        <>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 mb-6">
            <label className="text-sm font-medium text-dark-200 mb-2 block">
              {lang === 'zh' ? '选择出生日期' : 'Select your birthday'}
            </label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-dark-800/50 px-4 py-3 text-sm text-dark-50 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          {ageResult && (ageResult.years > 0 || ageResult.months > 0 || ageResult.days > 0) && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-indigo-300">{ageResult.years}</p>
                  <p className="text-xs text-dark-400 mt-1">{lang === 'zh' ? '岁' : 'years'}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-indigo-300">{ageResult.months}</p>
                  <p className="text-xs text-dark-400 mt-1">{lang === 'zh' ? '个月' : 'months'}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-indigo-300">{ageResult.days}</p>
                  <p className="text-xs text-dark-400 mt-1">{lang === 'zh' ? '天' : 'days'}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {toolContent.bmi[lang as 'zh' | 'en']}
    </div>
  )
}
