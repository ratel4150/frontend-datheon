'use client'

import { Box, Container, Typography, Button, alpha, TextField, InputAdornment, Chip } from '@mui/material'
import {
  MdShoppingCart, MdAttachMoney, MdPhoneIphone, MdLocalHospital,
  MdGavel, MdSchool, MdBusiness, MdSecurity, MdLocalShipping,
  MdBuild, MdStore, MdAgriculture, MdElectricalServices,
  MdDirectionsCar, MdPublic, MdLiveTv, MdPeople, MdFlight, MdSportsSoccer,
} from 'react-icons/md'
import { FiSearch, FiArrowRight, FiCalendar, FiTrendingUp, FiZap } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import Link from 'next/link'

// ─── Tokens ──────────────────────────────────────────────────
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

// ─── Sector data ──────────────────────────────────────────────
interface Sector {
  id: string
  icon: React.ReactNode
  color: string
  cat: string
  title: Record<Lang, string>
  tagline: Record<Lang, string>
  metrics: string[]
  services: Record<Lang, string[]>
}

const SECTORS: Sector[] = [
  {
    id: 'ecommerce', color: '#F59E0B', cat: 'comercio',
    icon: <MdShoppingCart size={22}/>,
    title:   { es: 'E-commerce',        en: 'E-commerce',        fr: 'E-commerce'          },
    tagline: { es: 'Convierte más, abandona menos', en: 'Convert more, abandon less', fr: 'Convertissez plus, abandonnez moins' },
    metrics: ['+35% ticket promedio', '-30% abandonos', '+40% satisfacción'],
    services: {
      es: ['Recomendaciones personalizadas', 'Chatbot de ventas 24/7', 'Optimización de checkout', 'Analytics de comportamiento'],
      en: ['Personalized recommendations', '24/7 sales chatbot', 'Checkout optimization', 'Behavior analytics'],
      fr: ['Recommandations personnalisées', 'Chatbot de vente 24/7', 'Optimisation du checkout', 'Analytique comportementale'],
    },
  },
  {
    id: 'banca', color: '#10B981', cat: 'finanzas',
    icon: <MdAttachMoney size={22}/>,
    title:   { es: 'Banca Digital',     en: 'Digital Banking',   fr: 'Banque Digitale'     },
    tagline: { es: 'Scoring, fraude y autogestión con IA', en: 'Scoring, fraud and self-service with AI', fr: 'Scoring, fraude et self-service avec IA' },
    metrics: ['+25% precisión scoring', '+80% autogestión', 'Anti-fraude ML'],
    services: {
      es: ['Scoring crediticio con ML', 'Detección de fraude en tiempo real', 'Asistente bancario IA', 'Onboarding digital'],
      en: ['ML credit scoring', 'Real-time fraud detection', 'AI banking assistant', 'Digital onboarding'],
      fr: ['Scoring crédit ML', 'Détection fraude temps réel', 'Assistant bancaire IA', 'Onboarding digital'],
    },
  },
  {
    id: 'telecom', color: '#6366F1', cat: 'tecnologia',
    icon: <MdPhoneIphone size={22}/>,
    title:   { es: 'Telecomunicaciones', en: 'Telecom',          fr: 'Télécommunications'  },
    tagline: { es: 'Resolución automática y detección de fallos', en: 'Automatic resolution and fault detection', fr: 'Résolution automatique et détection de pannes' },
    metrics: ['+65% resolución automática', '+90% detección fallos'],
    services: {
      es: ['Soporte técnico automatizado', 'Predicción de churn', 'Detección de anomalías de red', 'Chatbot multicanal'],
      en: ['Automated technical support', 'Churn prediction', 'Network anomaly detection', 'Multichannel chatbot'],
      fr: ['Support technique automatisé', 'Prédiction churn', 'Détection anomalies réseau', 'Chatbot multicanal'],
    },
  },
  {
    id: 'salud', color: '#EF4444', cat: 'salud',
    icon: <MdLocalHospital size={22}/>,
    title:   { es: 'Salud Digital',     en: 'Digital Health',    fr: 'Santé Digitale'      },
    tagline: { es: 'Más eficiencia clínica y precisión diagnóstica', en: 'More clinical efficiency and diagnostic accuracy', fr: 'Plus d\'efficacité clinique et de précision diagnostique' },
    metrics: ['+50% eficiencia', '+30% precisión diagnóstico'],
    services: {
      es: ['Agendamiento inteligente', 'Análisis de imágenes médicas', 'Asistente clínico IA', 'Historia clínica digital'],
      en: ['Smart scheduling', 'Medical image analysis', 'AI clinical assistant', 'Digital medical records'],
      fr: ['Planification intelligente', 'Analyse d\'images médicales', 'Assistant clinique IA', 'Dossier médical numérique'],
    },
  },
  {
    id: 'legal', color: '#8B5CF6', cat: 'servicios',
    icon: <MdGavel size={22}/>,
    title:   { es: 'Legal Tech',        en: 'Legal Tech',        fr: 'Legal Tech'          },
    tagline: { es: 'NLP para contratos y documentos legales', en: 'NLP for contracts and legal documents', fr: 'NLP pour contrats et documents juridiques' },
    metrics: ['70% más rápido con NLP', '+90% precisión docs'],
    services: {
      es: ['Revisión automática de contratos', 'Búsqueda semántica legal', 'Generación de documentos', 'Due diligence IA'],
      en: ['Automatic contract review', 'Legal semantic search', 'Document generation', 'AI due diligence'],
      fr: ['Révision automatique de contrats', 'Recherche sémantique juridique', 'Génération de documents', 'Due diligence IA'],
    },
  },
  {
    id: 'edu', color: '#F97316', cat: 'educacion',
    icon: <MdSchool size={22}/>,
    title:   { es: 'Edu Tech',          en: 'Edu Tech',          fr: 'Edu Tech'            },
    tagline: { es: 'Mayor retención y aprendizaje adaptativo', en: 'Higher retention and adaptive learning', fr: 'Meilleure rétention et apprentissage adaptatif' },
    metrics: ['+45% retención', 'Visión artificial en exámenes'],
    services: {
      es: ['Plataforma LMS personalizada', 'Tutoría IA adaptativa', 'Detección de dificultades', 'Certificaciones digitales'],
      en: ['Custom LMS platform', 'Adaptive AI tutoring', 'Difficulty detection', 'Digital certifications'],
      fr: ['Plateforme LMS personnalisée', 'Tutorat IA adaptatif', 'Détection de difficultés', 'Certifications digitales'],
    },
  },
  {
    id: 'realestate', color: '#0EA5E9', cat: 'comercio',
    icon: <MdBusiness size={22}/>,
    title:   { es: 'Real Estate',       en: 'Real Estate',       fr: 'Immobilier'          },
    tagline: { es: 'Valuación precisa y recorridos 360°', en: 'Accurate valuation and 360° tours', fr: 'Évaluation précise et visites 360°' },
    metrics: ['+25% precisión valuación', '+40% engagement 360°'],
    services: {
      es: ['Valuación automática con ML', 'Tours virtuales 360°', 'CRM inmobiliario', 'Matching comprador-propiedad'],
      en: ['ML automatic valuation', '360° virtual tours', 'Real estate CRM', 'Buyer-property matching'],
      fr: ['Évaluation automatique ML', 'Visites virtuelles 360°', 'CRM immobilier', 'Matching acheteur-propriété'],
    },
  },
  {
    id: 'insurtech', color: '#EC4899', cat: 'finanzas',
    icon: <MdSecurity size={22}/>,
    title:   { es: 'InsurTech',         en: 'InsurTech',         fr: 'InsurTech'           },
    tagline: { es: 'Siniestros rápidos y fraude cero', en: 'Fast claims and zero fraud', fr: 'Sinistres rapides et zéro fraude' },
    metrics: ['-70% tiempo siniestros', '+95% detección fraude'],
    services: {
      es: ['Procesamiento automático de siniestros', 'Detección de fraude ML', 'Cotización dinámica', 'Asistente de pólizas IA'],
      en: ['Automatic claims processing', 'ML fraud detection', 'Dynamic pricing', 'AI policy assistant'],
      fr: ['Traitement automatique des sinistres', 'Détection fraude ML', 'Tarification dynamique', 'Assistant polices IA'],
    },
  },
  {
    id: 'logistica', color: '#14B8A6', cat: 'operaciones',
    icon: <MdLocalShipping size={22}/>,
    title:   { es: 'Logística',         en: 'Logistics',         fr: 'Logistique'          },
    tagline: { es: 'Rutas óptimas y flota siempre disponible', en: 'Optimal routes and always-available fleet', fr: 'Routes optimales et flotte toujours disponible' },
    metrics: ['-25% combustible', '+99% disponibilidad flota'],
    services: {
      es: ['Optimización de rutas', 'Rastreo IoT en tiempo real', 'Mantenimiento predictivo', 'WMS inteligente'],
      en: ['Route optimization', 'Real-time IoT tracking', 'Predictive maintenance', 'Smart WMS'],
      fr: ['Optimisation d\'itinéraires', 'Suivi IoT temps réel', 'Maintenance prédictive', 'WMS intelligent'],
    },
  },
  {
    id: 'manufactura', color: '#F59E0B', cat: 'operaciones',
    icon: <MdBuild size={22}/>,
    title:   { es: 'Manufactura',       en: 'Manufacturing',     fr: 'Industrie'           },
    tagline: { es: 'Producción continua sin defectos', en: 'Continuous defect-free production', fr: 'Production continue sans défauts' },
    metrics: ['-30% inactividad', '+99% detección defectos'],
    services: {
      es: ['Control de calidad por visión artificial', 'Mantenimiento predictivo IoT', 'MES inteligente', 'Optimización de línea'],
      en: ['Computer vision quality control', 'IoT predictive maintenance', 'Smart MES', 'Line optimization'],
      fr: ['Contrôle qualité vision artificielle', 'Maintenance prédictive IoT', 'MES intelligent', 'Optimisation de ligne'],
    },
  },
  {
    id: 'retail', color: '#6366F1', cat: 'comercio',
    icon: <MdStore size={22}/>,
    title:   { es: 'Retail',            en: 'Retail',            fr: 'Commerce de détail'  },
    tagline: { es: 'Inventario optimizado y mayor margen', en: 'Optimized inventory and higher margin', fr: 'Inventaire optimisé et marge plus élevée' },
    metrics: ['+30% rotación inventario', '+15% margen'],
    services: {
      es: ['Gestión inteligente de inventario', 'Pricing dinámico', 'Análisis de flujo de tienda', 'Fidelización con IA'],
      en: ['Smart inventory management', 'Dynamic pricing', 'Store flow analysis', 'AI loyalty'],
      fr: ['Gestion intelligente des stocks', 'Tarification dynamique', 'Analyse du flux en magasin', 'Fidélisation IA'],
    },
  },
  {
    id: 'agrotech', color: '#22C55E', cat: 'operaciones',
    icon: <MdAgriculture size={22}/>,
    title:   { es: 'AgroTech',          en: 'AgroTech',          fr: 'AgroTech'            },
    tagline: { es: 'Más rendimiento con menos recursos', en: 'More yield with fewer resources', fr: 'Plus de rendement avec moins de ressources' },
    metrics: ['+20% rendimiento cultivos', '-40% agua con IoT'],
    services: {
      es: ['Monitoreo de cultivos IoT', 'Predicción de cosecha ML', 'Riego automatizado', 'Detección de plagas IA'],
      en: ['IoT crop monitoring', 'ML harvest prediction', 'Automated irrigation', 'AI pest detection'],
      fr: ['Monitoring cultures IoT', 'Prédiction récolte ML', 'Irrigation automatisée', 'Détection ravageurs IA'],
    },
  },
  {
    id: 'energia', color: '#EAB308', cat: 'operaciones',
    icon: <MdElectricalServices size={22}/>,
    title:   { es: 'Energía',           en: 'Energy',            fr: 'Énergie'             },
    tagline: { es: 'Consumo optimizado y mantenimiento proactivo', en: 'Optimized consumption and proactive maintenance', fr: 'Consommation optimisée et maintenance proactive' },
    metrics: ['-25% consumo con IA', 'Mantenimiento predictivo'],
    services: {
      es: ['Optimización de consumo IA', 'Mantenimiento predictivo de planta', 'Gestión de energías renovables', 'Smart grid analytics'],
      en: ['AI consumption optimization', 'Plant predictive maintenance', 'Renewable energy management', 'Smart grid analytics'],
      fr: ['Optimisation consommation IA', 'Maintenance prédictive d\'usine', 'Gestion énergies renouvelables', 'Analytics smart grid'],
    },
  },
  {
    id: 'movilidad', color: '#3B82F6', cat: 'tecnologia',
    icon: <MdDirectionsCar size={22}/>,
    title:   { es: 'Movilidad',         en: 'Mobility',          fr: 'Mobilité'            },
    tagline: { es: 'MaaS, parking inteligente y flotas conectadas', en: 'MaaS, smart parking and connected fleets', fr: 'MaaS, parking intelligent et flottes connectées' },
    metrics: ['Plataformas MaaS', 'IoT parking inteligente'],
    services: {
      es: ['Plataforma MaaS completa', 'Gestión de flotas IoT', 'Parking inteligente', 'Optimización de tráfico'],
      en: ['Full MaaS platform', 'IoT fleet management', 'Smart parking', 'Traffic optimization'],
      fr: ['Plateforme MaaS complète', 'Gestion de flottes IoT', 'Parking intelligent', 'Optimisation du trafic'],
    },
  },
  {
    id: 'govtech', color: '#0891B2', cat: 'servicios',
    icon: <MdPublic size={22}/>,
    title:   { es: 'Gobierno Digital',  en: 'Gov Tech',          fr: 'Gov Tech'            },
    tagline: { es: 'Servicios más eficientes y transparentes', en: 'More efficient and transparent services', fr: 'Services plus efficaces et transparents' },
    metrics: ['+50% eficiencia servicios', 'Transparencia con ML'],
    services: {
      es: ['Ventanilla única digital', 'Análisis de presupuesto IA', 'Detección de corrupción ML', 'Servicios ciudadanos 24/7'],
      en: ['Digital one-stop-shop', 'AI budget analysis', 'ML corruption detection', '24/7 citizen services'],
      fr: ['Guichet unique numérique', 'Analyse budgétaire IA', 'Détection corruption ML', 'Services citoyens 24/7'],
    },
  },
  {
    id: 'media', color: '#A855F7', cat: 'tecnologia',
    icon: <MdLiveTv size={22}/>,
    title:   { es: 'Media Tech',        en: 'Media Tech',        fr: 'Médias'              },
    tagline: { es: 'Más engagement y contenido IA', en: 'More engagement and AI content', fr: 'Plus d\'engagement et contenu IA' },
    metrics: ['+40% engagement', 'Resúmenes IA automáticos'],
    services: {
      es: ['Recomendación de contenido IA', 'Generación automática de resúmenes', 'Análisis de audiencia', 'Moderación de contenido'],
      en: ['AI content recommendation', 'Automatic summary generation', 'Audience analysis', 'Content moderation'],
      fr: ['Recommandation de contenu IA', 'Génération automatique de résumés', 'Analyse d\'audience', 'Modération de contenu'],
    },
  },
  {
    id: 'hrtech', color: '#F43F5E', cat: 'servicios',
    icon: <MdPeople size={22}/>,
    title:   { es: 'HR Tech',           en: 'HR Tech',           fr: 'RH Tech'             },
    tagline: { es: 'Contratación rápida y onboarding sin fricción', en: 'Fast hiring and frictionless onboarding', fr: 'Recrutement rapide et onboarding sans friction' },
    metrics: ['+60% velocidad contratación', 'Onboarding automático'],
    services: {
      es: ['Screening de CVs con IA', 'Onboarding automatizado', 'Análisis de engagement', 'Predicción de rotación'],
      en: ['AI CV screening', 'Automated onboarding', 'Engagement analysis', 'Turnover prediction'],
      fr: ['Screening de CVs avec IA', 'Onboarding automatisé', 'Analyse d\'engagement', 'Prédiction de rotation'],
    },
  },
  {
    id: 'turismo', color: '#06B6D4', cat: 'comercio',
    icon: <MdFlight size={22}/>,
    title:   { es: 'Turismo',           en: 'Tourism',           fr: 'Tourisme'            },
    tagline: { es: 'Mayor conversión y experiencia personalizada', en: 'Higher conversion and personalized experience', fr: 'Conversion plus élevée et expérience personnalisée' },
    metrics: ['+35% conversión', 'Chatbots de viaje 24/7'],
    services: {
      es: ['Recomendador de viajes IA', 'Chatbot de reservas 24/7', 'Pricing dinámico', 'Personalización de experiencia'],
      en: ['AI travel recommender', '24/7 booking chatbot', 'Dynamic pricing', 'Experience personalization'],
      fr: ['Recommandateur de voyages IA', 'Chatbot réservations 24/7', 'Tarification dynamique', 'Personnalisation d\'expérience'],
    },
  },
  {
    id: 'sports', color: '#84CC16', cat: 'tecnologia',
    icon: <MdSportsSoccer size={22}/>,
    title:   { es: 'Sports Tech',       en: 'Sports Tech',       fr: 'Sports Tech'         },
    tagline: { es: 'Rendimiento medido y scouting con IA', en: 'Measured performance and AI scouting', fr: 'Performance mesurée et scouting IA' },
    metrics: ['Visión artificial rendimiento', 'Scouting con IA'],
    services: {
      es: ['Análisis de rendimiento por visión artificial', 'Scouting IA de talentos', 'Predicción de lesiones', 'Fan engagement analytics'],
      en: ['Computer vision performance analysis', 'AI talent scouting', 'Injury prediction', 'Fan engagement analytics'],
      fr: ['Analyse performance vision artificielle', 'Scouting IA de talents', 'Prédiction de blessures', 'Analytics fan engagement'],
    },
  },
]

