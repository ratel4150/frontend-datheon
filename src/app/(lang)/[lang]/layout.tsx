// src\app\(lang)\[lang]\layout.tsx
import type { ReactNode } from 'react'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

type Props = {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  return (
    <>
      <header style={{ padding: 16, borderBottom: '1px solid #ccc' }}>
        <LanguageSwitcher currentLang={lang} />
      </header>
      <main>{children}</main>
    </>
  )
}
