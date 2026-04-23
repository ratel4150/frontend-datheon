'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {"badge":"Planificación de Arquitectura de Soluciones","breadcrumb":{"home":"Inicio","services":"Servicios","current":"Planificación de Arquitectura de Soluciones"},"hero":{"title":"Desbloquea el Poder de tu Negocio","titleAccent":"con una Arquitectura de Soluciones Personalizada","subtitle":"Nuestros expertos en planificación de arquitectura de soluciones te ayudan a crear un plan de acción personalizado para impulsar tu negocio hacia el éxito","cta":"Comienza Ahora","ctaSub":"Descubre cómo podemos ayudarte a alcanzar tus objetivos empresariales"},"social":"Síguenos en las redes sociales para obtener las últimas noticias y actualizaciones","includes":{"title":"¿Qué Incluye Nuestro Servicio de Planificación de Arquitectura de Soluciones?","items":[{"icon":"📈","title":"Análisis de Negocio","desc":"Análisis detallado de tus necesidades y objetivos empresariales"},{"icon":"📊","title":"Diseño de Arquitectura","desc":"Creación de un plan de arquitectura de soluciones personalizado para tu negocio"},{"icon":"💻","title":"Implementación de Tecnologías","desc":"Implementación de tecnologías y soluciones personalizadas para tu negocio"}]},"useCases":{"title":"Casos de Uso Comunes","items":[{"icon":"🏢","profile":"Empresas de Tecnología","pain":"Dificultades para escalar y mantener la infraestructura","solution":"Planificación de arquitectura de soluciones personalizada","result":"Mejora en la eficiencia y reducción de costos"},{"icon":"📊","profile":"Empresas de Finanzas","pain":"Dificultades para gestionar y analizar grandes cantidades de datos","solution":"Implementación de soluciones de análisis de datos personalizadas","result":"Mejora en la toma de decisiones y aumento de la competitividad"}]},"results":{"title":"Resultados que Puedes Esperar","items":[{"value":"25%","label":"Reducción de Costos","sub":"Mediante la optimización de la infraestructura y la implementación de tecnologías eficientes"},{"value":"50%","label":"Mejora en la Eficiencia","sub":"Mediante la automatización de procesos y la implementación de soluciones personalizadas"}]},"pricing":{"title":"Nuestros Paquetes de Precios","subtitle":"Personalizados para satisfacer tus necesidades empresariales","tiers":[{"name":"Básico","tagline":"Ideal para pequeñas empresas","price":"$1,000","range":"Hasta 10 usuarios","time":"1 mes","color":"#007bff","featured":false,"features":["Análisis de negocio","Diseño de arquitectura"],"cta":"Comprar Ahora"},{"name":"Avanzado","tagline":"Ideal para medianas empresas","price":"$5,000","range":"Hasta 50 usuarios","time":"3 meses","color":"#17a2b8","featured":true,"features":["Análisis de negocio","Diseño de arquitectura","Implementación de tecnologías"],"cta":"Comprar Ahora"}]},"faq":{"title":"Preguntas Frecuentes","items":[{"q":"¿Cuánto tiempo dura el proceso de planificación de arquitectura de soluciones?","a":"El proceso puede durar desde unas pocas semanas hasta varios meses, dependiendo de la complejidad del proyecto"},{"q":"¿Qué tipo de soporte ofrecen después de la implementación?","a":"Ofrecemos soporte técnico y mantenimiento continuo para asegurarnos de que su negocio siga funcionando sin problemas"}]},"form":{"title":"Obtenga un Presupuesto Personalizado","subtitle":"Llene el formulario a continuación para obtener un presupuesto personalizado para su negocio","name":"Nombre","email":"Correo Electrónico","company":"Nombre de la Empresa","useCase":"Casos de Uso","submit":"Enviar","loading":"Cargando...","success":"¡Gracias por enviar su solicitud! Nos pondremos en contacto con usted pronto"},"finalCta":{"title":"¿Estás Listo para Desbloquear el Poder de su Negocio?","subtitle":"Nuestros expertos en planificación de arquitectura de soluciones están aquí para ayudarlo","cta":"Comienza Ahora","note":"No pierda más tiempo, comience a crecer su negocio hoy mismo"},"sticky":"¿Necesita ayuda? ¡Contáctenos!"},
  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'solution-architecture-planning',
    icon: <span style={{ fontSize: '12px' }}>☁️</span>,
  }
  return <ServicePageTemplate t={t} />
}
