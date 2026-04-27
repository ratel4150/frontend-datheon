// File: frontend-datheon/components/universidad/CertificadoView.tsx
'use client'

import { Box, Typography, Button, alpha } from '@mui/material'
import { FiExternalLink, FiShare2, FiDownload } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const C = {
  bg:       '#F8F6F1',
  bgDark:   '#0A0C10',
  border:   '#D4CFC4',
  text:     '#1A1A2E',
  muted:    '#6B6560',
  accent:   '#00AEEF',
  gold:     '#C4973A',
  green:    '#2D7D4F',
} as const

interface Props {
  cert: {
    id:          string
    userName:    string
    courseTitle: { es: string; en: string; fr: string }
    issuedAt:    Date
    courseId:    string
  }
  course: {
    icon:  string
    color: string
  }
  hours: number
  certUrl: string
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function CertificadoView({ cert, course, hours, certUrl }: Props) {
  const certRef   = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const shortId = cert.id.split('-')[0].toUpperCase()

  const handleDownload = async () => {
    if (!certRef.current) return
    setDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF       = (await import('jspdf')).default

      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#FDFAF4',
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf     = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 3, canvas.height / 3] })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 3, canvas.height / 3)
      pdf.save(`certificado-${cert.userName.replace(/\s+/g, '-').toLowerCase()}-${shortId}.pdf`)
    } finally {
      setDownloading(false)
    }
  }

  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Certificado de ${cert.courseTitle.es}`,
        text: `${cert.userName} completó ${cert.courseTitle.es} en Universidad Datheón`,
        url: certUrl,
      })
    } else {
      await navigator.clipboard.writeText(certUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.courseTitle.es)}&organizationName=Dathe%C3%B3n&issueYear=${new Date(cert.issuedAt).getFullYear()}&issueMonth=${new Date(cert.issuedAt).getMonth() + 1}&certUrl=${encodeURIComponent(certUrl)}&certId=${cert.id}`

  return (
    <Box sx={{
      bgcolor: C.bg,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 2, md: 4 },
      fontFamily: 'Georgia, serif',
      // Fondo texturizado
      backgroundImage: `
        radial-gradient(ellipse at 20% 50%, rgba(196,151,58,0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0,174,239,0.05) 0%, transparent 50%)
      `,
    }}>

      {/* ── Certificado ── */}
      <Box
        ref={certRef}
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          width: '100%',
          maxWidth: 820,
          bgcolor: '#FDFAF4',
          border: `1px solid ${C.border}`,
          // Doble borde estilo diploma
          outline: '6px solid #FDFAF4',
          outlineOffset: '-14px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.12)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Barra superior del color del curso */}
        <Box sx={{ height: 6, background: `linear-gradient(90deg, ${course.color}, ${C.gold})` }}/>

        {/* Esquinas decorativas */}
        {[
          { top: 18, left: 18 },
          { top: 18, right: 18 },
          { bottom: 18, left: 18 },
          { bottom: 18, right: 18 },
        ].map((pos, i) => (
          <Box key={i} sx={{
            position: 'absolute', ...pos,
            width: 24, height: 24,
            borderTop: i < 2 ? `2px solid ${C.gold}` : 'none',
            borderBottom: i >= 2 ? `2px solid ${C.gold}` : 'none',
            borderLeft: i % 2 === 0 ? `2px solid ${C.gold}` : 'none',
            borderRight: i % 2 === 1 ? `2px solid ${C.gold}` : 'none',
          }}/>
        ))}

        <Box sx={{ p: { xs: 4, md: 6 } }}>

          {/* Header: logo + verification box (como Stanford + Udemy) */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 5 }}>
            {/* Logo */}
            <Box>
              <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: C.text, letterSpacing: '-0.02em', lineHeight: 1 }}>
                Dathe<Box component="span" sx={{ color: course.color }}>ó</Box>n
              </Typography>
              <Typography sx={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: C.muted, textTransform: 'uppercase', fontFamily: 'sans-serif', mt: 0.25 }}>
                Universidad
              </Typography>
            </Box>

            {/* Verification box (estilo Udemy) */}
            <Box sx={{
              border: `1.5px solid ${C.gold}`,
              borderRadius: '3px',
              px: 2, py: 1.25,
              textAlign: 'right',
              maxWidth: 280,
            }}>
              <Typography sx={{ fontSize: '0.65rem', color: C.muted, fontFamily: 'sans-serif', mb: 0.25 }}>
                Certificate ID: <Box component="span" sx={{ color: C.text, fontWeight: 600, fontFamily: 'monospace' }}>{shortId}</Box>
              </Typography>
              <Typography sx={{ fontSize: '0.65rem', color: C.muted, fontFamily: 'sans-serif', mb: 0.25 }}>
                Verify at:
              </Typography>
              <Typography sx={{ fontSize: '0.6rem', color: course.color, fontFamily: 'monospace', wordBreak: 'break-all' }}>
                datheon.io/certificado/{cert.id.substring(0, 18)}...
              </Typography>
            </Box>
          </Box>

          {/* Tipo de certificado */}
          <Typography sx={{
            fontSize: '0.7rem', letterSpacing: '0.2em', color: C.muted,
            textTransform: 'uppercase', fontFamily: 'sans-serif', mb: 2,
          }}>
            Certificado de Finalización
          </Typography>

          {/* Nombre del estudiante (grande como freeCodeCamp) */}
          <Typography sx={{
            fontFamily: 'Georgia, serif',
            fontSize: { xs: '2.2rem', md: '3rem' },
            fontWeight: 700,
            color: C.text,
            lineHeight: 1.1,
            mb: 1.5,
            letterSpacing: '-0.02em',
          }}>
            {cert.userName}
          </Typography>

          <Typography sx={{ fontSize: '0.95rem', color: C.muted, fontFamily: 'sans-serif', mb: 0.75 }}>
            ha completado satisfactoriamente el curso
          </Typography>

          {/* Nombre del curso (bold como Platzi) */}
          <Typography sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: { xs: '1.4rem', md: '1.8rem' },
            color: C.text,
            mb: 0.5,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
          }}>
            {course.icon} {cert.courseTitle.es}
          </Typography>

          <Typography sx={{ fontSize: '0.82rem', color: C.muted, fontFamily: 'sans-serif', mb: 1 }}>
            ofrecido por Universidad Datheón · {formatDate(cert.issuedAt)}
          </Typography>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.75, py: 0.6, bgcolor: alpha(C.gold, 0.08), border: `1px solid ${alpha(C.gold, 0.3)}`, borderRadius: '100px', mb: 4 }}>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: C.gold, fontFamily: 'sans-serif' }}>
              ⏱ {hours} horas de estudio y práctica
            </Typography>
          </Box>

          {/* Divider con sello (estilo Stanford) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <Box sx={{ flex: 1, height: '1px', bgcolor: C.border }}/>
            {/* Sello circular */}
            <Box sx={{
              width: 80, height: 80, borderRadius: '50%',
              border: `2px solid ${C.gold}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
            }}>
              <Box sx={{
                position: 'absolute', inset: 4, borderRadius: '50%',
                border: `1px dashed ${C.gold}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }}>{course.icon}</Typography>
                <Typography sx={{ fontSize: '0.45rem', letterSpacing: '0.12em', color: C.gold, textTransform: 'uppercase', fontFamily: 'sans-serif', mt: 0.25 }}>Datheón</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, height: '1px', bgcolor: C.border }}/>
          </Box>

          {/* Firma + fecha (estilo Stanford/freeCodeCamp) */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 3 }}>
            <Box>
              {/* Firma simulada */}
              <Box sx={{
                fontFamily: '"Dancing Script", "Brush Script MT", cursive',
                fontSize: '1.8rem',
                color: C.text,
                lineHeight: 1,
                mb: 0.5,
                opacity: 0.7,
              }}>
                Datheón Team
              </Box>
              <Box sx={{ width: 140, height: '1px', bgcolor: C.border, mb: 0.5 }}/>
              <Typography sx={{ fontSize: '0.72rem', color: C.muted, fontFamily: 'sans-serif' }}>Universidad Datheón</Typography>
              <Typography sx={{ fontSize: '0.68rem', color: C.muted, fontFamily: 'sans-serif' }}>datheon.io</Typography>
            </Box>

            {/* Fecha de emisión */}
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '0.65rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'sans-serif', mb: 0.25 }}>
                Fecha de emisión
              </Typography>
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: C.text, fontFamily: 'sans-serif' }}>
                {formatDate(cert.issuedAt)}
              </Typography>
            </Box>
          </Box>

          {/* Verification footer (freeCodeCamp style) */}
          <Box sx={{ mt: 4, pt: 2.5, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Typography sx={{ fontSize: '0.68rem', color: C.muted, fontFamily: 'monospace' }}>
              Verificar en: datheon.io/certificado/{cert.id}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.25, py: 0.4, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.3)}`, borderRadius: '100px' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: C.green }}/>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: C.green, fontFamily: 'sans-serif', letterSpacing: '0.05em' }}>
                VERIFICADO
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Acciones ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        sx={{ display: 'flex', gap: 1.5, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Button component="a" href={linkedInUrl} target="_blank" rel="noopener noreferrer" variant="contained"
          startIcon={<FiExternalLink size={14}/>}
          sx={{ bgcolor: '#0A66C2', color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '8px', px: 2.5, fontFamily: 'sans-serif', '&:hover': { bgcolor: '#0958a8' } }}>
          Agregar a LinkedIn
        </Button>
        <Button onClick={handleDownload} variant="outlined" disabled={downloading}
          startIcon={downloading ? <span style={{fontSize:'12px'}}>...</span> : <FiDownload size={14}/>}
          sx={{ borderColor: C.border, color: C.muted, fontWeight: 600, textTransform: 'none', borderRadius: '8px', px: 2.5, fontFamily: 'sans-serif', '&:hover': { borderColor: course.color, color: course.color } }}>
          {downloading ? 'Generando PDF...' : 'Descargar PDF'}
        </Button>
        {/* WhatsApp */}
        <Button component="a"
          href={`https://wa.me/?text=${encodeURIComponent(`🎓 Completé el curso de ${cert.courseTitle.es} en Universidad Datheón\n${certUrl}`)}`}
          target="_blank" rel="noopener noreferrer" variant="outlined"
          sx={{ borderColor: '#25D366', color: '#25D366', fontWeight: 600, textTransform: 'none', borderRadius: '8px', px: 2, fontFamily: 'sans-serif', minWidth: 0, '&:hover': { bgcolor: 'rgba(37,211,102,0.08)' } }}>
          WhatsApp
        </Button>

        {/* X / Twitter */}
        <Button component="a"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🎓 Completé el curso de ${cert.courseTitle.es} en @datheon_io`)}&url=${encodeURIComponent(certUrl)}`}
          target="_blank" rel="noopener noreferrer" variant="outlined"
          sx={{ borderColor: '#1DA1F2', color: '#1DA1F2', fontWeight: 600, textTransform: 'none', borderRadius: '8px', px: 2, fontFamily: 'sans-serif', minWidth: 0, '&:hover': { bgcolor: 'rgba(29,161,242,0.08)' } }}>
          X / Twitter
        </Button>

        {/* Copiar link */}
        <Button onClick={handleShare} variant="outlined" startIcon={<FiShare2 size={14}/>}
          sx={{ borderColor: C.border, color: C.muted, fontWeight: 600, textTransform: 'none', borderRadius: '8px', px: 2, fontFamily: 'sans-serif', '&:hover': { borderColor: course.color, color: course.color } }}>
          {copied ? '¡Copiado!' : 'Copiar link'}
        </Button>
      </Box>
    </Box>
  )
}