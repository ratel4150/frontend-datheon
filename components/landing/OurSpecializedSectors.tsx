'use client'

import { Box, Typography, Button, Container, alpha } from '@mui/material'
import {
  MdShoppingCart, MdAttachMoney, MdPhoneIphone, MdLocalHospital,
  MdGavel, MdSchool, MdBusiness, MdSecurity, MdLocalShipping,
  MdBuild, MdStore, MdAgriculture, MdElectricalServices,
  MdDirectionsCar, MdPublic, MdLiveTv, MdPeople, MdFlight, MdSportsSoccer,
} from 'react-icons/md'
import { FiCalendar, FiArrowRight } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import ReactGA from 'react-ga4'

// ─── Tokens ─────────────────────────────────────────────────
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

// ─── Sector data ─────────────────────────────────────────────
interface Sector {
  icon: React.ReactNode
  color: string
  title: { es: string; en: string; fr: string }
  metrics: string[]
}

const SECTORS: Sector[] = [
  {
    icon: <MdShoppingCart size={20}/>, color: '#F59E0B',
    title: { es: 'E-commerce', en: 'E-commerce', fr: 'E-commerce' },
    metrics: ['+35% ticket promedio', '-30% abandonos', '+40% satisfacción'],
  },
  {
    icon: <MdAttachMoney size={20}/>, color: '#10B981',
    title: { es: 'Banca Digital', en: 'Digital Banking', fr: 'Banque Digitale' },
    metrics: ['+25% precisión scoring', '+80% autogestión', 'Anti-fraude ML'],
  },
  {
    icon: <MdPhoneIphone size={20}/>, color: '#6366F1',
    title: { es: 'Telecomunicaciones', en: 'Telecom', fr: 'Télécommunications' },
    metrics: ['+65% resolución automática', '+90% detección fallos'],
  },
  {
    icon: <MdLocalHospital size={20}/>, color: '#EF4444',
    title: { es: 'Salud Digital', en: 'Digital Health', fr: 'Santé Digitale' },
    metrics: ['+50% eficiencia', '+30% precisión diagnóstico'],
  },
  {
    icon: <MdGavel size={20}/>, color: '#8B5CF6',
    title: { es: 'Legal Tech', en: 'Legal Tech', fr: 'Legal Tech' },
    metrics: ['70% más rápido NLP', '+90% precisión docs'],
  },
  {
    icon: <MdSchool size={20}/>, color: '#F97316',
    title: { es: 'Edu Tech', en: 'Edu Tech', fr: 'Edu Tech' },
    metrics: ['+45% retención', 'Visión artificial exámenes'],
  },
  {
    icon: <MdBusiness size={20}/>, color: '#0EA5E9',
    title: { es: 'Real Estate', en: 'Real Estate', fr: 'Immobilier' },
    metrics: ['+25% precisión valuación', '+40% engagement 360°'],
  },
  {
    icon: <MdSecurity size={20}/>, color: '#EC4899',
    title: { es: 'InsurTech', en: 'InsurTech', fr: 'InsurTech' },
    metrics: ['-70% tiempo siniestros', '+95% detección fraude'],
  },
  {
    icon: <MdLocalShipping size={20}/>, color: '#14B8A6',
    title: { es: 'Logística', en: 'Logistics', fr: 'Logistique' },
    metrics: ['-25% combustible', '+99% disponibilidad flota'],
  },
  {
    icon: <MdBuild size={20}/>, color: '#F59E0B',
    title: { es: 'Manufactura', en: 'Manufacturing', fr: 'Industrie' },
    metrics: ['-30% inactividad', '+99% detección defectos'],
  },
  {
    icon: <MdStore size={20}/>, color: '#6366F1',
    title: { es: 'Retail', en: 'Retail', fr: 'Commerce de détail' },
    metrics: ['+30% rotación inventario', '+15% margen'],
  },
  {
    icon: <MdAgriculture size={20}/>, color: '#22C55E',
    title: { es: 'AgroTech', en: 'AgroTech', fr: 'AgroTech' },
    metrics: ['+20% rendimiento cultivos', '-40% agua IoT'],
  },
  {
    icon: <MdElectricalServices size={20}/>, color: '#EAB308',
    title: { es: 'Energía', en: 'Energy', fr: 'Énergie' },
    metrics: ['-25% consumo IA', 'Mantenimiento predictivo'],
  },
  {
    icon: <MdDirectionsCar size={20}/>, color: '#3B82F6',
    title: { es: 'Movilidad', en: 'Mobility', fr: 'Mobilité' },
    metrics: ['MaaS platforms', 'IoT parking inteligente'],
  },
  {
    icon: <MdPublic size={20}/>, color: '#0891B2',
    title: { es: 'Gobierno Digital', en: 'Gov Tech', fr: 'Gov Tech' },
    metrics: ['+50% eficiencia servicios', 'Transparencia ML'],
  },
  {
    icon: <MdLiveTv size={20}/>, color: '#A855F7',
    title: { es: 'Media Tech', en: 'Media Tech', fr: 'Médias' },
    metrics: ['+40% engagement', 'Resúmenes IA automáticos'],
  },
  {
    icon: <MdPeople size={20}/>, color: '#F43F5E',
    title: { es: 'HR Tech', en: 'HR Tech', fr: 'RH Tech' },
    metrics: ['+60% velocidad contratación', 'Onboarding automático'],
  },
  {
    icon: <MdFlight size={20}/>, color: '#06B6D4',
    title: { es: 'Turismo', en: 'Tourism', fr: 'Tourisme' },
    metrics: ['+35% conversión', 'Chatbots 24/7'],
  },
  {
    icon: <MdSportsSoccer size={20}/>, color: '#84CC16',
    title: { es: 'Sports Tech', en: 'Sports Tech', fr: 'Sports Tech' },
    metrics: ['Visión artificial rendimiento', 'Scouting IA'],
  },
]

