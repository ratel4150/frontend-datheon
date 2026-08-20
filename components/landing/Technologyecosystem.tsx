// File: frontend-datheon/components/landing/TechnologyEcosystem.tsx
'use client'

import { Box, Typography, Container, GlobalStyles, alpha } from '@mui/material'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'

// ─── Tokens — misma paleta del Hero ──────────────────────────
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

// ─── Por qué esta sección se ve distinta al Hero ──────────────
// El Hero ya usa un grafo de nodos (DATHEÓN → capas). Repetir ese
// mismo motivo aquí haría ver la página como una plantilla. Esta
// sección es, a propósito, una "hoja de especificaciones": columnas
// tipográficas por categoría, sin logos de stock ni tarjetas
// repetidas. Los ítems con capacidad propia revelan una tarjeta al
// hover — el resto son solo texto, sin decoración innecesaria.

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

const content: Record<Lang, {
  kicker: string
  title: string
  subheadline: string
  allLabel: string
  trustLine: string
  enterpriseKicker: string
  enterpriseCopy: string
  tagline: string
  cta: string
  spotlightKicker: string
  spotlightTitle: string
  spotlightPanelLabel: string
  spotlightStatus: string
}> = {
  es: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: 'Construimos sobre el ecosistema tecnológico que tu empresa ya utiliza.',
    subheadline: 'Integramos plataformas, infraestructura y tecnologías líderes para construir soluciones que se adaptan a tu operación, no al revés.',
    allLabel: 'TODAS',
    trustLine: 'Tecnología abierta. Arquitecturas flexibles. Sin vendor lock-in innecesario.',
    enterpriseKicker: 'TU STACK + NUESTRAS CAPACIDADES',
    enterpriseCopy: 'No importa si tu infraestructura es moderna, híbrida o legacy. Diseñamos integraciones que permiten evolucionar tu ecosistema sin reconstruirlo desde cero.',
    tagline: 'Conectamos lo que ya tienes. Construimos lo que necesitas.',
    cta: 'Explorar capacidades',
    spotlightKicker: 'INTEGRATIONS',
    spotlightTitle: 'Conecta lo que tu negocio ya usa.',
    spotlightPanelLabel: 'Mapa de integración',
    spotlightStatus: 'operativo',
  },
  en: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: 'We build on the technology ecosystem your company already uses.',
    subheadline: 'We integrate leading platforms, infrastructure, and technologies to build solutions that adapt to your operation — not the other way around.',
    allLabel: 'ALL',
    trustLine: 'Open technology. Flexible architectures. No unnecessary vendor lock-in.',
    enterpriseKicker: 'YOUR STACK + OUR CAPABILITIES',
    enterpriseCopy: "It doesn't matter if your infrastructure is modern, hybrid, or legacy. We design integrations that let your ecosystem evolve without rebuilding it from scratch.",
    tagline: 'We connect what you already have. We build what you need.',
    cta: 'Explore our capabilities',
    spotlightKicker: 'INTEGRATIONS',
    spotlightTitle: 'Connect what your business already uses.',
    spotlightPanelLabel: 'Integration map',
    spotlightStatus: 'operational',
  },
  fr: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: "Nous construisons sur l'écosystème technologique que votre entreprise utilise déjà.",
    subheadline: "Nous intégrons des plateformes, une infrastructure et des technologies de pointe pour construire des solutions qui s'adaptent à votre activité, pas l'inverse.",
    allLabel: 'TOUTES',
    trustLine: 'Technologie ouverte. Architectures flexibles. Sans dépendance excessive à un fournisseur.',
    enterpriseKicker: 'VOTRE STACK + NOS CAPACITÉS',
    enterpriseCopy: "Peu importe que votre infrastructure soit moderne, hybride ou existante. Nous concevons des intégrations qui permettent à votre écosystème d'évoluer sans tout reconstruire.",
    tagline: 'Nous connectons ce que vous avez déjà. Nous construisons ce dont vous avez besoin.',
    cta: 'Explorer nos capacités',
    spotlightKicker: 'INTEGRATIONS',
    spotlightTitle: 'Connectez ce que votre entreprise utilise déjà.',
    spotlightPanelLabel: "Carte d'intégration",
    spotlightStatus: 'opérationnel',
  },
}

