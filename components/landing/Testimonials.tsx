'use client'

import React, { useState } from 'react'
import {
  Box,
  Avatar,
  Typography,

  CardContent,
 
  useTheme,
  styled,
  Paper,
  IconButton,
 
  Button,
} from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { FaRegStar, FaStar } from 'react-icons/fa';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'María López',
    role: 'CEO, Acme Corp',
    avatar: 'https://i.pravatar.cc/150?img=3',
    image: '/testimonials/maria-detail.jpg',
    quote: 'Trabajar con esta consultora ha transformado completamente nuestra productividad. Su enfoque híbrido y el equipo ágil nos permitió lanzar al mercado en la mitad del tiempo estimado.',
    rating: 5,
    ratingComment: "Excelencia en gestión ágil"
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'CTO, Tech Innovators',
    avatar: 'https://i.pravatar.cc/150?img=4',
    image: '/testimonials/john-detail.jpg',
    quote: 'La calidad de desarrollo es sobresaliente. Integraron nuestras APIs legacy sin fricciones y la solución de IA superó nuestras expectativas.',
    rating: 5,
    ratingComment: "Tecnología impecable"
  },
  {
    id: 3,
    name: 'Claire Martin',
    role: 'Product Manager, InnovateX',
    avatar: 'https://i.pravatar.cc/150?img=56',
    image: '/testimonials/claire-detail.jpg',
    quote: 'Excelente soporte post-lanzamiento. El equipo respondió a nuestros tickets en menos de 2 horas y cada iteración mejoró notablemente la estabilidad.',
    rating: 4,
    ratingComment: "Soporte destacado"
  },
  {
    id: 4,
    name: 'Raj Patel',
    role: 'Director de TI, Global Bank',
    avatar: 'https://i.pravatar.cc/150?img=55',
    image: '/testimonials/raj-detail.jpg',
    quote: 'Implementaron un sistema de ciberseguridad que redujo nuestros incidentes en un 90%. Cumplen todos los estándares regulatorios financieros.',
    rating: 5,
    ratingComment: "Seguridad excepcional"
  },
  {
    id: 5,
    name: 'Sophie Zhang',
    role: 'VP Marketing, EcoGoods',
    avatar: 'https://i.pravatar.cc/150?img=23',
    image: '/testimonials/sophie-detail.jpg',
    quote: 'Su plataforma de análisis de clientes aumentó nuestra tasa de conversión en un 35%. Los dashboards personalizados son increíblemente intuitivos.',
    rating: 4,
    ratingComment: "Impacto comercial notable"
  },
  {
    id: 6,
    name: 'Carlos Mendoza',
    role: 'COO, LogiChain',
    avatar: 'https://i.pravatar.cc/150?img=41',
    image: '/testimonials/carlos-detail.jpg',
    quote: 'Automatizaron el 70% de nuestra cadena de suministro. La solución IoT para tracking en tiempo real superó nuestro ROI esperado.',
    rating: 5,
    ratingComment: "Automatización revolucionaria"
  },
  {
    id: 7,
    name: 'Aisha Johnson',
    role: 'Directora de Innovación, SaludPlus',
    avatar: 'https://i.pravatar.cc/150?img=15',
    image: '/testimonials/aisha-detail.jpg',
    quote: 'Su sistema de historiales médicos blockchain ha sido revolucionario para nuestros pacientes. Implementación impecable en 12 hospitales.',
    rating: 5,
    ratingComment: "Innovación en salud"
  },
  {
    id: 8,
    name: 'Thomas Wright',
    role: 'Fundador, EduTech Labs',
    avatar: 'https://i.pravatar.cc/150?img=33',
    image: '/testimonials/thomas-detail.jpg',
    quote: 'Desarrollaron una plataforma de aprendizaje adaptativo que escaló a 500k usuarios sin problemas. La arquitectura serverless fue clave.',
    rating: 4,
    ratingComment: "Escalabilidad comprobada"
  },
  {
    id: 9,
    name: 'Elena Petrova',
    role: 'CDO, Retail Group',
    avatar: 'https://i.pravatar.cc/150?img=40',
    image: '/testimonials/elena-detail.jpg',
    quote: 'Su motor de recomendaciones con IA aumentó nuestro AOV en un 28%. La integración con nuestro ERP fue perfecta.',
    rating: 4,
    ratingComment: "IA con resultados tangibles"
  },
  {
    id: 10,
    name: 'James Wilson',
    role: 'Gerente de Proyectos, AutoCorp',
    avatar: 'https://i.pravatar.cc/150?img=66',
    image: '/testimonials/james-detail.jpg',
    quote: 'Migraron nuestro sistema de fabricación a la nube sin downtime. El equipo técnico tiene un conocimiento profundo de la industria automotriz.',
    rating: 5,
    ratingComment: "Migración perfecta"
  }
];

