// File: frontend-datheon/components/landing/SystemArchitecture.tsx
'use client'

import { Box, Typography, Container, GlobalStyles, alpha } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  FiArrowRight, FiRadio, FiWifi, FiCpu, FiUsers, FiCode,
  FiDatabase, FiRefreshCw, FiTrendingUp, FiGitBranch, FiZap,
} from 'react-icons/fi'

// ─── Tokens — misma paleta y tipografía del Hero ────────────────
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

// Esta sección sigue el mockup final del brief (punto 19): la cadena
// vertical de capas con datos viajando, el framework "From Signal to
// Action", el diagrama "Enter where you are" y el cierre. Se dejan
// fuera, para una siguiente iteración si se quiere: "Trace the data"
// paso a paso y el selector de perspectivas — ambos añaden bastante
// superficie de interacción y esta sección ya es la más densa de la
// página; mejor que aterrice sólida antes de sumarle más capas.

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

const content: Record<Lang, {
  kicker: string
  title: string
  subheadline: string
  microcopy: string
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
    subheadline: 'Conectamos el mundo físico, el software, la inteligencia artificial y la infraestructura para convertir tecnología dispersa en sistemas que trabajan como uno solo.',
    microcopy: 'Desde un sensor hasta una decisión de negocio.',
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: 'Empieza donde estás. Evoluciona desde ahí.',
    closingLine1: 'Una señal puede convertirse en una decisión.',
    closingLine2: 'Y una decisión, en una acción automática.',
    closingLine3: 'Ahí es donde comienza Datheón.',
    cta1: 'Diseñar mi solución',
    cta2: 'Ver capacidades',
  },
  en: {
    kicker: 'TECHNOLOGY WITHOUT BOUNDARIES',
    title: "Modern technology doesn't end at a screen.",
    subheadline: 'We connect the physical world, software, artificial intelligence, and infrastructure to turn scattered technology into systems that work as one.',
    microcopy: 'From a sensor to a business decision.',
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: 'Start where you are. Evolve from there.',
    closingLine1: 'A signal can become a decision.',
    closingLine2: 'And a decision, an automatic action.',
    closingLine3: "That's where Datheón begins.",
    cta1: 'Design my solution',
    cta2: 'See capabilities',
  },
  fr: {
    kicker: 'TECHNOLOGY WITHOUT BOUNDARIES',
    title: "La technologie moderne ne s'arrête pas à un écran.",
    subheadline: "Nous connectons le monde physique, le logiciel, l'intelligence artificielle et l'infrastructure pour transformer une technologie dispersée en systèmes qui fonctionnent comme un seul.",
    microcopy: "D'un capteur à une décision d'affaires.",
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: "Commencez là où vous êtes. Évoluez à partir de là.",
    closingLine1: 'Un signal peut devenir une décision.',
    closingLine2: 'Et une décision, une action automatique.',
    closingLine3: "C'est là que Datheón commence.",
    cta1: 'Concevoir ma solution',
    cta2: 'Voir les capacités',
  },
}

// ─── Cadena vertical de capas — nombres universales ─────────────
const CHAIN = [
  { name: 'SENSOR', icon: FiRadio, desc: 'Donde nace la señal', chips: ['Sensors', 'Cameras', 'Machines', 'IoT'] },
  { name: 'EDGE', icon: FiWifi, desc: 'Procesa cerca del origen', chips: ['ESP32', 'Raspberry Pi', 'Gateways', 'Edge Compute'] },
  { name: 'AI', icon: FiCpu, desc: 'Interpreta y predice', chips: ['LLM', 'RAG', 'Agents', 'Computer Vision'] },
  { name: 'AGENT', icon: FiUsers, desc: 'Decide la siguiente acción', chips: ['Decisions', 'Orchestration', 'Multi-Agent', 'Triggers'] },
  { name: 'SOFTWARE', icon: FiCode, desc: 'Ejecuta la experiencia', chips: ['Web', 'Mobile', 'SaaS', 'APIs'] },
  { name: 'ERP', icon: FiDatabase, desc: 'Sincroniza el negocio', chips: ['SAP', 'Odoo', 'Dynamics', 'Inventory'] },
  { name: 'AUTOMATION', icon: FiRefreshCw, desc: 'Dispara el flujo', chips: ['Workflows', 'Notifications', 'Scheduling', 'Rules'] },
  { name: 'BUSINESS', icon: FiTrendingUp, desc: 'Resultado medible', chips: ['Sales', 'Operations', 'Growth', 'Decisions'] },
] as const

