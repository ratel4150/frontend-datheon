// File: frontend-datheon/src/app/(lang)/[lang]/servicios/agentes-autonomos/AgentesClient.tsx
'use client'

import {
  Box, Container, Typography, Button, alpha, Slider, TextField,
} from '@mui/material'
import {
  FiCalendar, FiArrowRight, FiCheck, FiZap, FiMail,
  FiCpu, FiDatabase, FiGlobe, FiCode, FiTrendingUp,
  FiStar, FiExternalLink,
} from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

const C = {
  bg: '#FFFFFF', bgAlt: '#F7FBFF', bgDark: '#0A0C10',
  border: '#ebebeb', text: '#0B0F2B', textMid: '#4A5068', textMute: '#8891AA',
  accent: '#00AEEF', accentDk: '#0095cc',
  accentBg: 'rgba(0,174,239,0.07)', accentLine: 'rgba(0,174,239,0.22)',
  gold: '#F59E0B', green: '#22C55E',
} as const

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

const content = {
  es: {
    badge: 'Servicio · AI & Agentes',
    title: 'Agentes Autónomos',
    titleAccent: 'con IA',
    subtitle: 'Sistemas de IA que ejecutan tareas complejas de forma autónoma, sin intervención humana. Desde atención al cliente hasta automatización de procesos críticos.',
    social: '4 empresas contrataron este servicio este mes',
    breadcrumb: { home: 'Inicio', services: 'Servicios', current: 'Agentes Autónomos' },
    includes: {
      title: '¿Qué incluye?',
      items: [
        { icon: <FiCpu size={16}/>, title: 'Agente RAG personalizado', desc: 'Entrenado sobre tu documentación, base de conocimiento y procesos internos.' },
        { icon: <FiDatabase size={16}/>, title: 'Base de conocimiento vectorial', desc: 'pgvector + embeddings para búsqueda semántica ultrarrápida.' },
        { icon: <FiGlobe size={16}/>, title: 'Integraciones API', desc: 'Conexión con CRM, ERP, WhatsApp, Slack, email y cualquier sistema existente.' },
        { icon: <FiZap size={16}/>, title: 'Automatización de flujos', desc: '29+ automatizaciones con n8n: escalación, reportes, alertas, handoffs.' },
        { icon: <FiCode size={16}/>, title: 'Dashboard de control', desc: 'Panel web para monitorear, configurar y analizar el comportamiento del agente.' },
        { icon: <FiTrendingUp size={16}/>, title: 'Métricas e impacto', desc: 'Reportes de resolución automática, satisfacción y ahorro de horas.' },
      ],
    },
    useCases: {
      title: 'Casos de uso',
      items: [
        { icon: '🎫', title: 'Soporte al cliente 24/7', desc: 'El agente resuelve tickets automáticamente, clasifica por prioridad y escala cuando es necesario.' },
        { icon: '📋', title: 'Onboarding automatizado', desc: 'Guía a nuevos usuarios o empleados a través de procesos sin intervención humana.' },
        { icon: '🔍', title: 'Búsqueda en documentos', desc: 'El agente responde preguntas sobre contratos, manuales, normativas o cualquier documento interno.' },
        { icon: '📊', title: 'Reportes automáticos', desc: 'Genera reportes diarios, semanales y alertas de anomalías sin trabajo manual.' },
      ],
    },
    caseStudy: {
      badge: 'Caso de éxito real',
      company: 'HydraSupport AI',
      description: 'Plataforma SaaS de helpdesk con IA que automatiza el soporte al cliente de principio a fin.',
      stats: [
        { value: '29+', label: 'Automatizaciones activas' },
        { value: '80%', label: 'Tickets resueltos sin humano' },
        { value: '4', label: 'Planes de suscripción' },
        { value: '24/7', label: 'Disponibilidad' },
      ],
      tech: ['FastAPI', 'PostgreSQL', 'Ollama (Llama3)', 'n8n', 'React', 'Stripe'],
      features: [
        'Clasificación automática por categoría y prioridad',
        'Análisis de sentimiento en tiempo real',
        'Detección de clientes frustrados',
        'Resolución automática de casos comunes',
        'Handoff inteligente entre agentes',
        'Reportes semanales automatizados',
      ],
      cta: 'Ver HydraSupport AI →',
      href: 'https://hydra-support-h2bto9ue1-ratel4150s-projects.vercel.app',
    },
    pricing: {
      title: 'Inversión',
      subtitle: 'Precios referenciales en USD. Propuesta personalizada gratuita.',
      tiers: [
        { name: 'Starter', price: '$8,000', suffix: '– $15,000 USD', time: '4–6 semanas', color: '#6366F1', featured: false,
          desc: 'Para empresas que quieren automatizar un flujo específico con IA.',
          features: ['Agente RAG con 1 base de conocimiento', 'Hasta 3 integraciones API', 'Dashboard básico de monitoreo', '5 automatizaciones n8n', 'Soporte 30 días post-lanzamiento'],
          cta: 'Solicitar propuesta' },
        { name: 'Growth', price: '$15,000', suffix: '– $35,000 USD', time: '8–12 semanas', color: '#00AEEF', featured: true,
          desc: 'Para empresas que quieren automatizar múltiples procesos con agentes coordinados.',
          features: ['Multi-agente con coordinación entre ellos', 'RAG avanzado con múltiples fuentes', 'Integraciones ilimitadas', '15+ automatizaciones n8n', 'Dashboard completo con analytics', 'Fine-tuning del modelo', 'Soporte 90 días post-lanzamiento'],
          cta: 'El más solicitado' },
        { name: 'Enterprise', price: 'Desde $35,000', suffix: 'USD', time: '3–6 meses', color: '#7C3AED', featured: false,
          desc: 'Para grandes empresas con procesos complejos y requisitos de seguridad avanzados.',
          features: ['Arquitectura multi-agente compleja', 'Deployment on-premise o cloud privado', 'Compliance y auditoría (ISO 27001)', '29+ automatizaciones personalizadas', 'SLA garantizado', 'Equipo dedicado', 'Soporte indefinido con SLA'],
          cta: 'Hablar con el equipo' },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        { q: '¿Cuánto tiempo tarda en estar listo el agente?', a: 'El tier Starter puede estar en producción en 4-6 semanas. Incluye la fase de descubrimiento, entrenamiento del agente con tu documentación, integración y pruebas.' },
        { q: '¿El agente puede conectarse con mi CRM/ERP actual?', a: 'Sí. Nos integramos con Salesforce, HubSpot, Odoo, SAP, y cualquier sistema que tenga API REST. Si no tiene API, usamos RPA para automatizar igual.' },
        { q: '¿Qué pasa si el agente no sabe responder algo?', a: 'El agente detecta cuando no tiene suficiente contexto y escala a un humano de forma transparente, con todo el contexto de la conversación incluido.' },
        { q: '¿Los datos de mi empresa están seguros?', a: 'Sí. Los embeddings y documentos se guardan en tu propia base de datos. Nunca usamos tus datos para entrenar modelos de terceros.' },
        { q: '¿Puedo ver métricas de lo que hace el agente?', a: 'Incluimos un dashboard con tasa de resolución automática, sentimiento de usuarios, tickets por categoría y ahorro estimado de horas por semana.' },
      ],
    },
    form: { title: 'Cuéntanos tu caso', subtitle: 'Te respondemos en menos de 24 horas con una propuesta.', name: 'Tu nombre', email: 'Email empresarial', company: 'Empresa', useCase: '¿Qué quieres automatizar?', submit: 'Enviar →', loading: 'Enviando...', success: '¡Recibido! Te contactamos pronto.' },
    roi: { title: 'Calcula tu ahorro', agents: 'Agentes de soporte', tickets: 'Tickets por mes', hourly: 'Costo por hora (USD)', hours: 'Horas por ticket', automation: 'Automatización estimada', saving: 'Ahorro mensual estimado', annual: 'Ahorro anual estimado', payback: 'ROI en', months: 'meses' },
    sticky: 'Agendar consulta gratuita',
  },
  en: {
    badge: 'Service · AI & Agents',
    title: 'Autonomous Agents',
    titleAccent: 'with AI',
    subtitle: 'AI systems that execute complex tasks autonomously. From customer support to critical process automation.',
    social: '4 companies hired this service this month',
    breadcrumb: { home: 'Home', services: 'Services', current: 'Autonomous Agents' },
    includes: {
      title: "What's included?",
      items: [
        { icon: <FiCpu size={16}/>, title: 'Custom RAG Agent', desc: 'Trained on your documentation, knowledge base, and internal processes.' },
        { icon: <FiDatabase size={16}/>, title: 'Vector Knowledge Base', desc: 'pgvector + embeddings for ultra-fast semantic search.' },
        { icon: <FiGlobe size={16}/>, title: 'API Integrations', desc: 'Connect with CRM, ERP, WhatsApp, Slack, email, and any existing system.' },
        { icon: <FiZap size={16}/>, title: 'Workflow Automation', desc: '29+ automations with n8n: escalation, reports, alerts, handoffs.' },
        { icon: <FiCode size={16}/>, title: 'Control Dashboard', desc: 'Web panel to monitor, configure, and analyze agent behavior.' },
        { icon: <FiTrendingUp size={16}/>, title: 'Metrics & Impact', desc: 'Reports on auto-resolution, satisfaction, and hours saved.' },
      ],
    },
    useCases: {
      title: 'Use Cases',
      items: [
        { icon: '🎫', title: '24/7 Customer Support', desc: 'The agent resolves tickets automatically, prioritizes them, and escalates when needed.' },
        { icon: '📋', title: 'Automated Onboarding', desc: 'Guides new users or employees through processes without human intervention.' },
        { icon: '🔍', title: 'Document Search', desc: 'The agent answers questions about contracts, manuals, policies, or any internal documents.' },
        { icon: '📊', title: 'Automated Reporting', desc: 'Generates daily/weekly reports and anomaly alerts without manual work.' },
      ],
    },
    caseStudy: {
      badge: 'Real Case Study',
      company: 'HydraSupport AI',
      description: 'AI-powered helpdesk SaaS platform that automates customer support end-to-end.',
      stats: [
        { value: '29+', label: 'Active automations' },
        { value: '80%', label: 'Tickets without human' },
        { value: '4', label: 'Subscription plans' },
        { value: '24/7', label: 'Availability' },
      ],
      tech: ['FastAPI', 'PostgreSQL', 'Ollama (Llama3)', 'n8n', 'React', 'Stripe'],
      features: ['Automatic classification by category and priority', 'Real-time sentiment analysis', 'Frustrated customer detection', 'Automatic resolution of common cases', 'Intelligent agent handoff', 'Automated weekly reports'],
      cta: 'View HydraSupport AI →',
      href: 'https://hydra-support-h2bto9ue1-ratel4150s-projects.vercel.app',
    },
    pricing: {
      title: 'Investment',
      subtitle: 'Reference pricing in USD. Free custom proposal.',
      tiers: [
        { name: 'Starter', price: '$8,000', suffix: '– $15,000 USD', time: '4–6 weeks', color: '#6366F1', featured: false, desc: 'For companies automating a specific workflow with AI.', features: ['RAG agent with 1 knowledge base', 'Up to 3 API integrations', 'Basic monitoring dashboard', '5 n8n automations', '30-day post-launch support'], cta: 'Request proposal' },
        { name: 'Growth', price: '$15,000', suffix: '– $35,000 USD', time: '8–12 weeks', color: '#00AEEF', featured: true, desc: 'For companies automating multiple processes with coordinated agents.', features: ['Multi-agent coordination', 'Advanced RAG with multiple sources', 'Unlimited integrations', '15+ n8n automations', 'Full analytics dashboard', 'Model fine-tuning', '90-day post-launch support'], cta: 'Most requested' },
        { name: 'Enterprise', price: 'From $35,000', suffix: 'USD', time: '3–6 months', color: '#7C3AED', featured: false, desc: 'For large companies with complex workflows and advanced security.', features: ['Complex multi-agent architecture', 'On-premise or private cloud', 'Compliance & audit (ISO 27001)', '29+ custom automations', 'Guaranteed SLA', 'Dedicated team', 'Ongoing SLA support'], cta: 'Talk to the team' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'How long does it take to deploy the agent?', a: 'The Starter tier can be production-ready in 4–6 weeks, including discovery, training, integration, and testing.' },
        { q: 'Can the agent integrate with my CRM/ERP?', a: 'Yes. We integrate with Salesforce, HubSpot, Odoo, SAP, and any system with a REST API. If no API, we use RPA.' },
        { q: "What if the agent doesn't know the answer?", a: 'The agent escalates to a human with full conversation context. No client is ever left without a response.' },
        { q: 'Are my company data secure?', a: 'Yes. Your data stays in your own infrastructure. We do not use your data to train external models.' },
        { q: 'Can I track performance metrics?', a: 'Yes. We provide dashboards with resolution rate, sentiment, categories, and estimated hours saved.' },
      ],
    },
    form: { title: 'Tell us about your case', subtitle: "We'll reply within 24 hours with a proposal.", name: 'Your name', email: 'Business email', company: 'Company', useCase: 'What do you want to automate?', submit: 'Send →', loading: 'Sending...', success: "Received! We'll contact you soon." },
    roi: { title: 'Calculate your savings', agents: 'Support agents', tickets: 'Tickets per month', hourly: 'Hourly cost (USD)', hours: 'Hours per ticket', automation: 'Estimated automation', saving: 'Estimated monthly savings', annual: 'Estimated annual savings', payback: 'ROI in', months: 'months' },
    sticky: 'Schedule free consultation',
  },
  fr: {
    badge: 'Service · IA & Agents',
    title: 'Agents Autonomes',
    titleAccent: 'avec IA',
    subtitle: "Systèmes d'IA qui exécutent des tâches complexes de façon autonome. Du support client à l'automatisation des processus critiques.",
    social: '4 entreprises ont engagé ce service ce mois-ci',
    breadcrumb: { home: 'Accueil', services: 'Services', current: 'Agents Autonomes' },
    includes: {
      title: "Qu'est-ce qui est inclus ?",
      items: [
        { icon: <FiCpu size={16}/>, title: 'Agent RAG personnalisé', desc: "Entraîné sur votre documentation, base de connaissances et processus internes." },
        { icon: <FiDatabase size={16}/>, title: 'Base de connaissances vectorielle', desc: 'pgvector + embeddings pour recherche sémantique ultra-rapide.' },
        { icon: <FiGlobe size={16}/>, title: 'Intégrations API', desc: 'Connexion avec CRM, ERP, WhatsApp, Slack, email et tout système existant.' },
        { icon: <FiZap size={16}/>, title: 'Automatisation des flux', desc: '29+ automatisations avec n8n : escalade, rapports, alertes, handoffs.' },
        { icon: <FiCode size={16}/>, title: 'Tableau de bord de contrôle', desc: "Panneau web pour surveiller, configurer et analyser le comportement de l'agent." },
        { icon: <FiTrendingUp size={16}/>, title: 'Métriques et impact', desc: 'Rapports sur la résolution automatique, la satisfaction et les heures économisées.' },
      ],
    },
    useCases: {
      title: "Cas d'utilisation",
      items: [
        { icon: '🎫', title: 'Support client 24h/24', desc: "L'agent résout les tickets automatiquement, les classe par priorité et escalade si nécessaire." },
        { icon: '📋', title: 'Onboarding automatisé', desc: "Guide les nouveaux utilisateurs ou employés à travers les processus sans intervention humaine." },
        { icon: '🔍', title: 'Recherche dans les documents', desc: "L'agent répond aux questions sur les contrats, manuels, réglementations ou tout document interne." },
        { icon: '📊', title: 'Rapports automatiques', desc: 'Génère des rapports quotidiens/hebdomadaires et des alertes sans travail manuel.' },
      ],
    },
    caseStudy: {
      badge: 'Cas de succès réel',
      company: 'HydraSupport AI',
      description: "Plateforme SaaS de helpdesk IA qui automatise le support client de bout en bout.",
      stats: [
        { value: '29+', label: 'Automatisations actives' },
        { value: '80%', label: 'Tickets sans humain' },
        { value: '4', label: "Plans d'abonnement" },
        { value: '24/7', label: 'Disponibilité' },
      ],
      tech: ['FastAPI', 'PostgreSQL', 'Ollama (Llama3)', 'n8n', 'React', 'Stripe'],
      features: ['Classification automatique par catégorie et priorité', 'Analyse de sentiment en temps réel', 'Détection de clients frustrés', 'Résolution automatique des cas courants', 'Handoff intelligent entre agents', 'Rapports hebdomadaires automatisés'],
      cta: 'Voir HydraSupport AI →',
      href: 'https://hydra-support-h2bto9ue1-ratel4150s-projects.vercel.app',
    },
    pricing: {
      title: 'Investissement',
      subtitle: 'Prix indicatifs en USD. Proposition personnalisée gratuite.',
      tiers: [
        { name: 'Starter', price: '8 000 $', suffix: '– 15 000 $ USD', time: '4–6 semaines', color: '#6366F1', featured: false, desc: "Pour les entreprises qui veulent automatiser un flux spécifique avec l'IA.", features: ['Agent RAG avec 1 base de connaissances', "Jusqu'à 3 intégrations API", 'Tableau de bord de base', '5 automatisations n8n', 'Support 30 jours après lancement'], cta: 'Demander une proposition' },
        { name: 'Growth', price: '15 000 $', suffix: '– 35 000 $ USD', time: '8–12 semaines', color: '#00AEEF', featured: true, desc: "Pour les entreprises automatisant plusieurs processus avec des agents coordonnés.", features: ['Multi-agent coordonné', 'RAG avancé avec plusieurs sources', 'Intégrations illimitées', '15+ automatisations n8n', "Tableau de bord d'analytique complet", 'Fine-tuning du modèle', 'Support 90 jours après lancement'], cta: 'Le plus demandé' },
        { name: 'Enterprise', price: 'À partir de 35 000 $', suffix: 'USD', time: '3–6 mois', color: '#7C3AED', featured: false, desc: "Pour les grandes entreprises avec des processus complexes et des exigences de sécurité avancées.", features: ['Architecture multi-agent complexe', 'Déploiement on-premise ou cloud privé', 'Conformité & audit (ISO 27001)', '29+ automatisations personnalisées', 'SLA garanti', 'Équipe dédiée', 'Support indéfini avec SLA'], cta: "Parler à l'équipe" },
      ],
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        { q: "Combien de temps faut-il pour déployer l'agent ?", a: "Le plan Starter peut être en production en 4–6 semaines, incluant la découverte, l'entraînement, l'intégration et les tests." },
        { q: "L'agent peut-il se connecter à mon CRM/ERP actuel ?", a: "Oui. Nous nous intégrons avec Salesforce, HubSpot, Odoo, SAP et tout système avec une API REST. Sinon, nous utilisons l'automatisation RPA." },
        { q: "Que se passe-t-il si l'agent ne sait pas répondre ?", a: "L'agent escalade à un humain de votre équipe avec tout le contexte de la conversation inclus." },
        { q: 'Mes données sont-elles sécurisées ?', a: 'Oui. Vos données restent dans votre propre infrastructure. Nous ne les utilisons jamais pour entraîner des modèles externes.' },
        { q: "Puis-je suivre les métriques de l'agent ?", a: "Oui. Nous fournissons des tableaux de bord avec le taux de résolution, le sentiment, les catégories et les heures économisées." },
      ],
    },
    form: { title: 'Parlez-nous de votre cas', subtitle: 'Nous répondons en moins de 24 heures.', name: 'Votre nom', email: 'Email professionnel', company: 'Entreprise', useCase: 'Que voulez-vous automatiser ?', submit: 'Envoyer →', loading: 'Envoi...', success: 'Reçu ! Nous vous contactons bientôt.' },
    roi: { title: 'Calculez vos économies', agents: "Agents de support", tickets: 'Tickets par mois', hourly: 'Coût par heure (USD)', hours: 'Heures par ticket', automation: 'Automatisation estimée', saving: 'Économies mensuelles estimées', annual: 'Économies annuelles estimées', payback: 'ROI en', months: 'mois' },
    sticky: 'Planifier une consultation gratuite',
  },
}

