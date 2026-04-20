'use client'

import {
  AppBar, Toolbar, IconButton, Typography, Stack, Box,
  Drawer, List, ListItem, Button, useMediaQuery, useTheme,
  Collapse, Divider, alpha,
} from '@mui/material'
import {
  FaMoon, FaBars, FaChevronDown, FaChevronUp,
} from 'react-icons/fa'
import {
  FiBook, FiBookmark, FiBriefcase, FiCalendar, FiChevronDown,
  FiChevronRight, FiChevronUp, FiCode, FiDollarSign, FiGrid,
  FiHeart, FiLayers, FiMenu, FiArrowRight, FiTool, FiX,
  FiZap,
} from 'react-icons/fi'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import datheonLogo from '@/assets/logo/letra-d (4).png'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// ─── Tokens ───────────────────────────────────────────────────
const C = {
  bg:        '#ffffff',
  bgSub:     '#fafbfc',
  border:    '#ebebeb',
  borderSub: 'rgba(0,174,239,0.15)',
  text:      '#0B0F2B',
  textMid:   '#4A5068',
  textMute:  '#8891AA',
  accent:    '#00AEEF',
  accentDk:  '#0095cc',
  accentBg:  'rgba(0,174,239,0.07)',
  accentLine:'rgba(0,174,239,0.18)',
} as const

// ─── Types ────────────────────────────────────────────────────
type Lang = 'es' | 'en' | 'fr'
type Props = { currentLang: string }

interface SubItem {
  label: string
  path: string
  description: string
  icon: React.ReactNode
}

// ─── Data ─────────────────────────────────────────────────────
const servicesData: Record<Lang, SubItem[]> = {
  es: [
    { label: 'Consultoría TI',  path: '/servicios/consultoria',    description: 'Estrategia y arquitectura tecnológica', icon: <FiBriefcase size={15}/> },
    { label: 'Desarrollo Web',  path: '/servicios/desarrollo-web', description: 'Apps web y móviles a medida',           icon: <FiCode size={15}/> },
    { label: 'Soporte Técnico', path: '/servicios/soporte',        description: 'Asistencia especializada continua',     icon: <FiTool size={15}/> },
  ],
  en: [
    { label: 'IT Consulting',     path: '/services/consulting',      description: 'Technology strategy and architecture', icon: <FiBriefcase size={15}/> },
    { label: 'Web Development',   path: '/services/web-development', description: 'Custom web and mobile applications',   icon: <FiCode size={15}/> },
    { label: 'Technical Support', path: '/services/support',         description: 'Specialized ongoing assistance',       icon: <FiTool size={15}/> },
  ],
  fr: [
    { label: 'Consultance IT',    path: '/services/consultance',       description: 'Stratégie et architecture technologique', icon: <FiBriefcase size={15}/> },
    { label: 'Développement Web', path: '/services/developpement-web', description: 'Applications web et mobiles sur mesure',  icon: <FiCode size={15}/> },
    { label: 'Support Technique', path: '/services/support',           description: 'Assistance spécialisée continue',          icon: <FiTool size={15}/> },
  ],
}

const sectorsData: Record<Lang, SubItem[]> = {
  es: [
    { label: 'Finanzas',  path: '/sectores/finanzas',  description: 'Banca digital e inversión',          icon: <FiDollarSign size={15}/> },
    { label: 'Salud',     path: '/sectores/salud',     description: 'Hospitales y telemedicina',           icon: <FiHeart size={15}/> },
    { label: 'Educación', path: '/sectores/educacion', description: 'Plataformas de aprendizaje adaptativo', icon: <FiBook size={15}/> },
  ],
  en: [
    { label: 'Finance',   path: '/sectors/finance',   description: 'Banking and investment tech',        icon: <FiDollarSign size={15}/> },
    { label: 'Health',    path: '/sectors/health',    description: 'Hospitals and telemedicine',          icon: <FiHeart size={15}/> },
    { label: 'Education', path: '/sectors/education', description: 'Adaptive learning platforms',         icon: <FiBook size={15}/> },
  ],
  fr: [
    { label: 'Finance',    path: '/secteurs/finance',    description: 'Banque et technologie financière',      icon: <FiDollarSign size={15}/> },
    { label: 'Santé',      path: '/secteurs/sante',      description: 'Hôpitaux et télémédecine',              icon: <FiHeart size={15}/> },
    { label: 'Éducation',  path: '/secteurs/education',  description: "Plateformes d'apprentissage adaptatif", icon: <FiBook size={15}/> },
  ],
}

