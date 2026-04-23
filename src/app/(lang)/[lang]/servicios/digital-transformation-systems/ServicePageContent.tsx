// File: frontend-datheon/src/app/(lang)/[lang]/servicios/digital-transformation-systems/ServicePageContent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {"badge":"Certificado","breadcrumb":{"home":"Inicio","services":"Servicios","current":"Transformación Digital"},"hero":{"title":"Impulsa tu negocio","titleAccent":"con tecnología","subtitle":"Transforma tu empresa con soluciones innovadoras y personalizadas","cta":"Descubre cómo","ctaSub":"Transforma tu negocio hoy mismo"},"social":"Síguenos en redes sociales","includes":{"title":"¿Qué incluye?","items":[{"icon":"💻","title":"Análisis de negocio","desc":"Identificamos áreas de mejora y oportunidades de crecimiento"},{"icon":"📊","title":"Desarrollo de estrategia","desc":"Creamos un plan personalizado para alcanzar tus objetivos"},{"icon":"🚀","title":"Implementación de soluciones","desc":"Ponemos en marcha las soluciones para transformar tu negocio"}]},"useCases":{"title":"Casos de uso","items":[{"icon":"📈","profile":"Emprendedor","pain":"Dificultades para escalar el negocio","solution":"Desarrollamos una estrategia de crecimiento personalizada","result":"Aumento de la productividad y el crecimiento"},{"icon":"📊","profile":"Gerente","pain":"Dificultades para tomar decisiones informadas","solution":"Implementamos un sistema de inteligencia de negocios","result":"Mejora en la toma de decisiones y reducción de costos"}]},"results":{"title":"Resultados","items":[{"value":"25%","label":"Aumento de productividad","sub":"Nuestros clientes han experimentado un aumento significativo en la productividad"},{"value":"30%","label":"Reducción de costos","sub":"Nuestros clientes han reducido sus costos gracias a nuestras soluciones"}]},"pricing":{"title":"Precios","subtitle":"Nuestros planes están diseñados para adaptarse a tus necesidades","tiers":[{"name":"Básico","tagline":"Ideal para pequeñas empresas","price":"$1,000","range":"Hasta 10 usuarios","time":"1 mes","color":"#3498db","featured":false,"features":["Análisis de negocio","Desarrollo de estrategia"],"cta":"Contratar"},{"name":"Avanzado","tagline":"Ideal para medianas empresas","price":"$5,000","range":"Hasta 50 usuarios","time":"3 meses","color":"#2ecc71","featured":true,"features":["Análisis de negocio","Desarrollo de estrategia","Implementación de soluciones"],"cta":"Contratar"}]},"faq":{"title":"Preguntas frecuentes","items":[{"q":"¿Cuánto tiempo dura el proceso de transformación digital?","a":"El proceso de transformación digital puede durar desde unos pocos meses hasta varios años, dependiendo de la complejidad del proyecto y las necesidades de la empresa"},{"q":"¿Cuál es el costo de la transformación digital?","a":"El costo de la transformación digital varía según el tamaño y la complejidad del proyecto, pero podemos ofrecerte un presupuesto personalizado según tus necesidades"}]},"form":{"title":"Contactanos","subtitle":"¿Estás listo para transformar tu negocio?","name":"Nombre","email":"Correo electrónico","company":"Empresa","useCase":"Casos de uso","submit":"Enviar","loading":"Enviando...","success":"¡Gracias por contactarnos!"},"finalCta":{"title":"¿Estás listo para comenzar?","subtitle":"Transforma tu negocio hoy mismo","cta":"Contactanos","note":"No te pierdas la oportunidad de impulsar tu negocio"},"sticky":"Transforma tu negocio con nosotros"},
  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'digital-transformation-systems',
    icon: <span style={{ fontSize: '12px' }}>☁️</span>,
  }
  return <ServicePageTemplate t={t} />
}
