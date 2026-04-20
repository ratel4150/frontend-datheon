// File: frontend-datheon/src/app/(lang)/[lang]/servicios/agentes-autonomos/page.tsx
// Server Component — NO 'use client'
// Solo maneja SEO: generateMetadata + JSON-LD schemas
// El componente interactivo está en AgentesClient.tsx

import type { Metadata } from 'next'
import { AgentesClient } from './AgentesClient'

type Props = { params: Promise<{ lang: string }> }

// ─── SEO metadata por idioma ──────────────────────────────────
const metaByLang = {
  es: {
    title: 'Agentes Autónomos con IA para Empresas | Datheón',
    description: 'Automatiza tu negocio con agentes IA que responden clientes 24/7, califican leads automáticamente y gestionan flujos completos. Primera consulta gratis. Resultados en 4–6 semanas.',
    keywords: [
      'agentes autónomos IA',
      'automatización con inteligencia artificial',
      'chatbot empresarial inteligente',
      'automatizar atención al cliente IA',
      'desarrollo agentes IA México',
      'RAG empresarial',
      'automatización de ventas IA',
      'agente IA para negocios',
    ],
  },
  en: {
    title: 'Autonomous AI Agents for Business | Datheón',
    description: 'Automate your business with AI agents that respond to clients 24/7, qualify leads automatically and manage complete workflows. Free first consultation. Results in 4–6 weeks.',
    keywords: [
      'autonomous AI agents',
      'business AI automation',
      'intelligent chatbot for business',
      'AI customer support automation',
      'RAG system development',
      'AI sales automation',
      'AI agent development',
    ],
  },
  fr: {
    title: 'Agents IA Autonomes pour Entreprises | Datheón',
    description: "Automatisez votre entreprise avec des agents IA qui répondent aux clients 24h/24, qualifient les leads automatiquement. Première consultation gratuite. Résultats en 4–6 semaines.",
    keywords: [
      'agents IA autonomes',
      'automatisation intelligence artificielle',
      'chatbot intelligent entreprise',
      'automatisation support client IA',
    ],
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const l = (lang in metaByLang ? lang : 'es') as keyof typeof metaByLang
  const m = metaByLang[l]

  return {
    title: m.title,
    description: m.description,
    keywords: [...m.keywords],
    alternates: {
      canonical: `https://datheon.com/${l}/servicios/agentes-autonomos`,
      languages: {
        es: 'https://datheon.com/es/servicios/agentes-autonomos',
        en: 'https://datheon.com/en/servicios/agentes-autonomos',
        fr: 'https://datheon.com/fr/servicios/agentes-autonomos',
        'x-default': 'https://datheon.com/es/servicios/agentes-autonomos',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Datheón',
      title: m.title,
      description: m.description,
      url: `https://datheon.com/${l}/servicios/agentes-autonomos`,
      images: [{ url: '/og/agentes-autonomos.png', width: 1200, height: 630, alt: 'Agentes Autónomos con IA — Datheón' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/og/agentes-autonomos.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
  }
}

// ─── JSON-LD Schemas (server-side, sin hydration issues) ──────
function AgentesSchemas({ lang }: { lang: string }) {
  const isEs = lang !== 'en' && lang !== 'fr'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEs ? 'Agentes Autónomos con IA' : 'Autonomous AI Agents',
    description: isEs
      ? 'Sistemas de IA que ejecutan tareas complejas de forma autónoma: atención al cliente 24/7, calificación de leads, automatización de flujos y reportes automáticos.'
      : 'AI systems that execute complex tasks autonomously: 24/7 customer service, lead qualification, workflow automation and automatic reports.',
    provider: {
      '@type': 'Organization',
      name: 'Datheón',
      url: 'https://datheon.com',
      logo: 'https://datheon.com/favicon-512.png',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hola@datheon.com',
        contactType: 'sales',
        availableLanguage: ['Spanish', 'English', 'French'],
      },
    },
    areaServed: 'Worldwide',
    offers: [
      { '@type': 'Offer', name: 'Starter', price: '8000', priceCurrency: 'USD',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: '8000', maxPrice: '15000', priceCurrency: 'USD' } },
      { '@type': 'Offer', name: 'Growth', price: '15000', priceCurrency: 'USD',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: '15000', maxPrice: '35000', priceCurrency: 'USD' } },
      { '@type': 'Offer', name: 'Enterprise', price: '35000', priceCurrency: 'USD' },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: isEs
      ? [
          { '@type': 'Question', name: '¿Cuánto tiempo tarda en estar listo el agente IA?',
            acceptedAnswer: { '@type': 'Answer', text: 'El plan Starter puede estar en producción en 4–6 semanas. Incluye descubrimiento, entrenamiento con tu documentación, integración con tus sistemas y pruebas completas.' } },
          { '@type': 'Question', name: '¿El agente IA puede conectarse con mi CRM o ERP actual?',
            acceptedAnswer: { '@type': 'Answer', text: 'Sí. Nos integramos con Salesforce, HubSpot, Odoo, SAP y cualquier sistema con API REST. Si no tiene API, usamos automatización RPA.' } },
          { '@type': 'Question', name: '¿Qué pasa si el agente no sabe responder algo?',
            acceptedAnswer: { '@type': 'Answer', text: 'El agente escala a un humano de tu equipo con todo el historial de la conversación incluido. Nunca un cliente queda sin respuesta.' } },
          { '@type': 'Question', name: '¿Mis datos están seguros con el agente IA?',
            acceptedAnswer: { '@type': 'Answer', text: 'Sí. Los embeddings y documentos se guardan en tu propia base de datos. Nunca usamos tus datos para entrenar modelos de terceros.' } },
          { '@type': 'Question', name: '¿Cuánto cuesta un agente autónomo con IA?',
            acceptedAnswer: { '@type': 'Answer', text: 'Los precios van desde $8,000 USD (Starter) hasta $35,000+ USD (Enterprise). El precio exacto depende de la complejidad, integraciones y volumen.' } },
        ]
      : [
          { '@type': 'Question', name: 'How long does it take to deploy an AI agent?',
            acceptedAnswer: { '@type': 'Answer', text: 'The Starter plan can be in production in 4–6 weeks, including discovery, training, integration and testing.' } },
          { '@type': 'Question', name: 'Can the AI agent connect with my current CRM or ERP?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. We integrate with Salesforce, HubSpot, Odoo, SAP and any system with a REST API. If no API exists, we use RPA automation.' } },
          { '@type': 'Question', name: 'How much does an autonomous AI agent cost?',
            acceptedAnswer: { '@type': 'Answer', text: 'Prices range from $8,000 USD (Starter) to $35,000+ USD (Enterprise). The exact price depends on workflow complexity, integrations and volume.' } },
        ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Datheón', item: 'https://datheon.com' },
      { '@type': 'ListItem', position: 2, name: isEs ? 'Servicios' : 'Services', item: `https://datheon.com/${lang}/servicios` },
      { '@type': 'ListItem', position: 3, name: isEs ? 'Agentes Autónomos con IA' : 'Autonomous AI Agents', item: `https://datheon.com/${lang}/servicios/agentes-autonomos` },
    ],
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Datheón',
    url: 'https://datheon.com',
    logo: 'https://datheon.com/favicon-512.png',
    foundingDate: '2023',
    contactPoint: { '@type': 'ContactPoint', email: 'hola@datheon.com', contactType: 'customer service' },
    sameAs: ['https://linkedin.com/company/datheon', 'https://github.com/datheon', 'https://x.com/datheon'],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '17', bestRating: '5' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}/>
    </>
  )
}

// ─── Page — Server Component ──────────────────────────────────
export default async function AgentesAutonomosPage({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es')

  return (
    <>
      <AgentesSchemas lang={l}/>
      <AgentesClient lang={l}/>
    </>
  )
}