// File: frontend-datheon/src/app/(lang)/[lang]/servicios/web-saas/Servicepagecontent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {
    badge: 'Servicio · Web & SaaS',
    breadcrumb: { home: 'Inicio', services: 'Servicios', current: 'Web / SaaS' },
    hero: { title: 'Tu negocio digital,', titleAccent: 'rápido y escalable.', subtitle: 'Desarrollamos plataformas web y SaaS que convierten visitantes en clientes. Desde landing pages hasta aplicaciones multi-tenant con pagos y autenticación.', cta: 'Agendar consulta gratuita', ctaSub: 'Ver precios' },
    social: '6 empresas lanzaron su SaaS con nosotros este año',
    includes: { title: '¿Qué incluye?', items: [
        { icon: '🎨', title: 'Diseño UI/UX', desc: 'Interfaces modernas con Figma, adaptadas a tu marca y optimizadas para conversión.' },
        { icon: '⚡', title: 'Next.js 15', desc: 'Frontend ultrarrápido con SSR, SSG e ISR. Core Web Vitals en verde desde el día uno.' },
        { icon: '🔐', title: 'Autenticación', desc: 'Login con email, Google, GitHub. Roles y permisos granulares desde el inicio.' },
        { icon: '💳', title: 'Pagos con Stripe', desc: 'Suscripciones, pagos únicos, trials gratuitos y gestión de facturación automática.' },
        { icon: '📊', title: 'Dashboard analítico', desc: 'Panel de administración con métricas de uso, usuarios activos y revenue en tiempo real.' },
        { icon: '🚀', title: 'Deploy automatizado', desc: 'CI/CD con Vercel o AWS. Tu equipo hace push y en minutos está en producción.' },
    ] },
    useCases: { title: 'Para quién es esto', items: [
        { icon: '🛍️', profile: 'E-commerce B2B', pain: 'Tu catálogo en Excel', solution: 'Plataforma con catálogo digital, pedidos y facturas', result: 'Reduce el ciclo de venta un 50%' },
        { icon: '📚', profile: 'Plataforma educativa', pain: 'Gestionas alumnos en WhatsApp', solution: 'SaaS con cursos, pagos automáticos y seguimiento de progreso', result: '3x más alumnos con el mismo equipo' },
        { icon: '🏢', profile: 'Portal interno', pain: 'Procesos críticos en hojas de cálculo', solution: 'Aplicación web con roles, flujos y auditoría', result: 'Elimina errores y acelera operaciones' },
        { icon: '📈', profile: 'Herramienta SaaS', pain: 'Idea de producto sin saber cómo construirla', solution: 'MVP funcional en 8 semanas listo para primeros usuarios', result: 'De idea a revenue en menos de 3 meses' },
    ] },
    results: { title: 'Resultados que entregamos', items: [
        { value: '99.9%', label: 'Uptime garantizado', sub: 'Infraestructura resiliente' },
        { value: '3x', label: 'Más conversión', sub: 'vs sitios estáticos' },
        { value: '<1s', label: 'Tiempo de carga', sub: 'Core Web Vitals verde' },
        { value: '8 sem', label: 'Tiempo a producción', sub: 'MVP funcional' },
    ] },
    pricing: { title: 'Planes Web & SaaS', subtitle: 'Precios en USD. Incluyen diseño, desarrollo y deploy inicial.', tiers: [
        { name: 'Landing / Sitio web', tagline: 'Landing / Sitio web', price: '$3,000', range: '– $8,000 USD', time: '3–5 semanas', color: '#6366F1', featured: false, features: ['Diseño personalizado', 'Hasta 10 secciones', 'Formulario de contacto', 'SEO técnico básico', 'Analytics integrado', 'Hosting 1 año incluido'], cta: 'Solicitar propuesta' },
        { name: 'Web App / MVP SaaS', tagline: 'Web App / MVP SaaS', price: '$10,000', range: '– $25,000 USD', time: '8–12 semanas', color: '#00AEEF', featured: true, features: ['Autenticación completa', 'Dashboard de usuario', 'Integración Stripe', 'API REST documentada', 'Panel de administración', 'Deploy CI/CD', 'Soporte 90 días'], cta: 'El más solicitado' },
        { name: 'SaaS Completo', tagline: 'SaaS Completo', price: 'Desde $25,000', range: 'USD', time: '3–5 meses', color: '#7C3AED', featured: false, features: ['Multi-tenant architecture', 'Planes y suscripciones', 'Analytics avanzado', 'Integraciones API', 'Infraestructura cloud', 'SLA garantizado', 'Equipo dedicado'], cta: 'Hablar con el equipo' },
    ] },
    faq: { title: 'Preguntas frecuentes', items: [
        { q: `¿En cuánto tiempo tendré mi sitio listo?`, a: `Un sitio web tarda 3-5 semanas. Un MVP SaaS con autenticación y pagos entre 8-12 semanas.` },
        { q: `¿Puedo editar el contenido yo mismo?`, a: `Sí. Integramos un CMS headless o te entregamos el código con documentación para que tu equipo pueda modificarlo.` },
        { q: `¿Qué tecnologías usan?`, a: `Next.js 15, TypeScript, MUI o Tailwind, FastAPI o Node.js en el backend, PostgreSQL y Vercel/AWS para deploy.` },
        { q: `¿El sitio estará optimizado para Google?`, a: `Sí. Implementamos SEO técnico: metadata dinámica, Schema.org, sitemap, robots.txt y Core Web Vitals optimizados.` },
        { q: `¿Qué pasa después de la entrega?`, a: `Ofrecemos soporte post-lanzamiento de 30 a 90 días según el plan. También tenemos planes de mantenimiento mensual.` },
    ] },
    form: { title: 'Cuéntanos tu proyecto', subtitle: 'Te respondemos en menos de 24 horas.', name: 'Tu nombre', email: 'Email empresarial', company: 'Empresa', useCase: '¿Qué quieres construir?', submit: 'Enviar →', loading: 'Enviando...', success: '¡Recibido! Te contactamos pronto.' },
    finalCta: { title: '¿Listo para lanzar tu proyecto web?', subtitle: 'Primera reunión gratuita. Presupuesto en 48 horas.', cta: 'Agendar reunión gratuita', note: 'Sin compromiso · Respuesta en 24h' },
    sticky: 'Agendar consulta gratuita',
  },
  en: {
    badge: 'Service · Web & SaaS',
    breadcrumb: { home: 'Home', services: 'Services', current: 'Web / SaaS' },
    hero: { title: 'Your digital business,', titleAccent: 'fast and scalable.', subtitle: 'We build web platforms and SaaS that convert visitors into clients. From landing pages to multi-tenant apps with payments and authentication.', cta: 'Schedule free consultation', ctaSub: 'View pricing' },
    social: '6 companies launched their SaaS with us this year',
    includes: { title: 'What\'s included?', items: [
        { icon: '🎨', title: 'UI/UX Design', desc: 'Modern interfaces with Figma, adapted to your brand and optimized for conversion.' },
        { icon: '⚡', title: 'Next.js 15', desc: 'Ultra-fast frontend with SSR, SSG and ISR. Green Core Web Vitals from day one.' },
        { icon: '🔐', title: 'Authentication', desc: 'Login with email, Google, GitHub. Granular roles and permissions from the start.' },
        { icon: '💳', title: 'Stripe Payments', desc: 'Subscriptions, one-time payments, free trials and automatic billing.' },
        { icon: '📊', title: 'Analytics Dashboard', desc: 'Admin panel with usage metrics, active users and revenue in real time.' },
        { icon: '🚀', title: 'Automated Deploy', desc: 'CI/CD with Vercel or AWS. Your team pushes and in minutes it\'s live.' },
    ] },
    useCases: { title: 'Who is this for', items: [
        { icon: '🛍️', profile: 'B2B E-commerce', pain: 'Your catalog in Excel', solution: 'Platform with digital catalog, orders and invoices', result: 'Reduce the sales cycle by 50%' },
        { icon: '📚', profile: 'Educational Platform', pain: 'You manage students on WhatsApp', solution: 'SaaS with courses, automatic payments and progress tracking', result: '3x more students with the same team' },
        { icon: '🏢', profile: 'Internal Portal', pain: 'Critical processes in shared spreadsheets', solution: 'Web app with roles, approval flows and audit', result: 'Eliminate errors and accelerate operations' },
        { icon: '📈', profile: 'SaaS Tool', pain: 'Product idea without knowing how to build it', solution: 'Functional MVP in 8 weeks ready for first users', result: 'From idea to revenue in less than 3 months' },
    ] },
    results: { title: 'Results we deliver', items: [
        { value: '99.9%', label: 'Guaranteed uptime', sub: 'Resilient infrastructure' },
        { value: '3x', label: 'More conversion', sub: 'vs static sites' },
        { value: '<1s', label: 'Load time', sub: 'Green Core Web Vitals' },
        { value: '8 wks', label: 'Time to production', sub: 'Functional MVP' },
    ] },
    pricing: { title: 'Web & SaaS Plans', subtitle: 'Prices in USD. Include design, development and initial deploy.', tiers: [
        { name: 'Landing / Website', tagline: 'Landing / Website', price: '$3,000', range: '– $8,000 USD', time: '3–5 weeks', color: '#6366F1', featured: false, features: ['Custom design', 'Up to 10 sections', 'Contact form', 'Basic technical SEO', 'Integrated analytics', '1 year hosting included'], cta: 'Request proposal' },
        { name: 'Web App / SaaS MVP', tagline: 'Web App / SaaS MVP', price: '$10,000', range: '– $25,000 USD', time: '8–12 weeks', color: '#00AEEF', featured: true, features: ['Full authentication', 'User dashboard', 'Stripe integration', 'Documented REST API', 'Admin panel', 'CI/CD Deploy', '90-day support'], cta: 'Most requested' },
        { name: 'Full SaaS', tagline: 'Full SaaS', price: 'From $25,000', range: 'USD', time: '3–5 months', color: '#7C3AED', featured: false, features: ['Multi-tenant architecture', 'Plans and subscriptions', 'Advanced analytics', 'API integrations', 'Cloud infrastructure', 'Guaranteed SLA', 'Dedicated team'], cta: 'Talk to the team' },
    ] },
    faq: { title: 'Frequently asked questions', items: [
        { q: `How long until my site is ready?`, a: `A website takes 3-5 weeks. A SaaS MVP with authentication and payments takes 8-12 weeks.` },
        { q: `Can I edit the content myself?`, a: `Yes. We integrate a headless CMS or deliver code with documentation so your team can modify it.` },
        { q: `What technologies do you use?`, a: `Next.js 15, TypeScript, MUI or Tailwind, FastAPI or Node.js on the backend, PostgreSQL and Vercel/AWS for deploy.` },
        { q: `Will the site be optimized for Google?`, a: `Yes. We implement technical SEO: dynamic metadata, Schema.org, sitemap, robots.txt and optimized Core Web Vitals.` },
        { q: `What happens after delivery?`, a: `We offer 30 to 90 days post-launch support depending on the plan. We also have monthly maintenance plans.` },
    ] },
    form: { title: 'Tell us about your project', subtitle: 'We respond in less than 24 hours.', name: 'Your name', email: 'Business email', company: 'Company', useCase: 'What do you want to build?', submit: 'Send →', loading: 'Sending...', success: 'Received! We\'ll contact you soon.' },
    finalCta: { title: 'Ready to launch your web project?', subtitle: 'Free first meeting. Quote in 48 hours.', cta: 'Schedule free meeting', note: 'No commitment · Response in 24h' },
    sticky: 'Schedule free consultation',
  },
  fr: {
    badge: 'Service · Web & SaaS',
    breadcrumb: { home: 'Accueil', services: 'Services', current: 'Web / SaaS' },
    hero: { title: 'Votre business digital,', titleAccent: 'rapide et évolutif.', subtitle: 'Nous développons des plateformes web et SaaS qui convertissent les visiteurs en clients. Des landing pages aux applications multi-tenant avec paiements et authentification.', cta: 'Planifier une consultation gratuite', ctaSub: 'Voir les tarifs' },
    social: '6 entreprises ont lancé leur SaaS avec nous cette année',
    includes: { title: 'Qu\'est-ce qui est inclus ?', items: [
        { icon: '🎨', title: 'Design UI/UX', desc: 'Interfaces modernes avec Figma, adaptées à votre marque et optimisées pour la conversion.' },
        { icon: '⚡', title: 'Next.js 15', desc: 'Frontend ultra-rapide avec SSR, SSG et ISR. Core Web Vitals au vert dès le premier jour.' },
        { icon: '🔐', title: 'Authentification', desc: 'Login avec email, Google, GitHub. Rôles et permissions granulaires dès le départ.' },
        { icon: '💳', title: 'Paiements Stripe', desc: 'Abonnements, paiements uniques, essais gratuits et gestion de facturation automatique.' },
        { icon: '📊', title: 'Tableau de bord', desc: 'Panel d\'administration avec métriques d\'utilisation, utilisateurs actifs et revenus en temps réel.' },
        { icon: '🚀', title: 'Déploiement auto', desc: 'CI/CD avec Vercel ou AWS. Votre équipe pousse et en quelques minutes c\'est en production.' },
    ] },
    useCases: { title: 'Pour qui est-ce fait', items: [
        { icon: '🛍️', profile: 'E-commerce B2B', pain: 'Votre catalogue dans Excel', solution: 'Plateforme avec catalogue digital, commandes et factures', result: 'Réduisez le cycle de vente de 50%' },
        { icon: '📚', profile: 'Plateforme éducative', pain: 'Vous gérez les étudiants sur WhatsApp', solution: 'SaaS avec cours, paiements automatiques et suivi de progression', result: '3x plus d\'étudiants avec la même équipe' },
        { icon: '🏢', profile: 'Portail interne', pain: 'Processus critiques dans des feuilles de calcul', solution: 'Application web avec rôles, flux d\'approbation et audit', result: 'Éliminez les erreurs et accélérez les opérations' },
        { icon: '📈', profile: 'Outil SaaS', pain: 'Idée de produit sans savoir comment la construire', solution: 'MVP fonctionnel en 8 semaines prêt pour les premiers utilisateurs', result: 'De l\'idée au revenu en moins de 3 mois' },
    ] },
    results: { title: 'Résultats que nous livrons', items: [
        { value: '99.9%', label: 'Disponibilité garantie', sub: 'Infrastructure résiliente' },
        { value: '3x', label: 'Plus de conversion', sub: 'vs sites statiques' },
        { value: '<1s', label: 'Temps de chargement', sub: 'Core Web Vitals au vert' },
        { value: '8 sem', label: 'Temps de production', sub: 'MVP fonctionnel' },
    ] },
    pricing: { title: 'Plans Web & SaaS', subtitle: 'Prix en USD. Incluent design, développement et déploiement initial.', tiers: [
        { name: 'Landing / Site web', tagline: 'Landing / Site web', price: '3 000 $', range: '– 8 000 $ USD', time: '3–5 semaines', color: '#6366F1', featured: false, features: ['Design personnalisé', 'Jusqu\'à 10 sections', 'Formulaire de contact', 'SEO technique de base', 'Analytics intégré', 'Hébergement 1 an inclus'], cta: 'Demander une proposition' },
        { name: 'Web App / MVP SaaS', tagline: 'Web App / MVP SaaS', price: '10 000 $', range: '– 25 000 $ USD', time: '8–12 semaines', color: '#00AEEF', featured: true, features: ['Authentification complète', 'Tableau de bord utilisateur', 'Intégration Stripe', 'API REST documentée', 'Panel d\'administration', 'Deploy CI/CD', 'Support 90 jours'], cta: 'Le plus demandé' },
        { name: 'SaaS Complet', tagline: 'SaaS Complet', price: 'À partir de 25 000 $', range: 'USD', time: '3–5 mois', color: '#7C3AED', featured: false, features: ['Architecture multi-tenant', 'Plans et abonnements', 'Analytics avancé', 'Intégrations API', 'Infrastructure cloud', 'SLA garanti', 'Équipe dédiée'], cta: 'Parler à l\'équipe' },
    ] },
    faq: { title: 'Questions fréquentes', items: [
        { q: `Combien de temps pour avoir mon site ?`, a: `Un site web prend 3-5 semaines. Un MVP SaaS avec authentification et paiements entre 8-12 semaines.` },
        { q: `Puis-je modifier le contenu moi-même ?`, a: `Oui. Nous intégrons un CMS headless ou livrons le code avec documentation pour que votre équipe puisse le modifier.` },
        { q: `Quelles technologies utilisez-vous ?`, a: `Next.js 15, TypeScript, MUI ou Tailwind, FastAPI ou Node.js côté backend, PostgreSQL et Vercel/AWS pour le déploiement.` },
        { q: `Le site sera-t-il optimisé pour Google ?`, a: `Oui. Nous implémentons le SEO technique : métadonnées dynamiques, Schema.org, sitemap, robots.txt et Core Web Vitals optimisés.` },
        { q: `Que se passe-t-il après la livraison ?`, a: `Nous offrons un support post-lancement de 30 à 90 jours selon le plan. Nous avons aussi des plans de maintenance mensuelle.` },
    ] },
    form: { title: 'Parlez-nous de votre projet', subtitle: 'Nous répondons en moins de 24 heures.', name: 'Votre nom', email: 'Email professionnel', company: 'Entreprise', useCase: 'Que voulez-vous construire ?', submit: 'Envoyer →', loading: 'Envoi...', success: 'Reçu ! Nous vous contactons bientôt.' },
    finalCta: { title: 'Prêt à lancer votre projet web ?', subtitle: 'Première réunion gratuite. Devis en 48 heures.', cta: 'Planifier une réunion gratuite', note: 'Sans engagement · Réponse en 24h' },
    sticky: 'Planifier une consultation gratuite',
  },
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'web-saas',
    icon: <span style={{ fontSize: '12px' }}>🌐</span>,
  }
  return <ServicePageTemplate t={t} />
}