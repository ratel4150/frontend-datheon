'use client'

import { Box, Typography, Button, Container, alpha } from '@mui/material'
import {
  FiClipboard, FiPenTool, FiCode, FiCheckCircle,
  FiSend, FiRefreshCw, FiArrowRight, FiCalendar,
} from 'react-icons/fi'
import ReactGA from 'react-ga4'
import { useCallback, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Tokens ─────────────────────────────────────────────────
const C = {
  bg:         '#F7FBFF',
  cardBg:     '#FFFFFF',
  border:     '#ebebeb',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.22)',
  bgGrid:     'rgba(0,174,239,0.035)',
} as const

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

interface Step {
  num: string
  icon: React.ReactNode
  title: string
  lines: string[]
  output?: string
}

// ─── Data ────────────────────────────────────────────────────
const stepsData: Record<Lang, Step[]> = {
  es: [
    {
      num: '01', icon: <FiClipboard size={18}/>,
      title: 'Descubrimiento y Alcance',
      lines: [
        'Entrevistas para entender necesidades y procesos reales.',
        'Documentación de requisitos, casos de uso y restricciones.',
        'Propuesta técnica y económica con cronograma detallado.',
      ],
      output: 'Acta de constitución del proyecto',
    },
    {
      num: '02', icon: <FiPenTool size={18}/>,
      title: 'Diseño y Planificación',
      lines: [
        'Prototipos UI/UX en Figma con feedback iterativo.',
        'Arquitectura técnica, diagramas y selección de tecnologías.',
        'Plan ágil por sprints o cascada según el tipo de proyecto.',
      ],
      output: 'Documento de diseño aprobado',
    },
    {
      num: '03', icon: <FiCode size={18}/>,
      title: 'Desarrollo Iterativo',
      lines: [
        'Sprints quincenales con revisión semanal contigo.',
        'Stand-ups diarios, Git + CI/CD, Jira para seguimiento total.',
        'Código revisado y testeado en cada iteración.',
      ],
      output: 'MVP funcional incremental',
    },
    {
      num: '04', icon: <FiCheckCircle size={18}/>,
      title: 'Validación y QA',
      lines: [
        'Tests automatizados: unitarios, integración y e2e.',
        'Demos cada dos semanas para feedback temprano del cliente.',
        'Reporte de calidad antes de cada release.',
      ],
      output: 'Reporte de calidad y ajustes',
    },
    {
      num: '05', icon: <FiSend size={18}/>,
      title: 'Despliegue Guiado',
      lines: [
        'Release planificado con pilotaje y rollout gradual.',
        'Soporte crítico las primeras 48 horas post-lanzamiento.',
        'Monitoreo en tiempo real con alertas configuradas.',
      ],
      output: 'Manual de usuario y capacitación',
    },
    {
      num: '06', icon: <FiRefreshCw size={18}/>,
      title: 'Mantenimiento Continuo',
      lines: [
        'SLA definido con horas de soporte mensuales garantizadas.',
        'Mejoras basadas en métricas reales de uso y rendimiento.',
        'Actualizaciones de seguridad proactivas incluidas.',
      ],
      output: 'Reportes de optimización mensual',
    },
  ],
  en: [
    {
      num: '01', icon: <FiClipboard size={18}/>,
      title: 'Discovery and Scoping',
      lines: [
        'Interviews to understand real needs and processes.',
        'Requirements documentation, use cases and constraints.',
        'Technical and economic proposal with detailed timeline.',
      ],
      output: 'Project Charter',
    },
    {
      num: '02', icon: <FiPenTool size={18}/>,
      title: 'Design and Planning',
      lines: [
        'UI/UX prototypes in Figma with iterative feedback.',
        'Technical architecture, diagrams and technology selection.',
        'Agile sprint plan or waterfall depending on project type.',
      ],
      output: 'Approved Design Document',
    },
    {
      num: '03', icon: <FiCode size={18}/>,
      title: 'Iterative Development',
      lines: [
        'Bi-weekly sprints with weekly client reviews.',
        'Daily stand-ups, Git + CI/CD, Jira for full tracking.',
        'Code reviewed and tested in every iteration.',
      ],
      output: 'Incremental Functional MVP',
    },
    {
      num: '04', icon: <FiCheckCircle size={18}/>,
      title: 'Validation and QA',
      lines: [
        'Automated tests: unit, integration and e2e.',
        'Biweekly demos for early client feedback.',
        'Quality report before every release.',
      ],
      output: 'Quality Report and Adjustments',
    },
    {
      num: '05', icon: <FiSend size={18}/>,
      title: 'Guided Deployment',
      lines: [
        'Planned release with pilot and gradual rollout.',
        'Critical support during the first 48 hours post-launch.',
        'Real-time monitoring with configured alerts.',
      ],
      output: 'User Manual and Training',
    },
    {
      num: '06', icon: <FiRefreshCw size={18}/>,
      title: 'Ongoing Maintenance',
      lines: [
        'Defined SLA with guaranteed monthly support hours.',
        'Improvements based on real usage and performance metrics.',
        'Proactive security updates included.',
      ],
      output: 'Monthly Optimization Reports',
    },
  ],
  fr: [
    {
      num: '01', icon: <FiClipboard size={18}/>,
      title: 'Découverte et Cadrage',
      lines: [
        "Entretiens pour comprendre les besoins et processus réels.",
        "Documentation des exigences, cas d'utilisation et contraintes.",
        "Proposition technique et économique avec calendrier détaillé.",
      ],
      output: 'Charte de projet',
    },
    {
      num: '02', icon: <FiPenTool size={18}/>,
      title: 'Conception et Planification',
      lines: [
        'Prototypes UI/UX sur Figma avec feedback itératif.',
        'Architecture technique, diagrammes et sélection technologique.',
        'Plan agile par sprints ou cascade selon le type de projet.',
      ],
      output: 'Document de conception approuvé',
    },
    {
      num: '03', icon: <FiCode size={18}/>,
      title: 'Développement Itératif',
      lines: [
        'Sprints bimensuels avec revues client hebdomadaires.',
        'Stand-ups quotidiens, Git + CI/CD, Jira pour suivi complet.',
        'Code révisé et testé à chaque itération.',
      ],
      output: 'MVP fonctionnel incrémental',
    },
    {
      num: '04', icon: <FiCheckCircle size={18}/>,
      title: "Validation et Assurance Qualité",
      lines: [
        "Tests automatisés : unitaires, intégration et e2e.",
        "Démos bimensuelles pour feedback client anticipé.",
        "Rapport qualité avant chaque release.",
      ],
      output: 'Rapport qualité et ajustements',
    },
    {
      num: '05', icon: <FiSend size={18}/>,
      title: 'Déploiement Guidé',
      lines: [
        'Lancement planifié avec pilote et déploiement progressif.',
        'Support critique durant les 48 premières heures post-lancement.',
        'Monitoring en temps réel avec alertes configurées.',
      ],
      output: 'Manuel utilisateur et formation',
    },
    {
      num: '06', icon: <FiRefreshCw size={18}/>,
      title: 'Maintenance Continue',
      lines: [
        "SLA défini avec heures de support mensuel garanties.",
        "Améliorations basées sur les métriques réelles d'utilisation.",
        "Mises à jour de sécurité proactives incluses.",
      ],
      output: "Rapports d'optimisation mensuels",
    },
  ],
}