const uiText = {
  sectionLabel: { es: 'Sectores especializados', en: 'Specialized sectors', fr: 'Secteurs spécialisés' },
  title:        { es: 'Industrias donde hemos', en: 'Industries where we have', fr: 'Industries où nous avons' },
  titleAccent:  { es: 'generado impacto real.', en: 'generated real impact.', fr: 'généré un impact réel.' },
  subtitle: {
    es: 'Experiencia comprobada en 19 sectores con soluciones de automatización específicas que generan resultados medibles.',
    en: 'Proven expertise across 19 sectors with tailored automation solutions that deliver measurable results.',
    fr: 'Expertise éprouvée dans 19 secteurs avec des solutions d\'automatisation sur mesure qui génèrent des résultats mesurables.',
  },
  cta:     { es: 'Hablar sobre mi industria', en: 'Talk about my industry', fr: 'Parler de mon industrie' },
  loading: { es: 'Cargando…', en: 'Loading…', fr: 'Chargement…' },
  popup: {
    es: 'Permite ventanas emergentes para acceder a Calendly.',
    en: 'Please allow popups to access Calendly.',
    fr: 'Veuillez autoriser les fenêtres pop-up pour accéder à Calendly.',
  },
}
const tx = (k: keyof typeof uiText, l: string): string =>
  (uiText[k] as Record<string, string>)[l] ?? (uiText[k] as Record<string, string>)['es']