type Testimonial = {
  id: number
  name: string
  role: string
  avatar: string
  image?: string
  quote: string
  rating:number
  x: number // posición horizontal (%)
  y: number // posición vertical (%)
}
type Props = {
  lang: string
}

type RawTestimonial = Omit<Testimonial, 'x' | 'y'>


const heights = [142, 185, 153, 218, 167, 197, 140, 231, 176, 205, 149];


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  color: '#555',
  borderRadius: 10,
  boxShadow: theme.shadows[2],
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'scale(1.02)',
       border:`1px solid ${theme.palette.primary.light}`,
  },
}))

export default function Testimonials({lang}:Props) {
  const theme = useTheme()
const [selected, setSelected] = useState<Testimonial | null>(null)

// Al hacer clic en una card del masonry
const handleClick = (item: RawTestimonial) => {
  const x = Math.floor(Math.random() * 70) + 10 // 10% - 80%
  const y = Math.floor(Math.random() * 70) + 10

  setSelected({ ...item, x, y })
}

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1300px',
        mx: 'auto',
        py: 6,
        px: 2,
        position: 'relative',
        overflow:"hidden"
      }}
    >
        <Typography
    variant="h3"
    textAlign="center"
    sx={{ mb: 1, fontWeight: 700, fontFamily: 'Poppins', color: '#333' }}
  >
    {lang === 'es'
      ? 'Testimonios Reales'
      : lang === 'en'
      ? 'Real Testimonials'
      : 'Témoignages Réels'}
  </Typography>

  {/* Subtítulo con términos destacados */}
  <Typography
    variant="subtitle1"
    textAlign="center"
    sx={{
      mb: 6,
      fontFamily: 'Poppins',
      color: '#555',
      maxWidth: 700,
      mx: 'auto',
    }}
  >
    {lang === 'es' ? (
      <>
        Conoce lo que opinan nuestros usuarios sobre la experiencia con{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          rendimiento
        </Box>
        ,{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          confiabilidad
        </Box>{' '}
        y{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          atención personalizada
        </Box>
        .
      </>
    ) : lang === 'en' ? (
      <>
        Discover what users think about our{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          performance
        </Box>
        ,{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          reliability
        </Box>{' '}
        and{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          personalized support
        </Box>
        .
      </>
    ) : (
      <>
        Découvrez ce que pensent nos utilisateurs de notre{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          performance
        </Box>
        ,{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          fiabilité
        </Box>{' '}
        et de notre{' '}
        <Box
          component="span"
          sx={{ color: '#00ADD8', fontWeight: 600 }}
        >
          support personnalisé
        </Box>
        .
      </>
    )}
  </Typography>
      {/* MASONRY GRID */}
     <Masonry columns={4} spacing={2}>
  {TESTIMONIALS.map((item, index) => {
    const height = heights[index % heights.length];
    const isCompact = height < 150;

    return (
      <Item
        key={item.id}
        onClick={() => handleClick(item)}
        sx={{
          height,
          overflow: 'hidden',
             border:`1px dotted ${theme.palette.primary.light}`,
        }}
      >
     
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: isCompact ? 'row' : 'column',
            alignItems: 'center',
            textAlign: isCompact ? 'left' : 'center',
         
            px: 1,
            py: 2,
            gap: 1,
          }}
        >
          {/* Avatar a la izquierda si compacto, arriba si no */}
          <Avatar
            src={item.avatar}
            alt={item.name}
            sx={{
              width: 56,
              height: 56,
              border: `1px dotted ${theme.palette.primary.light}`,
              boxShadow: `0 0 6px ${theme.palette.primary.light}`,
              mb: isCompact ? 0 : 0.5,
              mr: isCompact ? 2 : 0,
            }}
          />

          {/* Texto */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ color: '#00ADD8', lineHeight: 1.1 }}
            >
              {item.name}
            </Typography>

            <Typography
              variant="caption"
              color="#555"
              sx={{ fontSize: '0.7rem', mb: 0.5 }}
            >
              {item.role}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {Array.from({ length: 5 }).map((_, idx) =>
                idx < Math.floor(item.rating) ? (
                  <FaStar
                    key={idx}
                    color="#FFD700"
                    style={{ filter: 'drop-shadow(0 0 2px #FFD700)' }}
                  />
                ) : (
                  <FaRegStar key={idx} color="#ccc" />
                )
              )}

              <Typography
                variant="caption"
                sx={{ color: '#999', ml: 0.5, fontWeight: 600 }}
              >
                {item.rating.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Item>
    );
  })}
</Masonry>



      {/* PANEL SOBREPUESTO */}
   {selected && (
<Box
  component={motion.div}
  initial={{
    opacity: 0,
    scale: 0.3,
    rotateX: 80,
    rotateY: 30,
    filter: 'blur(8px)',
    y: -200,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    filter: 'blur(0px)',
    y: 0,
  }}
  exit={{
    opacity: 0,
    scale: 0.5,
    rotateX: -60,
    filter: 'blur(4px)',
    y: 100,
  }}
  transition={{
    duration: 0.9,
    type: 'spring',
    stiffness: 120,
    damping: 18,
  }}
  sx={{
    position: 'absolute',
    top: `${selected.y}%`,
    left: `${selected.x}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: 20,
    width: 400,
    bgcolor: '#fff',
    borderRadius: 4,
    boxShadow: 24,
    p: 3,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    perspective: '1000px', // ayuda al efecto 3D
  }}
>
    <IconButton
      onClick={() => setSelected(null)}
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <IoCloseCircleOutline />
    </IconButton>
    <Avatar
      src={selected.avatar}
      alt={selected.name}
      sx={{
        width: 80,
        height: 80,
        mb: 2,
        border: `3px solid ${theme.palette.primary.main}`,
      }}
    />
    <Typography variant="h6" fontWeight={700} sx={{ color: '#00ADD8' }}>
      {selected.name}
    </Typography>
    <Typography variant="subtitle2" sx={{ color: '#666', mb: 2 }}>
      {selected.role}
    </Typography> <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {Array.from({ length: 5 }).map((_, idx) =>
                idx < Math.floor(selected.rating) ? (
                  <FaStar
                    key={idx}
                    color="#FFD700"
                    style={{ filter: 'drop-shadow(0 0 2px #FFD700)' }}
                  />
                ) : (
                  <FaRegStar key={idx} color="#ccc" />
                )
              )}

              <Typography
                variant="caption"
                sx={{ color: '#999', ml: 0.5, fontWeight: 600 }}
              >
                {selected.rating.toFixed(1)}
              </Typography>
            </Box>
    <Typography variant="body1" sx={{ color: '#444', fontStyle: 'italic' }}>
      “{selected.quote}”
    </Typography>
  </Box>
)}
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