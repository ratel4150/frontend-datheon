// File: frontend-datheon/src/app/(lang)/[lang]/servicios/agentes-autonomos/Servicepagetemplate.tsx
'use client'

import { Box, Container, Typography, Button, alpha, TextField } from '@mui/material'
import { FiCalendar, FiArrowRight, FiCheck } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

export const C = {
  bg: '#FFFFFF', bgAlt: '#F7FBFF', bgDark: '#0A0C10',
  border: '#ebebeb', text: '#0B0F2B', textMid: '#4A5068', textMute: '#8891AA',
  accent: '#00AEEF', accentDk: '#0095cc',
  accentBg: 'rgba(0,174,239,0.07)', accentLine: 'rgba(0,174,239,0.22)',
  gold: '#F59E0B', green: '#22C55E',
} as const

export const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function FAQItem({ q, a, isLast }: { q: string; a: string; isLast: boolean }) {
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

export function LeadForm({ title, subtitle, nameLbl, emailLbl, companyLbl, useCaseLbl, submitLbl, loadingLbl, successLbl, lang, service }: {
  title: string; subtitle: string; nameLbl: string; emailLbl: string; companyLbl: string
  useCaseLbl: string; submitLbl: string; loadingLbl: string; successLbl: string; lang: string; service: string
}) {
  const [form, setForm] = useState({ name: '', email: '', company: '', useCase: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const handleSubmit = useCallback(async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/v1/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.name, email: form.email, empresa: form.company, mensaje: `[${service}] ${form.useCase}`, tipo_proyecto: service, lang }),
      })
      setDone(true)
    } finally { setLoading(false) }
  }, [form, lang, service])
  const fieldSx = {
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' },
    '& .MuiOutlinedInput-root': { borderRadius: '10px', fontSize: '0.875rem', color: '#fff', bgcolor: 'rgba(255,255,255,0.05)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: alpha(C.accent, 0.4) },
      '&.Mui-focused fieldset': { borderColor: C.accent, borderWidth: 1 } },
  }
  return (
    <Box sx={{ bgcolor: C.bgDark, borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: '1px solid rgba(255,255,255,0.07)' }}>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', mb: 0.5 }}>{title}</Typography>
      <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', mb: 3 }}>{subtitle}</Typography>
      {done ? (
        <Box sx={{ textAlign: 'center', py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha(C.green, 0.15), border: `2px solid ${C.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiCheck size={22} color={C.green}/>
          </Box>
          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'center' }}>{successLbl}</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <TextField size="small" label={nameLbl} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} sx={fieldSx}/>
            <TextField size="small" label={emailLbl} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} sx={fieldSx}/>
          </Box>
          <TextField size="small" label={companyLbl} value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} sx={fieldSx}/>
          <TextField size="small" label={useCaseLbl} multiline rows={2} value={form.useCase} onChange={e => setForm(p => ({ ...p, useCase: e.target.value }))} sx={fieldSx}/>
          <Button variant="contained" fullWidth disabled={loading || !form.name || !form.email} onClick={handleSubmit}
            sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, borderRadius: '10px', py: 1.25, textTransform: 'none', '&:hover': { bgcolor: C.accentDk }, '&.Mui-disabled': { bgcolor: alpha(C.accent, 0.3), color: '#fff' } }}>
            {loading ? loadingLbl : submitLbl}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export function StickyCTA({ label }: { label: string }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100, transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease', bgcolor: C.bgDark, borderTop: '1px solid rgba(255,255,255,0.08)', px: { xs: 2, md: 4 }, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Button component="a" href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" variant="contained" startIcon={<FiCalendar size={15}/>}
        sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none', py: 1, px: 2.5, '&:hover': { bgcolor: C.accentDk } }}>
        {label}
      </Button>
    </Box>
  )
}

export interface ServiceTier {
  name: string; tagline: string; price: string; range: string; time: string
  color: string; featured?: boolean; features: string[]; cta: string
}

export interface PageContent {
  lang: string; slug: string; badge: string; icon: React.ReactNode
  breadcrumb: { home: string; services: string; current: string }
  hero: { title: string; titleAccent: string; subtitle: string; cta: string; ctaSub: string }
  social: string
  includes: { title: string; items: { icon: string; title: string; desc: string }[] }
  useCases: { title: string; items: { icon: string; profile: string; pain: string; solution: string; result: string }[] }
  results: { title: string; items: { value: string; label: string; sub: string }[] }
  pricing: { title: string; subtitle: string; tiers: ServiceTier[] }
  faq: { title: string; items: { q: string; a: string }[] }
  form: { title: string; subtitle: string; name: string; email: string; company: string; useCase: string; submit: string; loading: string; success: string }
  finalCta: { title: string; subtitle: string; cta: string; note: string }
  sticky: string
}

export function ServicePageTemplate({ t }: { t: PageContent }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const lang = t.lang

  return (
    <Box sx={{ bgcolor: C.bg, pb: 14 }}>
      {/* HERO */}
      <Box sx={{ bgcolor: C.bgDark, pt: { xs: 10, md: 14 }, pb: { xs: 8, md: 10 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(0,174,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.05) 1px, transparent 1px)`, backgroundSize: '56px 56px' }}/>
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(120px)', opacity: 0.08, zIndex: 0 }}/>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easing }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              <Box component={Link} href={`/${lang}/landing`} sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', '&:hover': { color: C.accent } }}>{t.breadcrumb.home}</Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>›</Typography>
              <Box component={Link} href={`/${lang}/servicios`} sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', '&:hover': { color: C.accent } }}>{t.breadcrumb.services}</Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>›</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: C.accent }}>{t.breadcrumb.current}</Typography>
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, border: `1px solid ${alpha(C.accent, 0.3)}`, borderRadius: '100px', bgcolor: alpha(C.accent, 0.08), mb: 2.5 }}>
              {t.icon}
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: C.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.badge}</Typography>
            </Box>
            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.2rem', md: '3.4rem' }, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', mb: 0.5 }}>{t.hero.title}</Typography>
            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.2rem', md: '3.4rem' }, color: C.accent, lineHeight: 1.1, letterSpacing: '-0.025em', mb: 2.5 }}>{t.hero.titleAccent}</Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.55)', maxWidth: 620, lineHeight: 1.8, mb: 4 }}>{t.hero.subtitle}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 4 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: C.green, animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }}/>
              <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{t.social}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant="contained" size="large" component="a" href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" startIcon={<FiCalendar size={16}/>}
                sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '12px', px: 3.5, py: 1.4, boxShadow: `0 4px 20px ${alpha(C.accent, 0.4)}`, '&:hover': { bgcolor: C.accentDk } }}>
                {t.hero.cta}
              </Button>
              <Button variant="outlined" size="large" endIcon={<FiArrowRight size={15}/>} onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)', fontWeight: 600, textTransform: 'none', borderRadius: '12px', px: 3, py: 1.4, '&:hover': { borderColor: C.accentLine, bgcolor: alpha(C.accent, 0.08), color: '#fff' } }}>
                {t.hero.ctaSub}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" ref={ref}>
        {/* INCLUDES */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.includes.title}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {t.includes.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07, ease: easing }}>
                <Box sx={{ bgcolor: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '16px', p: 2.5, height: '100%', transition: 'border-color 0.2s, transform 0.2s', '&:hover': { borderColor: C.accentLine, transform: 'translateY(-3px)' } }}>
                  <Typography sx={{ fontSize: '1.5rem', mb: 1.25 }}>{item.icon}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: C.text, mb: 0.5 }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: C.textMid, lineHeight: 1.65 }}>{item.desc}</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* USE CASES */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.useCases.title}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2.5 }}>
            {t.useCases.items.map((uc, i) => (
              <Box key={i} sx={{ bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: '16px', p: 3, transition: 'border-color 0.2s', '&:hover': { borderColor: C.accentLine } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Typography sx={{ fontSize: '1.5rem' }}>{uc.icon}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: C.text }}>{uc.profile}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <Typography sx={{ fontSize: '0.72rem', color: '#EF4444', flexShrink: 0, mt: 0.2 }}>❌</Typography>
                    <Typography sx={{ fontSize: '0.82rem', color: C.textMid, lineHeight: 1.6 }}>{uc.pain}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <Typography sx={{ fontSize: '0.72rem', color: C.accent, flexShrink: 0, mt: 0.2 }}>✅</Typography>
                    <Typography sx={{ fontSize: '0.82rem', color: C.textMid, lineHeight: 1.6 }}>{uc.solution}</Typography>
                  </Box>
                  <Box sx={{ mt: 0.5, px: 1.5, py: 0.75, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.2)}`, borderRadius: '10px' }}>
                    <Typography sx={{ fontSize: '0.78rem', color: C.green, fontWeight: 700 }}>🎯 {uc.result}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* RESULTS */}
        <Box sx={{ mb: { xs: 6, md: 8 }, bgcolor: C.bgDark, borderRadius: '24px', p: { xs: 3, md: 5 }, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(100px)', opacity: 0.07, pointerEvents: 'none' }}/>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2rem' }, color: '#fff', mb: 4, textAlign: 'center' }}>{t.results.title}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            {t.results.items.map((r, i) => (
              <Box key={i} sx={{ textAlign: 'center', p: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' }, color: C.accent, lineHeight: 1, mb: 0.5 }}>{r.value}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', mb: 0.25 }}>{r.label}</Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{r.sub}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* PRICING */}
        <Box id="pricing" sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 0.5 }}>{t.pricing.title}</Typography>
          <Typography sx={{ fontSize: '0.9rem', color: C.textMute, mb: 1 }}>{t.pricing.subtitle}</Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
            {t.pricing.tiers.map((tier, i) => (
              <Box key={i} sx={{ bgcolor: tier.featured ? C.bgDark : C.bg, border: `1px solid ${tier.featured ? alpha(tier.color, 0.4) : C.border}`, borderRadius: '20px', p: 3, position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 32px ${alpha(tier.color, 0.15)}` } }}>
                {tier.featured && (
                  <Box sx={{ position: 'absolute', top: 16, right: 16, px: 1.25, py: 0.4, bgcolor: alpha(tier.color, 0.15), border: `1px solid ${alpha(tier.color, 0.3)}`, borderRadius: '100px', fontSize: '0.65rem', fontWeight: 700, color: tier.color }}>
                    {lang === 'fr' ? 'LE PLUS POPULAIRE' : lang === 'en' ? 'MOST POPULAR' : 'MÁS POPULAR'}
                  </Box>
                )}
                <Box sx={{ width: 32, height: 3, bgcolor: tier.color, borderRadius: 2, mb: 2 }}/>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: tier.featured ? '#fff' : C.text, mb: 0.25 }}>{tier.name}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.4)' : C.textMute, mb: 2, lineHeight: 1.5 }}>{tier.tagline}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: tier.color, lineHeight: 1 }}>{tier.price}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.4)' : C.textMute }}>{tier.range} · {tier.time}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                  {tier.features.map((f, fi) => (
                    <Box key={fi} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <FiCheck size={13} color={tier.color} style={{ flexShrink: 0, marginTop: 2 }}/>
                      <Typography sx={{ fontSize: '0.78rem', color: tier.featured ? 'rgba(255,255,255,0.6)' : C.textMid, lineHeight: 1.5 }}>{f}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button fullWidth variant={tier.featured ? 'contained' : 'outlined'} component="a" href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank"
                  sx={{ bgcolor: tier.featured ? tier.color : 'transparent', color: tier.featured ? '#fff' : tier.color, borderColor: alpha(tier.color, 0.4), fontWeight: 700, textTransform: 'none', borderRadius: '10px', py: 1.25, '&:hover': { bgcolor: tier.featured ? alpha(tier.color, 0.85) : alpha(tier.color, 0.08), borderColor: tier.color } }}>
                  {tier.cta}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        {/* FAQ + FORM */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' }, gap: 4, mb: { xs: 6, md: 8 } }}>
          <Box>
            <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, mb: 1 }}>{t.faq.title}</Typography>
            <Box sx={{ width: 40, height: 3, bgcolor: C.accent, borderRadius: 2, mb: 4 }}/>
            {t.faq.items.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} isLast={i === t.faq.items.length - 1}/>)}
          </Box>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <LeadForm title={t.form.title} subtitle={t.form.subtitle} nameLbl={t.form.name} emailLbl={t.form.email} companyLbl={t.form.company} useCaseLbl={t.form.useCase} submitLbl={t.form.submit} loadingLbl={t.form.loading} successLbl={t.form.success} lang={lang} service={t.slug}/>
          </Box>
        </Box>

        {/* FINAL CTA */}
        <Box sx={{ textAlign: 'center', py: { xs: 5, md: 7 }, bgcolor: C.bgAlt, borderRadius: '24px', border: `1px solid ${C.border}`, px: 3, mb: 4 }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.25rem' }, color: C.text, mb: 1.5, maxWidth: 560, mx: 'auto' }}>{t.finalCta.title}</Typography>
          <Typography sx={{ fontSize: '0.95rem', color: C.textMid, mb: 3, maxWidth: 480, mx: 'auto', lineHeight: 1.75 }}>{t.finalCta.subtitle}</Typography>
          <Button variant="contained" size="large" component="a" href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank"
            startIcon={<FiCalendar size={16}/>} endIcon={<FiArrowRight size={15}/>}
            sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '12px', px: 4, py: 1.5, boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`, '&:hover': { bgcolor: C.accentDk } }}>
            {t.finalCta.cta}
          </Button>
          <Typography sx={{ mt: 1.5, fontSize: '0.78rem', color: C.textMute }}>{t.finalCta.note}</Typography>
        </Box>
      </Container>
      <StickyCTA label={t.sticky}/>
    </Box>
  )
}