// ─── Sector Card ─────────────────────────────────────────────
function SectorCard({ sector, index, isInView, lang }: {
  sector: Sector; index: number; isInView: boolean; lang: string
}) {
  const [hovered, setHovered] = useState(false)
  const title = sector.title[lang as Lang] ?? sector.title.es

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: (index % 5) * 0.06 + Math.floor(index / 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: 'relative',
        bgcolor: C.cardBg,
        border: `1px solid ${hovered ? alpha(sector.color, 0.4) : C.border}`,
        borderRadius: '16px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 8px 24px ${alpha(sector.color, 0.14)}`
          : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Color top line */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 2, bgcolor: sector.color,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}/>

      {/* Icon + title row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{
          width: 34, height: 34, borderRadius: '9px', flexShrink: 0,
          bgcolor: hovered ? sector.color : alpha(sector.color, 0.10),
          color: hovered ? '#fff' : sector.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}>
          {sector.icon}
        </Box>
        <Typography sx={{
          fontWeight: 700, fontSize: '0.82rem',
          color: C.text, lineHeight: 1.2,
        }}>
          {title}
        </Typography>
      </Box>

      {/* Metrics — revealed with smooth height */}
      <Box sx={{
        overflow: 'hidden',
        maxHeight: hovered ? '120px' : '0px',
        opacity: hovered ? 1 : 0,
        transition: 'max-height 0.3s ease, opacity 0.25s ease',
      }}>
        {sector.metrics.map((m, i) => (
          <Box key={i} sx={{
            display: 'flex', alignItems: 'center', gap: 0.75,
            mb: i < sector.metrics.length - 1 ? 0.5 : 0,
          }}>
            <Box sx={{
              width: 4, height: 4, borderRadius: '50%',
              bgcolor: sector.color, flexShrink: 0,
            }}/>
            <Typography sx={{
              fontSize: '0.7rem', color: C.textMid, lineHeight: 1.4,
            }}>
              {m}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ─── Main ────────────────────────────────────────────────────
export default function OurSpecializedSectors({ lang }: Props) {
  const l = lang in uiText.title ? lang : 'es'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [loading, setLoading] = useState(false)

  const handleCTA = useCallback(() => {
    if (loading) return
    setLoading(true)
    if (typeof window !== 'undefined') {
      const payload = {
        canal: 'LandingPage', ubicacion: 'SectorsSection',
        idioma: navigator.language || 'es',
        timestamp: new Date().toISOString(),
        evento_unico_id: crypto.randomUUID?.() ?? Math.random().toString(36),
      }
      if (window.fbq) window.fbq('trackCustom', 'SectorsCTA', payload)
      if (typeof ReactGA !== 'undefined') ReactGA.event({ category: 'Sectors', action: 'click_cta', value: 1 })
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'SectorsCTA', ...payload })
      const w = 800, h = 700
      const win = window.open(
        'https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica',
        'Calendly',
        `width=${w},height=${h},left=${window.screenX + (window.innerWidth - w) / 2},top=${window.screenY + (window.innerHeight - h) / 2}`
      )
      if (win) win.focus()
      else alert(tx('popup', l))
    }
    setTimeout(() => setLoading(false), 1500)
  }, [loading, l])

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: C.bg }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}
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
            color: C.text, lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            {tx('title', l)}{' '}
            <Box component="span" sx={{ color: C.accent }}>{tx('titleAccent', l)}</Box>
          </Typography>

          <Typography sx={{
            mt: 1.5,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            color: C.textMid, maxWidth: 560, mx: 'auto',
            lineHeight: 1.75, fontWeight: 400,
          }}>
            {tx('subtitle', l)}
          </Typography>
        </Box>

        {/* Sectors grid */}
        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {SECTORS.map((sector, i) => (
            <SectorCard
              key={sector.title.es}
              sector={sector}
              index={i}
              isInView={isInView}
              lang={l}
            />
          ))}
        </Box>

        {/* Count badge */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 2, mt: 4, mb: { xs: 4, md: 5 },
          }}
        >
          <Box sx={{ height: 1, flex: 1, maxWidth: 200, bgcolor: C.border }}/>
          <Box sx={{
            px: 2, py: 0.75,
            bgcolor: C.cardBg,
            border: `1px solid ${C.border}`,
            borderRadius: '100px',
            display: 'flex', alignItems: 'center', gap: 1,
          }}>
            <Box sx={{
              width: 6, height: 6, borderRadius: '50%',
              bgcolor: C.accent,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%,100%': { opacity: 1 },
                '50%': { opacity: 0.3 },
              },
            }}/>
            <Typography sx={{
              fontSize: '0.75rem', fontWeight: 600, color: C.textMid,
            }}>
              {SECTORS.length} {l === 'fr' ? 'secteurs couverts' : l === 'en' ? 'sectors covered' : 'sectores cubiertos'}
            </Typography>
          </Box>
          <Box sx={{ height: 1, flex: 1, maxWidth: 200, bgcolor: C.border }}/>
        </Box>

        {/* CTA */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.5 }}
          sx={{ textAlign: 'center' }}
        >
          <Button
            variant="contained"
            size="large"
            disabled={loading}
            onClick={handleCTA}
            startIcon={!loading ? <FiCalendar size={16}/> : undefined}
            endIcon={!loading ? <FiArrowRight size={16}/> : undefined}
            component={motion.button}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              bgcolor: C.accent, color: '#fff',
              fontWeight: 700, fontSize: '0.95rem',
              px: 4, py: 1.5, borderRadius: '12px',
              textTransform: 'none',
              boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
              '&:hover': {
                bgcolor: C.accentDk,
                boxShadow: `0 8px 28px ${alpha(C.accent, 0.45)}`,
              },
              '&.Mui-disabled': { bgcolor: alpha(C.accent, 0.4), color: '#fff' },
            }}
          >
            {loading ? tx('loading', l) : tx('cta', l)}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}