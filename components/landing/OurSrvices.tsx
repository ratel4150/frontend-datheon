'use client'

import { Box,  Typography,Button, Chip } from '@mui/material'
import { FaRobot, FaCogs, FaLaptopCode, FaMobileAlt, FaPlug, FaCloud, FaCommentAlt, FaChartLine, FaBoxes, FaLanguage, FaChartPie, FaSearchDollar, FaCloudUploadAlt, FaShieldAlt, FaDatabase, FaUsersCog } from 'react-icons/fa'
import ReactGA from 'react-ga4'
import { SiNextdotjs } from 'react-icons/si'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { getDeviceData } from '../../lib/tracking/deviceTracking'
type Props = {
  lang: string
}


const services = {
  es: [
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
      mostRequested: true,
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
      mostRequested: false,
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
  ],
   en: [
    {
      title: "Enterprise Software Solutions",
      icon: <FaLaptopCode size={36} color="#00ADD8" />,
      description: "Custom developments to optimize your digital operations",
      features: [
        {
          icon: <SiNextdotjs />,
          title: "High Performance Web Applications",
          subtitle: "Frontend with React/Next.js + Backend in Django/Node.js (serverless architecture)"
        },
        {
          icon: <FaMobileAlt />,
          title: "Cross-Platform Mobile Platforms",
          subtitle: "Native apps (Swift/Kotlin) and hybrid apps (Flutter) with offline sync"
        },
        {
          icon: <FaBoxes />,
          title: "Advanced Odoo Customization",
          subtitle: "Custom modules for manufacturing, CRM and accounting (Python/XML)"
        },
        {
          icon: <FaPlug />,
          title: "Secure API Integrations",
          subtitle: "Connection between legacy and modern systems with OAuth2.0 authentication"
        },
        {
          icon: <FaCloud />,
          title: "Scalable Cloud Infrastructure",
          subtitle: "AWS/GCP with Kubernetes, Terraform and auto-scaling"
        }
      ],
      mostRequested: true,
    },
    {
      title: "Artificial Intelligence for Business",
      icon: <FaRobot size={36} color="#00ADD8" />,
      description: "Cognitive automation and predictive analytics",
      features: [
        {
          icon: <FaCommentAlt />,
          title: "Intelligent Virtual Assistants",
          subtitle: "NLP chatbots (GPT-4/Claude) with knowledge base integration"
        },
        {
          icon: <FaCogs />,
          title: "Process Automation (RPA+AI)",
          subtitle: "Workflows with computer vision for PDF/scanned documents (Python + OpenCV)"
        },
        {
          icon: <FaChartLine />,
          title: "Predictive Analytics",
          subtitle: "Sales forecasting with Prophet/XGBoost and anomaly detection"
        },
        {
          icon: <FaBoxes />,
          title: "Odoo + AI: Inventory Assistant",
          subtitle: "Automatic restocking recommendations using time series"
        },
        {
          icon: <FaLanguage />,
          title: "Natural Language Processing",
          subtitle: "Ticket classification with transformers (BERT/Spacy)"
        }
      ],
      mostRequested: false,
    },
    {
      title: "Digital Strategy and Transformation",
      icon: <FaChartPie size={36} color="#00ADD8" />,
      description: "Maximize ROI on your technology investment",
      features: [
        {
          icon: <FaSearchDollar />,
          title: "IT Architecture Audit",
          subtitle: "Tech stack evaluation and optimization roadmap"
        },
        {
          icon: <FaCloudUploadAlt />,
          title: "Cloud Migration",
          subtitle: "AWS/Azure with multi-region design and DRP"
        },
        {
          icon: <FaShieldAlt />,
          title: "Comprehensive Cybersecurity",
          subtitle: "Pentesting + hardening (OWASP/NIST) and ISO 27001"
        },
        {
          icon: <FaDatabase />,
          title: "ERP Strategy (Odoo Focus)",
          subtitle: "Benchmarking vs SAP/Dynamics and implementation plan"
        },
        {
          icon: <FaUsersCog />,
          title: "Change Management",
          subtitle: "Technology adoption workshops (ADKAR Methodology)"
        },
        {
          icon: <FaUsersCog />,
          title: "Change Management",
          subtitle: "Technology adoption workshops (ADKAR Methodology)"
        }
      ],
      mostRequested: false,
    }
  ],
  fr: [
    {
      title: "Solutions Logicielles d'Entreprise",
      icon: <FaLaptopCode size={36} color="#00ADD8" />,
      description: "Développements sur mesure pour optimiser vos opérations numériques",
      features: [
        {
          icon: <SiNextdotjs />,
          title: "Applications Web Haute Performance",
          subtitle: "Frontend avec React/Next.js + Backend en Django/Node.js (architecture serverless)"
        },
        {
          icon: <FaMobileAlt />,
          title: "Plateformes Mobiles Multiplateformes",
          subtitle: "Applications natives (Swift/Kotlin) et hybrides (Flutter) avec synchronisation hors ligne"
        },
        {
          icon: <FaBoxes />,
          title: "Personnalisation Avancée d'Odoo",
          subtitle: "Modules personnalisés pour la fabrication, CRM et comptabilité (Python/XML)"
        },
        {
          icon: <FaPlug />,
          title: "Intégrations API Sécurisées",
          subtitle: "Connexion entre systèmes legacy et modernes avec authentification OAuth2.0"
        },
        {
          icon: <FaCloud />,
          title: "Infrastructure Cloud Évolutive",
          subtitle: "AWS/GCP avec Kubernetes, Terraform et mise à l'échelle automatique"
        }
      ],
      mostRequested: true,
    },
    {
      title: "Intelligence Artificielle pour les Entreprises",
      icon: <FaRobot size={36} color="#00ADD8" />,
      description: "Automatisation cognitive et analyse prédictive",
      features: [
        {
          icon: <FaCommentAlt />,
          title: "Assistants Virtuels Intelligents",
          subtitle: "Chatbots avec NLP (GPT-4/Claude) et connexion aux bases de connaissances"
        },
        {
          icon: <FaCogs />,
          title: "Automatisation des Processus (RPA+IA)",
          subtitle: "Flux avec vision par ordinateur pour PDF/documents scannés (Python + OpenCV)"
        },
        {
          icon: <FaChartLine />,
          title: "Analyse Prédictive",
          subtitle: "Prévision des ventes avec Prophet/XGBoost et détection d'anomalies"
        },
        {
          icon: <FaBoxes />,
          title: "Odoo + IA: Assistant d'Inventaire",
          subtitle: "Recommandation automatique de réapprovisionnement utilisant des séries temporelles"
        },
        {
          icon: <FaLanguage />,
          title: "Traitement du Langage Naturel",
          subtitle: "Classification des tickets avec transformers (BERT/Spacy)"
        }
      ],
      mostRequested: false,
    },
    {
      title: "Stratégie et Transformation Digitale",
      icon: <FaChartPie size={36} color="#00ADD8" />,
      description: "Maximisez le ROI de votre investissement technologique",
      features: [
        {
          icon: <FaSearchDollar />,
          title: "Audit d'Architecture TI",
          subtitle: "Évaluation de la pile technologique et feuille de route d'optimisation"
        },
        {
          icon: <FaCloudUploadAlt />,
          title: "Migration vers le Cloud",
          subtitle: "AWS/Azure avec conception multi-région et plan de reprise d'activité"
        },
        {
          icon: <FaShieldAlt />,
          title: "Cybersécurité Intégrale",
          subtitle: "Pentesting + durcissement (OWASP/NIST) et ISO 27001"
        },
        {
          icon: <FaDatabase />,
          title: "Stratégie ERP (Focus Odoo)",
          subtitle: "Benchmarking vs SAP/Dynamics et plan de mise en œuvre"
        },
        {
          icon: <FaUsersCog />,
          title: "Gestion du Changement",
          subtitle: "Ateliers pour l'adoption technologique (Méthodologie ADKAR)"
        },
        {
          icon: <FaUsersCog />,
          title: "Gestion du Changement",
          subtitle: "Ateliers pour l'adoption technologique (Méthodologie ADKAR)"
        }
      ],
      mostRequested: false,
    }
  ]
  
};


