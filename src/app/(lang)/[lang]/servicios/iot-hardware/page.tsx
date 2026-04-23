// File: frontend-datheon/src/app/(lang)/[lang]/servicios/iot-hardware/page.tsx
import type { Metadata } from 'next'
import { ServicePageContent } from './Servicepagecontent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Datheón · Servicio',
    alternates: {
      canonical: `https://datheon.com/${lang}/servicios/iot-hardware`,
      languages: {
        es: 'https://datheon.com/es/servicios/iot-hardware',
        en: 'https://datheon.com/en/servicios/iot-hardware',
        fr: 'https://datheon.com/fr/servicios/iot-hardware',
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}