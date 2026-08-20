// File: frontend-datheon/components/landing/HeroResponsive.tsx
'use client'

import dynamic from 'next/dynamic'
import { useMediaQuery, useTheme } from '@mui/material'

// Carga diferida — así el bundle de React Flow (usado solo por el
// Hero de escritorio) nunca se descarga en un dispositivo móvil, y
// viceversa. ssr:false evita que Next intente decidir el layout en
// el servidor, donde no sabemos el ancho real del dispositivo.
const Hero = dynamic(() => import('./Hero').then((m) => m.Hero), { ssr: false })
const HeroMobile = dynamic(() => import('./HeroMobile').then((m) => m.HeroMobile), { ssr: false })

type Props = { lang: string }

export function HeroResponsive({ lang }: Props) {
  const theme = useTheme()
  // noSsr: true → en el primer render del cliente asume escritorio
  // (false) y corrige en cuanto puede medir el viewport real. Es el
  // mismo trade-off de cualquier detección de breakpoint en JS: un
  // posible reflow de un frame en móvil, a cambio de no enviarle a
  // ese usuario código que no necesita.
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })

  return isMobile ? <HeroMobile lang={lang} /> : <Hero lang={lang} />
}