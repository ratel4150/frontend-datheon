// src\middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const locales = ['es', 'en', 'fr']
const defaultLocale = 'es'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar archivos públicos y APIs
  if (
  pathname.startsWith('/_next') ||
  pathname.startsWith('/api') ||
  pathname === '/favicon.ico' ||
  pathname === '/manifest.json' ||
  pathname === '/robots.txt' ||
  pathname === '/sitemap.xml' ||
  // Ignorar robots.txt y sitemap.xml dentro de idiomas
  locales.some((loc) => pathname === `/${loc}/robots.txt` || pathname === `/${loc}/sitemap.xml`)
) {
  return NextResponse.next()
}


  // Evitar que /landing pase sin idioma
  if (pathname === '/landing') {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}/landing`
    return NextResponse.redirect(url)
  }

  // Si ya tiene un locale, continuar
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (hasLocale) return NextResponse.next()

  // Redirigir raíz / al defaultLocale
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}/landing`
    return NextResponse.redirect(url)
  }

  // Si no tiene idioma ni es ruta válida, redirigir al idioma por defecto
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)'],
}
