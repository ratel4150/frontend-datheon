// src\app\(lang)\components\AppBarMain.tsx
'use client'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Box,
  Tooltip,

  Drawer,
  List,
  ListItem,

  Button,
  useMediaQuery,
  useTheme,
  Slide,
  Collapse,
} from '@mui/material'
import {

  FaMoon,
  FaBars,

  FaServicestack,
  FaIndustry,
  FaUniversity,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
} from 'react-icons/fa'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import datheonLogo from '@/assets/logo/letra-d (2).png'
import { FiBook, FiBookmark, FiBriefcase, FiCalendar, FiChevronDown, FiChevronRight, FiChevronUp, FiCode, FiDollarSign, FiGrid, FiHeart, FiLayers, FiMenu,  FiPlusCircle, FiTool, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  currentLang: string
}

const submenuServices = {
  es: [
    { label: 'Consultoría TI', path: '/servicios/consultoria' },
    { label: 'Desarrollo Web', path: '/servicios/desarrollo-web' },
    { label: 'Soporte Técnico', path: '/servicios/soporte' },
  ],
  en: [
    { label: 'IT Consulting', path: '/services/consulting' },
    { label: 'Web Development', path: '/services/web-development' },
    { label: 'Technical Support', path: '/services/support' },
  ],
  fr: [
    { label: 'Consultance IT', path: '/services/consultance' },
    { label: 'Développement Web', path: '/services/developpement-web' },
    { label: 'Support Technique', path: '/services/support' },
  ]
}

const submenuSectors = {
  es: [
    { label: 'Finanzas', path: '/sectores/finanzas' },
    { label: 'Salud', path: '/sectores/salud' },
    { label: 'Educación', path: '/sectores/educacion' },
  ],
  en: [
    { label: 'Finance', path: '/sectors/finance' },
    { label: 'Health', path: '/sectors/health' },
    { label: 'Education', path: '/sectors/education' },
  ],
  fr: [
    { label: 'Finance', path: '/secteurs/finance' },
    { label: 'Santé', path: '/secteurs/sante' },
    { label: 'Éducation', path: '/secteurs/education' },
  ]
}

export function AppBarMain({ currentLang }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.only('xs')); // solo extra small (0-599px)
/* const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); */ // small a medium (600-1199px)
const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // large y mayores (1200px+)
  
  const router = useRouter()

    // Cerrar drawer al cambiar entre móvil/desktop
  useEffect(() => {
    setDrawerOpen(false);
  }, [isMobile]);

  const handleNavigate = (path: string) => {
    router.push(path)
    setDrawerOpen(false)
    setOpenSubmenu(null)
  }

  // Submenús definidos


  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu((prev) => (prev === menu ? null : menu))
  }

const currentServices =
  submenuServices[currentLang as keyof typeof submenuServices] || submenuServices.es;
const currentSectors =
  submenuSectors[currentLang as keyof typeof submenuSectors] || submenuSectors.es;

  return (
    <>
      <Slide direction="down" in>
        <AppBar
          position="sticky"
          elevation={6}
          sx={{
            bgcolor: '#ffffff',
            color: '#0B0F2B',
            borderBottom: '1px solid #e0e0e0',
            zIndex: 1300,
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: { xs: 2, md: 4 },
              gap: 2,
            }}
          >
            {/* Logo + Marca */}
                <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover .logo-box': {
          boxShadow: '0 4px 12px rgba(0, 174, 239, 0.3)',
          transform: 'scale(1.05)',
        },
        '&:hover .logo-text': {
          color: '#00AEEF',
        },
      }}
      onClick={() => handleNavigate('/')}
    >
      {/* Contenedor del logo (imagen PNG) */}
      <Box
        className="logo-box"
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #e6f9ff, #ffffff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #d1ecf8',
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
          padding: 1, // Espacio interno para el logo
          overflow: 'hidden', // Para bordes redondeados en la imagen
        }}
      >
    <Image
  src={datheonLogo}
  alt="Datheon Logo"
  style={{ objectFit: 'contain' }}
  fill // para que ocupe todo el contenedor padre (debes tener un padre con posición relativa)
  sizes="100vw" // opcional, para indicar el tamaño relativo
