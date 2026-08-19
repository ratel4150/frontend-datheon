// File: frontend-datheon/packages/features/src/achievements-counter/ui/AchievementsCounter.tsx
// src\app\(lang)\components\AchievementsCounter.tsx
'use client'

import { Box, Typography } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COUNTERS = [
  {
    title: 'Clientes satisfechos',
    subtitle: 'Empresas que confían en nosotros',
    value: 12000,
  },
  {
    title: 'Proyectos entregados',
    subtitle: 'Casos de éxito comprobados',
    value: 340,
  },
  {
    title: 'Equipo de expertos',
    subtitle: 'Especialistas a tu servicio',
    value: 65,
  },
]

export default function AchievementsCounter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        py: { xs: 6, md: 10 },
        px: 4,
        backgroundColor: '#00ADD8', // Fondo sólido
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex:99,
        mr:10,
        ml:10,
        mt:6,
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
      }}
    >
      {/* Título general de la sección */}
      <Box sx={{ mb: 6, textAlign: 'center', maxWidth: '800px' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontFamily: '"Space Grotesk", "Poppins", sans-serif',
            mb: 1,
          }}
        >
          Nuestro impacto en cifras
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#D1D5DB',
            fontSize: { xs: '1rem', md: '1.125rem' },
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          Confiamos en los números que respaldan nuestra experiencia.
        </Typography>
      </Box>

      {/* Contadores individuales */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: 6,
          textAlign: 'center',
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        {COUNTERS.map(({ title, subtitle, value }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 + idx * 0.3, ease: 'easeOut' }}
          >
            <AnimatedNumber target={value} />
            <Typography
              variant="h6"
              sx={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontFamily: '"Poppins", "Space Grotesk", sans-serif',
                mt: 1,
                fontSize: { xs: '1.125rem', md: '1.25rem' },
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#D1D5DB',
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontFamily: '"Poppins", sans-serif',
                mt: 0.5,
              }}
            >
              {subtitle}
            </Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  )
}

function AnimatedNumber({ target }: { target: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let current = 0
    const duration = 2000
    const increment = Math.ceil(target / (duration / 30))

    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(interval)
      }
      setValue(current)
    }, 30)

    return () => clearInterval(interval)
  }, [target])

  return (
    <Typography
      variant="h2"
      sx={{
        fontWeight: 800,
        color: '#FFFFFF',
        fontSize: { xs: '2.5rem', md: '4rem' },
        fontFamily: '"Space Grotesk", "Poppins", sans-serif',
        lineHeight: 1.1,
      }}
    >
      {value.toLocaleString()}+
    </Typography>
  )
}
