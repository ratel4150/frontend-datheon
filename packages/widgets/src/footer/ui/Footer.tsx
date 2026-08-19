// File: frontend-datheon/packages/widgets/src/footer/ui/Footer.tsx
'use client'

import { Box, Container, Typography, alpha } from '@mui/material'
import {
  FaXTwitter, FaLinkedinIn, FaInstagram, FaGithub,
} from 'react-icons/fa6'
import {
  FiMail, FiCalendar, FiArrowUpRight,
} from 'react-icons/fi'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ─── Tokens ──────────────────────────────────────────────────
const C = {
  bg:       '#0A0C10',
  bgCard:   '#0F1117',
  border:   'rgba(255,255,255,0.07)',
  text:     '#F5F7FA',
  textMid:  '#8891AA',
  textMute: '#4A5068',
  accent:   '#00AEEF',
  accentDk: '#0095cc',
  accentBg: 'rgba(0,174,239,0.08)',
} as const

// ─── Data ────────────────────────────────────────────────────
const services = [
  { label: 'AI / Agentes Autónomos', href: '#services' },
  { label: 'Web / SaaS',             href: '#services' },
  { label: 'IoT & Hardware',         href: '#services' },
  { label: 'Cloud & DevOps',         href: '#services' },
  { label: 'Odoo ERP',               href: '#services' },
  { label: 'Apps Móviles',           href: '#services' },
]

const company = [
  { label: 'Nosotros',    href: '/nosotros' },
  { label: 'Proceso',     href: '#process'  },
  { label: 'Equipo',      href: '#team'     },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'Contacto',    href: '/contact'  },
  { label: 'Privacidad',  href: '/privacy'  },
]

const socials = [
  { Icon: FaXTwitter,   href: 'https://x.com/Datheon_team',         label: 'X / Twitter' },
  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/datheon-io',   label: 'LinkedIn'    },
  { Icon: FaInstagram,  href: 'https://www.instagram.com/team.datheon',  label: 'Instagram'   },
  { Icon: FaGithub,     href: 'https://github.com/Datheon',     label: 'GitHub'      },
]

const tech = ['Next.js 15', 'FastAPI', 'Groq', 'pgvector', 'Flutter', 'Terraform']

// ─── Link component ──────────────────────────────────────────
function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const isAnchor = href.startsWith('#')
  const isExternal = external || href.startsWith('http')

  return (
    <Box
      component={isAnchor ? 'a' : Link}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'flex', alignItems: 'center', gap: 0.5,
        color: C.textMid, fontSize: '0.85rem',
        textDecoration: 'none', fontWeight: 400,
        transition: 'color 0.18s ease',
        '&:hover': { color: C.accent },
      }}
    >
      {label}
      {isExternal && <FiArrowUpRight size={11} style={{ opacity: 0.6 }}/>}
    </Box>
  )
}

