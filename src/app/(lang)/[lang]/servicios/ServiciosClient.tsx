// File: frontend-datheon/src/app/(lang)/[lang]/servicios/Serviciosclient.tsx
'use client'

import { Box, Container, Typography, Button, alpha, TextField, InputAdornment, Chip } from '@mui/material'
import { FiSearch, FiArrowRight, FiCalendar, FiExternalLink } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import Link from 'next/link'

const C = {
  bg:         '#F7FBFF',
  bgWhite:    '#FFFFFF',
  bgDark:     '#0A0C10',
  border:     '#ebebeb',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.20)',
  green:      '#22C55E',
} as const

const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]
type Lang = 'es' | 'en' | 'fr'

// ─── Categories ───────────────────────────────────────────────
interface Category {
  id: string
  emoji: string
  color: string
  label: Record<Lang, string>
}

const CATEGORIES: Category[] = [
  { id: 'estrategia',      emoji: '🧠', color: '#7C3AED', label: { es: 'Estrategia y Arquitectura', en: 'Strategy & Architecture',      fr: 'Stratégie & Architecture'     } },
  { id: 'backend',         emoji: '⚙️', color: '#2563EB', label: { es: 'Sistemas Core / Backend',   en: 'Core Systems / Backend',        fr: 'Systèmes Core / Backend'      } },
  { id: 'ia',              emoji: '🤖', color: '#059669', label: { es: 'IA y Automatización',       en: 'AI & Automation',              fr: 'IA & Automatisation'          } },
  { id: 'integraciones',   emoji: '🔗', color: '#D97706', label: { es: 'Integraciones y Ecosistemas',en: 'Integrations & Ecosystems',    fr: 'Intégrations & Écosystèmes'  } },
  { id: 'data',            emoji: '📊', color: '#0891B2', label: { es: 'Data y Analytics',         en: 'Data & Analytics',             fr: 'Data & Analytics'            } },
  { id: 'apps',            emoji: '📱', color: '#DB2777', label: { es: 'Aplicaciones y Productos',  en: 'Applications & Products',     fr: 'Applications & Produits'     } },
  { id: 'cloud',           emoji: '☁️', color: '#0EA5E9', label: { es: 'Cloud y DevOps',           en: 'Cloud & DevOps',               fr: 'Cloud & DevOps'              } },
  { id: 'seguridad',       emoji: '🔐', color: '#DC2626', label: { es: 'Seguridad y Control',      en: 'Security & Control',           fr: 'Sécurité & Contrôle'         } },
  { id: 'iot',             emoji: '🏋️', color: '#16A34A', label: { es: 'IoT / Hardware',           en: 'IoT / Hardware',               fr: 'IoT / Hardware'              } },
  { id: 'transformacion',  emoji: '🚀', color: '#EA580C', label: { es: 'Transformación Completa',  en: 'Full Transformation',          fr: 'Transformation Complète'     } },
]

