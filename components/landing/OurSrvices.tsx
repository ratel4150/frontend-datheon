// File: frontend-datheon/components/landing/OurSrvices.tsx
'use client'

import { Box, Typography, Button, Container, Chip, alpha } from '@mui/material'
import {
  FiCheck, FiCalendar, FiArrowRight,
  FiCpu, FiZap,  FiLayers,
  FiSmartphone, FiCloud, FiDatabase, FiWifi,
  FiBox, 
} from 'react-icons/fi'
import ReactGA from 'react-ga4'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { getDeviceData } from '../../lib/tracking/deviceTracking'

// ─── Tokens ──────────────────────────────────────────────────
const C = {
  bg:         '#F7FBFF',
  cardBg:     '#FFFFFF',
  border:     '#ebebeb',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.22)',
} as const

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

interface Feature { title: string; subtitle: string }
interface Service {
  num: string
  icon: React.ReactNode
  color: string
  title: string
  description: string
  features: Feature[]
  badge?: string
}

// ─── Services data ────────────────────────────────────────────
const servicesData: Record<Lang, Service[]> = {
  es: [
    {
      num: '01',
      icon: <FiCpu size={20}/>,
      color: '#7C3AED',
      title: 'AI SaaS & Agentes Autónomos',
      description: 'Construimos productos SaaS potenciados por IA y agentes que ejecutan tareas completas sin intervención humana.',
      badge: 'Alta demanda',
      features: [
        { title: 'Agentes IA con LangGraph / CrewAI', subtitle: 'Agentes multi-step que razonan, planifican y actúan en sistemas reales' },
        { title: 'RAG + Bases de conocimiento', subtitle: 'Asistentes entrenados sobre tus documentos con pgvector / Pinecone' },
        { title: 'SaaS con IA integrada', subtitle: 'Plataformas completas con auth, billing, dashboard y modelos GPT-4 / Claude' },
        { title: 'Fine-tuning de modelos', subtitle: 'Ajuste de LLMs open-source (Llama, Mistral) para tu dominio específico' },
        { title: 'LLM Ops & Observabilidad', subtitle: 'Monitoreo de costos, latencia y calidad de respuestas en producción' },
      ],
    },
    {
      num: '02',
      icon: <FiZap size={20}/>,
      color: '#059669',
      title: 'Automatización & Lead Systems',
      description: 'Sistemas que capturan, califican y convierten leads de forma automática, más flujos RPA que eliminan trabajo manual.',
      badge: 'Más solicitado',
      features: [
        { title: 'CRM + Lead scoring con IA', subtitle: 'Calificación automática de prospectos con ML y notificaciones en tiempo real' },
        { title: 'Automatización con n8n / Make', subtitle: 'Flujos sin código que conectan CRM, email, WhatsApp y herramientas internas' },
        { title: 'RPA + Computer Vision', subtitle: 'Robots que procesan PDFs, facturas y formularios sin API (Python + OpenCV)' },
        { title: 'Chatbots de ventas omnicanal', subtitle: 'Bots con NLP en WhatsApp, web y email que convierten 24/7' },
        { title: 'Pipelines de datos en tiempo real', subtitle: 'Kafka / Pub-Sub para procesar eventos de negocio a escala' },
      ],
    },
    {
      num: '03',
      icon: <FiLayers size={20}/>,
      color: '#D97706',
      title: 'SaaS / Web Apps & E-commerce',
      description: 'Aplicaciones web fullstack de alto rendimiento, desde MVPs hasta plataformas con millones de usuarios.',
      features: [
        { title: 'Fullstack con Next.js + Node / Django', subtitle: 'Arquitectura serverless con SSR, API routes y bases de datos escalables' },
        { title: 'E-commerce a medida', subtitle: 'Tiendas con carrito, pagos (Stripe/MercadoPago), inventario y panel admin' },
        { title: 'Portales B2B y dashboards', subtitle: 'Plataformas multi-tenant con roles, permisos y analítica integrada' },
        { title: 'Integraciones API / OAuth 2.0', subtitle: 'Conexión con ERPs, pasarelas de pago, marketplaces y sistemas legacy' },
        { title: 'Optimización de rendimiento web', subtitle: 'Core Web Vitals, caching avanzado y CDN para máxima velocidad' },
      ],
    },
    {
      num: '04',
      icon: <FiSmartphone size={20}/>,
      color: '#DB2777',
      title: 'Mobile Apps & Backend',
      description: 'Apps móviles nativas y multiplataforma conectadas a backends robustos y escalables.',
      features: [
        { title: 'Flutter (iOS + Android)', subtitle: 'Una sola base de código con rendimiento nativo y offline sync' },
        { title: 'Swift / Kotlin nativo', subtitle: 'Apps de alta performance para casos que demandan integración profunda con el SO' },
        { title: 'Backend con NestJS / FastAPI', subtitle: 'APIs REST y GraphQL con autenticación JWT, WebSockets y colas de tareas' },
        { title: 'Push notifications & real-time', subtitle: 'Firebase, Socket.io y WebSockets para experiencias en tiempo real' },
        { title: 'App Store & Play Store deploy', subtitle: 'CI/CD para publicación automática con fastlane y GitHub Actions' },
      ],
    },
    {
      num: '05',
      icon: <FiCloud size={20}/>,
      color: '#2563EB',
      title: 'Cloud, DevOps & Infraestructura',
      description: 'Infraestructura cloud escalable, segura y gestionada como código para que tu producto nunca se caiga.',
      features: [
        { title: 'AWS / GCP con Terraform', subtitle: 'Infraestructura como código: VPC, ECS, RDS, Lambda, auto-scaling' },
        { title: 'Kubernetes & Docker', subtitle: 'Orquestación de contenedores con Helm, namespaces y HPA' },
        { title: 'CI/CD pipelines', subtitle: 'GitHub Actions, ArgoCD y despliegues zero-downtime con rollbacks automáticos' },
        { title: 'Observabilidad completa', subtitle: 'OpenTelemetry + Grafana + Sentry para logs, métricas y trazas' },
        { title: 'Seguridad & compliance', subtitle: 'WAF, secretos con Vault, pentesting OWASP y hardening ISO 27001' },
      ],
    },
    {
      num: '06',
      icon: <FiDatabase size={20}/>,
      color: '#0891B2',
      title: 'Data, Analytics & AI Systems',
      description: 'Arquitecturas de datos que convierten información cruda en decisiones de negocio en tiempo real.',
      features: [
        { title: 'Data pipelines (ETL/ELT)', subtitle: 'Airflow, dbt y Spark para mover y transformar datos a escala' },
        { title: 'Bases de datos vectoriales', subtitle: 'pgvector, Qdrant y Weaviate para búsqueda semántica y RAG' },
        { title: 'Predictive analytics', subtitle: 'Modelos de forecasting con Prophet / XGBoost y detección de anomalías' },
        { title: 'Dashboards en tiempo real', subtitle: 'Metabase, Superset o dashboards custom con WebSockets y D3.js' },
        { title: 'Data warehouse & lakehouse', subtitle: 'BigQuery, Snowflake y Delta Lake para análisis a gran escala' },
      ],
    },
    {
      num: '07',
      icon: <FiWifi size={20}/>,
      color: '#7C3AED',
      title: 'IoT: Hardware + Software + SaaS',
      description: 'Conectamos dispositivos físicos al mundo digital: desde el firmware hasta el dashboard en la nube.',
      features: [
        { title: 'Firmware & protocolos IoT', subtitle: 'MQTT, CoAP, Modbus sobre ESP32, Raspberry Pi y PLCs industriales' },
        { title: 'Gateways y edge computing', subtitle: 'Procesamiento local para reducir latencia y operar sin conexión estable' },
        { title: 'Plataforma SaaS de monitoreo', subtitle: 'Dashboard en tiempo real con alertas, histórico y control remoto de dispositivos' },
        { title: 'Integración con ERP/CRM', subtitle: 'Los datos del sensor alimentan directamente tus sistemas de gestión' },
        { title: 'Seguridad de dispositivos', subtitle: 'TLS, provisioning seguro, OTA updates y gestión de flotas de hardware' },
      ],
    },
    {
      num: '08',
      icon: <FiBox size={20}/>,
      color: '#059669',
      title: 'Odoo ERP & Transformación Digital',
      description: 'Implementamos, personalizamos y conectamos Odoo con el resto de tu stack tecnológico.',
      features: [
        { title: 'Implementación Odoo completa', subtitle: 'Ventas, compras, inventario, contabilidad y RRHH configurados a tu proceso' },
        { title: 'Módulos custom (Python/XML)', subtitle: 'Funcionalidades específicas de tu negocio que Odoo estándar no cubre' },
        { title: 'Odoo + IA: asistente inteligente', subtitle: 'Agente que responde preguntas sobre tu ERP y automatiza tareas repetitivas' },
        { title: 'Integraciones con terceros', subtitle: 'Conectamos Odoo con tu e-commerce, POS, pasarelas y marketplaces' },
        { title: 'Migración desde SAP / Dynamics', subtitle: 'Auditoría, mapeo de datos y migración sin perder histórico' },
      ],
    },
  ],
  en: [
    {
      num: '01', icon: <FiCpu size={20}/>, color: '#7C3AED',
      title: 'AI SaaS & Autonomous Agents',
      description: 'We build AI-powered SaaS products and agents that execute complete tasks without human intervention.',
      badge: 'High demand',
      features: [
        { title: 'AI Agents with LangGraph / CrewAI', subtitle: 'Multi-step agents that reason, plan and act on real systems' },
        { title: 'RAG + Knowledge bases', subtitle: 'Assistants trained on your documents with pgvector / Pinecone' },
        { title: 'AI-powered SaaS products', subtitle: 'Full platforms with auth, billing, dashboard and GPT-4 / Claude models' },
        { title: 'Model fine-tuning', subtitle: 'Adapting open-source LLMs (Llama, Mistral) to your specific domain' },
        { title: 'LLM Ops & Observability', subtitle: 'Monitoring costs, latency and response quality in production' },
      ],
    },
    {
      num: '02', icon: <FiZap size={20}/>, color: '#059669',
      title: 'Automation & Lead Systems',
      description: 'Systems that automatically capture, qualify and convert leads, plus RPA flows that eliminate manual work.',
      badge: 'Most requested',
      features: [
        { title: 'CRM + AI lead scoring', subtitle: 'Automatic prospect qualification with ML and real-time notifications' },
        { title: 'Automation with n8n / Make', subtitle: 'No-code flows connecting CRM, email, WhatsApp and internal tools' },
        { title: 'RPA + Computer Vision', subtitle: 'Robots that process PDFs, invoices and forms without APIs (Python + OpenCV)' },
        { title: 'Omnichannel sales chatbots', subtitle: 'NLP bots on WhatsApp, web and email that convert 24/7' },
        { title: 'Real-time data pipelines', subtitle: 'Kafka / Pub-Sub to process business events at scale' },
      ],
    },
    {
      num: '03', icon: <FiLayers size={20}/>, color: '#D97706',
      title: 'SaaS / Web Apps & E-commerce',
      description: 'High-performance fullstack web applications, from MVPs to platforms serving millions of users.',
      features: [
        { title: 'Fullstack with Next.js + Node / Django', subtitle: 'Serverless architecture with SSR, API routes and scalable databases' },
        { title: 'Custom e-commerce', subtitle: 'Stores with cart, payments (Stripe/MercadoPago), inventory and admin panel' },
        { title: 'B2B portals and dashboards', subtitle: 'Multi-tenant platforms with roles, permissions and integrated analytics' },
        { title: 'API / OAuth 2.0 integrations', subtitle: 'Connect with ERPs, payment gateways, marketplaces and legacy systems' },
        { title: 'Web performance optimization', subtitle: 'Core Web Vitals, advanced caching and CDN for maximum speed' },
      ],
    },
    {
      num: '04', icon: <FiSmartphone size={20}/>, color: '#DB2777',
      title: 'Mobile Apps & Backend',
      description: 'Native and cross-platform mobile apps connected to robust and scalable backends.',
      features: [
        { title: 'Flutter (iOS + Android)', subtitle: 'Single codebase with native performance and offline sync' },
        { title: 'Native Swift / Kotlin', subtitle: 'High-performance apps for cases requiring deep OS integration' },
        { title: 'Backend with NestJS / FastAPI', subtitle: 'REST and GraphQL APIs with JWT auth, WebSockets and task queues' },
        { title: 'Push notifications & real-time', subtitle: 'Firebase, Socket.io and WebSockets for real-time experiences' },
        { title: 'App Store & Play Store deploy', subtitle: 'CI/CD for automatic publishing with fastlane and GitHub Actions' },
      ],
    },
    {
      num: '05', icon: <FiCloud size={20}/>, color: '#2563EB',
      title: 'Cloud, DevOps & Infrastructure',
      description: 'Scalable, secure cloud infrastructure managed as code so your product never goes down.',
      features: [
        { title: 'AWS / GCP with Terraform', subtitle: 'Infrastructure as code: VPC, ECS, RDS, Lambda, auto-scaling' },
        { title: 'Kubernetes & Docker', subtitle: 'Container orchestration with Helm, namespaces and HPA' },
        { title: 'CI/CD pipelines', subtitle: 'GitHub Actions, ArgoCD and zero-downtime deployments with auto-rollbacks' },
        { title: 'Full observability', subtitle: 'OpenTelemetry + Grafana + Sentry for logs, metrics and traces' },
        { title: 'Security & compliance', subtitle: 'WAF, Vault secrets, OWASP pentesting and ISO 27001 hardening' },
      ],
    },
    {
      num: '06', icon: <FiDatabase size={20}/>, color: '#0891B2',
      title: 'Data, Analytics & AI Systems',
      description: 'Data architectures that turn raw information into business decisions in real time.',
      features: [
        { title: 'Data pipelines (ETL/ELT)', subtitle: 'Airflow, dbt and Spark to move and transform data at scale' },
        { title: 'Vector databases', subtitle: 'pgvector, Qdrant and Weaviate for semantic search and RAG' },
        { title: 'Predictive analytics', subtitle: 'Forecasting models with Prophet / XGBoost and anomaly detection' },
        { title: 'Real-time dashboards', subtitle: 'Metabase, Superset or custom dashboards with WebSockets and D3.js' },
        { title: 'Data warehouse & lakehouse', subtitle: 'BigQuery, Snowflake and Delta Lake for large-scale analytics' },
      ],
    },
    {
      num: '07', icon: <FiWifi size={20}/>, color: '#7C3AED',
      title: 'IoT: Hardware + Software + SaaS',
      description: 'We connect physical devices to the digital world: from firmware to cloud dashboard.',
      features: [
        { title: 'Firmware & IoT protocols', subtitle: 'MQTT, CoAP, Modbus on ESP32, Raspberry Pi and industrial PLCs' },
        { title: 'Gateways & edge computing', subtitle: 'Local processing to reduce latency and operate without stable connection' },
        { title: 'SaaS monitoring platform', subtitle: 'Real-time dashboard with alerts, history and remote device control' },
        { title: 'ERP/CRM integration', subtitle: 'Sensor data feeds directly into your management systems' },
        { title: 'Device security', subtitle: 'TLS, secure provisioning, OTA updates and hardware fleet management' },
      ],
    },
    {
      num: '08', icon: <FiBox size={20}/>, color: '#059669',
      title: 'Odoo ERP & Digital Transformation',
      description: 'We implement, customize and connect Odoo with the rest of your technology stack.',
      features: [
        { title: 'Full Odoo implementation', subtitle: 'Sales, purchases, inventory, accounting and HR configured to your process' },
        { title: 'Custom modules (Python/XML)', subtitle: 'Business-specific features that standard Odoo does not cover' },
        { title: 'Odoo + AI: smart assistant', subtitle: 'Agent that answers questions about your ERP and automates repetitive tasks' },
        { title: 'Third-party integrations', subtitle: 'Connect Odoo with your e-commerce, POS, gateways and marketplaces' },
        { title: 'Migration from SAP / Dynamics', subtitle: 'Audit, data mapping and migration without losing historical data' },
      ],
    },
  ],
  fr: [
    {
      num: '01', icon: <FiCpu size={20}/>, color: '#7C3AED',
      title: 'IA SaaS & Agents Autonomes',
      description: 'Nous construisons des produits SaaS alimentés par IA et des agents qui exécutent des tâches complètes sans intervention humaine.',
      badge: 'Forte demande',
      features: [
        { title: 'Agents IA avec LangGraph / CrewAI', subtitle: 'Agents multi-étapes qui raisonnent, planifient et agissent sur des systèmes réels' },
        { title: 'RAG + Bases de connaissances', subtitle: 'Assistants entraînés sur vos documents avec pgvector / Pinecone' },
        { title: 'SaaS avec IA intégrée', subtitle: 'Plateformes complètes avec auth, billing, dashboard et modèles GPT-4 / Claude' },
        { title: 'Fine-tuning de modèles', subtitle: "Adaptation des LLMs open-source (Llama, Mistral) à votre domaine spécifique" },
        { title: 'LLM Ops & Observabilité', subtitle: 'Surveillance des coûts, latence et qualité des réponses en production' },
      ],
    },
    {
      num: '02', icon: <FiZap size={20}/>, color: '#059669',
      title: 'Automatisation & Systèmes de Leads',
      description: 'Systèmes qui capturent, qualifient et convertissent les leads automatiquement, plus des flux RPA qui éliminent le travail manuel.',
      badge: 'Plus demandé',
      features: [
        { title: 'CRM + scoring de leads avec IA', subtitle: 'Qualification automatique de prospects avec ML et notifications en temps réel' },
        { title: 'Automatisation avec n8n / Make', subtitle: 'Flux sans code connectant CRM, email, WhatsApp et outils internes' },
        { title: 'RPA + Vision par ordinateur', subtitle: 'Robots qui traitent PDFs, factures et formulaires sans API (Python + OpenCV)' },
        { title: 'Chatbots de vente omnicanal', subtitle: 'Bots NLP sur WhatsApp, web et email qui convertissent 24h/24' },
        { title: 'Pipelines de données en temps réel', subtitle: 'Kafka / Pub-Sub pour traiter les événements métier à grande échelle' },
      ],
    },
    {
      num: '03', icon: <FiLayers size={20}/>, color: '#D97706',
      title: 'SaaS / Web Apps & E-commerce',
      description: "Applications web fullstack haute performance, du MVP aux plateformes avec des millions d'utilisateurs.",
      features: [
        { title: 'Fullstack avec Next.js + Node / Django', subtitle: 'Architecture serverless avec SSR, API routes et bases de données scalables' },
        { title: 'E-commerce sur mesure', subtitle: 'Boutiques avec panier, paiements (Stripe/MercadoPago), inventaire et panel admin' },
        { title: 'Portails B2B et tableaux de bord', subtitle: 'Plateformes multi-tenant avec rôles, permissions et analytique intégrée' },
        { title: 'Intégrations API / OAuth 2.0', subtitle: 'Connexion avec ERPs, passerelles de paiement, marketplaces et systèmes legacy' },
        { title: 'Optimisation des performances web', subtitle: 'Core Web Vitals, cache avancé et CDN pour une vitesse maximale' },
      ],
    },
    {
      num: '04', icon: <FiSmartphone size={20}/>, color: '#DB2777',
      title: 'Applications Mobiles & Backend',
      description: 'Applications mobiles natives et multiplateformes connectées à des backends robustes et évolutifs.',
      features: [
        { title: 'Flutter (iOS + Android)', subtitle: 'Une seule base de code avec des performances natives et sync hors ligne' },
        { title: 'Swift / Kotlin natif', subtitle: "Applications haute performance pour les cas nécessitant une intégration profonde avec l'OS" },
        { title: 'Backend avec NestJS / FastAPI', subtitle: 'APIs REST et GraphQL avec auth JWT, WebSockets et files de tâches' },
        { title: 'Notifications push & temps réel', subtitle: 'Firebase, Socket.io et WebSockets pour des expériences en temps réel' },
        { title: 'Déploiement App Store & Play Store', subtitle: 'CI/CD pour publication automatique avec fastlane et GitHub Actions' },
      ],
    },
    {
      num: '05', icon: <FiCloud size={20}/>, color: '#2563EB',
      title: 'Cloud, DevOps & Infrastructure',
      description: "Infrastructure cloud évolutive et sécurisée gérée en code pour que votre produit ne tombe jamais.",
      features: [
        { title: 'AWS / GCP avec Terraform', subtitle: 'Infrastructure as code : VPC, ECS, RDS, Lambda, auto-scaling' },
        { title: 'Kubernetes & Docker', subtitle: 'Orchestration de conteneurs avec Helm, namespaces et HPA' },
        { title: 'Pipelines CI/CD', subtitle: 'GitHub Actions, ArgoCD et déploiements zero-downtime avec rollbacks automatiques' },
        { title: 'Observabilité complète', subtitle: 'OpenTelemetry + Grafana + Sentry pour logs, métriques et traces' },
        { title: 'Sécurité & conformité', subtitle: 'WAF, secrets avec Vault, pentesting OWASP et durcissement ISO 27001' },
      ],
    },
    {
      num: '06', icon: <FiDatabase size={20}/>, color: '#0891B2',
      title: 'Data, Analytics & Systèmes IA',
      description: 'Architectures de données qui transforment les informations brutes en décisions métier en temps réel.',
      features: [
        { title: 'Pipelines de données (ETL/ELT)', subtitle: 'Airflow, dbt et Spark pour déplacer et transformer les données à grande échelle' },
        { title: 'Bases de données vectorielles', subtitle: 'pgvector, Qdrant et Weaviate pour la recherche sémantique et RAG' },
        { title: 'Analyse prédictive', subtitle: "Modèles de prévision avec Prophet / XGBoost et détection d'anomalies" },
        { title: 'Tableaux de bord en temps réel', subtitle: 'Metabase, Superset ou dashboards custom avec WebSockets et D3.js' },
        { title: 'Data warehouse & lakehouse', subtitle: 'BigQuery, Snowflake et Delta Lake pour analyses à grande échelle' },
      ],
    },
    {
      num: '07', icon: <FiWifi size={20}/>, color: '#7C3AED',
      title: 'IoT : Hardware + Software + SaaS',
      description: 'Nous connectons des appareils physiques au monde numérique : du firmware au tableau de bord cloud.',
      features: [
        { title: 'Firmware & protocoles IoT', subtitle: 'MQTT, CoAP, Modbus sur ESP32, Raspberry Pi et PLCs industriels' },
        { title: 'Passerelles & edge computing', subtitle: 'Traitement local pour réduire la latence et opérer sans connexion stable' },
        { title: 'Plateforme SaaS de surveillance', subtitle: 'Tableau de bord temps réel avec alertes, historique et contrôle à distance' },
        { title: 'Intégration ERP/CRM', subtitle: 'Les données des capteurs alimentent directement vos systèmes de gestion' },
        { title: 'Sécurité des appareils', subtitle: 'TLS, provisionnement sécurisé, mises à jour OTA et gestion de flotte' },
      ],
    },
    {
      num: '08', icon: <FiBox size={20}/>, color: '#059669',
      title: 'Odoo ERP & Transformation Digitale',
      description: 'Nous implémentons, personnalisons et connectons Odoo avec le reste de votre stack technologique.',
      features: [
        { title: 'Implémentation Odoo complète', subtitle: 'Ventes, achats, inventaire, comptabilité et RH configurés à votre processus' },
        { title: 'Modules custom (Python/XML)', subtitle: "Fonctionnalités spécifiques à votre entreprise que l'Odoo standard ne couvre pas" },
        { title: 'Odoo + IA : assistant intelligent', subtitle: 'Agent qui répond aux questions sur votre ERP et automatise les tâches répétitives' },
        { title: 'Intégrations tierces', subtitle: 'Connectez Odoo à votre e-commerce, POS, passerelles et marketplaces' },
        { title: 'Migration depuis SAP / Dynamics', subtitle: 'Audit, mapping de données et migration sans perdre les données historiques' },
      ],
    },
  ],
}

