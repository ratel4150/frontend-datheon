// src\app\layout.tsx
'use client'

import type { ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { poppins } from '@/theme/fonts'
import { theme } from '@/theme/theme'
import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'
export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {

     ReactPixel.init('1270008318053841') // ← ID de tu pixel
    ReactPixel.pageView() // ← trackea "PageView"
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'zsiqscript'
    script.defer = true
    script.innerHTML = `
      var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode:"siq47f05f818f0afe57e009eb6710ff838404cbc1d79270985759bb59f04a3b66c8", values:{},ready:function(){}};
    `
    document.body.appendChild(script)
    
    const secondScript = document.createElement('script')
    secondScript.src = 'https://salesiq.zoho.com/widget'
    secondScript.async = true
    document.body.appendChild(secondScript)

    return () => {
      document.body.removeChild(script)
      document.body.removeChild(secondScript)
    }
  }, [])

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