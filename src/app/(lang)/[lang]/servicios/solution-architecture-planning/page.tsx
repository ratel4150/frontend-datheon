import type { Metadata } from 'next'
import { ServicePageContent } from './ServicePageContent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Datheón · Servicio',
    alternates: {
      canonical: `https://datheon.io/${lang}/servicios/solution-architecture-planning`,
      languages: {
        es: 'https://datheon.io/es/servicios/solution-architecture-planning',
        en: 'https://datheon.io/en/servicios/solution-architecture-planning',
        fr: 'https://datheon.io/fr/servicios/solution-architecture-planning',
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}
