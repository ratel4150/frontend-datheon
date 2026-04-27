// File: frontend-datheon/src/app/(lang)/[lang]/sectores/SectorPageTemplate.tsx
'use client'

import { Box, Container, Typography, Button, alpha } from '@mui/material'
import { FiCalendar, FiArrowRight, FiCheck, FiTrendingUp, FiZap, FiArrowLeft } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

// ─── Tokens ──────────────────────────────────────────────────
export const C = {
  bg:         '#F7FBFF',
  bgWhite:    '#FFFFFF',
  bgDark:     '#0A0C10',
  border:     '#ebebeb',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.20)',
  green:      '#22C55E',
} as const

export const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]
export type Lang = 'es' | 'en' | 'fr'

// ─── Interfaces ───────────────────────────────────────────────
export interface SectorUseCase {
  icon: string
  profile: string
  pain:     Record<Lang, string>
  solution: Record<Lang, string>
  result:   Record<Lang, string>
}

export interface SectorSolution {
  icon: string
  title:   Record<Lang, string>
  desc:    Record<Lang, string>
}

export interface SectorTier {
  name:     Record<Lang, string>
  tagline:  Record<Lang, string>
  price:    string
  range:    string
  time:     Record<Lang, string>
  color:    string
  featured: boolean
  features: Record<Lang, string[]>
  cta:      Record<Lang, string>
}

export interface SectorFAQ {
  q: Record<Lang, string>
  a: Record<Lang, string>
}

export interface SectorPageContent {
  // Meta
  slug:  string
  color: string
  icon:  React.ReactNode

  // Breadcrumb labels
  breadcrumb: {
    home:    Record<Lang, string>
    sectors: Record<Lang, string>
    current: Record<Lang, string>
  }

  // Hero
  hero: {
    badge:    Record<Lang, string>
    title:    Record<Lang, string>
    accent:   Record<Lang, string>
    subtitle: Record<Lang, string>
    cta:      Record<Lang, string>
    ctaSub:   Record<Lang, string>
    social:   Record<Lang, string>
  }

  // Metrics bar
  metrics: string[]

  // Solutions grid
  solutions: {
    title: Record<Lang, string>
    items: SectorSolution[]
  }

  // Use cases
  useCases: {
    title: Record<Lang, string>
    items: SectorUseCase[]
  }

  // Results
  results: {
    title: Record<Lang, string>
    items: { value: string; label: Record<Lang, string>; sub: Record<Lang, string> }[]
  }

  // Pricing
  pricing: {
    title:    Record<Lang, string>
    subtitle: Record<Lang, string>
    tiers:    SectorTier[]
  }

  // FAQ
  faq: {
    title: Record<Lang, string>
    items: SectorFAQ[]
  }

  // Form
  form: {
    title:    Record<Lang, string>
    subtitle: Record<Lang, string>
    nameLbl:  Record<Lang, string>
    emailLbl: Record<Lang, string>
    coLbl:    Record<Lang, string>
    msgLbl:   Record<Lang, string>
    submit:   Record<Lang, string>
    loading:  Record<Lang, string>
    success:  Record<Lang, string>
  }

  // Final CTA
  finalCta: {
    title:    Record<Lang, string>
    subtitle: Record<Lang, string>
    cta:      Record<Lang, string>
    note:     Record<Lang, string>
  }

  sticky: Record<Lang, string>
  calendly: string
}

// ─── Metric pill ──────────────────────────────────────────────
function MetricPill({ label, color }: { label: string; color: string }) {
  const isPlus  = label.startsWith('+')
  const isMinus = label.startsWith('-')
  const bg  = isPlus ? alpha('#22C55E', 0.1) : isMinus ? alpha('#F59E0B', 0.1) : alpha(color, 0.08)
  const col = isPlus ? '#16A34A' : isMinus ? '#D97706' : color
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.25, py: 0.5, bgcolor: bg, borderRadius: '100px', border: `1px solid ${alpha(col, 0.2)}` }}>
      {(isPlus || isMinus) ? <FiTrendingUp size={10} color={col}/> : <FiZap size={10} color={col}/>}
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: col, lineHeight: 1 }}>{label}</Typography>
    </Box>
  )
}

