// File: components/landing/HeroMobile.tsx
// File: frontend-datheon/components/landing/HeroMobile.tsx
'use client'

import { Box, Typography, Container, Button, GlobalStyles, alpha } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import ReactGA from 'react-ga4'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { getDeviceData } from '../../lib/tracking/deviceTracking'

// ─── Tokens — misma paleta que la versión de escritorio ──────────
const C = {
  bg:         '#FFFFFF',
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

const DISPLAY = 'Poppins, sans-serif'
const MONO    = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace"

// ─── Por qué esta versión es distinta, no solo más chica ──────────
// En escritorio el diagrama es un grafo con React Flow y las
// sub-capacidades se revelan al hover. En un teléfono no hay hover,
// el viewport no da para un canvas de nodos legible, y cargar
// React Flow solo para eso penaliza el peso de la página. Por eso
// aquí el mismo contenido (CORE → SOFTWARE/AI/HARDWARE → pipeline →
// RESULTS) se resuelve como un acordeón vertical táctil: tap para
// expandir, objetivos de toque de 48px+, sin canvas ni gestos.

function WaveBackdropMobile() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 200,
        overflow: 'hidden', zIndex: 0, pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
      }}
    >
      <Box component="svg" viewBox="0 0 1440 320" preserveAspectRatio="none" sx={{ width: '100%', height: '100%', display: 'block' }}>
        <path className="mwave mwave-1" d="M0,0 L1440,0 L1440,190 C1290,240 1170,140 1020,170 C870,200 780,260 630,230 C480,200 390,120 240,150 C160,168 80,190 0,180 Z" fill={C.accent} opacity={0.05} />
        <path className="mwave mwave-2" d="M0,0 L1440,0 L1440,130 C1300,90 1150,180 1000,150 C850,120 760,60 610,90 C460,120 380,180 230,140 C150,120 70,100 0,120 Z" fill={C.accent} opacity={0.08} />
        <path className="mwave mwave-3" d="M0,0 L1440,0 L1440,70 C1310,100 1180,40 1030,60 C880,80 800,110 650,90 C500,70 420,30 270,50 C170,63 90,75 0,60 Z" fill={C.accent} opacity={0.13} />
      </Box>
    </Box>
  )
}

// ─── Types ────────────────────────────────────────────────────
type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

const content: Record<Lang, {
  kicker: string
  kickerSub: string
  titleLine1: string
  titleLine2Lead: string
  titleLine2Accent: string
  subheadline: string
  segments: string[]
  cta1: string
  cta2: string
  microcopy: string
  panelLabel: string
  panelStatus: string
  coreLabel: string
  coreSub: string
  pipelineLabel: string
  resultsLabel: string
  tagline: string
  stackLine: string
}> = {
  es: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'Construimos tecnología.',
    titleLine2Lead: 'Desde el código hasta ',
    titleLine2Accent: 'la inteligencia.',
    subheadline: 'Software, IA, infraestructura e integraciones que conectan tu negocio, tus datos y el mundo físico.',
    segments: ['Startups', 'PyME', 'Mid-Market', 'Enterprise'],
    cta1: 'Cuéntanos qué quieres construir',
    cta2: 'Explorar capacidades',
    microcopy: 'Desde una aplicación hasta una infraestructura completa de IA.',
    panelLabel: 'Arquitectura',
    panelStatus: 'operativo',
    coreLabel: 'DATHEÓN',
    coreSub: 'AI ENGINEERING',
    pipelineLabel: 'DATA · CLOUD · APIs  →  INTEGRATIONS  →  AUTOMATION',
    resultsLabel: 'RESULTS',
    tagline: 'Una empresa. Todo el stack tecnológico.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
  en: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'We build technology.',
    titleLine2Lead: 'From code to ',
    titleLine2Accent: 'intelligence.',
    subheadline: 'Software, AI, infrastructure, and integrations that connect your business, your data, and the physical world.',
    segments: ['Startups', 'SMBs', 'Mid-Market', 'Enterprise'],
    cta1: 'Tell us what you want to build',
    cta2: 'Explore our capabilities',
    microcopy: 'From a single app to a complete AI infrastructure.',
    panelLabel: 'Architecture',
    panelStatus: 'operational',
    coreLabel: 'DATHEÓN',
    coreSub: 'AI ENGINEERING',
    pipelineLabel: 'DATA · CLOUD · APIs  →  INTEGRATIONS  →  AUTOMATION',
    resultsLabel: 'RESULTS',
    tagline: 'One company. The entire technology stack.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
  fr: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'Nous construisons la technologie.',
    titleLine2Lead: "Du code jusqu'à ",
    titleLine2Accent: "l'intelligence.",
    subheadline: 'Logiciels, IA, infrastructure et intégrations qui connectent votre entreprise, vos données et le monde physique.',
    segments: ['Startups', 'PME', 'Mid-Market', 'Enterprise'],
    cta1: 'Dites-nous ce que vous voulez construire',
    cta2: 'Explorer nos capacités',
    microcopy: "D'une application unique à une infrastructure IA complète.",
    panelLabel: 'Architecture',
    panelStatus: 'opérationnel',
    coreLabel: 'DATHEÓN',
    coreSub: 'AI ENGINEERING',
    pipelineLabel: 'DATA · CLOUD · APIs  →  INTEGRATIONS  →  AUTOMATION',
    resultsLabel: 'RÉSULTATS',
    tagline: 'Une entreprise. Toute la pile technologique.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
}

