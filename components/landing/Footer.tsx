'use client';

import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa6';
import Grid from '@mui/material/GridLegacy';
import { usePathname } from 'next/navigation';

const FooterDatheon = () => {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'es'; // fallback a 'es'

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'black',
        color: '#F5F5F5',
        pt: 8,
        pb: 4,
        fontFamily: 'Poppins',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Logo + Misión */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: '#00ADD8', mb: 2 }}
            >
              Datheón
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', maxWidth: 360 }}>
              Inteligencia de datos y automatización empresarial para un futuro
              más ágil, preciso y conectado. Transformamos decisiones con
              tecnología.
            </Typography>
          </Grid>

          {/* Navegación */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Compañía
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/nosotros" underline="hover" sx={{ color: '#aaa' }}>
                Nosotros
              </Link>
              <Link href="/equipo" underline="hover" sx={{ color: '#aaa' }}>
                Equipo
              </Link>
              <Link href="/alianzas" underline="hover" sx={{ color: '#aaa' }}>
                Alianzas
              </Link>
              <Link href="/contacto" underline="hover" sx={{ color: '#aaa' }}>
                Contacto
              </Link>
            </Box>
          </Grid>

          {/* Soluciones */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Soluciones
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/ia" underline="hover" sx={{ color: '#aaa' }}>
                IA Predictiva
              </Link>
              <Link href="/automatizacion" underline="hover" sx={{ color: '#aaa' }}>
                Automatización
              </Link>
              <Link href="/dashboards" underline="hover" sx={{ color: '#aaa' }}>
                Dashboards Inteligentes
              </Link>
              <Link href="/integraciones" underline="hover" sx={{ color: '#aaa' }}>
                Integraciones
              </Link>
            </Box>
          </Grid>

          {/* Social media */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Conecta con nosotros
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              <Link href="https://x.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#00ADD8' }}>
                <FaXTwitter size={20} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#00ADD8' }}>
                <FaLinkedinIn size={20} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#00ADD8' }}>
                <FaInstagram size={20} />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#00ADD8' }}>
                <FaGithub size={20} />
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#222' }} />

        <Box textAlign="center">
          <Typography variant="body2" sx={{ color: '#777' }}>
            © {new Date().getFullYear()} Datheón. Todos los derechos reservados.
            {' '}
            ·{' '}
            <Link
              href={`/${lang}/privacy`}
              underline="hover"
              sx={{ color: '#4FC3F7', ml: 1 }}
            >
              Aviso de Privacidad
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterDatheon;
