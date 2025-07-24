'use client'
import React from 'react'
import { Box, Typography,  Paper, GridLegacy, Grid } from '@mui/material'
import { motion } from 'framer-motion'

const TEAM = [
  {
    name: 'Angel Clavellina',
    role: 'Sr. Analista de Datos',
    avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHd9kB8Ua8LYQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731383645850?e=1756339200&v=beta&t=D4LkNwSC5f-XYYOVJETmufF0Wg2xefwO_3oRdEecv_A',
  },
  {
    name: 'Arturo Chavez',
    role: 'Sr. Developer',
    avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHo5dvV_WeVDQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704060418269?e=1756339200&v=beta&t=RfzPI_QdFeMT2U7acC1B5cfktdybnI7buc0Eii-TrAg',
  },
 
]

type Props = {
  lang: string
}

function OurTeam({lang}:Props) {
  return (
    <Box sx={{ py: 10, px: 3, bgcolor: 'white', position: 'relative' }}>
  <Typography
  variant="h3"
  textAlign="center"
  sx={{ mb: 1, fontWeight: 700, fontFamily: 'Poppins', color: '#333' }}
>
  {lang === 'es'
    ? 'Nuestro Equipo'
    : lang === 'en'
    ? 'Our Team'
    : 'Notre Équipe'}
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
      Un grupo multidisciplinario que combina <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>tecnología</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>creatividad</Box> y <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>visión estratégica</Box> para llevar tus ideas al siguiente nivel.
    </>
  ) : lang === 'en' ? (
    <>
      A multidisciplinary team that blends <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>technology</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>creativity</Box>, and <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>strategic vision</Box> to elevate your ideas to the next level.
    </>
  ) : (
    <>
      Une équipe multidisciplinaire qui allie <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>technologie</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>créativité</Box> et <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>vision stratégique</Box> pour porter vos idées à un niveau supérieur.
    </>
  )}
</Typography>


    

        <Grid container spacing={4} justifyContent="center">
  {TEAM.map((member, i) => (
    <GridLegacy key={i} item xs={12} sm={6} md={4} lg={3}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7, delay: i * 0.1 }}
      >
        <Paper
          elevation={8}
          sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            bgcolor: 'rgba(0, 173, 216, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.4s ease-in-out',
            textAlign: 'center',
            position: 'relative',
            '&:hover .member-name': {
              color: '#00ADD8',
            },
             '&:hover .member-role': {
                color: '#555',
            },
          }}
        >
             <Box
    component="img"
    src="/next.svg"
    alt="Company Logo"
    sx={{
      position: 'absolute',
      top: 12,
      right: 12,
      width: 32,
      height: 32,
      opacity: 0.8,
    }}
  />
          <Box
            component="img"
            src={member.avatar}
            alt={member.name}
            sx={{
              width: '100%',
              height: 280,
              objectFit: 'cover',
            }}
          />

          <Box sx={{ p: 3 }}>
            <Typography
              variant="h6"
              className="member-name"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                color: '#555',
                transition: 'color 0.3s ease',
              }}
            >
              {member.name}
            </Typography>
            <Typography
                 className="member-role"
              variant="body2"
              sx={{
                fontFamily: 'Poppins',
                color: '#00ADD8',
                fontWeight: 500,
              }}
            >
              {member.role}
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </GridLegacy>
  ))}
</Grid>

    </Box>
  )
}

export default OurTeam
