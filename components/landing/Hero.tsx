'use client'


import { Box, Typography, Button} from '@mui/material'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4'
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiRuby,
  SiGo,
  SiRust,
  SiKotlin,
  SiSwift,
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiPrisma,
  SiJest,
  SiFlutter,
  SiDart,
  SiGit,
  SiGithub,
  SiGitlab,
  SiLinux,
  SiGooglecloud,
  SiFirebase,
  SiCplusplus,
  SiC,
  SiDotnet,
  SiVite,
  SiWebpack,
  SiEslint,
  SiPrettier,
  SiNpm,
  SiYarn,
  SiBabel,
  // Para n8n, si no existe el icono oficial en react-icons, se puede usar un SVG custom o un icono alternativo
  // Ejemplo, si tienes el icono importado como SiN8n:
 
} from 'react-icons/si';

type Props = {
  lang: string
}



  const content = {
  es: {
    title: 'Consultora tecnológica para empresas',
    subtitle: 'Desarrollamos software a medida y soluciones de IA para automatizar tu negocio.',
    description:
      'Impulsamos el crecimiento de tu negocio con soluciones tecnológicas personalizadas que generan resultados medibles y sostenibles.',
    cta: 'Solicitar consulta gratuita',
  },
  en: {
    title: 'Tech consulting for businesses',
    subtitle: 'We build custom software and AI solutions to automate your business.',
    description:
      'We drive business growth through tailored technology that delivers measurable and sustainable results.',
    cta: 'Request a free consultation',
  },
  fr: {
    title: 'Consultation technologique pour entreprises',
    subtitle:
      'Nous développons des logiciels sur mesure et des solutions d’IA pour automatiser votre entreprise.',
    description:
      'Nous accélérons la croissance de votre entreprise grâce à des solutions technologiques personnalisées, durables et mesurables.',
    cta: 'Demander une consultation gratuite',
  },
}

const counterContent = {
  es: {
    title: 'Nuestro impacto en cifras',
    subtitle: 'Resultados reales de un equipo especializado.',
    counters: [
      {
        title: 'Clientes satisfechos',
        subtitle: 'Empresas que confían en nuestro trabajo',
        value: 50,  // ~5% de 12,000
      },
      {
        title: 'Proyectos completados',
        subtitle: 'Soluciones implementadas con éxito',
        value: 17,   // ~5% de 340
      },
      {
        title: 'Equipo técnico',
        subtitle: 'Programadores dedicados',
        value: 3,    // Valor exacto solicitado
      },
    ],
  },
  en: {
    title: 'Our impact in numbers',
    subtitle: 'Real outcomes from a specialized team.',
    counters: [
      {
        title: 'Happy clients',
        subtitle: 'Companies trusting our work',
        value: 600,
      },
      {
        title: 'Completed projects',
        subtitle: 'Successfully deployed solutions',
        value: 17,
      },
      {
        title: 'Tech team',
        subtitle: 'Dedicated developers',
        value: 3,
      },
    ],
  },
  fr: {
    title: 'Notre impact en chiffres',
    subtitle: 'Résultats réels d’une équipe spécialisée.',
    counters: [
      {
        title: 'Clients satisfaits',
        subtitle: 'Entreprises qui nous font confiance',
        value: 600,
      },
      {
        title: 'Projets finalisés',
        subtitle: 'Solutions déployées avec succès',
        value: 17,
      },
      {
        title: 'Équipe technique',
        subtitle: 'Développeurs dédiés',
        value: 3,
      },
    ],
  },
};



