
import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { poppins } from '@/theme/fonts'
import { Providers } from './providers'
import { ClerkProvider } from '@clerk/nextjs'

const SITE_URL = 'https://datheon.io'
const SITE_NAME = 'Datheón'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      'Datheón | IA, Automatización y Software a Medida para Empresas',
    template: '%s | Datheón',
  },

  description:
    'Desarrollamos software a medida, automatización empresarial y soluciones de inteligencia artificial para empresas. Construimos SaaS, agentes de IA, integraciones y plataformas escalables.',

  applicationName: SITE_NAME,

  generator: 'Next.js',

  referrer: 'origin-when-cross-origin',

  keywords: [
    'software a medida',
    'desarrollo de software',
    'desarrollo de software empresarial',
    'automatización empresarial',
    'automatización de procesos',
    'inteligencia artificial para empresas',
    'IA para empresas',
    'agentes de inteligencia artificial',
    'agentes de IA',
    'AI SaaS',
    'desarrollo SaaS',
    'desarrollo de plataformas',
    'desarrollo web empresarial',
    'integraciones API',
    'integración de sistemas',
    'CRM personalizado',
    'ERP personalizado',
    'desarrollo de aplicaciones',
    'consultora tecnológica',
    'software empresarial',
    'transformación digital',
  ],

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  category: 'technology',

  classification: 'Software, Artificial Intelligence and Business Automation',

  alternates: {
    canonical: '/',
    languages: {
      'es-MX': '/',
      'en-US': '/en',
    },
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US'],
    url: SITE_URL,
    siteName: SITE_NAME,

    title:
      'Datheón | IA, Automatización y Software a Medida para Empresas',

    description:
      'Construimos software a medida, automatizaciones y soluciones de IA que ayudan a las empresas a operar mejor, reducir trabajo manual y escalar.',

    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt:
          'Datheón — Inteligencia Artificial, Automatización y Software a Medida',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'Datheón | IA, Automatización y Software a Medida',

    description:
      'Software a medida, inteligencia artificial y automatización empresarial para empresas que quieren crecer.',

    images: ['/og-image.png'],

    // Cambia esto por la cuenta real de Datheón.
    // No lo dejes si la cuenta no existe.
    // site: '@datheon',
    // creator: '@datheon',
  },

  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],

    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },

  manifest: '/manifest.webmanifest',

  // Solo agrega estos valores cuando tengas los códigos reales.
  // verification: {
  //   google: 'TU_GOOGLE_SEARCH_CONSOLE_CODE',
  //   other: {
  //     'msvalidate.01': 'TU_BING_VERIFICATION_CODE',
  //   },
  // },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es-MX" className={poppins.className}>
      <body>
        <ClerkProvider>
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}

