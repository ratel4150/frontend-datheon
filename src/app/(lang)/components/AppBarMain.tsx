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
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
  Slide,
  Collapse,
} from '@mui/material'
import {
  FaGlobeAmericas,
  FaMoon,
  FaBars,
  FaTimes,
  FaServicestack,
  FaIndustry,
  FaUniversity,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  currentLang: string
}

export function AppBarMain({ currentLang }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
    setDrawerOpen(false)
    setOpenSubmenu(null)
  }

  // Submenús definidos
  const serviciosSubmenu = [
    { label: 'Consultoría TI', path: '/servicios/consultoria' },
    { label: 'Desarrollo Web', path: '/servicios/desarrollo-web' },
    { label: 'Soporte Técnico', path: '/servicios/soporte' },
  ]

  const sectoresSubmenu = [
    { label: 'Finanzas', path: '/sectores/finanzas' },
    { label: 'Salud', path: '/sectores/salud' },
    { label: 'Educación', path: '/sectores/educacion' },
  ]

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu((prev) => (prev === menu ? null : menu))
  }

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
              <Box
                className="logo-box"
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  background: 'linear-gradient(145deg, #e6f9ff, #ffffff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d1ecf8',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                }}
              >
                <FaGlobeAmericas size={20} color="#00AEEF" />
              </Box>

              <Box>
                <Typography
                  className="logo-text"
                  variant="h5"
                  sx={{
                    fontFamily: 'Poppins, Montserrat, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.35rem',
                    color: '#0B0F2B',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.5px',
                    lineHeight: 1,
                  }}
                >
                  Datheon
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '0.68rem',
                    color: '#555',
                    lineHeight: 1,
                    mt: 0.2,
                    letterSpacing: '0.3px',
                  }}
                >
                  Smart Tech Solutions
                </Typography>
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
                    Servicios
                    {openSubmenu === 'servicios' ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </Box>

                  <Collapse
                    in={openSubmenu === 'servicios'}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                      position: 'absolute',
                      top: '36px',
                      left: 0,
                      bgcolor: '#fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      borderRadius: 1,
                      zIndex: 1400,
                      minWidth: 160,
                    }}
                  >
                    <List dense disablePadding>
                      {serviciosSubmenu.map(({ label, path }) => (
                        <ListItem
                          key={label}
                         component={'button'}
                          onClick={() => handleNavigate(path)}
                          sx={{
                            px: 2,
                            py: 1,
                            '&:hover': { bgcolor: '#e0f7ff', color: '#00AEEF' },
                            fontWeight: 500,
                            fontFamily: 'Poppins',
                            cursor: 'pointer',
                          }}
                        >
                          <ListItemText primary={label} />
                        </ListItem>
                      ))}
                    </List>
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
                    Sectores
                    {openSubmenu === 'sectores' ? (
                      <FaChevronUp size={14} />
                    ) : (
                      <FaChevronDown size={14} />
                    )}
                  </Box>

                  <Collapse
                    in={openSubmenu === 'sectores'}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                      position: 'absolute',
                      top: '36px',
                      left: 0,
                      bgcolor: '#fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      borderRadius: 1,
                      zIndex: 1400,
                      minWidth: 160,
                    }}
                  >
                    <List dense disablePadding>
                      {sectoresSubmenu.map(({ label, path }) => (
                        <ListItem
                          component={'button'}
                          key={label}
                          onClick={() => handleNavigate(path)}
                          sx={{
                            px: 2,
                            py: 1,
                            '&:hover': { bgcolor: '#e0f7ff', color: '#00AEEF' },
                            fontWeight: 500,
                            fontFamily: 'Poppins',
                            cursor: 'pointer',
                          }}
                        >
                          <ListItemText primary={label} />
                        </ListItem>
                      ))}
                    </List>
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
                    Universidad
                  </Box>
                </Box>
              </Stack>
            )}

           
          <Stack direction="row" spacing={1} alignItems="center">
  <LanguageSwitcher currentLang={currentLang} />

  {/* Icono Modo Oscuro */}
  <Tooltip title="Modo Oscuro / Claro">
    <IconButton size="small" color="inherit">
      <FaMoon />
    </IconButton>
  </Tooltip>

  {/* Botón Consulta justo a la derecha del modo oscuro */}
  <Button
    variant="contained"
    color="primary"
    onClick={() => router.push('/consulta')}
    sx={{
      bgcolor: '#00AEEF',
      color:"#FFF",
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
    Consulta
  </Button>

  {/* Botón menú móvil */}
  {isMobile && (
    <IconButton
      onClick={() => setDrawerOpen(true)}
      color="inherit"
      size="large"
      aria-label="Abrir menú"
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
          setDrawerOpen(false)
          setOpenSubmenu(null)
        }}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mb: 2,
            }}
          >
            <IconButton onClick={() => setDrawerOpen(false)}>
              <FaTimes />
            </IconButton>
          </Box>

          <List>
            {/* Servicios con submenu expandible */}
            <ListItem
           component={'button'}
              onClick={() => toggleSubmenu('servicios')}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaServicestack />
                Servicios
              </Box>
              {openSubmenu === 'servicios' ? <FaChevronUp /> : <FaChevronDown />}
            </ListItem>
            <Collapse in={openSubmenu === 'servicios'} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {serviciosSubmenu.map(({ label, path }) => (
                  <ListItem
                 component={'button'}
                    key={label}
                    onClick={() => handleNavigate(path)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Sectores con submenu */}
            <ListItem
   component={'button'}
              onClick={() => toggleSubmenu('sectores')}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaIndustry />
                Sectores
              </Box>
              {openSubmenu === 'sectores' ? <FaChevronUp /> : <FaChevronDown />}
            </ListItem>
            <Collapse in={openSubmenu === 'sectores'} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sectoresSubmenu.map(({ label, path }) => (
                  <ListItem
                   component={'button'}
                    key={label}
                    onClick={() => handleNavigate(path)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Universidad */}
            <ListItem    component={'button'}onClick={() => handleNavigate('/universidad')}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaUniversity />
                Universidad
              </Box>
            </ListItem>

            {/* Ya no dejamos botón consulta en drawer, pues está visible en appbar */}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
