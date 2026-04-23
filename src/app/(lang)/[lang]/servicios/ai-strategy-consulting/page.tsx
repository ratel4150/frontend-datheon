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
      canonical: `https://datheon.com/${lang}/servicios/ai-strategy-consulting`,
      languages: {
        es: 'https://datheon.com/es/servicios/ai-strategy-consulting',
        en: 'https://datheon.com/en/servicios/ai-strategy-consulting',
        fr: 'https://datheon.com/fr/servicios/ai-strategy-consulting',
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}