const uiText = {
  sectionLabel: { es: 'Proceso de trabajo', en: 'Work process',       fr: 'Processus de travail' },
  title:        { es: 'De la idea a producción,', en: 'From idea to production,', fr: "De l'idée à la production," },
  titleAccent:  { es: 'paso a paso.',              en: 'step by step.',             fr: 'étape par étape.'          },
  subtitle: {
    es: 'Un proceso claro, transparente y orientado a resultados. Sabes en todo momento qué está pasando y por qué.',
    en: 'A clear, transparent, results-driven process. You always know what is happening and why.',
    fr: "Un processus clair, transparent et orienté résultats. Vous savez à tout moment ce qui se passe et pourquoi.",
  },
  output:  { es: 'Entregable',    en: 'Deliverable',    fr: 'Livrable'         },
  cta:     { es: 'Iniciar mi proyecto', en: 'Start my project', fr: 'Démarrer mon projet' },
  loading: { es: 'Cargando…',     en: 'Loading…',       fr: 'Chargement…'      },
  popup:   {
    es: 'Permite ventanas emergentes para acceder a Calendly.',
    en: 'Please allow popups to access Calendly.',
    fr: 'Veuillez autoriser les fenêtres pop-up pour accéder à Calendly.',
  },
}
const tx = (k: keyof typeof uiText, l: string): string =>
  (uiText[k] as Record<string, string>)[l] ?? (uiText[k] as Record<string, string>)['es']

