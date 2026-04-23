// File: frontend-datheon/src/app/(lang)/[lang]/servicios/ai-strategy-consulting/ServicePageContent.tsx
// File: frontend-datheon/src/app/(lang)/[lang]/servicios/apps-moviles/Servicepagecontent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
 es: {
  badge: 'Servicio Enterprise · Estrategia IA Corporativa',
  breadcrumb: { home: 'Inicio', services: 'Servicios', current: 'Consultoría Estratégica IA para Empresas' },
  hero: {
    title: 'Acelere su ventaja competitiva',
    titleAccent: 'con IA a escala empresarial.',
    subtitle: 'Diseñamos e implementamos la estrategia de IA que transforma su modelo operativo, optimiza costos estructurales y genera nuevas fuentes de ingresos. Gobernanza, cumplimiento y ROI garantizado.',
    cta: 'Solicitar diagnóstico ejecutivo',
    ctaSub: 'Ver modelo de trabajo'
  },
  social: 'El 85% de los proyectos IA en empresas fracasan por falta de alineación estratégica. Nosotros aseguramos el éxito.',
  includes: {
    title: 'Qué incluye el servicio Enterprise',
    items: [
      { icon: '🏛️', title: 'Diagnóstico de madurez IA', desc: 'Evaluación integral de capacidades actuales: datos, talento, tecnología, procesos y cultura. Benchmark frente a la industria.' },
      { icon: '🎯', title: 'Portafolio de casos de uso', desc: 'Identificación y priorización de +50 oportunidades de IA por valor estratégico, ROI, riesgo y esfuerzo de implementación.' },
      { icon: '📐', title: 'Modelo operativo IA', desc: 'Definición de centro de excelencia, gobierno de datos, métricas de valor (OKRs), gestión del cambio y ciclo de vida del modelo.' },
      { icon: '🔐', title: 'Cumplimiento y riesgo', desc: 'Análisis de cumplimiento normativo (GDPR, ISO, NIST), gestión de sesgos, explicabilidad y seguridad de modelos.' },
      { icon: '🏗️', title: 'Arquitectura de referencia', desc: 'Diseño de plataforma IA escalable (MLOps, LLMOps, Data Mesh) integrable con sistemas legacy (SAP, Oracle, AWS, Azure).' },
      { icon: '📊', title: 'Modelo financiero detallado', desc: 'Proyecciones de inversión, ahorro operativo, crecimiento de ingresos, TIR y VAN a 5 años. Business case para junta directiva.' },
      { icon: '🗺️', title: 'Roadmap multianual', desc: 'Hoja de ruta por fases (0-6, 6-18, 18-36 meses) con entregables, dependencias, recursos y KPIs de éxito.' },
      { icon: '🤝', title: 'Acompañamiento ejecutivo', desc: 'Sesiones mensuales con el comité de dirección y oficina de transformación para asegurar ejecución y ajustes estratégicos.' },
    ]
  },
  useCases: {
    title: 'Industrias y casos de alto valor',
    items: [
      { icon: '🏦', profile: 'Banca y Seguros', pain: 'Fuga de clientes, fraude, procesos manuales costosos, cumplimiento regulatorio exigente', solution: 'Estrategia IA para scoring crediticio, detección de fraudes en tiempo real, automatización de suscripción y atención omnicanal', result: 'ROI >300% en 24 meses, reducción de fraude del 45%' },
      { icon: '🏭', profile: 'Manufactura y Logística', pain: 'Paradas no planificadas, ineficiencia en cadena de suministro, desperdicio de materiales', solution: 'IA predictiva para mantenimiento, optimización de rutas, control de calidad por visión artificial y demanda forecasting', result: 'Ahorro operativo del 25% y reducción de downtime del 60%' },
      { icon: '🛒', profile: 'Retail y Consumo', pain: 'Exceso de inventario, baja conversión, experiencia de cliente inconsistente', solution: 'Estrategia de personalización, forecasting de demanda, pricing dinámico y asistentes conversacionales', result: 'Incremento de ticket promedio del 18% y reducción de inventario obsoleto del 35%' },
      { icon: '⚕️', profile: 'Salud y Farma', pain: 'Silos de datos, ineficiencia administrativa, errores diagnósticos, cumplimiento sanitario', solution: 'IA para gestión de historias clínicas, análisis de imágenes médicas, optimización de ensayos clínicos y adherencia de pacientes', result: 'Reducción de costos administrativos del 40% y mejora en precisión diagnóstica del 30%' },
    ]
  },
  results: {
    title: 'Resultados tangibles para su negocio',
    items: [
      { value: '5x – 10x', label: 'ROI proyectado a 3 años', sub: 'Basado en casos reales' },
      { value: '-40%', label: 'Reducción de costos operativos', sub: 'Automatización inteligente' },
      { value: '+25%', label: 'Crecimiento de ingresos', sub: 'Nuevos modelos de monetización' },
      { value: '100%', label: 'Cumplimiento normativo', sub: 'Gobernanza y ética integrada' },
    ]
  },
  pricing: {
    title: 'Modelos de compromiso Enterprise',
    subtitle: 'Inversión alineada al valor y escala de su organización',
    tiers: [
      {
        name: 'Diagnóstico Estratégico Ejecutivo',
        tagline: 'Para juntas directivas',
        price: 'USD 15,000',
        range: 'Inversión única',
        time: '4 semanas',
        color: '#0EA5E9',
        featured: false,
        features: [
          'Entrevistas con C-level y dueños de proceso',
          'Análisis de datos y sistemas actuales',
          'Identificación de 15+ casos de uso priorizados',
          'Business case preliminar (ROI, VAN, TIR)',
          'Presentación a comité ejecutivo'
        ],
        cta: 'Solicitar diagnóstico'
      },
      {
        name: 'Estrategia IA Integral',
        tagline: 'Transformación completa',
        price: 'USD 65,000 – 120,000',
        range: 'Según alcance',
        time: '12–16 semanas',
        color: '#6366F1',
        featured: true,
        features: [
          'Diagnóstico de madurez profundo',
          'Portafolio de +30 casos de uso',
          'Modelo operativo IA (gobernanza, talento, cultura)',
          'Arquitectura de referencia y selección tecnológica',
          'Modelo financiero detallado a 5 años',
          'Roadmap de implementación por fases',
          'Plan de gestión del cambio y formación',
          'Presentación a directorio y accionistas'
        ],
        cta: 'Plan más solicitado'
      },
      {
        name: 'Strategic Partnership',
        tagline: 'Acompañamiento continuo',
        price: 'A partir de USD 25,000',
        range: 'por mes',
        time: 'Contrato anual',
        color: '#10B981',
        featured: false,
        features: [
          'Oficina de transformación IA dedicada',
          'Ejecución del roadmap con KPIs mensuales',
          'Optimización continua de modelos y casos',
          'Capacitación ejecutiva y técnica',
          'Acceso a laboratorio de innovación',
          'Soporte en fusiones y adquisiciones (due diligence IA)',
          'Reporte trimestral a directorio'
        ],
        cta: 'Hablar con director de cuentas'
      },
    ]
  },
  faq: {
    title: 'Preguntas frecuentes para empresas',
    items: [
      { q: '¿Cómo se aseguran de que la estrategia se alinee con nuestro plan de negocio existente?', a: 'Comenzamos con un profundo análisis de su estrategia corporativa, objetivos financieros y capacidades actuales. Nuestra metodología integra el plan estratégico IA como un habilitador, no como un añadido.' },
      { q: '¿Qué pasa con la seguridad y cumplimiento normativo?', a: 'Incluimos explícitamente un análisis de riesgos, cumplimiento (GDPR, ISO 27001, NIST, etc.), gestión de sesgos y explicabilidad de modelos. Diseñamos la estrategia para que sea auditada desde el inicio.' },
      { q: '¿Cuánto tiempo toma ver resultados?', a: 'En 6 meses se pueden implementar casos de uso de alto valor (quick wins). El impacto financiero significativo suele verse entre 12 y 24 meses, dependiendo de la complejidad.' },
      { q: '¿Trabajan con sistemas legacy (SAP, Oracle, mainframes)?', a: 'Sí. Nuestro diseño de arquitectura incluye capas de integración con sistemas existentes, evitando migraciones disruptivas y maximizando el valor de sus inversiones actuales.' },
      { q: '¿Pueden ayudarnos a implementar la estrategia?', a: 'Ofrecemos acompañamiento en la ejecución mediante nuestro servicio Strategic Partnership o podemos recomendar integradores certificados. Nos adaptamos a su modelo de contratación.' },
      { q: '¿Qué garantías de ROI ofrecen?', a: 'Nuestro modelo financiero es riguroso y se valida con su equipo. Ofrecemos cláusulas de alineamiento de éxito en contratos de implementación. El diagnóstico ejecutivo incluye un business case con supuestos verificables.' },
    ]
  },
  form: {
    title: 'Solicite un diagnóstico ejecutivo confidencial',
    subtitle: 'Un consultor senior le contactará en 24 horas para agendar una reunión con su comité.',
    name: 'Nombre y cargo',
    email: 'Correo corporativo',
    company: 'Empresa',
    useCase: 'Describa brevemente su principal reto u oportunidad con IA (opcional)',
    submit: 'Solicitar diagnóstico →',
    loading: 'Enviando...',
    success: 'Recibido. Un director de cuentas le contactará para agendar una reunión confidencial.'
  },
  finalCta: {
    title: 'La IA mal dirigida es un riesgo. La IA bien estrategizada es su mayor ventaja.',
    subtitle: 'Solicite una sesión estratégica con nuestro equipo de transformación empresarial. Sin compromiso.',
    cta: 'Agendar sesión con director de estrategia',
    note: 'Total confidencialidad · Enfoque en ROI · Entregables ejecutivos'
  },
  sticky: 'Sesión ejecutiva IA',
},

  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'ai-strategy-consulting',
    icon: <span style={{ fontSize: '12px' }}>📱</span>,
  }
  return <ServicePageTemplate t={t} />
}