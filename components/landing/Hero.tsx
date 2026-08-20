// File: frontend-datheon/components/landing/Hero.tsx
'use client'

import { Box, Typography, Container, Button, GlobalStyles, alpha } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import ReactGA from 'react-ga4'
import ReactFlow, {
  Background, BackgroundVariant, Handle, Position,
  getSmoothStepPath, BaseEdge,
  type Node, type Edge, type NodeProps, type EdgeProps,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { FiArrowRight } from 'react-icons/fi'
import { getDeviceData } from '../../lib/tracking/deviceTracking'

// ─── Tokens — paleta del hero original ──────────────────────────
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

// ─── Backdrop de olas vectoriales — capa previa al contenido ────
function WaveBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: { xs: 280, md: 420 },
        overflow: 'hidden', zIndex: 0, pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, black 0%, black 45%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 45%, transparent 100%)',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        sx={{ width: '100%', height: '100%', display: 'block' }}
      >
        <path
          className="wave-layer wave-layer-1"
          d="M0,0 L1440,0 L1440,190 C1290,240 1170,140 1020,170 C870,200 780,260 630,230 C480,200 390,120 240,150 C160,168 80,190 0,180 Z"
          fill={C.accent} opacity={0.05}
        />
        <path
          className="wave-layer wave-layer-2"
          d="M0,0 L1440,0 L1440,130 C1300,90 1150,180 1000,150 C850,120 760,60 610,90 C460,120 380,180 230,140 C150,120 70,100 0,120 Z"
          fill={C.accent} opacity={0.08}
        />
        <path
          className="wave-layer wave-layer-3"
          d="M0,0 L1440,0 L1440,70 C1310,100 1180,40 1030,60 C880,80 800,110 650,90 C500,70 420,30 270,50 C170,63 90,75 0,60 Z"
          fill={C.accent} opacity={0.13}
        />
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
  tagline: string
  stackLine: string
}> = {
  es: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'Construimos tecnología.',
    titleLine2Lead: 'Desde el código hasta ',
    titleLine2Accent: 'la inteligencia.',
    subheadline: 'Diseñamos software, IA, infraestructura e integraciones que conectan tu negocio, tus datos y el mundo físico.',
    segments: ['Startups', 'PyME', 'Mid-Market', 'Enterprise'],
    cta1: 'Cuéntanos qué quieres construir',
    cta2: 'Explorar capacidades',
    microcopy: 'Desde una aplicación hasta una infraestructura completa de IA.',
    panelLabel: 'Arquitectura de capacidades',
    panelStatus: 'operativo',
    tagline: 'Una empresa. Todo el stack tecnológico.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
  en: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'We build technology.',
    titleLine2Lead: 'From code to ',
    titleLine2Accent: 'intelligence.',
    subheadline: 'We design software, AI, infrastructure, and integrations that connect your business, your data, and the physical world.',
    segments: ['Startups', 'SMBs', 'Mid-Market', 'Enterprise'],
    cta1: 'Tell us what you want to build',
    cta2: 'Explore our capabilities',
    microcopy: 'From a single app to a complete AI infrastructure.',
    panelLabel: 'Capability architecture',
    panelStatus: 'operational',
    tagline: 'One company. The entire technology stack.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
  fr: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'Nous construisons la technologie.',
    titleLine2Lead: "Du code jusqu'à ",
    titleLine2Accent: "l'intelligence.",
    subheadline: 'Nous concevons logiciels, IA, infrastructure et intégrations qui connectent votre entreprise, vos données et le monde physique.',
    segments: ['Startups', 'PME', 'Mid-Market', 'Enterprise'],
    cta1: 'Dites-nous ce que vous voulez construire',
    cta2: 'Explorer nos capacités',
    microcopy: "D'une application unique à une infrastructure IA complète.",
    panelLabel: 'Architecture des capacités',
    panelStatus: 'opérationnel',
    tagline: 'Une entreprise. Toute la pile technologique.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
}