const t = {
  services:   { es: 'Servicios',           en: 'Services',           fr: 'Services'           },
  sectors:    { es: 'Sectores',            en: 'Sectors',            fr: 'Secteurs'           },
  university: { es: 'Universidad Datheón', en: 'Datheón University', fr: 'Université Datheón' },
  viewAllSvc: { es: 'Ver todos los servicios', en: 'View all services', fr: 'Voir tous les services' },
  viewAllSec: { es: 'Ver todos los sectores',  en: 'See all sectors',   fr: 'Voir tous les secteurs' },
  schedule:   { es: 'Agendar reunión',     en: 'Schedule meeting',   fr: 'Planifier une réunion' },
  menu:       { es: 'Menú',               en: 'Menu',               fr: 'Menu'               },
  darkMode:   { es: 'Modo Oscuro / Claro', en: 'Dark / Light Mode',  fr: 'Mode Sombre / Clair'},
}
const tx = (key: keyof typeof t, lang: string) =>
  t[key][(lang as Lang) in t[key] ? (lang as Lang) : 'es']

// ─── Dropdown menu ────────────────────────────────────────────
function DropdownMenu({
  items, viewAllPath, viewAllLabel, open,
}: {
  items: SubItem[]
  viewAllPath: string
  viewAllLabel: string
  open: boolean
}) {
  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{   opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0,
            width: 300,
            bgcolor: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            zIndex: 1400,
            // Accent top bar
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '2px',
              bgcolor: C.accent,
              borderRadius: '14px 14px 0 0',
            },
          }}
        >
          {/* Items */}
          <Box sx={{ pt: 1.5, px: 1 }}>
            {items.map((item) => (
              <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 1.5,
                    py: 1.25,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    mb: 0.25,
                    '&:hover': {
                      bgcolor: C.accentBg,
                      '& .item-icon': { bgcolor: C.accent, color: '#fff' },
                      '& .item-title': { color: C.accent },
                      '& .item-arrow': { opacity: 1, transform: 'translateX(2px)' },
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="item-icon"
                    sx={{
                      width: 34, height: 34,
                      borderRadius: '9px',
                      bgcolor: C.accentBg,
                      color: C.accent,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* Text */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      className="item-title"
                      sx={{
                        fontSize: '0.875rem', fontWeight: 600,
                        color: C.text, lineHeight: 1.3,
                        transition: 'color 0.15s',
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: C.textMute, mt: 0.2, lineHeight: 1.3 }}>
                      {item.description}
                    </Typography>
                  </Box>

                  {/* Arrow */}
                  <Box
                    className="item-arrow"
                    sx={{ color: C.accent, opacity: 0, transition: 'all 0.15s ease', flexShrink: 0 }}
                  >
                    <FiChevronRight size={14}/>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>

          {/* Footer */}
          <Divider sx={{ mx: 2, my: 1, borderColor: C.border }} />
          <Box sx={{ px: 2, pb: 1.5 }}>
            <Link href={viewAllPath} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75,
                  py: 1, borderRadius: '8px',
                  transition: 'all 0.15s ease',
                  '&:hover': { bgcolor: C.accentBg },
                }}
              >
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: C.accent }}>
                  {viewAllLabel}
                </Typography>
                <FiArrowRight size={13} color={C.accent}/>
              </Box>
            </Link>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  )
}

