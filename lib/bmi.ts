export function calcBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0
  const heightM = heightCm / 100
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10
}

export function getBMICategory(bmi: number): { label: string; labelZh: string; color: string; colorClass: string } {
  if (bmi <= 0) return { label: '—', labelZh: '—', color: '#6b7280', colorClass: 'text-dark-400' }
  if (bmi < 18.5) return { label: 'Underweight', labelZh: '偏瘦', color: '#f59e0b', colorClass: 'text-amber-400' }
  if (bmi < 25) return { label: 'Normal', labelZh: '正常', color: '#22c55e', colorClass: 'text-green-400' }
  if (bmi < 30) return { label: 'Overweight', labelZh: '偏胖', color: '#f97316', colorClass: 'text-orange-400' }
  return { label: 'Obese', labelZh: '肥胖', color: '#ef4444', colorClass: 'text-red-400' }
}

export function calcAge(birthday: string): { years: number; months: number; days: number } {
  const birth = new Date(birthday)
  const today = new Date()
  if (isNaN(birth.getTime())) return { years: 0, months: 0, days: 0 }

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  return { years, months, days }
}

export function getHealthyWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100
  return {
    min: Math.round(18.5 * heightM * heightM * 10) / 10,
    max: Math.round(24.9 * heightM * heightM * 10) / 10,
  }
}

export function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10
}

export function lbToKg(lb: number): number {
  return Math.round(lb / 2.20462 * 10) / 10
}

export function cmToIn(cm: number): number {
  return Math.round(cm / 2.54 * 10) / 10
}

export function inToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10
}
