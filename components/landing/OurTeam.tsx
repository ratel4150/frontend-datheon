// File: frontend-datheon/components/landing/OurTeam.tsx
'use client'

import { Box, Typography, Button, Container, Avatar, alpha } from '@mui/material'
import { FiLinkedin, FiGithub, FiCalendar, FiArrowRight, FiUsers } from 'react-icons/fi'
import { SiPython, SiNextdotjs, SiDocker, SiPostgresql, SiNodedotjs,  SiGo } from 'react-icons/si'
import { motion, useInView } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
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
} as const

type Lang = 'es' | 'en' | 'fr'
type Props = { lang: string }

// ─── Team data ───────────────────────────────────────────────
interface Member {
  name: string
  role: string
  bio: { es: string; en: string; fr: string }
  avatar: string
  skills: { icon: React.ReactNode; name: string }[]
  linkedin?: string
  github?: string
  color: string
}

const TEAM: Member[] = [
  {
    name: 'Angel Clavellina',
    role: 'Sr. Data Analyst & AI',
    color: '#7C3AED',
    bio: {
      es: 'Especialista en pipelines de datos, modelos predictivos y dashboards de analítica en tiempo real.',
      en: 'Specialist in data pipelines, predictive models and real-time analytics dashboards.',
      fr: 'Spécialiste en pipelines de données, modèles prédictifs et tableaux de bord analytiques.',
    },
    avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHd9kB8Ua8LYQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731383645850?e=1756339200&v=beta&t=D4LkNwSC5f-XYYOVJETmufF0Wg2xefwO_3oRdEecv_A',
    skills: [
      { icon: <SiPython size={13}/>, name: 'Python' },
      { icon: <SiPostgresql size={13}/>, name: 'PostgreSQL' },
      { icon: <SiDocker size={13}/>, name: 'Docker' },
    ],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Arturo Chavez',
    role: 'Sr. Full Stack Developer',
    color: '#059669',
    bio: {
      es: 'Arquitecto de software con experiencia en SaaS, APIs REST/GraphQL e infraestructura cloud escalable.',
      en: 'Software architect experienced in SaaS, REST/GraphQL APIs and scalable cloud infrastructure.',
      fr: 'Architecte logiciel expérimenté en SaaS, APIs REST/GraphQL et infrastructure cloud évolutive.',
    },
    avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHo5dvV_WeVDQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704060418269?e=1756339200&v=beta&t=RfzPI_QdFeMT2U7acC1B5cfktdybnI7buc0Eii-TrAg',
    skills: [
      { icon: <SiNextdotjs size={13}/>, name: 'Next.js' },
      { icon: <SiNodedotjs size={13}/>, name: 'Node.js' },
      { icon: <SiGo size={13}/>, name: 'Go' },
    ],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
]

// ─── Member Card ─────────────────────────────────────────────
function MemberCard({ member, index, isInView, lang }: {
  member: Member; index: number; isInView: boolean; lang: Lang
}) {
  const [hovered, setHovered] = useState(false)
  const bio = member.bio[lang] ?? member.bio.es

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        bgcolor: C.bg,
        border: `1px solid ${hovered ? alpha(member.color, 0.35) : C.border}`,
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 16px 40px ${alpha(member.color, 0.12)}, 0 2px 8px rgba(0,0,0,0.05)`
          : '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Color bar */}
      <Box sx={{
        height: 3,
        background: member.color,
        opacity: hovered ? 1 : 0.5,
        transition: 'opacity 0.25s ease',
      }}/>

      {/* Avatar section */}
      <Box sx={{
        position: 'relative',
        bgcolor: alpha(member.color, 0.04),
        py: 3.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        borderBottom: `1px solid ${C.border}`,
      }}>
        {/* Avatar with ring */}
        <Box sx={{ position: 'relative' }}>
          <Box sx={{
            position: 'absolute', inset: -3,
            borderRadius: '50%',
            border: `2px solid ${hovered ? member.color : 'transparent'}`,
            transition: 'border-color 0.25s ease',
          }}/>
          <Avatar
            src={member.avatar}
            alt={member.name}
            imgProps={{ loading: 'lazy' }}
            sx={{
              width: 88, height: 88,
              border: `3px solid ${C.bg}`,
              boxShadow: `0 4px 16px ${alpha(member.color, 0.25)}`,
            }}
          >
            {member.name.charAt(0)}
          </Avatar>
        </Box>

        {/* Name + Role */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{
            fontWeight: 700, fontSize: '1.05rem',
            color: C.text, lineHeight: 1.2, mb: 0.4,
          }}>
            {member.name}
          </Typography>
          <Typography sx={{
            fontSize: '0.78rem', fontWeight: 600,
            color: member.color, letterSpacing: '0.02em',
          }}>
            {member.role}
          </Typography>
        </Box>

        {/* Social links */}
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {member.linkedin && (
            <Box
              component="a"
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: 32, height: 32,
                borderRadius: '8px',
                border: `1px solid ${C.border}`,
                bgcolor: C.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: C.textMute,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#0A66C2',
                  color: '#0A66C2',
                  bgcolor: alpha('#0A66C2', 0.06),
                },
              }}
            >
              <FiLinkedin size={14}/>
            </Box>
          )}
          {member.github && (
            <Box
              component="a"
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: 32, height: 32,
                borderRadius: '8px',
                border: `1px solid ${C.border}`,
                bgcolor: C.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: C.textMute,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: C.text,
                  color: C.text,
                  bgcolor: alpha(C.text, 0.06),
                },
              }}
            >
              <FiGithub size={14}/>
            </Box>
          )}
        </Box>
      </Box>

      {/* Info section */}
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Bio */}
        <Typography sx={{
          fontSize: '0.82rem', color: C.textMid,
          lineHeight: 1.65, fontWeight: 400,
        }}>
          {bio}
        </Typography>

        {/* Skills */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {member.skills.map((skill) => (
            <Box
              key={skill.name}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.5,
                px: 1, py: 0.4,
                bgcolor: alpha(member.color, 0.07),
                border: `1px solid ${alpha(member.color, 0.18)}`,
                borderRadius: '6px',
                color: member.color,
              }}
            >
              {skill.icon}
              <Typography sx={{
                fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.03em',
              }}>
                {skill.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

  const uiText = {
    sectionLabel: { es: 'El equipo',         en: 'The team',         fr: "L'équipe"          },
    title:        { es: 'Especialistas,',     en: 'Specialists,',     fr: 'Spécialistes,'     },
    titleAccent:  { es: 'no generalistas.',   en: 'not generalists.', fr: 'pas généralistes.' },
    subtitle: {
      es: 'Un equipo pequeño y senior que combina tecnología, creatividad y visión estratégica. Conoces a quien trabaja en tu proyecto.',
      en: 'A small, senior team combining technology, creativity and strategic vision. You know who works on your project.',
      fr: "Une petite équipe senior combinant technologie, créativité et vision stratégique. Vous connaissez qui travaille sur votre projet.",
    },
    cta:     { es: 'Trabajar con nosotros', en: 'Work with us',    fr: 'Travailler avec nous' },
    loading: { es: 'Cargando…',             en: 'Loading…',        fr: 'Chargement…'          },
    popup: {
      es: 'Permite ventanas emergentes para acceder a Calendly.',
      en: 'Please allow popups to access Calendly.',
      fr: 'Veuillez autoriser les fenêtres pop-up pour accéder à Calendly.',
    },
    hiring: {
      es: '¿Eres developer o data scientist? Siempre buscamos talento.',
      en: 'Are you a developer or data scientist? We are always looking for talent.',
      fr: 'Êtes-vous développeur ou data scientist ? Nous cherchons toujours des talents.',
    },
  }

// ─── Main ────────────────────────────────────────────────────
export default function OurTeam({ lang }: Props) {
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
        ubicacion: 'OurTeamSection',
        idioma: navigator.language || 'es',
        timestamp: new Date().toISOString(),
        evento_unico_id:
          crypto.randomUUID?.() ?? Math.random().toString(36),
      }

      if (window.fbq) {
        window.fbq('trackCustom', 'TeamCTA', payload)
      }

      if (typeof ReactGA !== 'undefined') {
        ReactGA.event({
          category: 'Team',
          action: 'click_cta',
          value: 1,
        })
      }

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'TeamCTA',
        ...payload,
      })

      const w = 800, h = 700

      const win = window.open(
        'https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica',
        'Calendly',
        `width=${w},height=${h},left=${
          window.screenX + (window.innerWidth - w) / 2
        },top=${window.screenY + (window.innerHeight - h) / 2}`
      )

      if (win) win.focus()
      else alert(tx('popup'))
    }
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(() => setLoading(false), 1500)
  }
}, [loading, tx])

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: C.bg }}>
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
            mt: 1.5,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            color: C.textMid, maxWidth: 520, mx: 'auto',
            lineHeight: 1.75, fontWeight: 400,
          }}>
            {tx('subtitle')}
          </Typography>
        </Box>

        {/* Cards — centradas cuando hay pocos miembros */}
        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 360px))',
            },
            gap: { xs: 2.5, md: 3 },
            justifyContent: 'center',
            mb: { xs: 5, md: 6 },
          }}
        >
          {TEAM.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              index={i}
              isInView={isInView}
              lang={l}
            />
          ))}
        </Box>

        {/* Hiring nudge */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 1.5, mb: { xs: 4, md: 5 },
          }}
        >
          <Box sx={{ height: 1, flex: 1, maxWidth: 160, bgcolor: C.border }}/>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <FiUsers size={13} color={C.textMute}/>
            <Typography sx={{ fontSize: '0.8rem', color: C.textMute }}>
              {tx('hiring')}
            </Typography>
          </Box>
          <Box sx={{ height: 1, flex: 1, maxWidth: 160, bgcolor: C.border }}/>
        </Box>

        {/* CTA */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          sx={{ textAlign: 'center' }}
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