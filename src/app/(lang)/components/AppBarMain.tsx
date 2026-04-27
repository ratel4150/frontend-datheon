// File: frontend-datheon/src/app/(lang)/components/AppBarMain.tsx
'use client'

import {
  AppBar, Toolbar, IconButton, Typography, Stack, Box,
  Drawer, List, ListItem, Button,
  Collapse, Divider, alpha,
} from '@mui/material'
import { FaMoon } from 'react-icons/fa'
import {
  FiBook, FiBookmark, FiBriefcase, FiCalendar, FiChevronDown,
  FiChevronRight, FiCode, FiDollarSign, FiGrid,
  FiHeart, FiLayers, FiMenu, FiArrowRight, FiTool, FiX,
  FiCpu,
  FiBox,
  FiWifi,
  FiDatabase,
  FiCloud,
  FiSmartphone,
  FiZap,
} from 'react-icons/fi'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import datheonLogo from '@/assets/logo/letra-d (4).png'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const C = {
  bg:         '#ffffff',
  bgSub:      '#fafbfc',
  border:     '#ebebeb',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.18)',
} as const

type Lang = 'es' | 'en' | 'fr'
type Props = { currentLang: string }

interface SubItem {
  label: string; path: string; description: string; icon: React.ReactNode
}

const servicesData: Record<Lang, SubItem[]> = {
  es: [
    {
      label: 'AI SaaS & Agentes Autónomos',
      path: '/servicios/ai-saas-agentes-autonomos',
      description: 'Construimos productos SaaS potenciados por IA y agentes que ejecutan tareas completas sin intervención humana.',
      icon: <FiCpu size={20} />,
    },
    {
      label: 'Automatización & Lead Systems',
      path: '/servicios/automatizacion-lead-systems',
      description: 'Sistemas que capturan, califican y convierten leads de forma automática, más flujos RPA que eliminan trabajo manual.',
      icon: <FiZap size={20} />,
    },
    {
      label: 'SaaS / Web Apps & E-commerce',
      path: '/servicios/saas-web-apps-e-commerce',
      description: 'Aplicaciones web fullstack de alto rendimiento, desde MVPs hasta plataformas con millones de usuarios.',
      icon: <FiLayers size={20} />,
    },
    {
      label: 'Mobile Apps & Backend',
      path: '/servicios/mobile-apps-backend',
      description: 'Apps móviles nativas y multiplataforma conectadas a backends robustos y escalables.',
      icon: <FiSmartphone size={20} />,
    },
    {
      label: 'Cloud, DevOps & Infraestructura',
      path: '/servicios/cloud-devops',
      description: 'Infraestructura cloud escalable, segura y gestionada como código para que tu producto nunca se caiga.',
      icon: <FiCloud size={20} />,
    },
    {
      label: 'Data, Analytics & AI Systems',
      path: '/servicios/data-analytics-ai-systems',
      description: 'Arquitecturas de datos que convierten información cruda en decisiones de negocio en tiempo real.',
      icon: <FiDatabase size={20} />,
    },
    {
      label: 'IoT: Hardware + Software + SaaS',
      path: '/servicios/iot-hardware-software-saas',
      description: 'Conectamos dispositivos físicos al mundo digital: desde el firmware hasta el dashboard en la nube.',
      icon: <FiWifi size={20} />,
    },
    {
      label: 'Odoo ERP & Transformación Digital',
      path: '/servicios/odoo-erp-transformacion-digital',
      description: 'Implementamos, personalizamos y conectamos Odoo con el resto de tu stack tecnológico.',
      icon: <FiBox size={20} />,
    },
  ],
  en: [
    {
      label: 'AI SaaS & Autonomous Agents',
      path: '/services/ai-saas-autonomous-agents',
      description: 'We build AI-powered SaaS products and agents that execute complete tasks without human intervention.',
      icon: <FiCpu size={20} />,
    },
    {
      label: 'Automation & Lead Systems',
      path: '/services/automation-lead-systems',
      description: 'Systems that automatically capture, qualify and convert leads, plus RPA flows that eliminate manual work.',
      icon: <FiZap size={20} />,
    },
    {
      label: 'SaaS / Web Apps & E-commerce',
      path: '/services/saas-web-apps-e-commerce',
      description: 'High-performance fullstack web applications, from MVPs to platforms serving millions of users.',
      icon: <FiLayers size={20} />,
    },
    {
      label: 'Mobile Apps & Backend',
      path: '/services/mobile-apps-backend',
      description: 'Native and cross-platform mobile apps connected to robust and scalable backends.',
      icon: <FiSmartphone size={20} />,
    },
    {
      label: 'Cloud, DevOps & Infrastructure',
      path: '/services/cloud-devops-infrastructure',
      description: 'Scalable, secure cloud infrastructure managed as code so your product never goes down.',
      icon: <FiCloud size={20} />,
    },
    {
      label: 'Data, Analytics & AI Systems',
      path: '/services/data-analytics-ai-systems',
      description: 'Data architectures that turn raw information into business decisions in real time.',
      icon: <FiDatabase size={20} />,
    },
    {
      label: 'IoT: Hardware + Software + SaaS',
      path: '/services/iot-hardware-software-saas',
      description: 'We connect physical devices to the digital world: from firmware to cloud dashboard.',
      icon: <FiWifi size={20} />,
    },
    {
      label: 'Odoo ERP & Digital Transformation',
      path: '/services/odoo-erp-digital-transformation',
      description: 'We implement, customize and connect Odoo with the rest of your technology stack.',
      icon: <FiBox size={20} />,
    },
  ],
  fr: [
    {
      label: 'IA SaaS & Agents Autonomes',
      path: '/services/ia-saas-agents-autonomes',
      description: 'Nous construisons des produits SaaS alimentés par IA et des agents qui exécutent des tâches complètes sans intervention humaine.',
      icon: <FiCpu size={20} />,
    },
    {
      label: 'Automatisation & Systèmes de Leads',
      path: '/services/automatisation-systemes-de-leads',
      description: 'Systèmes qui capturent, qualifient et convertissent les leads automatiquement, plus des flux RPA qui éliminent le travail manuel.',
      icon: <FiZap size={20} />,
    },
    {
      label: 'SaaS / Web Apps & E-commerce',
      path: '/services/saas-web-apps-e-commerce',
      description: 'Applications web fullstack haute performance, du MVP aux plateformes avec des millions d\'utilisateurs.',
      icon: <FiLayers size={20} />,
    },
    {
      label: 'Applications Mobiles & Backend',
      path: '/services/applications-mobiles-backend',
      description: 'Applications mobiles natives et multiplateformes connectées à des backends robustes et évolutifs.',
      icon: <FiSmartphone size={20} />,
    },
    {
      label: 'Cloud, DevOps & Infrastructure',
      path: '/services/cloud-devops-infrastructure',
      description: 'Infrastructure cloud évolutive et sécurisée gérée en code pour que votre produit ne tombe jamais.',
      icon: <FiCloud size={20} />,
    },
    {
      label: 'Data, Analytics & Systèmes IA',
      path: '/services/data-analytics-systemes-ia',
      description: 'Architectures de données qui transforment les informations brutes en décisions métier en temps réel.',
      icon: <FiDatabase size={20} />,
    },
    {
      label: 'IoT : Hardware + Software + SaaS',
      path: '/services/iot-hardware-software-saas',
      description: 'Nous connectons des appareils physiques au monde numérique : du firmware au tableau de bord cloud.',
      icon: <FiWifi size={20} />,
    },
    {
      label: 'Odoo ERP & Transformation Digitale',
      path: '/services/odoo-erp-transformation-digitale',
      description: 'Nous implémentons, personnalisons et connectons Odoo avec le reste de votre stack technologique.',
      icon: <FiBox size={20} />,
    },
  ],
};

