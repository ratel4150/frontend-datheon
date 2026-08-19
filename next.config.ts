// File: frontend-datheon/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@datheon/shared',
    '@datheon/entities',
    '@datheon/features',
    '@datheon/widgets',
  ],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // ✅ NO uses appDir ni i18n aquí
}

export default nextConfig
