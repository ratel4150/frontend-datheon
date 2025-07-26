'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Box, Typography, IconButton, useMediaQuery, useTheme, Button } from '@mui/material'
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdBusiness,
  
  MdPeople,

  MdLocalShipping,

  MdGavel,
  MdShoppingCart,
  MdAttachMoney,
  MdPhoneIphone,
  MdLocalHospital,
  MdSchool,
  MdSecurity,
  MdBuild,
  MdStore,
  MdAgriculture,
  MdElectricalServices,
  MdDirectionsCar,
  MdPublic,
  MdLiveTv,
  MdFlight,
  MdSportsSoccer,
  MdKeyboardArrowRight,
} from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

const SECTORS = [
  {
    title: 'Comercio Electrónico',
    description: 'Chatbots conversacionales (+40% satisfacción cliente) + Motores de recomendación con IA (+35% ticket promedio) + Checkout inteligente (-30% abandonos)',
    icon: <MdShoppingCart size={36} color="#00ADD8" />
  },
  {
    title: 'Banca Digital',
    description: 'Scoring crediticio con IA (+25% precisión) + Chatbots para servicio al cliente (+80% autogestión) + Plataformas de inversión algorítmica',
    icon: <MdAttachMoney size={36} color="#00ADD8" />
  },
  {
    title: 'Telecomunicaciones',
    description: 'Asistentes virtuales para soporte técnico (+65% resolución automática) + Plataformas de análisis de red (+90% detección de fallos) + Sistemas antifraude con machine learning',
    icon: <MdPhoneIphone size={36} color="#00ADD8" />
  },
  {
    title: 'Salud Digital',
    description: 'Historiales médicos inteligentes (+50% eficiencia) + Diagnóstico asistido por IA (+30% precisión) + Plataformas de telemedicina con seguimiento en tiempo real',
    icon: <MdLocalHospital size={36} color="#00ADD8" />
  },
  {
    title: 'Tecnología Legal',
    description: 'Análisis de contratos con NLP (70% más rápido) + Generación automática de documentos legales (+90% precisión) + Gestión predictiva de riesgos en litigios',
    icon: <MdGavel size={36} color="#00ADD8" />
  },
  {
    title: 'Educación Tecnológica',
    description: 'Plataformas de aprendizaje adaptativo (+45% retención estudiantil) + Herramientas de supervisión de exámenes con visión artificial + Sistemas de gestión educativa integral',
    icon: <MdSchool size={36} color="#00ADD8" />
  },
  {
    title: 'Propiedad Inteligente',
    description: 'Valoración automática de propiedades con IA (+25% precisión) + Tours virtuales 360° (+40% engagement) + CRMs con seguimiento inteligente de clientes potenciales',
    icon: <MdBusiness size={36} color="#00ADD8" />
  },
  {
    title: 'Tecnología en Seguros',
    description: 'Procesamiento automático de siniestros (-70% tiempo de gestión) + Sistemas de detección de fraude (+95% efectividad) + Plataformas de suscripción automatizada',
    icon: <MdSecurity size={36} color="#00ADD8" />
  },
  {
    title: 'Logística Inteligente',
    description: 'Optimización de rutas con IA (-25% consumo de combustible) + Gestión predictiva de flotas (+99% disponibilidad) + Plataformas de última milla con geolocalización',
    icon: <MdLocalShipping size={36} color="#00ADD8" />
  },
  {
    title: 'Manufactura Avanzada',
    description: 'Mantenimiento predictivo (-30% tiempo de inactividad) + Control de calidad con visión artificial (+99% detección de defectos) + Gemelos digitales para simulación',
    icon: <MdBuild size={36} color="#00ADD8" />
  },
  {
    title: 'Retail Tecnológico',
    description: 'Gestión de inventario automatizada (+30% rotación) + Fijación de precios dinámica con IA (+15% margen) + Plataformas omnicanal unificadas',
    icon: <MdStore size={36} color="#00ADD8" />
  },
  {
    title: 'AgroTecnología',
    description: 'Monitoreo de cultivos con drones (+20% rendimiento) + Sistemas de riego inteligente (-40% consumo de agua) + Blockchain para trazabilidad alimentaria',
    icon: <MdAgriculture size={36} color="#00ADD8" />
  },
  {
    title: 'Energía Inteligente',
    description: 'Gestión energética con IA (-25% consumo) + Mantenimiento predictivo de infraestructura + Plataformas de trading energético automatizado',
    icon: <MdElectricalServices size={36} color="#00ADD8" />
  },
  {
    title: 'Movilidad del Futuro',
    description: 'Sistemas de gestión de flotas compartidas + Plataformas de movilidad como servicio (MaaS) + Soluciones de estacionamiento inteligente con sensores IoT',
    icon: <MdDirectionsCar size={36} color="#00ADD8" />
  },
  {
    title: 'Gobierno Digital',
    description: 'Plataformas de servicios ciudadanos (+50% eficiencia) + Herramientas de transparencia automatizadas + Análisis de datos públicos con machine learning',
    icon: <MdPublic size={36} color="#00ADD8" />
  },
  {
    title: 'Medios Tecnológicos',
    description: 'Recomendación de contenido personalizado (+40% engagement) + Generación automática de resúmenes con IA + Plataformas de streaming optimizadas con CDN inteligente',
    icon: <MdLiveTv size={36} color="#00ADD8" />
  },
  {
    title: 'Tecnología en RH',
    description: 'Reclutamiento asistido por IA (+60% velocidad de contratación) + Onboarding automatizado + Herramientas de análisis de productividad de equipos',
    icon: <MdPeople size={36} color="#00ADD8" />
  },
  {
    title: 'Turismo Tecnológico',
    description: 'Sistemas de recomendación personalizada (+35% tasa de conversión) + Chatbots para atención al cliente 24/7 + Plataformas de gestión hotelera todo-en-uno',
    icon: <MdFlight size={36} color="#00ADD8" />
  },
  {
    title: 'Deportes Tech',
    description: 'Análisis de rendimiento con visión artificial + Plataformas de entrenamiento personalizado con IA + Sistemas de scouting automatizado para talentos',
    icon: <MdSportsSoccer size={36} color="#00ADD8" />
  }
];

