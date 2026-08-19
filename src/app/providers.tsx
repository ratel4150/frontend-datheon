'use client'

import type { ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { theme } from '@datheon/shared/ui/theme'
import dynamic from 'next/dynamic'

const CookieConsentBanner = dynamic(
  () => import('@datheon/features/cookie-consent').then(m => m.CookieConsentBanner),
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