/>
      </Box>

      {/* Texto de la marca */}
      <Box
  sx={{
    position: 'relative',
    display: 'inline-block',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '6px',
      padding: '1px',
      background: 'linear-gradient(135deg, #00AEEF 0%, #7F3DFF 100%)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    }
  }}
>
  <Box
    sx={{
      padding: '12px 16px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(4px)',
   
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontFamily: 'Poppins, Montserrat, sans-serif',
        fontWeight: 800,
        fontSize: { xs: '1.3rem', md: '1.6rem' },
        color: '#0B0F2B',
        letterSpacing: '0.5px',
        lineHeight: 1,
        position: 'relative',
        display: 'inline-block',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -4,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, #00AEEF, #0995b8ff)',
        },
      }}
    >
      Datheon
    </Typography>
    <Typography
      variant="caption"
      sx={{
        fontFamily: 'Poppins',
        fontSize: { xs: '0.65rem', sm: '0.75rem' },
        color: '#666',
        lineHeight: 1.3,
        mt: 0.5,
        letterSpacing: '0.4px',
        display: 'block',
        fontWeight: 500,
      }}
    >
      SMART TECH SOLUTIONS
    </Typography>
  </Box>
</Box>
    </Stack>

          

            {/* Navegación Desktop */}
            {!isMobile && (
              <Stack direction="row" spacing={3} alignItems="center" sx={{ flexGrow: 1, pl: 4 }}>
                {/* Servicios con submenu */}
                <Box sx={{ position: 'relative' }}>
                  <Box
                    onClick={() => toggleSubmenu('servicios')}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontFamily: 'Poppins',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.7,
                      color: openSubmenu === 'servicios' ? '#00AEEF' : '#0B0F2B',
                      userSelect: 'none',
                      '&:hover': {
                        color: '#00AEEF',
                      },
                    }}
                  >
                    <FaServicestack />
              {currentLang === 'es'
    ? 'Servicios'
    : currentLang === 'en'
    ? 'Services'
    : currentLang === 'fr'
    ? 'Services'
    : 'Servicios'}
                    {openSubmenu === 'servicios' ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </Box>

                <Collapse
  in={openSubmenu === 'servicios'}
  timeout={{ enter: 250, exit: 200 }}
  unmountOnExit
  sx={{
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '280px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
    zIndex: 1200,
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #00AEEF, #7F3DFF)',
    }
  }}
>
<List disablePadding>
  {currentServices.map((item) => (
    <ListItem
      key={item.path}
      component={motion.div}
      whileHover={{
        backgroundColor: 'rgba(0, 174, 239, 0.05)',
        borderLeft: '3px solid #00AEEF',
      }}
      onClick={() => handleNavigate(item.path)}
      sx={{
        px: 3,
        py: 1.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        '&:last-child': {
          borderBottom: 'none',
        },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Icono dinámico según servicio */}
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 174, 239, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2,
          flexShrink: 0,
          color: '#00AEEF',
        }}
      >
        {(item.label === 'Consultoría TI' ||
          item.label === 'IT Consulting' ||
          item.label === 'Consultance IT') && <FiBriefcase size={16} />}
        {(item.label === 'Desarrollo Web' ||
          item.label === 'Web Development' ||
          item.label === 'Développement Web') && <FiCode size={16} />}
        {(item.label === 'Soporte Técnico' ||
          item.label === 'Technical Support' ||
          item.label === 'Support Technique') && <FiTool size={16} />}
      </Box>

      <Box>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '0.9rem',
            color: '#0B0F2B',
            lineHeight: 1.3,
          }}
        >
          {item.label}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.75rem',
            color: '#666',
            mt: 0.2,
          }}
        >
          {(item.label === 'Consultoría TI' ||
            item.label === 'IT Consulting' ||
            item.label === 'Consultance IT') &&
            'Soluciones estratégicas TI'}
          {(item.label === 'Desarrollo Web' ||
            item.label === 'Web Development' ||
            item.label === 'Développement Web') &&
            'Sitios y aplicaciones web'}
          {(item.label === 'Soporte Técnico' ||
            item.label === 'Technical Support' ||
            item.label === 'Support Technique') &&
            'Asistencia especializada'}
        </Typography>
      </Box>

      <Box sx={{ ml: 'auto', color: 'rgba(0, 0, 0, 0.3)' }}>
        <FiChevronRight size={14} />
      </Box>
    </ListItem>
  ))}