const translations = {
  title: {
    es: "Nuestros Servicios",
    en: "Our Services",
    fr: "Nos Services"
  },
   subtitle: {
    es: (
      <>Conoce cómo impulsamos tu empresa con soluciones innovadoras, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>inteligencia artificial</Box> y <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>asesoría tecnológica especializada</Box>.</>
    ),
    en: (
      <>Discover how we boost your business with <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>innovative solutions</Box>, <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>artificial intelligence</Box> and <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>specialized technology consulting</Box>.</>
    ),
   fr: (
  <>Découvrez comment nous boostons votre entreprise avec des <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>solutions innovantes</Box>, l&apos;<Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>intelligence artificielle</Box> et des <Box component="span" sx={{ color: '#00ADD8', fontWeight: 600 }}>conseils technologiques spécialisés</Box>.</>
)
  },
  button: {
    es: "Solicitar Consulta",
    en: "Request Consultation",
    fr: "Demander une Consultation"
  },
  loading: {
    es: "Cargando...",
    en: "Loading...",
    fr: "Chargement..."
  },
  mostRequested: {
    es: "Más solicitado",
    en: "Most requested",
    fr: "Plus Demandé"
  },
  popupAlert: {
    es: "Permite ventanas emergentes para acceder a Calendly.",
    en: "Please allow popups to access Calendly.",
    fr: "Veuillez autoriser les fenêtres pop-up pour accéder à Calendly."
  }
};

