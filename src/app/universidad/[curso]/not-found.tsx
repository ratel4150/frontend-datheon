// File: frontend-datheon/src/app/universidad/[curso]/not-found.tsx
import Link from 'next/link'
import { Box, Typography, Button } from '@mui/material'

export default function NotFound() {
  return (
    <Box sx={{ bgcolor: '#0A0C10', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#F1F5F9', fontFamily: 'Poppins, sans-serif', p: 3 }}>
      <Typography sx={{ fontSize: '5rem', mb: 2, lineHeight: 1 }}>🔍</Typography>
      <Typography sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, mb: 1, textAlign: 'center' }}>
        Subsección no encontrada
      </Typography>
      <Typography sx={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', mb: 4, textAlign: 'center', maxWidth: 400 }}>
        Esta subsección no existe o fue eliminada. Regresa al curso y elige otra.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button component={Link} href="/universidad" variant="contained"
          sx={{ bgcolor: '#00AEEF', color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', px: 3, '&:hover': { bgcolor: '#0099d4' } }}>
          Mis cursos
        </Button>
        <Button onClick={() => history.back()} variant="outlined"
          sx={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'none', borderRadius: '10px', px: 3, '&:hover': { borderColor: '#00AEEF', color: '#00AEEF' } }}>
          Volver
        </Button>
      </Box>
    </Box>
  )
}