</List>


  {/* Footer del menú */}
  <Box sx={{
    px: 3,
    py: 2,
    backgroundColor: 'rgba(0, 174, 239, 0.03)',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
  }}>
    <Typography
      variant="body2"
      sx={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        color: '#00AEEF',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline'
        }
      }}
      onClick={() => handleNavigate('/servicios')}
    >
      <FiPlusCircle style={{ marginRight: '6px' }} />
  {currentLang === 'es'
    ? 'Ver todos los servicios'
    : currentLang === 'en'
    ? 'View all services'
    : currentLang === 'fr'
    ? 'Voir tous les services'
    : 'Ver todos los servicios'}
    </Typography>
  </Box>
</Collapse>
                </Box>

                {/* Sectores con submenu */}
                <Box sx={{ position: 'relative' }}>
                  <Box
                    onClick={() => toggleSubmenu('sectores')}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontFamily: 'Poppins',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.7,
                      color: openSubmenu === 'sectores' ? '#00AEEF' : '#0B0F2B',
                      userSelect: 'none',
                      '&:hover': {
                        color: '#00AEEF',
                      },
                    }}
                  >
                    <FaIndustry />
                 {currentLang === 'es'
    ? 'Sectores'
    : currentLang === 'en'
    ? 'Sectors'
    : currentLang === 'fr'
    ? 'Secteurs'
    : 'Sectores'}
                    {openSubmenu === 'sectores' ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </Box>

             <Collapse
  in={openSubmenu === 'sectores'}
  timeout={{ enter: 250, exit: 200 }}
  unmountOnExit
  sx={{
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '280px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
    zIndex: 1200,
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #00AEEF, #7F3DFF)',
    }
  }}
>
  <List disablePadding>
  {currentSectors.map((item) => (
    <ListItem
      key={item.path}
      component={motion.div}
      whileHover={{
        backgroundColor: 'rgba(0, 174, 239, 0.05)',
        borderLeft: '3px solid #00AEEF'
      }}
      onClick={() => handleNavigate(item.path)}
      sx={{
        px: 3,
        py: 1.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        '&:last-child': {
          borderBottom: 'none'
        },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Icono dinámico por sector y idioma */}
      <Box sx={{
        width: 32,
        height: 32,
        borderRadius: '8px',
        backgroundColor: 'rgba(0, 174, 239, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 2,
        flexShrink: 0,
        color: '#00AEEF'
      }}>
        {(item.label === 'Finanzas' || item.label === 'Finance' || item.label === 'Finance (FR)') && <FiDollarSign size={16} />}
        {(item.label === 'Salud' || item.label === 'Health' || item.label === 'Santé') && <FiHeart size={16} />}
        {(item.label === 'Educación' || item.label === 'Education' || item.label === 'Éducation') && <FiBook size={16} />}
      </Box>

      <Box>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '0.9rem',
            color: '#0B0F2B',
            lineHeight: 1.3
          }}
        >
          {item.label}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.75rem',
            color: '#666',
            mt: 0.2
          }}
        >
          {(item.label === 'Finanzas' || item.label === 'Finance') && 'Soluciones para el sector financiero'}
          {(item.label === 'Finance (FR)') && 'Solutions pour le secteur financier'}
          
          {(item.label === 'Salud' || item.label === 'Health') && 'Tecnología para instituciones de salud'}
          {(item.label === 'Santé') && 'Technologies pour les établissements de santé'}

          {(item.label === 'Educación' || item.label === 'Education') && 'Herramientas para educación'}
          {(item.label === 'Éducation') && 'Outils pour l’éducation'}
        </Typography>
      </Box>

      <Box sx={{ ml: 'auto', color: 'rgba(0, 0, 0, 0.3)' }}>
        <FiChevronRight size={14} />
      </Box>
    </ListItem>
  ))}