// Categorías y tecnologías — nombres universales, sin traducir.
// `tag` + `blurb` solo en los ítems donde vale la pena demostrar
// capacidad (ver punto 8 del brief); el resto queda como texto simple.
type TechItem = { name: string; tag?: string; blurb?: string }
type Category = { id: string; label: string; items: TechItem[] }

const CATEGORIES: Category[] = [
  {
    id: 'cloud', label: 'CLOUD & INFRASTRUCTURE',
    items: [
      { name: 'AWS' }, { name: 'Azure' }, { name: 'Google Cloud' },
      { name: 'Docker', tag: 'CONTAINERS', blurb: 'Empaquetado · Portabilidad · CI/CD' },
      { name: 'Kubernetes', tag: 'ORCHESTRATION', blurb: 'Escalado · Alta disponibilidad' },
      { name: 'Cloudflare' },
    ],
  },
  {
    id: 'business', label: 'BUSINESS SYSTEMS',
    items: [
      { name: 'SAP' },
      { name: 'Odoo', tag: 'CRM', blurb: 'Uno de los CRMs que integramos · Ventas · Clientes' },
      { name: 'Salesforce', tag: 'CRM', blurb: 'Uno de los CRMs que integramos · Ventas · Clientes' },
      { name: 'Microsoft Dynamics' }, { name: 'Oracle' }, { name: 'HubSpot' },
    ],
  },
  {
    id: 'ai', label: 'AI',
    items: [
      { name: 'OpenAI' },
      { name: 'Anthropic', tag: 'AI ENGINEERING', blurb: 'LLM · RAG · Agents · Swarms' },
      { name: 'Google Gemini' }, { name: 'Hugging Face' }, { name: 'Local Models' },
    ],
  },
  {
    id: 'data', label: 'DATA',
    items: [
      { name: 'PostgreSQL', tag: 'DATA', blurb: 'Transacciones · Analítica · Capa de datos IA' },
      { name: 'MySQL' }, { name: 'SQL Server' }, { name: 'MongoDB' }, { name: 'Redis' }, { name: 'Vector DBs' },
    ],
  },
  {
    id: 'hardware', label: 'HARDWARE & COMPUTE',
    items: [
      { name: 'NVIDIA', tag: 'AI COMPUTE', blurb: 'GPU Infrastructure · Inference · Training' },
      { name: 'AMD' }, { name: 'Intel' }, { name: 'ARM' }, { name: 'Edge Computing' },
    ],
  },
  {
    id: 'software', label: 'SOFTWARE',
    items: [
      { name: 'React' }, { name: 'Next.js' }, { name: 'Node.js' }, { name: 'Python' }, { name: 'TypeScript' }, { name: '.NET' },
    ],
  },
  {
    id: 'iot', label: 'IoT & CONNECTIVITY',
    items: [
      { name: 'MQTT' }, { name: 'Modbus' }, { name: 'LoRa' }, { name: 'BLE' }, { name: 'ESP32' }, { name: 'PLC' },
    ],
  },
  {
    id: 'integrations', label: 'INTEGRATIONS',
    items: [
      { name: 'WhatsApp', tag: 'COMMUNICATION', blurb: 'Messaging · Customer Service · AI Agents' },
      { name: 'Shopify', tag: 'COMMERCE', blurb: 'E-commerce · Payments · Inventory · Automation' },
      { name: 'REST APIs' }, { name: 'GraphQL' }, { name: 'Webhooks' },
    ],
  },
]

// ─── Backdrop abstracto — patrón de red, no las olas del Hero ───
// El Hero ya usa olas como su firma visual; repetirlas aquí haría
// ver la página como plantilla. Esta sección trata de un ecosistema
// de conexiones, así que el patrón es una malla de puntos unidos
// por líneas finas — mismo azul de marca, tileable, muy sutil.
function EcosystemBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black 30%, transparent 92%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black 30%, transparent 92%)',
      }}
    >
      <Box component="svg" width="100%" height="100%" sx={{ position: 'absolute', inset: 0, display: 'block' }}>
        <defs>
          <pattern id="ecoDotPattern" width="72" height="72" patternUnits="userSpaceOnUse">
            <line x1="8" y1="8" x2="44" y2="30" stroke={C.accent} strokeWidth="0.6" opacity="0.09" />
            <line x1="44" y1="30" x2="20" y2="54" stroke={C.accent} strokeWidth="0.6" opacity="0.09" />
            <line x1="20" y1="54" x2="8" y2="72" stroke={C.accent} strokeWidth="0.6" opacity="0.07" />
            <circle cx="8" cy="8" r="1.7" fill={C.accent} opacity="0.2" />
            <circle cx="44" cy="30" r="1.3" fill={C.accent} opacity="0.16" />
            <circle cx="20" cy="54" r="1.5" fill={C.accent} opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ecoDotPattern)" />
      </Box>

      {/* un solo glow, para dar profundidad — no varios */}
      <Box sx={{
        position: 'absolute', top: '4%', left: '50%', transform: 'translateX(-50%)',
        width: 620, height: 380, borderRadius: '50%',
        background: C.accent, filter: 'blur(190px)', opacity: 0.05,
      }} />
    </Box>
  )
}

