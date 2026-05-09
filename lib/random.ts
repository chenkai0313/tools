const surnamesZh = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '马', '胡', '朱', '郭', '何', '林', '罗', '高']
const givenNamesZh = ['伟', '芳', '娜', '敏', '静', '强', '磊', '洋', '勇', '艳', '杰', '军', '秀英', '明', '建华', '志强', '丽', '玲', '国强', '文']
const surnamesEn = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson']
const givenNamesEn = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph']

const emailDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com', 'proton.me', 'example.com', 'mail.com']

const phonePrefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '153', '155', '156', '157', '158', '159', '186', '187', '188', '189']

const streetNames = ['Main St', 'Oak Ave', 'Elm St', 'Park Rd', 'Lake Dr', 'Hill St', 'River Rd', 'Forest Ave', 'Cedar Ln', 'Maple Ave']
const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou', 'New York', 'Los Angeles', 'London', 'Tokyo', 'Singapore', 'Sydney', 'Paris']

const companySuffix = ['Tech', 'Inc', 'Ltd', 'Corp', 'Group', 'Solutions', 'Digital', 'Studio', 'Lab', 'Systems', 'Global', 'International']

const colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateName(locale: 'en' | 'zh'): string {
  if (locale === 'zh') {
    return pick(surnamesZh) + pick(givenNamesZh)
  }
  return `${pick(givenNamesEn)} ${pick(surnamesEn)}`
}

function generateEmail(locale: 'en' | 'zh'): string {
  const name = locale === 'zh'
    ? Math.random().toString(36).slice(2, 8)
    : pick(givenNamesEn).toLowerCase() + '.' + pick(surnamesEn).toLowerCase()
  return `${name}${randInt(1, 999)}@${pick(emailDomains)}`
}

function generatePhone(locale: 'en' | 'zh'): string {
  if (locale === 'zh') {
    return `${pick(phonePrefixes)}${String(randInt(10000000, 99999999))}`
  }
  const area = randInt(200, 999)
  const prefix = randInt(200, 999)
  const line = randInt(1000, 9999)
  return `+1 (${area}) ${prefix}-${line}`
}

function generateAddress(locale: 'en' | 'zh'): string {
  if (locale === 'zh') {
    return `${pick(cities)}${pick(streetNames)}${randInt(1, 999)}号`
  }
  return `${randInt(100, 9999)} ${pick(streetNames)}, ${pick(cities)}`
}

function generateCompany(): string {
  return `${pick(surnamesEn)} ${pick(companySuffix)}`
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function generateIP(): string {
  return `${randInt(1, 255)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 255)}`
}

function generateColor(): string {
  return `#${Array.from({ length: 6 }, () => pick(colors)).join('')}`
}

export type RandomField =
  | 'name' | 'email' | 'phone' | 'address'
  | 'company' | 'id' | 'ip' | 'color'

const fieldLabels: Record<RandomField, { zh: string; en: string }> = {
  name: { zh: '姓名', en: 'Name' },
  email: { zh: '邮箱', en: 'Email' },
  phone: { zh: '电话', en: 'Phone' },
  address: { zh: '地址', en: 'Address' },
  company: { zh: '公司', en: 'Company' },
  id: { zh: 'UUID', en: 'UUID' },
  ip: { zh: 'IP 地址', en: 'IP Address' },
  color: { zh: '颜色', en: 'Color' },
}

export function getFieldLabels(locale: 'en' | 'zh'): Record<RandomField, string> {
  const labels: Record<string, string> = {}
  for (const [key, val] of Object.entries(fieldLabels)) {
    labels[key as RandomField] = val[locale]
  }
  return labels as Record<RandomField, string>
}

export function generateRandomData(
  count: number,
  fields: RandomField[],
  locale: 'en' | 'zh'
): Record<string, string>[] {
  const data: Record<string, string>[] = []
  for (let i = 0; i < count; i++) {
    const row: Record<string, string> = {}
    for (const field of fields) {
      switch (field) {
        case 'name':
          row[fieldLabels[field][locale]] = generateName(locale)
          break
        case 'email':
          row[fieldLabels[field][locale]] = generateEmail(locale)
          break
        case 'phone':
          row[fieldLabels[field][locale]] = generatePhone(locale)
          break
        case 'address':
          row[fieldLabels[field][locale]] = generateAddress(locale)
          break
        case 'company':
          row[fieldLabels[field][locale]] = generateCompany()
          break
        case 'id':
          row[fieldLabels[field][locale]] = generateUUID()
          break
        case 'ip':
          row[fieldLabels[field][locale]] = generateIP()
          break
        case 'color':
          row[fieldLabels[field][locale]] = generateColor()
          break
      }
    }
    data.push(row)
  }
  return data
}

export function dataToCSV(data: Record<string, string>[]): string {
  if (data.length === 0) return ''
  const headers = Object.keys(data[0])
  const lines = data.map((row) =>
    headers.map((h) => `"${(row[h] || '').replace(/"/g, '""')}"`).join(',')
  )
  return [headers.join(','), ...lines].join('\n')
}

export function dataToJSON(data: Record<string, string>[]): string {
  return JSON.stringify(data, null, 2)
}