</List>


  {/* Footer del menú */}
<Box
  sx={{
    px: 3,
    py: 2,
    backgroundColor: 'rgba(0, 174, 239, 0.03)',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
  }}
>
  <Typography
    variant="body2"
    sx={{
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      color: '#00AEEF',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    }}
    onClick={() => handleNavigate('/sectores')}
  >
    <FiPlusCircle style={{ marginRight: '6px' }} />
    {currentLang === 'es'
      ? 'Ver todos los sectores'
      : currentLang === 'en'
      ? 'See all sectors'
      : 'Voir tous les secteurs'}
  </Typography>
</Box>

</Collapse>
                </Box>

                {/* Universidad sin submenu */}
                <Box
                  onClick={() => handleNavigate('/universidad')}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    fontSize: '0.95rem',
                    color: '#0B0F2B',
                    userSelect: 'none',
                    '&:hover': {
                      color: '#00AEEF',
                    },
                  }}
                >
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
  <FaUniversity />
  {currentLang === 'es'
    ? 'Universidad Datheón'
    : currentLang === 'en'
    ? 'Datheón University'
    : 'Université Datheón'}
</Box>
                </Box>
              </Stack>
            )}

           
          <Stack direction="row" spacing={1} alignItems="center">
  <LanguageSwitcher currentLang={currentLang} />

  {/* Icono Modo Oscuro */}
 <Tooltip
  title={
    currentLang === 'es'
      ? 'Modo Oscuro / Claro'
      : currentLang === 'en'
      ? 'Dark / Light Mode'
      : 'Mode Sombre / Clair'
  }
>
  <IconButton size="small" color="inherit">
    <FaMoon />
  </IconButton>
</Tooltip>


  {/* Botón Consulta justo a la derecha del modo oscuro */}
{isDesktop && (
  <Link href="https://calendly.com/team-datheon/30min" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    <Button
      variant="contained"
      color="primary"
      startIcon={<FaCalendarAlt />}  // Icono de calendario (asegúrate de importarlo)
      sx={{
        bgcolor: '#00AEEF',
        color: "#FFF",
        fontWeight: 700,
        textTransform: 'none',
        borderRadius: 2,
        px: 2.5,
        py: 0.6,
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
        '&:hover': {
          bgcolor: '#0095c9',
        },
      }}
    >
     {
  currentLang === 'es'
    ? 'Agendar reunión'
    : currentLang === 'en'
    ? 'Schedule meeting'
    : 'Planifier une réunion'
}
    </Button>
  </Link>
)}
  

  {/* Botón menú móvil */}
  {isMobile && (
    <IconButton
        onClick={() => setDrawerOpen(!drawerOpen)}
      color="inherit"
      size="large"
     aria-label={drawerOpen ? "Cerrar menú" : "Abrir menú"} 
    >
      <FaBars />
    </IconButton>
  )}
