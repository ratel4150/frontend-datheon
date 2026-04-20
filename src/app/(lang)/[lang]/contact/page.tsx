// File: frontend-datheon/src/app/(lang)/[lang]/contact/page.tsx
'use client'

import {
  Box, Typography, Container, TextField, Button,
  MenuItem, Select, FormControl, InputLabel,
  Checkbox, FormControlLabel, alpha, CircularProgress,
} from '@mui/material'
import {
  FiCalendar, FiArrowRight, FiCheck, FiMail,
  FiMessageSquare, FiUser, FiBriefcase, FiDollarSign,
} from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { use } from 'react'

const C = {
  bg: '#F7FBFF', cardBg: '#FFFFFF', border: '#ebebeb',
  text: '#0B0F2B', textMid: '#4A5068', textMute: '#8891AA',
  accent: '#00AEEF', accentDk: '#0095cc',
  accentBg: 'rgba(0,174,239,0.07)', accentLine: 'rgba(0,174,239,0.22)',
} as const

type Lang = 'es' | 'en' | 'fr'
type Props = { params: Promise<{ lang: string }> }

const content = {
  es: {
    tag: 'Contacto',
    title: 'Hablemos de tu',
    titleAccent: 'próximo proyecto.',
    subtitle: 'Cuéntanos qué necesitas y te respondemos en menos de 24 horas con una propuesta personalizada.',
    form: {
      nombre: 'Nombre completo', email: 'Email empresarial',
      empresa: 'Empresa / Organización', presupuesto: 'Presupuesto estimado',
      tipo: 'Tipo de proyecto', mensaje: 'Cuéntanos más sobre tu proyecto',
      privacy: 'Acepto la política de privacidad',
      submit: 'Enviar mensaje', loading: 'Enviando...',
    },
    presupuestos: [
      { value: '<5k', label: 'Menos de $5,000 USD' },
      { value: '5k-15k', label: '$5,000 – $15,000 USD' },
      { value: '15k-50k', label: '$15,000 – $50,000 USD' },
      { value: '>50k', label: 'Más de $50,000 USD' },
    ],
    tipos: [
      { value: 'ai', label: 'AI / Agentes autónomos' },
      { value: 'saas', label: 'Web / SaaS / E-commerce' },
      { value: 'mobile', label: 'App móvil' },
      { value: 'iot', label: 'IoT / Hardware' },
      { value: 'cloud', label: 'Cloud / DevOps' },
      { value: 'odoo', label: 'Odoo ERP' },
      { value: 'other', label: 'Otro' },
    ],
    success: {
      title: '¡Mensaje enviado!',
      sub: 'Te respondemos en menos de 24 horas. Mientras tanto puedes agendar una llamada directamente.',
      cta: 'Agendar llamada ahora',
    },
    errors: {
      nombre: 'El nombre es requerido',
      email: 'Email inválido',
      privacy: 'Debes aceptar la política de privacidad',
      send: 'Error al enviar. Intenta de nuevo.',
    },
    info: {
      title: '¿Por qué contactarnos?',
      items: [
        { icon: '⚡', text: 'Respuesta en menos de 24 horas' },
        { icon: '🎯', text: 'Propuesta personalizada sin costo' },
        { icon: '🔒', text: 'Tu información es confidencial' },
        { icon: '📅', text: 'Primera consulta completamente gratis' },
      ],
      or: 'O agenda directamente',
      calendly: 'Agendar reunión en Calendly',
      email: 'hola@datheon.com',
    },
  },
  en: {
    tag: 'Contact',
    title: "Let's talk about your",
    titleAccent: 'next project.',
    subtitle: 'Tell us what you need and we will respond in less than 24 hours with a personalized proposal.',
    form: {
      nombre: 'Full name', email: 'Business email',
      empresa: 'Company / Organization', presupuesto: 'Estimated budget',
      tipo: 'Project type', mensaje: 'Tell us more about your project',
      privacy: 'I accept the privacy policy',
      submit: 'Send message', loading: 'Sending...',
    },
    presupuestos: [
      { value: '<5k', label: 'Less than $5,000 USD' },
      { value: '5k-15k', label: '$5,000 – $15,000 USD' },
      { value: '15k-50k', label: '$15,000 – $50,000 USD' },
      { value: '>50k', label: 'More than $50,000 USD' },
    ],
    tipos: [
      { value: 'ai', label: 'AI / Autonomous agents' },
      { value: 'saas', label: 'Web / SaaS / E-commerce' },
      { value: 'mobile', label: 'Mobile app' },
      { value: 'iot', label: 'IoT / Hardware' },
      { value: 'cloud', label: 'Cloud / DevOps' },
      { value: 'odoo', label: 'Odoo ERP' },
      { value: 'other', label: 'Other' },
    ],
    success: {
      title: 'Message sent!',
      sub: 'We will respond in less than 24 hours.',
      cta: 'Schedule a call now',
    },
    errors: {
      nombre: 'Name is required', email: 'Invalid email',
      privacy: 'You must accept the privacy policy',
      send: 'Error sending. Please try again.',
    },
    info: {
      title: 'Why contact us?',
      items: [
        { icon: '⚡', text: 'Response in less than 24 hours' },
        { icon: '🎯', text: 'Personalized proposal at no cost' },
        { icon: '🔒', text: 'Your information is confidential' },
        { icon: '📅', text: 'First consultation completely free' },
      ],
      or: 'Or schedule directly',
      calendly: 'Schedule on Calendly',
      email: 'hola@datheon.com',
    },
  },
  fr: {
    tag: 'Contact',
    title: 'Parlons de votre',
    titleAccent: 'prochain projet.',
    subtitle: 'Dites-nous ce dont vous avez besoin et nous vous répondrons en moins de 24 heures.',
    form: {
      nombre: 'Nom complet', email: 'Email professionnel',
      empresa: 'Entreprise / Organisation', presupuesto: 'Budget estimé',
      tipo: 'Type de projet', mensaje: 'Parlez-nous de votre projet',
      privacy: "J'accepte la politique de confidentialité",
      submit: 'Envoyer le message', loading: 'Envoi en cours...',
    },
    presupuestos: [
      { value: '<5k', label: 'Moins de 5 000 $ USD' },
      { value: '5k-15k', label: '5 000 – 15 000 $ USD' },
      { value: '15k-50k', label: '15 000 – 50 000 $ USD' },
      { value: '>50k', label: 'Plus de 50 000 $ USD' },
    ],
    tipos: [
      { value: 'ai', label: 'IA / Agents autonomes' },
      { value: 'saas', label: 'Web / SaaS / E-commerce' },
      { value: 'mobile', label: 'Application mobile' },
      { value: 'iot', label: 'IoT / Matériel' },
      { value: 'cloud', label: 'Cloud / DevOps' },
      { value: 'odoo', label: 'Odoo ERP' },
      { value: 'other', label: 'Autre' },
    ],
    success: {
      title: 'Message envoyé !',
      sub: 'Nous vous répondrons en moins de 24 heures.',
      cta: 'Planifier un appel maintenant',
    },
    errors: {
      nombre: 'Le nom est requis', email: 'Email invalide',
      privacy: 'Vous devez accepter la politique de confidentialité',
      send: "Erreur d'envoi. Veuillez réessayer.",
    },
    info: {
      title: 'Pourquoi nous contacter ?',
      items: [
        { icon: '⚡', text: 'Réponse en moins de 24 heures' },
        { icon: '🎯', text: 'Proposition personnalisée sans frais' },
        { icon: '🔒', text: 'Vos informations sont confidentielles' },
        { icon: '📅', text: 'Première consultation gratuite' },
      ],
      or: 'Ou planifiez directement',
      calendly: 'Planifier sur Calendly',
      email: 'hola@datheon.com',
    },
  },
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px', fontSize: '0.875rem',
    '& fieldset': { borderColor: '#ebebeb' },
    '&:hover fieldset': { borderColor: 'rgba(0,174,239,0.22)' },
    '&.Mui-focused fieldset': { borderColor: '#00AEEF', borderWidth: 1 },
  },
}

