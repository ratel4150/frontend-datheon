// File: frontend-datheon/components/landing/BusinessGrowthMap.tsx
'use client'

import { Box, Typography, Container, GlobalStyles, alpha } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  FiArrowRight, FiCompass, FiHome, FiLayers, FiTrendingUp, FiGrid, FiGlobe,
} from 'react-icons/fi'

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

// ─── La idea "fuera de la caja" de esta sección ──────────────────
// El brief pide explícitamente NO usar las cuatro tarjetas típicas
// Startup/PyME/Mid-Market/Enterprise, y demostrar que la misma
// arquitectura sirve para una barbería o para una corporación. Para
// que eso se sienta en el diseño, no solo en el copy, la grilla de
// "cualquier negocio" está tratada como tickets/recibos de papel
// (perforación punteada + muescas redondas, como un boleto que se
// arranca) en vez de tarjetas corporativas iguales — un quiebre de
// registro visual deliberado frente al resto del sitio, reservado
// para el momento en que el copy habla de tortillerías y talleres.

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string; heroImage?: string }

const content: Record<Lang, {
  kicker: string
  title: string
  subheadline: string
  tagline: string
  philosophy: string
  stageLabel: string
  goalLabel: string
  examplesKicker: string
  examplesLine: string
  closing1: string
  closing2: string
  cta: string
}> = {
  es: {
    kicker: 'WHERE ARE YOU TODAY?',
    title: '¿Dónde está tu negocio hoy?',
    subheadline: 'No importa dónde esté tu negocio. Importa hacia dónde quieres llevarlo.',
    tagline: 'Empieza con un problema. Escala hacia un ecosistema.',
    philosophy: 'No medimos tu negocio por su tamaño. Medimos el problema que quieres resolver.',
    stageLabel: '¿DÓNDE ESTÁS HOY?',
    goalLabel: '¿QUÉ QUIERES LOGRAR?',
    examplesKicker: 'PARA CUALQUIER NEGOCIO',
    examplesLine: 'El tamaño cambia. La capacidad de transformar el negocio no.',
    closing1: 'La tecnología no debe preguntarte qué tamaño tienes.',
    closing2: 'Debe preguntarte qué quieres lograr.',
    cta: 'Quiero construir esto',
  },
  en: {
    kicker: 'WHERE ARE YOU TODAY?',
    title: 'Where is your business today?',
    subheadline: "It doesn't matter where your business is. What matters is where you want to take it.",
    tagline: 'Start with a problem. Scale into an ecosystem.',
    philosophy: "We don't measure your business by its size. We measure the problem you want to solve.",
    stageLabel: 'WHERE ARE YOU TODAY?',
    goalLabel: 'WHAT DO YOU WANT TO ACHIEVE?',
    examplesKicker: 'FOR ANY BUSINESS',
    examplesLine: 'The size changes. The ability to transform the business doesn\'t.',
    closing1: "Technology shouldn't ask how big you are.",
    closing2: 'It should ask what you want to achieve.',
    cta: 'I want to build this',
  },
  fr: {
    kicker: 'WHERE ARE YOU TODAY?',
    title: "Où en est votre entreprise aujourd'hui ?",
    subheadline: "Peu importe où en est votre entreprise. Ce qui compte, c'est où vous voulez l'emmener.",
    tagline: "Commencez par un problème. Évoluez vers un écosystème.",
    philosophy: "Nous ne mesurons pas votre entreprise par sa taille. Nous mesurons le problème que vous voulez résoudre.",
    stageLabel: "OÙ EN ÊTES-VOUS ?",
    goalLabel: 'QUE VOULEZ-VOUS ACCOMPLIR ?',
    examplesKicker: 'POUR TOUTE ENTREPRISE',
    examplesLine: "La taille change. La capacité de transformer l'entreprise, non.",
    closing1: "La technologie ne doit pas vous demander votre taille.",
    closing2: 'Elle doit vous demander ce que vous voulez accomplir.',
    cta: 'Je veux construire ceci',
  },
}