// ─── Services ─────────────────────────────────────────────────
interface Service {
  slug: string
  cat: string
  title: Record<Lang, string>
  desc:  Record<Lang, string>
  hasPage: boolean
}const SERVICES: Service[] = [
  // ESTRATEGIA
  { slug: "ai-solution-architecture",       cat: "estrategia",    hasPage: true,
    title: { es: "Arquitectura de Soluciones IA",         en: "AI Solution Architecture",           fr: "Architecture de Solutions IA"         },
    desc:  { es: "Diseño end-to-end de sistemas de IA escalables y seguros", en: "End-to-end design of scalable, secure AI systems", fr: "Conception end-to-end de systèmes IA évolutifs" } },
  { slug: "digital-transformation-systems", cat: "estrategia",    hasPage: true,
    title: { es: "Transformación Digital",                en: "Digital Transformation Systems",     fr: "Systèmes de Transformation Digitale"  },
    desc:  { es: "Hoja de ruta tecnológica para modernizar tu operación", en: "Technology roadmap to modernize your operation", fr: "Feuille de route technologique pour moderniser votre opération" } },
  { slug: "ai-strategy-consulting",         cat: "estrategia",    hasPage: true,
    title: { es: "Consultoría de Estrategia IA",          en: "AI Strategy Consulting",             fr: "Conseil en Stratégie IA"              },
    desc:  { es: "Definición de estrategia de IA alineada a objetivos de negocio", en: "AI strategy aligned to business objectives", fr: "Stratégie IA alignée aux objectifs métier" } },
  { slug: "system-design-engineering",      cat: "estrategia",    hasPage: true,
    title: { es: "Ingeniería de Diseño de Sistemas",      en: "System Design Engineering",          fr: "Ingénierie de Conception Système"     },
    desc:  { es: "Arquitecturas robustas para sistemas de alta disponibilidad", en: "Robust architectures for high-availability systems", fr: "Architectures robustes pour systèmes haute disponibilité" } },
  { slug: "workflow-reengineering",         cat: "estrategia",    hasPage: true,
    title: { es: "Reingeniería de Procesos",              en: "Workflow Reengineering",             fr: "Réingénierie des Processus"           },
    desc:  { es: "Rediseño de flujos para eliminar fricciones y cuellos de botella", en: "Flow redesign to eliminate friction and bottlenecks", fr: "Refonte des flux pour éliminer frictions et goulots" } },
  { slug: "business-process-optimization",  cat: "estrategia",    hasPage: true,
    title: { es: "Optimización de Procesos",              en: "Business Process Optimization",      fr: "Optimisation des Processus Métier"    },
    desc:  { es: "Mejora continua de operaciones con métricas y automatización", en: "Continuous operations improvement with metrics and automation", fr: "Amélioration continue des opérations avec métriques et automatisation" } },
  { slug: "enterprise-architecture-design", cat: "estrategia",    hasPage: true,
    title: { es: "Diseño de Arquitectura Empresarial",    en: "Enterprise Architecture Design",     fr: "Conception d'Architecture d'Entreprise" },
    desc:  { es: "Framework de arquitectura empresarial alineado a estrategia", en: "Enterprise architecture framework aligned to strategy", fr: "Framework d'architecture d'entreprise aligné à la stratégie" } },
  { slug: "solution-architecture-planning", cat: "estrategia",    hasPage: true,
    title: { es: "Planificación de Arquitectura",         en: "Solution Architecture Planning",     fr: "Planification d'Architecture"        },
    desc:  { es: "Blueprint técnico detallado antes de escribir una línea de código", en: "Detailed technical blueprint before writing a line of code", fr: "Blueprint technique détaillé avant d'écrire une ligne de code" } },
  { slug: "operational-efficiency-systems", cat: "estrategia",    hasPage: true,
    title: { es: "Sistemas de Eficiencia Operacional",    en: "Operational Efficiency Systems",     fr: "Systèmes d'Efficacité Opérationnelle" },
    desc:  { es: "Sistemas que reducen costos operativos y aumentan throughput", en: "Systems that reduce operational costs and increase throughput", fr: "Systèmes qui réduisent les coûts et augmentent le débit" } },
  { slug: "business-systems-design",        cat: "estrategia",    hasPage: false,
    title: { es: "Diseño de Sistemas de Negocio",         en: "Business Systems Design",            fr: "Conception de Systèmes Métier"        },
    desc:  { es: "Modelado de sistemas alineados a procesos y KPIs del negocio", en: "Systems modeled to business processes and KPIs", fr: "Systèmes modélisés sur les processus et KPIs métier" } },

  // BACKEND
  { slug: "backend-architecture",           cat: "backend",       hasPage: false,
    title: { es: "Arquitectura de Backend",               en: "Backend Architecture",               fr: "Architecture Backend"                },
    desc:  { es: "Diseño de capas, servicios y bases de datos para sistemas robustos", en: "Layer, service and database design for robust systems", fr: "Conception de couches, services et bases de données robustes" } },
  { slug: "scalable-backend-systems",       cat: "backend",       hasPage: false,
    title: { es: "Sistemas Backend Escalables",           en: "Scalable Backend Systems",           fr: "Systèmes Backend Évolutifs"           },
    desc:  { es: "Backends que manejan picos de tráfico sin degradar performance", en: "Backends that handle traffic spikes without performance degradation", fr: "Backends qui gèrent les pics de trafic sans dégradation" } },
  { slug: "microservices-architecture",     cat: "backend",       hasPage: false,
    title: { es: "Arquitectura de Microservicios",        en: "Microservices Architecture",         fr: "Architecture Microservices"           },
    desc:  { es: "Descomposición de monolitos en servicios independientes y desplegables", en: "Decomposing monoliths into independently deployable services", fr: "Décomposition en services indépendants et déployables" } },
  { slug: "event-driven-systems",           cat: "backend",       hasPage: false,
    title: { es: "Sistemas Orientados a Eventos",         en: "Event-Driven Systems",               fr: "Systèmes Orientés Événements"         },
    desc:  { es: "Kafka, RabbitMQ y Pub/Sub para procesar eventos en tiempo real", en: "Kafka, RabbitMQ and Pub/Sub for real-time event processing", fr: "Kafka, RabbitMQ et Pub/Sub pour traitement événements temps réel" } },
  { slug: "distributed-systems-engineering",cat: "backend",       hasPage: false,
    title: { es: "Ingeniería de Sistemas Distribuidos",   en: "Distributed Systems Engineering",   fr: "Ingénierie de Systèmes Distribués"    },
    desc:  { es: "Consenso, consistencia eventual y tolerancia a fallos en escala", en: "Consensus, eventual consistency and fault tolerance at scale", fr: "Consensus, cohérence éventuelle et tolérance aux pannes" } },
  { slug: "api-platform-development",       cat: "backend",       hasPage: false,
    title: { es: "Desarrollo de Plataformas API",         en: "API Platform Development",           fr: "Développement de Plateformes API"     },
    desc:  { es: "APIs REST y GraphQL documentadas, versionadas y seguras", en: "Documented, versioned and secure REST and GraphQL APIs", fr: "APIs REST et GraphQL documentées, versionnées et sécurisées" } },
  { slug: "enterprise-backend-platforms",   cat: "backend",       hasPage: false,
    title: { es: "Plataformas Backend Empresariales",     en: "Enterprise Backend Platforms",       fr: "Plateformes Backend d'Entreprise"    },
    desc:  { es: "Backends multi-tenant con roles, auditoría y SLAs garantizados", en: "Multi-tenant backends with roles, audit and guaranteed SLAs", fr: "Backends multi-tenant avec rôles, audit et SLAs garantis" } },
  { slug: "real-time-processing-systems",   cat: "backend",       hasPage: false,
    title: { es: "Procesamiento en Tiempo Real",          en: "Real-Time Processing Systems",       fr: "Systèmes de Traitement Temps Réel"    },
    desc:  { es: "WebSockets, SSE y streams para datos que no esperan", en: "WebSockets, SSE and streams for data that doesn't wait", fr: "WebSockets, SSE et streams pour données sans délai" } },
  { slug: "high-performance-systems",       cat: "backend",       hasPage: false,
    title: { es: "Sistemas de Alto Rendimiento",          en: "High-Performance Systems",           fr: "Systèmes Haute Performance"           },
    desc:  { es: "Optimización de latencia, caching y throughput para escala masiva", en: "Latency, caching and throughput optimization for massive scale", fr: "Optimisation latence, cache et débit pour échelle massive" } },
  { slug: "multi-tenant-systems",           cat: "backend",       hasPage: false,
    title: { es: "Sistemas Multi-Tenant",                 en: "Multi-Tenant Systems",               fr: "Systèmes Multi-Tenant"                },
    desc:  { es: "Aislamiento, personalización y escalado por tenant en SaaS", en: "Tenant isolation, customization and scaling in SaaS", fr: "Isolation, personnalisation et mise à l'échelle par tenant"   } },

  // IA
  { slug: "agentes-autonomos",              cat: "ia",            hasPage: true,
    title: { es: "Agentes Autónomos IA",                  en: "AI Autonomous Agents",               fr: "Agents Autonomes IA"                  },
    desc:  { es: "LangGraph, CrewAI y agentes multi-step para automatizar tareas completas", en: "LangGraph, CrewAI and multi-step agents to automate complete tasks", fr: "LangGraph, CrewAI et agents multi-étapes pour automatiser des tâches complètes" } },
  { slug: "ai-agents-systems",              cat: "ia",            hasPage: false,
    title: { es: "Sistemas de Agentes IA",                en: "AI Agents Systems",                  fr: "Systèmes d'Agents IA"                 },
    desc:  { es: "Orquestación de múltiples agentes para flujos de negocio complejos", en: "Multi-agent orchestration for complex business flows", fr: "Orchestration multi-agents pour flux métier complexes" } },
  { slug: "ai-automation-platforms",        cat: "ia",            hasPage: false,
    title: { es: "Plataformas de Automatización IA",      en: "AI Automation Platforms",            fr: "Plateformes d'Automatisation IA"      },
    desc:  { es: "Pipelines de automatización inteligente para operaciones a escala", en: "Intelligent automation pipelines for operations at scale", fr: "Pipelines d'automatisation intelligente pour opérations à grande échelle" } },
  { slug: "intelligent-workflow-systems",   cat: "ia",            hasPage: false,
    title: { es: "Flujos de Trabajo Inteligentes",        en: "Intelligent Workflow Systems",       fr: "Systèmes de Flux de Travail Intelligents" },
    desc:  { es: "Workflows con decisiones automáticas basadas en contexto y datos", en: "Workflows with automatic decisions based on context and data", fr: "Workflows avec décisions automatiques basées sur contexte et données" } },
  { slug: "ai-decision-support-systems",    cat: "ia",            hasPage: false,
    title: { es: "Soporte de Decisiones con IA",          en: "AI Decision Support Systems",        fr: "Systèmes d'Aide à la Décision IA"     },
    desc:  { es: "Modelos que recomiendan acciones basadas en datos históricos y en vivo", en: "Models that recommend actions based on historical and live data", fr: "Modèles qui recommandent des actions basées sur données historiques et en direct" } },
  { slug: "ai-knowledge-systems",           cat: "ia",            hasPage: false,
    title: { es: "Sistemas de Conocimiento IA",           en: "AI Knowledge Systems",               fr: "Systèmes de Connaissance IA"           },
    desc:  { es: "RAG y bases de conocimiento entrenadas sobre documentos de tu empresa", en: "RAG and knowledge bases trained on your company documents", fr: "RAG et bases de connaissances entraînées sur vos documents" } },
  { slug: "ai-document-processing",         cat: "ia",            hasPage: false,
    title: { es: "Procesamiento de Documentos IA",        en: "AI Document Processing",             fr: "Traitement de Documents IA"           },
    desc:  { es: "Extracción y clasificación automática de datos de PDFs y formularios", en: "Automatic extraction and classification of data from PDFs and forms", fr: "Extraction et classification automatique de données de PDFs et formulaires" } },
  { slug: "ai-chatbot-systems",             cat: "ia",            hasPage: false,
    title: { es: "Chatbots y Asistentes IA",              en: "AI Chatbot Systems",                 fr: "Systèmes de Chatbots IA"               },
    desc:  { es: "Asistentes conversacionales entrenados en tu dominio para web, WhatsApp y más", en: "Conversational assistants trained on your domain for web, WhatsApp and more", fr: "Assistants conversationnels entraînés sur votre domaine" } },
  { slug: "ai-data-extraction-systems",     cat: "ia",            hasPage: false,
    title: { es: "Extracción de Datos con IA",            en: "AI Data Extraction Systems",         fr: "Systèmes d'Extraction de Données IA"  },
    desc:  { es: "Scraping inteligente y parsing estructurado de fuentes no estructuradas", en: "Intelligent scraping and structured parsing from unstructured sources", fr: "Scraping intelligent et parsing structuré de sources non structurées" } },
  { slug: "ai-recommendation-systems",      cat: "ia",            hasPage: false,
    title: { es: "Sistemas de Recomendación IA",          en: "AI Recommendation Systems",          fr: "Systèmes de Recommandation IA"        },
    desc:  { es: "Motores de recomendación personalizados para productos y contenidos", en: "Personalized recommendation engines for products and content", fr: "Moteurs de recommandation personnalisés pour produits et contenus" } },
  { slug: "ai-operations-automation",       cat: "ia",            hasPage: false,
    title: { es: "Automatización de Operaciones IA",      en: "AI Operations Automation",           fr: "Automatisation des Opérations IA"     },
    desc:  { es: "AIOps para monitoreo, alertas y remediación automática de incidentes", en: "AIOps for monitoring, alerts and automatic incident remediation", fr: "AIOps pour monitoring, alertes et remédiation automatique d'incidents" } },

  // INTEGRACIONES
  { slug: "system-integration-architecture",cat: "integraciones", hasPage: false,
    title: { es: "Arquitectura de Integración",           en: "System Integration Architecture",   fr: "Architecture d'Intégration"           },
    desc:  { es: "Diseño de integración entre sistemas heterogéneos con cero fricción", en: "Integration design between heterogeneous systems with zero friction", fr: "Conception d'intégration entre systèmes hétérogènes" } },
  { slug: "api-integration-systems",        cat: "integraciones", hasPage: false,
    title: { es: "Integración de APIs",                   en: "API Integration Systems",            fr: "Systèmes d'Intégration API"           },
    desc:  { es: "Conexión de APIs externas con tu stack interno de forma confiable", en: "Reliable connection of external APIs with your internal stack", fr: "Connexion fiable d'APIs externes avec votre stack interne" } },
  { slug: "third-party-integration-platforms",cat:"integraciones",hasPage: false,
    title: { es: "Integraciones con Terceros",            en: "Third-Party Integration Platforms",  fr: "Plateformes d'Intégration Tierces"    },
    desc:  { es: "Stripe, HubSpot, Salesforce, Shopify y cualquier plataforma externa", en: "Stripe, HubSpot, Salesforce, Shopify and any external platform", fr: "Stripe, HubSpot, Salesforce, Shopify et toute plateforme externe" } },
  { slug: "unified-system-platforms",       cat: "integraciones", hasPage: false,
    title: { es: "Plataformas de Sistema Unificado",      en: "Unified System Platforms",           fr: "Plateformes Système Unifiées"         },
    desc:  { es: "Un solo panel para controlar múltiples sistemas y fuentes de datos", en: "A single panel to control multiple systems and data sources", fr: "Un seul panneau pour contrôler plusieurs systèmes et sources de données" } },
  { slug: "data-integration-pipelines",     cat: "integraciones", hasPage: false,
    title: { es: "Pipelines de Integración de Datos",     en: "Data Integration Pipelines",         fr: "Pipelines d'Intégration de Données"   },
    desc:  { es: "ETL/ELT entre bases de datos, data warehouses y aplicaciones", en: "ETL/ELT between databases, data warehouses and applications", fr: "ETL/ELT entre bases de données, entrepôts de données et applications" } },
  { slug: "enterprise-integration-systems", cat: "integraciones", hasPage: false,
    title: { es: "Integración Empresarial",               en: "Enterprise Integration Systems",     fr: "Systèmes d'Intégration d'Entreprise"  },
    desc:  { es: "ESB, middleware y patrones de integración para grandes organizaciones", en: "ESB, middleware and integration patterns for large organizations", fr: "ESB, middleware et patterns d'intégration pour grandes organisations" } },
  { slug: "automation-integration-systems", cat: "integraciones", hasPage: false,
    title: { es: "Automatización con Integración",        en: "Automation Integration Systems",     fr: "Systèmes d'Intégration Automatisés"   },
    desc:  { es: "n8n, Make y Zapier conectados a tus sistemas internos", en: "n8n, Make and Zapier connected to your internal systems", fr: "n8n, Make et Zapier connectés à vos systèmes internes" } },
  { slug: "crm-erp-integrations",           cat: "integraciones", hasPage: false,
    title: { es: "Integración CRM y ERP",                 en: "CRM & ERP Integrations",             fr: "Intégrations CRM & ERP"               },
    desc:  { es: "Sincronización bidireccional entre Odoo, Salesforce, HubSpot y más", en: "Bidirectional sync between Odoo, Salesforce, HubSpot and more", fr: "Synchronisation bidirectionnelle entre Odoo, Salesforce, HubSpot et plus" } },
  { slug: "workflow-integration-platforms", cat: "integraciones", hasPage: false,
    title: { es: "Plataformas de Flujo Integrado",        en: "Workflow Integration Platforms",     fr: "Plateformes de Flux Intégrés"         },
    desc:  { es: "Orquestación de flujos entre múltiples sistemas y equipos", en: "Flow orchestration between multiple systems and teams", fr: "Orchestration de flux entre plusieurs systèmes et équipes" } },
  { slug: "cross-platform-systems",         cat: "integraciones", hasPage: false,
    title: { es: "Sistemas Cross-Platform",               en: "Cross-Platform Systems",             fr: "Systèmes Cross-Platform"              },
    desc:  { es: "Lógica de negocio compartida entre web, móvil, desktop y APIs", en: "Shared business logic across web, mobile, desktop and APIs", fr: "Logique métier partagée entre web, mobile, desktop et APIs" } },

  // DATA
  { slug: "analytics-platforms",            cat: "data",          hasPage: false,
    title: { es: "Plataformas de Analytics",              en: "Analytics Platforms",                fr: "Plateformes Analytics"                },
    desc:  { es: "Metabase, Superset y dashboards custom para decisiones basadas en datos", en: "Metabase, Superset and custom dashboards for data-driven decisions", fr: "Metabase, Superset et dashboards custom pour décisions basées sur données" } },
  { slug: "business-intelligence-systems",  cat: "data",          hasPage: false,
    title: { es: "Business Intelligence",                 en: "Business Intelligence Systems",      fr: "Systèmes de Business Intelligence"    },
    desc:  { es: "Transformación de datos operativos en insights accionables", en: "Transformation of operational data into actionable insights", fr: "Transformation de données opérationnelles en insights actionnables" } },
  { slug: "real-time-analytics",            cat: "data",          hasPage: false,
    title: { es: "Analytics en Tiempo Real",              en: "Real-Time Analytics",                fr: "Analytics en Temps Réel"              },
    desc:  { es: "Métricas live con latencia sub-segundo usando streaming", en: "Live metrics with sub-second latency using streaming", fr: "Métriques live avec latence sous la seconde via streaming" } },
  { slug: "data-visualization-systems",     cat: "data",          hasPage: false,
    title: { es: "Visualización de Datos",                en: "Data Visualization Systems",         fr: "Systèmes de Visualisation de Données"  },
    desc:  { es: "Gráficas interactivas y mapas de calor con D3.js y recharts", en: "Interactive charts and heat maps with D3.js and recharts", fr: "Graphiques interactifs et cartes de chaleur avec D3.js et recharts" } },
  { slug: "reporting-automation-systems",   cat: "data",          hasPage: false,
    title: { es: "Reportes Automatizados",                en: "Reporting Automation Systems",       fr: "Systèmes de Reporting Automatisés"    },
    desc:  { es: "Reportes PDF y Excel generados automáticamente y enviados por email", en: "PDF and Excel reports automatically generated and sent by email", fr: "Rapports PDF et Excel générés automatiquement et envoyés par email" } },
  { slug: "predictive-analytics-systems",   cat: "data",          hasPage: false,
    title: { es: "Analytics Predictivo",                  en: "Predictive Analytics Systems",       fr: "Systèmes d'Analytics Prédictif"       },
    desc:  { es: "Modelos ML para forecast de ventas, demanda y comportamiento de usuarios", en: "ML models for sales, demand and user behavior forecasting", fr: "Modèles ML pour forecast de ventes, demande et comportement utilisateurs" } },
  { slug: "data-monitoring-platforms",      cat: "data",          hasPage: false,
    title: { es: "Monitoreo de Datos",                    en: "Data Monitoring Platforms",          fr: "Plateformes de Monitoring de Données"  },
    desc:  { es: "Alertas automáticas cuando los datos salen de rangos esperados", en: "Automatic alerts when data goes outside expected ranges", fr: "Alertes automatiques quand les données sortent des plages attendues" } },
  { slug: "data-pipeline-systems",          cat: "data",          hasPage: false,
    title: { es: "Pipelines de Datos",                    en: "Data Pipeline Systems",              fr: "Systèmes de Pipelines de Données"     },
    desc:  { es: "Airflow y dbt para mover, limpiar y transformar datos a escala", en: "Airflow and dbt to move, clean and transform data at scale", fr: "Airflow et dbt pour déplacer, nettoyer et transformer les données" } },
  { slug: "metrics-tracking-systems",       cat: "data",          hasPage: false,
    title: { es: "Tracking de Métricas",                  en: "Metrics Tracking Systems",           fr: "Systèmes de Suivi des Métriques"      },
    desc:  { es: "KPIs de negocio rastreados automáticamente desde múltiples fuentes", en: "Business KPIs automatically tracked from multiple sources", fr: "KPIs métier suivis automatiquement depuis plusieurs sources" } },
  { slug: "operational-analytics",          cat: "data",          hasPage: false,
    title: { es: "Analytics Operacional",                 en: "Operational Analytics",              fr: "Analytics Opérationnel"               },
    desc:  { es: "Visibilidad en tiempo real de la eficiencia de tus operaciones", en: "Real-time visibility into your operational efficiency", fr: "Visibilité temps réel sur l'efficacité de vos opérations" } },

  // APPS
  { slug: "web-saas",                       cat: "apps",          hasPage: true,
    title: { es: "Web Apps & SaaS",                      en: "Web Apps & SaaS",                    fr: "Web Apps & SaaS"                      },
    desc:  { es: "Next.js, FastAPI y Stripe para plataformas SaaS completas", en: "Next.js, FastAPI and Stripe for complete SaaS platforms", fr: "Next.js, FastAPI et Stripe pour plateformes SaaS complètes" } },
  { slug: "apps-moviles",                   cat: "apps",          hasPage: true,
    title: { es: "Apps Móviles",                         en: "Mobile Apps",                        fr: "Applications Mobiles"                 },
    desc:  { es: "Flutter cross-platform para iOS y Android con backend incluido", en: "Flutter cross-platform for iOS and Android with backend included", fr: "Flutter cross-platform pour iOS et Android avec backend inclus" } },
  { slug: "mobile-app-platforms",           cat: "apps",          hasPage: false,
    title: { es: "Plataformas de Apps Móviles",          en: "Mobile App Platforms",               fr: "Plateformes d'Applications Mobiles"   },
    desc:  { es: "Apps con backend, autenticación, pagos y notificaciones push", en: "Apps with backend, authentication, payments and push notifications", fr: "Apps avec backend, authentification, paiements et notifications push" } },
  { slug: "cross-platform-apps",            cat: "apps",          hasPage: false,
    title: { es: "Apps Cross-Platform",                  en: "Cross-Platform Apps",                fr: "Apps Cross-Platform"                  },
    desc:  { es: "Un código, múltiples plataformas: web, iOS, Android y desktop", en: "One codebase, multiple platforms: web, iOS, Android and desktop", fr: "Un code, plusieurs plateformes: web, iOS, Android et desktop" } },
  { slug: "saas-platform-development",      cat: "apps",          hasPage: false,
    title: { es: "Desarrollo de Plataformas SaaS",       en: "SaaS Platform Development",          fr: "Développement de Plateformes SaaS"    },
    desc:  { es: "Multi-tenant, billing, onboarding y panel admin desde cero", en: "Multi-tenant, billing, onboarding and admin panel from scratch", fr: "Multi-tenant, facturation, onboarding et panel admin depuis zéro" } },
  { slug: "mvp-development",                cat: "apps",          hasPage: false,
    title: { es: "Desarrollo de MVP",                    en: "MVP Development",                    fr: "Développement de MVP"                 },
    desc:  { es: "De idea a producto funcional en 6-8 semanas listo para primeros usuarios", en: "From idea to functional product in 6-8 weeks ready for first users", fr: "De l'idée au produit fonctionnel en 6-8 semaines" } },
  { slug: "web-app-systems",                cat: "apps",          hasPage: false,
    title: { es: "Sistemas Web App",                     en: "Web App Systems",                    fr: "Systèmes Web App"                      },
    desc:  { es: "Aplicaciones web interactivas con SSR, real-time y auth completa", en: "Interactive web applications with SSR, real-time and full auth", fr: "Applications web interactives avec SSR, temps réel et auth complète" } },
  { slug: "enterprise-applications",        cat: "apps",          hasPage: false,
    title: { es: "Aplicaciones Empresariales",           en: "Enterprise Applications",            fr: "Applications d'Entreprise"            },
    desc:  { es: "Software a medida para procesos críticos con SLA y soporte garantizado", en: "Custom software for critical processes with guaranteed SLA and support", fr: "Logiciel sur mesure pour processus critiques avec SLA garanti" } },
  { slug: "user-platform-systems",          cat: "apps",          hasPage: false,
    title: { es: "Plataformas de Usuario",               en: "User Platform Systems",              fr: "Systèmes de Plateformes Utilisateur"   },
    desc:  { es: "Portales de clientes con dashboard, historial y self-service", en: "Customer portals with dashboard, history and self-service", fr: "Portails clients avec tableau de bord, historique et self-service" } },
  { slug: "client-management-systems",      cat: "apps",          hasPage: false,
    title: { es: "Gestión de Clientes",                  en: "Client Management Systems",          fr: "Systèmes de Gestion Clients"           },
    desc:  { es: "CRM a medida con seguimiento, facturación y comunicación integrada", en: "Custom CRM with tracking, billing and integrated communication", fr: "CRM sur mesure avec suivi, facturation et communication intégrée" } },
  { slug: "workflow-applications",          cat: "apps",          hasPage: false,
    title: { es: "Aplicaciones de Flujo de Trabajo",     en: "Workflow Applications",              fr: "Applications de Flux de Travail"      },
    desc:  { es: "Apps internas para gestionar aprobaciones, tareas y procesos", en: "Internal apps to manage approvals, tasks and processes", fr: "Apps internes pour gérer approbations, tâches et processus" } },
  { slug: "automation-apps",                cat: "apps",          hasPage: false,
    title: { es: "Apps de Automatización",               en: "Automation Apps",                    fr: "Apps d'Automatisation"                },
    desc:  { es: "Interfaces para operar y monitorear tus automatizaciones", en: "Interfaces to operate and monitor your automations", fr: "Interfaces pour opérer et surveiller vos automatisations" } },

  // CLOUD
  { slug: "cloud-devops",                   cat: "cloud",         hasPage: true,
    title: { es: "Cloud & DevOps",                       en: "Cloud & DevOps",                     fr: "Cloud & DevOps"                       },
    desc:  { es: "Kubernetes, Terraform y CI/CD para infraestructura que nunca se cae", en: "Kubernetes, Terraform and CI/CD for infrastructure that never goes down", fr: "Kubernetes, Terraform et CI/CD pour infrastructure toujours disponible" } },
  { slug: "cloud-infrastructure-systems",   cat: "cloud",         hasPage: false,
    title: { es: "Infraestructura Cloud",                en: "Cloud Infrastructure Systems",       fr: "Systèmes d'Infrastructure Cloud"      },
    desc:  { es: "AWS, GCP y Azure con IaC, VPC, IAM y auto-scaling", en: "AWS, GCP and Azure with IaC, VPC, IAM and auto-scaling", fr: "AWS, GCP et Azure avec IaC, VPC, IAM et auto-scaling" } },
  { slug: "devops-automation",cat: "cloud",hasPage: false,
    title: { es: "Automatización DevOps",                en: "DevOps Automation",                  fr: "Automatisation DevOps"                },
    desc:  { es: "Pipelines que llevan código de dev a producción con cero intervención", en: "Pipelines that take code from dev to production with zero intervention", fr: "Pipelines qui amènent le code de dev à production sans intervention" } },
  { slug: "ci-cd-pipelines",                cat: "cloud",         hasPage: false,
    title: { es: "Pipelines CI/CD",                      en: "CI/CD Pipelines",                    fr: "Pipelines CI/CD"                       },
    desc:  { es: "GitHub Actions, ArgoCD y zero-downtime deployments con rollback", en: "GitHub Actions, ArgoCD and zero-downtime deployments with rollback", fr: "GitHub Actions, ArgoCD et déploiements zero-downtime avec rollback" } },
  { slug: "containerized-systems",          cat: "cloud",         hasPage: false,
    title: { es: "Sistemas Contenerizados",              en: "Containerized Systems",              fr: "Systèmes Conteneurisés"               },
    desc:  { es: "Docker y Kubernetes para despliegues reproducibles y escalables", en: "Docker and Kubernetes for reproducible and scalable deployments", fr: "Docker et Kubernetes pour déploiements reproductibles et évolutifs" } },
  { slug: "kubernetes-architecture",        cat: "cloud",         hasPage: false,
    title: { es: "Arquitectura Kubernetes",              en: "Kubernetes Architecture",            fr: "Architecture Kubernetes"              },
    desc:  { es: "Helm, namespaces, HPA y gestión de clusters para producción", en: "Helm, namespaces, HPA and cluster management for production", fr: "Helm, namespaces, HPA et gestion de clusters pour production" } },
  { slug: "deployment-automation",          cat: "cloud",         hasPage: false,
    title: { es: "Automatización de Despliegues",        en: "Deployment Automation",              fr: "Automatisation des Déploiements"      },
    desc:  { es: "Blue-green, canary y feature flags para deploys sin miedo", en: "Blue-green, canary and feature flags for fearless deployments", fr: "Blue-green, canary et feature flags pour déploiements sans crainte" } },
  { slug: "system-monitoring-platforms",    cat: "cloud",         hasPage: false,
    title: { es: "Monitoreo de Sistemas",                en: "System Monitoring Platforms",        fr: "Plateformes de Monitoring Système"    },
    desc:  { es: "Prometheus, Grafana y Sentry para saber qué pasa antes que tus usuarios", en: "Prometheus, Grafana and Sentry to know what happens before your users", fr: "Prometheus, Grafana et Sentry pour savoir avant vos utilisateurs" } },
  { slug: "high-availability-systems",      cat: "cloud",         hasPage: false,
    title: { es: "Sistemas de Alta Disponibilidad",      en: "High Availability Systems",          fr: "Systèmes Haute Disponibilité"         },
    desc:  { es: "SLA 99.9%+ con failover automático y replicación multi-zona", en: "99.9%+ SLA with automatic failover and multi-zone replication", fr: "SLA 99.9%+ avec failover automatique et réplication multi-zone" } },
  { slug: "scalable-cloud-platforms",       cat: "cloud",         hasPage: false,
    title: { es: "Plataformas Cloud Escalables",         en: "Scalable Cloud Platforms",           fr: "Plateformes Cloud Évolutives"         },
    desc:  { es: "Arquitecturas que crecen con tu negocio sin rediseñar", en: "Architectures that grow with your business without redesigning", fr: "Architectures qui grandissent avec votre entreprise sans refonte" } },
  { slug: "infrastructure-as-code",         cat: "cloud",         hasPage: false,
    title: { es: "Infraestructura como Código",          en: "Infrastructure as Code",             fr: "Infrastructure as Code"               },
    desc:  { es: "Terraform y Ansible para infraestructura reproducible y auditada", en: "Terraform and Ansible for reproducible and audited infrastructure", fr: "Terraform et Ansible pour infrastructure reproductible et auditée" } },

  // SEGURIDAD
  { slug: "secure-backend-systems",         cat: "seguridad",     hasPage: false,
    title: { es: "Backends Seguros",                     en: "Secure Backend Systems",             fr: "Systèmes Backend Sécurisés"           },
    desc:  { es: "Hardening, WAF y prácticas OWASP para proteger tu API", en: "Hardening, WAF and OWASP practices to protect your API", fr: "Hardening, WAF et pratiques OWASP pour protéger votre API" } },
  { slug: "authentication-authorization-systems",cat:"seguridad", hasPage: false,
    title: { es: "Autenticación y Autorización",         en: "Authentication & Authorization Systems",fr: "Systèmes d'Authentification & Autorisation" },
    desc:  { es: "JWT, OAuth2, SAML y MFA para acceso seguro a tus sistemas", en: "JWT, OAuth2, SAML and MFA for secure access to your systems", fr: "JWT, OAuth2, SAML et MFA pour accès sécurisé à vos systèmes" } },
  { slug: "role-based-access-control",      cat: "seguridad",     hasPage: false,
    title: { es: "Control de Acceso por Roles",          en: "Role-Based Access Control",          fr: "Contrôle d'Accès Basé sur les Rôles"  },
    desc:  { es: "RBAC y ABAC granulares para que cada usuario vea solo lo que debe", en: "Granular RBAC and ABAC so each user sees only what they should", fr: "RBAC et ABAC granulaires pour que chaque utilisateur voie ce qu'il doit" } },
  { slug: "data-security-systems",          cat: "seguridad",     hasPage: false,
    title: { es: "Seguridad de Datos",                   en: "Data Security Systems",              fr: "Systèmes de Sécurité des Données"     },
    desc:  { es: "Encryption at rest y in transit, masking y gestión de secretos", en: "Encryption at rest and in transit, masking and secrets management", fr: "Chiffrement au repos et en transit, masquage et gestion des secrets" } },
  { slug: "system-protection-architecture", cat: "seguridad",     hasPage: false,
    title: { es: "Arquitectura de Protección",           en: "System Protection Architecture",     fr: "Architecture de Protection Système"   },
    desc:  { es: "Defense in depth: múltiples capas de seguridad desde diseño", en: "Defense in depth: multiple security layers from design", fr: "Defense in depth: plusieurs couches de sécurité dès la conception" } },
  { slug: "secure-api-systems",             cat: "seguridad",     hasPage: false,
    title: { es: "APIs Seguras",                         en: "Secure API Systems",                 fr: "Systèmes API Sécurisés"               },
    desc:  { es: "Rate limiting, validación de inputs y autenticación robusta", en: "Rate limiting, input validation and robust authentication", fr: "Rate limiting, validation d'entrées et authentification robuste" } },
  { slug: "identity-management-systems",    cat: "seguridad",     hasPage: false,
    title: { es: "Gestión de Identidades",               en: "Identity Management Systems",        fr: "Systèmes de Gestion des Identités"    },
    desc:  { es: "SSO, directorios y gestión centralizada de identidades", en: "SSO, directories and centralized identity management", fr: "SSO, annuaires et gestion centralisée des identités" } },
  { slug: "compliance-ready-systems",       cat: "seguridad",     hasPage: false,
    title: { es: "Sistemas Ready para Compliance",       en: "Compliance-Ready Systems",           fr: "Systèmes Prêts pour la Conformité"    },
    desc:  { es: "Arquitecturas preparadas para SOC2, ISO27001, GDPR y HIPAA", en: "Architectures ready for SOC2, ISO27001, GDPR and HIPAA", fr: "Architectures prêtes pour SOC2, ISO27001, GDPR et HIPAA" } },
  { slug: "access-control-systems",         cat: "seguridad",     hasPage: false,
    title: { es: "Sistemas de Control de Acceso",        en: "Access Control Systems",             fr: "Systèmes de Contrôle d'Accès"         },
    desc:  { es: "Políticas de acceso granulares y auditoría completa de acciones", en: "Granular access policies and complete action auditing", fr: "Politiques d'accès granulaires et audit complet des actions" } },
  { slug: "audit-logging-systems",          cat: "seguridad",     hasPage: false,
    title: { es: "Logging y Auditoría",                  en: "Audit Logging Systems",              fr: "Systèmes de Logging et Audit"         },
    desc:  { es: "Logs inmutables y trazabilidad completa de cada acción del sistema", en: "Immutable logs and complete traceability of every system action", fr: "Logs immuables et traçabilité complète de chaque action système" } },

  // IOT
  { slug: "iot-hardware",                   cat: "iot",           hasPage: true,
    title: { es: "IoT & Hardware",                       en: "IoT & Hardware",                     fr: "IoT & Hardware"                       },
    desc:  { es: "ESP32, MQTT, Grafana y OTA para conectar tu hardware a la nube", en: "ESP32, MQTT, Grafana and OTA to connect your hardware to the cloud", fr: "ESP32, MQTT, Grafana et OTA pour connecter votre hardware au cloud" } },
  { slug: "iot-integration-systems",        cat: "iot",           hasPage: false,
    title: { es: "Integración IoT",                      en: "IoT Integration Systems",            fr: "Systèmes d'Intégration IoT"           },
    desc:  { es: "Conectar sensores y dispositivos físicos con sistemas de software", en: "Connecting physical sensors and devices with software systems", fr: "Connexion de capteurs et dispositifs physiques avec systèmes logiciels" } },
  { slug: "smart-gym-systems",              cat: "iot",           hasPage: false,
    title: { es: "Sistemas para Gimnasios Inteligentes",  en: "Smart Gym Systems",                  fr: "Systèmes de Gymnases Intelligents"    },
    desc:  { es: "Control de acceso, monitoreo de equipos y analytics de uso", en: "Access control, equipment monitoring and usage analytics", fr: "Contrôle d'accès, monitoring d'équipements et analytics d'utilisation" } },
  { slug: "hardware-software-integration",  cat: "iot",           hasPage: false,
    title: { es: "Integración Hardware-Software",         en: "Hardware-Software Integration",      fr: "Intégration Hardware-Software"        },
    desc:  { es: "Puente entre el mundo físico y digital con firmware y APIs", en: "Bridge between physical and digital world with firmware and APIs", fr: "Pont entre monde physique et numérique avec firmware et APIs" } },
  { slug: "access-control-systems-iot",     cat: "iot",           hasPage: false,
    title: { es: "Control de Acceso Físico",              en: "Physical Access Control Systems",   fr: "Systèmes de Contrôle d'Accès Physique" },
    desc:  { es: "Torniquetes, lectores RFID y biometría integrados con software", en: "Turnstiles, RFID readers and biometrics integrated with software", fr: "Tourniquets, lecteurs RFID et biométrie intégrés avec logiciel" } },
  { slug: "camera-ai-integration",          cat: "iot",           hasPage: false,
    title: { es: "Integración Cámara + IA",               en: "Camera & AI Integration",           fr: "Intégration Caméra & IA"              },
    desc:  { es: "Computer vision para detección de personas, objetos y anomalías", en: "Computer vision for person, object and anomaly detection", fr: "Computer vision pour détection de personnes, objets et anomalies" } },
  { slug: "smart-device-systems",           cat: "iot",           hasPage: false,
    title: { es: "Sistemas de Dispositivos Inteligentes", en: "Smart Device Systems",              fr: "Systèmes de Dispositifs Intelligents"  },
    desc:  { es: "Gestión de flotas de dispositivos con OTA, telemetría y alertas", en: "Device fleet management with OTA, telemetry and alerts", fr: "Gestion de flottes de dispositifs avec OTA, télémétrie et alertes" } },
  { slug: "real-world-automation-systems",  cat: "iot",           hasPage: false,
    title: { es: "Automatización del Mundo Real",         en: "Real-World Automation Systems",     fr: "Systèmes d'Automatisation du Monde Réel" },
    desc:  { es: "Actuadores, relés y PLCs controlados desde software en la nube", en: "Actuators, relays and PLCs controlled from cloud software", fr: "Actionneurs, relais et PLCs contrôlés depuis logiciel cloud" } },
  { slug: "sensor-data-systems",            cat: "iot",           hasPage: false,
    title: { es: "Sistemas de Datos de Sensores",         en: "Sensor Data Systems",               fr: "Systèmes de Données de Capteurs"      },
    desc:  { es: "Ingesta, procesamiento y visualización de telemetría de sensores", en: "Ingestion, processing and visualization of sensor telemetry", fr: "Ingestion, traitement et visualisation de télémétrie de capteurs" } },
  { slug: "embedded-integration-platforms", cat: "iot",           hasPage: false,
    title: { es: "Plataformas de Integración Embebida",   en: "Embedded Integration Platforms",   fr: "Plateformes d'Intégration Embarquée"  },
    desc:  { es: "Firmware que habla con la nube: MQTT, REST y protocolos industriales", en: "Firmware that talks to the cloud: MQTT, REST and industrial protocols", fr: "Firmware qui parle au cloud: MQTT, REST et protocoles industriels" } },
  { slug: "physical-digital-systems",       cat: "iot",           hasPage: false,
    title: { es: "Sistemas Físico-Digitales",             en: "Physical-Digital Systems",          fr: "Systèmes Physico-Numériques"          },
    desc:  { es: "Digital twins y sincronización entre el mundo físico y digital", en: "Digital twins and synchronization between physical and digital world", fr: "Jumeaux numériques et synchronisation entre monde physique et numérique" } },

  // TRANSFORMACION
  { slug: "agentes-autonomos",              cat: "transformacion", hasPage: true,
    title: { es: "Agentes IA de Alto Impacto",            en: "High-Impact AI Agents",             fr: "Agents IA à Haut Impact"              },
    desc:  { es: "Agentes que reemplazan equipos completos de operaciones", en: "Agents that replace entire operations teams", fr: "Agents qui remplacent des équipes entières d'opérations" } },
  { slug: "end-to-end-system-design",       cat: "transformacion", hasPage: false,
    title: { es: "Diseño de Sistema End-to-End",          en: "End-to-End System Design",          fr: "Conception Système End-to-End"        },
    desc:  { es: "Desde la estrategia hasta el deploy: un solo equipo, una sola visión", en: "From strategy to deploy: one team, one vision", fr: "De la stratégie au déploiement: une seule équipe, une vision" } },
  { slug: "business-transformation-platforms",cat:"transformacion",hasPage: false,
    title: { es: "Plataformas de Transformación",         en: "Business Transformation Platforms", fr: "Plateformes de Transformation Métier"  },
    desc:  { es: "Ecosistemas tecnológicos completos para digitalizar el negocio", en: "Complete technology ecosystems to digitize the business", fr: "Écosystèmes technologiques complets pour digitaliser l'entreprise" } },
  { slug: "operations-automation-systems",  cat: "transformacion", hasPage: false,
    title: { es: "Automatización Total de Operaciones",   en: "Operations Automation Systems",     fr: "Systèmes d'Automatisation Totale"     },
    desc:  { es: "Operaciones que se gestionan solas con supervisión mínima", en: "Operations that manage themselves with minimal supervision", fr: "Opérations qui se gèrent seules avec supervision minimale" } },
  { slug: "enterprise-digital-systems",     cat: "transformacion", hasPage: false,
    title: { es: "Sistemas Digitales Empresariales",      en: "Enterprise Digital Systems",        fr: "Systèmes Numériques d'Entreprise"     },
    desc:  { es: "Stack tecnológico completo diseñado para crecer con la empresa", en: "Complete technology stack designed to grow with the company", fr: "Stack technologique complet conçu pour grandir avec l'entreprise" } },
  { slug: "process-automation-platforms",   cat: "transformacion", hasPage: false,
    title: { es: "Plataformas de Automatización de Procesos", en: "Process Automation Platforms", fr: "Plateformes d'Automatisation des Processus" },
    desc:  { es: "RPA, IA y flujos de trabajo integrados para cero trabajo manual", en: "RPA, AI and integrated workflows for zero manual work", fr: "RPA, IA et flux de travail intégrés pour zéro travail manuel" } },
  { slug: "intelligent-business-systems",   cat: "transformacion", hasPage: false,
    title: { es: "Sistemas de Negocio Inteligentes",      en: "Intelligent Business Systems",      fr: "Systèmes Métier Intelligents"         },
    desc:  { es: "Negocios donde la IA toma decisiones operativas en tiempo real", en: "Businesses where AI makes operational decisions in real time", fr: "Entreprises où l'IA prend des décisions opérationnelles en temps réel" } },
  { slug: "full-system-implementation",     cat: "transformacion", hasPage: false,
    title: { es: "Implementación de Sistema Completo",    en: "Full System Implementation",        fr: "Implémentation Système Complète"      },
    desc:  { es: "Diseño, desarrollo, deploy y operación de tu stack completo", en: "Design, development, deploy and operation of your complete stack", fr: "Conception, développement, déploiement et opération de votre stack" } },
  { slug: "scalable-operations-platforms",  cat: "transformacion", hasPage: false,
    title: { es: "Operaciones Escalables",                en: "Scalable Operations Platforms",     fr: "Plateformes d'Opérations Évolutives"  },
    desc:  { es: "Plataformas que escalan de 10 a 10,000 usuarios sin rediseñar", en: "Platforms that scale from 10 to 10,000 users without redesigning", fr: "Plateformes qui passent de 10 à 10 000 utilisateurs sans refonte" } },
  { slug: "system-modernization",           cat: "transformacion", hasPage: false,
    title: { es: "Modernización de Sistemas",             en: "System Modernization",              fr: "Modernisation de Systèmes"            },
    desc:  { es: "Migración de sistemas legacy a arquitecturas modernas y escalables", en: "Migration of legacy systems to modern and scalable architectures", fr: "Migration de systèmes legacy vers des architectures modernes" } },
  { slug: "legacy-system-transformation",   cat: "transformacion", hasPage: false,
    title: { es: "Transformación de Sistemas Legacy",     en: "Legacy System Transformation",      fr: "Transformation de Systèmes Legacy"    },
    desc:  { es: "Reescritura y migración de sistemas obsoletos con cero pérdida de datos", en: "Rewriting and migrating obsolete systems with zero data loss", fr: "Réécriture et migration de systèmes obsolètes sans perte de données" } },
  { slug: "odoo-erp",                       cat: "transformacion", hasPage: true,
    title: { es: "Odoo ERP",                             en: "Odoo ERP",                           fr: "Odoo ERP"                             },
    desc:  { es: "Implementación y personalización de Odoo para unificar tu empresa", en: "Implementation and customization of Odoo to unify your company", fr: "Implémentation et personnalisation d'Odoo pour unifier votre entreprise" } },
];

