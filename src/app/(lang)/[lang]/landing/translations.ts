// src\app\(lang)\[lang]\landing\translations.ts
export type Lang = 'es' | 'en' | 'fr'

export const translations: Record<Lang, { title: string; welcome: string }> = {
  es: {
    title: 'Landing - idioma: Español',
    welcome: 'Bienvenido a nuestra landing',
  },
  en: {
    title: 'Landing - Language: English',
    welcome: 'Welcome to our landing',
  },
  fr: {
    title: 'Landing - Langue : Français',
    welcome: 'Bienvenue sur notre landing',
  },
}

export async function getTranslations(lang: string) {
  if (['es', 'en', 'fr'].includes(lang)) {
    return translations[lang as Lang]
  }
  return translations['es'] // fallback
}
