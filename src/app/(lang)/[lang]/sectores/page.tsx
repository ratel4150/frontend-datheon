// File: frontend-datheon/src/app/(lang)/[lang]/sectores/page.tsx
import type { Metadata } from 'next'
import { SectoresClient } from './SectoresClient'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

const meta: Record<Lang, { title: string; description: string }> = {
  es: { title: 'Sectores | Datheón', description: 'Soluciones de IA y tecnología para 19 sectores: fintech, salud, logística, manufactura, retail, agrotech y más. Resultados medibles en producción.' },
  en: { title: 'Sectors | Datheón', description: 'AI and technology solutions for 19 sectors: fintech, health, logistics, manufacturing, retail, agrotech and more. Measurable production results.' },
  fr: { title: 'Secteurs | Datheón', description: "Solutions IA et technologie pour 19 secteurs : fintech, santé, logistique, industrie, retail, agrotech et plus. Résultats mesurables en production." },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l = (lang in meta ? lang : 'es') as Lang
  const m = meta[l]
  return {
    title: m.title, description: m.description,
    alternates: {
      canonical: `https://datheon.io/${l}/sectores`,
      languages: { es: 'https://datheon.io/es/sectores', en: 'https://datheon.io/en/sectores', fr: 'https://datheon.io/fr/sectores' },
    },
    openGraph: { title: m.title, description: m.description, images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es','en','fr'].includes(lang) ? lang : 'es') as Lang
  return <SectoresClient lang={l}/>
}