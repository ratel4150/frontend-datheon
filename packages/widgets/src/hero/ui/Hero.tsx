// File: frontend-datheon/packages/widgets/src/hero/ui/Hero.tsx
'use client'

import { Box, Typography, Button, Container, alpha } from '@mui/material'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga4'
import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs,
  SiNodedotjs, SiDocker, SiKubernetes, SiPostgresql, SiMongodb,
  SiFlutter, SiGooglecloud, SiFirebase, SiGraphql, SiTailwindcss,
  SiGo, SiRust, SiRedis, SiNestjs, SiGit,
} from 'react-icons/si'
import { FiCalendar, FiArrowRight, FiCheck } from 'react-icons/fi'
import { getDeviceData } from '@datheon/shared/lib/tracking'
import { HeroCTABlock } from './Herocta'

// ─── Tokens ──────────────────────────────────────────────────
const C = {
  bg:         '#FFFFFF',
  bgGrid:     'rgba(0,174,239,0.035)',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.18)',
  border:     '#ebebeb',
  statsB:     '#F4FAFE',
} as const

// ─── Types ────────────────────────────────────────────────────
type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

// ─── Content ─────────────────────────────────────────────────
const content: Record<Lang, {
  tag: string
  title: string[]
  titleAccent: string
  subtitle: string
  description: string
  cta: string
  ctaSub: string
  trust: string[]
}> = {
  es: {
    tag: 'Consultora tecnológica · Fundada 2023',
    title: ['Software a medida e'],
    titleAccent: 'inteligencia artificial',
    subtitle: 'para empresas que crecen.',
    description: 'Impulsamos el crecimiento de tu negocio con soluciones tecnológicas personalizadas que generan resultados medibles y sostenibles.',
    cta: 'Solicitar consulta gratuita',
    ctaSub: 'Ver servicios',
    trust: ['Sin contratos largos', 'Equipo dedicado', 'Resultados medibles'],
  },
  en: {
    tag: 'Tech consultancy · Founded 2023',
    title: ['Custom software and'],
    titleAccent: 'artificial intelligence',
    subtitle: 'for growing businesses.',
    description: 'We drive business growth through tailored technology solutions that deliver measurable and sustainable results.',
    cta: 'Request a free consultation',
    ctaSub: 'View services',
    trust: ['No long contracts', 'Dedicated team', 'Measurable results'],
  },
  fr: {
    tag: 'Consultance technologique · Fondée 2023',
    title: ['Logiciels sur mesure et'],
    titleAccent: "intelligence artificielle",
    subtitle: 'pour les entreprises en croissance.',
    description: "Nous accélérons la croissance de votre entreprise grâce à des solutions technologiques personnalisées, durables et mesurables.",
    cta: 'Demander une consultation gratuite',
    ctaSub: 'Voir les services',
    trust: ['Sans longs contrats', 'Équipe dédiée', 'Résultats mesurables'],
  },
}

const statsContent: Record<Lang, { value: number; suffix: string; label: string; sublabel: string }[]> = {
  es: [
    { value: 50,  suffix: '+', label: 'Clientes satisfechos',    sublabel: 'Empresas que confían en nosotros' },
    { value: 17,  suffix: '+', label: 'Proyectos completados',   sublabel: 'Soluciones en producción'        },
    { value: 3,   suffix: '',  label: 'Especialistas técnicos',  sublabel: 'Equipo dedicado y senior'        },
  ],
  en: [
    { value: 50,  suffix: '+', label: 'Satisfied clients',       sublabel: 'Companies that trust us'         },
    { value: 17,  suffix: '+', label: 'Completed projects',      sublabel: 'Production solutions'            },
    { value: 3,   suffix: '',  label: 'Technical specialists',   sublabel: 'Dedicated senior team'           },
  ],
  fr: [
    { value: 50,  suffix: '+', label: 'Clients satisfaits',      sublabel: 'Entreprises qui nous font confiance' },
    { value: 17,  suffix: '+', label: 'Projets complétés',       sublabel: 'Solutions en production'             },
    { value: 3,   suffix: '',  label: 'Spécialistes techniques',  sublabel: 'Équipe dédiée et senior'             },
  ],
}

