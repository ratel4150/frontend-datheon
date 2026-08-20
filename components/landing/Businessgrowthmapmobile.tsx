// File: components/landing/Businessgrowthmapmobile.tsx
// File: frontend-datheon/components/landing/BusinessGrowthMapMobile.tsx
'use client'

import { Box, Typography, Container, alpha } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  FiArrowRight, FiCompass, FiHome, FiLayers, FiTrendingUp, FiGrid, FiGlobe, FiChevronDown,
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

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

const content: Record<Lang, {
  kicker: string; title: string; subheadline: string; tagline: string; philosophy: string
  stageLabel: string; goalLabel: string; examplesKicker: string; examplesLine: string
  closing1: string; closing2: string; cta: string
}> = {
  es: {
    kicker: 'WHERE ARE YOU TODAY?', title: '¿Dónde está tu negocio hoy?',
    subheadline: 'No importa dónde esté tu negocio. Importa hacia dónde quieres llevarlo.',
    tagline: 'Empieza con un problema. Escala hacia un ecosistema.',
    philosophy: 'No medimos tu negocio por su tamaño. Medimos el problema que quieres resolver.',
    stageLabel: '¿DÓNDE ESTÁS HOY?', goalLabel: '¿QUÉ QUIERES LOGRAR?',
    examplesKicker: 'PARA CUALQUIER NEGOCIO', examplesLine: 'El tamaño cambia. La capacidad de transformar el negocio no.',
    closing1: 'La tecnología no debe preguntarte qué tamaño tienes.', closing2: 'Debe preguntarte qué quieres lograr.',
    cta: 'Quiero construir esto',
  },
  en: {
    kicker: 'WHERE ARE YOU TODAY?', title: 'Where is your business today?',
    subheadline: "It doesn't matter where your business is. What matters is where you want to take it.",
    tagline: 'Start with a problem. Scale into an ecosystem.',
    philosophy: "We don't measure your business by its size. We measure the problem you want to solve.",
    stageLabel: 'WHERE ARE YOU TODAY?', goalLabel: 'WHAT DO YOU WANT TO ACHIEVE?',
    examplesKicker: 'FOR ANY BUSINESS', examplesLine: "The size changes. The ability to transform the business doesn't.",
    closing1: "Technology shouldn't ask how big you are.", closing2: 'It should ask what you want to achieve.',
    cta: 'I want to build this',
  },
  fr: {
    kicker: 'WHERE ARE YOU TODAY?', title: "Où en est votre entreprise aujourd'hui ?",
    subheadline: "Peu importe où en est votre entreprise. Ce qui compte, c'est où vous voulez l'emmener.",
    tagline: 'Commencez par un problème. Évoluez vers un écosystème.',
    philosophy: 'Nous ne mesurons pas votre entreprise par sa taille. Nous mesurons le problème que vous voulez résoudre.',
    stageLabel: 'OÙ EN ÊTES-VOUS ?', goalLabel: 'QUE VOULEZ-VOUS ACCOMPLIR ?',
    examplesKicker: 'POUR TOUTE ENTREPRISE', examplesLine: "La taille change. La capacité de transformer l'entreprise, non.",
    closing1: 'La technologie ne doit pas vous demander votre taille.', closing2: 'Elle doit vous demander ce que vous voulez accomplir.',
    cta: 'Je veux construire ceci',
  },
}