// ─── Etapas — el "mapa de crecimiento" en vez de 4 tarjetas ─────
const STAGES: Record<Lang, { id: string; label: string; icon: typeof FiCompass; problem: string; chain: string[] }[]> = {
  es: [
    { id: 'idea', label: 'IDEA', icon: FiCompass, problem: 'Tienes una idea pero no sabes cómo convertirla en tecnología.', chain: ['IDEA', 'PROTOTYPE', 'MVP', 'USERS', 'SCALE'] },
    { id: 'small', label: 'PEQUEÑO NEGOCIO', icon: FiHome, problem: 'Todo funciona manual: agenda, cobros, seguimiento de clientes.', chain: ['CLIENTE', 'WHATSAPP', 'AI ASSISTANT', 'AGENDA', 'CONFIRMACIÓN'] },
    { id: 'pyme', label: 'PYME', icon: FiLayers, problem: 'Tienes demasiadas cosas funcionando por separado.', chain: ['SISTEMAS DISPERSOS', 'DATHEÓN', 'AUTOMATIZACIÓN'] },
    { id: 'growth', label: 'EN CRECIMIENTO', icon: FiTrendingUp, problem: 'La empresa creció más rápido que sus sistemas.', chain: ['ERP · CRM · EXCEL', 'DATHEÓN', 'AI', 'AUTOMATION'] },
    { id: 'mid', label: 'MID-MARKET', icon: FiGrid, problem: 'Múltiples sistemas, sucursales y datos aislados.', chain: ['ERP · CRM · IoT', 'INTEGRATION LAYER', 'AI · DATA', 'AUTOMATION'] },
    { id: 'enterprise', label: 'ENTERPRISE', icon: FiGlobe, problem: 'No construimos solo software: diseñamos sistemas para operaciones complejas.', chain: ['DATA · ERP · CRM', 'KNOWLEDGE LAYER', 'PRIVATE AI', 'AGENTS', 'AUTOMATION'] },
  ],
  en: [
    { id: 'idea', label: 'IDEA', icon: FiCompass, problem: "You have an idea but don't know how to turn it into technology.", chain: ['IDEA', 'PROTOTYPE', 'MVP', 'USERS', 'SCALE'] },
    { id: 'small', label: 'SMALL BUSINESS', icon: FiHome, problem: 'Everything runs manually: bookings, payments, follow-ups.', chain: ['CUSTOMER', 'WHATSAPP', 'AI ASSISTANT', 'SCHEDULE', 'CONFIRMATION'] },
    { id: 'pyme', label: 'SMB', icon: FiLayers, problem: 'You have too many things running separately.', chain: ['SCATTERED SYSTEMS', 'DATHEÓN', 'AUTOMATION'] },
    { id: 'growth', label: 'GROWING COMPANY', icon: FiTrendingUp, problem: 'The company grew faster than its systems.', chain: ['ERP · CRM · EXCEL', 'DATHEÓN', 'AI', 'AUTOMATION'] },
    { id: 'mid', label: 'MID-MARKET', icon: FiGrid, problem: 'Multiple systems, branches, and isolated data.', chain: ['ERP · CRM · IoT', 'INTEGRATION LAYER', 'AI · DATA', 'AUTOMATION'] },
    { id: 'enterprise', label: 'ENTERPRISE', icon: FiGlobe, problem: "We don't just build software: we design systems for complex operations.", chain: ['DATA · ERP · CRM', 'KNOWLEDGE LAYER', 'PRIVATE AI', 'AGENTS', 'AUTOMATION'] },
  ],
  fr: [
    { id: 'idea', label: 'IDÉE', icon: FiCompass, problem: "Vous avez une idée mais ne savez pas comment la transformer en technologie.", chain: ['IDÉE', 'PROTOTYPE', 'MVP', 'USAGERS', 'SCALE'] },
    { id: 'small', label: 'PETITE ENTREPRISE', icon: FiHome, problem: 'Tout fonctionne manuellement : agenda, paiements, suivi client.', chain: ['CLIENT', 'WHATSAPP', 'AI ASSISTANT', 'AGENDA', 'CONFIRMATION'] },
    { id: 'pyme', label: 'PME', icon: FiLayers, problem: 'Trop de choses fonctionnent séparément.', chain: ['SYSTÈMES ÉPARS', 'DATHEÓN', 'AUTOMATISATION'] },
    { id: 'growth', label: 'EN CROISSANCE', icon: FiTrendingUp, problem: "L'entreprise a grandi plus vite que ses systèmes.", chain: ['ERP · CRM · EXCEL', 'DATHEÓN', 'AI', 'AUTOMATION'] },
    { id: 'mid', label: 'MID-MARKET', icon: FiGrid, problem: 'Systèmes multiples, succursales et données isolées.', chain: ['ERP · CRM · IoT', 'INTEGRATION LAYER', 'AI · DATA', 'AUTOMATION'] },
    { id: 'enterprise', label: 'ENTERPRISE', icon: FiGlobe, problem: 'Nous ne construisons pas que du logiciel : nous concevons des systèmes pour des opérations complexes.', chain: ['DATA · ERP · CRM', 'KNOWLEDGE LAYER', 'PRIVATE AI', 'AGENTS', 'AUTOMATION'] },
  ],
}