// ─── Ítem individual — con o sin hover card ────────────────────
function Tech({ item, dimmed }: { item: TechItem; dimmed: boolean }) {
  const [hovered, setHovered] = useState(false)
  const interactive = Boolean(item.tag && item.blurb)

  return (
    <Box
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      sx={{ position: 'relative', py: 0.4 }}
    >
      <Typography
        sx={{
          fontSize: '0.82rem', fontWeight: interactive ? 600 : 400,
          color: dimmed ? alpha(C.textMute, 0.55) : (interactive ? C.text : C.textMid),
          cursor: interactive ? 'pointer' : 'default',
          borderBottom: interactive ? `1px dashed ${hovered ? C.accent : C.border}` : 'none',
          display: 'inline-block',
          transition: 'color 0.2s ease, border-color 0.2s ease',
        }}
      >
        {item.name}
      </Typography>

      <AnimatePresence>
        {hovered && item.tag && item.blurb && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            sx={{
              position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, zIndex: 40,
              width: 'max-content', maxWidth: 220,
              bgcolor: '#FFFFFF', border: `1px solid ${C.accentLine}`, borderRadius: '8px', px: 1.5, py: 1,
              boxShadow: `0 12px 28px ${alpha(C.text, 0.12)}`,
            }}
          >
            <Typography sx={{
              fontFamily: MONO, fontSize: '0.6rem', fontWeight: 700,
              letterSpacing: '0.06em', color: C.accentDk, mb: 0.3,
            }}>
              {item.tag}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: C.textMid, lineHeight: 1.5 }}>
              {item.blurb}
            </Typography>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

// ─── Spotlight: imagen izquierda / texto derecha ────────────────
// La "imagen" es un mapa de nodos vectorial — mismo lenguaje visual
// del Hero (marcas "+", mono, azul, punto "operativo", líneas con
// pulso animado) en vez de una ilustración de stock genérica.
const SPOTLIGHT_NODES = [
  { name: 'WhatsApp', x: 160, y: 40 },
  { name: 'Shopify',  x: 274, y: 123, highlight: true },
  { name: 'REST APIs', x: 230, y: 257 },
  { name: 'GraphQL',  x: 90, y: 257 },
  { name: 'Webhooks', x: 46, y: 123 },
] as const

function IntegrationImage({ animate }: { animate: boolean }) {
  return (
    <Box component="svg" viewBox="0 0 320 320" sx={{ width: '100%', height: 'auto', display: 'block' }}>
      {SPOTLIGHT_NODES.map((n) => (
        <line
          key={`base-${n.name}`}
          x1={160} y1={160} x2={n.x} y2={n.y}
          stroke={C.border} strokeWidth={1.3}
        />
      ))}
      {SPOTLIGHT_NODES.map((n) => (
        <line
          key={`pulse-${n.name}`}
          x1={160} y1={160} x2={n.x} y2={n.y}
          stroke={C.accent} strokeWidth={1.5} strokeLinecap="round"
          strokeDasharray="3 9" className="eco-pulse-line"
        />
      ))}

      {/* nodo central — DATHEÓN */}
      <circle cx={160} cy={160} r={30} fill={C.accentBg} stroke={C.accentLine} strokeWidth={1.5} />
      <text x={160} y={158} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={9.5} letterSpacing="0.4" fill={C.text}>
        DATHEÓN
      </text>
      <text x={160} y={170} textAnchor="middle" fontFamily={MONO} fontWeight={500} fontSize={6.5} letterSpacing="0.5" fill={C.textMute}>
        INTEGRATIONS
      </text>

      {/* nodos satélite */}
      {SPOTLIGHT_NODES.map((n, i) => (
        <g
          key={n.name}
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'scale(1)' : 'scale(0.7)',
            transformOrigin: `${n.x}px ${n.y}px`,
            transition: `opacity 0.4s ease ${0.15 + i * 0.08}s, transform 0.4s ease ${0.15 + i * 0.08}s`,
          }}
        >
          <circle
            cx={n.x} cy={n.y} r={('highlight' in n && n.highlight) ? 22 : 18}
            fill={('highlight' in n && n.highlight) ? C.accent : '#FFFFFF'}
            stroke={('highlight' in n && n.highlight) ? C.accent : C.border}
            strokeWidth={1.4}
          />
          <text
            x={n.x} y={n.y + 3} textAnchor="middle" fontFamily={MONO} fontWeight={600}
            fontSize={6.2} fill={('highlight' in n && n.highlight) ? '#FFFFFF' : C.textMid}
          >
            {n.name.length > 9 ? n.name.slice(0, 8) + '…' : n.name}
          </text>
        </g>
      ))}
    </Box>
  )
}

