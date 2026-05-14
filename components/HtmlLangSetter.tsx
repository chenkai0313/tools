'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function HtmlLangSetter() {
  const params = useParams()
  const lang = params?.lang as string | undefined

  useEffect(() => {
    if (lang && lang !== document.documentElement.lang) {
      document.documentElement.lang = lang
    }
  }, [lang])

  return null
}
