// File: frontend-datheon/components/landing/Testimonials.tsx
'use client'

import { Box, Typography, Button, Container, Avatar, alpha } from '@mui/material'
import { FiStar, FiCalendar, FiArrowRight, FiMessageSquare } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import ReactGA from 'react-ga4'

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
  gold:       '#F59E0B',
} as const

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

// ─── Data ────────────────────────────────────────────────────
interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  quote: string
  rating: number
  tag: string
  service: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1, name: 'María López', role: 'CEO', company: 'Acme Corp',
    avatar: 'https://images.pexels.com/photos/7077367/pexels-photo-7077367.jpeg',
    quote: 'Trabajar con Datheón transformó completamente nuestra productividad. Su enfoque ágil nos permitió lanzar al mercado en la mitad del tiempo estimado.',
    rating: 5, tag: 'SaaS Development', service: 'Web App',
  },
  {
    id: 2, name: 'John Doe', role: 'CTO', company: 'Tech Innovators',
    avatar: 'https://images.pexels.com/photos/7562076/pexels-photo-7562076.jpeg',
    quote: 'La calidad del desarrollo es sobresaliente. Integraron nuestras APIs legacy sin fricciones y la solución de IA superó todas nuestras expectativas técnicas.',
    rating: 5, tag: 'AI Integration', service: 'AI SaaS',
  },
  {
    id: 3, name: 'Raj Patel', role: 'Director de TI', company: 'Global Bank',
    avatar: 'https://images.pexels.com/photos/25851303/pexels-photo-25851303.jpeg',
    quote: 'Implementaron un sistema de ciberseguridad que redujo nuestros incidentes en un 90%. Cumplen todos los estándares regulatorios financieros.',
    rating: 5, tag: 'Cybersecurity', service: 'Cloud & DevOps',
  },
  {
    id: 4, name: 'Sophie Zhang', role: 'VP Marketing', company: 'EcoGoods',
    avatar: 'https://images.pexels.com/photos/15547481/pexels-photo-15547481.jpeg',
    quote: 'Su plataforma de análisis con IA aumentó nuestra tasa de conversión en un 35%. Los dashboards personalizados son increíblemente intuitivos.',
    rating: 5, tag: 'Analytics', service: 'Data & AI',
  },
  {
    id: 5, name: 'Carlos Mendoza', role: 'COO', company: 'LogiChain',
    avatar: 'https://images.pexels.com/photos/14564834/pexels-photo-14564834.jpeg',
    quote: 'Automatizaron el 70% de nuestra cadena de suministro con IoT. La solución de tracking en tiempo real superó ampliamente el ROI esperado.',
    rating: 5, tag: 'IoT & Automation', service: 'IoT SaaS',
  },
  {
    id: 6, name: 'Thomas Wright', role: 'Fundador', company: 'EduTech Labs',
    avatar: 'https://i.pravatar.cc/150?img=33',
    quote: 'Desarrollaron una plataforma de aprendizaje adaptativo que escaló a 500k usuarios sin problemas. La arquitectura serverless fue la clave del éxito.',
    rating: 4, tag: 'Scalability', service: 'SaaS Platform',
  },
]

// ─── Stars ───────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.35 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={13}
          fill={i < rating ? C.gold : 'none'}
          stroke={i < rating ? C.gold : C.border}
          strokeWidth={2}
        />
      ))}
    </Box>
  )
}

// ─── Testimonial Card ────────────────────────────────────────
function TestimonialCard({ t, index, isInView }: { t: Testimonial; index: number; isInView: boolean }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        bgcolor: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: '20px',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          borderColor: C.accentLine,
          boxShadow: `0 12px 36px ${alpha(C.accent, 0.10)}`,
          transform: 'translateY(-4px)',
          '& .quote-icon': { color: C.accent },
        },
      }}
    >
      {/* Service tag */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{
          px: 1.25, py: 0.4,
          bgcolor: C.accentBg,
          border: `1px solid ${C.accentLine}`,
          borderRadius: '100px',
        }}>
          <Typography sx={{
            fontSize: '0.68rem', fontWeight: 700,
            color: C.accent, letterSpacing: '0.04em',
          }}>
            {t.service}
          </Typography>
        </Box>
        <Stars rating={t.rating}/>
      </Box>

      {/* Quote */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <FiMessageSquare
          className="quote-icon"
          size={20}
          style={{
            position: 'absolute', top: -2, left: -2,
            color: C.border,
            transition: 'color 0.2s ease',
          }}
        />
        <Typography sx={{
          fontSize: '0.875rem',
          color: C.textMid,
          lineHeight: 1.75,
          fontStyle: 'italic',
          pl: 3.5,
        }}>
          {t.quote}
        </Typography>
      </Box>

      {/* Author */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        pt: 2, borderTop: `1px solid ${C.border}`,
      }}>
        <Avatar
          src={t.avatar}
          alt={t.name}
          sx={{
            width: 40, height: 40,
            border: `2px solid ${C.accentLine}`,
          }}
        />
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: C.text, lineHeight: 1.2 }}>
            {t.name}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: C.textMute }}>
            {t.role} · {t.company}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

 const uiText = {
    sectionLabel: { es: 'Testimonios',         en: 'Testimonials',       fr: 'Témoignages'          },
    title:        { es: 'Lo que dicen nuestros clientes', en: 'What our clients say', fr: 'Ce que disent nos clients' },
    titleAccent:  { es: 'sobre trabajar con nosotros.', en: 'about working with us.', fr: 'sur le fait de travailler avec nous.' },
    subtitle: {
      es: 'Resultados reales de empresas que confiaron en nuestro equipo para llevar su tecnología al siguiente nivel.',
      en: 'Real results from companies that trusted our team to take their technology to the next level.',
      fr: "Résultats réels d'entreprises qui ont fait confiance à notre équipe pour emmener leur technologie au niveau supérieur.",
    },
    cta:     { es: 'Iniciar mi proyecto', en: 'Start my project', fr: 'Démarrer mon projet' },
    loading: { es: 'Cargando…',           en: 'Loading…',         fr: 'Chargement…'         },
    popup: {
      es: 'Permite ventanas emergentes para acceder a Calendly.',
      en: 'Please allow popups to access Calendly.',
      fr: 'Veuillez autoriser les fenêtres pop-up pour accéder à Calendly.',
    },
  } as const

