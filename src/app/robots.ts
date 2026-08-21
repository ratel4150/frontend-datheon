// File: src/app/robots.ts

import type { MetadataRoute } from 'next'

const SITE_URL = 'https://datheon.io'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/private/',
          '/sign-in/',
          '/sign-up/',
        ],
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

