// src\app\(lang)\[lang]\layout.tsx
import type { ReactNode } from 'react'

import { AppBarMain } from '../components/AppBarMain'
import { Metadata } from 'next'

type Props = {
  children: ReactNode
  params: Promise<{ lang: string }>
}

// SEO básico estático
export const metadata: Metadata = {
  title: 'Datheon - Soluciones Tecnológicas para tu Negocio',
  description: 'Descubre cómo Datheon ofrece servicios y soluciones tecnológicas innovadoras para impulsar tu empresa.',
  openGraph: {
    title: 'Datheon - Soluciones Tecnológicas para tu Negocio',
    description: 'Descubre cómo Datheon ofrece servicios y soluciones tecnológicas innovadoras para impulsar tu empresa.',
    siteName: 'Datheon',
    locale: 'es_MX',
    type: 'website',
    // Puedes añadir imagen si quieres:
    // images: [{ url: '/path/to/og-image.png', alt: 'Datheon' }],
  },
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
