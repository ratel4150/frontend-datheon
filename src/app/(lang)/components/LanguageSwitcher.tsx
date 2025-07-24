// src\app\(lang)\components\LanguageSwitcher.tsx
'use client'

import { useState, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Avatar,
  Box,
  Typography,
  Popover,
  Stack,

  ClickAwayListener,
  CircularProgress,
  Tooltip,
} from '@mui/material'
import { FaGlobeAmericas } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  currentLang: string
}

const locales = [
  { code: 'es', label: 'Español', country: 'mx' },
  { code: 'en', label: 'English', country: 'us' },
  { code: 'fr', label: 'Français', country: 'fr' },
]

export function LanguageSwitcher({ currentLang }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isPending, startTransition] = useTransition()
  const [hoveredLang, setHoveredLang] = useState<string | null>(null)

  const pathname = usePathname()
  const router = useRouter()


  const open = Boolean(anchorEl)
  const id = open ? 'language-popover' : undefined

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLangChange = (lang: string) => {
    startTransition(() => {
      const parts = pathname.split('/')
      parts[1] = lang
      router.push(parts.join('/'))
    })
    handleClose()
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: open ? 360 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <Box
            onClick={handleOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: '50%',
              bgcolor: open ? '#E1F5FE' : '#F5F8FA',
              boxShadow: open
                ? '0 12px 28px rgba(0,0,0,0.15)'
                : '0 4px 12px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {isPending ? (
              <CircularProgress size={20} thickness={4} color="primary" />
            ) : (
              <FaGlobeAmericas size={22} color="#00AEEF" />
            )}
          </Box>
        </motion.div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          PaperProps={{
            elevation: 24,
            sx: {
              mt: 1.5,
              borderRadius: 3,
              px: 2,
              py: 2,
              minWidth: 250,
              background: 'linear-gradient(to bottom right, #fff, #f8fbff)',
              backdropFilter: 'blur(6px)',
              border: '1px solid #e0e0e0',
              boxShadow: '0 20px 45px rgba(0,0,0,0.1)',
            },
          }}
        >
          <Stack spacing={1}>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                color: '#0B0F2B',
                mb: 0.5,
              }}
            >
              Selecciona tu idioma
            </Typography>

            <AnimatePresence>
              {locales.map(({ code, label, country }) => {
                const isActive = code === currentLang

                return (
                  <motion.div
                    key={code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredLang(code)}
                    onMouseLeave={() => setHoveredLang(null)}
                  >
                    <Tooltip title={label} placement="left" arrow>
                      <Box
                        role="menuitem"
                        aria-selected={isActive}
                        onClick={() => handleLangChange(code)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 1.2,
                          borderRadius: 2,
                          cursor: 'pointer',
                          backgroundColor: isActive ? '#e0f7fa' : 'transparent',
                          border: isActive
                            ? '2px solid #00AEEF'
                            : '2px solid transparent',
                          transition: 'all 0.25s ease-in-out',
                          '&:hover': {
                            backgroundColor: '#f0faff',
                            transform: 'translateX(2px)',
                          },
                        }}
                      >
                        <Avatar
                          src={`https://flagcdn.com/w40/${country}.png`}
                          alt={label}
                          sx={{
                            width: 28,
                            height: 28,
                            boxShadow:
                              hoveredLang === code
                                ? '0 0 12px #00AEEF'
                                : '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'box-shadow 0.3s ease',
                          }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.95rem',
                              fontFamily: 'Montserrat',
                              color: '#0B0F2B',
                            }}
                          >
                            {label}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: 'Poppins', color: '#888' }}
                          >
                            ({code.toUpperCase()})
                          </Typography>
                        </Box>
                      </Box>
                    </Tooltip>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </Stack>
        </Popover>
      </Box>
    </ClickAwayListener>
  )
}
