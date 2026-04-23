// File: frontend-datheon/src/app/(lang)/[lang]/servicios/business-process-optimization/ServicePageContent.tsx
// File: frontend-datheon/src/app/(lang)/[lang]/servicios/ai-strategy-consulting/ServicePageContent.tsx
// File: frontend-datheon/src/app/(lang)/[lang]/servicios/apps-moviles/Servicepagecontent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
 es: {
  badge: 'Servicio Enterprise · Optimización de Procesos con IA',
  breadcrumb: { home: 'Inicio', services: 'Servicios', current: 'Optimización de Procesos de Negocio' },
  hero: {
    title: 'Automatice y optimice sus',
    titleAccent: 'procesos críticos con IA.',
    subtitle: 'Identificamos ineficiencias ocultas, automatizamos tareas repetitivas y rediseñamos flujos de trabajo para reducir costos operativos hasta un 50% y acelerar tiempos de respuesta. Enfoque en procesos de alto valor y cumplimiento normativo.',
    cta: 'Solicitar auditoría de procesos',
    ctaSub: 'Ver metodología'
  },
  social: 'El 60% del tiempo de los empleados se gasta en tareas repetitivas que pueden automatizarse. Nosotros lo hacemos realidad.',
  includes: {
    title: 'Qué incluye el servicio Enterprise',
    items: [
      { icon: '🔍', title: 'Auditoría de procesos end-to-end', desc: 'Mapeo completo de procesos críticos (finanzas, RRHH, cadena de suministro, atención al cliente, etc.) y detección de cuellos de botella, errores manuales y desperdicios.' },
      { icon: '📊', title: 'Métricas de eficiencia actual (baseline)', desc: 'Medición de tiempos de ciclo, costos por transacción, tasa de error, capacidad utilizada y cumplimiento de SLA.' },
      { icon: '🤖', title: 'Identificación de oportunidades de automatización', desc: 'Priorización de tareas por complejidad, volumen, impacto en ahorro y facilidad de implementación (RPA, IA, BPM, etc.).' },
      { icon: '⚙️', title: 'Diseño de flujos optimizados', desc: 'Rediseño de procesos eliminando pasos sin valor, integrando sistemas legacy y aplicando principios de automatización inteligente.' },
      { icon: '📐', title: 'Modelo de gobierno y monitoreo', desc: 'Definición de KPIs, dashboards en tiempo real, alertas proactivas y centro de excelencia en automatización.' },
      { icon: '📈', title: 'Business case de automatización', desc: 'Proyección de ahorros (costos directos e indirectos), retorno de inversión (ROI, TIR, payback) y análisis de sensibilidad.' },
      { icon: '🗺️', title: 'Roadmap de implementación', desc: 'Fases 0-6, 6-12 y 12-24 meses con entregables, dependencias, recursos necesarios y mitigación de riesgos.' },
      { icon: '👥', title: 'Gestión del cambio y capacitación', desc: 'Plan de comunicación, formación de equipos, rediseño de roles y acompañamiento post-implementación.' },
    ]
  },
  useCases: {
    title: 'Procesos con alto potencial de mejora',
    items: [
      { icon: '💰', profile: 'Finanzas y Contabilidad', pain: 'Conciliaciones manuales, facturación lenta, errores en cuentas por pagar, cierres mensuales largos', solution: 'Automatización de facturación, conciliación bancaria con IA, aprobaciones inteligentes y cierre contable en tiempo real', result: 'Reducción de tiempo de cierre de 10 días a 2 días, 98% menos errores' },
      { icon: '👥', profile: 'Recursos Humanos', pain: 'Onboarding manual, gestión de ausencias, nómina propensa a errores, atención repetitiva de consultas', solution: 'Automatización de onboarding, asistentes virtuales para empleados, gestión inteligente de ausencias y payroll integrado', result: 'Ahorro del 70% de tiempo en gestión de RRHH' },
      { icon: '📦', profile: 'Cadena de Suministro', pain: 'Previsión de demanda imprecisa, rotura de stock, seguimiento manual de órdenes, costos logísticos altos', solution: 'Optimización de inventario con IA, seguimiento automatizado, rutas dinámicas y proveedores inteligentes', result: 'Reducción de inventario obsoleto del 40% y mejora de disponibilidad del 25%' },
      { icon: '🛎️', profile: 'Atención al Cliente', pain: 'Altos volúmenes de tickets, tiempos de respuesta largos, información inconsistente, desgaste del equipo', solution: 'Chatbots y agentes virtuales, routing inteligente, respuestas semiautomáticas y analítica de sentimiento', result: 'Tiempo de respuesta reducido en 80%, satisfacción del cliente +35%' },
    ]
  },
  results: {
    title: 'Impacto medible en su operación',
    items: [
      { value: '-50%', label: 'Reducción de costos operativos', sub: 'En procesos automatizados' },
      { value: '4x', label: 'Velocidad de ejecución', sub: 'Tiempos de ciclo reducidos' },
      { value: '99.9%', label: 'Precisión operativa', sub: 'Eliminación de errores manuales' },
      { value: '<6 meses', label: 'Payback promedio', sub: 'ROI positivo en corto plazo' },
    ]
  },
  pricing: {
    title: 'Modelos de compromiso Enterprise',
    subtitle: 'Inversión basada en alcance y complejidad de procesos',
    tiers: [
      {
        name: 'Auditoría Rápida de Procesos',
        tagline: 'Para áreas críticas',
        price: 'USD 12,000',
        range: 'Inversión única',
        time: '3 semanas',
        color: '#0EA5E9',
        featured: false,
        features: [
          'Mapeo de 3-5 procesos clave',
          'Identificación de ineficiencias',
          'Estimación de ahorro potencial',
          'Recomendaciones ejecutivas'
        ],
        cta: 'Solicitar auditoría'
      },
      {
        name: 'Optimización Integral',
        tagline: 'Transformación operativa',
        price: 'USD 55,000 – 95,000',
        range: 'Según alcance',
        time: '12–14 semanas',
        color: '#6366F1',
        featured: true,
        features: [
          'Auditoría completa de hasta 20 procesos',
          'Diseño de flujos optimizados',
          'Selección de tecnologías (RPA, IA, BPM)',
          'Business case detallado',
          'Roadmap de implementación',
          'Plan de gestión del cambio',
          'Presentación a comité operativo'
        ],
        cta: 'Plan más solicitado'
      },
      {
        name: 'Strategic Automation Partnership',
        tagline: 'Acompañamiento continuo',
        price: 'A partir de USD 18,000',
        range: 'por mes',
        time: 'Contrato anual',
        color: '#10B981',
        featured: false,
        features: [
          'Centro de excelencia en automatización',
          'Ejecución del roadmap con KPIs mensuales',
          'Optimización continua de procesos',
          'Capacitación y soporte técnico',
          'Medición de ROI post-implementación',
          'Reporte ejecutivo trimestral'
        ],
        cta: 'Hablar con especialista'
      },
    ]
  },
  faq: {
    title: 'Preguntas frecuentes para empresas',
    items: [
      { q: '¿Qué tipo de procesos pueden optimizarse?', a: 'Cualquier proceso repetitivo, con reglas definidas y alto volumen: facturación, aprobaciones, atención al cliente, gestión de inventario, RRHH, compras, etc. Nuestra metodología aplica tanto a procesos back-office como front-office.' },
      { q: '¿Es necesario cambiar nuestros sistemas actuales (ERP, CRM)?', a: 'No necesariamente. Diseñamos soluciones que se integran con sus sistemas legacy mediante APIs, RPA o middleware. Evitamos migraciones disruptivas.' },
      { q: '¿Cuánto tiempo toma ver resultados?', a: 'Las automatizaciones de quick-win pueden implementarse en 4-6 semanas. La transformación integral de procesos suele mostrar ahorros significativos en 6-12 meses.' },
      { q: '¿Qué pasa con el personal cuyas tareas se automatizan?', a: 'Parte del plan de gestión del cambio incluye reentrenamiento y reasignación a tareas de mayor valor, mejorando la satisfacción laboral y la productividad general.' },
      { q: '¿Miden el ROI después de la implementación?', a: 'Sí. Definimos KPIs claros desde el inicio y realizamos mediciones post-implementación a los 3, 6 y 12 meses. En el partnership, reportamos el ROI trimestralmente.' },
      { q: '¿Trabajan con empresas reguladas (banca, salud, etc.)?', a: 'Sí. Nuestros diseños incluyen controles de cumplimiento, pistas de auditoría y seguridad de datos. Tenemos experiencia en entornos altamente regulados.' },
    ]
  },
  form: {
    title: 'Solicite una auditoría de procesos confidencial',
    subtitle: 'Un consultor senior le contactará para agendar un análisis preliminar sin costo.',
    name: 'Nombre y cargo',
    email: 'Correo corporativo',
    company: 'Empresa',
    useCase: '¿Qué proceso o área le gustaría optimizar primero? (opcional)',
    submit: 'Solicitar auditoría →',
    loading: 'Enviando...',
    success: 'Recibido. Un especialista en optimización le contactará en 24 horas.'
  },
  finalCta: {
    title: 'Cada hora perdida en procesos ineficientes es una oportunidad de ahorro desperdiciada.',
    subtitle: 'Permítanos mostrarle cómo reducir sus costos operativos al menos un 30% en los próximos 12 meses.',
    cta: 'Agendar diagnóstico de procesos',
    note: 'Sin compromiso · Estudio de viabilidad incluido · Datos confidenciales'
  },
  sticky: 'Auditoría de procesos',
},

  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'business-process-optimization',
    icon: <span style={{ fontSize: '12px' }}>📱</span>,
  }
  return <ServicePageTemplate t={t} />
}