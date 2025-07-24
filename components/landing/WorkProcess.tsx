'use client'

import React from 'react'
import {
  Box, Button, Typography, useTheme } from '@mui/material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
  TimelineOppositeContent,
} from '@mui/lab'
import {

  FaRocket,
  FaClipboardList,
  FaPaintBrush,
  FaLaptopCode,
  FaVial,
  FaSyncAlt,
} from 'react-icons/fa'
import descubrimientoImg from '@/assets/images/sections/workprocess/descubrimiento.png'
import diseñoImg from '@/assets/images/sections/workprocess/Diseño.png'
import desarrolloImg from '@/assets/images/sections/workprocess/desarrollo.png'
import validacionImg from '@/assets/images/sections/workprocess/validacion.png'
import despliegueImg from '@/assets/images/sections/workprocess/despliegue.png'
import mantenimientoImg from '@/assets/images/sections/workprocess/mantenimiento.png'
import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'
type Props = {
  lang: string
}


// Paso con imagen y descripcion
interface Step {
  icon: React.ReactNode
  title: string
  descLines: string[]
  output: string
 imgSrc: StaticImageData
}

const steps: Record<string, Step[]> = {
  es: [
    {
      icon: <FaClipboardList size={24} />,
      title: '1️⃣ Descubrimiento y Alcance',
      descLines: [
        'Entrevistas con el cliente para entender necesidades.',
        'Documentación de requisitos y casos de uso.',
        'Propuesta técnica y económica (cronograma, costos).',
      ],
      output: 'Acta de constitución del proyecto',
  imgSrc: descubrimientoImg,
    },
    {
      icon: <FaPaintBrush size={24} />,
      title: '2️⃣ Diseño y Planificación',
      descLines: [
        'Prototipos (UI/UX en Figma/Sketch).',
        'Arquitectura técnica (diagramas UML, tecnologías).',
        'Plan ágil (Sprints/backlog) o plan cascada (Gantt).',
      ],
      output: 'Documento de diseño aprobado',
      imgSrc: diseñoImg,
    },
    {
      icon: <FaLaptopCode size={24} />,
      title: '3️⃣ Desarrollo Iterativo',
      descLines: [
        'Sprints (si es ágil) o fases secuenciales.',
        'Reuniones diarias (stand-ups) y revisión semanal con el cliente.',
        'Herramientas: Jira/Trello + Git + CI/CD.',
      ],
      output: '',
      imgSrc: desarrolloImg,
    },
    {
      icon: <FaVial size={24} />,
      title: '4️⃣ Validación y QA',
      descLines: [
        'Pruebas automatizadas (unitarias, integración).',
        'Feedback del cliente en demos (cada 2 semanas en ágil).',
      ],
      output: 'Reporte de calidad y ajustes',
      imgSrc: validacionImg,
    },
    {
      icon: <FaRocket size={24} />,
      title: '5️⃣ Despliegue Guiado',
      descLines: [
        'Release planificado (pilotaje, rollout gradual).',
        'Soporte post-lanzamiento (primeras 48h críticas).',
      ],
      output: 'Manual de usuario y capacitación',
      imgSrc: despliegueImg,
    },
    {
      icon: <FaSyncAlt size={24} />,
      title: '6️⃣ Mantenimiento Continuo',
      descLines: [
        'SLA definido (horas de soporte/mes).',
        'Mejoras basadas en métricas (uso, rendimiento).',
      ],
      output: '',
      imgSrc: mantenimientoImg,
    },
  ],
  en: [],
  fr: [],
}

export default function WorkProcess({ lang }: Props) {
  const theme = useTheme()

    const items = steps[lang as keyof typeof steps] || steps.en

  return (
       <Box component="section" sx={{ py: 12, px: { xs: 2, md: 8 }, backgroundColor: '#F9FAFB' }}>
        
   <Typography
        variant="h3"
        textAlign="center"
        sx={{ mb: 1, fontWeight: 700, fontFamily: 'Poppins', color: '#333' }}
      >
        {lang === 'es'
          ? 'Proceso de Trabajo'
          : lang === 'en'
          ? 'Work Process'
          : 'Processus de Travail'}
      </Typography>
       <Typography
        variant="subtitle1"
        textAlign="center"
        sx={{ mb: 6, fontFamily: 'Poppins', color: '#555', maxWidth: 600, mx: 'auto' }}
      >
        {lang === 'es' ? (
          <>Descubre nuestro enfoque híbrido que combina lo mejor de metodologías <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>cascada</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>ágil</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>Kanban</Box> y <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>DevOps</Box> para resultados excepcionales.</>
        ) : lang === 'en' ? (
          <>Explore our hybrid approach combining <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>waterfall</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>agile</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>Kanban</Box> and <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>DevOps</Box> methodologies for outstanding results.</>
        ) : (
          <>Découvrez notre approche hybride combinant <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>cascade</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>agile</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>Kanban</Box> et <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>DevOps</Box> pour des résultats exceptionnels.</>
        )}
      </Typography>

      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {items.map((step, i) => (
          <TimelineItem key={i}>
              <TimelineOppositeContent sx={{ m: 'auto 0', display: { xs: 'none', md: 'block' } }}>
                {/* Imagen con parallax 3D y layers de profundidad */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', width: 500, height: 300, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                >
                  {/* Imagen base */}
                  <Image
                    src={step.imgSrc}
                    alt={step.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      filter: 'contrast(1.1) brightness(0.95)',
                      transform: 'scale(1.02)',
                      transition: 'transform 0.5s ease',
                    }}
                  />

                  {/* Overlay hover info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      padding: '1rem',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{step.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{step.output || step.descLines[0]}</Typography>
                  </motion.div>

                  {/* Bottom gradient bar */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    style={{ position: 'absolute', bottom: 0, width: '100%', height: '40%', background: 'rgba(0,0,0,0.3)' }}
                  />
                </motion.div>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: '#00ADD8',
                  color: '#fff',
                  boxShadow: `0 0 0 4px ${theme.palette.background.paper}`,
                }}
              >
                {step.icon}
              </TimelineDot>
              {i < items.length - 1 && <TimelineConnector sx={{ bgcolor: '#00ADD8' }} />}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 2, px: 2, textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins', color: '#00ADD8', mb: 1 }}>
                {step.title}
              </Typography>
              {step.descLines.map((line, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  sx={{ fontFamily: 'Poppins', color: '#555', lineHeight: 1.6 }}
                >
                  {line}
                </Typography>
              ))}
              {step.output && (
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: 'Poppins', color: '#333', fontWeight: 600, mt: 1 }}
                >
                  Salida: {step.output}
                </Typography>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>


      {/* CTA Section */}
       <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Button
          variant="contained"
          size="large"
          href={`/${lang}/contact`}
          fullWidth
          sx={{
            maxWidth: 400,
            mx: 'auto',
            bgcolor: '#00ADD8',
            color: '#fff',
            fontWeight: 700,
            py: 2,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 6px 20px rgba(0,173,216,0.3)',
            transition: 'background-color 0.3s ease',
            '&:hover': { bgcolor: '#007EA7' },
          }}
        >
          {lang === 'es' ? 'Contáctanos' : lang === 'en' ? 'Contact Us' : 'Contactez-nous'}
        </Button>
      </Box>
    </Box>
  )
}