const icons = [
  { Icon: SiJavascript,   name: 'JavaScript',   color: '#F7DF1E' },
  { Icon: SiTypescript,   name: 'TypeScript',   color: '#3178C6' },
  { Icon: SiPython,       name: 'Python',       color: '#3776AB' },
  { Icon: SiReact,        name: 'React',        color: '#61DAFB' },
  { Icon: SiNextdotjs,    name: 'Next.js',      color: '#000000' },
  { Icon: SiNodedotjs,    name: 'Node.js',      color: '#339933' },
  { Icon: SiDocker,       name: 'Docker',       color: '#2496ED' },
  { Icon: SiKubernetes,   name: 'Kubernetes',   color: '#326CE5' },
  { Icon: SiPostgresql,   name: 'PostgreSQL',   color: '#4169E1' },
  { Icon: SiMongodb,      name: 'MongoDB',      color: '#47A248' },
  { Icon: SiFlutter,      name: 'Flutter',      color: '#02569B' },
  { Icon: SiGooglecloud,  name: 'GCP',          color: '#4285F4' },
  { Icon: SiGraphql,      name: 'GraphQL',      color: '#E10098' },
  { Icon: SiTailwindcss,  name: 'Tailwind',     color: '#06B6D4' },
  { Icon: SiGo,           name: 'Go',           color: '#00ADD8' },
  { Icon: SiRust,         name: 'Rust',         color: '#CE422B' },
  { Icon: SiRedis,        name: 'Redis',        color: '#DC382D' },
  { Icon: SiNestjs,       name: 'NestJS',       color: '#E0234E' },
  { Icon: SiFirebase,     name: 'Firebase',     color: '#FFCA28' },
  { Icon: SiGit,          name: 'Git',          color: '#F05032' },
]

