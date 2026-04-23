// File: frontend-datheon/src/app/(lang)/[lang]/servicios/enterprise-architecture-design/page.tsx
import type { Metadata } from 'next'
import { ServicePageContent } from './ServicePageContent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Datheón · Servicio',
    alternates: {
      canonical: `https://datheon.io/${lang}/servicios/enterprise-architecture-design`,
      languages: {
        es: 'https://datheon.io/es/servicios/enterprise-architecture-design',
        en: 'https://datheon.io/en/servicios/enterprise-architecture-design',
        fr: 'https://datheon.io/fr/servicios/enterprise-architecture-design',
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}
