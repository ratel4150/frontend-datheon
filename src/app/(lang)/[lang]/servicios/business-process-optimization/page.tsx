// File: frontend-datheon/src/app/(lang)/[lang]/servicios/business-process-optimization/page.tsx
// File: frontend-datheon/src/app/(lang)/[lang]/servicios/ai-strategy-consulting/page.tsx
// File: frontend-datheon/src/app/(lang)/[lang]/servicios/apps-moviles/page.tsx
import type { Metadata } from 'next'
import { ServicePageContent } from './ServicePageContent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Datheón · Servicio',
    alternates: {
      canonical: `https://datheon.io/${lang}/servicios/business-process-optimization`,
      languages: {
        es: 'https://datheon.io/es/servicios/business-process-optimization',
        en: 'https://datheon.io/en/servicios/business-process-optimization',
        fr: 'https://datheon.io/fr/servicios/business-process-optimization',
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}