// ─── Categories ───────────────────────────────────────────────
const CATS: { id: string; label: Record<Lang, string>; emoji: string; color: string }[] = [
  { id: 'comercio',    emoji: '🛍️', color: '#F59E0B', label: { es: 'Comercio',    en: 'Commerce',    fr: 'Commerce'    } },
  { id: 'finanzas',   emoji: '💰', color: '#10B981', label: { es: 'Finanzas',    en: 'Finance',     fr: 'Finance'     } },
  { id: 'salud',      emoji: '🏥', color: '#EF4444', label: { es: 'Salud',       en: 'Health',      fr: 'Santé'       } },
  { id: 'tecnologia', emoji: '⚡', color: '#6366F1', label: { es: 'Tecnología',  en: 'Technology',  fr: 'Technologie' } },
  { id: 'operaciones',emoji: '⚙️', color: '#F97316', label: { es: 'Operaciones', en: 'Operations',  fr: 'Opérations'  } },
  { id: 'servicios',  emoji: '🏛️', color: '#0891B2', label: { es: 'Servicios',   en: 'Services',    fr: 'Services'    } },
  { id: 'educacion',  emoji: '📚', color: '#F97316', label: { es: 'Educación',   en: 'Education',   fr: 'Éducation'   } },
]

// ─── UI copy ──────────────────────────────────────────────────
const UI = {
  eyebrow:  { es: 'Sectores',   en: 'Sectors',   fr: 'Secteurs'  },
  h1a:      { es: 'Industrias', en: 'Industries', fr: 'Industries' },
  h1b:      { es: 'que transformamos', en: 'we transform', fr: 'que nous transformons' },
  subtitle: {
    es: '19 sectores con soluciones de IA y tecnología desplegadas en producción real. Resultados medibles, no promesas.',
    en: '19 sectors with AI and technology solutions deployed in real production. Measurable results, not promises.',
    fr: '19 secteurs avec des solutions IA et technologie déployées en production réelle. Résultats mesurables, pas des promesses.',
  },
  all:       { es: 'Todos',    en: 'All',     fr: 'Tous'    },
  search:    { es: 'Buscar sector...', en: 'Search sector...', fr: 'Rechercher un secteur...' },
  noMatch:   { es: 'Sin resultados', en: 'No results', fr: 'Aucun résultat' },
  services:  { es: 'Soluciones',     en: 'Solutions',  fr: 'Solutions'     },
  schedule:  { es: 'Hablemos',       en: "Let's talk",  fr: 'Parlons'       },
  ctaTitle:  { es: '¿Tu sector no está aquí?', en: "Your sector isn't here?", fr: 'Votre secteur n\'est pas là ?' },
  ctaSub:    {
    es: 'Tenemos experiencia en prácticamente cualquier industria. Cuéntanos tu caso.',
    en: 'We have experience in practically any industry. Tell us your case.',
    fr: 'Nous avons de l\'expérience dans pratiquement n\'importe quelle industrie. Dites-nous votre cas.',
  },
  ctaBtn:    { es: 'Agendar consulta gratuita', en: 'Schedule free consultation', fr: 'Planifier une consultation gratuite' },
  statSec:   { es: 'sectores', en: 'sectors', fr: 'secteurs' },
  statProd:  { es: 'en producción', en: 'in production', fr: 'en production' },
}
const tx = (k: keyof typeof UI, l: Lang) => UI[k][l]