const icons = [
  { Icon: SiJavascript, name: 'JavaScript' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: SiPython, name: 'Python' },
  { Icon: SiPhp, name: 'PHP' },
  { Icon: SiRuby, name: 'Ruby' },
  { Icon: SiGo, name: 'Go' },
  { Icon: SiRust, name: 'Rust' },
  { Icon: SiKotlin, name: 'Kotlin' },
  { Icon: SiSwift, name: 'Swift' },
  { Icon: SiHtml5, name: 'HTML5' },
  { Icon: SiCss3, name: 'CSS3' },
  { Icon: SiSass, name: 'Sass' },
  { Icon: SiTailwindcss, name: 'Tailwind' },
  { Icon: SiReact, name: 'React' },
  { Icon: SiNextdotjs, name: 'Next.js' },
  { Icon: SiAngular, name: 'Angular' },
  { Icon: SiVuedotjs, name: 'Vue.js' },
  { Icon: SiNodedotjs, name: 'Node.js' },
  { Icon: SiExpress, name: 'Express' },
  { Icon: SiNestjs, name: 'NestJS' },
  { Icon: SiMongodb, name: 'MongoDB' },
  { Icon: SiPostgresql, name: 'PostgreSQL' },
  { Icon: SiMysql, name: 'MySQL' },
  { Icon: SiRedis, name: 'Redis' },
  { Icon: SiDocker, name: 'Docker' },
  { Icon: SiKubernetes, name: 'Kubernetes' },
  { Icon: SiGraphql, name: 'GraphQL' },
  { Icon: SiPrisma, name: 'Prisma' },
  { Icon: SiJest, name: 'Jest' },
  { Icon: SiFlutter, name: 'Flutter' },
  { Icon: SiDart, name: 'Dart' },
  { Icon: SiGit, name: 'Git' },
  { Icon: SiGithub, name: 'GitHub' },
  { Icon: SiGitlab, name: 'GitLab' },
  { Icon: SiLinux, name: 'Linux' },
  { Icon: SiGooglecloud, name: 'Google Cloud' },
  { Icon: SiFirebase, name: 'Firebase' },
  { Icon: SiCplusplus, name: 'C++' },
  { Icon: SiC, name: 'C' },
  { Icon: SiDotnet, name: '.NET' },
  { Icon: SiVite, name: 'Vite' },
  { Icon: SiWebpack, name: 'Webpack' },
  { Icon: SiEslint, name: 'ESLint' },
  { Icon: SiPrettier, name: 'Prettier' },
  { Icon: SiNpm, name: 'npm' },
  { Icon: SiYarn, name: 'Yarn' },
  { Icon: SiBabel, name: 'Babel' },
 
];




export const Hero = ({ lang }: Props) => {
  const t = content[lang as keyof typeof content] || content.en
  const tcounter = counterContent[lang as keyof typeof counterContent] || counterContent.en
 /*     const theme = useTheme() */
/*   const isMobile = useMediaQuery(theme.breakpoints.down('sm')) */
   const ref = useRef(null)
    const isInView = useInView(ref, { once: true })


      useEffect(() => {
  if (isInView && typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'HeroSectionViewed')
  }
}, [isInView])

