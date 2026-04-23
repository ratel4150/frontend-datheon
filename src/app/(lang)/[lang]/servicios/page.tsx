// File: frontend-datheon/src/app/(lang)/[lang]/servicios/page.tsx
import type { Metadata } from 'next'
import { ServiciosClient } from './ServiciosClient';




type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

const metaByLang: Record<Lang, { title: string; description: string }> = {
  es: {
    title: 'Servicios de Tecnología e IA | Datheón',
    description: 'Agentes autónomos, desarrollo web y SaaS, IoT, Cloud DevOps, apps móviles y Odoo ERP. Consultoría tech real, sin promesas vagas.',
  },
  en: {
    title: 'Technology & AI Services | Datheón',
    description: 'Autonomous agents, web & SaaS development, IoT, Cloud DevOps, mobile apps and Odoo ERP. Real tech consulting, no empty promises.',
  },
  fr: {
    title: 'Services Technologie & IA | Datheón',
    description: "Agents autonomes, développement web & SaaS, IoT, Cloud DevOps, apps mobiles et Odoo ERP. Conseil tech réel, sans promesses vaines.",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l = (lang in metaByLang ? lang : 'es') as Lang
  const m = metaByLang[l]
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://datheon.com/${l}/servicios`,
      languages: {
        es: 'https://datheon.com/es/servicios',
        en: 'https://datheon.com/en/servicios',
        fr: 'https://datheon.com/fr/servicios',
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
  const l = (lang in metaByLang ? lang : 'es') as Lang
  return <ServiciosClient lang={l} />
}