const STAGES: Record<Lang, { id: string; label: string; icon: typeof FiCompass; problem: string; chain: string[] }[]> = {
  es: [
    { id: 'idea', label: 'IDEA', icon: FiCompass, problem: 'Tienes una idea pero no sabes cómo convertirla en tecnología.', chain: ['IDEA', 'MVP', 'USERS', 'SCALE'] },
    { id: 'small', label: 'PEQUEÑO NEGOCIO', icon: FiHome, problem: 'Todo funciona manual: agenda, cobros, seguimiento.', chain: ['CLIENTE', 'WHATSAPP', 'AI', 'AGENDA'] },
    { id: 'pyme', label: 'PYME', icon: FiLayers, problem: 'Tienes demasiadas cosas funcionando por separado.', chain: ['SISTEMAS', 'DATHEÓN', 'AUTOMATIZACIÓN'] },
    { id: 'growth', label: 'EN CRECIMIENTO', icon: FiTrendingUp, problem: 'La empresa creció más rápido que sus sistemas.', chain: ['ERP · CRM', 'DATHEÓN', 'AI'] },
    { id: 'mid', label: 'MID-MARKET', icon: FiGrid, problem: 'Múltiples sistemas, sucursales y datos aislados.', chain: ['ERP · IoT', 'INTEGRATION', 'AI · DATA'] },
    { id: 'enterprise', label: 'ENTERPRISE', icon: FiGlobe, problem: 'Diseñamos sistemas para operaciones complejas.', chain: ['DATA', 'PRIVATE AI', 'AGENTS'] },
  ],
  en: [
    { id: 'idea', label: 'IDEA', icon: FiCompass, problem: "You have an idea but don't know how to turn it into technology.", chain: ['IDEA', 'MVP', 'USERS', 'SCALE'] },
    { id: 'small', label: 'SMALL BUSINESS', icon: FiHome, problem: 'Everything runs manually: bookings, payments, follow-ups.', chain: ['CUSTOMER', 'WHATSAPP', 'AI', 'SCHEDULE'] },
    { id: 'pyme', label: 'SMB', icon: FiLayers, problem: 'You have too many things running separately.', chain: ['SYSTEMS', 'DATHEÓN', 'AUTOMATION'] },
    { id: 'growth', label: 'GROWING COMPANY', icon: FiTrendingUp, problem: 'The company grew faster than its systems.', chain: ['ERP · CRM', 'DATHEÓN', 'AI'] },
    { id: 'mid', label: 'MID-MARKET', icon: FiGrid, problem: 'Multiple systems, branches, isolated data.', chain: ['ERP · IoT', 'INTEGRATION', 'AI · DATA'] },
    { id: 'enterprise', label: 'ENTERPRISE', icon: FiGlobe, problem: 'We design systems for complex operations.', chain: ['DATA', 'PRIVATE AI', 'AGENTS'] },
  ],
  fr: [
    { id: 'idea', label: 'IDÉE', icon: FiCompass, problem: "Vous avez une idée mais ne savez pas comment la transformer.", chain: ['IDÉE', 'MVP', 'USAGERS', 'SCALE'] },
    { id: 'small', label: 'PETITE ENTREPRISE', icon: FiHome, problem: 'Tout fonctionne manuellement.', chain: ['CLIENT', 'WHATSAPP', 'AI', 'AGENDA'] },
    { id: 'pyme', label: 'PME', icon: FiLayers, problem: 'Trop de choses fonctionnent séparément.', chain: ['SYSTÈMES', 'DATHEÓN', 'AUTOMATISATION'] },
    { id: 'growth', label: 'EN CROISSANCE', icon: FiTrendingUp, problem: "L'entreprise a grandi plus vite que ses systèmes.", chain: ['ERP · CRM', 'DATHEÓN', 'AI'] },
    { id: 'mid', label: 'MID-MARKET', icon: FiGrid, problem: 'Systèmes multiples, données isolées.', chain: ['ERP · IoT', 'INTEGRATION', 'AI · DATA'] },
    { id: 'enterprise', label: 'ENTERPRISE', icon: FiGlobe, problem: 'Nous concevons des systèmes pour des opérations complexes.', chain: ['DATA', 'PRIVATE AI', 'AGENTS'] },
  ],
}

const GOALS: Record<Lang, { id: string; label: string; chain: string[] }[]> = {
  es: [
    { id: 'launch', label: 'Lanzar', chain: ['IDEA', 'MVP', 'PRODUCTO'] },
    { id: 'sell', label: 'Vender más', chain: ['CLIENTE', 'AI AGENT', 'VENTA'] },
    { id: 'automate', label: 'Automatizar', chain: ['WHATSAPP', 'AI AGENT', 'AUTOMATION'] },
    { id: 'connect', label: 'Conectar sistemas', chain: ['SISTEMAS', 'DATHEÓN', 'INTEGRACIÓN'] },
    { id: 'ai', label: 'Incorporar AI', chain: ['DATOS', 'RAG', 'DECISIÓN'] },
    { id: 'data', label: 'Entender mis datos', chain: ['DATOS', 'DATHEÓN', 'ANALYTICS'] },
    { id: 'scale', label: 'Escalar', chain: ['ARQUITECTURA', 'DATHEÓN', 'CLOUD'] },
    { id: 'hardware', label: 'Conectar hardware', chain: ['SENSOR', 'EDGE', 'DATA'] },
    { id: 'local', label: 'AI local', chain: ['DATOS PROPIOS', 'LLM LOCAL', 'AGENTES'] },
  ],
  en: [
    { id: 'launch', label: 'Launch', chain: ['IDEA', 'MVP', 'PRODUCT'] },
    { id: 'sell', label: 'Sell more', chain: ['CUSTOMER', 'AI AGENT', 'SALE'] },
    { id: 'automate', label: 'Automate', chain: ['WHATSAPP', 'AI AGENT', 'AUTOMATION'] },
    { id: 'connect', label: 'Connect systems', chain: ['SYSTEMS', 'DATHEÓN', 'INTEGRATION'] },
    { id: 'ai', label: 'Bring in AI', chain: ['DATA', 'RAG', 'DECISION'] },
    { id: 'data', label: 'Understand my data', chain: ['DATA', 'DATHEÓN', 'ANALYTICS'] },
    { id: 'scale', label: 'Scale', chain: ['SETUP', 'DATHEÓN', 'CLOUD'] },
    { id: 'hardware', label: 'Connect hardware', chain: ['SENSOR', 'EDGE', 'DATA'] },
    { id: 'local', label: 'Local AI', chain: ['YOUR DATA', 'LOCAL LLM', 'AGENTS'] },
  ],
  fr: [
    { id: 'launch', label: 'Lancer', chain: ['IDÉE', 'MVP', 'PRODUIT'] },
    { id: 'sell', label: 'Vendre plus', chain: ['CLIENT', 'AI AGENT', 'VENTE'] },
    { id: 'automate', label: 'Automatiser', chain: ['WHATSAPP', 'AI AGENT', 'AUTOMATION'] },
    { id: 'connect', label: 'Connecter les systèmes', chain: ['SYSTÈMES', 'DATHEÓN', 'INTÉGRATION'] },
    { id: 'ai', label: "Intégrer l'IA", chain: ['DONNÉES', 'RAG', 'DÉCISION'] },
    { id: 'data', label: 'Comprendre mes données', chain: ['DONNÉES', 'DATHEÓN', 'ANALYTICS'] },
    { id: 'scale', label: 'Évoluer', chain: ['ARCHITECTURE', 'DATHEÓN', 'CLOUD'] },
    { id: 'hardware', label: 'Connecter du hardware', chain: ['SENSOR', 'EDGE', 'DATA'] },
    { id: 'local', label: 'IA locale', chain: ['DONNÉES', 'LLM LOCAL', 'AGENTS'] },
  ],
}

