// src\app\layout.tsx
'use client'

import type { ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { poppins } from '@/theme/fonts'
import { theme } from '@/theme/theme'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
