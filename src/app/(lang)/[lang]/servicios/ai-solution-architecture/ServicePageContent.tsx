// File: frontend-datheon/src/app/(lang)/[lang]/servicios/apps-moviles/Servicepagecontent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
 es: {
    badge: 'Servicio · Arquitectura IA',
    breadcrumb: { home: 'Inicio', services: 'Servicios', current: 'Arquitectura de Soluciones IA' },
    hero: {
      title: 'Diseñamos sistemas de IA que',
      titleAccent: 'transforman tu operación.',
      subtitle: 'No implementamos herramientas aisladas. Diseñamos arquitecturas completas que conectan procesos, datos y automatización en un solo sistema.',
      cta: 'Agendar diagnóstico',
      ctaSub: 'Ver planes'
    },
    social: 'Empresas optimizan sus operaciones con arquitectura de sistemas bien diseñada',
    includes: {
      title: '¿Qué incluye?',
      items: [
        { icon: '🧠', title: 'Diagnóstico de procesos', desc: 'Análisis completo de cómo opera tu negocio actualmente.' },
        { icon: '🏗️', title: 'Arquitectura de solución', desc: 'Diseño estructurado del sistema que conecta IA, workflows y herramientas.' },
        { icon: '🔗', title: 'Mapeo de integraciones', desc: 'Definimos cómo se conectan APIs, sistemas y datos.' },
        { icon: '⚙️', title: 'Diseño de workflows', desc: 'Automatización de procesos clave con lógica estructurada.' },
        { icon: '📊', title: 'Optimización operativa', desc: 'Reducimos fricción, errores y tiempos manuales.' },
        { icon: '📍', title: 'Roadmap de implementación', desc: 'Plan claro paso a paso para ejecutar el sistema.' },
      ]
    },
    useCases: {
      title: 'Para quién es esto',
      items: [
        { icon: '🏢', profile: 'Empresa con procesos manuales', pain: 'Dependencia de tareas repetitivas y errores humanos', solution: 'Sistema automatizado con IA y workflows estructurados', result: 'Menos errores y mayor eficiencia operativa' },
        { icon: '🚀', profile: 'Startup en crecimiento', pain: 'Procesos desorganizados que no escalan', solution: 'Arquitectura escalable con automatización y backend sólido', result: 'Sistema listo para crecer sin fricción' },
        { icon: '🔗', profile: 'Negocio con muchas herramientas', pain: 'Sistemas desconectados y duplicación de trabajo', solution: 'Integración completa en un solo flujo operativo', result: 'Operación centralizada y eficiente' },
        { icon: '📉', profile: 'Empresa con baja eficiencia', pain: 'Procesos lentos y costosos', solution: 'Optimización con IA y automatización inteligente', result: 'Ahorro de tiempo y mejor rendimiento' },
      ]
    },
    results: {
      title: 'Lo que logramos',
      items: [
        { value: '70%', label: 'Menos tareas manuales', sub: 'Automatización de procesos' },
        { value: '50%', label: 'Reducción de errores', sub: 'Procesos estructurados' },
        { value: '2x', label: 'Eficiencia operativa', sub: 'Optimización de workflows' },
        { value: '100%', label: 'Visibilidad', sub: 'Control total del sistema' },
      ]
    },
    pricing: {
      title: 'Planes Arquitectura IA',
      subtitle: 'Diseñado para empresas que buscan sistemas reales',
      tiers: [
        {
          name: 'Diagnóstico',
          tagline: 'Entiende tu sistema actual',
          price: '$200',
          range: '– $500 USD',
          time: '2–3 días',
          color: '#0EA5E9',
          featured: false,
          features: ['Análisis de procesos', 'Identificación de problemas', 'Recomendaciones iniciales'],
          cta: 'Solicitar análisis'
        },
        {
          name: 'Arquitectura',
          tagline: 'Diseño completo del sistema',
          price: '$800',
          range: '– $2,000 USD',
          time: '5–7 días',
          color: '#6366F1',
          featured: true,
          features: ['Arquitectura completa', 'Diseño de workflows', 'Mapeo de integraciones', 'Roadmap'],
          cta: 'Más solicitado'
        },
        {
          name: 'Full Strategy',
          tagline: 'Transformación completa',
          price: '$2,500',
          range: '+ USD',
          time: '1–2 semanas',
          color: '#10B981',
          featured: false,
          features: ['Arquitectura avanzada', 'Optimización completa', 'Plan de escalabilidad', 'Soporte estratégico'],
          cta: 'Hablar con experto'
        },
      ]
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        { q: '¿Esto es desarrollo o consultoría?', a: 'Es diseño estratégico de sistemas que luego puede implementarse.' },
        { q: '¿Trabajan con herramientas específicas?', a: 'Sí, pero nos enfocamos en la solución, no en la herramienta.' },
        { q: '¿Pueden implementar el sistema?', a: 'Sí, después del diseño podemos ejecutarlo completo.' },
        { q: '¿Necesito conocimientos técnicos?', a: 'No, nosotros estructuramos todo.' },
        { q: '¿Es solo para empresas grandes?', a: 'No, también para startups que quieren escalar bien desde el inicio.' },
      ]
    },
    form: {
      title: 'Cuéntanos tu proceso actual',
      subtitle: 'Te damos claridad en menos de 24h',
      name: 'Tu nombre',
      email: 'Email',
      company: 'Empresa',
      useCase: '¿Cuál es tu mayor problema operativo?',
      submit: 'Enviar →',
      loading: 'Enviando...',
      success: 'Recibido'
    },
    finalCta: {
      title: '¿Listo para transformar tu operación?',
      subtitle: 'Diseñamos sistemas que realmente funcionan',
      cta: 'Agendar diagnóstico',
      note: 'Respuesta en 24h'
    },
    sticky: 'Agendar diagnóstico IA',
  },

  en: {
  badge: 'Service · AI Solution Architecture',
  breadcrumb: { home: 'Home', services: 'Services', current: 'AI Solution Architecture' },
  hero: {
    title: 'We design AI systems that',
    titleAccent: 'transform your operations.',
    subtitle: 'We don’t implement isolated tools. We design complete architectures that connect processes, data, and automation into a unified system.',
    cta: 'Schedule diagnosis',
    ctaSub: 'View plans'
  },
  social: 'Companies optimize operations through well-designed system architecture',
  includes: {
    title: "What's included?",
    items: [
      { icon: '🧠', title: 'Process diagnosis', desc: 'Full analysis of how your business currently operates.' },
      { icon: '🏗️', title: 'Solution architecture', desc: 'Structured system design connecting AI, workflows, and tools.' },
      { icon: '🔗', title: 'Integration mapping', desc: 'We define how APIs, systems, and data connect.' },
      { icon: '⚙️', title: 'Workflow design', desc: 'Automation of key processes with structured logic.' },
      { icon: '📊', title: 'Operational optimization', desc: 'We reduce friction, errors, and manual work.' },
      { icon: '📍', title: 'Implementation roadmap', desc: 'Clear step-by-step execution plan.' },
    ]
  },
  useCases: {
    title: 'Who is this for',
    items: [
      { icon: '🏢', profile: 'Company with manual processes', pain: 'Dependence on repetitive tasks and human error', solution: 'Automated system with AI and structured workflows', result: 'Fewer errors and higher operational efficiency' },
      { icon: '🚀', profile: 'Growing startup', pain: 'Disorganized processes that do not scale', solution: 'Scalable architecture with automation and solid backend', result: 'System ready to grow without friction' },
      { icon: '🔗', profile: 'Business with multiple tools', pain: 'Disconnected systems and duplicated work', solution: 'Full integration into a single operational flow', result: 'Centralized and efficient operations' },
      { icon: '📉', profile: 'Low-efficiency company', pain: 'Slow and costly processes', solution: 'Optimization through AI and intelligent automation', result: 'Time savings and better performance' },
    ]
  },
  results: {
    title: 'What we achieve',
    items: [
      { value: '70%', label: 'Less manual work', sub: 'Process automation' },
      { value: '50%', label: 'Error reduction', sub: 'Structured processes' },
      { value: '2x', label: 'Operational efficiency', sub: 'Workflow optimization' },
      { value: '100%', label: 'Visibility', sub: 'Full system control' },
    ]
  },
  pricing: {
    title: 'AI Architecture Plans',
    subtitle: 'Designed for companies seeking real systems',
    tiers: [
      {
        name: 'Diagnosis',
        tagline: 'Understand your current system',
        price: '$200',
        range: '– $500 USD',
        time: '2–3 days',
        color: '#0EA5E9',
        featured: false,
        features: ['Process analysis', 'Problem identification', 'Initial recommendations'],
        cta: 'Request analysis'
      },
      {
        name: 'Architecture',
        tagline: 'Complete system design',
        price: '$800',
        range: '– $2,000 USD',
        time: '5–7 days',
        color: '#6366F1',
        featured: true,
        features: ['Full architecture', 'Workflow design', 'Integration mapping', 'Roadmap'],
        cta: 'Most requested'
      },
      {
        name: 'Full Strategy',
        tagline: 'Complete transformation',
        price: '$2,500',
        range: '+ USD',
        time: '1–2 weeks',
        color: '#10B981',
        featured: false,
        features: ['Advanced architecture', 'Full optimization', 'Scalability plan', 'Strategic support'],
        cta: 'Talk to expert'
      },
    ]
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      { q: 'Is this development or consulting?', a: 'It is strategic system design that can later be implemented.' },
      { q: 'Do you work with specific tools?', a: 'Yes, but we focus on the solution, not the tool.' },
      { q: 'Can you implement the system?', a: 'Yes, after design we can execute it fully.' },
      { q: 'Do I need technical knowledge?', a: 'No, we structure everything for you.' },
      { q: 'Is this only for large companies?', a: 'No, also for startups that want to scale correctly from the start.' },
    ]
  },
  form: {
    title: 'Tell us about your current process',
    subtitle: 'We give you clarity in less than 24h',
    name: 'Your name',
    email: 'Email',
    company: 'Company',
    useCase: 'What is your biggest operational problem?',
    submit: 'Send →',
    loading: 'Sending...',
    success: 'Received'
  },
  finalCta: {
    title: 'Ready to transform your operations?',
    subtitle: 'We design systems that actually work',
    cta: 'Schedule diagnosis',
    note: 'Response within 24h'
  },
  sticky: 'Schedule AI diagnosis',
},
  fr: {
  badge: 'Service · Architecture IA',
  breadcrumb: { home: 'Accueil', services: 'Services', current: 'Architecture de Solutions IA' },
  hero: {
    title: 'Nous concevons des systèmes IA qui',
    titleAccent: 'transforment vos opérations.',
    subtitle: 'Nous ne mettons pas en place des outils isolés. Nous concevons des architectures complètes qui connectent processus, données et automatisation.',
    cta: 'Planifier un diagnostic',
    ctaSub: 'Voir les offres'
  },
  social: 'Les entreprises optimisent leurs opérations grâce à une architecture bien conçue',
  includes: {
    title: "Qu'est-ce qui est inclus ?",
    items: [
      { icon: '🧠', title: 'Diagnostic des processus', desc: 'Analyse complète du fonctionnement actuel de votre entreprise.' },
      { icon: '🏗️', title: 'Architecture de solution', desc: 'Conception structurée du système reliant IA, workflows et outils.' },
      { icon: '🔗', title: 'Cartographie des intégrations', desc: 'Définition des connexions entre APIs, systèmes et données.' },
      { icon: '⚙️', title: 'Conception des workflows', desc: 'Automatisation des processus clés avec logique structurée.' },
      { icon: '📊', title: 'Optimisation opérationnelle', desc: 'Réduction des frictions, erreurs et tâches manuelles.' },
      { icon: '📍', title: 'Feuille de route', desc: 'Plan clair étape par étape pour implémentation.' },
    ]
  },
  useCases: {
    title: 'Pour qui est-ce',
    items: [
      { icon: '🏢', profile: 'Entreprise avec processus manuels', pain: 'Dépendance aux tâches répétitives et erreurs humaines', solution: 'Système automatisé avec IA et workflows structurés', result: 'Moins d’erreurs et meilleure efficacité' },
      { icon: '🚀', profile: 'Startup en croissance', pain: 'Processus désorganisés non scalables', solution: 'Architecture scalable avec automatisation', result: 'Système prêt à évoluer sans friction' },
      { icon: '🔗', profile: 'Entreprise avec plusieurs outils', pain: 'Systèmes déconnectés et travail dupliqué', solution: 'Intégration complète en un seul flux', result: 'Opérations centralisées' },
      { icon: '📉', profile: 'Entreprise inefficace', pain: 'Processus lents et coûteux', solution: 'Optimisation via IA et automatisation', result: 'Gain de temps et performance' },
    ]
  },
  results: {
    title: 'Résultats',
    items: [
      { value: '70%', label: 'Moins de tâches manuelles', sub: 'Automatisation' },
      { value: '50%', label: 'Réduction des erreurs', sub: 'Processus structurés' },
      { value: '2x', label: 'Efficacité', sub: 'Optimisation des workflows' },
      { value: '100%', label: 'Visibilité', sub: 'Contrôle total' },
    ]
  },
  pricing: {
    title: 'Offres Architecture IA',
    subtitle: 'Pour les entreprises qui veulent des systèmes réels',
    tiers: [
      {
        name: 'Diagnostic',
        tagline: 'Comprendre votre système',
        price: '200 $',
        range: '– 500 USD',
        time: '2–3 jours',
        color: '#0EA5E9',
        featured: false,
        features: ['Analyse des processus', 'Identification des problèmes', 'Recommandations'],
        cta: 'Demander analyse'
      },
      {
        name: 'Architecture',
        tagline: 'Conception complète',
        price: '800 $',
        range: '– 2 000 USD',
        time: '5–7 jours',
        color: '#6366F1',
        featured: true,
        features: ['Architecture complète', 'Workflows', 'Intégrations', 'Roadmap'],
        cta: 'Le plus demandé'
      },
      {
        name: 'Full Strategy',
        tagline: 'Transformation complète',
        price: '2 500 $',
        range: '+ USD',
        time: '1–2 semaines',
        color: '#10B981',
        featured: false,
        features: ['Architecture avancée', 'Optimisation complète', 'Scalabilité', 'Support stratégique'],
        cta: 'Parler à un expert'
      },
    ]
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Est-ce du développement ou du conseil ?', a: 'C’est du design stratégique de systèmes.' },
      { q: 'Travaillez-vous avec des outils spécifiques ?', a: 'Oui, mais nous priorisons la solution.' },
      { q: 'Pouvez-vous implémenter ?', a: 'Oui après la phase de design.' },
      { q: 'Dois-je être technique ?', a: 'Non.' },
      { q: 'Seulement pour grandes entreprises ?', a: 'Non, aussi pour startups.' },
    ]
  },
  form: {
    title: 'Parlez-nous de votre processus',
    subtitle: 'Réponse en moins de 24h',
    name: 'Nom',
    email: 'Email',
    company: 'Entreprise',
    useCase: 'Votre plus grand problème ?',
    submit: 'Envoyer →',
    loading: 'Envoi...',
    success: 'Reçu'
  },
  finalCta: {
    title: 'Prêt à transformer vos opérations ?',
    subtitle: 'Nous concevons des systèmes efficaces',
    cta: 'Planifier diagnostic',
    note: 'Réponse 24h'
  },
  sticky: 'Diagnostic IA',
},
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'ai-solution-architecture',
    icon: <span style={{ fontSize: '12px' }}>📱</span>,
  }
  return <ServicePageTemplate t={t} />
}