// ─── Step Card ────────────────────────────────────────────────
function StepCard({ step, index, isInView, lang, total }: {
  step: Step; index: number; isInView: boolean; lang: string; total: number
}) {
  const isLast = index === total - 1
  const isEven = index % 2 === 0

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Connector line (desktop only, hidden on last) */}
      {!isLast && (
        <Box sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          top: 28,
          left: 'calc(100% - 0px)',
          width: '100%',
          height: 1,
          bgcolor: C.border,
          zIndex: 0,
        }}>
          {/* Animated fill */}
          <Box
            component={motion.div}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
            sx={{
              height: '100%',
              background: `linear-gradient(90deg, ${C.accent}, ${alpha(C.accent, 0.3)})`,
              transformOrigin: 'left',
            }}
          />
        </Box>
      )}

      {/* Card */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          bgcolor: C.cardBg,
          border: `1px solid ${C.border}`,
          borderRadius: '16px',
          p: 2.5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          position: 'relative',
          zIndex: 1,
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
          '&:hover': {
            borderColor: C.accentLine,
            boxShadow: `0 8px 28px ${alpha(C.accent, 0.10)}`,
            transform: 'translateY(-3px)',
            '& .step-icon-box': {
              bgcolor: C.accent,
              color: '#fff',
            },
          },
        }}
      >
        {/* Number + Icon row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            className="step-icon-box"
            sx={{
              width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
              bgcolor: C.accentBg, color: C.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {step.icon}
          </Box>
          <Typography sx={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.65rem', color: C.accent,
            letterSpacing: '0.1em', fontWeight: 500,
          }}>
            {step.num}
          </Typography>
        </Box>

        {/* Title */}
        <Typography sx={{
          fontWeight: 700, fontSize: '0.95rem',
          color: C.text, lineHeight: 1.3,
        }}>
          {step.title}
        </Typography>

        {/* Lines */}
        <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {step.lines.map((line, i) => (
            <Box key={i} component="li" sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <Box sx={{
                mt: '5px', flexShrink: 0,
                width: 5, height: 5, borderRadius: '50%',
                bgcolor: C.accent, opacity: 0.6,
              }}/>
              <Typography sx={{ fontSize: '0.78rem', color: C.textMid, lineHeight: 1.6 }}>
                {line}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Output pill */}
        {step.output && (
          <Box sx={{
            mt: 'auto', pt: 1.5,
            borderTop: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', gap: 0.75,
          }}>
            <Typography sx={{
              fontSize: '0.65rem', fontWeight: 700,
              color: C.textMute, letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {tx('output', lang)}:
            </Typography>
            <Typography sx={{
              fontSize: '0.72rem', fontWeight: 600,
              color: C.accent,
            }}>
              {step.output}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export default function WorkProcess({ lang }: Props) {
  const l = lang in uiText.title ? lang : 'es'
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const steps = stepsData[l as Lang]

  const handleClick = useCallback(() => {
    if (loading) return
    setLoading(true)
    if (typeof window !== 'undefined') {
      const payload = {
        plan: 'Premium', servicio: 'Work Process CTA',
        canal: 'LandingPage', ubicacion: 'WorkProcessSection',
        idioma: navigator.language || 'es',
        referrer: document.referrer || 'direct',
        timestamp: new Date().toISOString(),
        conversion_intent: true,
        evento_unico_id: crypto.randomUUID?.() ?? Math.random().toString(36),
      }
      if (window.fbq) window.fbq('trackCustom', 'WorkProcessCTA', payload)
      if (typeof ReactGA !== 'undefined') {
        ReactGA.event({ category: 'WorkProcess', action: 'click_cta', value: 1 })
        ReactGA.gtag('event', 'work_process_cta', payload)
      }
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'WorkProcessCTA', ...payload })

      const w = 800, h = 700
      const win = window.open(
        'https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica',
        'Calendly',
        `width=${w},height=${h},left=${window.screenX + (window.innerWidth - w) / 2},top=${window.screenY + (window.innerHeight - h) / 2}`
      )
      if (win) win.focus()
      else alert(tx('popup', l))
    }
    setTimeout(() => setLoading(false), 1500)
  }, [loading, l])

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 11 },
        bgcolor: C.bg,
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${C.bgGrid} 1px, transparent 1px),
          linear-gradient(90deg, ${C.bgGrid} 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black, transparent)',
      }}/>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

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
              {tx('sectionLabel', l)}
            </Typography>
          </Box>

          <Typography variant="h2" sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.75rem' },
            color: C.text, lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>
            {tx('title', l)}{' '}
            <Box component="span" sx={{ color: C.accent }}>
              {tx('titleAccent', l)}
            </Box>
          </Typography>

          <Typography sx={{
            mt: 1.5,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            color: C.textMid, maxWidth: 560, mx: 'auto',
            lineHeight: 1.75, fontWeight: 400,
          }}>
            {tx('subtitle', l)}
          </Typography>
        </Box>

        {/* Steps — 3 col desktop, 2 col tablet, 1 col mobile */}
        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: { xs: 2.5, md: 3 },
            alignItems: 'stretch',
          }}
        >
          {steps.map((step, i) => (
            <StepCard
              key={step.num}
              step={step}
              index={i}
              isInView={isInView}
              lang={l}
              total={steps.length}
            />
          ))}
        </Box>

        {/* CTA */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          sx={{ textAlign: 'center', mt: { xs: 5, md: 7 } }}
        >
          <Button
            variant="contained"
            size="large"
            disabled={loading}
            onClick={handleClick}
            startIcon={!loading ? <FiCalendar size={16}/> : undefined}
            endIcon={!loading ? <FiArrowRight size={16}/> : undefined}
            component={motion.button}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              bgcolor: C.accent,
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.95rem',
              px: 4, py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
              '&:hover': {
                bgcolor: C.accentDk,
                boxShadow: `0 8px 28px ${alpha(C.accent, 0.45)}`,
              },
              '&.Mui-disabled': {
                bgcolor: alpha(C.accent, 0.4),
                color: '#fff',
              },
            }}
          >
            {loading ? tx('loading', l) : tx('cta', l)}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}