type Lang = 'es' | 'en' | 'fr'

function FAQItem({ q, a, isLast }: { q: string; a: string; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <Box sx={{ borderBottom: isLast ? 'none' : `1px solid ${C.border}`, py: 2 }}>
      <Box onClick={() => setOpen(o => !o)} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 2, '&:hover .faq-q': { color: C.accent } }}>
        <Typography className="faq-q" sx={{ fontWeight: 600, fontSize: '0.9rem', color: C.text, transition: 'color 0.18s', lineHeight: 1.4 }}>{q}</Typography>
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: open ? C.accentBg : 'transparent', border: `1px solid ${open ? C.accentLine : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.18s', color: open ? C.accent : C.textMute }}>
          <Typography sx={{ fontSize: '1rem', lineHeight: 1, fontWeight: 300 }}>{open ? '−' : '+'}</Typography>
        </Box>
      </Box>
      {open && <Typography sx={{ fontSize: '0.85rem', color: C.textMid, mt: 1.5, lineHeight: 1.75, pr: 4 }}>{a}</Typography>}
    </Box>
  )
}

function ROICalculator({ t }: { t: typeof content['es'] }) {
  const r = t.roi
  const [agents, setAgents] = useState(5)
  const [tickets, setTickets] = useState(500)
  const [hourly, setHourly] = useState(15)
  const [hours, setHours] = useState(0.5)
  const [automation, setAuto] = useState(70)
  const monthlyCost = tickets * hours * hourly
  const monthlySaving = monthlyCost * (automation / 100)
  const annualSaving = monthlySaving * 12
  const payback = Math.ceil(15000 / monthlySaving)
  return (
    <Box sx={{ bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: '20px', p: { xs: 2.5, md: 3.5 } }}>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: C.text, mb: 0.5 }}>{r.title}</Typography>
      <Typography sx={{ fontSize: '0.82rem', color: C.textMute, mb: 3 }}>Mueve los sliders para estimar tu ahorro real</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {[
            { label: r.agents, value: agents, set: setAgents, min: 1, max: 50, step: 1, fmt: (v: number) => `${v}` },
            { label: r.tickets, value: tickets, set: setTickets, min: 50, max: 5000, step: 50, fmt: (v: number) => v.toLocaleString() },
            { label: r.hourly, value: hourly, set: setHourly, min: 5, max: 100, step: 1, fmt: (v: number) => `$${v}` },
            { label: r.hours, value: hours, set: setHours, min: 0.1, max: 4, step: 0.1, fmt: (v: number) => `${v}h` },
          ].map(({ label, value, set, min, max, step, fmt }) => (
            <Box key={label}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography sx={{ fontSize: '0.78rem', color: C.textMid, fontWeight: 500 }}>{label}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: C.accent, fontWeight: 700 }}>{fmt(value)}</Typography>
              </Box>
              <Slider value={value} min={min} max={max} step={step} onChange={(_, v) => set(v as number)} sx={{ color: C.accent, '& .MuiSlider-thumb': { width: 16, height: 16 }, '& .MuiSlider-rail': { bgcolor: C.border } }}/>
            </Box>
          ))}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
              <Typography sx={{ fontSize: '0.78rem', color: C.textMid, fontWeight: 500 }}>{r.automation}</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: C.accent, fontWeight: 700 }}>{automation}%</Typography>
            </Box>
            <Slider value={automation} min={30} max={95} step={5} onChange={(_, v) => setAuto(v as number)} sx={{ color: C.accent, '& .MuiSlider-thumb': { width: 16, height: 16 }, '& .MuiSlider-rail': { bgcolor: C.border } }}/>
          </Box>
        </Box>
        <Box sx={{ bgcolor: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '16px', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
          {[
            { label: r.saving, value: `$${Math.round(monthlySaving).toLocaleString()} USD/mes`, color: C.accent, size: '1.4rem' },
            { label: r.annual, value: `$${Math.round(annualSaving).toLocaleString()} USD/año`, color: C.green, size: '1.6rem' },
          ].map(({ label, value, color, size }) => (
            <Box key={label} sx={{ pb: 2, borderBottom: `1px solid ${C.border}`, '&:last-child': { pb: 0, borderBottom: 'none' } }}>
              <Typography sx={{ fontSize: '0.72rem', color: C.textMute, mb: 0.4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: size, color, lineHeight: 1.1 }}>{value}</Typography>
            </Box>
          ))}
          <Box sx={{ bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.2)}`, borderRadius: '12px', p: 1.5, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.75rem', color: C.green, fontWeight: 600 }}>
              {r.payback} <Box component="span" sx={{ fontSize: '1.1rem', fontWeight: 800 }}>{isFinite(payback) ? payback : '<1'}</Box> {r.months}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.68rem', color: C.textMute, textAlign: 'center', lineHeight: 1.5 }}>* Estimación basada en {automation}% de automatización.</Typography>
        </Box>
      </Box>
    </Box>
  )
}

