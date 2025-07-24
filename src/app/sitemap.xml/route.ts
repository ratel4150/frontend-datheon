// src\app\sitemap.xml\route.ts
import { NextResponse } from 'next/server'

// Idiomas soportados
const locales = ['es', 'en', 'fr'] as const

// Páginas estáticas (relativas, sin slash inicial)
const staticPages = [
  '',               // => /
  'landing',        // => /landing
  'soluciones',     // => /soluciones
  'contacto',       // => /contacto
  'sobre-nosotros', // => /sobre-nosotros
]

export function GET() {
  const baseUrl = 'https://datheon.com'
  const lastmod = new Date().toISOString()

  const urls = staticPages.flatMap((page) =>
    locales.map((locale) => {
      const loc = `${baseUrl}/${locale}/${page}`.replace(/\/+$/, '')
      const priority = page === '' ? '1.0' : '0.8'
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
  ).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`.trim()

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
