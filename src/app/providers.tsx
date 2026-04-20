'use client'

import type { ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const CookieConsentBanner = dynamic(
  () => import('../../components/landing/CookieConsentBanner'),
  { ssr: false }
)

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {mounted && <CookieConsentBanner />}
      {children}
    </ThemeProvider>
  )
}