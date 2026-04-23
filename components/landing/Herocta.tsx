// File: frontend-datheon/components/landing/Herocta.tsx
'use client'

import {
  Box, Button, Drawer, IconButton, Typography, alpha,
} from '@mui/material'
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion'
import { FiCalendar, FiArrowRight, FiMessageCircle, FiX } from 'react-icons/fi'
import { useState, useCallback } from 'react'

// ─── Tokens ──────────────────────────────────────────────────
const C = {
  bg:         '#FFFFFF',
  border:     '#ebebeb',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.22)',
} as const

// ─── Types ───────────────────────────────────────────────────
const QUALIFY_OPTS = {
  es: [
    { key: 'ai',    label: 'AI / Agentes',   icon: '🤖', desc: 'Automatización, RAG, LLMs'  },
    { key: 'saas',  label: 'Web / SaaS',     icon: '🌐', desc: 'Apps, e-commerce, portales' },
    { key: 'iot',   label: 'IoT / Hardware', icon: '📡', desc: 'Sensores, MQTT, plataformas' },
    { key: 'cloud', label: 'Cloud / DevOps', icon: '☁️', desc: 'AWS, Kubernetes, CI/CD'      },
  ],
  en: [
    { key: 'ai',    label: 'AI / Agents',    icon: '🤖', desc: 'Automation, RAG, LLMs'      },
    { key: 'saas',  label: 'Web / SaaS',     icon: '🌐', desc: 'Apps, e-commerce, portals'  },
    { key: 'iot',   label: 'IoT / Hardware', icon: '📡', desc: 'Sensors, MQTT, platforms'   },
    { key: 'cloud', label: 'Cloud / DevOps', icon: '☁️', desc: 'AWS, Kubernetes, CI/CD'      },
  ],
  fr: [
    { key: 'ai',    label: 'IA / Agents',    icon: '🤖', desc: 'Automatisation, RAG, LLMs'  },
    { key: 'saas',  label: 'Web / SaaS',     icon: '🌐', desc: 'Apps, e-commerce, portails' },
    { key: 'iot',   label: 'IoT / Matériel', icon: '📡', desc: 'Capteurs, MQTT, plateformes' },
    { key: 'cloud', label: 'Cloud / DevOps', icon: '☁️', desc: 'AWS, Kubernetes, CI/CD'      },
  ],
}

const CALENDLY_URL = 'https://calendly.com/team_datheon/consulta-gratuita'

const ui = {
  qualify:      { es: '¿Qué necesitas?',                en: 'What do you need?',              fr: 'Que vous faut-il ?'              },
  qualifySub:   { es: 'Elige el área de tu proyecto',   en: 'Select your project area',       fr: 'Choisissez votre domaine'        },
  calendlyStep: { es: 'Elige tu horario',               en: 'Pick your time slot',            fr: 'Choisissez votre créneau'        },
  back:         { es: '← Cambiar tipo',                 en: '← Change type',                 fr: '← Changer le type'               },
  chat:         { es: 'Hablar con asistente',           en: 'Talk to assistant',              fr: "Parler à l'assistant"            },
  social:       { es: '5 empresas agendaron esta semana', en: '5 companies scheduled this week', fr: '5 entreprises ont planifié cette semaine' },
  cta:          { es: 'Solicitar consulta gratuita',    en: 'Request a free consultation',   fr: 'Demander une consultation'       },
  ctaSub:       { es: 'Ver servicios',                  en: 'View services',                 fr: 'Voir les services'               },
}

const tx = (k: keyof typeof ui, l: string): string =>
  (ui[k] as Record<string, string>)[l] ?? (ui[k] as Record<string, string>)['es']

// ─── Animation config ────────────────────────────────────────
const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

const itemTransition: Transition = { duration: 0.65, ease: easing }

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: itemTransition },
}

const stepTransition: Transition = { duration: 0.22 }

