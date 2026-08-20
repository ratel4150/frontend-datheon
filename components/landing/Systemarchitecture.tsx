// File: frontend-datheon/components/landing/SystemArchitecture.tsx
'use client'

import { Box, Typography, Container, GlobalStyles, alpha } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiArrowRight, FiZap } from 'react-icons/fi'

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
} as const

const DISPLAY = 'Poppins, sans-serif'
const MONO    = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace"

// ─── Por qué cambió la estructura ────────────────────────────────
// La versión anterior era una columna larga de bloques centrados —
// se leía como una pared de texto. Aquí el encabezado se resuelve
// como un hero de segundo nivel: info a la izquierda, y a la derecha
// una pieza gráfica grande y sobria — no una foto de stock, sino la
// arquitectura misma de Datheón dibujada como diagrama radial. Es
// la imagen más "empresarial" que puede tener esta sección: es
// literalmente el producto, no una fotografía genérica de oficinas.

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

const content: Record<Lang, {
  kicker: string
  title: string
  subheadline: string
  microcopy: string
  imagePanelLabel: string
  imagePanelStatus: string
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
    imagePanelLabel: 'Arquitectura del sistema',
    imagePanelStatus: 'operativo',
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
    imagePanelLabel: 'System architecture',
    imagePanelStatus: 'operational',
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
    imagePanelLabel: 'Architecture du système',
    imagePanelStatus: 'opérationnel',
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

// nombres universales, no se traducen (igual que en el resto del sitio)
export const CHAIN = [
  { name: 'SENSOR', desc: 'Donde nace la señal', chips: ['Sensors', 'Cameras', 'Machines', 'IoT'] },
  { name: 'EDGE', desc: 'Procesa cerca del origen', chips: ['ESP32', 'Raspberry Pi', 'Gateways', 'Edge Compute'] },
  { name: 'AI', desc: 'Interpreta y predice', chips: ['LLM', 'RAG', 'Agents', 'Computer Vision'] },
  { name: 'AGENT', desc: 'Decide la siguiente acción', chips: ['Decisions', 'Orchestration', 'Multi-Agent', 'Triggers'] },
  { name: 'SOFTWARE', desc: 'Ejecuta la experiencia', chips: ['Web', 'Mobile', 'SaaS', 'APIs'] },
  { name: 'ERP', desc: 'Sincroniza el negocio', chips: ['SAP', 'Odoo', 'Dynamics', 'Inventory'] },
  { name: 'AUTOMATION', desc: 'Dispara el flujo', chips: ['Workflows', 'Notifications', 'Scheduling', 'Rules'] },
  { name: 'BUSINESS', desc: 'Resultado medible', chips: ['Sales', 'Operations', 'Growth', 'Decisions'] },
] as const

const SIGNAL_STEPS = [
  { name: 'SIGNAL', items: ['Sensors', 'Machines', 'IoT'] },
  { name: 'DATA', items: ['APIs', 'Databases', 'Cloud'] },
  { name: 'INTELLIGENCE', items: ['AI', 'ML', 'Vision'] },
  { name: 'DECISION', items: ['AI Agents', 'Rules', 'Analytics'] },
  { name: 'ACTION', items: ['ERP', 'CRM', 'Automation'] },
] as const

const ENTER_TOP = ['AI', 'SOFTWARE', 'DATA', 'IoT']
const ENTER_BOTTOM = ['CLOUD', 'HARDWARE', 'ERP']

// ─── Imagen grande: diagrama radial de la arquitectura ──────────
// 500x500 — DATHEÓN al centro, las 8 capas alrededor, cada una en
// hover revela sus sub-capacidades. El SVG dibuja las líneas y
// marcadores; el overlay HTML captura el hover y muestra la tarjeta
// (más simple y confiable que eventos dentro de <svg>).
const RADIUS = 178
const CENTER = 250
function nodePos(i: number, total: number) {
  const angle = (-90 + (360 / total) * i) * (Math.PI / 180)
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) }
}

