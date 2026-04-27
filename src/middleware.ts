// File: frontend-datheon/src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const locales = ['es', 'en', 'fr']
const defaultLocale = 'es'

const localizedSlugs: Record<string, Record<string, string>> = {
  es: {
    'nosotros': 'nosotros', 'contacto': 'contact', 'privacidad': 'privacy',
    'servicios': 'servicios', 'sectores': 'sectores',
    'landing': 'landing',
  },
  en: {
    'about': 'nosotros', 'contact': 'contact', 'privacy': 'privacy',
    'services': 'servicios', 'sectors': 'sectores',
    'landing': 'landing',
  },
  fr: {
    'a-propos': 'nosotros', 'contact': 'contact', 'confidentialite': 'privacy',
    'services': 'servicios', 'secteurs': 'sectores',
    'landing': 'landing',
  },
}

const internalToSlug: Record<string, Record<string, string>> = {
  nosotros:    { es: 'nosotros',    en: 'about',           fr: 'a-propos'        },
  contact:     { es: 'contacto',    en: 'contact',         fr: 'contact'         },
  privacy:     { es: 'privacidad',  en: 'privacy',         fr: 'confidentialite' },
  servicios:   { es: 'servicios',   en: 'services',        fr: 'services'        },
  sectores:    { es: 'sectores',    en: 'sectors',         fr: 'secteurs'        },
  landing:     { es: 'landing',     en: 'landing',         fr: 'landing'         },
}

const isProtected = createRouteMatcher([
  '/universidad',
  '/universidad/((?!login|registro).*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/_next') || pathname.startsWith('/api') ||
    pathname.startsWith('/universidad') || pathname.startsWith('/certificado') ||
    pathname.startsWith('/videos') || pathname.startsWith('/og/') ||
    pathname === '/favicon.ico' || pathname === '/manifest.json' ||
    pathname === '/robots.txt' || pathname === '/sitemap.xml' ||
    /\.(png|jpg|jpeg|svg|ico|webp|gif|woff|woff2|ttf)$/.test(pathname) ||
    locales.some(loc => pathname === `/${loc}/robots.txt` || pathname === `/${loc}/sitemap.xml`)
  ) return NextResponse.next()

  // /certificado es publico, /universidad requiere auth
  if (isProtected(req)) await auth.protect()

  if (pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}/landing`
    return NextResponse.redirect(url)
  }

  const hasLocale = locales.some(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

  if (hasLocale) {
    const segments = pathname.split('/').filter(Boolean)
    const lang = segments[0]
    const slug = segments[1]
    if (slug && localizedSlugs[lang]?.[slug]) {
      const internal = localizedSlugs[lang][slug]
      if (internal !== slug) {
        const url = req.nextUrl.clone()
        const remaining = segments.slice(2).join('/')
        url.pathname = `/${lang}/${internal}${remaining ? `/${remaining}` : ''}`
        return NextResponse.rewrite(url)
      }
    }
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && internalToSlug[firstSegment]) {
    const slug = internalToSlug[firstSegment][defaultLocale]
    const url = req.nextUrl.clone()
    const remaining = segments.slice(1).join('/')
    url.pathname = `/${defaultLocale}/${slug}${remaining ? `/${remaining}` : ''}`
    return NextResponse.redirect(url)
  }

  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
})

export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml|manifest.json|og).*)'],
}