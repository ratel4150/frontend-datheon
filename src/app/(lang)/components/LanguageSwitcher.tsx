// File: src/app/(lang)/components/LanguageSwitcher.tsx
'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Box, Typography, CircularProgress, alpha,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown, FiCheck, FiGlobe } from 'react-icons/fi'

// ─── Tokens (mismos que AppBarMain) ──────────────────────────
const C = {
  bg:       '#ffffff',
  bgSub:    '#fafbfc',
  border:   '#ebebeb',
  text:     '#0B0F2B',
  textMid:  '#4A5068',
  textMute: '#8891AA',
  accent:   '#00AEEF',
  accentDk: '#0095cc',
  accentBg: 'rgba(0,174,239,0.07)',
  accentLine:'rgba(0,174,239,0.18)',
} as const

// ─── Data ────────────────────────────────────────────────────
const locales = [
  { code: 'es', label: 'Español',  native: 'ES', flag: '🇲🇽', country: 'México'   },
  { code: 'en', label: 'English',  native: 'EN', flag: '🇺🇸', country: 'USA'      },
  { code: 'fr', label: 'Français', native: 'FR', flag: '🇫🇷', country: 'France'   },
] as const

type Props = { currentLang: string }

// ─── Component ───────────────────────────────────────────────
export function LanguageSwitcher({ currentLang }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [hovered, setHovered] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const current = locales.find(l => l.code === currentLang) ?? locales[0]

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleChange = (code: string) => {
    if (code === currentLang) { setOpen(false); return }
    startTransition(() => {
      const parts = pathname.split('/')
      parts[1] = code
      router.push(parts.join('/'))
    })
    setOpen(false)
  }

  return (
    <Box ref={ref} sx={{ position: 'relative', userSelect: 'none' }}>

      {/* ── Trigger button ── */}
      <Box
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        component={motion.div}
        whileTap={{ scale: 0.97 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1.25,
          py: 0.65,
          borderRadius: '10px',
          border: `1px solid ${open ? C.accentLine : C.border}`,
          bgcolor: open ? C.accentBg : C.bg,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: C.accentBg,
            borderColor: C.accentLine,
          },
        }}
      >
        {/* Globe icon */}
        <Box sx={{ color: open ? C.accent : C.textMute, display: 'flex', transition: 'color 0.2s' }}>
          {isPending
            ? <CircularProgress size={14} thickness={4} sx={{ color: C.accent }}/>
            : <FiGlobe size={14}/>
          }
        </Box>

        {/* Flag + code */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
          <Box
            component={motion.span}
            key={current.code}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            sx={{ fontSize: '14px', lineHeight: 1 }}
          >
            {current.flag}
          </Box>
          <Typography sx={{
            fontSize: '0.78rem', fontWeight: 700,
            color: open ? C.accent : C.textMid,
            letterSpacing: '0.04em',
            transition: 'color 0.2s',
            fontFamily: 'DM Mono, monospace',
          }}>
            {current.native}
          </Typography>
        </Box>

        {/* Chevron */}
        <Box
          component={motion.div}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          sx={{ display: 'flex', color: C.textMute }}
        >
          <FiChevronDown size={12}/>
        </Box>
      </Box>

      {/* ── Dropdown ── */}
      <AnimatePresence>
        {open && (
          <Box
            role="listbox"
            aria-label="Seleccionar idioma"
            component={motion.div}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            sx={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: 220,
              bgcolor: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: '14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              zIndex: 1500,
              // Top accent line
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${C.accent}, #00d4ff)`,
              },
            }}
          >
            {/* Header */}
            <Box sx={{ px: 2, pt: 2, pb: 1 }}>
              <Typography sx={{
                fontSize: '0.68rem', fontWeight: 700,
                color: C.textMute, letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Idioma / Language
              </Typography>
            </Box>

            {/* Options */}
            <Box sx={{ px: 1, pb: 1.5 }}>
              {locales.map(({ code, label, native, flag, country }, i) => {
                const isActive  = code === currentLang
                const isHovered = hovered === code

                return (
                  <Box
                    key={code}
                    role="option"
                    aria-selected={isActive}
                    component={motion.div}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.18 }}
                    onClick={() => handleChange(code)}
                    onMouseEnter={() => setHovered(code)}
                    onMouseLeave={() => setHovered(null)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      px: 1.25,
                      py: 1,
                      borderRadius: '10px',
                      cursor: isActive ? 'default' : 'pointer',
                      mb: 0.25,
                      position: 'relative',
                      bgcolor: isActive
                        ? alpha(C.accent, 0.08)
                        : isHovered
                        ? C.accentBg
                        : 'transparent',
                      border: `1px solid ${isActive ? C.accentLine : 'transparent'}`,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {/* Flag */}
                    <Box
                      component={motion.div}
                      animate={{ scale: isHovered && !isActive ? 1.15 : 1 }}
                      transition={{ duration: 0.15 }}
                      sx={{ fontSize: '20px', lineHeight: 1, flexShrink: 0 }}
                    >
                      {flag}
                    </Box>

                    {/* Labels */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
                        <Typography sx={{
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? C.accent : C.text,
                          lineHeight: 1.2,
                          transition: 'color 0.15s',
                        }}>
                          {label}
                        </Typography>
                        <Typography sx={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: C.textMute,
                          fontFamily: 'DM Mono, monospace',
                          letterSpacing: '0.06em',
                        }}>
                          {native}
                        </Typography>
                      </Box>
                      <Typography sx={{
                        fontSize: '0.7rem',
                        color: C.textMute,
                        lineHeight: 1.2,
                        mt: 0.15,
                      }}>
                        {country}
                      </Typography>
                    </Box>

                    {/* Active checkmark */}
                    <AnimatePresence>
                      {isActive && (
                        <Box
                          component={motion.div}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          sx={{
                            width: 20, height: 20, borderRadius: '50%',
                            bgcolor: C.accent, color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <FiCheck size={11} strokeWidth={3}/>
                        </Box>
                      )}
                    </AnimatePresence>
                  </Box>
                )
              })}
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}