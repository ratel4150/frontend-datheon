// File: frontend-datheon/src/app/(lang)/[lang]/servicios/cloud-devops/Servicepagecontent.tsx
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {
    badge: 'Servicio · Cloud & DevOps',
    breadcrumb: { home: 'Inicio', services: 'Servicios', current: 'Cloud & DevOps' },
    hero: { title: 'Infraestructura que', titleAccent: 'escala sin fricciones.', subtitle: 'Diseñamos, migramos y operamos tu infraestructura en la nube. Kubernetes, Terraform, CI/CD y observabilidad para que tu equipo se enfoque en el producto.', cta: 'Agendar auditoría gratuita', ctaSub: 'Ver precios' },
    social: '5 startups migraron a cloud con cero downtime este año',
    includes: { title: '¿Qué incluye?', items: [
      { icon: '🏗️', title: 'Infraestructura como código', desc: 'Terraform + Ansible para reproducir tu entorno en minutos, no en días.' },
      { icon: '🐳', title: 'Contenedores', desc: 'Docker + Kubernetes para despliegues confiables y escalado automático.' },
      { icon: '🔄', title: 'CI/CD pipelines', desc: 'GitHub Actions o GitLab CI configurados para deploy automático con rollback.' },
      { icon: '📊', title: 'Observabilidad', desc: 'Prometheus + Grafana + alertas para saber qué pasa antes de que tus usuarios lo reporten.' },
      { icon: '🔒', title: 'Seguridad cloud', desc: 'IAM, secrets management, scanning de vulnerabilidades y hardening de contenedores.' },
      { icon: '💰', title: 'Optimización de costos', desc: 'Rightsizing y reservas para reducir tu factura de AWS/GCP/Azure un 25-40%.' },
    ]},
    useCases: { title: 'Para quién es esto', items: [
      { icon: '🚀', profile: 'Startup en crecimiento', pain: 'Servidor VPS que se cae en picos de tráfico', solution: 'Kubernetes en AWS/GCP con auto-scaling y CDN global', result: 'Cero downtime en picos + 60% menos costo' },
      { icon: '🏢', profile: 'Empresa con monolito legacy', pain: 'Deploy manual que tarda horas y genera errores', solution: 'Contenedorización + CI/CD automatizado con staging y rollback', result: 'Deploy en minutos con confianza total' },
      { icon: '🔐', profile: 'Empresa con compliance', pain: 'Infraestructura sin auditoría ni control de accesos', solution: 'VPC privada, IAM granular, logs de auditoría y encryption at rest', result: 'Pasa auditorías SOC2/ISO27001 sin estrés' },
      { icon: '💸', profile: 'Empresa con factura cloud alta', pain: 'AWS bill de $10K/mes sin saber por qué', solution: 'Análisis de costos, rightsizing y reservas programadas', result: 'Reducción promedio del 35% en la factura' },
    ]},
    results: { title: 'Lo que logramos', items: [
      { value: '99.99%', label: 'SLA alcanzable', sub: 'Con arquitectura correcta' },
      { value: '35%', label: 'Reducción de costos', sub: 'Promedio cloud bill' },
      { value: '10min', label: 'Deploy promedio', sub: 'Con CI/CD bien configurado' },
      { value: '0', label: 'Downtime en deploy', sub: 'Blue-green deployment' },
    ]},
    pricing: { title: 'Planes Cloud & DevOps', subtitle: 'Precios en USD. El plan Managed es mensual recurrente.', tiers: [
      { name: 'Cloud Setup', tagline: 'Para empezar bien desde el inicio', price: '$4,000', range: '– $10,000 USD', time: '3–4 semanas', color: '#0EA5E9', featured: false, features: ['Revisión de arquitectura actual', 'Docker + compose', 'Pipeline CI/CD básico', 'Monitoreo con Grafana', 'Documentación completa', '2 semanas de soporte'], cta: 'Solicitar auditoría' },
      { name: 'Cloud Completo', tagline: 'Para producción robusta y escalable', price: '$10,000', range: '– $25,000 USD', time: '6–10 semanas', color: '#6366F1', featured: true, features: ['Infraestructura Terraform', 'Kubernetes en cloud', 'CI/CD avanzado con rollback', 'Observabilidad completa', 'Seguridad IAM + secrets', 'Optimización de costos', 'Soporte 90 días'], cta: 'El más solicitado' },
      { name: 'DevOps Managed', tagline: 'Para operar sin preocupaciones', price: 'Desde $3,000', range: 'USD/mes', time: 'Contrato mensual', color: '#10B981', featured: false, features: ['SRE dedicado part-time', 'Monitoreo 24/7', 'Incident response', 'Optimización continua', 'Capacitación del equipo', 'SLA garantizado'], cta: 'Hablar con el equipo' },
    ]},
    faq: { title: 'Preguntas frecuentes', items: [
      { q: '¿En qué clouds trabajan?', a: 'AWS principalmente, pero también GCP y Azure. Elegimos según tu caso de uso, presupuesto y donde ya tienes cuentas.' },
      { q: '¿Pueden migrar mi app sin downtime?', a: 'Sí. Usamos estrategias blue-green o canary deployment para migraciones sin interrupción del servicio.' },
      { q: '¿Necesito saber de DevOps?', a: 'No. Configuramos todo y te documentamos cada decisión. Si quieres aprender, hacemos pair programming con tu equipo.' },
      { q: '¿Cuánto pueden reducir mi factura de cloud?', a: 'Depende del estado actual, pero en promedio reducimos 25-40% revisando instancias, reservas y recursos huérfanos.' },
      { q: '¿Qué pasa si algo se cae a las 3am?', a: 'Con el servicio Managed DevOps tienes alertas automáticas y SLA de respuesta. Para proyectos de setup, entregamos el playbook completo.' },
    ]},
    form: { title: 'Cuéntanos tu infraestructura actual', subtitle: 'Te respondemos en menos de 24 horas.', name: 'Tu nombre', email: 'Email empresarial', company: 'Empresa', useCase: '¿Cuál es tu mayor dolor con cloud/DevOps?', submit: 'Enviar →', loading: 'Enviando...', success: '¡Recibido! Te contactamos pronto.' },
    finalCta: { title: '¿Listo para infraestructura que no te quite el sueño?', subtitle: 'Auditoría gratuita de tu infraestructura actual. Sin compromiso.', cta: 'Agendar auditoría gratuita', note: 'Sin compromiso · Respuesta en 24h' },
    sticky: 'Agendar auditoría cloud gratuita',
  },
  en: {
    badge: 'Service · Cloud & DevOps',
    breadcrumb: { home: 'Home', services: 'Services', current: 'Cloud & DevOps' },
    hero: { title: 'Infrastructure that', titleAccent: 'scales without friction.', subtitle: 'We design, migrate and operate your cloud infrastructure. Kubernetes, Terraform, CI/CD and observability so your team can focus on the product.', cta: 'Schedule free audit', ctaSub: 'View pricing' },
    social: '5 startups migrated to cloud with zero downtime this year',
    includes: { title: "What's included?", items: [
      { icon: '🏗️', title: 'Infrastructure as code', desc: 'Terraform + Ansible to reproduce your environment in minutes, not days.' },
      { icon: '🐳', title: 'Containers', desc: 'Docker + Kubernetes for reliable deployments and automatic scaling.' },
      { icon: '🔄', title: 'CI/CD pipelines', desc: 'GitHub Actions or GitLab CI configured for automatic deploy with rollback.' },
      { icon: '📊', title: 'Observability', desc: "Prometheus + Grafana + alerts to know what's happening before your users report it." },
      { icon: '🔒', title: 'Cloud security', desc: 'IAM, secrets management, vulnerability scanning and container hardening.' },
      { icon: '💰', title: 'Cost optimization', desc: 'Rightsizing and reservations to reduce your AWS/GCP/Azure bill by 25-40%.' },
    ]},
    useCases: { title: 'Who is this for', items: [
      { icon: '🚀', profile: 'Growing startup', pain: 'VPS server that crashes on traffic spikes', solution: 'Kubernetes on AWS/GCP with auto-scaling and global CDN', result: 'Zero downtime on spikes + 60% less cost' },
      { icon: '🏢', profile: 'Company with legacy monolith', pain: 'Manual deploy that takes hours and generates errors', solution: 'Containerization + automated CI/CD with staging and rollback', result: 'Deploy in minutes with full confidence' },
      { icon: '🔐', profile: 'Company with compliance requirements', pain: 'Infrastructure without audit or access controls', solution: 'Private VPC, granular IAM, audit logs and encryption at rest', result: 'Pass SOC2/ISO27001 audits without stress' },
      { icon: '💸', profile: 'Company with high cloud bill', pain: '$10K/month AWS bill without knowing why', solution: 'Cost analysis, rightsizing and scheduled reservations', result: 'Average 35% reduction in the bill' },
    ]},
    results: { title: 'What we achieve', items: [
      { value: '99.99%', label: 'Achievable SLA', sub: 'With correct architecture' },
      { value: '35%', label: 'Cost reduction', sub: 'Average cloud bill' },
      { value: '10min', label: 'Average deploy', sub: 'With well-configured CI/CD' },
      { value: '0', label: 'Deploy downtime', sub: 'Blue-green deployment' },
    ]},
    pricing: { title: 'Cloud & DevOps Plans', subtitle: 'Prices in USD. The Managed plan is monthly recurring.', tiers: [
      { name: 'Cloud Setup', tagline: 'To start right from the beginning', price: '$4,000', range: '– $10,000 USD', time: '3–4 weeks', color: '#0EA5E9', featured: false, features: ['Current architecture review', 'Docker + compose', 'Basic CI/CD pipeline', 'Grafana monitoring', 'Complete documentation', '2 weeks support'], cta: 'Request audit' },
      { name: 'Full Cloud', tagline: 'For robust and scalable production', price: '$10,000', range: '– $25,000 USD', time: '6–10 weeks', color: '#6366F1', featured: true, features: ['Terraform infrastructure', 'Kubernetes on cloud', 'Advanced CI/CD with rollback', 'Full observability', 'IAM + secrets security', 'Cost optimization', '90-day support'], cta: 'Most requested' },
      { name: 'Managed DevOps', tagline: 'To operate without worries', price: 'From $3,000', range: 'USD/month', time: 'Monthly contract', color: '#10B981', featured: false, features: ['Part-time dedicated SRE', '24/7 monitoring', 'Incident response', 'Continuous optimization', 'Team training', 'Guaranteed SLA'], cta: 'Talk to the team' },
    ]},
    faq: { title: 'Frequently asked questions', items: [
      { q: 'What clouds do you work with?', a: 'Mainly AWS, but also GCP and Azure. We choose based on your use case, budget and where you already have accounts.' },
      { q: 'Can you migrate my app without downtime?', a: 'Yes. We use blue-green or canary deployment strategies for migrations without service interruption.' },
      { q: 'Do I need to know DevOps?', a: 'No. We configure everything and document each decision. If you want to learn, we do pair programming with your team.' },
      { q: 'How much can you reduce my cloud bill?', a: 'We typically reduce 25-40% of the bill by reviewing instances, reservations and orphaned resources.' },
      { q: 'What if something crashes at 3am?', a: 'With our Managed DevOps service you have automatic alerts and response SLA. For setup projects, we deliver the complete playbook.' },
    ]},
    form: { title: 'Tell us about your current infrastructure', subtitle: 'We respond in less than 24 hours.', name: 'Your name', email: 'Business email', company: 'Company', useCase: 'What is your biggest pain with cloud/DevOps?', submit: 'Send →', loading: 'Sending...', success: "Received! We'll contact you soon." },
    finalCta: { title: "Ready for infrastructure that doesn't keep you up at night?", subtitle: 'Free audit of your current infrastructure. No commitment.', cta: 'Schedule free audit', note: 'No commitment · Response in 24h' },
    sticky: 'Schedule free cloud audit',
  },
  fr: {
    badge: 'Service · Cloud & DevOps',
    breadcrumb: { home: 'Accueil', services: 'Services', current: 'Cloud & DevOps' },
    hero: { title: 'Infrastructure qui', titleAccent: 'monte en charge sans friction.', subtitle: "Nous concevons, migrons et opérons votre infrastructure cloud. Kubernetes, Terraform, CI/CD et observabilité pour que votre équipe se concentre sur le produit.", cta: 'Planifier un audit gratuit', ctaSub: 'Voir les tarifs' },
    social: "5 startups ont migré vers le cloud avec zéro temps d'arrêt cette année",
    includes: { title: "Qu'est-ce qui est inclus ?", items: [
      { icon: '🏗️', title: 'Infrastructure as code', desc: 'Terraform + Ansible pour reproduire votre environnement en minutes, pas en jours.' },
      { icon: '🐳', title: 'Conteneurs', desc: 'Docker + Kubernetes pour des déploiements fiables et une mise à l\'échelle automatique.' },
      { icon: '🔄', title: 'Pipelines CI/CD', desc: 'GitHub Actions ou GitLab CI configurés pour le déploiement automatique avec rollback.' },
      { icon: '📊', title: 'Observabilité', desc: 'Prometheus + Grafana + alertes pour savoir ce qui se passe avant que vos utilisateurs le signalent.' },
      { icon: '🔒', title: 'Sécurité cloud', desc: 'IAM, gestion des secrets, analyse de vulnérabilités et durcissement des conteneurs.' },
      { icon: '💰', title: 'Optimisation des coûts', desc: 'Rightsizing et réservations pour réduire votre facture AWS/GCP/Azure de 25-40%.' },
    ]},
    useCases: { title: 'Pour qui est-ce fait', items: [
      { icon: '🚀', profile: 'Startup en croissance', pain: 'Serveur VPS qui tombe lors des pics de trafic', solution: 'Kubernetes sur AWS/GCP avec auto-scaling et CDN global', result: "Zéro temps d'arrêt en pic + 60% moins de coût" },
      { icon: '🏢', profile: 'Entreprise avec monolithe legacy', pain: 'Déploiement manuel qui prend des heures et génère des erreurs', solution: 'Conteneurisation + CI/CD automatisé avec staging et rollback', result: 'Déploiement en minutes avec pleine confiance' },
      { icon: '🔐', profile: 'Entreprise avec conformité', pain: "Infrastructure sans audit ni contrôles d'accès", solution: 'VPC privé, IAM granulaire, logs d\'audit et chiffrement au repos', result: 'Passez les audits SOC2/ISO27001 sans stress' },
      { icon: '💸', profile: 'Entreprise avec facture cloud élevée', pain: "Facture AWS de 10K$/mois sans savoir pourquoi", solution: 'Analyse des coûts, rightsizing et réservations programmées', result: 'Réduction moyenne de 35% de la facture' },
    ]},
    results: { title: 'Ce que nous réalisons', items: [
      { value: '99.99%', label: 'SLA réalisable', sub: 'Avec la bonne architecture' },
      { value: '35%', label: 'Réduction des coûts', sub: 'Facture cloud moyenne' },
      { value: '10min', label: 'Déploiement moyen', sub: 'Avec CI/CD bien configuré' },
      { value: '0', label: "Temps d'arrêt", sub: 'Déploiement blue-green' },
    ]},
    pricing: { title: 'Plans Cloud & DevOps', subtitle: 'Prix en USD. Le plan Géré est mensuel récurrent.', tiers: [
      { name: 'Cloud Setup', tagline: 'Pour bien démarrer depuis le début', price: '4 000 $', range: '– 10 000 $ USD', time: '3–4 semaines', color: '#0EA5E9', featured: false, features: ["Révision de l'architecture actuelle", 'Docker + compose', 'Pipeline CI/CD de base', 'Surveillance avec Grafana', 'Documentation complète', '2 semaines de support'], cta: 'Demander un audit' },
      { name: 'Cloud Complet', tagline: 'Pour une production robuste et évolutive', price: '10 000 $', range: '– 25 000 $ USD', time: '6–10 semaines', color: '#6366F1', featured: true, features: ['Infrastructure Terraform', 'Kubernetes dans le cloud', 'CI/CD avancé avec rollback', 'Observabilité complète', 'Sécurité IAM + secrets', 'Optimisation des coûts', 'Support 90 jours'], cta: 'Le plus demandé' },
      { name: 'DevOps Géré', tagline: 'Pour opérer sans soucis', price: 'À partir de 3 000 $', range: 'USD/mois', time: 'Contrat mensuel', color: '#10B981', featured: false, features: ['SRE dédié à temps partiel', 'Surveillance 24/7', 'Réponse aux incidents', 'Optimisation continue', "Formation de l'équipe", 'SLA garanti'], cta: "Parler à l'équipe" },
    ]},
    faq: { title: 'Questions fréquentes', items: [
      { q: 'Avec quels clouds travaillez-vous ?', a: "Principalement AWS, mais aussi GCP et Azure. Nous choisissons selon votre cas d'utilisation, budget et où vous avez déjà des comptes." },
      { q: "Pouvez-vous migrer mon app sans temps d'arrêt ?", a: 'Oui. Nous utilisons des stratégies de déploiement blue-green ou canary pour les migrations sans interruption de service.' },
      { q: 'Dois-je connaître DevOps ?', a: "Non. Nous configurons tout et documentons chaque décision. Si vous voulez apprendre, nous faisons du pair programming avec votre équipe." },
      { q: 'Combien pouvez-vous réduire ma facture cloud ?', a: "Nous réduisons en moyenne 25-40% de la facture en révisant les instances, réservations et ressources orphelines." },
      { q: "Que se passe-t-il si quelque chose tombe à 3h du matin ?", a: "Avec notre service DevOps Géré, vous avez des alertes automatiques et un SLA de réponse. Pour les projets de setup, nous livrons le playbook complet." },
    ]},
    form: { title: 'Parlez-nous de votre infrastructure actuelle', subtitle: 'Nous répondons en moins de 24 heures.', name: 'Votre nom', email: 'Email professionnel', company: 'Entreprise', useCase: 'Quel est votre plus grand problème avec cloud/DevOps ?', submit: 'Envoyer →', loading: 'Envoi...', success: 'Reçu ! Nous vous contactons bientôt.' },
    finalCta: { title: "Prêt pour une infrastructure qui ne vous empêche pas de dormir ?", subtitle: "Audit gratuit de votre infrastructure actuelle. Sans engagement.", cta: 'Planifier un audit gratuit', note: 'Sans engagement · Réponse en 24h' },
    sticky: 'Planifier un audit cloud gratuit',
  },
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: 'cloud-devops',
    icon: <span style={{ fontSize: '12px' }}>☁️</span>,
  }
  return <ServicePageTemplate t={t} />
}