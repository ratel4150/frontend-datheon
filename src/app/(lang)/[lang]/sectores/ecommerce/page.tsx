// File: frontend-datheon/src/app/(lang)/[lang]/sectores/ecommerce/page.tsx
import type { Metadata } from 'next'
import { SectorPageContent } from './SectorPageContent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

const meta: Record<Lang, { title: string; description: string }> = {
  es: {
    title: 'E-commerce con IA | Datheón',
    description: 'Soluciones de IA para e-commerce: recomendaciones personalizadas, chatbots de ventas, optimización de checkout y analytics de comportamiento. +35% ticket promedio.',
  },
  en: {
    title: 'AI E-commerce Solutions | Datheón',
    description: 'AI solutions for e-commerce: personalized recommendations, sales chatbots, checkout optimization and behavior analytics. +35% average ticket.',
  },
  fr: {
    title: 'E-commerce avec IA | Datheón',
    description: "Solutions IA pour l'e-commerce : recommandations personnalisées, chatbots de vente, optimisation du checkout et analytique comportementale. +35% panier moyen.",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l = (lang in meta ? lang : 'es') as Lang
  const m = meta[l]
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://datheon.io/${l}/sectores/ecommerce`,
      languages: {
        es: 'https://datheon.io/es/sectores/ecommerce',
        en: 'https://datheon.io/en/sectores/ecommerce',
        fr: 'https://datheon.io/fr/sectores/ecommerce',
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <SectorPageContent lang={l} />
}