// ─── FAQ item ─────────────────────────────────────────────────
function FAQItem({ q, a, isLast }: { q: string; a: string; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <Box sx={{ borderBottom: isLast ? 'none' : `1px solid ${C.border}`, py: 2 }}>
      <Box onClick={() => setOpen(o => !o)} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 2, '&:hover .faq-q': { color: C.accent } }}>
        <Typography className="faq-q" sx={{ fontWeight: 600, fontSize: '0.9rem', color: C.text, transition: 'color 0.18s', lineHeight: 1.4 }}>{q}</Typography>
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: open ? C.accentBg : 'transparent', border: `1px solid ${open ? C.accentLine : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: open ? C.accent : C.textMute }}>
          <Typography sx={{ fontSize: '1rem', lineHeight: 1, fontWeight: 300 }}>{open ? '−' : '+'}</Typography>
        </Box>
      </Box>
      {open && <Typography sx={{ fontSize: '0.85rem', color: C.textMid, mt: 1.5, lineHeight: 1.75, pr: 4 }}>{a}</Typography>}
    </Box>
  )
}

// ─── Lead form ────────────────────────────────────────────────
function LeadForm({ t, color, lang, slug, calendly }: {
  t: SectorPageContent['form']; color: string; lang: Lang; slug: string; calendly: string
}) {
  const [form, setForm] = useState({ name: '', email: '', company: '', msg: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/v1/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.name, email: form.email, empresa: form.company, mensaje: `[${slug}] ${form.msg}`, tipo_proyecto: slug, lang }),
      })
      setDone(true)
    } finally { setLoading(false) }
  }

  const inputSx = {
    width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem',
    color: '#fff', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', outline: 'none',
    transition: 'border-color 0.18s',
    '&:focus': { borderColor: color },
    fontFamily: 'inherit',
  }

  return (
    <Box sx={{ bgcolor: C.bgDark, borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: '1px solid rgba(255,255,255,0.07)' }}>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', mb: 0.5 }}>{t.title[lang]}</Typography>
      <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', mb: 3 }}>{t.subtitle[lang]}</Typography>
      {done ? (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha(C.green, 0.15), border: `2px solid ${C.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
            <FiCheck size={22} color={C.green}/>
          </Box>
          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{t.success[lang]}</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box component="input" placeholder={t.nameLbl[lang]} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} sx={inputSx}/>
            <Box component="input" type="email" placeholder={t.emailLbl[lang]} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} sx={inputSx}/>
          </Box>
          <Box component="input" placeholder={t.coLbl[lang]} value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} sx={inputSx}/>
          <Box component="textarea" rows={3} placeholder={t.msgLbl[lang]} value={form.msg} onChange={(e: any) => setForm(p => ({ ...p, msg: e.target.value }))} sx={{ ...inputSx, resize: 'none' }}/>
          <Button fullWidth variant="contained" disabled={loading || !form.name || !form.email} onClick={handleSubmit}
            sx={{ bgcolor: color, color: '#fff', fontWeight: 700, borderRadius: '10px', py: 1.25, textTransform: 'none', '&:hover': { bgcolor: alpha(color, 0.85) }, '&.Mui-disabled': { bgcolor: alpha(color, 0.3), color: '#fff' } }}>
            {loading ? t.loading[lang] : t.submit[lang]}
          </Button>
          <Button component="a" href={calendly} target="_blank" variant="outlined" startIcon={<FiCalendar size={14}/>}
            sx={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'none', borderRadius: '10px', py: 1.1, '&:hover': { borderColor: color, color: '#fff', bgcolor: alpha(color, 0.1) } }}>
            {lang === 'es' ? 'O agendar llamada directamente' : lang === 'en' ? 'Or schedule a call directly' : 'Ou planifier un appel directement'}
          </Button>
        </Box>
      )}
    </Box>
  )
}

