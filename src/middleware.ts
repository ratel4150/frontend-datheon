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
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.json'
  ) {
    return NextResponse.next()
  }

  // Si ya tiene locale
  if (locales.some((loc) => pathname.startsWith(`/${loc}`))) {
    return NextResponse.next()
  }

  // Redirigir /landing → /es/landing
  if (pathname === '/landing') {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}/landing`
    return NextResponse.redirect(url)
  }

  // Redirigir / → /es/landing
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}/landing`
    return NextResponse.redirect(url)
  }

  // Por defecto: anteponer /es/
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/', '/landing', '/((?!_next|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)'],
}
