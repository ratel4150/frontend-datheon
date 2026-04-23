// File: frontend-datheon/src/app/(lang)/[lang]/landing/LandingContent.tsx
// src\app\(lang)\[lang]\landing\LandingContent.tsx
// src/app/(lang)/[lang]/landing/LandingContent.tsx
'use client'

import { Container, Typography } from '@mui/material'

export function LandingContent({ lang }: { lang: string }) {
  return (
    <Container>
      <Typography variant="h2">Landing - idioma: {lang}</Typography>
    </Container>
  )
}
