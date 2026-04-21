import { NextRequest, NextResponse } from 'next/server'

const locales = ['es', 'en', 'fr']
const defaultLocale = 'es'

// Slug visible en URL por idioma → ruta interna (nombre de carpeta en [lang]/)
const localizedSlugs: Record<string, Record<string, string>> = {
  es: {
    'nosotros':    'nosotros',
    'contacto':    'contact',
    'privacidad':  'privacy',
    'servicios':   'servicios',
    'sectores':    'sectores',
    'universidad': 'universidad',
    'landing':     'landing',
  },
  en: {
    'about':       'nosotros',
    'contact':     'contact',
    'privacy':     'privacy',
    'services':    'servicios',
    'sectors':     'sectores',
    'university':  'universidad',
    'landing':     'landing',
  },
  fr: {
    'a-propos':        'nosotros',
    'contact':         'contact',
    'confidentialite': 'privacy',
    'services':        'servicios',
    'secteurs':        'sectores',
    'universite':      'universidad',
    'landing':         'landing',
  },
}

// Ruta interna → slug por idioma (para redirecciones sin locale)
const internalToSlug: Record<string, Record<string, string>> = {
  nosotros:    { es: 'nosotros',    en: 'about',           fr: 'a-propos'        },
  contact:     { es: 'contacto',    en: 'contact',         fr: 'contact'         },
  privacy:     { es: 'privacidad',  en: 'privacy',         fr: 'confidentialite' },
  servicios:   { es: 'servicios',   en: 'services',        fr: 'services'        },
  sectores:    { es: 'sectores',    en: 'sectors',         fr: 'secteurs'        },
  universidad: { es: 'universidad', en: 'university',      fr: 'universite'      },
  landing:     { es: 'landing',     en: 'landing',         fr: 'landing'         },
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar estáticos y APIs
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/videos') ||
    pathname.startsWith('/og/') ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.json' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\.(png|jpg|jpeg|svg|ico|webp|gif|woff|woff2|ttf)$/.test(pathname) ||
    locales.some(loc =>
      pathname === `/${loc}/robots.txt` || pathname === `/${loc}/sitemap.xml`
    )
  ) {
    return NextResponse.next()
  }

  // Raíz → landing en idioma por defecto
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}/landing`
    return NextResponse.redirect(url)
  }

  // Verificar si ya tiene locale
  const hasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (hasLocale) {
    const segments = pathname.split('/').filter(Boolean)
    const lang = segments[0]
    const slug = segments[1]

    if (slug && localizedSlugs[lang]?.[slug]) {
      const internal = localizedSlugs[lang][slug]

      if (internal !== slug) {
        // Reescribir internamente: /en/about → sirve /en/nosotros
        const url = request.nextUrl.clone()
        const remaining = segments.slice(2).join('/')
        url.pathname = `/${lang}/${internal}${remaining ? `/${remaining}` : ''}`
        return NextResponse.rewrite(url)
      }
    }

    return NextResponse.next()
  }

  // Sin locale: detectar ruta interna y redirigir con slug correcto
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && internalToSlug[firstSegment]) {
    const slug = internalToSlug[firstSegment][defaultLocale]
    const url = request.nextUrl.clone()
    const remaining = segments.slice(1).join('/')
    url.pathname = `/${defaultLocale}/${slug}${remaining ? `/${remaining}` : ''}`
    return NextResponse.redirect(url)
  }

  // Ruta desconocida sin locale → añadir locale por defecto
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml|manifest.json|og).*)'],
}