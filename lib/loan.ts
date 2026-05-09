export interface PaymentRow {
  month: number
  payment: number
  principal: number
  interest: number
  remaining: number
}

export interface LoanSchedule {
  totalPayment: number
  totalInterest: number
  monthlyPayment: number | number[]
  schedule: PaymentRow[]
}

export function calcEqualInterest(
  amount: number,
  annualRate: number,
  months: number
): LoanSchedule {
  const monthlyRate = annualRate / 12 / 100
  const payment = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1) * 100
  ) / 100

  let remaining = amount
  const schedule: PaymentRow[] = []
  let totalPayment = 0

  for (let i = 1; i <= months; i++) {
    const interest = Math.round(remaining * monthlyRate * 100) / 100
    const principal = Math.round((payment - interest) * 100) / 100
    remaining = Math.round((remaining - principal) * 100) / 100

    if (i === months) {
      // Adjust last month for rounding
      schedule.push({
        month: i,
        payment: Math.round((principal + interest) * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        remaining: 0,
      })
      totalPayment += principal + interest
    } else {
      schedule.push({ month: i, payment, principal, interest, remaining })
      totalPayment += payment
    }
  }

  return {
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round((totalPayment - amount) * 100) / 100,
    monthlyPayment: payment,
    schedule,
  }
}

export function calcEqualPrincipal(
  amount: number,
  annualRate: number,
  months: number
): LoanSchedule {
  const monthlyRate = annualRate / 12 / 100
  const principalPerMonth = Math.round(amount / months * 100) / 100
  let remaining = amount
  const schedule: PaymentRow[] = []
  let totalPayment = 0

  for (let i = 1; i <= months; i++) {
    const interest = Math.round(remaining * monthlyRate * 100) / 100
    const principal = i === months
      ? Math.round(remaining * 100) / 100
      : principalPerMonth
    const payment = Math.round((principal + interest) * 100) / 100
    remaining = Math.round((remaining - principal) * 100) / 100

    schedule.push({ month: i, payment, principal, interest, remaining: Math.max(0, remaining) })
    totalPayment += payment
  }

  const payments = schedule.map(s => s.payment)

  return {
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round((totalPayment - amount) * 100) / 100,
    monthlyPayment: [Math.min(...payments), Math.max(...payments)],
    schedule,
  }
}
