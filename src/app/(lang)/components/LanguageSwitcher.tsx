// src\app\(lang)\components\LanguageSwitcher.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Avatar, Box,  Stack, Tooltip } from '@mui/material'

type Props = {
  currentLang: string
}

const locales = [
  { code: 'es', label: 'ES', country: 'mx' },
  { code: 'en', label: 'EN', country: 'us' },
  { code: 'fr', label: 'FR', country: 'fr' },
]

export function LanguageSwitcher({ currentLang }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  function changeLang(lang: string) {
    // Reemplaza el segmento del idioma en la ruta
    const parts = pathname.split('/')
    parts[1] = lang
    router.push(parts.join('/'))
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {locales.map(({ code, label, country }) => (
        <Tooltip key={code} title={label} arrow>
          <Box
            onClick={() => changeLang(code)}
            sx={{
              cursor: 'pointer',
              borderRadius: '50%',
              border: code === currentLang ? '2px solid #00AEEF' : '2px solid transparent',
              transition: 'border 0.3s ease',
              p: 0.3,
              '&:hover': {
                borderColor: '#7FFF00',
                transform: 'scale(1.05)',
              },
            }}
          >
            <Avatar
              src={`https://flagcdn.com/w40/${country}.png`}
              alt={label}
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Tooltip>
      ))}
    </Stack>
  )
}