// ─── Component ───────────────────────────────────────────────
export function HeroCTABlock({ lang, onCTA }: { lang: string; onCTA?: () => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [step, setStep]             = useState<0 | 1>(0)
  const [selected, setSelected]     = useState('')

  const opts = QUALIFY_OPTS[lang as keyof typeof QUALIFY_OPTS] ?? QUALIFY_OPTS.es

  const handleSelect = useCallback((key: string) => {
    setSelected(key)
    setStep(1)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'qualifySelect', projectType: key, lang })
    }
  }, [lang])

  const handleOpen = useCallback(() => {
    setStep(0)
    setSelected('')
    setDrawerOpen(true)
    onCTA?.()
  }, [onCTA])

  return (
    <>
      {/* ── CTA buttons row ── */}
      <motion.div
        variants={item}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '12px',
        }}
      >
        {/* Primary */}
        <Button
          variant="contained"
          size="large"
          startIcon={<FiCalendar size={16}/>}
          onClick={handleOpen}
          sx={{
            bgcolor: C.accent, color: '#fff',
            fontWeight: 700, fontSize: '0.95rem',
            px: 3.5, py: 1.4, borderRadius: '12px',
            textTransform: 'none',
            boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
            transition: 'all 0.2s ease',
            '&:hover': { bgcolor: C.accentDk, boxShadow: `0 8px 28px ${alpha(C.accent, 0.45)}` },
          }}
        >
          {tx('cta', lang)}
        </Button>

        {/* Secondary */}
        <Button
          variant="outlined"
          size="large"
          endIcon={<FiArrowRight size={15}/>}
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          sx={{
            color: C.textMid, borderColor: C.border,
            fontWeight: 600, fontSize: '0.9rem',
            px: 3, py: 1.4, borderRadius: '12px',
            textTransform: 'none',
            '&:hover': { borderColor: C.accentLine, bgcolor: C.accentBg, color: C.accent },
          }}
        >
          {tx('ctaSub', lang)}
        </Button>

        {/* Tertiary */}
        <Button
          variant="text"
          size="small"
          startIcon={<FiMessageCircle size={14}/>}
          href={`/${lang}/contact`}
          sx={{
            color: C.textMute, fontWeight: 500, fontSize: '0.8rem',
            textTransform: 'none', px: 1.5,
            '&:hover': { color: C.accent, bgcolor: 'transparent' },
          }}
        >
          {tx('chat', lang)}
        </Button>
      </motion.div>

      {/* ── Social proof ── */}
      <motion.div
        variants={item}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '24px',
        }}
      >
        <Box sx={{
          width: 7, height: 7, borderRadius: '50%', bgcolor: '#22C55E',
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.35 } },
        }}/>
        <Typography sx={{ fontSize: '0.75rem', color: C.textMute }}>
          {tx('social', lang)}
        </Typography>
      </motion.div>

      {/* ── Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100vw', sm: 520 },
            bgcolor: C.bg,
            borderLeft: `1px solid ${C.border}`,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        ModalProps={{ disableScrollLock: true }}
      >
        {/* Header */}
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 3, py: 2.5, borderBottom: `1px solid ${C.border}`, flexShrink: 0,
        }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: C.text, lineHeight: 1.2 }}>
              {step === 0 ? tx('qualify', lang) : tx('calendlyStep', lang)}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: C.textMute, mt: 0.25 }}>
              {step === 0
                ? tx('qualifySub', lang)
                : opts.find(o => o.key === selected)?.label}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              border: `1px solid ${C.border}`, borderRadius: '9px',
              width: 34, height: 34, color: C.textMute,
              '&:hover': { bgcolor: C.accentBg, color: C.accent, borderColor: C.accentLine },
            }}
          >
            <FiX size={16}/>
          </IconButton>
        </Box>

        {/* Step indicator */}
        <Box sx={{ px: 3, py: 1.5, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[0, 1].map(s => (
              <Box key={s} sx={{
                flex: 1, height: 3, borderRadius: 2,
                bgcolor: s <= step ? C.accent : C.border,
                transition: 'background 0.3s ease',
              }}/>
            ))}
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait">

            {/* Step 0 */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={stepTransition}
                style={{
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                {opts.map(opt => (
                  <motion.div
                    key={opt.key}
                    onClick={() => handleSelect(opt.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '18px',
                      border: `1px solid ${C.border}`,
                      borderRadius: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography sx={{ fontSize: '1.5rem', mb: 0.75, lineHeight: 1 }}>
                      {opt.icon}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: C.text, mb: 0.3 }}>
                      {opt.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: C.textMute, lineHeight: 1.4 }}>
                      {opt.desc}
                    </Typography>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={stepTransition}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Box sx={{ px: 3, py: 1.25, flexShrink: 0 }}>
                  <Typography
                    onClick={() => setStep(0)}
                    sx={{
                      fontSize: '0.78rem', color: C.accent,
                      cursor: 'pointer', fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {tx('back', lang)}
                  </Typography>
                </Box>

                <Box
                  component="iframe"
                  src={`${CALENDLY_URL}?embed_type=Inline&hide_gdpr_banner=1`}
                  sx={{ flex: 1, border: 'none', width: '100%', minHeight: 0 }}
                  title="Calendly"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Drawer>
    </>
  )
}