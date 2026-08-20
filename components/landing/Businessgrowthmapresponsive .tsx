// File: components/landing/Businessgrowthmapresponsive .tsx
// File: frontend-datheon/components/landing/BusinessGrowthMapResponsive.tsx
'use client'

import dynamic from 'next/dynamic'
import { useMediaQuery, useTheme } from '@mui/material'

const BusinessGrowthMap = dynamic(
  () => import('./Businessgrowthmap').then((m) => m.BusinessGrowthMap),
  { ssr: false }
)
const BusinessGrowthMapMobile = dynamic(
  () => import('./Businessgrowthmapmobile').then((m) => m.BusinessGrowthMapMobile),
  { ssr: false }
)

type Props = { lang: string }

export function BusinessGrowthMapResponsive({ lang }: Props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
  return isMobile ? <BusinessGrowthMapMobile lang={lang} /> : <BusinessGrowthMap lang={lang} />
}