const sectorsData: Record<Lang, SubItem[]> = {
  es: [
    { label: 'Finanzas',  path: '/sectores/finanzas',  description: 'Banca digital e inversión',            icon: <FiDollarSign size={15}/> },
    { label: 'Salud',     path: '/sectores/salud',     description: 'Hospitales y telemedicina',             icon: <FiHeart size={15}/> },
    { label: 'Educación', path: '/sectores/educacion', description: 'Plataformas de aprendizaje adaptativo', icon: <FiBook size={15}/> },
  ],
  en: [
    { label: 'Finance',   path: '/sectors/finance',   description: 'Banking and investment tech',            icon: <FiDollarSign size={15}/> },
    { label: 'Health',    path: '/sectors/health',    description: 'Hospitals and telemedicine',              icon: <FiHeart size={15}/> },
    { label: 'Education', path: '/sectors/education', description: 'Adaptive learning platforms',             icon: <FiBook size={15}/> },
  ],
  fr: [
    { label: 'Finance',   path: '/secteurs/finance',   description: 'Banque et technologie financière',      icon: <FiDollarSign size={15}/> },
    { label: 'Santé',     path: '/secteurs/sante',     description: 'Hôpitaux et télémédecine',              icon: <FiHeart size={15}/> },
    { label: 'Éducation', path: '/secteurs/education', description: "Plateformes d'apprentissage adaptatif", icon: <FiBook size={15}/> },
  ],
}

