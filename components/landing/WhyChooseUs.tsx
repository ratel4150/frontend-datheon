'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,

  Paper,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';
import {
  FaRobot,
  FaTools,
  FaChartLine,
  FaLaptopCode,
  FaClock,
  FaUserTie,
} from 'react-icons/fa';

const treemapData = [
  { name: 'IA', size: 400 },
  { name: 'Cloud', size: 300 },
  { name: 'Software Empresarial', size: 300 },
  { name: 'Automatización', size: 200 },
  { name: 'Ciberseguridad', size: 100 },
];

const items = [
  {
    title: 'Experiencia Contrastada',
    description:
      'Más de 2 años desarrollando soluciones tecnológicas para empresas líderes en múltiples sectores.',
    icon: <FaChartLine size={26} color="#00ADD8" />,
  },
  {
    title: 'Enfoque Personalizado',
    description:
      'Cada solución se diseña específicamente para las necesidades y procesos únicos de tu empresa.',
    icon: <FaTools size={26} color="#00ADD8" />,
  },
  {
    title: 'Última Tecnología',
    description:
      'Utilizamos las últimas tecnologías en IA, cloud computing y desarrollo de software empresarial.',
    icon: <FaRobot size={26} color="#00ADD8" />,
  },
  {
    title: 'Soporte Continuo',
    description:
      'Acompañamiento post-implementación con soporte técnico 24/7 y actualizaciones constantes.',
    icon: <FaClock size={26} color="#00ADD8" />,
  },
  {
    title: 'ROI Medible',
    description:
      'Diseñamos soluciones enfocadas en resultados concretos y retorno de inversión sostenible.',
    icon: <FaLaptopCode size={26} color="#00ADD8" />,
  },
  {
    title: 'Equipo Especializado',
    description:
      'Expertos en desarrollo, ciencia de datos, IA y arquitectura empresarial.',
    icon: <FaUserTie size={26} color="#00ADD8" />,
  },
];

type Props={
    lang:string
}

export default function WhyChooseUs({lang}:Props) {
  
  const [isClient, setIsClient] = useState(false);

  // 🔐 Evita errores SSR: solo renderiza el gráfico en cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box sx={{ bgcolor: '#fff', py: 12, px: { xs: 2, md: 6 } }}>
   <Typography
  variant="h3"
  textAlign="center"
  sx={{ mb: 1, fontWeight: 700, fontFamily: 'Poppins', color: '#333' }}
>
  {lang === 'es'
    ? '¿Por qué elegirnos?'
    : lang === 'en'
    ? 'Why Choose Us?'
    : 'Pourquoi Nous Choisir ?'}
</Typography>

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
      Nuestra propuesta combina <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>experiencia comprobada</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>innovación tecnológica</Box> y <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>resultados medibles</Box> que impulsan el crecimiento sostenible de tu empresa.
    </>
  ) : lang === 'en' ? (
    <>
      Our approach blends <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>proven experience</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>technological innovation</Box>, and <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>measurable results</Box> that drive your company’s sustainable growth.
    </>
  ) : (
    <>
      Notre approche allie <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>expérience éprouvée</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>innovation technologique</Box> et <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>résultats mesurables</Box> pour stimuler la croissance durable de votre entreprise.
    </>
  )}
</Typography>


      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Sección del gráfico Treemap */}
      <Grid item xs={12} md={6}>
  <Box
    sx={{
      px: { xs: 0, md: 4 },
      py: 2,
    }}
  >
    <Typography
      variant="h5"
      fontWeight={700}
      color="#00ADD8"
      mb={2}
      fontFamily="Poppins"
    >
      Tecnología utilizada en nuestras soluciones
    </Typography>

    <Typography variant="body2" color="#333" mb={3} fontFamily="Poppins">
      Este gráfico representa la proporción de tecnologías clave que
      aplicamos en los proyectos de transformación digital. Destacamos
      nuestra fuerte integración con Inteligencia Artificial, soluciones
      en la nube y software empresarial. Cada bloque indica la relevancia
      y profundidad de uso en nuestras implementaciones.
    </Typography>

    {isClient && (
      <ResponsiveContainer width="100%" height={320}>
        <Treemap
          data={treemapData}
          dataKey="size"
          stroke="#fff"
          fill="#00ADD8"
          aspectRatio={1}
          content={({ x, y, width, height, name }) => (
            <g>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill="#00ADD8"
                stroke="#fff"
                rx={6}
                ry={6}
              />
              {width > 60 && height > 30 && (
                <text
                  x={x + width / 2}
                  y={y + height / 2}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={12}
                  fontFamily="Poppins"
                >
                  {name}
                </text>
              )}
            </g>
          )}
        >
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const item = payload[0].payload;
              return (
                <Box
                  sx={{
                    p: 1,
                    bgcolor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    fontSize: 12,
                  }}
                >
                  <strong>{item.name}</strong>
                  <br />
                  Participación: {item.size}
                </Box>
              );
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    )}
  </Box>
</Grid>


        {/* Sección de características */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {items.slice(0, 3).map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 4,
                    bgcolor: '#fafafa',
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    {item.icon}
                    <Typography variant="subtitle2" fontWeight={700} color="#00ADD8" ml={1}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="#333" fontFamily="Poppins">
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} mt={2}>
            {items.slice(3).map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 4,
                    bgcolor: '#fafafa',
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    {item.icon}
                    <Typography variant="subtitle2" fontWeight={700} color="#00ADD8" ml={1}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="#333" fontFamily="Poppins">
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