// ─── Objetivos — la pregunta que realmente importa ──────────────
const GOALS: Record<Lang, { id: string; label: string; chain: string[] }[]> = {
  es: [
    { id: 'launch', label: 'Lanzar', chain: ['IDEA', 'MVP', 'PRODUCTO', 'USUARIOS'] },
    { id: 'sell', label: 'Vender más', chain: ['CLIENTE', 'WHATSAPP', 'AI AGENT', 'VENTA'] },
    { id: 'automate', label: 'Automatizar', chain: ['WHATSAPP', 'AI AGENT', 'CRM', 'AUTOMATION'] },
    { id: 'connect', label: 'Conectar sistemas', chain: ['SISTEMAS', 'DATHEÓN', 'INTEGRACIÓN'] },
    { id: 'ai', label: 'Incorporar AI', chain: ['DATOS', 'RAG', 'AI AGENT', 'DECISIÓN'] },
    { id: 'data', label: 'Entender mis datos', chain: ['DATOS DISPERSOS', 'DATHEÓN', 'ANALYTICS'] },
    { id: 'scale', label: 'Escalar', chain: ['ARQUITECTURA ACTUAL', 'DATHEÓN', 'CLOUD'] },
    { id: 'hardware', label: 'Conectar hardware', chain: ['SENSOR', 'EDGE', 'DATHEÓN', 'DATA'] },
    { id: 'local', label: 'AI local', chain: ['DATOS PROPIOS', 'SERVIDOR LOCAL', 'LLM LOCAL', 'AGENTES'] },
  ],
  en: [
    { id: 'launch', label: 'Launch', chain: ['IDEA', 'MVP', 'PRODUCT', 'USERS'] },
    { id: 'sell', label: 'Sell more', chain: ['CUSTOMER', 'WHATSAPP', 'AI AGENT', 'SALE'] },
    { id: 'automate', label: 'Automate', chain: ['WHATSAPP', 'AI AGENT', 'CRM', 'AUTOMATION'] },
    { id: 'connect', label: 'Connect systems', chain: ['SYSTEMS', 'DATHEÓN', 'INTEGRATION'] },
    { id: 'ai', label: 'Bring in AI', chain: ['DATA', 'RAG', 'AI AGENT', 'DECISION'] },
    { id: 'data', label: 'Understand my data', chain: ['SCATTERED DATA', 'DATHEÓN', 'ANALYTICS'] },
    { id: 'scale', label: 'Scale', chain: ['CURRENT SETUP', 'DATHEÓN', 'CLOUD'] },
    { id: 'hardware', label: 'Connect hardware', chain: ['SENSOR', 'EDGE', 'DATHEÓN', 'DATA'] },
    { id: 'local', label: 'Local AI', chain: ['YOUR DATA', 'LOCAL SERVER', 'LOCAL LLM', 'AGENTS'] },
  ],
  fr: [
    { id: 'launch', label: 'Lancer', chain: ['IDÉE', 'MVP', 'PRODUIT', 'USAGERS'] },
    { id: 'sell', label: 'Vendre plus', chain: ['CLIENT', 'WHATSAPP', 'AI AGENT', 'VENTE'] },
    { id: 'automate', label: 'Automatiser', chain: ['WHATSAPP', 'AI AGENT', 'CRM', 'AUTOMATION'] },
    { id: 'connect', label: 'Connecter les systèmes', chain: ['SYSTÈMES', 'DATHEÓN', 'INTÉGRATION'] },
    { id: 'ai', label: "Intégrer l'IA", chain: ['DONNÉES', 'RAG', 'AI AGENT', 'DÉCISION'] },
    { id: 'data', label: 'Comprendre mes données', chain: ['DONNÉES ÉPARSES', 'DATHEÓN', 'ANALYTICS'] },
    { id: 'scale', label: 'Évoluer', chain: ['ARCHITECTURE ACTUELLE', 'DATHEÓN', 'CLOUD'] },
    { id: 'hardware', label: 'Connecter du hardware', chain: ['SENSOR', 'EDGE', 'DATHEÓN', 'DATA'] },
    { id: 'local', label: 'IA locale', chain: ['DONNÉES PROPRES', 'SERVEUR LOCAL', 'LLM LOCAL', 'AGENTS'] },
  ],
}

