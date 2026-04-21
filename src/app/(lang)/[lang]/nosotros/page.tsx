// File: frontend-datheon/src/app/(lang)/[lang]/aboutus/page.tsx
import type { Metadata } from 'next'
import { NosotrosClient } from './NosotrosClient'

type Props = { params: Promise<{ lang: string }> }

const metaByLang = {
  es: {
    title: 'Nosotros | Datheón — Consultora Tecnológica',
    description: 'Conoce al equipo detrás de Datheón. Somos una consultora tecnológica fundada en 2023, especializada en AI SaaS, agentes autónomos, desarrollo web, IoT y Cloud.',
  },
  en: {
    title: 'About Us | Datheón — Tech Consultancy',
    description: 'Meet the team behind Datheón. A tech consultancy founded in 2023, specialized in AI SaaS, autonomous agents, web development, IoT and Cloud.',
  },
  fr: {
    title: 'À Propos | Datheón — Conseil Technologique',
    description: "Découvrez l'équipe derrière Datheón. Cabinet de conseil technologique fondé en 2023, spécialisé en IA SaaS, agents autonomes, développement web, IoT et Cloud.",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l = (lang in metaByLang ? lang : 'es') as keyof typeof metaByLang
  const m = metaByLang[l]
  return {
    title: m.title,
    description: m.description,
    keywords: ['Datheón equipo', 'consultora tecnológica', 'quiénes somos', 'AI SaaS team'],
    alternates: {
      canonical: `https://datheon.com/${l}/nosotros`,
      languages: {
        es: 'https://datheon.com/es/nosotros',
        en: 'https://datheon.com/en/nosotros',
        fr: 'https://datheon.com/fr/nosotros',
        'x-default': 'https://datheon.com/es/nosotros',
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://datheon.com/${l}/nosotros`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Datheón — Equipo' }],
    },
  }
}

export default async function NosotrosPage({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es')
  return <NosotrosClient lang={l}/>
}