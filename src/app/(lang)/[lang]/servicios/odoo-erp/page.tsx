// File: frontend-datheon/src/app/(lang)/[lang]/servicios/odoo-erp/page.tsx
import type { Metadata } from 'next'
import { ServicePageContent } from './Servicepagecontent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Datheón · Servicio',
    alternates: {
      canonical: `https://datheon.com/${lang}/servicios/odoo-erp`,
      languages: {
        es: 'https://datheon.com/es/servicios/odoo-erp',
        en: 'https://datheon.com/en/servicios/odoo-erp',
        fr: 'https://datheon.com/fr/servicios/odoo-erp',
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}