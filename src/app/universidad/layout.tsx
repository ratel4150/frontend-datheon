// File: frontend-datheon/src/app/universidad/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import type { ReactNode } from 'react'

export default function UniversidadLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}