function SuccessScreen({ t }: { t: typeof content['es'] }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 6, gap: 2 }}
    >
      <Box sx={{
        width: 64, height: 64, borderRadius: '50%',
        bgcolor: alpha('#22C55E', 0.1), border: '2px solid #22C55E',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <FiCheck size={28} color="#22C55E" strokeWidth={2.5}/>
      </Box>
      <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: C.text }}>{t.success.title}</Typography>
      <Typography sx={{ fontSize: '0.9rem', color: C.textMid, maxWidth: 340, lineHeight: 1.7 }}>{t.success.sub}</Typography>
      <Link href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          startIcon={<FiCalendar size={15}/>}
          endIcon={<FiArrowRight size={15}/>}
          sx={{
            mt: 1, bgcolor: C.accent, color: '#fff', fontWeight: 700,
            textTransform: 'none', borderRadius: '12px', px: 3, py: 1.25,
            '&:hover': { bgcolor: C.accentDk },
          }}
        >
          {t.success.cta}
        </Button>
      </Link>
    </Box>
  )
}

export default function ContactPage({ params }: Props) {
  // ✅ Correcto: usar React.use() para unwrap params en client component
  const { lang: rawLang } = use(params)
  const lang: Lang = (['es', 'en', 'fr'].includes(rawLang) ? rawLang : 'es') as Lang
  const t = content[lang]

  const [form, setForm] = useState({
    nombre: '', email: '', empresa: '',
    presupuesto: '', tipo_proyecto: '', mensaje: '', privacy: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

const validate = useCallback(() => {
  const e: Record<string, string> = {}

  if (!form.nombre.trim()) e.nombre = t.errors.nombre
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = t.errors.email
  if (!form.privacy) e.privacy = t.errors.privacy

  return e
}, [form, t])

const handleSubmit = useCallback(async () => {
  const errors = validate()

  if (Object.keys(errors).length > 0) {
    setErrors(errors)
    return
  }

  setLoading(true)

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/v1/contact`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      }
    )

    if (res.ok) setSuccess(true)
    else setErrors({ send: t.errors.send })
  } catch {
    setErrors({ send: t.errors.send })
  } finally {
    setLoading(false)
  }
}, [form, lang, t, validate])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
  }

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: '100vh', py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}
        >
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.75,
            px: 1.75, py: 0.6, border: `1px solid ${C.accentLine}`,
            borderRadius: '100px', bgcolor: C.accentBg, mb: 2,
          }}>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: C.textMid, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t.tag}
            </Typography>
          </Box>
          <Typography variant="h2" sx={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.75rem' }, color: C.text,
            lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            {t.title}{' '}
            <Box component="span" sx={{ color: C.accent }}>{t.titleAccent}</Box>
          </Typography>
          <Typography sx={{ mt: 1.5, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: C.textMid, maxWidth: 520, mx: 'auto', lineHeight: 1.75 }}>
            {t.subtitle}
          </Typography>
        </Box>

        {/* Two column */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' }, gap: { xs: 4, lg: 6 }, alignItems: 'start' }}>

          {/* Form */}
          <Box sx={{ bgcolor: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '20px', p: { xs: 2.5, md: 3.5 } }}>
            {success ? <SuccessScreen t={t}/> : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                      <FiUser size={15} color={errors.nombre ? '#EF4444' : C.accent}/>
                    </Box>
                    <TextField fullWidth size="small" label={t.form.nombre}
                      value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                      error={!!errors.nombre} helperText={errors.nombre} sx={inputSx}
                    />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                      <FiMail size={15} color={errors.email ? '#EF4444' : C.accent}/>
                    </Box>
                    <TextField fullWidth size="small" label={t.form.email} type="email"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      error={!!errors.email} helperText={errors.email} sx={inputSx}
                    />
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                    <FiBriefcase size={15} color={C.accent}/>
                  </Box>
                  <TextField fullWidth size="small" label={t.form.empresa}
                    value={form.empresa} onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))}
                    sx={inputSx}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                      <FiDollarSign size={15} color={C.accent}/>
                    </Box>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ fontSize: '0.875rem' }}>{t.form.presupuesto}</InputLabel>
                      <Select value={form.presupuesto} label={t.form.presupuesto}
                        onChange={e => setForm(f => ({ ...f, presupuesto: e.target.value }))}
                        sx={{ borderRadius: '12px', fontSize: '0.875rem',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: C.border },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: C.accentLine },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: C.accent, borderWidth: 1 },
                        }}
                      >
                        {t.presupuestos.map(p => <MenuItem key={p.value} value={p.value} sx={{ fontSize: '0.875rem' }}>{p.label}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                      <FiMessageSquare size={15} color={C.accent}/>
                    </Box>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ fontSize: '0.875rem' }}>{t.form.tipo}</InputLabel>
                      <Select value={form.tipo_proyecto} label={t.form.tipo}
                        onChange={e => setForm(f => ({ ...f, tipo_proyecto: e.target.value }))}
                        sx={{ borderRadius: '12px', fontSize: '0.875rem',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: C.border },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: C.accentLine },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: C.accent, borderWidth: 1 },
                        }}
                      >
                        {t.tipos.map(tp => <MenuItem key={tp.value} value={tp.value} sx={{ fontSize: '0.875rem' }}>{tp.label}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <TextField fullWidth multiline rows={4} label={t.form.mensaje}
                  value={form.mensaje} onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                  onKeyDown={handleKey} sx={inputSx}
                />

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox checked={form.privacy}
                        onChange={e => setForm(f => ({ ...f, privacy: e.target.checked }))}
                        sx={{ color: errors.privacy ? '#EF4444' : C.border, '&.Mui-checked': { color: C.accent } }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: '0.8rem', color: C.textMid }}>
                        {t.form.privacy}{' '}
                        <Box component={Link} href={`/${lang}/privacy`}
                          sx={{ color: C.accent, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                          →
                        </Box>
                      </Typography>
                    }
                  />
                  {errors.privacy && <Typography sx={{ fontSize: '0.72rem', color: '#EF4444', ml: 4 }}>{errors.privacy}</Typography>}
                </Box>

                {errors.send && <Typography sx={{ fontSize: '0.8rem', color: '#EF4444', textAlign: 'center' }}>{errors.send}</Typography>}

                <Button variant="contained" fullWidth disabled={loading} onClick={handleSubmit}
                  startIcon={loading ? <CircularProgress size={16} color="inherit"/> : <FiMail size={16}/>}
                  endIcon={!loading ? <FiArrowRight size={16}/> : undefined}
                  component={motion.button} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  sx={{
                    bgcolor: C.accent, color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                    textTransform: 'none', borderRadius: '12px', py: 1.4,
                    boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
                    '&:hover': { bgcolor: C.accentDk },
                    '&.Mui-disabled': { bgcolor: alpha(C.accent, 0.4), color: '#fff' },
                  }}
                >
                  {loading ? t.form.loading : t.form.submit}
                </Button>
              </Box>
            )}
          </Box>

          {/* Info panel */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'sticky', top: 100 }}>
            <Box sx={{ bgcolor: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '20px', p: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: C.text, mb: 2 }}>{t.info.title}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {t.info.items.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: C.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ fontSize: '0.85rem', color: C.textMid, fontWeight: 500 }}>{item.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`, borderRadius: '20px', p: 3, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.8rem', color: C.textMute, mb: 1.5 }}>{t.info.or}</Typography>
              <Link href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth startIcon={<FiCalendar size={15}/>}
                  sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '12px', py: 1.25, '&:hover': { bgcolor: C.accentDk } }}
                >
                  {t.info.calendly}
                </Button>
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, justifyContent: 'center' }}>
                <FiMail size={13} color={C.textMute}/>
                <Typography sx={{ fontSize: '0.8rem', color: C.textMute }}>{t.info.email}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}