export default function OurServices({lang}:Props) {
  

 // Obtiene los servicios en el idioma seleccionado o español por defecto
  const currentServices = services[lang as keyof typeof services] || services.es;
     const ref = useRef(null)
     const isInView = useInView(ref, { once: true })
    const [loading, setLoading] = useState(false);


useEffect(() => {
  if (isInView && typeof window !== 'undefined') {
    // Obtener datos del dispositivo
    const deviceData = getDeviceData();
    
    // Datos comunes para todos los trackers
    const trackingData = {
      ...deviceData,
      section_name: 'OurServices',
      section_visibility: '100%',
      timestamp: new Date().toISOString(),
      event_id: crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 9),
      page_url: window.location.href,
      user_agent: navigator.userAgent
    };

    // Facebook Pixel (con datos de dispositivo)
    if (window.fbq) {
      window.fbq('trackCustom', 'SectionView', {
        ...trackingData,
        content_name: 'OurServicesSectionViewed',
        content_category: 'Section Visibility'
      });
    }

    // Google Analytics 4 (gtag con datos enriquecidos)
    if (window.gtag) {
      window.gtag('event', 'section_view', {
        ...trackingData,
        engagement_time: 1.0, // Tiempo en segundos
        method: 'scroll'
      });

      // También con ReactGA para compatibilidad
      ReactGA.event({
        category: 'SectionViews',
        action: 'OurServicesSectionViewed',
        label: deviceData.browser,
        value: 1,
        nonInteraction: true
      });
    }

    // Google Tag Manager (datos completos)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'sectionView',
      ...trackingData
    });

    // Debug (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 OurServices section tracking:', trackingData);
    }
  }
}, [isInView]);
   

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
{translations.title[lang as keyof typeof translations.title] || translations.title.es}
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
  {translations.subtitle[lang as keyof typeof translations.subtitle] || translations.subtitle.es}
</Typography>

     <Box
  sx={{justifyContent: { xs: 'flex-start', sm: 'center' },
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
     {currentServices.map((service, idx) => {
  const isMostRequested = service.mostRequested; // booleano dentro del array

 

 const handleClick = (serviceTitle: string) => {
  if (loading) return;
  setLoading(true);

  // Tracking analítico
  if (typeof window !== 'undefined') {
    const userAgent = navigator.userAgent;
    const language = navigator.language || 'es';
    const referrer = document.referrer || 'direct';
    const eventoId = crypto.randomUUID?.() ?? Math.random().toString(36);

    // Datos comunes para todos los trackers
    const trackingData = {
      plan: 'Premium',
      servicio: serviceTitle, // Usamos el título del servicio dinámicamente
      canal: 'LandingPage',
      ubicacion: 'OurServicesSection', // Actualizado a la sección correcta
      idioma: language,
      referrer,
      navegador: userAgent,
      timestamp: new Date().toISOString(),
      conversion_intent: true,
      step: 'click_boton_agendar_servicio', // Actualizado al paso correcto
      evento_unico_id: eventoId,
    };

    // Facebook Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'ServicioAgendado', trackingData);
    }

    // Google Analytics 4
    if (typeof ReactGA !== 'undefined') {
      ReactGA.event({
        category: 'Servicios',
        action: 'click_agendar_servicio',
        label: serviceTitle,
        value: 1,
        nonInteraction: false,
      });

      ReactGA.gtag('event', 'servicio_agendado', trackingData);
    }

    // Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ServicioAgendado',
      ...trackingData
    });
  }

  // Apertura de Calendly (puedes personalizar la URL por servicio si es necesario)
  const calendlyUrl = `https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica`;
  const width = 800;
  const height = 700;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;

  const win = window.open(
    calendlyUrl,
    'Calendly',
    `width=${width},height=${height},left=${left},top=${top}`
  );
  
  if (win) {
    win.focus();
  } else {
    alert(translations.popupAlert[lang as keyof typeof translations.popupAlert] || translations.popupAlert.es);
  }

  setTimeout(() => setLoading(false), 1500);
};

  return (
      <Box
  key={idx}
  sx={{
    position: 'relative',
    width: { xs: '90%', sm: '320px', md: '340px' },
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
    mx: { xs: 'auto', sm: 2 }, // Centrado en mobile, con espacio entre tarjetas en desktop
    '&:hover': {
      transform: { sm: 'translateY(-10px) scale(1.02)' },
      boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
    },
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
       label={translations.mostRequested[lang as keyof typeof translations.mostRequested] || translations.mostRequested.es}
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
       aria-label={translations.button[lang as keyof typeof translations.button] || translations.button.es}
          disabled={loading}
          onClick={() => handleClick(service.title)}
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
 {loading 
    ? translations.loading[lang as keyof typeof translations.loading] || translations.loading.es
    : translations.button[lang as keyof typeof translations.button] || translations.button.es}
        </Button>
      </Box>
    </Box>
  );
})}
      </Box>
    </Box>
  )
}
