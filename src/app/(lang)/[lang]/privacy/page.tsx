// File: frontend-datheon/src/app/(lang)/[lang]/privacy/page.tsx
import type { Metadata } from 'next'
import { PrivacyClient } from './PrivacyClient'

type Props = { params: Promise<{ lang: string }> }

const metaByLang = {
  es: { title: 'Aviso de Privacidad | Datheón', description: 'Política de privacidad de Datheón. Conoce cómo recopilamos, usamos y protegemos tu información personal.' },
  en: { title: 'Privacy Policy | Datheón', description: 'Datheón privacy policy. Learn how we collect, use and protect your personal information.' },
  fr: { title: 'Politique de Confidentialité | Datheón', description: 'Politique de confidentialité de Datheón. Découvrez comment nous collectons, utilisons et protégeons vos informations personnelles.' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l = (lang in metaByLang ? lang : 'es') as keyof typeof metaByLang
  const m = metaByLang[l]
  return {
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://datheon.com/${l}/privacy`,
      languages: { es: 'https://datheon.com/es/privacy', en: 'https://datheon.com/en/privacy', fr: 'https://datheon.com/fr/privacy' },
    },
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es')
  return <PrivacyClient lang={l}/>
}