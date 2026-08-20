// File: components/landing/SystemArchitectureMobile.tsx
// File: frontend-datheon/components/landing/SystemArchitectureMobile.tsx
'use client'

import { Box, Typography, Container, GlobalStyles, alpha } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiArrowRight, FiChevronDown, FiZap } from 'react-icons/fi'

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
} as const

const DISPLAY = 'Poppins, sans-serif'
const MONO    = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace"

// El diagrama radial de escritorio no cabe legible en un teléfono
// (8 nodos + líneas + hover). Aquí la misma información es un
// acordeón vertical táctil — igual criterio que en HeroMobile.

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

const content: Record<Lang, {
  kicker: string
  title: string
  subheadline: string
  microcopy: string
  chainLabel: string
  signalKicker: string
  enterKicker: string
  enterTagline: string
  closingLine1: string
  closingLine2: string
  closingLine3: string
  cta1: string
  cta2: string
}> = {
  es: {
    kicker: 'TECHNOLOGY WITHOUT BOUNDARIES',
    title: 'La tecnología moderna no termina en una pantalla.',
    subheadline: 'Conectamos el mundo físico, el software, la IA y la infraestructura en sistemas que trabajan como uno solo.',
    microcopy: 'Desde un sensor hasta una decisión de negocio.',
    chainLabel: 'Arquitectura del sistema',
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: 'Empieza donde estás.',
    closingLine1: 'Una señal puede convertirse en una decisión.',
    closingLine2: 'Y una decisión, en una acción automática.',
    closingLine3: 'Ahí es donde comienza Datheón.',
    cta1: 'Diseñar mi solución',
    cta2: 'Ver capacidades',
  },
  en: {
    kicker: 'TECHNOLOGY WITHOUT BOUNDARIES',
    title: "Modern technology doesn't end at a screen.",
    subheadline: 'We connect the physical world, software, AI, and infrastructure into systems that work as one.',
    microcopy: 'From a sensor to a business decision.',
    chainLabel: 'System architecture',
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: 'Start where you are.',
    closingLine1: 'A signal can become a decision.',
    closingLine2: 'And a decision, an automatic action.',
    closingLine3: "That's where Datheón begins.",
    cta1: 'Design my solution',
    cta2: 'See capabilities',
  },
  fr: {
    kicker: 'TECHNOLOGY WITHOUT BOUNDARIES',
    title: "La technologie moderne ne s'arrête pas à un écran.",
    subheadline: "Nous connectons le monde physique, le logiciel, l'IA et l'infrastructure en systèmes qui fonctionnent comme un seul.",
    microcopy: "D'un capteur à une décision d'affaires.",
    chainLabel: 'Architecture du système',
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: 'Commencez là où vous êtes.',
    closingLine1: 'Un signal peut devenir une décision.',
    closingLine2: 'Et une décision, une action automatique.',
    closingLine3: "C'est là que Datheón commence.",
    cta1: 'Concevoir ma solution',
    cta2: 'Voir les capacités',
  },
}

const CHAIN = [
  { name: 'SENSOR', desc: 'Donde nace la señal', chips: ['Sensors', 'Cameras', 'Machines', 'IoT'] },
  { name: 'EDGE', desc: 'Procesa cerca del origen', chips: ['ESP32', 'Raspberry Pi', 'Gateways'] },
  { name: 'AI', desc: 'Interpreta y predice', chips: ['LLM', 'RAG', 'Agents', 'Vision'] },
  { name: 'AGENT', desc: 'Decide la siguiente acción', chips: ['Decisions', 'Orchestration', 'Triggers'] },
  { name: 'SOFTWARE', desc: 'Ejecuta la experiencia', chips: ['Web', 'Mobile', 'SaaS', 'APIs'] },
  { name: 'ERP', desc: 'Sincroniza el negocio', chips: ['SAP', 'Odoo', 'Inventory'] },
  { name: 'AUTOMATION', desc: 'Dispara el flujo', chips: ['Workflows', 'Scheduling', 'Rules'] },
  { name: 'BUSINESS', desc: 'Resultado medible', chips: ['Sales', 'Operations', 'Growth'] },
] as const

const SIGNAL_STEPS = [
  { name: 'SIGNAL', items: ['Sensors', 'Machines', 'IoT'] },
  { name: 'DATA', items: ['APIs', 'Databases', 'Cloud'] },
  { name: 'INTELLIGENCE', items: ['AI', 'ML', 'Vision'] },
  { name: 'DECISION', items: ['AI Agents', 'Rules', 'Analytics'] },
  { name: 'ACTION', items: ['ERP', 'CRM', 'Automation'] },
] as const

const ENTER_LAYERS = ['AI', 'SOFTWARE', 'DATA', 'IoT', 'CLOUD', 'HARDWARE', 'ERP']