function ArchitectureImage({ animate }: { animate: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const positions = CHAIN.map((_, i) => nodePos(i, CHAIN.length))

  return (
    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
      <Box component="svg" viewBox="0 0 500 500" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {positions.map((p, i) => (
          <line
            key={`base-${i}`} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y}
            stroke={C.border} strokeWidth={1.2}
          />
        ))}
        {positions.map((p, i) => (
          <line
            key={`pulse-${i}`} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y}
            stroke={C.accent} strokeWidth={1.4} strokeLinecap="round"
            strokeDasharray="3 10" opacity={hovered === i ? 0.75 : 0.3}
            className="sa-hub-pulse"
          />
        ))}

        <circle cx={CENTER} cy={CENTER} r={44} fill={C.accentBg} stroke={C.accentLine} strokeWidth={1.5} />
        <text x={CENTER} y={CENTER - 3} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={13} fill={C.text}>DATHEÓN</text>
        <text x={CENTER} y={CENTER + 13} textAnchor="middle" fontFamily={MONO} fontWeight={500} fontSize={7.5} letterSpacing="0.5" fill={C.textMute}>ENGINEERING</text>

        {positions.map((p, i) => (
          <g key={i} style={{ opacity: animate ? 1 : 0, transition: `opacity .45s ease ${0.1 + i * 0.06}s` }}>
            <circle
              cx={p.x} cy={p.y} r={hovered === i ? 26 : 22}
              fill={hovered === i ? C.accent : '#FFFFFF'}
              stroke={hovered === i ? C.accent : C.border}
              strokeWidth={1.4}
              style={{ transition: 'r 0.2s ease' }}
            />
          </g>
        ))}
        {positions.map((p, i) => {
          const below = p.y > CENTER + 40
          const labelY = below ? p.y + 38 : (p.y < CENTER - 40 ? p.y - 30 : p.y + 4)
          return (
            <text
              key={`l-${i}`} x={p.x} y={labelY} textAnchor="middle"
              fontFamily={MONO} fontWeight={700} fontSize={9}
              letterSpacing="0.03em" fill={hovered === i ? C.accentDk : C.text}
              style={{ opacity: animate ? 1 : 0, transition: `opacity .45s ease ${0.1 + i * 0.06}s` }}
            >
              {CHAIN[i].name}
            </text>
          )
        })}
      </Box>

      {/* overlay HTML — hover trigger + tarjeta de capacidades */}
      {positions.map((p, i) => (
        <Box
          key={`hit-${i}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          sx={{
            position: 'absolute', width: '13%', height: '13%',
            left: `${(p.x / 500) * 100}%`, top: `${(p.y / 500) * 100}%`,
            transform: 'translate(-50%, -50%)', cursor: 'pointer',
          }}
        >
          <AnimatePresence>
            {hovered === i && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                sx={{
                  position: 'absolute', bottom: p.y > CENTER ? 'auto' : 'calc(100% + 32px)',
                  top: p.y > CENTER ? 'calc(100% + 32px)' : 'auto',
                  left: '50%', transform: 'translateX(-50%)', zIndex: 40,
                  width: 'max-content', maxWidth: 180,
                  bgcolor: '#FFFFFF', border: `1px solid ${C.accentLine}`, borderRadius: '10px',
                  p: 1.1, boxShadow: `0 14px 30px ${alpha(C.text, 0.14)}`,
                }}
              >
                <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', fontWeight: 700, color: C.accentDk, mb: 0.4 }}>
                  {CHAIN[i].desc}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.35 }}>
                  {CHAIN[i].chips.map((c) => (
                    <Box key={c} sx={{
                      px: 0.8, py: 0.2, borderRadius: '20px', bgcolor: C.accentBg,
                      fontFamily: MONO, fontSize: '0.56rem', color: C.accentDk, whiteSpace: 'nowrap',
                    }}>
                      {c}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      ))}
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
  const imageRef = useRef(null)
  const enterRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' })
  const imageInView = useInView(imageRef, { once: true, margin: '-60px' })
  const enterInView = useInView(enterRef, { once: true, margin: '-60px' })

  return (
    <Box component="section" ref={sectionRef} sx={{ position: 'relative', bgcolor: C.bg, py: { xs: 9, md: 12 }, overflow: 'hidden' }}>
      <GlobalStyles
        styles={{
          '.sa-hub-pulse': { animation: 'saHubDash 3s linear infinite' },
          '@keyframes saHubDash': { to: { strokeDashoffset: -130 } },
          '@media (prefers-reduced-motion: reduce)': { '.sa-hub-pulse': { animation: 'none' } },
        }}
      />

      <Box sx={{
        position: 'absolute', top: '10%', right: '-10%', width: 600, height: 600, borderRadius: '50%',
        background: C.accent, filter: 'blur(200px)', opacity: 0.05, pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        {/* ── Encabezado: info izquierda / imagen grande derecha ── */}
        <Box sx={{
          display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
          gap: { xs: 6, md: 7 }, alignItems: 'center', mb: { xs: 9, md: 11 },
        }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: C.accentDk, mb: 1.5 }}>
              {t.kicker}
            </Typography>
            <Typography variant="h2" sx={{
              fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.8rem', md: '2.15rem' },
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

          <Box
            ref={imageRef}
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              bgcolor: '#FFFFFF', borderRadius: '18px', border: `1px solid ${C.border}`,
              boxShadow: `0 30px 70px ${alpha(C.text, 0.08)}`, overflow: 'hidden',
            }}
          >
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              px: 3, py: 1.75, borderBottom: `1px solid ${C.border}`, bgcolor: '#F4FAFE',
            }}>
              <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: C.textMid }}>
                {t.imagePanelLabel}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%', bgcolor: C.accent,
                  animation: 'saPulseDot 2s ease-in-out infinite',
                  '@keyframes saPulseDot': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
                }} />
                <Typography sx={{ fontFamily: MONO, fontSize: '0.63rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: C.accentDk, fontWeight: 600 }}>
                  {t.imagePanelStatus}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <ArchitectureImage animate={imageInView} />
            </Box>
          </Box>
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
            alignItems: { xs: 'stretch', md: 'flex-start' }, justifyContent: 'center', gap: { xs: 3, md: 0 },
          }}>
            {SIGNAL_STEPS.map((step, i) => (
              <Box key={step.name} sx={{ display: 'flex', alignItems: { xs: 'stretch', md: 'flex-start' }, flex: 1 }}>
                <Box sx={{ flex: 1, textAlign: 'center', px: 1 }}>
                  <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1rem', color: C.text, mb: 1 }}>
                    {step.name}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                    {step.items.map((it) => (
                      <Typography key={it} sx={{ fontSize: '0.74rem', color: C.textMute }}>{it}</Typography>
                    ))}
                  </Box>
                </Box>
                {i < SIGNAL_STEPS.length - 1 && (
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'flex-start', justifyContent: 'center', color: C.accentLine, fontSize: '1.1rem', px: 1, pt: 0.3 }}>
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
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.9rem' }, lineHeight: 1.35, color: C.text, mb: 1 }}>
            {t.closingLine1}
          </Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.9rem' }, lineHeight: 1.35, color: C.textMid, mb: 3 }}>
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