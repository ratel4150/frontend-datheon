'use client'

import { Box, Typography, Container, alpha } from '@mui/material'
import {
  FiTrendingUp, FiTarget, FiZap, FiShield, FiBarChart2, FiUsers,
} from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  Cell, CartesianGrid,
} from 'recharts'

// ─── Tokens ─────────────────────────────────────────────────
const C = {
  bg:         '#FFFFFF',
  bgAlt:      '#F7FBFF',
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

// ─── Data ────────────────────────────────────────────────────
interface Reason {
  icon: React.ReactNode
  color: string
  title: { es: string; en: string; fr: string }
  desc:  { es: string; en: string; fr: string }
}

const REASONS: Reason[] = [
  {
    icon: <FiTrendingUp size={16}/>, color: '#00AEEF',
    title: {
      es: 'Experiencia comprobada en producción',
      en: 'Proven production experience',
      fr: 'Expérience prouvée en production',
    },
    desc: {
      es: 'Cada tecnología que ofrecemos la hemos desplegado en entornos reales. Sin pruebas de laboratorio, solo resultados en producción.',
      en: 'Every technology we offer has been deployed in real environments. No lab tests, only production results.',
      fr: "Chaque technologie que nous proposons a été déployée dans des environnements réels. Pas de tests en laboratoire, seulement des résultats en production.",
    },
  },
  {
    icon: <FiTarget size={16}/>, color: '#7C3AED',
    title: {
      es: 'Soluciones a medida, no plantillas',
      en: 'Custom solutions, not templates',
      fr: 'Solutions sur mesure, pas de modèles',
    },
    desc: {
      es: 'Diseñamos desde cero para tus procesos únicos. Nada reutilizado sin contexto, nada genérico.',
      en: 'We design from scratch for your unique processes. Nothing reused without context, nothing generic.',
      fr: 'Nous concevons depuis zéro pour vos processus uniques. Rien de réutilisé sans contexte, rien de générique.',
    },
  },
  {
    icon: <FiZap size={16}/>, color: '#F59E0B',
    title: {
      es: 'Stack 2025: IA, agentes y RAG',
      en: '2025 stack: AI, agents and RAG',
      fr: 'Stack 2025 : IA, agents et RAG',
    },
    desc: {
      es: 'Trabajamos con las tecnologías que el mercado pide ahora: LangGraph, pgvector, Terraform, Next.js 15 y modelos frontier.',
      en: 'We work with the technologies the market demands now: LangGraph, pgvector, Terraform, Next.js 15 and frontier models.',
      fr: 'Nous travaillons avec les technologies que le marché demande maintenant : LangGraph, pgvector, Terraform, Next.js 15 et modèles frontier.',
    },
  },
  {
    icon: <FiShield size={16}/>, color: '#EF4444',
    title: {
      es: 'Seguridad y compliance desde el día 1',
      en: 'Security and compliance from day 1',
      fr: 'Sécurité et conformité dès le premier jour',
    },
    desc: {
      es: 'OWASP, ISO 27001, gestión de secretos con Vault y pruebas de penetración antes de cada release.',
      en: 'OWASP, ISO 27001, secret management with Vault and penetration testing before each release.',
      fr: "OWASP, ISO 27001, gestion des secrets avec Vault et tests de pénétration avant chaque release.",
    },
  },
  {
    icon: <FiBarChart2 size={16}/>, color: '#10B981',
    title: {
      es: 'ROI medible desde el primer sprint',
      en: 'Measurable ROI from the first sprint',
      fr: 'ROI mesurable dès le premier sprint',
    },
    desc: {
      es: 'Definimos métricas de éxito antes de escribir código. Cada decisión técnica se valida contra su impacto en tu negocio.',
      en: 'We define success metrics before writing code. Every technical decision is validated against its business impact.',
      fr: 'Nous définissons les métriques de succès avant d\'écrire du code. Chaque décision technique est validée par rapport à son impact business.',
    },
  },
  {
    icon: <FiUsers size={16}/>, color: '#6366F1',
    title: {
      es: 'Soporte post-lanzamiento real',
      en: 'Real post-launch support',
      fr: 'Support post-lancement réel',
    },
    desc: {
      es: 'SLA definido, acompañamiento continuo y mejoras basadas en métricas reales. No desaparecemos al entregar.',
      en: 'Defined SLA, continuous support and improvements based on real metrics. We do not disappear after delivery.',
      fr: "SLA défini, accompagnement continu et améliorations basées sur des métriques réelles. Nous ne disparaissons pas après la livraison.",
    },
  },
]

// ─── Chart data ──────────────────────────────────────────────
const chartData = [
  { label: 'IA & Agentes',      pct: 35, color: '#7C3AED' },
  { label: 'Cloud & DevOps',    pct: 25, color: '#2563EB' },
  { label: 'SaaS / Web',        pct: 20, color: '#00AEEF' },
  { label: 'Automatización',    pct: 12, color: '#10B981' },
  { label: 'IoT & Hardware',    pct: 8,  color: '#F59E0B' },
]

// ─── Animated bar ────────────────────────────────────────────
function AnimatedBar({ pct, color, inView }: { pct: number; color: string; inView: boolean }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(pct), 200)
      return () => clearTimeout(t)
    }
  }, [inView, pct])
  return (
    <Box sx={{ height: 8, bgcolor: alpha(color, 0.12), borderRadius: 4, overflow: 'hidden' }}>
      <Box sx={{
        height: '100%', width: `${width}%`,
        bgcolor: color, borderRadius: 4,
        transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
      }}/>
    </Box>
  )
}