const BRANCHES = [
  { id: 'software', label: 'SOFTWARE', chips: ['SaaS', 'Web', 'Mobile', 'E-commerce'] },
  { id: 'ai',        label: 'AI',       chips: ['Agents', 'Swarms', 'Local AI', 'RAG'] },
  { id: 'hardware',  label: 'HARDWARE', chips: ['GPU', 'IoT', 'Edge', 'PLC'] },
] as const

// ─── Custom node ────────────────────────────────────────────────
type Variant = 'core' | 'branch' | 'merge' | 'result'

function FlowNode({ data }: NodeProps<{
  label: string; sublabel?: string; variant: Variant; delay: number; animate: boolean; chips?: string[]
}>) {
  const { label, sublabel, variant, delay, animate, chips } = data
  const [hovered, setHovered] = useState(false)

  const styles: Record<Variant, { bg: string; border: string; color: string; weight: number; size: string; shadow?: string }> = {
    core:   { bg: C.accentBg,  border: C.accentLine, color: C.text,    weight: 700, size: '0.78rem' },
    branch: { bg: '#FFFFFF',   border: C.border,     color: C.textMid, weight: 600, size: '0.64rem' },
    merge:  { bg: '#FFFFFF',   border: C.border,     color: C.textMid, weight: 500, size: '0.6rem' },
    result: { bg: C.accent,    border: C.accent,     color: '#FFFFFF', weight: 700, size: '0.7rem', shadow: `0 10px 26px ${alpha(C.accent, 0.4)}` },
  }
  const s = styles[variant]

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={animate ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => variant === 'branch' && setHovered(true)}
      onMouseLeave={() => variant === 'branch' && setHovered(false)}
      className={variant === 'result' ? 'df-glow-node df-glow-result' : 'df-glow-node'}
      sx={{
        position: 'relative',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        px: 1, py: 0.75,
        borderRadius: '7px',
        bgcolor: s.bg,
        border: `1px solid ${variant === 'branch' && hovered ? C.accent : s.border}`,
        boxShadow: s.shadow ?? `0 2px 8px ${alpha(C.text, 0.04)}`,
        cursor: variant === 'branch' ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease',
      }}
      style={{ animationDelay: `${delay}s` }}
    >
      {variant === 'core' && (
        <>
          <Box sx={{ position: 'absolute', top: 4, left: 5, color: alpha(C.accent, 0.55), fontFamily: MONO, fontSize: '0.56rem', lineHeight: 1 }}>+</Box>
          <Box sx={{ position: 'absolute', bottom: 4, right: 5, color: alpha(C.accent, 0.55), fontFamily: MONO, fontSize: '0.56rem', lineHeight: 1 }}>+</Box>
        </>
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />

      <Typography sx={{
        fontFamily: MONO, fontWeight: s.weight, fontSize: s.size,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        color: s.color, textAlign: 'center', whiteSpace: 'nowrap',
      }}>
        {label}
      </Typography>
      {sublabel && (
        <Typography sx={{
          fontFamily: MONO, fontWeight: 500, fontSize: '0.53rem',
          letterSpacing: '0.07em', textTransform: 'uppercase',
          color: C.textMute, textAlign: 'center', mt: 0.3, whiteSpace: 'nowrap',
        }}>
          {sublabel}
        </Typography>
      )}

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />

      {chips && (
        <AnimatePresence>
          {hovered && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              sx={{
                position: 'absolute', top: 'calc(100% + 6px)', left: '50%',
                transform: 'translateX(-50%)', zIndex: 30,
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                gap: 0.4, width: 'max-content', maxWidth: 150,
              }}
            >
              {chips.map((chip) => (
                <Box
                  key={chip}
                  sx={{
                    px: 0.7, py: 0.25, borderRadius: '20px',
                    bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`,
                    fontFamily: MONO, fontSize: '0.54rem', color: C.accentDk,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {chip}
                </Box>
              ))}
            </Box>
          )}
        </AnimatePresence>
      )}
    </Box>
  )
}

// ─── Custom edge ─────────────────────────────────────────────
function FlowEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
  const [path] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 12,
  })
  return (
    <>
      <BaseEdge path={path} style={{ stroke: C.border, strokeWidth: 1.3 }} />
      <path
        d={path} fill="none" stroke={C.accent} strokeWidth={1.5}
        strokeLinecap="round" strokeDasharray="4 11" className="datheon-flow-pulse"
      />
    </>
  )
}

const nodeTypes = { flowNode: FlowNode }
const edgeTypes = { flowEdge: FlowEdge }

function buildGraph(animate: boolean): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [
    { id: 'core', type: 'flowNode', position: { x: 130, y: 0 }, style: { width: 156, height: 46 },
      data: { label: 'DATHEÓN', sublabel: 'AI ENGINEERING', variant: 'core' as Variant, delay: 0, animate }, draggable: false },

    { id: 'software', type: 'flowNode', position: { x: 24, y: 118 }, style: { width: 100, height: 34 },
      data: { label: BRANCHES[0].label, variant: 'branch' as Variant, delay: 0.2, animate, chips: [...BRANCHES[0].chips] }, draggable: false },
    { id: 'ai', type: 'flowNode', position: { x: 173, y: 118 }, style: { width: 70, height: 34 },
      data: { label: BRANCHES[1].label, variant: 'branch' as Variant, delay: 0.28, animate, chips: [...BRANCHES[1].chips] }, draggable: false },
    { id: 'hardware', type: 'flowNode', position: { x: 298, y: 118 }, style: { width: 100, height: 34 },
      data: { label: BRANCHES[2].label, variant: 'branch' as Variant, delay: 0.36, animate, chips: [...BRANCHES[2].chips] }, draggable: false },

    { id: 'merge', type: 'flowNode', position: { x: 122, y: 236 }, style: { width: 172, height: 36 },
      data: { label: 'DATA · CLOUD · APIs', variant: 'merge' as Variant, delay: 0.55, animate }, draggable: false },
    { id: 'integrations', type: 'flowNode', position: { x: 145, y: 322 }, style: { width: 126, height: 34 },
      data: { label: 'INTEGRATIONS', variant: 'merge' as Variant, delay: 0.68, animate }, draggable: false },
    { id: 'automation', type: 'flowNode', position: { x: 145, y: 400 }, style: { width: 126, height: 34 },
      data: { label: 'AUTOMATION', variant: 'merge' as Variant, delay: 0.8, animate }, draggable: false },
    { id: 'results', type: 'flowNode', position: { x: 145, y: 478 }, style: { width: 126, height: 38 },
      data: { label: 'RESULTS', variant: 'result' as Variant, delay: 0.94, animate }, draggable: false },
  ]

  const edges: Edge[] = [
    { id: 'e1', source: 'core', target: 'software', type: 'flowEdge' },
    { id: 'e2', source: 'core', target: 'ai', type: 'flowEdge' },
    { id: 'e3', source: 'core', target: 'hardware', type: 'flowEdge' },
    { id: 'e4', source: 'software', target: 'merge', type: 'flowEdge' },
    { id: 'e5', source: 'ai', target: 'merge', type: 'flowEdge' },
    { id: 'e6', source: 'hardware', target: 'merge', type: 'flowEdge' },
    { id: 'e7', source: 'merge', target: 'integrations', type: 'flowEdge' },
    { id: 'e8', source: 'integrations', target: 'automation', type: 'flowEdge' },
    { id: 'e9', source: 'automation', target: 'results', type: 'flowEdge' },
  ]
  return { nodes, edges }
}

// ─── Main ─────────────────────────────────────────────────────
export function Hero({ lang }: Props) {
  const l = (lang as Lang) in content ? (lang as Lang) : 'es'
  const t = content[l]

  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })
  const panelInView = useInView(panelRef, { once: true, margin: '-60px' })

  const { nodes, edges } = useMemo(() => buildGraph(panelInView), [panelInView])

  // ── Tracking (sin cambios funcionales) ──
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

  const handleCTA = (cta: 'construir' | 'capacidades') => () => {
    if (typeof window === 'undefined') return
    const eventoId = crypto.randomUUID?.() ?? Math.random().toString(36)
    const payload = {
      cta, canal: 'LandingPage', ubicacion: 'HeroSection',
      idioma: navigator.language || 'es',
      referrer: document.referrer || 'direct',
      timestamp: new Date().toISOString(),
      conversion_intent: true, evento_unico_id: eventoId,
    }
    if (window.fbq) window.fbq('trackCustom', 'HeroCTAClick', payload)
    if (typeof ReactGA !== 'undefined') {
      ReactGA.event({ category: 'Conversiones', action: `click_${cta}`, label: 'HeroSection', value: 1 })
      ReactGA.gtag('event', `hero_cta_${cta}`, payload)
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'HeroCTAClick', ...payload })
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        bgcolor: C.bg,
        overflow: 'hidden',
        pt: { xs: 9, md: 10 },
        pb: { xs: 8, md: 9 },
      }}
    >
      {/* Animaciones — respetan reduced-motion */}
      <GlobalStyles
        styles={{
          '.datheon-flow-pulse': { animation: 'datheonDash 2.6s linear infinite' },
          '@keyframes datheonDash': { to: { strokeDashoffset: -150 } },
          '.df-glow-node': { animation: 'dfGlow 3.6s ease-in-out infinite' },
          '@keyframes dfGlow': {
            '0%, 100%': { boxShadow: '0 2px 8px rgba(11,15,43,0.04)' },
            '50%': { boxShadow: `0 0 0 4px ${alpha(C.accent, 0.14)}` },
          },
          '.df-glow-result': { animation: 'dfGlowResult 3.6s ease-in-out infinite' },
          '@keyframes dfGlowResult': {
            '0%, 100%': { boxShadow: `0 10px 26px ${alpha(C.accent, 0.4)}` },
            '50%': { boxShadow: `0 10px 32px ${alpha(C.accent, 0.65)}` },
          },
          '.wave-layer-1': { animation: 'waveDrift1 22s ease-in-out infinite alternate' },
          '.wave-layer-2': { animation: 'waveDrift2 28s ease-in-out infinite alternate' },
          '.wave-layer-3': { animation: 'waveDrift3 17s ease-in-out infinite alternate' },
          '@keyframes waveDrift1': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-26px)' } },
          '@keyframes waveDrift2': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(22px)' } },
          '@keyframes waveDrift3': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-16px)' } },
          '@media (prefers-reduced-motion: reduce)': {
            '.datheon-flow-pulse, .df-glow-node, .df-glow-result, .wave-layer': { animation: 'none' },
          },
        }}
      />

      <WaveBackdrop />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
          gap: { xs: 7, md: 6 },
          alignItems: 'center',
        }}>

          {/* ── Columna izquierda ── */}
          <Box component={motion.div} variants={container} initial="hidden" animate="show">

            <Box component={motion.div} variants={item} sx={{ mb: 3 }}>
              <Typography sx={{
                fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem',
                letterSpacing: '0.16em', color: C.text, mb: 0.5,
              }}>
                {t.kicker}
              </Typography>
              <Typography sx={{
                fontFamily: MONO, fontWeight: 500, fontSize: '0.64rem',
                letterSpacing: '0.13em', color: C.textMute,
              }}>
                {t.kickerSub}
              </Typography>
            </Box>

            <Box component={motion.div} variants={item}>
              <Typography variant="h1" sx={{
                fontFamily: DISPLAY, fontWeight: 800,
                fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem', lg: '3.2rem' },
                lineHeight: 1.2, letterSpacing: '-0.02em', color: C.text,
              }}>
                {t.titleLine1}
                <Box component="span" sx={{ display: 'block' }}>
                  {t.titleLine2Lead}<Box component="span" sx={{ color: C.accent }}>{t.titleLine2Accent}</Box>
                </Box>
              </Typography>
            </Box>

            <Box component={motion.div} variants={item}>
              <Typography sx={{
                fontSize: { xs: '1rem', md: '1.05rem' }, color: C.textMid,
                maxWidth: 480, lineHeight: 1.75, fontWeight: 400, mt: 2.5, mb: 3,
              }}>
                {t.subheadline}
              </Typography>
            </Box>

            <Box component={motion.div} variants={item} sx={{ mb: 4 }}>
              <Typography sx={{
                fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.07em',
                textTransform: 'uppercase', color: C.textMute,
              }}>
                {t.segments.join('  ·  ')}
              </Typography>
            </Box>

            <Box
              component={motion.div}
              variants={item}
              sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 1.5, sm: 3 }, mb: 1.5 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleCTA('construir')}
                component={motion.button}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                endIcon={<FiArrowRight size={15} />}
                sx={{
                  bgcolor: C.accent, color: '#fff', fontWeight: 700, fontSize: '0.93rem',
                  px: 3.5, py: 1.4, borderRadius: '12px', textTransform: 'none',
                  boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
                  '&:hover': { bgcolor: C.accentDk, boxShadow: `0 8px 28px ${alpha(C.accent, 0.45)}` },
                }}
              >
                {t.cta1}
              </Button>

              <Box
                component={motion.button}
                onClick={handleCTA('capacidades')}
                whileHover={{ y: -1 }}
                type="button"
                sx={{
                  appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 0.6,
                  fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 600, color: C.textMid,
                  pb: 0.3, borderBottom: '1px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  '&:hover': { color: C.accent, borderColor: C.accentLine },
                }}
              >
                {t.cta2}
                <FiArrowRight size={13} />
              </Box>
            </Box>

            <Box component={motion.div} variants={item}>
              <Typography sx={{ fontSize: '0.78rem', color: C.textMute }}>
                {t.microcopy}
              </Typography>
            </Box>
          </Box>

          {/* ── Columna derecha: diagrama de capas ── */}
          <Box
            ref={panelRef}
            component={motion.div}
            initial={{ opacity: 0, x: 24 }}
            animate={panelInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              position: 'relative',
              bgcolor: '#FFFFFF', borderRadius: '16px',
              border: `1px solid ${C.border}`,
              boxShadow: `0 24px 60px ${alpha(C.text, 0.08)}`,
              overflow: 'hidden',
            }}
          >
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              px: 2.5, py: 1.5, borderBottom: `1px solid ${C.border}`, bgcolor: C.statsB,
            }}>
              <Typography sx={{
                fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.05em',
                textTransform: 'uppercase', color: C.textMid,
              }}>
                {t.panelLabel}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%', bgcolor: C.accent,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
                }} />
                <Typography sx={{
                  fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.04em',
                  textTransform: 'uppercase', color: C.accentDk, fontWeight: 600,
                }}>
                  {t.panelStatus}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ height: { xs: 460, md: 560 }, position: 'relative' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={{ padding: 0.14 }}
                proOptions={{ hideAttribution: true }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                panOnScroll={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                preventScrolling={false}
                style={{ background: 'transparent' }}
              >
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(0,174,239,0.06)" />
              </ReactFlow>
            </Box>
          </Box>
        </Box>

        {/* ── Tagline de cierre ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={panelInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{ textAlign: 'center', mt: { xs: 6, md: 7 } }}
        >
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.2rem' },
            color: C.text, mb: 1,
          }}>
            {t.tagline}
          </Typography>
          <Typography sx={{
            fontFamily: MONO, fontSize: '0.72rem', letterSpacing: '0.03em', color: C.textMute,
          }}>
            {t.stackLine}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}