const BRANCHES = [
  { id: 'software', label: 'SOFTWARE', chips: ['SaaS', 'Web', 'Mobile', 'E-commerce'] },
  { id: 'ai',        label: 'AI',       chips: ['Agents', 'Swarms', 'Local AI', 'RAG'] },
  { id: 'hardware',  label: 'HARDWARE', chips: ['GPU', 'IoT', 'Edge', 'PLC'] },
] as const

// ─── Fila de acordeón (branch) ──────────────────────────────────
function BranchRow({ label, chips, isLast }: { label: string; chips: readonly string[]; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <Box sx={{ borderBottom: isLast ? 'none' : `1px solid ${C.border}` }}>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        sx={{
          appearance: 'none', width: '100%', bgcolor: 'transparent', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 2, py: 1.6, minHeight: 52, cursor: 'pointer',
        }}
      >
        <Typography sx={{
          fontFamily: MONO, fontWeight: 600, fontSize: '0.78rem',
          letterSpacing: '0.05em', color: open ? C.accent : C.text,
          transition: 'color 0.2s ease',
        }}>
          {label}
        </Typography>
        <Box
          component={motion.div}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          sx={{ display: 'flex', color: open ? C.accent : C.textMute }}
        >
          <FiChevronDown size={16} />
        </Box>
      </Box>
      <AnimatePresence initial={false}>
        {open && (
          <Box
            component={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            sx={{ overflow: 'hidden' }}
          >
            <Box sx={{ px: 2, pb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {chips.map((chip) => (
                <Box key={chip} sx={{
                  px: 1.1, py: 0.4, borderRadius: '20px',
                  bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`,
                  fontFamily: MONO, fontSize: '0.68rem', color: C.accentDk,
                }}>
                  {chip}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function HeroMobile({ lang }: Props) {
  const l = (lang as Lang) in content ? (lang as Lang) : 'es'
  const t = content[l]

  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })
  const panelInView = useInView(panelRef, { once: true, margin: '-40px' })

  // ── Tracking (payload marcado como mobile para distinguir en reportes) ──
  useEffect(() => {
    if (!isInView || typeof window === 'undefined') return
    const deviceData = getDeviceData()
    const now = new Date()
    const trackingData = {
      ...deviceData,
      section_name: 'HeroSectionMobile',
      timestamp: now.toISOString(),
      event_id: crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 9),
      viewport: { width: window.innerWidth, height: window.innerHeight },
    }
    if (window.fbq) window.fbq('track', 'ViewContent', { content_name: 'HeroSectionMobileViewed' })
    if (window.gtag) window.gtag('event', 'hero_view', trackingData)
    if (typeof ReactGA !== 'undefined') {
      ReactGA.event({ category: 'Hero', action: 'HeroSectionMobileViewed', label: deviceData.deviceType })
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'heroView', ...trackingData })
  }, [isInView])

  const handleCTA = (cta: 'construir' | 'capacidades') => () => {
    if (typeof window === 'undefined') return
    const eventoId = crypto.randomUUID?.() ?? Math.random().toString(36)
    const payload = {
      cta, variant: 'mobile', canal: 'LandingPage', ubicacion: 'HeroSectionMobile',
      idioma: navigator.language || 'es',
      referrer: document.referrer || 'direct',
      timestamp: new Date().toISOString(),
      conversion_intent: true, evento_unico_id: eventoId,
    }
    if (window.fbq) window.fbq('trackCustom', 'HeroCTAClick', payload)
    if (typeof ReactGA !== 'undefined') {
      ReactGA.event({ category: 'Conversiones', action: `click_${cta}`, label: 'HeroSectionMobile', value: 1 })
      ReactGA.gtag('event', `hero_cta_${cta}`, payload)
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'HeroCTAClick', ...payload })
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{ position: 'relative', bgcolor: C.bg, overflow: 'hidden', pt: 7, pb: 7 }}
    >
      <GlobalStyles
        styles={{
          '.mwave-1': { animation: 'mWaveDrift1 20s ease-in-out infinite alternate' },
          '.mwave-2': { animation: 'mWaveDrift2 26s ease-in-out infinite alternate' },
          '.mwave-3': { animation: 'mWaveDrift3 16s ease-in-out infinite alternate' },
          '@keyframes mWaveDrift1': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-14px)' } },
          '@keyframes mWaveDrift2': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(12px)' } },
          '@keyframes mWaveDrift3': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-9px)' } },
          '.m-glow-result': { animation: 'mGlowResult 3.6s ease-in-out infinite' },
          '@keyframes mGlowResult': {
            '0%, 100%': { boxShadow: `0 8px 20px ${alpha(C.accent, 0.35)}` },
            '50%': { boxShadow: `0 8px 26px ${alpha(C.accent, 0.55)}` },
          },
          '@media (prefers-reduced-motion: reduce)': {
            '.mwave-1, .mwave-2, .mwave-3, .m-glow-result': { animation: 'none' },
          },
        }}
      />

      <WaveBackdropMobile />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, px: 2.5 }}>
        <Box component={motion.div} variants={container} initial="hidden" animate="show" sx={{ textAlign: 'center' }}>

          <Box component={motion.div} variants={item} sx={{ mb: 2.75 }}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', color: C.text, mb: 0.4 }}>
              {t.kicker}
            </Typography>
            <Typography sx={{ fontFamily: MONO, fontWeight: 500, fontSize: '0.58rem', letterSpacing: '0.1em', color: C.textMute }}>
              {t.kickerSub}
            </Typography>
          </Box>

          <Box component={motion.div} variants={item}>
            <Typography variant="h1" sx={{
              fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.9rem',
              lineHeight: 1.24, letterSpacing: '-0.015em', color: C.text,
            }}>
              {t.titleLine1}
              <Box component="span" sx={{ display: 'block' }}>
                {t.titleLine2Lead}<Box component="span" sx={{ color: C.accent }}>{t.titleLine2Accent}</Box>
              </Box>
            </Typography>
          </Box>

          <Box component={motion.div} variants={item}>
            <Typography sx={{ fontSize: '0.94rem', color: C.textMid, lineHeight: 1.7, mt: 2, mb: 2.5 }}>
              {t.subheadline}
            </Typography>
          </Box>

          {/* Segmentos — tira horizontal deslizable, patrón nativo de mobile */}
          <Box
            component={motion.div}
            variants={item}
            sx={{
              display: 'flex', gap: 1, overflowX: 'auto', justifyContent: 'center',
              mb: 3.5, py: 0.25, px: 1,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {t.segments.map((seg) => (
              <Box key={seg} sx={{
                flexShrink: 0, px: 1.3, py: 0.5, borderRadius: '20px',
                border: `1px solid ${C.border}`,
                fontFamily: MONO, fontSize: '0.66rem', letterSpacing: '0.04em',
                textTransform: 'uppercase', color: C.textMute, whiteSpace: 'nowrap',
              }}>
                {seg}
              </Box>
            ))}
          </Box>

          {/* CTAs — apiladas, objetivo de toque completo */}
          <Box component={motion.div} variants={item} sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mb: 1.5 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleCTA('construir')}
              component={motion.button}
              whileTap={{ scale: 0.98 }}
              endIcon={<FiArrowRight size={15} />}
              sx={{
                bgcolor: C.accent, color: '#fff', fontWeight: 700, fontSize: '0.92rem',
                py: 1.5, borderRadius: '12px', textTransform: 'none',
                boxShadow: `0 4px 18px ${alpha(C.accent, 0.32)}`,
                '&:active': { bgcolor: C.accentDk },
              }}
            >
              {t.cta1}
            </Button>
            <Button
              variant="text"
              size="large"
              fullWidth
              onClick={handleCTA('capacidades')}
              component={motion.button}
              whileTap={{ scale: 0.98 }}
              endIcon={<FiArrowRight size={13} />}
              sx={{
                color: C.textMid, fontWeight: 600, fontSize: '0.88rem',
                py: 1.1, borderRadius: '12px', textTransform: 'none',
              }}
            >
              {t.cta2}
            </Button>
          </Box>

          <Box component={motion.div} variants={item}>
            <Typography sx={{ fontSize: '0.75rem', color: C.textMute, mb: 5 }}>
              {t.microcopy}
            </Typography>
          </Box>
        </Box>

        {/* ── Arquitectura de capacidades — acordeón táctil ── */}
        <Box
          ref={panelRef}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={panelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          sx={{
            bgcolor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${C.border}`,
            boxShadow: `0 16px 40px ${alpha(C.text, 0.07)}`, overflow: 'hidden',
          }}
        >
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, py: 1.4, borderBottom: `1px solid ${C.border}`, bgcolor: C.statsB,
          }}>
            <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: C.textMid }}>
              {t.panelLabel}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box sx={{
                width: 5, height: 5, borderRadius: '50%', bgcolor: C.accent,
                animation: 'mPulseDot 2s ease-in-out infinite',
                '@keyframes mPulseDot': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
              }} />
              <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: C.accentDk, fontWeight: 600 }}>
                {t.panelStatus}
              </Typography>
            </Box>
          </Box>

          {/* CORE */}
          <Box sx={{ px: 2, py: 2, textAlign: 'center', bgcolor: C.accentBg, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 6, left: 8, color: alpha(C.accent, 0.55), fontFamily: MONO, fontSize: '0.6rem' }}>+</Box>
            <Box sx={{ position: 'absolute', bottom: 6, right: 8, color: alpha(C.accent, 0.55), fontFamily: MONO, fontSize: '0.6rem' }}>+</Box>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em', color: C.text }}>
              {t.coreLabel}
            </Typography>
            <Typography sx={{ fontFamily: MONO, fontWeight: 500, fontSize: '0.58rem', letterSpacing: '0.07em', color: C.textMute, mt: 0.3 }}>
              {t.coreSub}
            </Typography>
          </Box>

          {/* Branches — acordeón */}
          <Box>
            {BRANCHES.map((b, i) => (
              <BranchRow key={b.id} label={b.label} chips={b.chips} isLast={i === BRANCHES.length - 1} />
            ))}
          </Box>

          {/* Pipeline condensado — no interactivo, ahorra espacio vertical */}
          <Box sx={{ px: 2, py: 1.75, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, bgcolor: '#FAFAFA' }}>
            <Typography sx={{
              fontFamily: MONO, fontSize: '0.58rem', letterSpacing: '0.02em',
              color: C.textMute, textAlign: 'center', lineHeight: 1.6,
            }}>
              {t.pipelineLabel}
            </Typography>
          </Box>

          {/* RESULTS */}
          <Box className="m-glow-result" sx={{ mx: 2, my: 2, py: 1.5, borderRadius: '10px', bgcolor: C.accent, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.06em', color: '#FFFFFF' }}>
              {t.resultsLabel}
            </Typography>
          </Box>
        </Box>

        {/* ── Tagline de cierre ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={panelInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          sx={{ textAlign: 'center', mt: 4 }}
        >
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1rem', color: C.text, mb: 0.75 }}>
            {t.tagline}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.02em', color: C.textMute, px: 1 }}>
            {t.stackLine}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}