const t = {
  services:   { es: 'Servicios',           en: 'Services',           fr: 'Services'            },
  sectors:    { es: 'Sectores',            en: 'Sectors',            fr: 'Secteurs'            },
  university: { es: 'Universidad Datheón', en: 'Datheón University', fr: 'Université Datheón'  },
  viewAllSvc: { es: 'Ver todos los servicios', en: 'View all services', fr: 'Voir tous les services' },
  viewAllSec: { es: 'Ver todos los sectores',  en: 'See all sectors',   fr: 'Voir tous les secteurs' },
  schedule:   { es: 'Agendar reunión',     en: 'Schedule meeting',   fr: 'Planifier une réunion' },
  darkMode:   { es: 'Modo Oscuro / Claro', en: 'Dark / Light Mode',  fr: 'Mode Sombre / Clair'  },
}
const tx = (key: keyof typeof t, lang: string) =>
  t[key][(lang as Lang) in t[key] ? (lang as Lang) : 'es']

// ─── Dropdown ─────────────────────────────────────────────────
function DropdownMenu({ items, viewAllPath, viewAllLabel, open }: {
  items: SubItem[]; viewAllPath: string; viewAllLabel: string; open: boolean
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const isWide = items.length > 4

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: isWide ? '50%' : 0,
            transform: isWide ? 'translateX(-50%)' : 'none',
            width: isWide ? 560 : 320,
            bgcolor: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: '18px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 24px 48px -8px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            zIndex: 1400,
          }}
        >
          {/* Top accent bar */}
          <Box sx={{
            height: '2.5px',
            background: `linear-gradient(90deg, ${C.accent}, ${alpha(C.accent, 0.25)})`,
          }}/>

          {/* Items */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: isWide ? 'repeat(2, 1fr)' : '1fr',
            p: 1.5, pb: 0,
            gap: 0,
          }}>
            {items.map((item, idx) => {
              const isHov = hoveredIdx === idx
              return (
                <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                  <Box
                    component={motion.div}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    animate={{
                      // FIX: nunca animar desde/hacia 'transparent' — usar rgba con alpha 0
                      backgroundColor: isHov ? alpha(C.accent, 0.07) : 'rgba(0,0,0,0)',
                      scale: isHov ? 1.01 : 1,
                    }}
                    transition={{ duration: 0.13, ease: 'easeOut' }}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 1.5, py: 1.25,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      mb: 0.25,
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {/* Icon */}
                    <Box
                      component={motion.div}
                      animate={{
                        backgroundColor: isHov ? C.accent : alpha(C.accent, 0.08),
                        // FIX: color no es animable con motion en Box — usar sx condicional
                      }}
                      transition={{ duration: 0.13 }}
                      sx={{
                        width: 36, height: 36,
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        color: isHov ? '#fff' : C.accent,
                        transition: 'color 0.13s ease',
                      }}
                    >
                      {item.icon}
                    </Box>

                    {/* Text */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{
                        fontSize: '0.875rem', fontWeight: 600,
                        color: isHov ? C.accent : C.text,
                        lineHeight: 1.3,
                        transition: 'color 0.13s ease',
                      }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{
                        fontSize: '0.72rem', color: C.textMute,
                        mt: 0.2, lineHeight: 1.35,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {item.description}
                      </Typography>
                    </Box>

                    {/* Arrow */}
                    <Box
                      component={motion.div}
                      animate={{
                        opacity: isHov ? 1 : 0,
                        x: isHov ? 0 : -4,
                      }}
                      transition={{ duration: 0.13 }}
                      sx={{ color: C.accent, flexShrink: 0 }}
                    >
                      <FiChevronRight size={14}/>
                    </Box>
                  </Box>
                </Link>
              )
            })}
          </Box>

          {/* Footer */}
          <Box sx={{ px: 1.5, pt: 0.75, pb: 1.5 }}>
            <Divider sx={{ mb: 1, borderColor: C.border }}/>
            <Link href={viewAllPath} style={{ textDecoration: 'none' }}>
              <Box
                component={motion.div}
                animate={{ backgroundColor: 'rgba(0,0,0,0)' }}
                whileHover={{ backgroundColor: alpha(C.accent, 0.07) }}
                transition={{ duration: 0.13 }}
                sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  px: 1.5, py: 1,
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: C.accent }}>
                  {viewAllLabel}
                </Typography>
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 0.5,
                  bgcolor: alpha(C.accent, 0.1),
                  borderRadius: '100px',
                  px: 1, py: 0.4,
                }}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: C.accent, lineHeight: 1 }}>
                    {items.length}
                  </Typography>
                  <FiArrowRight size={11} color={C.accent}/>
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  )
}