// ─── Cualquier negocio — tratamiento de ticket, no tarjeta ──────
const EXAMPLES = [
  { emoji: '💈', name: 'Barbería', line: 'Agenda · WhatsApp · CRM · IA · Fidelización' },
  { emoji: '🌮', name: 'Tortillería', line: 'Predicción de demanda · Sensores · Inventario' },
  { emoji: '🔧', name: 'Taller', line: 'Diagnóstico · Citas · Inventario · WhatsApp' },
  { emoji: '🍽️', name: 'Restaurante', line: 'POS · Inventario · Demanda · IoT · IA' },
  { emoji: '🏋️', name: 'Gimnasio', line: 'Membresías · Acceso · CRM · IA · Sensores' },
  { emoji: '🛒', name: 'Tienda', line: 'POS · Inventario · E-commerce · Analytics' },
  { emoji: '🚀', name: 'Startup', line: 'MVP · AI · SaaS · Cloud · Escalabilidad' },
  { emoji: '🏢', name: 'PyME', line: 'ERP · CRM · Automatización · BI' },
  { emoji: '🏭', name: 'Industria', line: 'IoT · Edge · AI · MES/ERP · Predictive Maintenance' },
  { emoji: '🌎', name: 'Enterprise', line: 'Integración · Data · Private AI · Agents' },
] as const