// ─── Main ────────────────────────────────────────────────────
export default function FooterDatheon() {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'es'

  return (
    <Box
      component="footer"
      sx={{ bgcolor: C.bg, color: C.text, pt: { xs: 6, md: 8 }, pb: 4 }}
    >
      <Container maxWidth="lg">

        {/* ── Top CTA banner ── */}
        <Box sx={{
          bgcolor: C.bgCard,
          border: `1px solid ${C.border}`,
          borderRadius: '20px',
          p: { xs: 3, md: 4 },
          mb: { xs: 6, md: 8 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Glow */}
          <Box sx={{
            position: 'absolute', top: -40, right: -40,
            width: 200, height: 200, borderRadius: '50%',
            bgcolor: C.accent, filter: 'blur(80px)', opacity: 0.08,
            pointerEvents: 'none',
          }}/>

          <Box>
            <Typography sx={{
              fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: C.text, lineHeight: 1.2, mb: 0.5,
            }}>
              ¿Listo para empezar tu proyecto?
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', color: C.textMid }}>
              Primera consulta gratuita · Respuesta en menos de 24 horas
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0, flexWrap: 'wrap' }}>
            <Box
              component={Link}
              href={`/${lang}/contact`}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                px: 2.5, py: 1.25,
                bgcolor: C.accent, color: '#fff',
                borderRadius: '12px', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.875rem',
                transition: 'background 0.2s ease',
                '&:hover': { bgcolor: C.accentDk },
              }}
            >
              <FiMail size={15}/>
              Escribirnos
            </Box>
            <Box
              component="a"
              href="https://calendly.com/team_datheon/consulta-gratuita"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                px: 2.5, py: 1.25,
                bgcolor: 'transparent', color: C.accent,
                border: `1px solid ${alpha(C.accent, 0.35)}`,
                borderRadius: '12px', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: C.accentBg,
                  borderColor: C.accent,
                },
              }}
            >
              <FiCalendar size={15}/>
              Agendar llamada
            </Box>
          </Box>
        </Box>

        {/* ── Main grid ── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: '2fr 1fr 1fr 1fr',
          },
          gap: { xs: 4, md: 6 },
          mb: 6,
        }}>

          {/* Brand column */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: '10px',
                bgcolor: C.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '1.1rem', color: '#fff',
                fontFamily: 'Arial Black, sans-serif',
              }}>
                D
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: C.text }}>
                Datheón
              </Typography>
            </Box>

            <Typography sx={{
              fontSize: '0.85rem', color: C.textMid,
              lineHeight: 1.75, maxWidth: 280, mb: 3,
            }}>
              Consultora tecnológica especializada en AI SaaS, agentes autónomos,
              desarrollo web, IoT y Cloud. Transformamos empresas con tecnología real.
            </Typography>

            {/* Socials */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socials.map(({ Icon, href, label }) => (
                <Box
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  sx={{
                    width: 34, height: 34,
                    borderRadius: '9px',
                    border: `1px solid ${C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: C.textMid,
                    transition: 'all 0.18s ease',
                    '&:hover': {
                      color: C.accent,
                      borderColor: alpha(C.accent, 0.4),
                      bgcolor: C.accentBg,
                    },
                  }}
                >
                  <Icon size={15}/>
                </Box>
              ))}
            </Box>

            {/* Tech stack badges */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 3 }}>
              {tech.map(t => (
                <Box
                  key={t}
                  sx={{
                    px: 1, py: 0.35,
                    bgcolor: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${C.border}`,
                    borderRadius: '6px',
                    fontSize: '0.68rem', fontWeight: 600,
                    color: C.textMute, letterSpacing: '0.03em',
                  }}
                >
                  {t}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Servicios */}
          <Box>
            <Typography sx={{
              fontSize: '0.7rem', fontWeight: 700, color: C.textMute,
              letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2,
            }}>
              Servicios
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {services.map(s => (
                <FooterLink key={s.label} href={s.href} label={s.label}/>
              ))}
            </Box>
          </Box>

          {/* Compañía */}
          <Box>
            <Typography sx={{
              fontSize: '0.7rem', fontWeight: 700, color: C.textMute,
              letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2,
            }}>
              Compañía
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {company.map(c => (
                <FooterLink
                  key={c.label}
                  href={c.href.startsWith('/')
                    ? c.href === '/contact' || c.href === '/privacy'
                      ? `/${lang}${c.href}`
                      : c.href
                    : c.href
                  }
                  label={c.label}
                />
              ))}
            </Box>
          </Box>

          {/* Contacto */}
          <Box>
            <Typography sx={{
              fontSize: '0.7rem', fontWeight: 700, color: C.textMute,
              letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2,
            }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: C.textMute, mb: 0.4 }}>
                  Email
                </Typography>
                <Box
                  component="a"
                  href="mailto:hola@datheon.com"
                  sx={{
                    fontSize: '0.85rem', color: C.textMid,
                    textDecoration: 'none',
                    '&:hover': { color: C.accent },
                  }}
                >
                  hola@datheon.com
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: C.textMute, mb: 0.4 }}>
                  Horario
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: C.textMid }}>
                  Lun – Vie, 9am – 6pm CST
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: C.textMute, mb: 0.4 }}>
                  Idiomas
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: C.textMid }}>
                  Español · English · Français
                </Typography>
              </Box>

              {/* Status indicator */}
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.75,
                px: 1.25, py: 0.6,
                bgcolor: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '100px',
                width: 'fit-content',
              }}>
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%',
                  bgcolor: '#22C55E',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%,100%': { opacity: 1 },
                    '50%': { opacity: 0.4 },
                  },
                }}/>
                <Typography sx={{ fontSize: '0.72rem', color: '#22C55E', fontWeight: 600 }}>
                  Aceptando proyectos
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── Divider ── */}
        <Box sx={{ height: 1, bgcolor: C.border, mb: 3 }}/>

        {/* ── Bottom bar ── */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'center' },
          justifyContent: 'space-between',
          gap: 1.5,
          textAlign: { xs: 'center', sm: 'left' },
        }}>
          <Typography sx={{ fontSize: '0.78rem', color: C.textMute }}>
            © {new Date().getFullYear()} Datheón. Todos los derechos reservados.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Box
              component={Link}
              href={`/${lang}/privacy`}
              sx={{
                fontSize: '0.78rem', color: C.textMute,
                textDecoration: 'none',
                '&:hover': { color: C.accent },
              }}
            >
              Aviso de privacidad
            </Box>
            <Box
              component={Link}
              href={`/${lang}/contact`}
              sx={{
                fontSize: '0.78rem', color: C.textMute,
                textDecoration: 'none',
                '&:hover': { color: C.accent },
              }}
            >
              Contacto
            </Box>
          </Box>

          <Typography sx={{ fontSize: '0.72rem', color: C.textMute }}>
            Hecho con ❤️ en México
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}