// src\app\(lang)\[lang]\layout.tsx
import type { ReactNode } from 'react'

import { AppBarMain } from '../components/AppBarMain'

type Props = {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  return (
    <>
     <AppBarMain currentLang={lang} />
      <main>{children}</main>
    </>
  )
}