const VISIBLE_COLUMNS = 3
const VISIBLE_ROWS = 2
/* const VISIBLE_COUNT = VISIBLE_COLUMNS * VISIBLE_ROWS */

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.5 },
  }),
}
type Props={
  lang:string
}

export default function MultipleItemsCarousel({lang}:Props) {
 const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const columns = isMobile ? 1 : VISIBLE_COLUMNS
  const rows = isMobile ? 1 : VISIBLE_ROWS
  const visibleCount = columns * rows

  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const total = SECTORS.length
  const pages = Math.ceil(total / visibleCount)

  const next = useCallback(() => {
    setDirection(1)
    setPage((prev) => (prev + 1) % pages)
  }, [pages])

  const prev = useCallback(() => {
    setDirection(-1)
    setPage((prev) => (prev - 1 + pages) % pages)
  }, [pages])

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      next()
    }, 7000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [page, next])

  const getVisibleItems = () => {
    const items = []
    for (let i = 0; i < visibleCount; i++) {
      items.push(SECTORS[(page * visibleCount + i) % total])
    }
    return items
  }

  const visibleItems = getVisibleItems()


  return (
    <Box
      sx={{
        py: 10,
        px: 4,
        bgcolor: 'white',
        position: 'relative',
        maxWidth: 1080,
        mx: 'auto',
        overflow: 'hidden',
      }}
    >
 <Typography
  variant="h3"
  textAlign="center"
  sx={{ mb: 1, fontWeight: 700, fontFamily: 'Poppins', color: '#333' }}
>
  {lang === 'es'
    ? 'Nuestros Sectores Especializados'
    : lang === 'en'
    ? 'Our Specialized Sectors'
    : 'Nos Secteurs Spécialisés'}
</Typography>

<Typography
  variant="subtitle1"
  textAlign="center"
  sx={{
    mb: 6,
    fontFamily: 'Poppins',
    color: '#555',
    maxWidth: 600,
    mx: 'auto',
  }}
>
  {lang === 'es' ? (
    <>
      Experiencia comprobada en múltiples industrias con soluciones de <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>automatización específicas</Box> que generan <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>resultados medibles</Box> en cada sector.
    </>
  ) : lang === 'en' ? (
    <>
      Proven expertise across multiple industries with <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>tailored automation solutions</Box> that deliver <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>measurable results</Box> in every sector.
    </>
  ) : (
   <>
  Expertise éprouvée dans multiples industries avec des <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>solutions d&rsquo;automatisation sur mesure</Box> qui génèrent des <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>résultats mesurables</Box> dans chaque secteur.
</>
  )}
</Typography>

    <IconButton
  aria-label="Anterior"
  onClick={() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    prev();
  }}
  sx={{
    bgcolor: '#00ADD8',
    color: 'white',
    '&:hover': { bgcolor: '#007EA7' },
    position: 'absolute',
    top: '60%',
    left: 0,
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    zIndex: 10,
    boxShadow: '0 3px 8px rgba(0, 173, 216, 0.5)',
    borderRadius: '50%',
  }}