// ─── Animated counter ─────────────────────────────────────────
function AnimatedNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf: number
    const start = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return (
    <Box component="span">
      {value.toLocaleString()}{suffix}
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function Hero({ lang }: Props) {
  const l = (lang as Lang) in content ? (lang as Lang) : 'es'
  const t = content[l]
  const stats = statsContent[l]

  const sectionRef = useRef(null)
  const statsRef   = useRef(null)
  const isInView   = useInView(sectionRef, { once: true })
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  // ── Tracking ──
  useEffect(() => {
    if (!isInView || typeof window === 'undefined') return
    const deviceData = getDeviceData()
    const now = new Date()
    const trackingData = {
      ...deviceData,
      section_name: 'HeroSection',
      timestamp: now.toISOString(),
      event_id: crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 9),
      viewport: { width: window.innerWidth, height: window.innerHeight },
    }
    if (window.fbq) window.fbq('track', 'ViewContent', { content_name: 'HeroSectionViewed' })
    if (window.gtag) window.gtag('event', 'hero_view', trackingData)
    if (typeof ReactGA !== 'undefined') {
      ReactGA.event({ category: 'Hero', action: 'HeroSectionViewed', label: deviceData.deviceType })
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'heroView', ...trackingData })
  }, [isInView])

  const handleCTA = () => {
    if (typeof window === 'undefined') return
    const eventoId = crypto.randomUUID?.() ?? Math.random().toString(36)
    const payload = {
      plan: 'Premium', servicio: 'Consultoría Estratégica',
      canal: 'LandingPage', ubicacion: 'HeroSection',
      idioma: navigator.language || 'es',
      referrer: document.referrer || 'direct',
      timestamp: new Date().toISOString(),
      conversion_intent: true, evento_unico_id: eventoId,
    }
    if (window.fbq) window.fbq('trackCustom', 'ConsultoriaAgendada', payload)
    if (typeof ReactGA !== 'undefined') {
      ReactGA.event({ category: 'Conversiones', action: 'click_agendar_consultoria', label: 'HeroSection', value: 1 })
      ReactGA.gtag('event', 'consultoria_agendada', payload)
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'ConsultoriaAgendada', ...payload })
  }

  // ── Stagger variants ──
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: C.bg,
        overflow: 'hidden',
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 8 },
      }}
    >

      {/* ── Grid background ── */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${C.bgGrid} 1px, transparent 1px),
          linear-gradient(90deg, ${C.bgGrid} 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
      }}/>

      {/* ── Glow top-right ── */}
      <Box sx={{
        position: 'absolute', top: -80, right: -80,
        width: 480, height: 480, borderRadius: '50%',
        background: C.accent,
        filter: 'blur(160px)',
        opacity: 0.06, zIndex: 0, pointerEvents: 'none',
      }}/>
      {/* ── Glow bottom-left ── */}
      <Box sx={{
        position: 'absolute', bottom: 0, left: -60,
        width: 320, height: 320, borderRadius: '50%',
        background: C.accent,
        filter: 'blur(130px)',
        opacity: 0.04, zIndex: 0, pointerEvents: 'none',
      }}/>

      {/* ── Main content ── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          sx={{ textAlign: 'center', maxWidth: 840, mx: 'auto' }}
        >

          {/* Tag pill */}
          <Box
            component={motion.div}
            variants={item}
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.75,
              px: 1.75, py: 0.6,
              border: `1px solid ${C.accentLine}`,
              borderRadius: '100px',
              bgcolor: C.accentBg,
              mb: 3,
            }}
          >
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
              letterSpacing: '0.04em',
            }}>
              {t.tag}
            </Typography>
          </Box>

          {/* H1 */}
          <Box component={motion.div} variants={item}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem', lg: '4.6rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: C.text,
                mb: 0,
              }}
            >
              {t.title[0]}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem', lg: '4.6rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: C.accent,
                display: 'block',
              }}
            >
              {t.titleAccent}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem', lg: '4.6rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: C.text,
                display: 'block',
                mb: 3,
              }}
            >
              {t.subtitle}
            </Typography>
          </Box>

          {/* Description */}
          <Box component={motion.div} variants={item}>
            <Typography sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: C.textMid,
              maxWidth: 580, mx: 'auto',
              lineHeight: 1.75,
              fontWeight: 400,
              mb: 4,
            }}>
              {t.description}
            </Typography>
          </Box>

          {/* CTAs */}
         {/*  <Box
            component={motion.div}
            variants={item}
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 1.5, flexWrap: 'wrap', mb: 3,
            }}
          >
            <Link href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<FiCalendar size={16}/>}
                onClick={handleCTA}
                component={motion.button}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  bgcolor: C.accent,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  px: 3.5, py: 1.4,
                  borderRadius: '12px',
                  textTransform: 'none',
                  boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: C.accentDk,
                    boxShadow: `0 8px 28px ${alpha(C.accent, 0.45)}`,
                  },
                }}
              >
                {t.cta}
              </Button>
            </Link>

            <Button
              variant="outlined"
              size="large"
              endIcon={<FiArrowRight size={15}/>}
              onClick={() => {
                const el = document.getElementById('services')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                color: C.textMid,
                borderColor: C.border,
                fontWeight: 600,
                fontSize: '0.9rem',
                px: 3, py: 1.4,
                borderRadius: '12px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: C.accentLine,
                  bgcolor: C.accentBg,
                  color: C.accent,
                },
              }}
            >
              {t.ctaSub}
            </Button>
          </Box> */}
          <HeroCTABlock lang={lang}/>

          {/* Trust badges */}
          <Box
            component={motion.div}
            variants={item}
            sx={{
              display: 'flex', justifyContent: 'center',
              alignItems: 'center', gap: { xs: 1.5, md: 2.5 },
              flexWrap: 'wrap',
            }}
          >
            {t.trust.map((badge) => (
              <Box key={badge} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <FiCheck size={13} color={C.accent} strokeWidth={2.5}/>
                <Typography sx={{ fontSize: '0.8rem', color: C.textMute, fontWeight: 500 }}>
                  {badge}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Tech marquee ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          sx={{
            mt: { xs: 6, md: 8 },
            overflow: 'hidden',
            position: 'relative',
            // Fade edges
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0, bottom: 0, width: 80, zIndex: 2,
            },
            '&::before': {
              left: 0,
              background: `linear-gradient(to right, ${C.bg}, transparent)`,
            },
            '&::after': {
              right: 0,
              background: `linear-gradient(to left, ${C.bg}, transparent)`,
            },
          }}
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
            style={{ display: 'inline-flex', gap: '2.5rem', width: 'max-content' }}
          >
            {[...icons, ...icons].map(({ Icon, name, color }, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 0.5,
                  px: 1, py: 0.5,
                  minWidth: '64px',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                  '&:hover .tech-icon': { opacity: 0.9, transform: 'translateY(-2px)' },
                  '&:hover .tech-name': { color: C.textMid },
                }}
              >
                <Box
                  className="tech-icon"
                  sx={{
                    fontSize: '1.8rem',
                    color: color,
                    opacity: 0.45,
                    transition: 'all 0.25s ease',
                    display: 'flex',
                  }}
                >
                  <Icon/>
                </Box>
                <Typography
                  className="tech-name"
                  variant="caption"
                  sx={{
                    fontSize: '0.65rem',
                    color: C.border,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    transition: 'color 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {name}
                </Typography>
              </Box>
            ))}
          </motion.div>
        </Box>

        {/* ── Stats bar ── */}
        <Box
          ref={statsRef}
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          sx={{
            mt: { xs: 5, md: 6 },
            p: { xs: 3, md: 4 },
            borderRadius: '20px',
            bgcolor: C.statsB,
            border: `1px solid ${C.border}`,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: { xs: 3, sm: 0 },
          }}
        >
          {stats.map(({ value, suffix, label, sublabel }, i) => (
            <Box
              key={i}
              sx={{
                textAlign: 'center',
                px: 3,
                borderRight: {
                  sm: i < stats.length - 1
                    ? `1px solid ${C.border}`
                    : 'none',
                },
              }}
            >
              <Typography sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2.4rem', md: '3rem' },
                lineHeight: 1,
                color: C.text,
                letterSpacing: '-0.03em',
                mb: 0.5,
              }}>
                <AnimatedNumber target={value} suffix={suffix} inView={statsInView}/>
              </Typography>
              <Typography sx={{
                fontWeight: 700, fontSize: '0.85rem',
                color: C.textMid, mb: 0.25,
              }}>
                {label}
              </Typography>
              <Typography sx={{
                fontSize: '0.75rem', color: C.textMute,
              }}>
                {sublabel}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}