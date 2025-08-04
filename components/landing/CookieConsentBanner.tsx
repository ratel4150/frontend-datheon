import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
 
  Paper,
  Slide,
  Stack,
  Switch,

  Typography,

} from '@mui/material'
import { useEffect, useState } from 'react'
import { FiSettings, FiInfo, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsentBanner() {
 
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setShowBanner(true)
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ analytics: true, marketing: true }))
    setShowBanner(false)
  }

  const handleDeclineAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ analytics: false, marketing: false }))
    setShowBanner(false)
  }

  const handleOpenSettings = () => {
    const stored = localStorage.getItem('cookie-consent')
    if (stored) {
      try {
        setSettings(JSON.parse(stored))
      } catch {
        setSettings({ analytics: false, marketing: false })
      }
    }
    setShowSettings(true)
  }

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(settings))
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleChange = (type: 'analytics' | 'marketing') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, [type]: e.target.checked }))
  }

  return (
    <>
      {/* ⚙️ Botón flotante configuración */}
  {/*     <Tooltip title="Configuración de Cookies" placement="left">
        <IconButton
          onClick={() => setShowSettings(true)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1300,
            bgcolor: 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)',
            color: '#000',
            boxShadow: '0 6px 15px rgba(79,195,247,0.6)',
            fontSize: 28,
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'linear-gradient(135deg, #0288D1 0%, #4FC3F7 100%)',
              boxShadow: '0 8px 20px rgba(2,136,209,0.8)',
              transform: 'scale(1.1)',
            },
          }}
          aria-label="Configuración de cookies"
        >
          <FiSettings />
        </IconButton>
      </Tooltip> */}

      {/* 🍪 Banner inferior animado */}
      <AnimatePresence>
        {showBanner && (
          <Slide direction="up" in={showBanner} mountOnEnter unmountOnExit>
            <Paper
              component={motion.div}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
              elevation={12}
              sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                bgcolor: '#FFF',
                color: '#000',
                px: 4,
                py: 3,
                borderTop: '3px solid #4FC3F7',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                zIndex: 1200,
                boxShadow: '0 -4px 30px rgba(79,195,247,0.25)',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} sx={{ maxWidth: 700 }}>
                <FiInfo color="#4FC3F7" size={24} />
                <Typography sx={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 }}>
                  Este sitio usa cookies para mejorar tu experiencia. Puedes aceptar todas, rechazar o personalizar tus preferencias.
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={handleDeclineAll}
                  startIcon={<FiAlertTriangle />}
                  sx={{
                    borderColor: '#000',
                    color: '#000',
                    fontWeight: 600,
                    px: 2,
                    '&:hover': { bgcolor: '#f5f5f5', borderColor: '#4FC3F7', color: '#4FC3F7' },
                    transition: 'all 0.3s ease',
                    minWidth: 110,
                  }}
                >
                  Rechazar
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleOpenSettings}
                  startIcon={<FiSettings />}
                  sx={{
                    borderColor: '#4FC3F7',
                    color: '#4FC3F7',
                    fontWeight: 600,
                    px: 2,
                    '&:hover': { bgcolor: '#E1F5FE' },
                    transition: 'all 0.3s ease',
                    minWidth: 140,
                  }}
                >
                  Personalizar
                </Button>

                <Button
                  variant="contained"
                  onClick={handleAcceptAll}
                  startIcon={<FiCheckCircle />}
                  sx={{
                    bgcolor: '#4FC3F7',
                    color: '#000',
                    fontWeight: 700,
                    px: 2,
                    minWidth: 110,
                    boxShadow: '0 6px 15px rgba(79,195,247,0.7)',
                    '&:hover': {
                      bgcolor: '#0288D1',
                      boxShadow: '0 8px 20px rgba(2,136,209,0.9)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Aceptar todo
                </Button>
              </Stack>
            </Paper>
          </Slide>
        )}
      </AnimatePresence>

      {/* ⚙️ Dialogo configuración cookies */}
      <Dialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        aria-labelledby="cookie-settings-title"
        fullWidth
        maxWidth="sm"
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 3,
            bgcolor: '#FFF',
            boxShadow: '0 0 30px rgba(79,195,247,0.3)',
            fontFamily: "'Poppins', sans-serif",
          },
        }}
      >
        <DialogTitle
          id="cookie-settings-title"
          sx={{
            bgcolor: '#4FC3F7',
            color: '#000',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: 0.5,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <FiSettings size={26} />
          Preferencias de Cookies
        </DialogTitle>

        <DialogContent sx={{ color: '#000', pt: 3, pb: 1 }}>
          <Typography variant="body1" mb={2} sx={{ fontWeight: 600 }}>
            Activa o desactiva las siguientes categorías según tu preferencia:
          </Typography>

          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.analytics}
                  onChange={handleChange('analytics')}
                  color="primary"
                  size="medium"
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Cookies Analíticas
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                    Permiten recopilar datos anónimos para mejorar el rendimiento y experiencia.
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.marketing}
                  onChange={handleChange('marketing')}
                  color="primary"
                  size="medium"
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Cookies de Marketing
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                    Usadas para personalizar anuncios y medir campañas publicitarias.
                  </Typography>
                </Box>
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setShowSettings(false)}
            sx={{
              color: '#4FC3F7',
              fontWeight: 600,
              '&:hover': { bgcolor: '#E1F5FE' },
              transition: 'all 0.3s ease',
              px: 3,
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveSettings}
            variant="contained"
            sx={{
              bgcolor: '#4FC3F7',
              color: '#000',
              fontWeight: 700,
              px: 3,
              boxShadow: '0 6px 15px rgba(79,195,247,0.7)',
              '&:hover': {
                bgcolor: '#0288D1',
                boxShadow: '0 8px 20px rgba(2,136,209,0.9)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Guardar Preferencias
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