</Stack>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Drawer Mobile */}
  <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => {
        setDrawerOpen(false);
        setOpenSubmenu(null);
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: isMobile ? '100vw' : 380,
          maxWidth: '100%',
          top: isMobile ? 0 : 64,
          height: isMobile ? '100vh' : 'calc(100vh - 64px)',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.1)',
          borderLeft: isMobile ? 'none' : '1px solid rgba(0, 0, 0, 0.12)',
          overflowX: 'hidden',
        },
      }}
      ModalProps={{
        disableScrollLock: true,
        BackdropProps: {
          sx: {
            top: isMobile ? 0 : 64,
            backgroundColor: isMobile ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)',
          }
        }
      }}
    >
      <Box 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: isMobile ? 2 : 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #00AEEF, #7F3DFF)',
          }
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: isMobile ? 2 : 3,
            pt: isMobile ? 1 : 0,
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              color: '#0B0F2B',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: isMobile ? '1.1rem' : '1.25rem'
            }}
          >
            <FiMenu style={{ color: '#00AEEF' }} />
            Menú
          </Typography>
          <IconButton 
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: '#666',
              '&:hover': {
                backgroundColor: 'rgba(0, 174, 239, 0.1)',
                color: '#00AEEF',
              },
              p: isMobile ? 0.5 : 1
            }}
          >
            <FiX size={isMobile ? 20 : 22} />
          </IconButton>
        </Box>

        {/* Contenido principal */}
        <Box sx={{ 
          flex: 1,
          overflowY: 'auto',
          pr: isMobile ? 0 : 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '3px',
          }
        }}>
          <List disablePadding>
            {/* Servicios con submenu */}
            <ListItem
              component={motion.div}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSubmenu('servicios')}
              sx={{
                borderRadius: 2,
                mb: isMobile ? 0.5 : 1,
                px: isMobile ? 1.5 : 2,
                py: isMobile ? 1 : 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: openSubmenu === 'servicios' ? 'rgba(0, 174, 239, 0.05)' : 'transparent',
                borderLeft: openSubmenu === 'servicios' ? '3px solid #00AEEF' : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0, 174, 239, 0.05)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                <Box sx={{
                  width: isMobile ? 32 : 36,
                  height: isMobile ? 32 : 36,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(0, 174, 239, 0.1) 0%, rgba(127, 61, 255, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00AEEF',
                }}>
                  <FiLayers size={isMobile ? 16 : 18} />
                </Box>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#0B0F2B',
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }}>
                  {currentLang === 'es'
  ? 'Servicios'
  : currentLang === 'en'
  ? 'Services'
  : 'Services'} 
                </Typography>
              </Box>
              {openSubmenu === 'servicios' ? 
                <FiChevronUp size={18} color="#666" /> : 
                <FiChevronDown size={18} color="#666" />}
            </ListItem>

            <Collapse 
              in={openSubmenu === 'servicios'} 
              timeout="auto" 
              unmountOnExit
              sx={{ pl: isMobile ? 3 : 4 }}
            >
              <List component="div" disablePadding>
                {currentServices.map(({ label, path }) => (
                  <ListItem
                    component={motion.div}
                    whileTap={{ scale: 0.98 }}
                    key={label}
                    onClick={() => handleNavigate(path)}
                    sx={{
                      borderRadius: 2,
                      mb: isMobile ? 0.5 : 1,
                      px: isMobile ? 1.5 : 2,
                      py: isMobile ? 1 : 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 174, 239, 0.05)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                      <Box sx={{
                        width: isMobile ? 28 : 30,
                        height: isMobile ? 28 : 30,
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 174, 239, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00AEEF',
                      }}>
                        {label === 'Consultoría TI' && <FiBriefcase size={isMobile ? 12 : 14} />}
                        {label === 'Desarrollo Web' && <FiCode size={isMobile ? 12 : 14} />}
                        {label === 'Soporte Técnico' && <FiTool size={isMobile ? 12 : 14} />}
                      </Box>
                      <Typography sx={{ 
                        fontSize: isMobile ? '0.9rem' : '0.95rem',
                        fontFamily: 'Poppins, sans-serif',
                        color: '#0B0F2B',
                      }}>
                        {label}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Sectores con submenu */}
            <ListItem
              component={motion.div}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSubmenu('sectores')}
              sx={{
                borderRadius: 2,
                mb: isMobile ? 0.5 : 1,
                px: isMobile ? 1.5 : 2,
                py: isMobile ? 1 : 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: openSubmenu === 'sectores' ? 'rgba(0, 174, 239, 0.05)' : 'transparent',
                borderLeft: openSubmenu === 'sectores' ? '3px solid #00AEEF' : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0, 174, 239, 0.05)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                <Box sx={{
                  width: isMobile ? 32 : 36,
                  height: isMobile ? 32 : 36,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(0, 174, 239, 0.1) 0%, rgba(127, 61, 255, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00AEEF',
                }}>
                  <FiGrid size={isMobile ? 16 : 18} />
                </Box>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#0B0F2B',
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }}>
                  {currentLang === 'es'
  ? 'Sectores'
  : currentLang === 'en'
  ? 'Sectors'
  : 'Secteurs'}

                </Typography>
              </Box>
              {openSubmenu === 'sectores' ? 
                <FiChevronUp size={18} color="#666" /> : 
                <FiChevronDown size={18} color="#666" />}
            </ListItem>

            <Collapse 
              in={openSubmenu === 'sectores'} 
              timeout="auto" 
              unmountOnExit
              sx={{ pl: isMobile ? 3 : 4 }}
            >
              <List component="div" disablePadding>
                {currentSectors.map(({ label, path }) => (
                  <ListItem
                    component={motion.div}
                    whileTap={{ scale: 0.98 }}
                    key={label}
                    onClick={() => handleNavigate(path)}
                    sx={{
                      borderRadius: 2,
                      mb: isMobile ? 0.5 : 1,
                      px: isMobile ? 1.5 : 2,
                      py: isMobile ? 1 : 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 174, 239, 0.05)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                      <Box sx={{
                        width: isMobile ? 28 : 30,
                        height: isMobile ? 28 : 30,
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 174, 239, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00AEEF',
                      }}>
                        {label === 'Finanzas' && <FiDollarSign size={isMobile ? 12 : 14} />}
                        {label === 'Salud' && <FiHeart size={isMobile ? 12 : 14} />}
                        {label === 'Educación' && <FiBook size={isMobile ? 12 : 14} />}
                      </Box>
                      <Typography sx={{ 
                        fontSize: isMobile ? '0.9rem' : '0.95rem',
                        fontFamily: 'Poppins, sans-serif',
                        color: '#0B0F2B',
                      }}>
                        {label}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Universidad */}
            <ListItem
              component={motion.div}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigate('/universidad')}
              sx={{
                borderRadius: 2,
                mb: isMobile ? 0.5 : 1,
                px: isMobile ? 1.5 : 2,
                py: isMobile ? 1 : 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 174, 239, 0.05)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                <Box sx={{
                  width: isMobile ? 32 : 36,
                  height: isMobile ? 32 : 36,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(0, 174, 239, 0.1) 0%, rgba(127, 61, 255, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00AEEF',
                }}>
                  <FiBookmark size={isMobile ? 16 : 18} />
                </Box>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#0B0F2B',
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }}>
                 {currentLang === 'es'
    ? 'Universidad Datheón'
    : currentLang === 'en'
    ? 'Datheón University'
    : 'Université Datheón'}
                </Typography>
              </Box>
            </ListItem>
          </List>
        </Box>

        {/* Footer con botón de agendar */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          sx={{ 
            pt: isMobile ? 1.5 : 2,
            pb: isMobile ? 1 : 2,
            mt: 'auto',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            position: 'sticky',
            bottom: 0,
            background: 'linear-gradient(to top, #fff 70%, transparent)',
          }}
        >
          <Link href="https://calendly.com/team-datheon/30min" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#00ADD8',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: isMobile ? '0.95rem' : '1rem',
                px: isMobile ? 3 : 4,
                py: isMobile ? 1.25 : 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                width: '100%',
                maxWidth: { sm: '320px' },
                mx: 'auto',
                '&:hover': {
                  bgcolor: '#007B9E',
                  boxShadow: '0 4px 12px rgba(0, 173, 216, 0.3)',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <FiCalendar size={isMobile ? 16 : 18} />
              {currentLang === 'es'
    ? 'Agendar reunión'
    : currentLang === 'en'
    ? 'Schedule meeting'
    : 'Planifier une réunion'}
            </Button>
          </Link>
        </Box>
      </Box>
    </Drawer>
    </>
  )
}