// ─── Main ────────────────────────────────────────────────────
export default function Testimonials({ lang }: Props) {
  const l = lang as Lang
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [loading, setLoading] = useState(false)

 
 const tx = useCallback(
  (k: keyof typeof uiText) =>
    uiText[k][l] ?? uiText[k]['es'],
  [l]
)

 const handleCTA = useCallback(() => {
  if (loading) return
  setLoading(true)

  try {
    if (typeof window !== 'undefined') {
      const payload = {
        canal: 'LandingPage',
        ubicacion: 'TestimonialsSection',
        idioma: navigator.language || 'es',
        timestamp: new Date().toISOString(),
        evento_unico_id:
          crypto.randomUUID?.() ?? Math.random().toString(36),
      }

      if (window.fbq) window.fbq('trackCustom', 'TestimonialsCTA', payload)

      if (typeof ReactGA !== 'undefined') {
        ReactGA.event({
          category: 'Testimonials',
          action: 'click_cta',
          value: 1,
        })
      }

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'TestimonialsCTA', ...payload })

      const w = 800, h = 700

      const win = window.open(
        'https://calendly.com/team_datheon/consulta-gratuita',
        'Calendly',
        `width=${w},height=${h},left=${
          window.screenX + (window.innerWidth - w) / 2
        },top=${window.screenY + (window.innerHeight - h) / 2}`
      )

      if (win) win.focus()
      else alert(tx('popup'))
    }
  } finally {
    setTimeout(() => setLoading(false), 1500)
  }
}, [loading, tx])

  // Aggregate stats
  const avgRating = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1)

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: C.bgAlt }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}
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
            mt: 1.5, fontSize: { xs: '0.95rem', md: '1.05rem' },
            color: C.textMid, maxWidth: 560, mx: 'auto',
            lineHeight: 1.75, fontWeight: 400,
          }}>
            {tx('subtitle')}
          </Typography>

          {/* Aggregate rating bar */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 2,
              mt: 3, px: 3, py: 1.25,
              bgcolor: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: '14px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} size={16} fill={C.gold} stroke={C.gold} strokeWidth={1.5}/>
              ))}
            </Box>
            <Box sx={{ width: 1, height: 24, bgcolor: C.border }}/>
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: C.text, lineHeight: 1 }}>
                {avgRating} / 5.0
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: C.textMute }}>
                {TESTIMONIALS.length} {l === 'fr' ? 'avis vérifiés' : l === 'en' ? 'verified reviews' : 'reseñas verificadas'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Grid */}
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
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} isInView={isInView}/>
          ))}
        </Box>

        {/* CTA */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          sx={{ textAlign: 'center', mt: { xs: 5, md: 7 } }}
        >
          <Button
            variant="contained"
            size="large"
            disabled={loading}
            onClick={handleCTA}
            startIcon={!loading ? <FiCalendar size={16}/> : undefined}
            endIcon={!loading ? <FiArrowRight size={16}/> : undefined}
            component={motion.button}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              bgcolor: C.accent, color: '#fff',
              fontWeight: 700, fontSize: '0.95rem',
              px: 4, py: 1.5, borderRadius: '12px',
              textTransform: 'none',
              boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
              '&:hover': {
                bgcolor: C.accentDk,
                boxShadow: `0 8px 28px ${alpha(C.accent, 0.45)}`,
              },
              '&.Mui-disabled': { bgcolor: alpha(C.accent, 0.4), color: '#fff' },
            }}
          >
            {loading ? tx('loading') : tx('cta')}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}