// ─── UI copy ──────────────────────────────────────────────────
const UI = {
  eyebrow:    { es: 'Servicios', en: 'Services', fr: 'Services' },
  h1a:        { es: 'Todo lo que', en: 'Everything we', fr: 'Tout ce que' },
  h1b:        { es: 'podemos construir', en: 'can build', fr: 'nous pouvons construire' },
  h1c:        { es: 'para ti', en: 'for you', fr: 'pour vous' },
  subtitle:   {
    es: 'Más de 100 servicios especializados organizados por categoría. Cada uno con tecnología real y casos de éxito en producción.',
    en: 'Over 100 specialized services organized by category. Each one with real technology and production success cases.',
    fr: 'Plus de 100 services spécialisés organisés par catégorie. Chacun avec une technologie réelle et des cas de succès en production.',
  },
  all:        { es: 'Todos', en: 'All', fr: 'Tous' },
  search:     { es: 'Buscar servicio...', en: 'Search service...', fr: 'Rechercher un service...' },
  noResults:  { es: 'No hay servicios que coincidan', en: 'No matching services', fr: 'Aucun service correspondant' },
  hasPage:    { es: 'Ver página →', en: 'View page →', fr: 'Voir la page →' },
  schedule:   { es: 'Consultar', en: 'Inquire', fr: 'Renseigner' },
  ctaTitle:   { es: '¿No encuentras lo que buscas?', en: "Don't find what you're looking for?", fr: 'Vous ne trouvez pas ce que vous cherchez ?' },
  ctaSub:     {
    es: 'Cuéntanos tu problema. Tenemos la capacidad de construir prácticamente cualquier sistema.',
    en: 'Tell us your problem. We have the capability to build practically any system.',
    fr: "Décrivez votre problème. Nous avons la capacité de construire pratiquement n'importe quel système.",
  },
  ctaBtn:     { es: 'Agendar consulta gratuita', en: 'Schedule free consultation', fr: 'Planifier une consultation gratuite' },
  statSvc:    { es: 'servicios', en: 'services', fr: 'services' },
  statCat:    { es: 'categorías', en: 'categories', fr: 'catégories' },
}
const tx = (k: keyof typeof UI, l: Lang) => UI[k][l]