// ─── NavItem desktop ──────────────────────────────────────────
function NavItem({ label, isOpen, onToggle, children }: {
  label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
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
      <Box onClick={onToggle} sx={{
        display: 'flex', alignItems: 'center', gap: 0.5,
        px: 1, py: 0.5, borderRadius: '8px', cursor: 'pointer', userSelect: 'none',
        color: isOpen ? C.accent : C.textMid, fontWeight: 500, fontSize: '0.9rem',
        transition: 'all 0.15s ease',
        '&:hover': { color: C.accent, bgcolor: C.accentBg },
      }}>
        {label}
        <Box component={motion.div} animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }} sx={{ display: 'flex', color: 'inherit' }}>
          <FiChevronDown size={14}/>
        </Box>
      </Box>
      {children}
    </Box>
  )
}

// ─── Mobile accordion ─────────────────────────────────────────
function MobileNavGroup({ label, icon, isOpen, onToggle, items, viewAllPath, viewAllLabel, onClose }: {
  label: string; icon: React.ReactNode; isOpen: boolean; onToggle: () => void
  items: SubItem[]; viewAllPath: string; viewAllLabel: string; onClose: () => void
}) {
  const router = useRouter()
  return (
    <>
      <ListItem onClick={onToggle} sx={{
        borderRadius: '12px', mb: 0.5, px: 1.5, py: 1.25,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        cursor: 'pointer',
        bgcolor: isOpen ? C.accentBg : 'transparent',
        borderLeft: isOpen ? `3px solid ${C.accent}` : '3px solid transparent',
        transition: 'all 0.2s ease',
        '&:hover': { bgcolor: C.accentBg },
      }}>
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
        <Box component={motion.div} animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }} sx={{ color: C.textMute }}>
          <FiChevronDown size={16}/>
        </Box>
      </ListItem>

      <Collapse in={isOpen} timeout={220} unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2, mb: 0.5 }}>
          {items.map(({ label: lbl, path, icon: ic }) => (
            <ListItem key={path} onClick={() => { router.push(path); onClose() }} sx={{
              borderRadius: '10px', mb: 0.25, px: 1.5, py: 1,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5,
              '&:hover': { bgcolor: C.accentBg },
            }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: '8px',
                bgcolor: C.accentBg, color: C.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {ic}
              </Box>
              <Typography sx={{ fontSize: '0.875rem', color: C.textMid, fontWeight: 500 }}>
                {lbl}
              </Typography>
            </ListItem>
          ))}
          <ListItem onClick={() => { router.push(viewAllPath); onClose() }} sx={{
            borderRadius: '10px', px: 1.5, py: 0.75,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1,
            '&:hover': { bgcolor: C.accentBg },
          }}>
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

// ─── Main ─────────────────────────────────────────────────────
export function AppBarMain({ currentLang }: Props) {
  const lang = (currentLang as Lang) in t.services ? (currentLang as Lang) : 'es'
  const router = useRouter()

  // ── HYDRATION FIX: reemplaza useMediaQuery con resize listener ──
  // useMediaQuery genera html diferente en server vs client → hydration mismatch
  const [mounted, setMounted]   = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLg, setIsLg]         = useState(false)

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 900)    // < md
      setIsLg(window.innerWidth >= 1200)      // >= lg
    }
    update()
    setMounted(true)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openMenu, setOpenMenu]     = useState<string | null>(null)
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { if (!isMobile) setDrawerOpen(false) }, [isMobile])

  const toggleMenu = (name: string) => setOpenMenu(prev => prev === name ? null : name)
  const closeAll   = () => { setDrawerOpen(false); setOpenMenu(null) }

  const currentServices = servicesData[lang]
  const currentSectors  = sectorsData[lang]

  return (
    <>
      {/* 
        HYDRATION FIX: @keyframes NO va en sx{} de MUI — genera estilos diferentes en SSR vs CSR.
        En su lugar usamos className="appbar-slide" y ponemos el keyframe en globals.css:
        
        .appbar-slide {
          animation: slideDown 0.4s ease forwards;
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
      */}
      <AppBar
        position="sticky"
        elevation={0}
        className="appbar-slide"
        sx={{
          bgcolor: C.bg,
          color: C.text,
          borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{
          px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
          minHeight: { xs: 56, sm: 60, md: 68 },
          gap: { xs: 1, md: 2 },
        }}>

          {/* Logo */}
          <Stack direction="row" spacing={1.5} alignItems="center"
            onClick={() => router.push('/')}
            sx={{ cursor: 'pointer', flexShrink: 0, transition: 'opacity 0.2s', '&:hover': { opacity: 0.85 } }}>
            <Box sx={{
              width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 },
              borderRadius: '10px', border: `1px solid ${C.accentLine}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative', flexShrink: 0,
              bgcolor: alpha(C.accent, 0.04),
            }}>
              <Image src={datheonLogo} alt="Datheón Logo" fill
                style={{ objectFit: 'contain', padding: 6 }} sizes="40px" priority/>
            </Box>
            <Box>
              <Typography sx={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                fontSize: { xs: '1.05rem', md: '1.2rem' },
                color: C.text, lineHeight: 1, letterSpacing: '-0.01em',
              }}>
                Dathe<Box component="span" sx={{ color: C.accent }}>ó</Box>n
              </Typography>
              <Typography sx={{
                fontSize: '0.58rem', letterSpacing: '0.12em', color: C.textMute,
                fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, mt: 0.3,
                display: { xs: 'none', sm: 'block' },
              }}>
                Smart Tech Solutions
              </Typography>
            </Box>
          </Stack>

          {/* Desktop Nav — solo post-mount para evitar hydration mismatch */}
          {mounted && !isMobile && (
            <Stack direction="row" spacing={0.5} alignItems="center"
              sx={{ flexGrow: 1, pl: { md: 2, lg: 3 } }}>
              <NavItem label={tx('services', lang)} isOpen={openMenu === 'services'}
                onToggle={() => toggleMenu('services')}>
                <DropdownMenu items={currentServices}
                  viewAllPath={`/${lang}/servicios`}
                  viewAllLabel={tx('viewAllSvc', lang)}
                  open={openMenu === 'services'}/>
              </NavItem>

              <NavItem label={tx('sectors', lang)} isOpen={openMenu === 'sectors'}
                onToggle={() => toggleMenu('sectors')}>
                <DropdownMenu items={currentSectors}
                  viewAllPath={`/${lang}/sectores`}
                  viewAllLabel={tx('viewAllSec', lang)}
                  open={openMenu === 'sectors'}/>
              </NavItem>

              <Box onClick={() => router.push('/universidad')} sx={{
                px: 1, py: 0.5, borderRadius: '8px', cursor: 'pointer',
                fontWeight: 500, fontSize: '0.9rem', color: C.textMid,
                transition: 'all 0.15s ease',
                '&:hover': { color: C.accent, bgcolor: C.accentBg },
              }}>
                {tx('university', lang)}
              </Box>
            </Stack>
          )}

          {/* Spacer SSR — evita layout shift */}
          {(!mounted || isMobile) && <Box sx={{ flexGrow: 1 }}/>}

          {/* Right actions */}
          <Stack direction="row" spacing={{ xs: 0.5, sm: 0.75 }}
            alignItems="center" sx={{ ml: 'auto', flexShrink: 0 }}>
            <LanguageSwitcher currentLang={currentLang}/>

            <IconButton size="small" title={tx('darkMode', lang)} sx={{
              color: C.textMute,
              width: { xs: 32, md: 36 }, height: { xs: 32, md: 36 },
              '&:hover': { color: C.accent, bgcolor: C.accentBg },
            }}>
              <FaMoon size={14}/>
            </IconButton>

            {/* CTA — lg+ */}
            {mounted && isLg && (
              <Link href="https://calendly.com/team_datheon/consulta-gratuita"
                target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="small" startIcon={<FiCalendar size={14}/>}
                  sx={{
                    bgcolor: C.accent, color: '#fff', fontWeight: 600,
                    textTransform: 'none', borderRadius: '10px',
                    px: 2.25, py: 0.85, fontSize: '0.85rem', whiteSpace: 'nowrap',
                    boxShadow: `0 2px 8px ${alpha(C.accent, 0.35)}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: C.accentDk,
                      boxShadow: `0 4px 14px ${alpha(C.accent, 0.45)}`,
                      transform: 'translateY(-1px)',
                    },
                  }}>
                  {tx('schedule', lang)}
                </Button>
              </Link>
            )}

            {/* Hamburger — mobile */}
            {mounted && isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} aria-label="Abrir menú"
                sx={{
                  border: `1px solid ${C.border}`, borderRadius: '10px',
                  color: C.textMid,
                  width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 },
                  '&:hover': { bgcolor: C.accentBg, color: C.accent, borderColor: C.accentLine },
                }}>
                <FiMenu size={18}/>
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={closeAll}
        PaperProps={{
          sx: {
            width: { xs: '100vw', sm: 380 },
            bgcolor: C.bg,
            boxShadow: '-4px 0 40px rgba(0,0,0,0.10)',
            borderLeft: `1px solid ${C.border}`,
          },
        }}
        ModalProps={{ disableScrollLock: true }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* Header */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2.5, py: 2, borderBottom: `1px solid ${C.border}`,
          }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{
                width: 36, height: 36, borderRadius: '9px',
                border: `1px solid ${C.accentLine}`,
                overflow: 'hidden', position: 'relative', flexShrink: 0,
                bgcolor: alpha(C.accent, 0.04),
              }}>
                <Image src={datheonLogo} alt="Datheón Logo" fill
                  style={{ objectFit: 'contain', padding: 5 }} sizes="36px"/>
              </Box>
              <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: C.text }}>
                Dathe<Box component="span" sx={{ color: C.accent }}>ó</Box>n
              </Typography>
            </Stack>
            <IconButton onClick={closeAll} sx={{
              color: C.textMute, border: `1px solid ${C.border}`,
              borderRadius: '9px', width: 34, height: 34,
              '&:hover': { bgcolor: C.accentBg, color: C.accent, borderColor: C.accentLine },
            }}>
              <FiX size={16}/>
            </IconButton>
          </Box>

          {/* Nav items */}
          <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 2 }}>
            <List disablePadding>
              <MobileNavGroup
                label={tx('services', lang)} icon={<FiLayers size={17}/>}
                isOpen={openMenu === 'services'} onToggle={() => toggleMenu('services')}
                items={currentServices} viewAllPath={`/${lang}/servicios`}
                viewAllLabel={tx('viewAllSvc', lang)} onClose={closeAll}/>

              <MobileNavGroup
                label={tx('sectors', lang)} icon={<FiGrid size={17}/>}
                isOpen={openMenu === 'sectors'} onToggle={() => toggleMenu('sectors')}
                items={currentSectors} viewAllPath={`/${lang}/sectores`}
                viewAllLabel={tx('viewAllSec', lang)} onClose={closeAll}/>

              <ListItem onClick={() => { router.push('/universidad'); closeAll() }} sx={{
                borderRadius: '12px', mb: 0.5, px: 1.5, py: 1.25,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5,
                borderLeft: '3px solid transparent',
                '&:hover': { bgcolor: C.accentBg },
              }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: '10px',
                  bgcolor: C.accentBg, color: C.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FiBookmark size={17}/>
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: C.text }}>
                  {tx('university', lang)}
                </Typography>
              </ListItem>
            </List>

            <Box sx={{ mt: 1.5, px: 0.5 }}>
              <Divider sx={{ mb: 1.5, borderColor: C.border }}/>
              <LanguageSwitcher currentLang={currentLang}/>
            </Box>
          </Box>

          {/* Footer CTA */}
          <Box sx={{ px: 2, py: 2, borderTop: `1px solid ${C.border}`, bgcolor: C.bgSub }}>
            <Link href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica"
              target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="contained" startIcon={<FiCalendar size={16}/>}
                sx={{
                  bgcolor: C.accent, color: '#fff', fontWeight: 700,
                  textTransform: 'none', borderRadius: '12px', py: 1.4, fontSize: '0.95rem',
                  boxShadow: `0 4px 14px ${alpha(C.accent, 0.35)}`,
                  '&:hover': { bgcolor: C.accentDk, boxShadow: `0 6px 20px ${alpha(C.accent, 0.45)}` },
                }}>
                {tx('schedule', lang)}
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}