'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {"badge":"Eficiencia Operativa","breadcrumb":{"home":"Inicio","services":"Servicios","current":"Sistemas de Eficiencia Operativa"},"hero":{"title":"Optimiza tus procesos","titleAccent":"con nuestros sistemas","subtitle":"Mejora la eficiencia y reducción de costos con nuestra tecnología de vanguardia","cta":"Descubre cómo","ctaSub":"Obtén una consultoría personalizada"},"social":"Conéctate con nosotros en las redes sociales","includes":{"title":"¿Qué incluye nuestro sistema?","items":[{"icon":"💻","title":"Análisis de procesos","desc":"Identificamos áreas de mejora en tus operaciones"},{"icon":"📊","title":"Optimización de costos","desc":"Reducimos gastos innecesarios y mejoramos la rentabilidad"},{"icon":"📈","title":"Mejora de la productividad","desc":"Incrementamos la eficiencia y la producción de tu empresa"}]},"useCases":{"title":"Casos de uso","items":[{"icon":"🏢","profile":"Empresas de manufactura","pain":"Ineficiencia en la producción","solution":"Implementación de sistemas de gestión de producción","result":"Aumento de la productividad y reducción de costos"},{"icon":"🚚","profile":"Empresas de logística","pain":"Demoras en la entrega de pedidos","solution":"Optimización de rutas y horarios de entrega","result":"Mejora en la satisfacción del cliente y reducción de costos de transporte"}]},"results":{"title":"Resultados","items":[{"value":"25%","label":"Reducción de costos","sub":"Medido en comparación con el año anterior"},{"value":"30%","label":"Aumento de la productividad","sub":"Medido en términos de producción por hora"},{"value":"95%","label":"Satisfacción del cliente","sub":"Medido a través de encuestas y comentarios"}]},"pricing":{"title":"Precios","subtitle":"Elige el plan que mejor se adapte a tus necesidades","tiers":[{"name":"Básico","tagline":"Ideal para pequeñas empresas","price":"$500","range":"Hasta 10 usuarios","time":"Mensual","color":"#3498db","featured":false,"features":["Análisis de procesos","Optimización de costos"],"cta":"Contratar"},{"name":"Avanzado","tagline":"Ideal para medianas empresas","price":"$1,500","range":"Hasta 50 usuarios","time":"Mensual","color":"#2ecc71","featured":true,"features":["Análisis de procesos","Optimización de costos","Mejora de la productividad"],"cta":"Contratar"}]},"faq":{"title":"Preguntas frecuentes","items":[{"q":"¿Cuál es el tiempo de implementación?","a":"El tiempo de implementación varía según la complejidad del proyecto, pero generalmente toma entre 2-6 semanas"},{"q":"¿Ofrecen soporte técnico?","a":"Sí, ofrecemos soporte técnico 24/7 a través de correo electrónico, teléfono y chat en línea"}]},"form":{"title":"Obtén una consultoría personalizada","subtitle":"Llena el formulario para que podamos contactarte","name":"Nombre","email":"Correo electrónico","company":"Nombre de la empresa","useCase":"Casos de uso","submit":"Enviar","loading":"Enviando...","success":"Formulario enviado con éxito"},"finalCta":{"title":"¿Estás listo para mejorar la eficiencia de tu empresa?","subtitle":"Contáctanos para obtener más información","cta":"Obtén una consultoría","note":"No te pierdas la oportunidad de llevar tu empresa al siguiente nivel"},"sticky":"Solicita una demostración gratuita"},
  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'operational-efficiency-systems',
    icon: <span style={{ fontSize: '12px' }}>☁️</span>,
  }
  return <ServicePageTemplate t={t} />
}
