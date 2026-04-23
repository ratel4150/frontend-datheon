// File: frontend-datheon/src/app/(lang)/[lang]/servicios/odoo-erp/Servicepagecontent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {
    badge: 'Servicio · Odoo ERP',
    breadcrumb: { home: 'Inicio', services: 'Servicios', current: 'Odoo ERP' },
    hero: { title: 'Tu empresa unificada', titleAccent: 'en un solo sistema.', subtitle: 'Implementamos y personalizamos Odoo para unificar ventas, inventario, contabilidad, RRHH y producción. Sin silos, sin doble captura, con datos en tiempo real.', cta: 'Agendar diagnóstico gratuito', ctaSub: 'Ver planes' },
    social: '4 empresas implementaron Odoo con nosotros este año',
    includes: { title: '¿Qué incluye la implementación?', items: [
      { icon: '📋', title: 'Análisis de procesos', desc: 'Levantamiento de tus procesos actuales y mapeo a módulos Odoo antes de implementar nada.' },
      { icon: '⚙️', title: 'Configuración y personalización', desc: 'Configuramos los módulos que necesitas y personalizamos campos, vistas y flujos.' },
      { icon: '🔗', title: 'Integraciones', desc: 'Conectamos Odoo con tu tienda online, marketplace, sistema bancario o plataformas externas.' },
      { icon: '📦', title: 'Migración de datos', desc: 'Importamos tu catálogo, clientes, proveedores e historial desde Excel, SAP u otro sistema.' },
      { icon: '🎓', title: 'Capacitación', desc: 'Entrenamos a tu equipo con sesiones prácticas por departamento para adopción real.' },
      { icon: '🛠️', title: 'Soporte continuo', desc: 'Soporte post-implementación para resolver dudas, bugs y nuevas necesidades.' },
    ]},
    useCases: { title: 'Para qué tipo de empresa', items: [
      { icon: '🛍️', profile: 'Retail y distribución', pain: 'Ventas en Excel, inventario en otro sistema y contabilidad en otro', solution: 'Odoo unifica POS, inventario, compras y contabilidad en una sola pantalla', result: 'Cierra el mes 5 días antes' },
      { icon: '🏗️', profile: 'Manufactura', pain: 'Órdenes de producción en papel y materiales que siempre faltan', solution: 'Odoo Manufacturing con MRP, lista de materiales y control de producción', result: 'Reduce desperdicio de material 20%' },
      { icon: '🏢', profile: 'Servicios profesionales', pain: 'Proyectos sin seguimiento de horas ni rentabilidad real', solution: 'Odoo Project + Timesheet + Facturación automática por horas', result: 'Factura 30% más rápido sin trabajo extra' },
      { icon: '🌐', profile: 'E-commerce', pain: 'Tienda online sin conexión al inventario ni contabilidad', solution: 'Odoo E-commerce conectado en tiempo real con inventario y contabilidad', result: 'Elimina quiebres de stock y errores de factura' },
    ]},
    results: { title: 'Lo que logran nuestros clientes', items: [
      { value: '80%', label: 'Menos captura manual', sub: 'Con procesos automatizados' },
      { value: '5 días', label: 'Cierre contable más rápido', sub: 'Datos en tiempo real' },
      { value: '20%', label: 'Menos errores', sub: 'Procesos unificados' },
      { value: '1 sistema', label: 'Para toda la empresa', sub: 'Sin silos de información' },
    ]},
    pricing: { title: 'Planes Odoo ERP', subtitle: 'Precios en USD. No incluyen licencias Odoo Enterprise (cotización aparte).', tiers: [
      { name: 'Odoo Starter', tagline: 'Para empezar a digitalizar', price: '$5,000', range: '– $12,000 USD', time: '4–6 semanas', color: '#875A7B', featured: false, features: ['Hasta 3 módulos', 'Configuración estándar', 'Migración de datos básica', 'Capacitación 8 horas', 'Soporte 30 días'], cta: 'Solicitar propuesta' },
      { name: 'Odoo Business', tagline: 'Para digitalización completa', price: '$12,000', range: '– $30,000 USD', time: '8–12 semanas', color: '#00AEEF', featured: true, features: ['Hasta 8 módulos', 'Personalización avanzada', 'Integraciones externas', 'Migración completa', 'Capacitación por departamento', 'Soporte 90 días'], cta: 'El más solicitado' },
      { name: 'Odoo Enterprise', tagline: 'Para operaciones complejas', price: 'Desde $30,000', range: 'USD', time: '3–6 meses', color: '#F59E0B', featured: false, features: ['Módulos ilimitados', 'Desarrollo a medida', 'Integraciones API complejas', 'Multi-empresa', 'SLA garantizado', 'Administrador Odoo dedicado'], cta: 'Hablar con el equipo' },
    ]},
    faq: { title: 'Preguntas frecuentes', items: [
      { q: '¿Cuánto tiempo tarda la implementación?', a: 'Un Odoo básico con 3 módulos puede estar listo en 4-6 semanas. Una implementación completa puede tardar 3-6 meses.' },
      { q: '¿Puedo importar mis datos de Excel o de otro sistema?', a: 'Sí. Migramos catálogos, clientes, proveedores, saldos iniciales e historial de movimientos desde cualquier fuente.' },
      { q: '¿Odoo Community o Enterprise?', a: 'Depende de tus necesidades. Community es gratuito y suficiente para muchos casos. Enterprise tiene más módulos y soporte oficial.' },
      { q: '¿Pueden desarrollar módulos a medida?', a: 'Sí. Si Odoo no tiene algo que necesitas, desarrollamos un módulo personalizado que se integra nativamente.' },
      { q: '¿Qué pasa si mi equipo no adopta el sistema?', a: 'La capacitación por departamento es clave. Trabajamos con líderes de cada área para asegurar adopción real.' },
    ]},
    form: { title: 'Cuéntanos tus procesos actuales', subtitle: 'Te respondemos en menos de 24 horas.', name: 'Tu nombre', email: 'Email empresarial', company: 'Empresa', useCase: '¿Cuál es tu mayor dolor en la operación?', submit: 'Enviar →', loading: 'Enviando...', success: '¡Recibido! Te contactamos pronto.' },
    finalCta: { title: '¿Listo para unificar tu empresa en un solo sistema?', subtitle: 'Diagnóstico gratuito de tus procesos. Te decimos qué módulos necesitas.', cta: 'Agendar diagnóstico gratuito', note: 'Sin compromiso · Respuesta en 24h' },
    sticky: 'Agendar diagnóstico Odoo gratuito',
  },
  en: {
    badge: 'Service · Odoo ERP',
    breadcrumb: { home: 'Home', services: 'Services', current: 'Odoo ERP' },
    hero: { title: 'Your company unified', titleAccent: 'in a single system.', subtitle: 'We implement and customize Odoo to unify sales, inventory, accounting, HR and production. No silos, no double entry, with real-time data.', cta: 'Schedule free diagnosis', ctaSub: 'View plans' },
    social: '4 companies implemented Odoo with us this year',
    includes: { title: 'What does the implementation include?', items: [
      { icon: '📋', title: 'Process analysis', desc: 'Survey of your current processes and mapping to Odoo modules before implementing anything.' },
      { icon: '⚙️', title: 'Configuration and customization', desc: 'We configure the modules you need and customize fields, views and flows.' },
      { icon: '🔗', title: 'Integrations', desc: 'We connect Odoo with your online store, marketplace, banking system or external platforms.' },
      { icon: '📦', title: 'Data migration', desc: 'We import your catalog, customers, suppliers and history from Excel, SAP or another system.' },
      { icon: '🎓', title: 'Training', desc: 'We train your team with hands-on sessions by department for real adoption.' },
      { icon: '🛠️', title: 'Ongoing support', desc: 'Post-implementation support to resolve questions, bugs and new needs.' },
    ]},
    useCases: { title: 'For what type of company', items: [
      { icon: '🛍️', profile: 'Retail and distribution', pain: 'Sales in Excel, inventory in another system and accounting in another', solution: 'Odoo unifies POS, inventory, purchases and accounting in one screen', result: 'Close the month 5 days earlier' },
      { icon: '🏗️', profile: 'Manufacturing', pain: 'Production orders on paper and materials always missing', solution: 'Odoo Manufacturing with MRP, bill of materials and production control', result: 'Reduce material waste by 20%' },
      { icon: '🏢', profile: 'Professional services', pain: 'Projects without time tracking or real profitability', solution: 'Odoo Project + Timesheet + automatic billing by hours', result: 'Invoice 30% faster without extra work' },
      { icon: '🌐', profile: 'E-commerce', pain: 'Online store not connected to inventory or accounting', solution: 'Odoo E-commerce connected in real time with inventory and accounting', result: 'Eliminate stockouts and invoice errors' },
    ]},
    results: { title: 'What our clients achieve', items: [
      { value: '80%', label: 'Less manual entry', sub: 'With automated processes' },
      { value: '5 days', label: 'Faster month close', sub: 'Real-time data' },
      { value: '20%', label: 'Fewer errors', sub: 'Unified processes' },
      { value: '1 system', label: 'For the whole company', sub: 'No information silos' },
    ]},
    pricing: { title: 'Odoo ERP Plans', subtitle: 'Prices in USD. Odoo Enterprise licenses not included (separate quote).', tiers: [
      { name: 'Odoo Starter', tagline: 'To start digitalizing', price: '$5,000', range: '– $12,000 USD', time: '4–6 weeks', color: '#875A7B', featured: false, features: ['Up to 3 modules', 'Standard configuration', 'Basic data migration', '8-hour training', '30-day support'], cta: 'Request proposal' },
      { name: 'Odoo Business', tagline: 'For full digitalization', price: '$12,000', range: '– $30,000 USD', time: '8–12 weeks', color: '#00AEEF', featured: true, features: ['Up to 8 modules', 'Advanced customization', 'External integrations', 'Full migration', 'Department training', '90-day support'], cta: 'Most requested' },
      { name: 'Odoo Enterprise', tagline: 'For complex operations', price: 'From $30,000', range: 'USD', time: '3–6 months', color: '#F59E0B', featured: false, features: ['Unlimited modules', 'Custom development', 'Complex API integrations', 'Multi-company', 'Guaranteed SLA', 'Dedicated Odoo admin'], cta: 'Talk to the team' },
    ]},
    faq: { title: 'Frequently asked questions', items: [
      { q: 'How long does implementation take?', a: 'A basic Odoo with 3 modules can be ready in 4-6 weeks. A full implementation can take 3-6 months.' },
      { q: 'Can I import my data from Excel or another system?', a: 'Yes. We migrate catalogs, customers, suppliers, opening balances and transaction history from any source.' },
      { q: 'Odoo Community or Enterprise?', a: 'Depends on your needs. Community is free and sufficient for many cases. Enterprise has more modules and official support.' },
      { q: 'Can you develop custom modules?', a: "Yes. If Odoo doesn't have something you need, we develop a custom module that integrates natively." },
      { q: "What if my team doesn't adopt the system?", a: 'Department-by-department training is key. We work with leaders in each area to ensure real adoption.' },
    ]},
    form: { title: 'Tell us about your current processes', subtitle: 'We respond in less than 24 hours.', name: 'Your name', email: 'Business email', company: 'Company', useCase: 'What is your biggest operational pain?', submit: 'Send →', loading: 'Sending...', success: "Received! We'll contact you soon." },
    finalCta: { title: 'Ready to unify your company in a single system?', subtitle: 'Free diagnosis of your current processes. We tell you what modules you need.', cta: 'Schedule free diagnosis', note: 'No commitment · Response in 24h' },
    sticky: 'Schedule free Odoo diagnosis',
  },
  fr: {
    badge: 'Service · Odoo ERP',
    breadcrumb: { home: 'Accueil', services: 'Services', current: 'Odoo ERP' },
    hero: { title: 'Votre entreprise unifiée', titleAccent: 'dans un seul système.', subtitle: "Nous implémentons et personnalisons Odoo pour unifier ventes, inventaire, comptabilité, RH et production. Sans silos, sans double saisie, avec des données en temps réel.", cta: 'Planifier un diagnostic gratuit', ctaSub: 'Voir les plans' },
    social: "4 entreprises ont implémenté Odoo avec nous cette année",
    includes: { title: "Qu'inclut l'implémentation ?", items: [
      { icon: '📋', title: 'Analyse des processus', desc: "Relevé de vos processus actuels et mappage aux modules Odoo avant d'implémenter quoi que ce soit." },
      { icon: '⚙️', title: 'Configuration et personnalisation', desc: 'Nous configurons les modules dont vous avez besoin et personnalisons champs, vues et flux.' },
      { icon: '🔗', title: 'Intégrations', desc: "Nous connectons Odoo avec votre boutique en ligne, marketplace, système bancaire ou plateformes externes." },
      { icon: '📦', title: 'Migration des données', desc: "Nous importons votre catalogue, clients, fournisseurs et historique depuis Excel, SAP ou un autre système." },
      { icon: '🎓', title: 'Formation', desc: "Nous formons votre équipe avec des sessions pratiques par département pour une adoption réelle." },
      { icon: '🛠️', title: 'Support continu', desc: "Support post-implémentation pour résoudre questions, bugs et nouveaux besoins." },
    ]},
    useCases: { title: "Pour quel type d'entreprise", items: [
      { icon: '🛍️', profile: 'Commerce et distribution', pain: "Ventes dans Excel, inventaire dans un autre système et comptabilité dans un autre", solution: "Odoo unifie PDV, inventaire, achats et comptabilité en un seul écran", result: "Clôturez le mois 5 jours plus tôt" },
      { icon: '🏗️', profile: 'Industrie', pain: "Ordres de fabrication sur papier et matériaux toujours manquants", solution: "Odoo Manufacturing avec MRP, nomenclature et contrôle de production", result: "Réduisez le gaspillage de matériaux de 20%" },
      { icon: '🏢', profile: 'Services professionnels', pain: "Projets sans suivi des heures ni rentabilité réelle", solution: "Odoo Project + Feuille de temps + Facturation automatique aux heures", result: "Facturez 30% plus vite sans travail supplémentaire" },
      { icon: '🌐', profile: 'E-commerce', pain: "Boutique en ligne non connectée à l'inventaire ni à la comptabilité", solution: "Odoo E-commerce connecté en temps réel avec inventaire et comptabilité", result: "Éliminez les ruptures de stock et les erreurs de facture" },
    ]},
    results: { title: 'Ce que réalisent nos clients', items: [
      { value: '80%', label: 'Moins de saisie manuelle', sub: 'Processus automatisés' },
      { value: '5 jours', label: 'Clôture plus rapide', sub: 'Données en temps réel' },
      { value: '20%', label: "Moins d'erreurs", sub: 'Processus unifiés' },
      { value: '1 système', label: "Pour toute l'entreprise", sub: "Sans silos d'information" },
    ]},
    pricing: { title: 'Plans Odoo ERP', subtitle: "Prix en USD. Les licences Odoo Enterprise ne sont pas incluses (devis séparé).", tiers: [
      { name: 'Odoo Starter', tagline: 'Pour commencer à digitaliser', price: '5 000 $', range: '– 12 000 $ USD', time: '4–6 semaines', color: '#875A7B', featured: false, features: ["Jusqu'à 3 modules", 'Configuration standard', 'Migration de données basique', 'Formation 8 heures', 'Support 30 jours'], cta: 'Demander une proposition' },
      { name: 'Odoo Business', tagline: 'Pour la digitalisation complète', price: '12 000 $', range: '– 30 000 $ USD', time: '8–12 semaines', color: '#00AEEF', featured: true, features: ["Jusqu'à 8 modules", 'Personnalisation avancée', 'Intégrations externes', 'Migration complète', 'Formation par département', 'Support 90 jours'], cta: 'Le plus demandé' },
      { name: 'Odoo Enterprise', tagline: 'Pour les opérations complexes', price: 'À partir de 30 000 $', range: 'USD', time: '3–6 mois', color: '#F59E0B', featured: false, features: ['Modules illimités', 'Développement sur mesure', 'Intégrations API complexes', 'Multi-société', 'SLA garanti', 'Administrateur Odoo dédié'], cta: "Parler à l'équipe" },
    ]},
    faq: { title: 'Questions fréquentes', items: [
      { q: "Combien de temps dure l'implémentation ?", a: "Un Odoo basique avec 3 modules peut être prêt en 4-6 semaines. Une implémentation complète peut prendre 3-6 mois." },
      { q: "Puis-je importer mes données depuis Excel ou un autre système ?", a: "Oui. Nous migrons catalogues, clients, fournisseurs, soldes initiaux et historique de transactions depuis n'importe quelle source." },
      { q: 'Odoo Community ou Enterprise ?', a: "Selon vos besoins. Community est gratuit et suffisant dans de nombreux cas. Enterprise a plus de modules et le support officiel d'Odoo S.A." },
      { q: 'Pouvez-vous développer des modules sur mesure ?', a: "Oui. Si Odoo n'a pas quelque chose dont vous avez besoin, nous développons un module personnalisé qui s'intègre nativement." },
      { q: "Et si mon équipe n'adopte pas le système ?", a: "La formation par département est clé. Nous travaillons avec les responsables de chaque service pour assurer une adoption réelle." },
    ]},
    form: { title: 'Parlez-nous de vos processus actuels', subtitle: 'Nous répondons en moins de 24 heures.', name: 'Votre nom', email: 'Email professionnel', company: 'Entreprise', useCase: 'Quel est votre plus grand problème opérationnel ?', submit: 'Envoyer →', loading: 'Envoi...', success: 'Reçu ! Nous vous contactons bientôt.' },
    finalCta: { title: 'Prêt à unifier votre entreprise dans un seul système ?', subtitle: 'Diagnostic gratuit de vos processus actuels. Nous vous indiquons les modules nécessaires.', cta: 'Planifier un diagnostic gratuit', note: 'Sans engagement · Réponse en 24h' },
    sticky: 'Planifier un diagnostic Odoo gratuit',
  },
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'odoo-erp',
    icon: <span style={{ fontSize: '12px' }}>🏭</span>,
  }
  return <ServicePageTemplate t={t} />
}