// ─── Metric pill ──────────────────────────────────────────────
function MetricPill({ label, color }: { label: string; color: string }) {
  const isPlus  = label.startsWith('+')
  const isMinus = label.startsWith('-')
  const bg = isPlus  ? alpha('#22C55E', 0.1)
           : isMinus ? alpha('#F59E0B', 0.1)
           : alpha(color, 0.08)
  const col = isPlus  ? '#16A34A'
            : isMinus ? '#D97706'
            : color

  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: 0.4,
      px: 1, py: 0.35,
      bgcolor: bg, borderRadius: '100px',
      border: `1px solid ${alpha(col, 0.2)}`,
    }}>
      {(isPlus || isMinus) && (
        <FiTrendingUp size={9} color={col} style={{ flexShrink: 0 }}/>
      )}
      {!isPlus && !isMinus && (
        <FiZap size={9} color={col} style={{ flexShrink: 0 }}/>
      )}
      <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: col, lineHeight: 1 }}>
        {label}
      </Typography>
    </Box>
  )
}

// ─── Sector Card ──────────────────────────────────────────────
function SectorCard({ s, lang, i }: { s: Sector; lang: Lang; i: number }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (i % 4) * 0.07, ease }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      sx={{
        bgcolor: C.bgWhite,
        border: `1px solid ${hov ? alpha(s.color, 0.4) : C.border}`,
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov
          ? `0 20px 48px ${alpha(s.color, 0.14)}, 0 2px 8px rgba(0,0,0,0.04)`
          : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Color bar */}
      <Box sx={{
        height: 3,
        background: `linear-gradient(90deg, ${s.color}, ${alpha(s.color, 0.2)})`,
        opacity: hov ? 1 : 0.45,
        transition: 'opacity 0.22s ease',
      }}/>

      {/* Header */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 2, borderBottom: `1px solid ${C.border}` }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
          <Box sx={{
            width: 46, height: 46, borderRadius: '13px', flexShrink: 0,
            bgcolor: hov ? s.color : alpha(s.color, 0.1),
            color: hov ? '#fff' : s.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.22s ease',
          }}>
            {s.icon}
          </Box>
          <Box sx={{ flex: 1, pt: 0.25 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: C.text, lineHeight: 1.2, mb: 0.3 }}>
              {s.title[lang]}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: C.textMute, lineHeight: 1.4 }}>
              {s.tagline[lang]}
            </Typography>
          </Box>
        </Box>

        {/* Metrics */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
          {s.metrics.map((m, mi) => (
            <MetricPill key={mi} label={m} color={s.color}/>
          ))}
        </Box>
      </Box>

      {/* Services list */}
      <Box sx={{ px: 2.5, py: 2, flex: 1 }}>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: C.textMute, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.25 }}>
          {tx('services', lang)}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {s.services[lang].map((svc, si) => (
            <Box key={si} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: s.color, flexShrink: 0 }}/>
              <Typography sx={{ fontSize: '0.78rem', color: C.textMid, lineHeight: 1.4 }}>
                {svc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTAs */}
      <Box sx={{ px: 2.5, pb: 2.5, pt: 0, display: 'flex', gap: 1 }}>
        <Button
          component={Link}
          href={`/${lang}/sectores/${s.id}`}
          fullWidth
          endIcon={<FiArrowRight size={12}/>}
          sx={{
            bgcolor: hov ? s.color : alpha(s.color, 0.07),
            color: hov ? '#fff' : s.color,
            border: `1px solid ${hov ? 'transparent' : alpha(s.color, 0.22)}`,
            fontWeight: 700, fontSize: '0.75rem',
            textTransform: 'none', borderRadius: '11px', py: 1,
            transition: 'all 0.22s ease',
            '&:hover': { bgcolor: s.color, color: '#fff', border: '1px solid transparent' },
          }}
        >
          {lang === 'es' ? 'Ver soluciones' : lang === 'en' ? 'View solutions' : 'Voir solutions'}
        </Button>
        <Button
          component="a"
          href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<FiCalendar size={12}/>}
          sx={{
            flexShrink: 0,
            color: s.color, border: `1px solid ${alpha(s.color, 0.25)}`,
            fontWeight: 600, fontSize: '0.72rem',
            textTransform: 'none', borderRadius: '11px', py: 1, px: 1.5,
            transition: 'all 0.18s ease',
            '&:hover': { bgcolor: alpha(s.color, 0.08), borderColor: s.color },
          }}
        >
          {tx('schedule', lang)}
        </Button>
      </Box>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function SectoresClient({ lang }: { lang: Lang }) {
  const [search, setSearch]     = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const heroRef  = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return SECTORS.filter(s => {
      const matchCat = activeCat === 'all' || s.cat === activeCat
      const matchQ   = !q
        || s.title[lang].toLowerCase().includes(q)
        || s.tagline[lang].toLowerCase().includes(q)
        || s.services[lang].some(sv => sv.toLowerCase().includes(q))
        || s.metrics.some(m => m.toLowerCase().includes(q))
      return matchCat && matchQ
    })
  }, [search, activeCat, lang])

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <Box ref={heroRef} sx={{
        bgcolor: C.bgDark, pt: { xs: 8, md: 12 }, pb: { xs: 7, md: 10 },
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(0,174,239,0.04) 1px,transparent 1px),
                            linear-gradient(90deg,rgba(0,174,239,0.04) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }}/>
        <Box sx={{ position: 'absolute', top: -100, right: -80, width: 420, height: 420, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(130px)', opacity: 0.08, zIndex: 0 }}/>
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', bgcolor: '#10B981', filter: 'blur(100px)', opacity: 0.07, zIndex: 0 }}/>

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
              {tx('h1a', lang)}{' '}
              <Box component="span" sx={{ color: C.accent }}>{tx('h1b', lang)}</Box>
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.45)', maxWidth: 560, lineHeight: 1.8, mt: 2, mb: 4 }}>
              {tx('subtitle', lang)}
            </Typography>

            {/* Stats */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {[
                { v: `${SECTORS.length}`, l: tx('statSec', lang) },
                { v: '100%', l: tx('statProd', lang) },
                { v: '40+', l: lang === 'es' ? 'proyectos entregados' : lang === 'en' ? 'projects delivered' : 'projets livrés' },
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

      {/* ── Sticky filters ── */}
      <Box sx={{ bgcolor: C.bgWhite, borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 68, zIndex: 100 }}>
        <Container maxWidth="lg">
          <Box sx={{ py: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { md: 'center' } }}>
            {/* Search */}
            <TextField
              size="small"
              placeholder={tx('search', lang)}
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><FiSearch size={15} color={C.textMute}/></InputAdornment> }}
              sx={{
                width: { xs: '100%', md: 260 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px', fontSize: '0.85rem',
                  '& fieldset': { borderColor: C.border },
                  '&:hover fieldset': { borderColor: C.accentLine },
                  '&.Mui-focused fieldset': { borderColor: C.accent, borderWidth: 1 },
                },
              }}
            />

            {/* Category chips */}
            <Box sx={{ display: 'flex', gap: 0.75, overflowX: 'auto', pb: 0.5, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
              <Chip
                label={tx('all', lang)}
                onClick={() => setActiveCat('all')}
                sx={{
                  fontWeight: 700, fontSize: '0.75rem', height: 30, flexShrink: 0,
                  bgcolor: activeCat === 'all' ? C.accent : 'transparent',
                  color: activeCat === 'all' ? '#fff' : C.textMid,
                  border: `1px solid ${activeCat === 'all' ? C.accent : C.border}`,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: activeCat === 'all' ? C.accentDk : C.accentBg },
                }}
              />
              {CATS.map(cat => (
                <Chip
                  key={cat.id}
                  label={`${cat.emoji} ${cat.label[lang]}`}
                  onClick={() => setActiveCat(activeCat === cat.id ? 'all' : cat.id)}
                  sx={{
                    fontWeight: 600, fontSize: '0.72rem', height: 30, flexShrink: 0,
                    bgcolor: activeCat === cat.id ? alpha(cat.color, 0.12) : 'transparent',
                    color: activeCat === cat.id ? cat.color : C.textMid,
                    border: `1px solid ${activeCat === cat.id ? alpha(cat.color, 0.4) : C.border}`,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: alpha(cat.color, 0.1), borderColor: alpha(cat.color, 0.3), color: cat.color },
                  }}
                />
              ))}
            </Box>

            <Typography sx={{ ml: 'auto', fontSize: '0.78rem', color: C.textMute, whiteSpace: 'nowrap', flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
              {filtered.length} {tx('statSec', lang)}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Grid ── */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography sx={{ fontSize: '2.5rem', mb: 1.5 }}>🔍</Typography>
            <Typography sx={{ fontSize: '1rem', color: C.textMute }}>{tx('noMatch', lang)}</Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' },
            gap: { xs: 2.5, md: 3 },
            alignItems: 'stretch',
          }}>
            {filtered.map((s, i) => (
              <SectorCard key={s.id} s={s} lang={lang} i={i}/>
            ))}
          </Box>
        )}
      </Container>

      {/* ── CTA ── */}
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
              rel="noopener noreferrer"
              variant="contained" size="large"
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