// ─── Custom Tooltip ──────────────────────────────────────────
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <Box sx={{
      bgcolor: '#fff', border: `1px solid ${C.border}`,
      borderRadius: '10px', px: 1.75, py: 1.25,
      boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
    }}>
      <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: d.color }}>{d.label}</Typography>
      <Typography sx={{ fontSize: '0.75rem', color: C.textMid }}>{d.pct}% del stack</Typography>
    </Box>
  )
}

// ─── Main ────────────────────────────────────────────────────
export default function WhyChooseUs({ lang }: Props) {
  const l = lang as Lang
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])

  const uiText = {
    sectionLabel: { es: '¿Por qué elegirnos?', en: 'Why choose us?', fr: 'Pourquoi nous choisir ?' },
    title:        { es: 'Tecnología con propósito.', en: 'Technology with purpose.', fr: 'Technologie avec un but.' },
    titleAccent:  { es: 'Resultados que perduran.', en: 'Results that last.', fr: 'Des résultats durables.' },
    subtitle: {
      es: 'No somos un proveedor más. Somos el equipo técnico que tu empresa necesita para crecer con tecnología real.',
      en: 'We are not just another vendor. We are the technical team your company needs to grow with real technology.',
      fr: "Nous ne sommes pas un simple fournisseur. Nous sommes l'équipe technique dont votre entreprise a besoin pour croître avec une vraie technologie.",
    },
    chartTitle: {
      es: 'Distribución de nuestro stack tecnológico',
      en: 'Distribution of our technology stack',
      fr: 'Distribution de notre stack technologique',
    },
    chartSub: {
      es: 'Peso relativo de cada área en los proyectos que entregamos en producción.',
      en: 'Relative weight of each area in the projects we deliver in production.',
      fr: 'Poids relatif de chaque domaine dans les projets que nous livrons en production.',
    },
    ofStack: { es: '% del stack', en: '% of stack', fr: '% du stack' },
  }
  const tx = (k: keyof typeof uiText) =>
    (uiText[k] as Record<string, string>)[l] ?? (uiText[k] as Record<string, string>)['es']

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: C.bgAlt }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}
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
              {tx('sectionLabel')}
            </Typography>
          </Box>

          <Typography variant="h2" sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800, fontSize: { xs: '2rem', md: '2.75rem' },
            color: C.text, lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            {tx('title')}{' '}
            <Box component="span" sx={{ color: C.accent }}>{tx('titleAccent')}</Box>
          </Typography>

          <Typography sx={{
            mt: 1.5,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            color: C.textMid, maxWidth: 540, mx: 'auto',
            lineHeight: 1.75, fontWeight: 400,
          }}>
            {tx('subtitle')}
          </Typography>
        </Box>

        {/* Two-column layout */}
        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 5, lg: 8 },
            alignItems: 'start',
          }}
        >

          {/* ── Left: reasons list ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {REASONS.map((r, i) => {
              const title = r.title[l] ?? r.title.es
              const desc  = r.desc[l]  ?? r.desc.es
              const isLast = i === REASONS.length - 1
              return (
                <Box
                  key={i}
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  sx={{
                    display: 'flex', gap: 2,
                    pb: isLast ? 0 : 2.5,
                    mb: isLast ? 0 : 2.5,
                    borderBottom: isLast ? 'none' : `1px solid ${C.border}`,
                  }}
                >
                  {/* Left column: number + line */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <Box sx={{
                      width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
                      bgcolor: alpha(r.color, 0.10),
                      color: r.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${alpha(r.color, 0.2)}`,
                    }}>
                      {r.icon}
                    </Box>
                    {!isLast && (
                      <Box sx={{
                        width: 1, flex: 1, minHeight: 16, mt: 0.75,
                        bgcolor: C.border,
                      }}/>
                    )}
                  </Box>

                  {/* Content */}
                  <Box sx={{ pt: 0.5, pb: 0.5 }}>
                    <Typography sx={{
                      fontWeight: 700, fontSize: '0.92rem',
                      color: C.text, mb: 0.5, lineHeight: 1.3,
                    }}>
                      {title}
                    </Typography>
                    <Typography sx={{
                      fontSize: '0.8rem', color: C.textMid,
                      lineHeight: 1.65, fontWeight: 400,
                    }}>
                      {desc}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>

          {/* ── Right: chart + bars ── */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            sx={{
              bgcolor: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: '20px',
              p: { xs: 2.5, md: 3 },
              position: 'sticky',
              top: 100,
            }}
          >
            {/* Chart header */}
            <Typography sx={{
              fontWeight: 700, fontSize: '0.95rem',
              color: C.text, mb: 0.5,
            }}>
              {tx('chartTitle')}
            </Typography>
            <Typography sx={{
              fontSize: '0.78rem', color: C.textMute,
              mb: 2.5, lineHeight: 1.5,
            }}>
              {tx('chartSub')}
            </Typography>

            {/* Recharts bar chart */}
            {isClient && (
              <Box sx={{ mb: 3 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
                    barSize={14}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
                    <XAxis
                      type="number" domain={[0, 40]}
                      tickFormatter={v => `${v}%`}
                      tick={{ fontSize: 11, fill: C.textMute }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      type="category" dataKey="label" width={110}
                      tick={{ fontSize: 11, fill: C.textMid, fontWeight: 500 }}
                      axisLine={false} tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip/>} cursor={{ fill: alpha(C.accent, 0.04) }}/>
                    <Bar dataKey="pct" radius={[0, 6, 6, 0]}>
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.color}/>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}

            {/* Manual bars (animated, visible before recharts loads) */}
            {!isClient && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, mb: 3 }}>
                {chartData.map((d) => (
                  <Box key={d.label}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: C.textMid }}>{d.label}</Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: d.color, fontWeight: 700 }}>{d.pct}%</Typography>
                    </Box>
                    <AnimatedBar pct={d.pct * 2.5} color={d.color} inView={isInView}/>
                  </Box>
                ))}
              </Box>
            )}

            {/* Divider */}
            <Box sx={{ borderTop: `1px solid ${C.border}`, pt: 2.5, mt: 0.5 }}>
              <Typography sx={{
                fontSize: '0.7rem', fontWeight: 700, color: C.textMute,
                letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.5,
              }}>
                {l === 'fr' ? 'Technologies clés' : l === 'en' ? 'Key technologies' : 'Tecnologías clave'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {[
                  { name: 'LangGraph', color: '#7C3AED' },
                  { name: 'pgvector',  color: '#2563EB' },
                  { name: 'Next.js 15',color: '#000000' },
                  { name: 'Terraform', color: '#6366F1' },
                  { name: 'Kubernetes',color: '#3B82F6' },
                  { name: 'Ollama',    color: '#10B981' },
                  { name: 'FastAPI',   color: '#059669' },
                  { name: 'n8n',       color: '#F59E0B' },
                  { name: 'Flutter',   color: '#0284C7' },
                  { name: 'Grafana',   color: '#EF4444' },
                ].map((tech) => (
                  <Box
                    key={tech.name}
                    sx={{
                      px: 1, py: 0.35,
                      bgcolor: alpha(tech.color, 0.07),
                      border: `1px solid ${alpha(tech.color, 0.2)}`,
                      borderRadius: '6px',
                      display: 'flex', alignItems: 'center', gap: 0.5,
                    }}
                  >
                    <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: tech.color, flexShrink: 0 }}/>
                    <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: tech.color, letterSpacing: '0.02em' }}>
                      {tech.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}