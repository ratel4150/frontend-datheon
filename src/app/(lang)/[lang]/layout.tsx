// File: frontend-datheon/src/app/(lang)/[lang]/layout.tsx
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { AppBarMain } from '../components/AppBarMain'
import { ChatWidget } from '../components/ChatWidget'


type Props = {
  children: ReactNode
  params: Promise<{ lang: string }>
}

const metaByLang: Record<string, { title: string; description: string; locale: string }> = {
  es: {
    title: 'Datheón — AI SaaS, Agentes Autónomos y Desarrollo Tech',
    description: 'Consultora tecnológica en México especializada en AI SaaS, agentes autónomos, desarrollo web, IoT y Cloud. Primera consulta gratis.',
    locale: 'es_MX',
  },
  en: {
    title: 'Datheón — AI SaaS, Autonomous Agents & Tech Development',
    description: 'Tech consultancy specialized in AI SaaS, autonomous agents, web development, IoT and Cloud. First consultation free.',
    locale: 'en_US',
  },
  fr: {
    title: 'Datheón — IA SaaS, Agents Autonomes & Développement Tech',
    description: 'Cabinet de conseil technologique spécialisé en IA SaaS, agents autonomes, développement web, IoT et Cloud. Première consultation gratuite.',
    locale: 'fr_FR',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const meta = metaByLang[lang] ?? metaByLang['es']

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://datheon.com/${lang}`,
      languages: {
        'es': 'https://datheon.com/es',
        'en': 'https://datheon.com/en',
        'fr': 'https://datheon.com/fr',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://datheon.com/${lang}`,
      locale: meta.locale,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Datheón' }],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  return (
    <>
      <AppBarMain currentLang={lang} />
      <main>{children}</main>
      <ChatWidget lang={lang} />
    </>
  )
}