// ─── Sticky CTA ───────────────────────────────────────────────
function StickyCTA({ label, color, calendly }: { label: string; color: string; calendly: string }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<boolean>(false)

  useRef(() => {
    const h = () => { setVisible(window.scrollY > 500) }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  })

  // Simple mount effect
  useState(() => {
    if (typeof window === 'undefined') return
    const h = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', h, { passive: true })
  })

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100, transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease', bgcolor: C.bgDark, borderTop: '1px solid rgba(255,255,255,0.08)', px: { xs: 2, md: 4 }, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Button component="a" href={calendly} target="_blank" variant="contained" startIcon={<FiCalendar size={15}/>}
        sx={{ bgcolor: color, color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none', py: 1, px: 2.5, '&:hover': { bgcolor: alpha(color, 0.85) } }}>
        {label}
      </Button>
    </Box>
  )
}

// ─── Main template ────────────────────────────────────────────
export function SectorPageTemplate({ t, lang }: { t: SectorPageContent; lang: Lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const color = t.color

  return (
    <Box sx={{ bgcolor: C.bg, pb: 14 }}>

      {/* ── Hero ── */}
      <Box sx={{ bgcolor: C.bgDark, pt: { xs: 10, md: 14 }, pb: { xs: 8, md: 10 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(${alpha(color, 0.04)} 1px,transparent 1px),linear-gradient(90deg,${alpha(color, 0.04)} 1px,transparent 1px)`, backgroundSize: '56px 56px' }}/>
        <Box sx={{ position: 'absolute', top: -100, right: -80, width: 420, height: 420, borderRadius: '50%', bgcolor: color, filter: 'blur(130px)', opacity: 0.1, zIndex: 0 }}/>
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(100px)', opacity: 0.06, zIndex: 0 }}/>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>

            {/* Breadcrumb */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              <Box component={Link} href={`/${lang}/landing`} sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', '&:hover': { color: color } }}>
                {t.breadcrumb.home[lang]}
              </Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>›</Typography>
              <Box component={Link} href={`/${lang}/sectores`} sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', '&:hover': { color: color } }}>
                {t.breadcrumb.sectors[lang]}
              </Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>›</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: color }}>{t.breadcrumb.current[lang]}</Typography>
            </Box>

            {/* Badge */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.75, py: 0.6, border: `1px solid ${alpha(color, 0.35)}`, borderRadius: '100px', bgcolor: alpha(color, 0.1), mb: 2.5 }}>
              <Box sx={{ color: color, display: 'flex' }}>{t.icon}</Box>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.hero.badge[lang]}</Typography>
            </Box>

            {/* H1 */}
            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.2rem', md: '3.4rem' }, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', mb: 0.5 }}>
              {t.hero.title[lang]}
            </Typography>
            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.2rem', md: '3.4rem' }, color: color, lineHeight: 1.1, letterSpacing: '-0.025em', mb: 2.5 }}>
              {t.hero.accent[lang]}
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.5)', maxWidth: 620, lineHeight: 1.8, mb: 4 }}>
              {t.hero.subtitle[lang]}
            </Typography>

            {/* Social proof */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 4 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: C.green, animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }}/>
              <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{t.hero.social[lang]}</Typography>
            </Box>

            {/* Metrics pills */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {t.metrics.map((m, i) => <MetricPill key={i} label={m} color={color}/>)}
            </Box>

            {/* CTAs */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button component="a" href={t.calendly} target="_blank" variant="contained" size="large" startIcon={<FiCalendar size={16}/>}
                sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '12px', px: 3.5, py: 1.4, boxShadow: `0 4px 20px ${alpha(color, 0.4)}`, '&:hover': { bgcolor: alpha(color, 0.85) } }}>
                {t.hero.cta[lang]}
              </Button>
              <Button variant="outlined" size="large" endIcon={<FiArrowRight size={15}/>}
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)', fontWeight: 600, textTransform: 'none', borderRadius: '12px', px: 3, py: 1.4, '&:hover': { borderColor: alpha(color, 0.5), bgcolor: alpha(color, 0.08), color: '#fff' } }}>
                {t.hero.ctaSub[lang]}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" ref={ref}>

        {/* ── Solutions ── */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.solutions.title[lang]}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: color, borderRadius: 2, mb: 4 }}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }, gap: 2.5 }}>
            {t.solutions.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07, ease }}>
                <Box sx={{ bgcolor: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: '16px', p: 2.5, height: '100%', transition: 'border-color 0.2s, transform 0.2s', '&:hover': { borderColor: alpha(color, 0.35), transform: 'translateY(-3px)' } }}>
                  <Typography sx={{ fontSize: '1.5rem', mb: 1.25 }}>{item.icon}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: C.text, mb: 0.5 }}>{item.title[lang]}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: C.textMid, lineHeight: 1.65 }}>{item.desc[lang]}</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* ── Use Cases ── */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.useCases.title[lang]}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: color, borderRadius: 2, mb: 4 }}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' }, gap: 2.5 }}>
            {t.useCases.items.map((uc, i) => (
              <Box key={i} sx={{ bgcolor: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: '16px', p: 3, transition: 'border-color 0.2s', '&:hover': { borderColor: alpha(color, 0.35) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Typography sx={{ fontSize: '1.5rem' }}>{uc.icon}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: C.text }}>{uc.profile}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <Typography sx={{ fontSize: '0.72rem', flexShrink: 0, mt: 0.2 }}>❌</Typography>
                    <Typography sx={{ fontSize: '0.82rem', color: C.textMid, lineHeight: 1.6 }}>{uc.pain[lang]}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <Typography sx={{ fontSize: '0.72rem', flexShrink: 0, mt: 0.2 }}>✅</Typography>
                    <Typography sx={{ fontSize: '0.82rem', color: C.textMid, lineHeight: 1.6 }}>{uc.solution[lang]}</Typography>
                  </Box>
                  <Box sx={{ mt: 0.5, px: 1.5, py: 0.75, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.2)}`, borderRadius: '10px' }}>
                    <Typography sx={{ fontSize: '0.78rem', color: C.green, fontWeight: 700 }}>🎯 {uc.result[lang]}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Results ── */}
        <Box sx={{ mb: { xs: 6, md: 8 }, bgcolor: C.bgDark, borderRadius: '24px', p: { xs: 3, md: 5 }, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: color, filter: 'blur(100px)', opacity: 0.08, pointerEvents: 'none' }}/>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2rem' }, color: '#fff', mb: 4, textAlign: 'center' }}>{t.results.title[lang]}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, gap: 3 }}>
            {t.results.items.map((r, i) => (
              <Box key={i} sx={{ textAlign: 'center', p: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' }, color: color, lineHeight: 1, mb: 0.5 }}>{r.value}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', mb: 0.25 }}>{r.label[lang]}</Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{r.sub[lang]}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Pricing ── */}
        <Box id="pricing" sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 0.5 }}>{t.pricing.title[lang]}</Typography>
          <Typography sx={{ fontSize: '0.9rem', color: C.textMute, mb: 1 }}>{t.pricing.subtitle[lang]}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: color, borderRadius: 2, mb: 4 }}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 2.5, alignItems: 'start' }}>
            {t.pricing.tiers.map((tier, i) => (
              <Box key={i} sx={{ bgcolor: tier.featured ? C.bgDark : C.bgWhite, border: `1px solid ${tier.featured ? alpha(tier.color, 0.4) : C.border}`, borderRadius: '20px', p: 3, position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 32px ${alpha(tier.color, 0.15)}` } }}>
                {tier.featured && (
                  <Box sx={{ position: 'absolute', top: 16, right: 16, px: 1.25, py: 0.4, bgcolor: alpha(tier.color, 0.15), border: `1px solid ${alpha(tier.color, 0.3)}`, borderRadius: '100px', fontSize: '0.65rem', fontWeight: 700, color: tier.color }}>
                    {lang === 'fr' ? 'LE PLUS POPULAIRE' : lang === 'en' ? 'MOST POPULAR' : 'MÁS POPULAR'}
                  </Box>
                )}
                <Box sx={{ width: 32, height: 3, bgcolor: tier.color, borderRadius: 2, mb: 2 }}/>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: tier.featured ? '#fff' : C.text, mb: 0.25 }}>{tier.name[lang]}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.4)' : C.textMute, mb: 2, lineHeight: 1.5 }}>{tier.tagline[lang]}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: tier.color, lineHeight: 1 }}>{tier.price}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.4)' : C.textMute }}>{tier.range} · {tier.time[lang]}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                  {tier.features[lang].map((f, fi) => (
                    <Box key={fi} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <FiCheck size={13} color={tier.color} style={{ flexShrink: 0, marginTop: 2 }}/>
                      <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.6)' : C.textMid, lineHeight: 1.5 }}>{f}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button fullWidth variant={tier.featured ? 'contained' : 'outlined'} component="a" href={t.calendly} target="_blank"
                  sx={{ bgcolor: tier.featured ? tier.color : 'transparent', color: tier.featured ? '#fff' : tier.color, borderColor: alpha(tier.color, 0.4), fontWeight: 700, textTransform: 'none', borderRadius: '10px', py: 1.25, '&:hover': { bgcolor: tier.featured ? alpha(tier.color, 0.85) : alpha(tier.color, 0.08), borderColor: tier.color } }}>
                  {tier.cta[lang]}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── FAQ + Form ── */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 420px' }, gap: 4, mb: { xs: 6, md: 8 } }}>
          <Box>
            <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.faq.title[lang]}</Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: color, borderRadius: 2, mb: 4 }}/>
            {t.faq.items.map((item, i) => <FAQItem key={i} q={item.q[lang]} a={item.a[lang]} isLast={i === t.faq.items.length - 1}/>)}
          </Box>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <LeadForm t={t.form} color={color} lang={lang} slug={t.slug} calendly={t.calendly}/>
          </Box>
        </Box>

        {/* ── Final CTA ── */}
        <Box sx={{ textAlign: 'center', py: { xs: 5, md: 7 }, bgcolor: C.bgDark, borderRadius: '24px', px: 3, mb: 4, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 60% 50%, ${alpha(color, 0.1)} 0%, transparent 60%)`, zIndex: 0 }}/>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.25rem' }, color: '#fff', mb: 1.5, maxWidth: 560, mx: 'auto' }}>{t.finalCta.title[lang]}</Typography>
            <Typography sx={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', mb: 3, maxWidth: 480, mx: 'auto', lineHeight: 1.75 }}>{t.finalCta.subtitle[lang]}</Typography>
            <Button variant="contained" size="large" component="a" href={t.calendly} target="_blank"
              startIcon={<FiCalendar size={16}/>} endIcon={<FiArrowRight size={15}/>}
              sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '12px', px: 4, py: 1.5, boxShadow: `0 4px 20px ${alpha(color, 0.4)}`, '&:hover': { bgcolor: alpha(color, 0.85) } }}>
              {t.finalCta.cta[lang]}
            </Button>
            <Typography sx={{ mt: 1.5, fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{t.finalCta.note[lang]}</Typography>
          </Box>
        </Box>

        {/* Back to sectors */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
          <Button component={Link} href={`/${lang}/sectores`} startIcon={<FiArrowLeft size={14}/>}
            sx={{ color: C.textMute, fontWeight: 600, textTransform: 'none', fontSize: '0.85rem', '&:hover': { color: color } }}>
            {lang === 'es' ? 'Ver todos los sectores' : lang === 'en' ? 'View all sectors' : 'Voir tous les secteurs'}
          </Button>
        </Box>
      </Container>

      <StickyCTA label={t.sticky[lang]} color={color} calendly={t.calendly}/>
    </Box>
  )
}