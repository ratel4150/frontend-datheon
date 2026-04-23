'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {"badge":"Optimiza tus procesos","breadcrumb":{"home":"Inicio","services":"Servicios","current":"Reingeniería de Flujo de Trabajo"},"hero":{"title":"Revitaliza tu negocio","titleAccent":"con nuestra Reingeniería de Flujo de Trabajo","subtitle":"Mejora la eficiencia y reduce costos con nuestros expertos","cta":"Comienza tu transformación","ctaSub":"Descubre cómo podemos ayudarte a optimizar tus procesos"},"social":"Síguenos en las redes sociales para las últimas noticias y consejos","includes":{"title":"¿Qué incluye nuestro servicio de Reingeniería de Flujo de Trabajo?","items":[{"icon":"📈","title":"Análisis de procesos","desc":"Identificamos áreas de mejora en tus procesos actuales"},{"icon":"🔍","title":"Diseño de procesos","desc":"Creamos flujos de trabajo personalizados para tu negocio"},{"icon":"📊","title":"Implementación y seguimiento","desc":"Ayudamos a implementar y monitorear tus nuevos procesos"}]},"useCases":{"title":"Casos de uso comunes","items":[{"icon":"🏢","profile":"Empresas de manufactura","pain":"Ineficiencias en la producción","solution":"Reingeniería de flujo de trabajo para optimizar la producción","result":"Aumento de la productividad y reducción de costos"},{"icon":"📊","profile":"Empresas de servicios","pain":"Demoras en la atención al cliente","solution":"Reingeniería de flujo de trabajo para mejorar la atención al cliente","result":"Mejora en la satisfacción del cliente y aumento de la lealtad"}]},"results":{"title":"Resultados que puedes esperar","items":[{"value":"25%","label":"Aumento de la productividad","sub":"Medido en comparación con procesos anteriores"},{"value":"30%","label":"Reducción de costos","sub":"Medido en comparación con gastos anteriores"},{"value":"95%","label":"Satisfacción del cliente","sub":"Medido a través de encuestas y retroalimentación"}]},"pricing":{"title":"Nuestros planes de precios","subtitle":"Personalizados para tu negocio","tiers":[{"name":"Básico","tagline":"Ideal para pequeñas empresas","price":"$1,000","range":"Hasta 10 empleados","time":"1 mes","color":"#007bff","featured":false,"features":["Análisis de procesos","Diseño de procesos"],"cta":"Contratar"},{"name":"Avanzado","tagline":"Ideal para medianas empresas","price":"$5,000","range":"Hasta 50 empleados","time":"3 meses","color":"#6610f2","featured":true,"features":["Análisis de procesos","Diseño de procesos","Implementación y seguimiento"],"cta":"Contratar"}]},"faq":{"title":"Preguntas frecuentes","items":[{"q":"¿Cuánto tiempo tarda el proceso de reingeniería?","a":"El tiempo varía según la complejidad del proyecto, pero generalmente se completa en 1-3 meses"},{"q":"¿Qué tipo de apoyo ofrecen después de la implementación?","a":"Ofrecemos soporte continuo y capacitación para asegurarnos de que tu equipo esté completamente preparado"}]},"form":{"title":"¿Estás listo para comenzar?","subtitle":"Completa el formulario para obtener más información","name":"Nombre","email":"Correo electrónico","company":"Nombre de la empresa","useCase":"Caso de uso","submit":"Enviar","loading":"Enviando...","success":"Gracias por contactarnos. Nos pondremos en contacto contigo pronto"},"finalCta":{"title":"No esperes más para transformar tu negocio","subtitle":"Contáctanos hoy mismo para comenzar tu camino hacia la eficiencia","cta":"Comienza tu transformación","note":"Estamos aquí para ayudarte en cada paso del camino"},"sticky":"Reingeniería de Flujo de Trabajo para una mayor eficiencia"},
  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'workflow-reengineering',
    icon: <span style={{ fontSize: '12px' }}>☁️</span>,
  }
  return <ServicePageTemplate t={t} />
}
