// File: frontend-datheon/src/app/(lang)/[lang]/servicios/enterprise-architecture-design/ServicePageContent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {"badge":"Diseño de Arquitectura Empresarial","breadcrumb":{"home":"Inicio","services":"Servicios","current":"Diseño de Arquitectura Empresarial"},"hero":{"title":"Transforma tu negocio con","titleAccent":"Arquitectura Empresarial","subtitle":"Optimiza tus procesos y aumenta la eficiencia con nuestro diseño de arquitectura empresarial","cta":"Descubre cómo","ctaSub":"Obtén una consulta gratuita"},"social":"Síguenos en las redes sociales para obtener las últimas noticias y actualizaciones","includes":{"title":"Nuestros servicios incluyen","items":[{"icon":"📈","title":"Análisis de procesos","desc":"Identificamos áreas de mejora en tus procesos actuales"},{"icon":"📊","title":"Diseño de arquitectura","desc":"Creamos una arquitectura empresarial personalizada para tu negocio"},{"icon":"📁","title":"Implementación y seguimiento","desc":"Implementamos y monitoreamos el progreso de tu arquitectura empresarial"}]},"useCases":{"title":"Casos de uso","items":[{"icon":"🏢","profile":"Empresas de tamaño mediano","pain":"Ineficiencia en los procesos","solution":"Diseño de arquitectura empresarial personalizada","result":"Aumento de la productividad y reducción de costos"},{"icon":"📈","profile":"Empresas en crecimiento","pain":"Dificultad para escalar","solution":"Análisis de procesos y diseño de arquitectura","result":"Mejora en la capacidad de escalabilidad y flexibilidad"}]},"results":{"title":"Resultados","items":[{"value":"25%","label":"Aumento de la productividad","sub":"Medido en comparación con la situación anterior"},{"value":"30%","label":"Reducción de costos","sub":"Medido en comparación con la situación anterior"}]},"pricing":{"title":"Precios","subtitle":"Nuestros planes de precios se adaptan a tus necesidades","tiers":[{"name":"Básico","tagline":"Ideal para pequeñas empresas","price":"$5,000","range":"Hasta 10 usuarios","time":"1 mes","color":"#3498db","featured":false,"features":["Análisis de procesos","Diseño de arquitectura"],"cta":"Comprar ahora"},{"name":"Avanzado","tagline":"Ideal para empresas de tamaño mediano","price":"$10,000","range":"Hasta 50 usuarios","time":"3 meses","color":"#f1c40f","featured":true,"features":["Análisis de procesos","Diseño de arquitectura","Implementación y seguimiento"],"cta":"Comprar ahora"}]},"faq":{"title":"Preguntas frecuentes","items":[{"q":"¿Cuánto tiempo dura el proceso de diseño de arquitectura empresarial?","a":"El tiempo de diseño varía dependiendo de la complejidad del proyecto, pero generalmente toma entre 1-3 meses"},{"q":"¿Qué tipo de soporte ofrece después de la implementación?","a":"Ofrecemos soporte técnico y seguimiento para asegurarnos de que tu arquitectura empresarial siga siendo efectiva"}]},"form":{"title":"Obtén una consulta gratuita","subtitle":"Completa el formulario para obtener más información","name":"Nombre","email":"Correo electrónico","company":"Nombre de la empresa","useCase":"Casos de uso","submit":"Enviar","loading":"Enviando...","success":"Consulta enviada con éxito"},"finalCta":{"title":"¿Estás listo para transformar tu negocio?","subtitle":"Contáctanos para obtener más información sobre nuestro diseño de arquitectura empresarial","cta":"Obtén una consulta gratuita","note":"No te pierdas la oportunidad de mejorar la eficiencia y productividad de tu negocio"},"sticky":"Diseño de Arquitectura Empresarial"},
  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'enterprise-architecture-design',
    icon: <span style={{ fontSize: '12px' }}>☁️</span>,
  }
  return <ServicePageTemplate t={t} />
}
