// File: frontend-datheon/src/app/layout.tsx
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { poppins } from '@/theme/fonts'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://datheon.com'),
  title: {
    default: 'Datheón — AI SaaS, Agentes y Desarrollo Tech',
    template: '%s | Datheón',
  },
   icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  description: 'Consultora tecnológica especializada en AI SaaS, agentes autónomos, desarrollo web, IoT y Cloud. Transformamos tu empresa con tecnología real.',
  keywords: ['AI SaaS', 'agentes autónomos', 'desarrollo web', 'IoT', 'FastAPI', 'Next.js', 'consultora tech'],
  authors: [{ name: 'Datheón', url: 'https://datheon.com' }],
  creator: 'Datheón',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    siteName: 'Datheón',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Datheón' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@datheon',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}