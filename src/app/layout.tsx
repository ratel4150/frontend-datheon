// src\app\layout.tsx
'use client'

import type { ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { poppins } from '@/theme/fonts'
import { theme } from '@/theme/theme'
import dynamic from 'next/dynamic'
/* import { ClientScripts } from '../../components/landing/ClientScripts' */
const ClientScripts = dynamic(() => import('../../components/landing/CookieConsentBanner'), { ssr: false })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
           <ClientScripts /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}