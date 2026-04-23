'use client'

import type { ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { theme } from '@/theme/theme'
import dynamic from 'next/dynamic'

const CookieConsentBanner = dynamic(
  () => import('../../components/landing/CookieConsentBanner'),
  { ssr: false }
)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CookieConsentBanner />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}