function IntegrationSpotlight({ t }: { t: (typeof content)['es'] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shopify = CATEGORIES.find((c) => c.id === 'integrations')!.items.find((i) => i.name === 'Shopify')!
  const rest = CATEGORIES.find((c) => c.id === 'integrations')!.items.filter((i) => i.name !== 'Shopify')

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
        gap: { xs: 4, md: 6 }, alignItems: 'center', mb: { xs: 6, md: 7 },
      }}
    >
      {/* ── Izquierda: imagen ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          bgcolor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${C.border}`,
          boxShadow: `0 20px 50px ${alpha(C.text, 0.06)}`, overflow: 'hidden',
        }}
      >
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 2.5, py: 1.5, borderBottom: `1px solid ${C.border}`, bgcolor: '#F4FAFE',
        }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: C.textMid }}>
            {t.spotlightPanelLabel}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <Box sx={{
              width: 6, height: 6, borderRadius: '50%', bgcolor: C.accent,
              animation: 'ecoPulseDot 2s ease-in-out infinite',
            }} />
            <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: C.accentDk, fontWeight: 600 }}>
              {t.spotlightStatus}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <IntegrationImage animate={inView} />
        </Box>
      </Box>

      {/* ── Derecha: texto ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Typography sx={{
          fontFamily: MONO, fontWeight: 700, fontSize: '0.7rem',
          letterSpacing: '0.14em', color: C.accentDk, mb: 1.25,
        }}>
          {t.spotlightKicker}
        </Typography>
        <Typography sx={{
          fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.4rem', md: '1.65rem' },
          color: C.text, lineHeight: 1.3, mb: 3,
        }}>
          {t.spotlightTitle}
        </Typography>

        <Box sx={{ pl: 2, borderLeft: `2px solid ${C.accent}`, mb: 3 }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.05rem', color: C.text }}>
            {shopify.name}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.06em', color: C.accentDk, mt: 0.4 }}>
            {shopify.tag}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: C.textMid, mt: 0.4 }}>
            {shopify.blurb}
          </Typography>
        </Box>

        <Typography sx={{ fontFamily: MONO, fontSize: '0.74rem', letterSpacing: '0.03em', color: C.textMute }}>
          {rest.map((i) => i.name).join('  ·  ')}
        </Typography>
      </Box>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function TechnologyEcosystem({ lang }: Props) {
  const l = (lang as Lang) in content ? (lang as Lang) : 'es'
  const t = content[l]
  const [activeFilter, setActiveFilter] = useState<string>('all')

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: C.bg, py: { xs: 8, md: 11 } }}>
      <GlobalStyles
        styles={{
          '.eco-pulse-line': { animation: 'ecoDash 2.6s linear infinite' },
          '@keyframes ecoDash': { to: { strokeDashoffset: -140 } },
          '@keyframes ecoPulseDot': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
          '@media (prefers-reduced-motion: reduce)': {
            '.eco-pulse-line': { animation: 'none' },
          },
        }}
      />
      <EcosystemBackdrop />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <Box sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: { xs: 6, md: 7 } }}>
          <Typography sx={{
            fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem',
            letterSpacing: '0.16em', color: C.accentDk, mb: 1.5,
          }}>
            {t.kicker}
          </Typography>
          <Typography variant="h2" sx={{
            fontFamily: DISPLAY, fontWeight: 700,
            fontSize: { xs: '1.7rem', md: '2.1rem' }, lineHeight: 1.3,
            letterSpacing: '-0.015em', color: C.text, mb: 2,
          }}>
            {t.title}
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: C.textMid, lineHeight: 1.75 }}>
            {t.subheadline}
          </Typography>
        </Box>

        <Box sx={{ borderTop: `1px solid ${C.border}`, mb: { xs: 5, md: 6 } }} />

        {/* ── Filtros — tabs con subrayado deslizante ── */}
        <Box sx={{
          display: 'flex', gap: { xs: 2, md: 3 }, mb: { xs: 5, md: 6 },
          overflowX: 'auto', justifyContent: { xs: 'flex-start', md: 'center' },
          '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none',
        }}>
          {['all', ...CATEGORIES.map((c) => c.id)].map((id) => {
            const label = id === 'all' ? t.allLabel : CATEGORIES.find((c) => c.id === id)!.label.split(' ')[0]
            const active = activeFilter === id
            return (
              <Box
                key={id}
                component="button"
                type="button"
                onClick={() => setActiveFilter(id)}
                sx={{
                  position: 'relative', appearance: 'none', bgcolor: 'transparent', border: 'none',
                  cursor: 'pointer', pb: 1, flexShrink: 0,
                  fontFamily: MONO, fontSize: '0.72rem', letterSpacing: '0.06em',
                  color: active ? C.text : C.textMute, fontWeight: active ? 700 : 500,
                  transition: 'color 0.2s ease', whiteSpace: 'nowrap',
                }}
              >
                {label}
                {active && (
                  <Box
                    component={motion.div}
                    layoutId="ecosystemTabIndicator"
                    sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, bgcolor: C.accent }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </Box>
            )
          })}
        </Box>

        {/* ── Columnas por categoría ── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
          rowGap: { xs: 4, md: 5 }, columnGap: 3,
          mb: { xs: 6, md: 7 },
        }}>
          {CATEGORIES.map((cat) => {
            const dimmed = activeFilter !== 'all' && activeFilter !== cat.id
            return (
              <Box
                key={cat.id}
                component={motion.div}
                animate={{ opacity: dimmed ? 0.35 : 1 }}
                transition={{ duration: 0.25 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.25 }}>
                  <Box sx={{ width: 8, height: 2, bgcolor: dimmed ? C.border : C.accent, transition: 'background-color 0.25s ease' }} />
                  <Typography sx={{
                    fontFamily: MONO, fontSize: '0.62rem', fontWeight: 700,
                    letterSpacing: '0.05em', color: dimmed ? C.textMute : C.text,
                  }}>
                    {cat.label}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {cat.items.map((it) => (
                    <Tech key={it.name} item={it} dimmed={dimmed} />
                  ))}
                </Box>
              </Box>
            )
          })}
        </Box>

        <IntegrationSpotlight t={t} />

        <Box sx={{ borderTop: `1px solid ${C.border}`, mb: { xs: 5, md: 6 } }} />

        {/* ── Trust line ── */}
        <Typography sx={{
          textAlign: 'center', fontSize: '0.85rem', color: C.textMid,
          fontWeight: 500, mb: { xs: 5, md: 6 },
        }}>
          {t.trustLine}
        </Typography>

        <Box sx={{ borderTop: `1px solid ${C.border}`, mb: { xs: 5, md: 6 } }} />

        {/* ── Bloque enterprise + CTA ── */}
        <Box sx={{ textAlign: 'center', maxWidth: 560, mx: 'auto' }}>
          <Typography sx={{
            fontFamily: MONO, fontWeight: 700, fontSize: '0.68rem',
            letterSpacing: '0.12em', color: C.accentDk, mb: 1.5,
          }}>
            {t.enterpriseKicker}
          </Typography>
          <Typography sx={{ fontSize: '0.92rem', color: C.textMid, lineHeight: 1.75, mb: 3 }}>
            {t.enterpriseCopy}
          </Typography>
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.15rem', md: '1.3rem' },
            color: C.text, mb: 2.5,
          }}>
            {t.tagline}
          </Typography>

          <Box
            component={motion.button}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            sx={{
              appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 0.6, mx: 'auto',
              fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600, color: C.accent,
              pb: 0.3, borderBottom: `1px solid ${C.accentLine}`,
              transition: 'border-color 0.2s ease',
              '&:hover': { borderColor: C.accent },
            }}
          >
            {t.cta}
            <FiArrowRight size={13} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}