const SIGNAL_STEPS = [
  { name: 'SIGNAL', icon: FiRadio, items: ['Sensors', 'Machines', 'Cameras', 'IoT'] },
  { name: 'DATA', icon: FiDatabase, items: ['APIs', 'Databases', 'Streams', 'Cloud'] },
  { name: 'INTELLIGENCE', icon: FiCpu, items: ['AI', 'ML', 'LLM', 'Vision'] },
  { name: 'DECISION', icon: FiGitBranch, items: ['AI Agents', 'Swarms', 'Rules', 'Analytics'] },
  { name: 'ACTION', icon: FiZap, items: ['ERP', 'CRM', 'PLC', 'Automation'] },
] as const

const ENTER_TOP = ['AI', 'SOFTWARE', 'DATA', 'IoT']
const ENTER_BOTTOM = ['CLOUD', 'HARDWARE', 'ERP']

// ─── Backdrop — trazas de circuito, tercera firma visual ────────
// El Hero tiene olas, Technology Ecosystem tiene una malla de
// puntos; esta sección trata de arquitectura de sistemas, así que
// el fondo son trazas rectas tipo PCB — mismo azul, otra forma.
function CircuitBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 75% at 50% 45%, black 25%, transparent 92%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 45%, black 25%, transparent 92%)',
      }}
    >
      <Box component="svg" width="100%" height="100%" sx={{ position: 'absolute', inset: 0, display: 'block' }}>
        <defs>
          <pattern id="saCircuitPattern" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0,30 H40 V70 H90" fill="none" stroke={C.accent} strokeWidth="1" opacity="0.09" />
            <path d="M60,0 V25 H120" fill="none" stroke={C.accent} strokeWidth="1" opacity="0.07" />
            <path d="M20,90 V120" fill="none" stroke={C.accent} strokeWidth="1" opacity="0.07" />
            <circle cx="40" cy="70" r="2" fill={C.accent} opacity="0.16" />
            <circle cx="90" cy="70" r="2" fill={C.accent} opacity="0.13" />
            <circle cx="60" cy="25" r="2" fill={C.accent} opacity="0.13" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#saCircuitPattern)" />
      </Box>
    </Box>
  )
}