const handleClick = () => {
  if (typeof window !== 'undefined') {
    const userAgent = navigator.userAgent
    const language = navigator.language || 'es'
    const referrer = document.referrer || 'direct'
    const eventoId = crypto.randomUUID?.() ?? Math.random().toString(36)

    // Facebook Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'ConsultoriaAgendada', {
        plan: 'Premium',
        servicio: 'Consultoría Estratégica',
        canal: 'LandingPage',
        ubicacion: 'HeroSection',
        idioma: language,
        referrer,
        navegador: userAgent,
        timestamp: new Date().toISOString(),
        conversion_intent: true,
        step: 'click_boton_agendar',
        evento_unico_id: eventoId,
      })
      console.log('[Pixel] ConsultoriaAgendada enviada con metadata rica')
    } else {
      console.warn('[Pixel] fbq no está definido en window')
    }

    // Google Analytics 4
    ReactGA.event({
      category: 'Conversiones',
      action: 'click_agendar_consultoria',
      label: 'Consultoría Estratégica',
      value: 1,
      nonInteraction: false,
    })

    ReactGA.gtag('event', 'consultoria_agendada', {
      plan: 'Premium',
      servicio: 'Consultoría Estratégica',
      canal: 'LandingPage',
      ubicacion: 'HeroSection',
      idioma: language,
      referrer,
      navegador: userAgent,
      conversion_intent: true,
      step: 'click_boton_agendar',
      evento_unico_id: eventoId,
    })

    console.log('[GA4] consultoria_agendada enviada con metadata rica')

    // Google Tag Manager
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'ConsultoriaAgendada',
      plan: 'Premium',
      servicio: 'Consultoría Estratégica',
      canal: 'LandingPage',
      ubicacion: 'HeroSection',
      idioma: language,
      referrer,
      navegador: userAgent,
      conversion_intent: true,
      step: 'click_boton_agendar',
      evento_unico_id: eventoId,
    })

    console.log('[GTM] ConsultoriaAgendada enviada a dataLayer')
  }
}


  return (
      <Box
      component={motion.section}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        px: 4,
        pt: 10,
        backgroundColor: '#FFFFFF',
        color: '#2D3748',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}

      
      
      
    >
           {/* SVG Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.4, // controla visibilidad
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="a"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100%" height="100%" fill="#fff" />
              <path
                fill="none"
                stroke="#ecc94b"
                strokeLinecap="square"
                strokeWidth=".5"
                d="M20-5V5m0 30v10m20-30v10M0 15v10"
              />
              <path
                fill="none"
                stroke="#f44034"
                strokeLinecap="square"
                strokeWidth=".5"
                d="M-5 40H5M-5 0H5m30 0h10M35 40h10M15 20h10"
              />
            </pattern>
          </defs>
          <rect width="800%" height="800%" fill="url(#a)" />
        </svg>
      </Box>
      {/* Glow Background */}
      <Box
        sx={{
          position: 'absolute',
          top: '-100px',
          right: '-120px',
          width: 400,
          height: 400,
          background: '#005B96',
          borderRadius: '50%',
          filter: 'blur(180px)',
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <Box sx={{ zIndex: 2, maxWidth: '800px' }}>
   <Typography
  variant="h1"
  component={motion.h1}
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
  sx={{
    fontFamily: '"Poppins", "Montserrat", sans-serif',
    fontSize: {
      xs: '2.5rem',
      sm: '3.5rem',
      md: '4.5rem',
      lg: '5rem',
      xl: '5.5rem',
    },
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    background: 'linear-gradient(90deg, #2c3e50, #34495e)', // gris azulado serio y sobrio
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    lineHeight: 1.15,
    mb: 3,

    /* Sombras sutiles para profundidad y elegancia */
    textShadow: `
      0 1px 2px rgba(0, 0, 0, 0.25),
      0 3px 6px rgba(0, 0, 0, 0.15)
    `,

    /* Animación suave para dar vida sin exagerar */
    animation: 'gradientShift 8s ease-in-out infinite alternate',
  }}
>
  {t.title}

  <style>
    {`
      @keyframes gradientShift {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 100% 50%;
        }
      }
    `}
  </style>
</Typography>


<Typography
  variant="h5"
  component={motion.p}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  sx={{
    mt: 3,
    color: '#00ADD8', // Azul Golang
    fontWeight: 700, // bold
    fontSize: { xs: '1.125rem', md: '1.375rem' },
    lineHeight: 1.75,
    maxWidth: { xs: '90%', md: '70%' },
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: '"Montserrat", sans-serif', // fuente para subtítulos
    letterSpacing: '0.015em',
    textAlign: 'center',

    // Degradado azul con brillo sutil
    background: 'linear-gradient(90deg, #00ADD8, #4FC3F7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    // Sombra ligera para contraste
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',

    // Hover elegante
    transition: 'text-shadow 0.3s ease',
    '&:hover': {
      textShadow: '0 2px 6px rgba(0, 173, 216, 0.25)',
      cursor: 'default',
    },
  }}
>
  {t.subtitle}
</Typography>




       <Typography
  component={motion.p}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  sx={{
    mt: 2,
    color: '#000000', // negro
    fontSize: { xs: '1rem', md: '1.2rem' },
    maxWidth: '700px',
    mx: 'auto',
  }}
>
  {t.description}
</Typography>

<Box
  component={motion.div}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
  sx={{ mt: 5 }}
>
 <Link href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" rel="noopener noreferrer">
    <Button
      onClick={handleClick}
      variant="contained"
      sx={{
        bgcolor: '#00ADD8',       // Azul Golang
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '1rem',
        px: 4,
        py: 1.5,
        borderRadius: '12px',
        textTransform: 'none',
        '&:hover': {
          bgcolor: '#007B9E',     // Azul más oscuro para hover
        },
      }}
    >
      {t.cta || "Agendar reunión"}  {/* Texto personalizable */}
    </Button>
  </Link>
</Box>

      </Box>

      {/* Icons Carousel */}
    <Box
  sx={{
    mt: 10,
    overflow: 'hidden',
    width: '100%',
    whiteSpace: 'nowrap',
    zIndex: 1,
  }}
>
  <motion.div
    animate={{ x: ['0%', '-50%'] }} // mueve solo la mitad (porque se duplica)
    transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
    style={{
      display: 'inline-flex',
      gap: '3rem',
      fontSize: '2.5rem',
      color: '#005B96',
      alignItems: 'center',
      width: 'max-content', // para que tome el ancho real del contenido
    }}
  >
    {[...icons, ...icons].map(({ Icon, name }, idx) => (
      <Box
        key={idx}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '5rem', // espacio fijo
          color: '#6B7280',
          userSelect: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          mt: 1,
        }}
      >
        <Icon style={{ color: 'lightgray', fontSize: '3rem' }} />
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            color: 'lightgray',
            fontFamily: '"Poppins", "Montserrat", sans-serif',
          }}
        >
          {name}
        </Typography>
      </Box>
    ))}
  </motion.div>
</Box>
<Box
      ref={ref}
      sx={{
        width: '100%',
        py: { xs: 6, md: 10 },
        px: 4,
        backgroundColor: '#00ADD8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 99,
        mr: 10,
        ml: 10,
        mt: 6,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
      }}
    >
      {/* Título y subtítulo */}
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
          {tcounter.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#D1D5DB',
            fontSize: { xs: '1rem', md: '1.125rem' },
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          {tcounter.subtitle}
        </Typography>
      </Box>

      {/* Contadores */}
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
        {tcounter.counters.map(({ title, subtitle, value }, idx) => (
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