// ─── Service Card ─────────────────────────────────────────────
function SvcCard({ s, lang, cat, i }: { s: Service; lang: Lang; cat: Category; i: number }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      sx={{
        bgcolor: C.bgWhite,
        border: `1px solid ${hov ? alpha(cat.color, 0.35) : C.border}`,
        borderRadius: '14px',
        p: 2.5,
        display: 'flex', flexDirection: 'column', gap: 1.5,
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? `0 12px 32px ${alpha(cat.color, 0.12)}` : '0 1px 4px rgba(0,0,0,0.04)',
        cursor: 'default',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Color bar */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${cat.color}, ${alpha(cat.color, 0.2)})`,
        opacity: hov ? 1 : 0.4, transition: 'opacity 0.2s',
      }}/>

      {/* Icon + title */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, pt: 0.5 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
          bgcolor: hov ? cat.color : alpha(cat.color, 0.1),
          color: hov ? '#fff' : cat.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', transition: 'all 0.2s',
        }}>
          {cat.emoji}
        </Box>
        <Typography sx={{
          fontWeight: 700, fontSize: '0.88rem',
          color: C.text, lineHeight: 1.3, pt: 0.3,
        }}>
          {s.title[lang]}
        </Typography>
      </Box>

      {/* Desc */}
      <Typography sx={{
        fontSize: '0.75rem', color: C.textMid, lineHeight: 1.6,
        flex: 1,
      }}>
        {s.desc[lang]}
      </Typography>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          component="a"
          href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica"
          target="_blank"
          size="small"
          startIcon={<FiCalendar size={11}/>}
          sx={{
            flex: 1,
            bgcolor: hov ? cat.color : alpha(cat.color, 0.07),
            color: hov ? '#fff' : cat.color,
            border: `1px solid ${hov ? 'transparent' : alpha(cat.color, 0.2)}`,
            fontWeight: 700, fontSize: '0.7rem',
            textTransform: 'none', borderRadius: '8px', py: 0.7,
            transition: 'all 0.2s',
            '&:hover': { bgcolor: cat.color, color: '#fff' },
          }}
        >
          {tx('schedule', lang)}
        </Button>

        {s.hasPage && (
          <Button
            component={Link}
            href={`/${lang}/servicios/${s.slug}`}
            size="small"
            endIcon={<FiArrowRight size={11}/>}
            sx={{
              color: C.textMute, fontWeight: 600, fontSize: '0.7rem',
              textTransform: 'none', borderRadius: '8px', py: 0.7, px: 1.25,
              border: `1px solid ${C.border}`,
              transition: 'all 0.18s',
              '&:hover': { color: cat.color, borderColor: alpha(cat.color, 0.3), bgcolor: alpha(cat.color, 0.05) },
            }}
          >
            {tx('hasPage', lang)}
          </Button>
        )}
      </Box>
    </Box>
  )
}

// ─── Category Section ─────────────────────────────────────────
function CategorySection({ cat, services, lang }: { cat: Category; services: Service[]; lang: Lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  if (services.length === 0) return null

  return (
    <Box ref={ref} sx={{ mb: { xs: 6, md: 8 } }}>
      {/* Category header */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease }}
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.5, mb: 3,
          pb: 2, borderBottom: `2px solid ${alpha(cat.color, 0.15)}`,
        }}
      >
        <Box sx={{
          width: 40, height: 40, borderRadius: '12px',
          bgcolor: alpha(cat.color, 0.12),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.25rem',
        }}>
          {cat.emoji}
        </Box>
        <Box>
          <Typography sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800, fontSize: { xs: '1.1rem', md: '1.3rem' },
            color: C.text, lineHeight: 1.2,
          }}>
            {cat.label[lang]}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: C.textMute, mt: 0.1 }}>
            {services.length} {services.length === 1 ? (lang === 'es' ? 'servicio' : lang === 'en' ? 'service' : 'service') : (lang === 'es' ? 'servicios' : lang === 'en' ? 'services' : 'services')}
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', width: 32, height: 3, bgcolor: cat.color, borderRadius: 2 }}/>
      </Box>

      {/* Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4,1fr)' },
        gap: 2,
      }}>
        {services.map((s, i) => (
          <SvcCard key={s.slug + s.cat} s={s} lang={lang} cat={cat} i={i}/>
        ))}
      </Box>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function ServiciosClient({ lang }: { lang: Lang }) {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState<string>('all')
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return SERVICES.filter(s => {
      const matchCat = activeCat === 'all' || s.cat === activeCat
      const matchQ = !q
        || s.title[lang].toLowerCase().includes(q)
        || s.desc[lang].toLowerCase().includes(q)
        || s.slug.includes(q)
      return matchCat && matchQ
    })
  }, [search, activeCat, lang])

  const catMap = useMemo(() => {
    const m: Record<string, Category> = {}
    CATEGORIES.forEach(c => { m[c.id] = c })
    return m
  }, [])

  const grouped = useMemo(() => {
    const g: Record<string, Service[]> = {}
    CATEGORIES.forEach(c => { g[c.id] = [] })
    filtered.forEach(s => {
      if (!g[s.cat]) g[s.cat] = []
      g[s.cat].push(s)
    })
    return g
  }, [filtered])

  const totalVisible = filtered.length

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <Box ref={heroRef} sx={{
        bgcolor: C.bgDark, pt: { xs: 8, md: 12 }, pb: { xs: 7, md: 10 },
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(0,174,239,0.04) 1px, transparent 1px),
                            linear-gradient(90deg,rgba(0,174,239,0.04) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }}/>
        <Box sx={{ position: 'absolute', top: -100, right: -80, width: 400, height: 400, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(130px)', opacity: 0.08, zIndex: 0 }}/>
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', bgcolor: '#7C3AED', filter: 'blur(100px)', opacity: 0.06, zIndex: 0 }}/>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box component={motion.div} initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
            {/* Eyebrow */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.75, py: 0.6, border: '1px solid rgba(0,174,239,0.25)', borderRadius: '100px', bgcolor: 'rgba(0,174,239,0.08)', mb: 3 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: C.green, animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.35 } } }}/>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: C.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {tx('eyebrow', lang)}
              </Typography>
            </Box>

            {/* H1 */}
            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.2rem' }, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', mb: 0.25 }}>
              {tx('h1a', lang)}{" "}
              <Box component="span" sx={{ color: C.accent }}>{tx('h1b', lang)}</Box>
            </Typography>
            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.2rem' }, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.2)', mb: 3 }}>
              {tx('h1c', lang)}
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.45)', maxWidth: 560, lineHeight: 1.8, mb: 4 }}>
              {tx('subtitle', lang)}
            </Typography>

            {/* Stats pills */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {[
                { v: SERVICES.length + '+', l: tx('statSvc', lang) },
                { v: CATEGORIES.length.toString(), l: tx('statCat', lang) },
                { v: '100%', l: lang === 'es' ? 'en producción real' : lang === 'en' ? 'in real production' : 'en production réelle' },
              ].map((st, i) => (
                <Box key={i} component={motion.div} initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.5, bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', color: C.accent, lineHeight: 1 }}>{st.v}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}>{st.l}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Filters ── */}
      <Box sx={{ bgcolor: C.bgWhite, borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 68, zIndex: 100 }}>
        <Container maxWidth="lg">
          <Box sx={{ py: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { md: 'center' } }}>
            {/* Search */}
            <TextField
              size="small"
              placeholder={tx('search', lang)}
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><FiSearch size={15} color={C.textMute}/></InputAdornment>,
              }}
              sx={{
                width: { xs: '100%', md: 280 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', fontSize: '0.85rem',
                  '& fieldset': { borderColor: C.border },
                  '&:hover fieldset': { borderColor: C.accentLine },
                  '&.Mui-focused fieldset': { borderColor: C.accent, borderWidth: 1 },
                },
              }}
            />

            {/* Category tabs — horizontal scroll */}
            <Box sx={{ display: 'flex', gap: 0.75, overflowX: 'auto', pb: 0.5, flexShrink: 0, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
              <Chip
                label={tx('all', lang)}
                onClick={() => setActiveCat('all')}
                sx={{
                  fontWeight: 700, fontSize: '0.75rem', height: 30,
                  bgcolor: activeCat === 'all' ? C.accent : 'transparent',
                  color: activeCat === 'all' ? '#fff' : C.textMid,
                  border: `1px solid ${activeCat === 'all' ? C.accent : C.border}`,
                  cursor: 'pointer', flexShrink: 0,
                  '&:hover': { bgcolor: activeCat === 'all' ? C.accentDk : C.accentBg },
                }}
              />
              {CATEGORIES.map(cat => (
                <Chip
                  key={cat.id}
                  label={`${cat.emoji} ${cat.label[lang]}`}
                  onClick={() => setActiveCat(activeCat === cat.id ? 'all' : cat.id)}
                  sx={{
                    fontWeight: 600, fontSize: '0.72rem', height: 30,
                    bgcolor: activeCat === cat.id ? alpha(cat.color, 0.12) : 'transparent',
                    color: activeCat === cat.id ? cat.color : C.textMid,
                    border: `1px solid ${activeCat === cat.id ? alpha(cat.color, 0.4) : C.border}`,
                    cursor: 'pointer', flexShrink: 0,
                    '&:hover': { bgcolor: alpha(cat.color, 0.1), borderColor: alpha(cat.color, 0.3), color: cat.color },
                  }}
                />
              ))}
            </Box>

            {/* Count */}
            <Typography sx={{ ml: 'auto', fontSize: '0.78rem', color: C.textMute, whiteSpace: 'nowrap', flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
              {totalVisible} {tx('statSvc', lang)}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {totalVisible === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontSize: '2rem', mb: 1 }}>🔍</Typography>
            <Typography sx={{ fontSize: '1rem', color: C.textMute }}>{tx('noResults', lang)}</Typography>
          </Box>
        ) : activeCat === 'all' ? (
          // Mostrar por categorías
          CATEGORIES.map(cat => (
            <CategorySection key={cat.id} cat={cat} services={grouped[cat.id] || []} lang={lang}/>
          ))
        ) : (
          // Solo categoría activa
          <CategorySection cat={catMap[activeCat]} services={filtered} lang={lang}/>
        )}
      </Container>

      {/* ── CTA final ── */}
      <Box sx={{ bgcolor: C.bgDark, py: { xs: 8, md: 11 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 65% 50%, ${alpha(C.accent, 0.07)} 0%, transparent 55%)`, zIndex: 0 }}/>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box component={motion.div} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, ease }}>
            <Box sx={{ width: 48, height: 2, bgcolor: C.accent, borderRadius: 2, mx: 'auto', mb: 4 }}/>
            <Typography variant="h2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.4rem' }, color: '#fff', mb: 2, letterSpacing: '-0.02em' }}>
              {tx('ctaTitle', lang)}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', maxWidth: 460, mx: 'auto', lineHeight: 1.8, mb: 5 }}>
              {tx('ctaSub', lang)}
            </Typography>
            <Button
              component="a"
              href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica"
              target="_blank"
              variant="contained"
              size="large"
              startIcon={<FiCalendar size={17}/>}
              endIcon={<FiArrowRight size={15}/>}
              sx={{
                bgcolor: C.accent, color: '#fff', fontWeight: 700, textTransform: 'none',
                borderRadius: '14px', px: { xs: 3.5, md: 5 }, py: 1.6,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                boxShadow: `0 8px 28px ${alpha(C.accent, 0.4)}`,
                transition: 'all 0.22s ease',
                '&:hover': { bgcolor: C.accentDk, boxShadow: `0 12px 36px ${alpha(C.accent, 0.5)}`, transform: 'translateY(-2px)' },
              }}
            >
              {tx('ctaBtn', lang)}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}