// ─── Fila de acordeón ────────────────────────────────────────
function ChainRow({ node, isLast }: { node: (typeof CHAIN)[number]; isLast: boolean }) {
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
          px: 2, py: 1.5, minHeight: 56, cursor: 'pointer', textAlign: 'left',
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.05em', color: open ? C.accentDk : C.text }}>
            {node.name}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: C.textMute, mt: 0.2 }}>{node.desc}</Typography>
        </Box>
        <Box component={motion.div} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} sx={{ display: 'flex', color: open ? C.accent : C.textMute, flexShrink: 0, ml: 1 }}>
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
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            sx={{ overflow: 'hidden' }}
          >
            <Box sx={{ px: 2, pb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
              {node.chips.map((c) => (
                <Box key={c} sx={{ px: 1, py: 0.35, borderRadius: '20px', bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`, fontFamily: MONO, fontSize: '0.65rem', color: C.accentDk }}>
                  {c}
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
export function SystemArchitectureMobile({ lang }: Props) {
  const l = (lang as Lang) in content ? (lang as Lang) : 'es'
  const t = content[l]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-30px' })

  return (
    <Box component="section" ref={sectionRef} sx={{ position: 'relative', bgcolor: C.bg, py: 7, overflow: 'hidden' }}>
      <GlobalStyles
        styles={{
          '.sam-pulse-dot': { animation: 'samPulse 2s ease-in-out infinite' },
          '@keyframes samPulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
          '@media (prefers-reduced-motion: reduce)': { '.sam-pulse-dot': { animation: 'none' } },
        }}
      />

      <Container maxWidth="sm" sx={{ px: 2.5 }}>

        {/* ── Header ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', mb: 5 }}
        >
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.14em', color: C.accentDk, mb: 1.25 }}>
            {t.kicker}
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.55rem', lineHeight: 1.3, color: C.text, mb: 1.5 }}>
            {t.title}
          </Typography>
          <Typography sx={{ fontSize: '0.92rem', color: C.textMid, lineHeight: 1.7, mb: 1.25 }}>
            {t.subheadline}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.72rem', color: C.textMute }}>
            {t.microcopy}
          </Typography>
        </Box>

        {/* ── Cadena — acordeón ── */}
        <Box sx={{
          bgcolor: '#FFFFFF', borderRadius: '14px', border: `1px solid ${C.border}`,
          boxShadow: `0 14px 34px ${alpha(C.text, 0.06)}`, overflow: 'hidden', mb: 6,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.4, borderBottom: `1px solid ${C.border}`, bgcolor: '#F4FAFE' }}>
            <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: C.textMid }}>
              {t.chainLabel}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box className="sam-pulse-dot" sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: C.accent }} />
              <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', textTransform: 'uppercase', color: C.accentDk, fontWeight: 600 }}>
                {l === 'es' ? 'operativo' : l === 'fr' ? 'opérationnel' : 'operational'}
              </Typography>
            </Box>
          </Box>
          {CHAIN.map((node, i) => (
            <ChainRow key={node.name} node={node} isLast={i === CHAIN.length - 1} />
          ))}
        </Box>

        {/* ── From Signal to Action ── */}
        <Box sx={{ mb: 6 }}>
          <Typography sx={{ textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.14em', color: C.accentDk, mb: 3 }}>
            {t.signalKicker}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SIGNAL_STEPS.map((step, i) => (
              <Box key={step.name} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`,
                  fontFamily: MONO, fontSize: '0.68rem', fontWeight: 700, color: C.accentDk,
                }}>
                  {i + 1}
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.9rem', color: C.text }}>
                    {step.name}
                  </Typography>
                  <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: C.textMute }}>
                    {step.items.join(' · ')}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ borderTop: `1px solid ${C.border}`, mb: 6 }} />

        {/* ── Enter where you are — tira compacta ── */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.14em', color: C.accentDk, mb: 2 }}>
            {t.enterKicker}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.75, mb: 2 }}>
            {ENTER_LAYERS.map((n) => (
              <Box key={n} sx={{ px: 1.2, py: 0.4, borderRadius: '20px', border: `1px solid ${C.border}`, fontFamily: MONO, fontSize: '0.66rem', color: C.textMid }}>
                {n}
              </Box>
            ))}
          </Box>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.95rem', color: C.text }}>
            {t.enterTagline}
          </Typography>
        </Box>

        {/* ── Cierre ── */}
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 46, height: 46, borderRadius: '50%', mx: 'auto', mb: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: C.accentBg, border: `1px solid ${C.accentLine}` }}>
            <FiZap size={19} color={C.accentDk} />
          </Box>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.2rem', lineHeight: 1.35, color: C.text, mb: 0.75 }}>
            {t.closingLine1}
          </Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.2rem', lineHeight: 1.35, color: C.textMid, mb: 2 }}>
            {t.closingLine2}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', color: C.accent, mb: 3.5 }}>
            {t.closingLine3}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Box
              component={motion.button}
              whileTap={{ scale: 0.98 }}
              type="button"
              sx={{
                appearance: 'none', border: 'none', cursor: 'pointer', width: '100%',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 0.8,
                bgcolor: C.accent, color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem',
                py: 1.5, borderRadius: '12px', boxShadow: `0 4px 18px ${alpha(C.accent, 0.32)}`,
              }}
            >
              {t.cta1}
              <FiArrowRight size={15} />
            </Box>
            <Box
              component={motion.button}
              whileTap={{ scale: 0.98 }}
              type="button"
              sx={{
                appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer', width: '100%',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 0.6,
                fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, color: C.textMid, py: 1,
              }}
            >
              {t.cta2}
              <FiArrowRight size={13} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}