// ─── Backdrop — curvas de nivel, cuarta firma visual ────────────
// Hero: olas. Ecosystem: malla de puntos. System Architecture:
// trazas de circuito. Esta sección se llama "mapa de crecimiento",
// así que su fondo son líneas de contorno tipo mapa topográfico —
// referencia directa al concepto, no decoración porque sí.
function TopographyBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 85% 70% at 50% 30%, black 25%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 30%, black 25%, transparent 90%)',
      }}
    >
      <Box component="svg" viewBox="0 0 1440 500" preserveAspectRatio="none" sx={{ width: '100%', height: 500, display: 'block' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M-50,${420 - i * 55} C 300,${340 - i * 60} 650,${480 - i * 50} 1000,${360 - i * 55} S 1500,${300 - i * 55} 1500,${300 - i * 55}`}
            fill="none" stroke={C.accent} strokeWidth={1.1} opacity={0.1 - i * 0.012}
          />
        ))}
      </Box>
    </Box>
  )
}

// ─── Panel de imagen — vos pegas la URL, esto ya queda listo ────
// Mientras heroImage esté vacío, muestra un placeholder que indica
// exactamente dónde va y qué proporción/tratamiento tendrá, para
// que cuando pegues la URL no haya sorpresas de encuadre.
function GrowthMapImage({ src, label, status }: { src?: string; label: string; status: string }) {
  return (
    <Box sx={{
      bgcolor: '#FFFFFF', borderRadius: '18px', border: `1px solid ${C.border}`,
      boxShadow: `0 30px 70px ${alpha(C.text, 0.08)}`, overflow: 'hidden',
    }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 3, py: 1.75, borderBottom: `1px solid ${C.border}`, bgcolor: '#F4FAFE',
      }}>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: C.textMid }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{
            width: 6, height: 6, borderRadius: '50%', bgcolor: C.accent,
            animation: 'bgmPulseDot 2s ease-in-out infinite',
            '@keyframes bgmPulseDot': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
          }} />
          <Typography sx={{ fontFamily: MONO, fontSize: '0.63rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: C.accentDk, fontWeight: 600 }}>
            {status}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', bgcolor: C.accentBg }}>
        {src ? (
          <Box
            component="img"
            src={src}
            alt=""
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 1.5, px: 3, textAlign: 'center',
          }}>
            <Box sx={{
              width: 44, height: 44, borderRadius: '10px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', bgcolor: '#FFFFFF', border: `1px dashed ${C.accentLine}`,
            }}>
              <FiTrendingUp size={18} color={C.accentDk} />
            </Box>
            <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04em', color: C.accentDk }}>
              1200 × 900 · 4:3
            </Typography>
            <Typography sx={{ fontSize: '0.76rem', color: C.textMute, maxWidth: 220 }}>
              Espacio reservado — pasa la URL en <code style={{ fontFamily: MONO }}>heroImage</code> y se acomoda sola.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// ─── Selector de etapa ───────────────────────────────────────────
function StageSelector({ t, stages }: { t: (typeof content)['es']; stages: (typeof STAGES)['es'] }) {
  const [active, setActive] = useState(0)
  const stage = stages[active]

  return (
    <Box sx={{ mb: { xs: 9, md: 11 } }}>
      <Typography sx={{ textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: C.accentDk, mb: 3 }}>
        {t.stageLabel}
      </Typography>

      <Box sx={{
        display: 'flex', gap: 1, overflowX: 'auto', justifyContent: { xs: 'flex-start', md: 'center' },
        mb: 4, pb: 0.5, '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none',
      }}>
        {stages.map((s, i) => {
          const Icon = s.icon
          const isActive = i === active
          return (
            <Box
              key={s.id}
              component="button"
              type="button"
              onClick={() => setActive(i)}
              sx={{
                appearance: 'none', cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 0.75,
                px: 1.75, py: 1, borderRadius: '10px',
                bgcolor: isActive ? C.accentBg : 'transparent',
                border: `1px solid ${isActive ? C.accentLine : C.border}`,
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={14} color={isActive ? C.accentDk : C.textMute} />
              <Typography sx={{
                fontFamily: MONO, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.04em',
                color: isActive ? C.accentDk : C.textMid, whiteSpace: 'nowrap',
              }}>
                {s.label}
              </Typography>
            </Box>
          )
        })}
      </Box>

      <AnimatePresence mode="wait">
        <Box
          key={stage.id}
          component={motion.div}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto' }}
        >
          <Typography sx={{ fontSize: '0.95rem', color: C.textMid, mb: 2.5, fontStyle: 'italic' }}>
            "{stage.problem}"
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            {stage.chain.map((step, i) => (
              <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  px: 1.4, py: 0.6, borderRadius: '8px', bgcolor: '#FFFFFF',
                  border: `1px solid ${C.border}`, fontFamily: MONO, fontSize: '0.7rem',
                  fontWeight: 600, color: C.text, whiteSpace: 'nowrap',
                }}>
                  {step}
                </Box>
                {i < stage.chain.length - 1 && <Box sx={{ color: C.accentLine, fontSize: '0.9rem' }}>→</Box>}
              </Box>
            ))}
          </Box>
        </Box>
      </AnimatePresence>
    </Box>
  )
}

// ─── Selector de objetivo ─────────────────────────────────────
function GoalSelector({ t, goals }: { t: (typeof content)['es']; goals: (typeof GOALS)['es'] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <Box sx={{ mb: { xs: 9, md: 11 } }}>
      <Typography sx={{ textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: C.accentDk, mb: 3 }}>
        {t.goalLabel}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
        {goals.map((g, i) => {
          const isActive = active === i
          return (
            <Box
              key={g.id}
              component="button"
              type="button"
              onClick={() => setActive(isActive ? null : i)}
              sx={{
                appearance: 'none', cursor: 'pointer',
                px: 1.75, py: 0.75, borderRadius: '20px',
                bgcolor: isActive ? C.accent : '#FFFFFF',
                border: `1px solid ${isActive ? C.accent : C.border}`,
                fontFamily: MONO, fontSize: '0.72rem', fontWeight: 600,
                color: isActive ? '#FFFFFF' : C.textMid,
                transition: 'all 0.2s ease',
              }}
            >
              {g.label}
            </Box>
          )
        })}
      </Box>

      <AnimatePresence>
        {active !== null && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            sx={{ overflow: 'hidden' }}
          >
            <Box sx={{
              maxWidth: 640, mx: 'auto', textAlign: 'center',
              bgcolor: '#F4FAFE', border: `1px solid ${C.accentLine}`, borderRadius: '16px',
              p: { xs: 3, md: 4 },
            }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
                {goals[active].chain.map((step, i) => (
                  <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      px: 1.4, py: 0.6, borderRadius: '8px', bgcolor: '#FFFFFF',
                      border: `1px solid ${C.accentLine}`, fontFamily: MONO, fontSize: '0.7rem',
                      fontWeight: 700, color: C.accentDk, whiteSpace: 'nowrap',
                    }}>
                      {step}
                    </Box>
                    {i < goals[active].chain.length - 1 && <Box sx={{ color: C.accent, fontSize: '0.9rem' }}>→</Box>}
                  </Box>
                ))}
              </Box>
              <Box
                component={motion.button}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                sx={{
                  appearance: 'none', border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 0.8,
                  bgcolor: C.accent, color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.88rem',
                  px: 3, py: 1.2, borderRadius: '10px',
                  boxShadow: `0 4px 16px ${alpha(C.accent, 0.32)}`,
                  '&:hover': { bgcolor: C.accentDk },
                }}
              >
                {t.cta}
                <FiArrowRight size={14} />
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

// ─── Ticket stub — el recurso gráfico fuera de la caja ──────────
function TicketCard({ item }: { item: (typeof EXAMPLES)[number] }) {
  return (
    <Box sx={{
      position: 'relative', flexShrink: 0, width: 220,
      bgcolor: '#FFFFFF', borderRadius: '14px', border: `1px solid ${C.border}`,
      boxShadow: `0 10px 26px ${alpha(C.text, 0.05)}`, overflow: 'visible',
    }}>
      <Box sx={{ px: 2.25, pt: 2.25, pb: 1.75 }}>
        <Typography sx={{ fontSize: '1.6rem', mb: 0.75, lineHeight: 1 }}>{item.emoji}</Typography>
        <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.95rem', color: C.text }}>
          {item.name}
        </Typography>
      </Box>

      {/* perforación */}
      <Box sx={{ position: 'relative', borderTop: `1.5px dashed ${C.border}`, mx: 0 }}>
        <Box sx={{ position: 'absolute', top: -7, left: -7, width: 14, height: 14, borderRadius: '50%', bgcolor: C.bg, border: `1px solid ${C.border}` }} />
        <Box sx={{ position: 'absolute', top: -7, right: -7, width: 14, height: 14, borderRadius: '50%', bgcolor: C.bg, border: `1px solid ${C.border}` }} />
      </Box>

      <Box sx={{ px: 2.25, py: 1.75 }}>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.66rem', color: C.textMute, lineHeight: 1.7 }}>
          {item.line}
        </Typography>
      </Box>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function BusinessGrowthMap({ lang, heroImage }: Props) {
  const l = (lang as Lang) in content ? (lang as Lang) : 'es'
  const t = content[l]
  const stages = STAGES[l]
  const goals = GOALS[l]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' })

  return (
    <Box component="section" ref={sectionRef} sx={{ position: 'relative', bgcolor: C.bg, py: { xs: 9, md: 12 }, overflow: 'hidden' }}>
      <GlobalStyles
        styles={{
          '.bgm-scroll': { scrollbarWidth: 'none' },
          '.bgm-scroll::-webkit-scrollbar': { display: 'none' },
        }}
      />

      <TopographyBackdrop />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header: info izquierda / imagen derecha ── */}
        <Box sx={{
          display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 5, md: 7 }, alignItems: 'center', mb: { xs: 7, md: 8 },
        }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
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
            <Typography sx={{ fontSize: '1rem', color: C.textMid, lineHeight: 1.7, mb: 1 }}>
              {t.subheadline}
            </Typography>
            <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', color: C.textMute }}>
              {t.tagline}
            </Typography>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <GrowthMapImage src={heroImage} label={t.kicker} status={l === 'es' ? 'operativo' : l === 'fr' ? 'opérationnel' : 'operational'} />
          </Box>
        </Box>

        {/* ── Frase filosofía ── */}
        <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 560, mx: 'auto', mb: { xs: 8, md: 10 } }}>
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 800, fontSize: '3.5rem', color: C.accentBg,
            lineHeight: 0, position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
            userSelect: 'none',
          }}>
            "
          </Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.25rem' }, color: C.text, lineHeight: 1.5, pt: 2 }}>
            {t.philosophy}
          </Typography>
        </Box>

        {/* ── Selector de etapa ── */}
        <StageSelector t={t} stages={stages} />

        <Box sx={{ borderTop: `1px solid ${C.border}`, maxWidth: 680, mx: 'auto', mb: { xs: 8, md: 10 } }} />

        {/* ── Selector de objetivo ── */}
        <GoalSelector t={t} goals={goals} />

        <Box sx={{ borderTop: `1px solid ${C.border}`, maxWidth: 680, mx: 'auto', mb: { xs: 8, md: 10 } }} />

        {/* ── Cualquier negocio — tickets ── */}
        <Box sx={{ mb: { xs: 9, md: 11 } }}>
          <Typography sx={{ textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: C.accentDk, mb: 1.5 }}>
            {t.examplesKicker}
          </Typography>
          <Typography sx={{ textAlign: 'center', fontSize: '0.85rem', color: C.textMute, mb: 4 }}>
            {t.examplesLine}
          </Typography>
          <Box className="bgm-scroll" sx={{ display: 'flex', gap: 2, overflowX: 'auto', px: { xs: 0.5, md: 1 }, py: 1 }}>
            {EXAMPLES.map((item) => (
              <TicketCard key={item.name} item={item} />
            ))}
          </Box>
        </Box>

        {/* ── Cierre ── */}
        <Box sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto' }}>
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.9rem' },
            lineHeight: 1.35, color: C.text, mb: 1,
          }}>
            {t.closing1}
          </Typography>
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.9rem' },
            lineHeight: 1.35, color: C.accent,
          }}>
            {t.closing2}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}