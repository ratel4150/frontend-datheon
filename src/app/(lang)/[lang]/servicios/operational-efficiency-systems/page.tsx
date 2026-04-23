// File: frontend-datheon/src/app/(lang)/[lang]/servicios/operational-efficiency-systems/page.tsx
import type { Metadata } from 'next'
import { ServicePageContent } from './ServicePageContent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Datheón · Servicio',
    alternates: {
      canonical: `https://datheon.io/${lang}/servicios/operational-efficiency-systems`,
      languages: {
        es: 'https://datheon.io/es/servicios/operational-efficiency-systems',
        en: 'https://datheon.io/en/servicios/operational-efficiency-systems',
        fr: 'https://datheon.io/fr/servicios/operational-efficiency-systems',
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}