const uiText = {
  sectionLabel: { es: 'Servicios',     en: 'Services',     fr: 'Services'   },
  title:        { es: 'Lo que construimos para ti', en: 'What we build for you', fr: 'Ce que nous construisons pour vous' },
  subtitle: {
    es: 'Cada servicio es una capacidad real que hemos desplegado en producción. Sin promesas vagas, solo resultados.',
    en: 'Every service is a real capability we have deployed in production. No vague promises, only results.',
    fr: 'Chaque service est une capacité réelle que nous avons déployée en production. Pas de promesses vagues, seulement des résultats.',
  },
  btn:     { es: 'Agendar consulta',          en: 'Schedule consultation',     fr: 'Planifier une consultation' },
  loading: { es: 'Cargando…',                 en: 'Loading…',                  fr: 'Chargement…'               },
  popup:   {
    es: 'Permite ventanas emergentes para acceder a Calendly.',
    en: 'Please allow popups to access Calendly.',
    fr: 'Veuillez autoriser les fenêtres pop-up pour accéder à Calendly.',
  },
}
const tx = (key: keyof typeof uiText, l: string): string =>
  (uiText[key] as Record<string, string>)[l] ?? (uiText[key] as Record<string, string>)['es']

// ─── Service Card ─────────────────────────────────────────────
function ServiceCard({ service, lang, index }: { service: Service; lang: string; index: number }) {
  const [loading, setLoading] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleClick = useCallback(() => {
    if (loading) return
    setLoading(true)
    if (typeof window !== 'undefined') {
      const payload = {
        plan: 'Premium', servicio: service.title,
        canal: 'LandingPage', ubicacion: 'OurServicesSection',
        idioma: navigator.language || 'es',
        referrer: document.referrer || 'direct',
        timestamp: new Date().toISOString(),
        conversion_intent: true,
        evento_unico_id: crypto.randomUUID?.() ?? Math.random().toString(36),
      }
      if (window.fbq) window.fbq('trackCustom', 'ServicioAgendado', payload)
      if (typeof ReactGA !== 'undefined') {
        ReactGA.event({ category: 'Servicios', action: 'click_agendar_servicio', label: service.title, value: 1 })
        ReactGA.gtag('event', 'servicio_agendado', payload)
      }
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'ServicioAgendado', ...payload })

      const w = 800, h = 700
      const left = window.screenX + (window.innerWidth - w) / 2
      const top  = window.screenY + (window.innerHeight - h) / 2
      const win  = window.open(
        'https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica',
        'Calendly', `width=${w},height=${h},left=${left},top=${top}`
      )
      if (win) win.focus()
      else alert(tx('popup', lang))
    }
    setTimeout(() => setLoading(false), 1500)
  }, [loading, service.title, lang])

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: C.cardBg,
        border: `1px solid ${hovered ? alpha(service.color, 0.35) : C.border}`,
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 16px 40px ${alpha(service.color, 0.12)}, 0 2px 8px rgba(0,0,0,0.06)`
          : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Color accent top bar */}
      <Box sx={{
        height: 3,
        background: service.color,
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.25s ease',
      }}/>

      {/* Badge */}
      {service.badge && (
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Chip
            label={service.badge}
            size="small"
            sx={{
              bgcolor: alpha(service.color, 0.12),
              color: service.color,
              fontWeight: 700, fontSize: '0.68rem',
              letterSpacing: '0.03em', height: 22,
              border: `1px solid ${alpha(service.color, 0.25)}`,
            }}
          />
        </Box>
      )}

      {/* Header */}
      <Box sx={{ p: 3, pb: 2.5, borderBottom: `1px solid ${C.border}` }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.25 }}>
          <Box sx={{
            width: 42, height: 42, borderRadius: '11px', flexShrink: 0,
            bgcolor: hovered ? service.color : alpha(service.color, 0.10),
            color: hovered ? '#fff' : service.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.25s ease',
          }}>
            {service.icon}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, pt: 0.15 }}>
            <Typography sx={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.62rem', color: service.color,
              letterSpacing: '0.1em', fontWeight: 500, mb: 0.2,
            }}>
              {service.num}
            </Typography>
            <Typography sx={{
              fontWeight: 700, fontSize: '0.97rem',
              color: C.text, lineHeight: 1.3,
              pr: service.badge ? 8 : 0,
            }}>
              {service.title}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{
          fontSize: '0.81rem', color: C.textMid,
          lineHeight: 1.65, fontWeight: 400,
        }}>
          {service.description}
        </Typography>
      </Box>

      {/* Features */}
      <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', flex: 1 }}>
          {service.features.map((f, i) => (
            <Box
              key={i}
              component="li"
              sx={{
                display: 'flex', gap: 1.25, alignItems: 'flex-start',
                py: 1.25,
                borderBottom: i < service.features.length - 1 ? `1px solid ${C.border}` : 'none',
              }}
            >
              <Box sx={{
                mt: '2px', flexShrink: 0,
                width: 17, height: 17, borderRadius: '50%',
                bgcolor: alpha(service.color, 0.10),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FiCheck size={9} color={service.color} strokeWidth={3}/>
              </Box>
              <Box>
                <Typography sx={{
                  fontWeight: 600, fontSize: '0.8rem',
                  color: C.text, lineHeight: 1.3, mb: 0.2,
                }}>
                  {f.title}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: C.textMute, lineHeight: 1.5 }}>
                  {f.subtitle}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* CTA */}
        <Box sx={{ mt: 2.5 }}>
          <Button
            fullWidth variant="contained"
            disabled={loading}
            onClick={handleClick}
            startIcon={!loading ? <FiCalendar size={13}/> : undefined}
            endIcon={!loading ? <FiArrowRight size={13}/> : undefined}
            sx={{
              bgcolor: hovered ? service.color : alpha(service.color, 0.08),
              color: hovered ? '#fff' : service.color,
              border: `1px solid ${hovered ? 'transparent' : alpha(service.color, 0.25)}`,
              fontWeight: 700, fontSize: '0.8rem',
              textTransform: 'none', borderRadius: '10px', py: 1,
              boxShadow: hovered ? `0 4px 14px ${alpha(service.color, 0.35)}` : 'none',
              transition: 'all 0.25s ease',
              '&:hover': {
                bgcolor: service.color, color: '#fff',
                boxShadow: `0 6px 18px ${alpha(service.color, 0.4)}`,
              },
              '&.Mui-disabled': {
                bgcolor: alpha(service.color, 0.08),
                color: alpha(service.color, 0.4),
              },
            }}
          >
            {loading ? tx('loading', lang) : tx('btn', lang)}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export default function OurServices({ lang }: Props) {
  const l = lang in uiText.title ? lang : 'es'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const services = servicesData[l as Lang]

  useEffect(() => {
    if (!isInView || typeof window === 'undefined') return
    const deviceData = getDeviceData()
    const payload = {
      ...deviceData, section_name: 'OurServices',
      timestamp: new Date().toISOString(),
      event_id: crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 9),
    }
    if (window.fbq) window.fbq('trackCustom', 'SectionView', { ...payload, content_name: 'OurServicesSectionViewed' })
    if (window.gtag) window.gtag('event', 'section_view', payload)
    if (typeof ReactGA !== 'undefined') ReactGA.event({ category: 'SectionViews', action: 'OurServicesSectionViewed', nonInteraction: true })
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'sectionView', ...payload })
  }, [isInView])

  return (
    <Box ref={ref} id="services" sx={{ py: { xs: 8, md: 11 }, bgcolor: C.bg }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}
        >
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.75,
            px: 1.75, py: 0.6,
            border: `1px solid ${C.accentLine}`,
            borderRadius: '100px', bgcolor: C.accentBg, mb: 2,
          }}>
            <Typography sx={{
              fontSize: '0.72rem', fontWeight: 600, color: C.textMid,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {tx('sectionLabel', l)}
            </Typography>
          </Box>

          <Typography variant="h2" sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800, fontSize: { xs: '2rem', md: '2.75rem' },
            color: C.text, lineHeight: 1.15,
            letterSpacing: '-0.02em', mb: 1.5,
          }}>
            {tx('title', l)}
          </Typography>

          <Typography sx={{
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            color: C.textMid, maxWidth: 560, mx: 'auto',
            lineHeight: 1.75, fontWeight: 400,
          }}>
            {tx('subtitle', l)}
          </Typography>
        </Box>

        {/* Grid 4 cols → 2 cols → 1 col */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: { xs: 2.5, md: 3 },
          alignItems: 'stretch',
        }}>
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} lang={l} index={i}/>
          ))}
        </Box>
      </Container>
    </Box>
  )
}