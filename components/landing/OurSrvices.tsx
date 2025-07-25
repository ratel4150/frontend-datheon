'use client'

import { Box,  Typography,Button, Chip } from '@mui/material'
import { FaRobot, FaCogs, FaLaptopCode, FaMobileAlt, FaPlug, FaCloud, FaCommentAlt, FaChartLine, FaBoxes, FaLanguage, FaChartPie, FaSearchDollar, FaCloudUploadAlt, FaShieldAlt, FaDatabase, FaUsersCog } from 'react-icons/fa'

import { SiNextdotjs } from 'react-icons/si'
import { useState } from 'react'
type Props = {
  lang: string
}


 const services = [
  {
    title: "Soluciones de Software Empresarial",
    icon: <FaLaptopCode size={36} color="#00ADD8" />,
    description: "Desarrollos a medida para optimizar tus operaciones digitales",
    features: [
      {
        icon: <SiNextdotjs />,
        title: "Aplicaciones Web de Alto Rendimiento",
        subtitle: "Frontend con React/Next.js + Backend en Django/Node.js (arquitectura serverless)"
      },
      {
        icon: <FaMobileAlt />,
        title: "Plataformas Móviles Multiplataforma",
        subtitle: "Apps nativas (Swift/Kotlin) e híbridas (Flutter) con offline sync"
      },
      {
        icon: <FaBoxes />,
        title: "Personalización Avanzada de Odoo",
        subtitle: "Módulos custom para manufactura, CRM y contabilidad (Python/XML)"
      },
      {
        icon: <FaPlug />,
        title: "Integraciones API Seguras",
        subtitle: "Conexión entre sistemas legacy y modernos con autenticación OAuth2.0"
      },
      {
        icon: <FaCloud />,
        title: "Infraestructura Cloud Escalable",
        subtitle: "AWS/GCP con Kubernetes, Terraform y auto-scaling"
      }
    ],
      mostRequested: true, // <- aquí
  },
  {
    title: "Inteligencia Artificial para Negocios",
    icon: <FaRobot size={36} color="#00ADD8" />,
    description: "Automatización cognitiva y análisis predictivo",
    features: [
      {
        icon: <FaCommentAlt />,
        title: "Asistentes Virtuales Inteligentes",
        subtitle: "Chatbots con NLP (GPT-4/Claude) y conexión a bases de conocimiento"
      },
      {
        icon: <FaCogs />,
        title: "Automatización de Procesos (RPA+IA)",
        subtitle: "Flujos con computer vision para PDF/escaneados (Python + OpenCV)"
      },
      {
        icon: <FaChartLine />,
        title: "Predictive Analytics",
        subtitle: "Forecasting de ventas con Prophet/XGBoost y detección de anomalías"
      },
      {
        icon: <FaBoxes />,
        title: "Odoo + IA: Asistente de Inventario",
        subtitle: "Recomendación automática de reposición usando series temporales"
      },
      {
        icon: <FaLanguage />,
        title: "Procesamiento de Lenguaje Natural",
        subtitle: "Clasificación de tickets con transformers (BERT/Spacy)"
      }
    ],
      mostRequested: false, // <- aquí
  },
  {
    title: "Estrategia y Transformación Digital",
    icon: <FaChartPie size={36} color="#00ADD8" />,
    description: "Maximiza el ROI de tu inversión tecnológica",
    features: [
      {
        icon: <FaSearchDollar />,
        title: "Auditoría de Arquitectura TI",
        subtitle: "Evaluación de tech stack y roadmap de optimización"
      },
      {
        icon: <FaCloudUploadAlt />,
        title: "Migración a la Nube",
        subtitle: "AWS/Azure con diseño multi-región y DRP"
      },
      {
        icon: <FaShieldAlt />,
        title: "Ciberseguridad Integral",
        subtitle: "Pentesting + hardening (OWASP/NIST) y ISO 27001"
      },
      {
        icon: <FaDatabase />,
        title: "ERP Strategy (Odoo Focus)",
        subtitle: "Benchmarking vs SAP/Dynamics y plan de implementación"
      },
      {
        icon: <FaUsersCog />,
        title: "Gestión del Cambio",
        subtitle: "Workshops para adopción tecnológica (Metodología ADKAR)"
      },
       {
        icon: <FaUsersCog />,
        title: "Gestión del Cambio",
        subtitle: "Workshops para adopción tecnológica (Metodología ADKAR)"
      }
    ],
      mostRequested: false,
  }
]