>
  <MdArrowBackIosNew size={24} />
</IconButton>

<IconButton
  aria-label="Siguiente"
  onClick={() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    next();
  }}
  sx={{
    bgcolor: '#00ADD8',
    color: 'white',
    '&:hover': { bgcolor: '#007EA7' },
    position: 'absolute',
    top: '60%',
    right: 0,
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    zIndex: 10,
    boxShadow: '0 3px 8px rgba(0, 173, 216, 0.5)',
    borderRadius: '50%',
  }}
>
  <MdArrowForwardIos size={24} />
</IconButton>

     <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: 'minmax(400px, auto)', // 🔥 evita encimado
    gap: 3,
  }}
>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {visibleItems.map((sector) => (
            <motion.div
              key={sector.title}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              
              layout
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
            >
        <Box
  sx={{
    height: 380, // subimos de 340 a 380 para incluir espacio del ícono
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    px: 3,
    pt: 9, // subimos padding top para dejar espacio interior
    pb: 3,
    border: '1px dotted #00ADD8',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease',
    mt: 4, // margen superior entre filas para evitar que se encimen
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  }}
>
  {/* Icono circular flotante */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 60,
      height: 60,
      borderRadius: '50%',
      backgroundColor: '#fff',
      border: '2px solid #00ADD8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
      zIndex: 5,
    }}
  >
    {sector.icon}
  </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    color: '#00ADD8',
                    mt: 5,
                    mb: 1.5,
                    textAlign: 'center',
                  }}
                >
                  {sector.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Poppins',
                    color: '#555',
                    textAlign: 'justify',
                    lineHeight: 1.5,
                    px: 1,
                  }}
                >
                  {sector.description}
                </Typography>
                

           <Button
  variant="contained"
  size="medium"
  fullWidth
  endIcon={<MdKeyboardArrowRight />}
  sx={{
   
    mx: 'auto',
    mt: 3,
    bgcolor: '#00ADD8',
    color: '#fff',
    fontWeight: 700,
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '1rem',
    fontFamily: 'Poppins',
    boxShadow: '0 6px 20px rgba(0,173,216,0.3)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      bgcolor: '#007EA7',
    },
  }}
>
  {lang === 'es'
    ? 'Ver soluciones'
    : lang === 'en'
    ? 'View Solutions'
    : 'Voir les solutions'}
</Button>


              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  )
}