// ─── NavItem (desktop trigger) ────────────────────────────────
function NavItem({
  label, isOpen, onToggle, children,
}: {
  label: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onToggle()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, onToggle])

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex', alignItems: 'center', gap: 0.5,
          px: 1, py: 0.5, borderRadius: '8px',
          cursor: 'pointer', userSelect: 'none',
          color: isOpen ? C.accent : C.textMid,
          fontWeight: 500, fontSize: '0.9rem',
          transition: 'all 0.15s ease',
          '&:hover': { color: C.accent, bgcolor: C.accentBg },
        }}
      >
        {label}
        <Box
          component={motion.div}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          sx={{ display: 'flex', color: 'inherit' }}
        >
          <FiChevronDown size={14}/>
        </Box>
      </Box>
      {children}
    </Box>
  )
}

// ─── Mobile accordion item ────────────────────────────────────
function MobileNavGroup({
  label, icon, isOpen, onToggle, items, viewAllPath, viewAllLabel,
}: {
  label: string, icon: React.ReactNode, isOpen: boolean, onToggle: () => void,
  items: SubItem[], viewAllPath: string, viewAllLabel: string,
}) {
  const router = useRouter()
  return (
    <>
      <ListItem
        component={motion.div}
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
        sx={{
          borderRadius: '12px',
          mb: 0.5, px: 1.5, py: 1.25,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer',
          bgcolor: isOpen ? C.accentBg : 'transparent',
          borderLeft: isOpen ? `3px solid ${C.accent}` : '3px solid transparent',
          transition: 'all 0.2s ease',
          '&:hover': { bgcolor: C.accentBg },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: '10px',
            bgcolor: isOpen ? alpha(C.accent, 0.15) : C.accentBg,
            color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}>
            {icon}
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: C.text }}>
            {label}
          </Typography>
        </Box>
        <Box component={motion.div} animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}
          sx={{ color: C.textMute }}>
          <FiChevronDown size={16}/>
        </Box>
      </ListItem>

      <Collapse in={isOpen} timeout={220} unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2, mb: 0.5 }}>
          {items.map(({ label: lbl, path, icon: ic }) => (
            <ListItem
              key={path}
              component={motion.div}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(path)}
              sx={{
                borderRadius: '10px', mb: 0.25, px: 1.5, py: 1,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5,
                '&:hover': { bgcolor: C.accentBg },
              }}
            >
              <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: C.accentBg,
                color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {ic}
              </Box>
              <Typography sx={{ fontSize: '0.875rem', color: C.textMid, fontWeight: 500 }}>
                {lbl}
              </Typography>
            </ListItem>
          ))}
          {/* View all */}
          <ListItem
            component={motion.div}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(viewAllPath)}
            sx={{
              borderRadius: '10px', px: 1.5, py: 0.75,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1,
              '&:hover': { bgcolor: C.accentBg },
            }}
          >
            <FiArrowRight size={13} color={C.accent}/>
            <Typography sx={{ fontSize: '0.8rem', color: C.accent, fontWeight: 600 }}>
              {viewAllLabel}
            </Typography>
          </ListItem>
        </List>
      </Collapse>
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────
export function AppBarMain({ currentLang }: Props) {
  const lang = (currentLang as Lang) in t.services ? (currentLang as Lang) : 'es'
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const router = useRouter()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { if (!isMobile) setDrawerOpen(false) }, [isMobile])

  const toggleMenu = (name: string) =>
    setOpenMenu(prev => prev === name ? null : name)

  const currentServices = servicesData[lang]
  const currentSectors  = sectorsData[lang]

  return (
    <>
      <AppBar
          position="sticky"
          elevation={0}
          sx={{
            animation: 'slideDown 0.4s ease forwards',
            '@keyframes slideDown': {
              from: { transform: 'translateY(-100%)', opacity: 0 },
              to: { transform: 'translateY(0)', opacity: 1 },
            },
            bgcolor: C.bg,
            color: C.text,
            borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.3s ease',
            zIndex: 1300,
          }}
        >
          <Toolbar sx={{ px: { xs: 2, md: 3, lg: 4 }, minHeight: { xs: 60, md: 68 }, gap: 2 }}>

            {/* ── Logo ── */}
            <Stack
              direction="row" spacing={1.5} alignItems="center"
              onClick={() => router.push('/')}
              sx={{
                cursor: 'pointer', flexShrink: 0,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.85 },
              }}
            >
              <Box sx={{
                width: 40, height: 40, borderRadius: '10px',
                border: `1px solid ${C.accentLine}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', position: 'relative', flexShrink: 0,
                bgcolor: alpha(C.accent, 0.04),
              }}>
                <Image src={datheonLogo} alt="Datheón Logo" fill style={{ objectFit: 'contain', padding: 6 }} sizes="40px" priority/>
              </Box>

              <Box>
                <Typography sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 800, fontSize: '1.2rem',
                  color: C.text, lineHeight: 1, letterSpacing: '-0.01em',
                }}>
                  Dathe<Box component="span" sx={{ color: C.accent }}>ó</Box>n
                </Typography>
                <Typography sx={{
                  fontSize: '0.6rem', letterSpacing: '0.12em',
                  color: C.textMute, fontWeight: 600, textTransform: 'uppercase',
                  lineHeight: 1, mt: 0.3,
                }}>
                  Smart Tech Solutions
                </Typography>
              </Box>
            </Stack>

            {/* ── Desktop Nav ── */}
            {!isMobile && (
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexGrow: 1, pl: 3 }}>
                <NavItem
                  label={tx('services', lang)}
                  isOpen={openMenu === 'services'}
                  onToggle={() => toggleMenu('services')}
                >
                  <DropdownMenu
                    items={currentServices}
                    viewAllPath={`/${lang}/servicios`}
                    viewAllLabel={tx('viewAllSvc', lang)}
                    open={openMenu === 'services'}
                  />
                </NavItem>

                <NavItem
                  label={tx('sectors', lang)}
                  isOpen={openMenu === 'sectors'}
                  onToggle={() => toggleMenu('sectors')}
                >
                  <DropdownMenu
                    items={currentSectors}
                    viewAllPath={`/${lang}/sectores`}
                    viewAllLabel={tx('viewAllSec', lang)}
                    open={openMenu === 'sectors'}
                  />
                </NavItem>

                <Box
                  onClick={() => router.push('/universidad')}
                  sx={{
                    px: 1, py: 0.5, borderRadius: '8px', cursor: 'pointer',
                    fontWeight: 500, fontSize: '0.9rem', color: C.textMid,
                    transition: 'all 0.15s ease',
                    '&:hover': { color: C.accent, bgcolor: C.accentBg },
                  }}
                >
                  {tx('university', lang)}
                </Box>
              </Stack>
            )}

            {/* ── Right side ── */}
            <Stack direction="row" spacing={0.75} alignItems="center" sx={{ ml: 'auto' }}>
              <LanguageSwitcher currentLang={currentLang}/>

              <IconButton
                size="small"
                title={tx('darkMode', lang)}
                sx={{ color: C.textMute, '&:hover': { color: C.accent, bgcolor: C.accentBg } }}
              >
                <FaMoon size={15}/>
              </IconButton>

              {isDesktop && (
                <Link href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<FiCalendar size={14}/>}
                    sx={{
                      bgcolor: C.accent,
                      color: '#fff',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: '10px',
                      px: 2.25,
                      py: 0.85,
                      fontSize: '0.85rem',
                      whiteSpace: 'nowrap',
                      boxShadow: `0 2px 8px ${alpha(C.accent, 0.35)}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: C.accentDk,
                        boxShadow: `0 4px 14px ${alpha(C.accent, 0.45)}`,
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    {tx('schedule', lang)}
                  </Button>
                </Link>
              )}

              {isMobile && (
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Abrir menú"
                  sx={{
                    border: `1px solid ${C.border}`, borderRadius: '10px',
                    color: C.textMid, width: 38, height: 38,
                    '&:hover': { bgcolor: C.accentBg, color: C.accent, borderColor: C.accentLine },
                  }}
                >
                  <FiMenu size={18}/>
                </IconButton>
              )}
            </Stack>
          </Toolbar>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setOpenMenu(null) }}
        PaperProps={{
          sx: {
            width: { xs: '100vw', sm: 360 },
            bgcolor: C.bg,
            boxShadow: '-4px 0 40px rgba(0,0,0,0.10)',
            borderLeft: `1px solid ${C.border}`,
          },
        }}
        ModalProps={{ disableScrollLock: true }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* Drawer header */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2.5, py: 2,
            borderBottom: `1px solid ${C.border}`,
          }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{
                width: 36, height: 36, borderRadius: '9px',
                border: `1px solid ${C.accentLine}`,
                overflow: 'hidden', position: 'relative', flexShrink: 0,
                bgcolor: alpha(C.accent, 0.04),
              }}>
                <Image src={datheonLogo} alt="Datheón Logo" fill style={{ objectFit: 'contain', padding: 5 }} sizes="36px"/>
              </Box>
              <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: C.text }}>
                Dathe<Box component="span" sx={{ color: C.accent }}>ó</Box>n
              </Typography>
            </Stack>
            <IconButton
              onClick={() => { setDrawerOpen(false); setOpenMenu(null) }}
              sx={{
                color: C.textMute, border: `1px solid ${C.border}`, borderRadius: '9px',
                width: 34, height: 34,
                '&:hover': { bgcolor: C.accentBg, color: C.accent, borderColor: C.accentLine },
              }}
            >
              <FiX size={16}/>
            </IconButton>
          </Box>

          {/* Drawer nav */}
          <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 2 }}>
            <List disablePadding>
              <MobileNavGroup
                label={tx('services', lang)}
                icon={<FiLayers size={17}/>}
                isOpen={openMenu === 'services'}
                onToggle={() => toggleMenu('services')}
                items={currentServices}
                viewAllPath={`/${lang}/servicios`}
                viewAllLabel={tx('viewAllSvc', lang)}
              />

              <MobileNavGroup
                label={tx('sectors', lang)}
                icon={<FiGrid size={17}/>}
                isOpen={openMenu === 'sectors'}
                onToggle={() => toggleMenu('sectors')}
                items={currentSectors}
                viewAllPath={`/${lang}/sectores`}
                viewAllLabel={tx('viewAllSec', lang)}
              />

              {/* Universidad */}
              <ListItem
                component={motion.div}
                whileTap={{ scale: 0.99 }}
                onClick={() => { router.push('/universidad'); setDrawerOpen(false) }}
                sx={{
                  borderRadius: '12px', mb: 0.5, px: 1.5, py: 1.25,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5,
                  borderLeft: '3px solid transparent',
                  '&:hover': { bgcolor: C.accentBg },
                }}
              >
                <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: C.accentBg,
                  color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiBookmark size={17}/>
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: C.text }}>
                  {tx('university', lang)}
                </Typography>
              </ListItem>
            </List>

            {/* Language in drawer */}
            <Box sx={{ mt: 1.5, px: 0.5 }}>
              <Divider sx={{ mb: 1.5, borderColor: C.border }}/>
              <LanguageSwitcher currentLang={currentLang}/>
            </Box>
          </Box>

          {/* Drawer footer CTA */}
          <Box sx={{
            px: 2, py: 2,
            borderTop: `1px solid ${C.border}`,
            bgcolor: C.bgSub,
          }}>
            <Link href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<FiCalendar size={16}/>}
                sx={{
                  bgcolor: C.accent,
                  color: '#fff',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: '12px',
                  py: 1.4,
                  fontSize: '0.95rem',
                  boxShadow: `0 4px 14px ${alpha(C.accent, 0.35)}`,
                  '&:hover': {
                    bgcolor: C.accentDk,
                    boxShadow: `0 6px 20px ${alpha(C.accent, 0.45)}`,
                  },
                }}
              >
                {tx('schedule', lang)}
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}