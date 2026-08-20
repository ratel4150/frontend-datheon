// File: components/landing/SystemArchitectureResponsive.tsx
// File: frontend-datheon/components/landing/SystemArchitectureResponsive.tsx
'use client'

import dynamic from 'next/dynamic'
import { useMediaQuery, useTheme } from '@mui/material'

const SystemArchitecture = dynamic(
  () => import('./Systemarchitecture').then((m) => m.SystemArchitecture),
  { ssr: false }
)
const SystemArchitectureMobile = dynamic(
  () => import('./SystemArchitectureMobile').then((m) => m.SystemArchitectureMobile),
  { ssr: false }
)

type Props = { lang: string }

export function SystemArchitectureResponsive({ lang }: Props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
  return isMobile ? <SystemArchitectureMobile lang={lang} /> : <SystemArchitecture lang={lang} />
}