const EXAMPLES = [
  { emoji: '💈', name: 'Barbería', line: 'Agenda · WhatsApp · CRM · IA' },
  { emoji: '🌮', name: 'Tortillería', line: 'Predicción de demanda · Sensores' },
  { emoji: '🔧', name: 'Taller', line: 'Diagnóstico · Citas · WhatsApp' },
  { emoji: '🍽️', name: 'Restaurante', line: 'POS · Demanda · IoT · IA' },
  { emoji: '🏋️', name: 'Gimnasio', line: 'Membresías · Acceso · CRM' },
  { emoji: '🛒', name: 'Tienda', line: 'POS · E-commerce · Analytics' },
  { emoji: '🚀', name: 'Startup', line: 'MVP · AI · SaaS · Cloud' },
  { emoji: '🏢', name: 'PyME', line: 'ERP · CRM · Automatización' },
  { emoji: '🏭', name: 'Industria', line: 'IoT · Edge · Predictive Maintenance' },
  { emoji: '🌎', name: 'Enterprise', line: 'Integración · Private AI · Agents' },
] as const

// ─── Etapa — acordeón ─────────────────────────────────────────
function StageAccordion({ t, stages }: { t: (typeof content)['es']; stages: (typeof STAGES)['es'] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Box sx={{ mb: 6 }}>
      <Typography sx={{ textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.14em', color: C.accentDk, mb: 2.5 }}>
        {t.stageLabel}
      </Typography>
      <Box sx={{ bgcolor: '#FFFFFF', borderRadius: '14px', border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        {stages.map((s, i) => {
          const Icon = s.icon
          const isOpen = open === i
          return (
            <Box key={s.id} sx={{ borderBottom: i < stages.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <Box
                component="button" type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                sx={{
                  appearance: 'none', width: '100%', bgcolor: 'transparent', border: 'none',
                  display: 'flex', alignItems: 'center', gap: 1.25, px: 2, py: 1.5,
                  minHeight: 52, cursor: 'pointer', textAlign: 'left',
                }}
              >
                <Box sx={{
                  width: 30, height: 30, borderRadius: '8px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: isOpen ? C.accent : C.accentBg,
                }}>
                  <Icon size={14} color={isOpen ? '#FFFFFF' : C.accentDk} />
                </Box>
                <Typography sx={{ flex: 1, fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.04em', color: isOpen ? C.accentDk : C.text }}>
                  {s.label}
                </Typography>
                <Box component={motion.div} animate={{ rotate: isOpen ? 180 : 0 }} sx={{ color: C.textMute, display: 'flex' }}>
                  <FiChevronDown size={15} />
                </Box>
              </Box>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <Box component={motion.div} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} sx={{ overflow: 'hidden' }}>
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Typography sx={{ fontSize: '0.82rem', color: C.textMid, fontStyle: 'italic', mb: 1.5 }}>
                        "{s.problem}"
                      </Typography>
                      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: C.textMute }}>
                        {s.chain.join('  →  ')}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </AnimatePresence>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

// ─── Objetivo — chips + resultado ─────────────────────────────
function GoalChips({ t, goals }: { t: (typeof content)['es']; goals: (typeof GOALS)['es'] }) {
  const [active, setActive] = useState<number | null>(null)
  return (
    <Box sx={{ mb: 6 }}>
      <Typography sx={{ textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.64rem', letterSpacing: '0.14em', color: C.accentDk, mb: 2.5 }}>
        {t.goalLabel}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.75, mb: 3 }}>
        {goals.map((g, i) => {
          const isActive = active === i
          return (
            <Box
              key={g.id} component="button" type="button"
              onClick={() => setActive(isActive ? null : i)}
              sx={{
                appearance: 'none', cursor: 'pointer', px: 1.4, py: 0.6, borderRadius: '20px',
                bgcolor: isActive ? C.accent : '#FFFFFF',
                border: `1px solid ${isActive ? C.accent : C.border}`,
                fontFamily: MONO, fontSize: '0.66rem', fontWeight: 600,
                color: isActive ? '#FFFFFF' : C.textMid,
              }}
            >
              {g.label}
            </Box>
          )
        })}
      </Box>
      <AnimatePresence>
        {active !== null && (
          <Box component={motion.div} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} sx={{ overflow: 'hidden' }}>
            <Box sx={{ bgcolor: '#F4FAFE', border: `1px solid ${C.accentLine}`, borderRadius: '14px', p: 2.5, textAlign: 'center' }}>
              <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: C.accentDk, mb: 2 }}>
                {goals[active].chain.join('  →  ')}
              </Typography>
              <Box
                component={motion.button}
                whileTap={{ scale: 0.98 }}
                type="button"
                sx={{
                  appearance: 'none', border: 'none', cursor: 'pointer', width: '100%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 0.7,
                  bgcolor: C.accent, color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.85rem',
                  py: 1.3, borderRadius: '10px',
                }}
              >
                {t.cta}
                <FiArrowRight size={13} />
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function BusinessGrowthMapMobile({ lang }: Props) {
  const l = (lang as Lang) in content ? (lang as Lang) : 'es'
  const t = content[l]
  const stages = STAGES[l]
  const goals = GOALS[l]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-30px' })

  return (
    <Box component="section" ref={sectionRef} sx={{ bgcolor: C.bg, py: 7 }}>
      <Container maxWidth="sm" sx={{ px: 2.5 }}>

        <Box component={motion.div} initial={{ opacity: 0, y: 14 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.12em', color: C.accentDk, mb: 1.25 }}>
            {t.kicker}
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.3, color: C.text, mb: 1.5 }}>
            {t.title}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: C.textMid, lineHeight: 1.65, mb: 1 }}>
            {t.subheadline}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: C.textMute }}>
            {t.tagline}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ width: 28, height: 2, bgcolor: C.accent, mx: 'auto', mb: 1.5 }} />
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.02rem', color: C.text, lineHeight: 1.45 }}>
            {t.philosophy}
          </Typography>
        </Box>

        <StageAccordion t={t} stages={stages} />
        <Box sx={{ borderTop: `1px solid ${C.border}`, mb: 6 }} />
        <GoalChips t={t} goals={goals} />
        <Box sx={{ borderTop: `1px solid ${C.border}`, mb: 6 }} />

        {/* ── Tickets — columna, no scroll forzado ── */}
        <Box sx={{ mb: 6 }}>
          <Typography sx={{ textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.12em', color: C.accentDk, mb: 1 }}>
            {t.examplesKicker}
          </Typography>
          <Typography sx={{ textAlign: 'center', fontSize: '0.8rem', color: C.textMute, mb: 3 }}>
            {t.examplesLine}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
            {EXAMPLES.map((item) => (
              <Box key={item.name} sx={{
                bgcolor: '#FFFFFF', borderRadius: '12px', border: `1px solid ${C.border}`,
                boxShadow: `0 8px 20px ${alpha(C.text, 0.05)}`, overflow: 'hidden',
              }}>
                <Box sx={{ px: 1.75, pt: 1.75, pb: 1.25 }}>
                  <Typography sx={{ fontSize: '1.3rem', mb: 0.5 }}>{item.emoji}</Typography>
                  <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.82rem', color: C.text }}>
                    {item.name}
                  </Typography>
                </Box>
                <Box sx={{ borderTop: `1.5px dashed ${C.border}` }} />
                <Box sx={{ px: 1.75, py: 1.25 }}>
                  <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', color: C.textMute, lineHeight: 1.6 }}>
                    {item.line}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.35, color: C.text, mb: 0.5 }}>
            {t.closing1}
          </Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.35, color: C.accent }}>
            {t.closing2}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}