// ─── Nodo de la cadena — hover revela sub-capacidades ───────────
function ChainNode({ node, isCore }: { node: (typeof CHAIN)[number]; isCore?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const Icon = node.icon
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ position: 'relative' }}
    >
      <Box
        component={motion.div}
        whileHover={{ x: 4 }}
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer',
          px: 2, py: 1.4, borderRadius: '12px',
          bgcolor: isCore ? C.accentBg : '#FFFFFF',
          border: `1px solid ${hovered ? C.accent : (isCore ? C.accentLine : C.border)}`,
          boxShadow: hovered ? `0 10px 24px ${alpha(C.accent, 0.18)}` : `0 2px 8px ${alpha(C.text, 0.04)}`,
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <Box sx={{
          width: 36, height: 36, borderRadius: '9px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: hovered ? C.accent : C.accentBg,
          transition: 'background-color 0.2s ease',
        }}>
          <Icon size={16} color={hovered ? '#FFFFFF' : C.accentDk} />
        </Box>
        <Box>
          <Typography sx={{
            fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem',
            letterSpacing: '0.06em', color: hovered ? C.accentDk : C.text, lineHeight: 1.3,
          }}>
            {node.name}
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: C.textMute, lineHeight: 1.3 }}>
            {node.desc}
          </Typography>
        </Box>
      </Box>

      <AnimatePresence>
        {hovered && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            sx={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
              zIndex: 30, display: 'flex', flexWrap: 'wrap', gap: 0.5, px: 1,
            }}
          >
            {node.chips.map((c) => (
              <Box key={c} sx={{
                px: 1, py: 0.3, borderRadius: '20px',
                bgcolor: '#FFFFFF', border: `1px solid ${C.accentLine}`,
                fontFamily: MONO, fontSize: '0.6rem', color: C.accentDk, whiteSpace: 'nowrap',
                boxShadow: `0 4px 10px ${alpha(C.text, 0.06)}`,
              }}>
                {c}
              </Box>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

// ─── Conector — línea con partículas de datos viajando ──────────
function ParticleConnector({ active }: { active: boolean }) {
  return (
    <Box sx={{ position: 'relative', width: 2, height: 40, ml: '34px', bgcolor: C.border }}>
      {active && (
        <>
          <Box className="sa-particle" sx={{ animationDelay: '0s' }} />
          <Box className="sa-particle" sx={{ animationDelay: '0.9s' }} />
        </>
      )}
    </Box>
  )
}

// ─── "Enter where you are" — hub y capas ────────────────────────
function EnterWhereYouAre({ t, animate }: { t: (typeof content)['es']; animate: boolean }) {
  const topX = [50, 176, 304, 430]
  const botX = [110, 240, 370]

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <Box component="svg" viewBox="0 0 480 240" sx={{ width: '100%', height: 'auto', display: 'block' }}>
        {topX.map((x, i) => (
          <line key={`tl-${i}`} x1={x} y1={44} x2={240} y2={110} stroke={C.accent} strokeWidth={1.3} strokeDasharray="3 8" opacity={0.35} className="sa-hub-pulse" />
        ))}
        {botX.map((x, i) => (
          <line key={`bl-${i}`} x1={x} y1={196} x2={240} y2={150} stroke={C.accent} strokeWidth={1.3} strokeDasharray="3 8" opacity={0.35} className="sa-hub-pulse" />
        ))}

        <circle cx={240} cy={130} r={30} fill={C.accentBg} stroke={C.accentLine} strokeWidth={1.5} />
        <text x={240} y={134} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={9.5} fill={C.text}>DATHEÓN</text>

        {topX.map((x, i) => (
          <g key={`t-${i}`} style={{ opacity: animate ? 1 : 0, transition: `opacity .4s ease ${0.1 + i * 0.07}s` }}>
            <circle cx={x} cy={34} r={17} fill="#FFFFFF" stroke={C.border} strokeWidth={1.3} />
            <text x={x} y={38} textAnchor="middle" fontFamily={MONO} fontWeight={600} fontSize={6.4} fill={C.textMid}>{ENTER_TOP[i]}</text>
          </g>
        ))}
        {botX.map((x, i) => (
          <g key={`b-${i}`} style={{ opacity: animate ? 1 : 0, transition: `opacity .4s ease ${0.35 + i * 0.07}s` }}>
            <circle cx={x} cy={206} r={17} fill="#FFFFFF" stroke={C.border} strokeWidth={1.3} />
            <text x={x} y={210} textAnchor="middle" fontFamily={MONO} fontWeight={600} fontSize={6.4} fill={C.textMid}>{ENTER_BOTTOM[i]}</text>
          </g>
        ))}
      </Box>
      <Typography sx={{ textAlign: 'center', fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.05rem', color: C.text, mt: 1 }}>
        {t.enterTagline}
      </Typography>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function SystemArchitecture({ lang }: Props) {
  const l = (lang as Lang) in content ? (lang as Lang) : 'es'
  const t = content[l]

  const sectionRef = useRef(null)
  const chainRef = useRef(null)
  const enterRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' })
  const chainInView = useInView(chainRef, { once: true, margin: '-60px' })
  const enterInView = useInView(enterRef, { once: true, margin: '-60px' })

  return (
    <Box component="section" ref={sectionRef} sx={{ position: 'relative', bgcolor: C.bg, py: { xs: 9, md: 12 }, overflow: 'hidden' }}>
      <GlobalStyles
        styles={{
          '.sa-particle': {
            position: 'absolute', top: 0, left: '50%', width: 5, height: 5, borderRadius: '50%',
            bgcolor: C.accent, transform: 'translateX(-50%)',
            animation: 'saFall 1.8s linear infinite',
          },
          '@keyframes saFall': {
            '0%': { top: '-4px', opacity: 0 },
            '15%': { opacity: 1 },
            '85%': { opacity: 1 },
            '100%': { top: '100%', opacity: 0 },
          },
          '.sa-hub-pulse': { animation: 'saHubDash 3s linear infinite' },
          '@keyframes saHubDash': { to: { strokeDashoffset: -110 } },
          '@media (prefers-reduced-motion: reduce)': {
            '.sa-particle, .sa-hub-pulse': { animation: 'none' },
          },
        }}
      />

      {/* glow único, sutil */}
      <Box sx={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 700, height: 500, borderRadius: '50%',
        background: C.accent, filter: 'blur(200px)', opacity: 0.045, pointerEvents: 'none',
      }} />

      <CircuitBackdrop />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: { xs: 7, md: 9 } }}
        >
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: C.accentDk, mb: 1.5 }}>
            {t.kicker}
          </Typography>
          <Typography variant="h2" sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.3rem' },
            lineHeight: 1.28, letterSpacing: '-0.015em', color: C.text, mb: 2,
          }}>
            {t.title}
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: C.textMid, lineHeight: 1.75, mb: 1.5 }}>
            {t.subheadline}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', color: C.textMute }}>
            {t.microcopy}
          </Typography>
        </Box>

        {/* ── Cadena viva — datos viajando entre capas ── */}
        <Box ref={chainRef} sx={{ maxWidth: 320, mx: 'auto', mb: { xs: 9, md: 11 } }}>
          {CHAIN.map((node, i) => (
            <Box key={node.name}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={chainInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ChainNode node={node} isCore={node.name === 'AI'} />
              </Box>
              {i < CHAIN.length - 1 && <ParticleConnector active={chainInView} />}
            </Box>
          ))}
        </Box>

        {/* ── From Signal to Action ── */}
        <Box sx={{ mb: { xs: 9, md: 11 } }}>
          <Typography sx={{
            textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem',
            letterSpacing: '0.16em', color: C.accentDk, mb: { xs: 4, md: 5 },
          }}>
            {t.signalKicker}
          </Typography>
          <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'flex-start' }, justifyContent: 'center',
            gap: { xs: 3, md: 0 },
          }}>
            {SIGNAL_STEPS.map((step, i) => (
              <Box key={step.name} sx={{ display: 'flex', alignItems: { xs: 'stretch', md: 'flex-start' }, flex: 1 }}>
                <Box sx={{ flex: 1, textAlign: 'center', px: 1 }}>
                  <Box sx={{
                    width: 44, height: 44, borderRadius: '50%', mx: 'auto', mb: 1.5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`,
                  }}>
                    <step.icon size={18} color={C.accentDk} />
                  </Box>
                  <Typography sx={{
                    fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.05rem',
                    color: C.text, mb: 1.25,
                  }}>
                    {step.name}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                    {step.items.map((it) => (
                      <Typography key={it} sx={{ fontSize: '0.76rem', color: C.textMute }}>
                        {it}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                {i < SIGNAL_STEPS.length - 1 && (
                  <Box sx={{
                    display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center',
                    color: C.accentLine, fontSize: '1.2rem', px: 1, pt: 2.2,
                  }}>
                    →
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ borderTop: `1px solid ${C.border}`, maxWidth: 680, mx: 'auto', mb: { xs: 9, md: 11 } }} />

        {/* ── Enter where you are ── */}
        <Box ref={enterRef} sx={{ mb: { xs: 9, md: 11 } }}>
          <Typography sx={{
            textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem',
            letterSpacing: '0.16em', color: C.accentDk, mb: { xs: 4, md: 5 },
          }}>
            {t.enterKicker}
          </Typography>
          <EnterWhereYouAre t={t} animate={enterInView} />
        </Box>

        {/* ── Cierre ── */}
        <Box sx={{ textAlign: 'center', maxWidth: 620, mx: 'auto' }}>
          <Box sx={{
            width: 52, height: 52, borderRadius: '50%', mx: 'auto', mb: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`,
          }}>
            <FiZap size={22} color={C.accentDk} />
          </Box>
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.9rem' },
            lineHeight: 1.35, color: C.text, mb: 1,
          }}>
            {t.closingLine1}
          </Typography>
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.9rem' },
            lineHeight: 1.35, color: C.textMid, mb: 3,
          }}>
            {t.closingLine2}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.85rem', color: C.accent, letterSpacing: '0.02em', mb: 4.5 }}>
            {t.closingLine3}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <Box
              component={motion.button}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              sx={{
                appearance: 'none', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 0.8,
                bgcolor: C.accent, color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.93rem',
                px: 3.5, py: 1.4, borderRadius: '12px',
                boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
                '&:hover': { bgcolor: C.accentDk },
              }}
            >
              {t.cta1}
              <FiArrowRight size={15} />
            </Box>

            <Box
              component={motion.button}
              whileHover={{ y: -1 }}
              type="button"
              sx={{
                appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 0.6,
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
        </Box>
      </Container>
    </Box>
  )
}