function LeadForm({ t, lang }: { t: typeof content['es']; lang: string }) {
  const f = t.form
  const [form, setForm] = useState({ name: '', email: '', company: '', useCase: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const handleSubmit = useCallback(async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/v1/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.name, email: form.email, empresa: form.company, mensaje: `[Agentes Autónomos] ${form.useCase}`, tipo_proyecto: 'ai', lang }),
      })
      setDone(true)
    } finally { setLoading(false) }
  }, [form, lang])
  const fieldSx = {
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' },
    '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.875rem', color: '#fff', bgcolor: 'rgba(255,255,255,0.05)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }, '&:hover fieldset': { borderColor: alpha(C.accent, 0.4) }, '&.Mui-focused fieldset': { borderColor: C.accent, borderWidth: 1 } },
  }
  return (
    <Box sx={{ bgcolor: C.bgDark, borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: '1px solid rgba(255,255,255,0.07)' }}>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', mb: 0.5 }}>{f.title}</Typography>
      <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', mb: 3 }}>{f.subtitle}</Typography>
      {done ? (
        <Box sx={{ textAlign: 'center', py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha(C.green, 0.15), border: `2px solid ${C.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiCheck size={22} color={C.green}/>
          </Box>
          <Typography sx={{ color: '#fff', fontWeight: 600 }}>{f.success}</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <TextField size="small" label={f.name} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} sx={fieldSx}/>
            <TextField size="small" label={f.email} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} sx={fieldSx}/>
          </Box>
          <TextField size="small" label={f.company} value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} sx={fieldSx}/>
          <TextField size="small" label={f.useCase} multiline rows={2} value={form.useCase} onChange={e => setForm(p => ({ ...p, useCase: e.target.value }))} sx={fieldSx}/>
          <Button variant="contained" fullWidth disabled={loading || !form.name || !form.email} onClick={handleSubmit}
            sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, borderRadius: '10px', py: 1.25, textTransform: 'none', fontSize: '0.9rem', '&:hover': { bgcolor: C.accentDk }, '&.Mui-disabled': { bgcolor: alpha(C.accent, 0.3), color: '#fff' } }}>
            {loading ? f.loading : f.submit}
          </Button>
        </Box>
      )}
    </Box>
  )
}

function StickyCTA({ label }: { label: string }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100, transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease', bgcolor: C.bgDark, borderTop: '1px solid rgba(255,255,255,0.08)', px: { xs: 2, md: 4 }, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', display: { xs: 'none', md: 'block' } }}>Agentes Autónomos con IA — Primera consulta gratuita</Typography>
      <Button component="a" href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" variant="contained" startIcon={<FiCalendar size={15}/>}
        sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none', py: 1, px: 2.5, ml: 'auto', '&:hover': { bgcolor: C.accentDk } }}>
        {label}
      </Button>
    </Box>
  )
}

export function AgentesClient({ lang }: { lang: string }) {
  const l = ((['es', 'en', 'fr'].includes(lang) ? lang : 'es')) as Lang
  const t = content[l]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Box sx={{ bgcolor: C.bg, pb: 12 }}>
      {/* ── HERO ── */}
      <Box sx={{ bgcolor: C.bgDark, pt: { xs: 10, md: 14 }, pb: { xs: 8, md: 10 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(0,174,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.05) 1px, transparent 1px)`, backgroundSize: '56px 56px' }}/>
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(120px)', opacity: 0.08, zIndex: 0 }}/>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easing }}>
            {/* Breadcrumb */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              <Box component={Link} href={`/${l}/landing`} sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', '&:hover': { color: C.accent } }}>{t.breadcrumb.home}</Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>›</Typography>
              <Box component={Link} href={`/${l}/servicios`} sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', '&:hover': { color: C.accent } }}>{t.breadcrumb.services}</Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>›</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: C.accent }}>{t.breadcrumb.current}</Typography>
            </Box>
            {/* Badge */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, border: `1px solid ${alpha(C.accent, 0.3)}`, borderRadius: '100px', bgcolor: alpha(C.accent, 0.08), mb: 2 }}>
              <FiCpu size={12} color={C.accent}/>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: C.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.badge}</Typography>
            </Box>
            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.4rem', md: '3.6rem' }, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', mb: 1 }}>
              {t.title}{' '}<Box component="span" sx={{ color: C.accent }}>{t.titleAccent}</Box>
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.55)', maxWidth: 620, lineHeight: 1.75, mb: 4 }}>{t.subtitle}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 4 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: C.green, animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }}/>
              <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>{t.social}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant="contained" size="large" component="a" href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" startIcon={<FiCalendar size={16}/>}
                sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '12px', px: 3.5, py: 1.4, boxShadow: `0 4px 20px ${alpha(C.accent, 0.4)}`, '&:hover': { bgcolor: C.accentDk } }}>
                {t.sticky}
              </Button>
              <Button variant="outlined" size="large" endIcon={<FiArrowRight size={15}/>} onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)', fontWeight: 600, textTransform: 'none', borderRadius: '12px', px: 3, py: 1.4, '&:hover': { borderColor: C.accentLine, bgcolor: alpha(C.accent, 0.08), color: '#fff' } }}>
                {l === 'es' ? 'Ver precios' : l === 'en' ? 'View pricing' : 'Voir les tarifs'}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" ref={ref}>
        {/* ── INCLUDES ── */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: easing }}>
            <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.includes.title}</Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
          </motion.div>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {t.includes.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08, ease: easing }}>
                <Box sx={{ bgcolor: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '16px', p: 2.5, height: '100%', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s', '&:hover': { borderColor: C.accentLine, transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${alpha(C.accent, 0.08)}` } }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: C.accentBg, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>{item.icon}</Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: C.text, mb: 0.5 }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: C.textMid, lineHeight: 1.65 }}>{item.desc}</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* ── ROI ── */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.roi.title}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
          <ROICalculator t={t}/>
        </Box>

        {/* ── USE CASES ── */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.useCases.title}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
            {t.useCases.items.map((uc, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 2, p: 2.5, bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: '16px', transition: 'border-color 0.2s', '&:hover': { borderColor: C.accentLine } }}>
                <Typography sx={{ fontSize: '1.5rem', flexShrink: 0 }}>{uc.icon}</Typography>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: C.text, mb: 0.4 }}>{uc.title}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: C.textMid, lineHeight: 1.65 }}>{uc.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── CASE STUDY ── */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ bgcolor: C.bgDark, borderRadius: '24px', p: { xs: 3, md: 4 }, border: '1px solid rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(100px)', opacity: 0.07, pointerEvents: 'none' }}/>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.25, py: 0.4, bgcolor: alpha(C.gold, 0.12), border: `1px solid ${alpha(C.gold, 0.3)}`, borderRadius: '100px', mb: 2 }}>
              <FiStar size={11} color={C.gold}/>
              <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: C.gold, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.caseStudy.badge}</Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'start' }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#fff', mb: 0.5 }}>{t.caseStudy.company}</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', mb: 3, lineHeight: 1.7 }}>{t.caseStudy.description}</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
                  {t.caseStudy.stats.map((s, i) => (
                    <Box key={i} sx={{ bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', p: 1.75, textAlign: 'center' }}>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: C.accent, lineHeight: 1 }}>{s.value}</Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', mt: 0.4 }}>{s.label}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button component="a" href={t.caseStudy.href} target="_blank" endIcon={<FiExternalLink size={14}/>}
                  sx={{ color: C.accent, fontWeight: 600, fontSize: '0.85rem', textTransform: 'none', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
                  {t.caseStudy.cta}
                </Button>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
                  {l === 'es' ? 'Funcionalidades implementadas' : l === 'en' ? 'Implemented features' : 'Fonctionnalités implémentées'}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                  {t.caseStudy.features.map((f, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                      <FiCheck size={14} color={C.green} style={{ flexShrink: 0, marginTop: 2 }}/>
                      <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>{f}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {t.caseStudy.tech.map(tech => (
                    <Box key={tech} sx={{ px: 1.25, py: 0.4, bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>{tech}</Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── PRICING ── */}
        <Box id="pricing" sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 0.5 }}>{t.pricing.title}</Typography>
          <Typography sx={{ fontSize: '0.9rem', color: C.textMute, mb: 1 }}>{t.pricing.subtitle}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
            {t.pricing.tiers.map((tier, i) => (
              <Box key={i} sx={{ bgcolor: tier.featured ? C.bgDark : C.bg, border: `1px solid ${tier.featured ? alpha(tier.color, 0.4) : C.border}`, borderRadius: '20px', p: 3, position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 32px ${alpha(tier.color, 0.15)}` } }}>
                {tier.featured && (
                  <Box sx={{ position: 'absolute', top: 16, right: 16, px: 1.25, py: 0.4, bgcolor: alpha(tier.color, 0.15), border: `1px solid ${alpha(tier.color, 0.3)}`, borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700, color: tier.color }}>
                    {l === 'es' ? 'MÁS POPULAR' : l === 'en' ? 'MOST POPULAR' : 'LE PLUS POPULAIRE'}
                  </Box>
                )}
                <Box sx={{ width: 32, height: 3, bgcolor: tier.color, borderRadius: 2, mb: 2 }}/>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: tier.featured ? '#fff' : C.text, mb: 0.5 }}>{tier.name}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.45)' : C.textMute, mb: 2, lineHeight: 1.6 }}>{tier.desc}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: tier.color, lineHeight: 1 }}>{tier.price}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.4)' : C.textMute }}>{tier.suffix} · {tier.time}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                  {tier.features.map((f, fi) => (
                    <Box key={fi} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <FiCheck size={13} color={tier.color} style={{ flexShrink: 0, marginTop: 2 }}/>
                      <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.6)' : C.textMid, lineHeight: 1.5 }}>{f}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button fullWidth variant={tier.featured ? 'contained' : 'outlined'} component="a" href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank"
                  sx={{ bgcolor: tier.featured ? tier.color : 'transparent', color: tier.featured ? '#fff' : tier.color, borderColor: alpha(tier.color, 0.4), fontWeight: 700, textTransform: 'none', borderRadius: '10px', py: 1.25, '&:hover': { bgcolor: tier.featured ? alpha(tier.color, 0.85) : alpha(tier.color, 0.08), borderColor: tier.color } }}>
                  {tier.cta}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── FAQ + FORM ── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 420px' }, gap: 4, mb: { xs: 6, md: 8 } }}>
          <Box>
            <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.faq.title}</Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
            {t.faq.items.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} isLast={i === t.faq.items.length - 1}/>)}
          </Box>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <LeadForm t={t} lang={l}/>
          </Box>
        </Box>
      </Container>

      <StickyCTA label={t.sticky}/>
    </Box>
  )
}