export default function OurServices({lang}:Props) {
  console.log(lang)
    
    const [loading, setLoading] = useState(false);

   

  return (
       <Box sx={{ py: 10, px: { xs: 2, md: 8 }, backgroundColor: '#F7FBFF' }}>
   <Typography
  variant="h3"
  textAlign="center"
  sx={{
    mb: 1,
    fontWeight: 700,
    fontFamily: 'Poppins',
    color: '#333',
  }}
>
  Nuestros Servicios
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
  Conoce cómo impulsamos tu empresa con soluciones innovadoras, inteligencia artificial y asesoría tecnológica especializada.
</Typography>

     <Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' }, // Apila en móviles, horizontal en tablets+
    gap: { xs: 4, sm: 6 },
    overflowX: { xs: 'auto', sm: 'visible' },
    overflowY: 'visible',
    pt: 8,
    pb: 4,
    px: { xs: 0.5, sm: 1 },
    mt: 6,
    scrollSnapType: { xs: 'x mandatory', sm: 'none' },
    WebkitOverflowScrolling: 'touch',
  }}
>
     {services.map((service, idx) => {
  const isMostRequested = service.mostRequested; // booleano dentro del array

  

  const handleClick = () => {
    if (loading) return;
    setLoading(true);

    const calendlyUrl = 'https://calendly.com/tu_usuario';
    const width = 800;
    const height = 700;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const win = window.open(
      calendlyUrl,
      'Calendly',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    if (win) win.focus();
    else alert('Permite ventanas emergentes para acceder a Calendly.');

    setTimeout(() => setLoading(false), 1500);
  };

  return (
      <Box
        key={idx}
        sx={{
          position: 'relative',
          flex: { xs: '0 0 92%', sm: '0 0 340px' }, // 92% para dejar margen horizontal
          minHeight: 520,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          pt: 10,
          pb: 4,
          px: 3,
          border: '1px dotted #00ADD8',
          transition: 'transform 0.3s ease',
          scrollSnapAlign: { xs: 'start', sm: 'none' },
          overflow: 'visible',
          '&:hover': {
            transform: { sm: 'translateY(-10px) scale(1.02)' }, // desactiva hover en mobile
            boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
          },
          mx: { xs: 'auto', sm: 0 }, // centra en mobile
        }}
      >
      {/* Icono circular */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '1px dotted #00ADD8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
          zIndex: 5,
        }}
      >
        {service.icon}
      </Box>

      {/* Chip destacado */}
      {isMostRequested && (
        <Chip
          label="Más solicitado"
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontFamily: 'Poppins',
            fontWeight: 600,
            backgroundColor: '#00ADD8',
            color: '#fff',
            boxShadow: '0 2px 6px rgba(0, 173, 216, 0.4)',
          }}
        />
      )}

      {/* Título */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          fontSize: '1.3rem',
          mb: 1.5,
          fontFamily: 'Poppins',
          color: '#333',
          textAlign: 'center',
        }}
      >
        {service.title}
      </Typography>

      {/* Descripción */}
      <Typography
        variant="body2"
        sx={{
          mb: 3,
          fontFamily: 'Poppins',
          color: '#555',
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        {service.description}
      </Typography>

      {/* Características */}
      <Box component="ul" sx={{ pl: 1, mb: 3 }}>
        {service.features.map((feature, i) => (
          <Box
            key={i}
            component="li"
            sx={{
              mb: 2,
              listStyle: 'none',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
            }}
          >
            <Box sx={{ mt: '3px', color: '#00ADD8' }}>{feature.icon}</Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  fontFamily: 'Poppins',
                  color: '#333',
                  mb: 0.5,
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: '#777',
                  fontSize: '0.8rem',
                  fontFamily: 'Poppins',
                }}
              >
                {feature.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Botón Calendly */}
      <Box sx={{ mt: 'auto' }}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          aria-label="Solicitar consulta con Calendly"
          disabled={loading}
          onClick={handleClick}
          sx={{
            fontFamily: 'Poppins',
            backgroundColor: loading ? '#008fb3' : '#00ADD8',
            color: '#fff',
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: loading
              ? '0 4px 20px rgba(0,139,179,0.6)'
              : '0 4px 20px rgba(0,173,216,0.3)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              backgroundColor: loading ? '#007792' : '#007EA7',
              boxShadow: loading
                ? '0 6px 30px rgba(0,139,179,0.8)'
                : '0 6px 30px rgba(0,173,216,0.5)',
            },
          }}
        >
          {loading ? 'Cargando...' : 'Solicitar Consulta'}
        </Button>
      </Box>
    </Box>
  );
})}
      </Box>
    </Box>
  )
}
