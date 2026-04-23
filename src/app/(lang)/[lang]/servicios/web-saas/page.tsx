// File: frontend-datheon/src/app/(lang)/[lang]/servicios/web-saas/Page.tsx
import type { Metadata } from 'next'
import { ServicePageContent } from './Servicepagecontent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

const metaByLang: Record<Lang, { title: string; description: string }> = {
  es: { title: 'Desarrollo Web y SaaS | Datheón', description: 'Desarrollamos plataformas web y SaaS escalables. Desde landing pages hasta aplicaciones completas con pagos y autenticación.' },
  en: { title: 'Web & SaaS Development | Datheón', description: 'We build scalable web platforms and SaaS with Next.js, FastAPI and Stripe.' },
  fr: { title: 'Développement Web & SaaS | Datheón', description: 'Nous développons des plateformes web et SaaS évolutives avec Next.js, FastAPI et Stripe.' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l = (lang in metaByLang ? lang : 'es') as Lang
  const m = metaByLang[l]
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://datheon.com/${l}/servicios/web-saas`,
      languages: {
        es: 'https://datheon.com/es/servicios/web-saas',
        en: 'https://datheon.com/en/servicios/web-saas',
        fr: 'https://datheon.com/fr/servicios/web-saas',
      },
    },
    openGraph: {
      title: m.title, description: m.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}