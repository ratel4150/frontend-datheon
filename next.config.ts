// File: frontend-datheon/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
    experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // ✅ NO uses appDir ni i18n aquí
}

export default nextConfig
