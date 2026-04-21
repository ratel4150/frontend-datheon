// File: frontend-datheon/src/app/(lang)/[lang]/aboutus/NosotrosClient.tsx
'use client'

import { Box, Container, Typography, Button, alpha } from '@mui/material'
import { FiCalendar, FiArrowRight, FiCheck, FiUsers, FiTarget, FiZap, FiShield, FiHeart, FiCode, FiLinkedin, FiGithub, FiMail } from 'react-icons/fi'
import { SiNextdotjs, SiNodedotjs, SiPostgresql, SiDocker, SiGo, SiPython } from 'react-icons/si'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const C = {
  bg: '#FFFFFF', bgAlt: '#F7FBFF', bgDark: '#0A0C10',
  border: '#ebebeb', text: '#0B0F2B', textMid: '#4A5068', textMute: '#8891AA',
  accent: '#00AEEF', accentDk: '#0095cc',
  accentBg: 'rgba(0,174,239,0.07)', accentLine: 'rgba(0,174,239,0.22)',
  gold: '#F59E0B', green: '#22C55E', purple: '#7C3AED',
} as const

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]
type Lang = 'es' | 'en' | 'fr'

// ─── i18n content ─────────────────────────────────────────────
const content = {
  es: {
    breadcrumb: { home: 'Inicio', current: 'Nosotros' },
    badge: 'El equipo',
    hero: {
      title: 'Tecnología con propósito.',
      titleAccent: 'Resultados que perduran.',
      subtitle: 'Somos un equipo pequeño y senior que combina experiencia técnica profunda con visión de negocio. No somos un proveedor más — somos el equipo técnico que tu empresa necesita para crecer.',
    },
    stats: [
      { value: '50+', label: 'Clientes satisfechos', sub: 'Empresas que confían en nosotros' },
      { value: '17+', label: 'Proyectos completados', sub: 'Soluciones en producción' },
      { value: '2',   label: 'Co-fundadores senior', sub: 'Equipo dedicado y especializado' },
      { value: '3',   label: 'Idiomas de servicio', sub: 'Español, Inglés y Francés' },
    ],
    story: {
      label: 'Nuestra historia',
      title: 'Fundados en 2023 con una',
      accent: 'misión clara.',
      sub: 'Llevar tecnología real a empresas que quieren crecer — sin tecnicismos innecesarios, sin contratos trampa, con resultados medibles.',
    },
    timeline: [
      { year: '2023', title: 'Fundación', desc: 'Datheón nace con la misión de llevar tecnología real a empresas que quieren crecer. Primeros clientes en México y LATAM.' },
      { year: '2023', title: 'Primeros proyectos', desc: 'Desarrollamos nuestros primeros sistemas RAG y plataformas SaaS. Aprendemos qué funciona en producción y qué no.' },
      { year: '2024', title: 'HydraSupport AI', desc: 'Lanzamos nuestro primer producto propio: plataforma SaaS de helpdesk con IA con 29+ automatizaciones y soporte 24/7.' },
      { year: '2024', title: 'Expansión de servicios', desc: 'Agregamos IoT, Cloud/DevOps y Odoo ERP. Alcanzamos 17 proyectos completados y 50+ clientes satisfechos.' },
      { year: '2025', title: 'Datheón University', desc: 'Plataforma educativa para democratizar el conocimiento en AI y tecnología. Cursos gratuitos con certificados verificables.' },
    ],
    team: {
      label: 'El equipo',
      title: 'Especialistas, no',
      accent: 'generalistas.',
      sub: 'Conoces a quien trabaja en tu proyecto. Todo lo que ofrecemos lo hemos desplegado en entornos reales.',
      hiring: '¿Eres developer o data scientist? Siempre buscamos talento.',
      members: [
        {
          name: 'Angel Clavellina',
          role: 'Co-Fundador · Sr. Data Analyst & AI',
          bio: 'Especialista en pipelines de datos, modelos predictivos, sistemas RAG y dashboards de analítica en tiempo real. Apasionado por convertir datos en decisiones.',
        },
        {
          name: 'Arturo Chavez',
          role: 'Co-Fundador · Sr. Full Stack Developer',
          bio: 'Arquitecto de software con experiencia en SaaS, APIs REST/GraphQL e infraestructura cloud escalable. Construye desde el frontend hasta el servidor.',
        },
      ],
    },
    values: {
      label: 'Cómo trabajamos',
      title: 'Valores que guían',
      accent: 'cada proyecto.',
      items: [
        { title: 'Resultados reales', desc: 'No construimos para impresionar técnicamente — construimos para que tu negocio crezca. Cada decisión técnica tiene un porqué de negocio.' },
        { title: 'Transparencia total', desc: 'Sabes en todo momento qué estamos haciendo, por qué y cuánto falta. Sin sorpresas al final del proyecto.' },
        { title: 'Velocidad sin atajos', desc: 'Entregamos rápido pero con calidad de producción. El código que escribimos hoy no te dará problemas en 6 meses.' },
        { title: 'Relación a largo plazo', desc: 'No desaparecemos al entregar. Somos el equipo técnico de confianza que tu empresa necesita para seguir creciendo.' },
        { title: 'Stack 2025', desc: 'Trabajamos con las tecnologías que el mercado pide ahora: LangGraph, pgvector, Next.js 15, Terraform y modelos frontier.' },
        { title: 'Equipo pequeño y senior', desc: 'Conoces a quien trabaja en tu proyecto. No hay junior que aprenda a tu costa — todo lo que hacemos lo hemos hecho en producción.' },
      ],
    },
    stack: {
      label: 'Tecnologías',
      title: 'Stack que usamos',
      accent: 'en producción.',
      sub: 'No vendemos lo que no hemos desplegado. Cada tecnología la hemos usado en proyectos reales.',
    },
    cta: {
      title: '¿Listo para trabajar con nosotros?',
      sub: 'Primera consulta gratuita. Te decimos en 24 horas qué podemos hacer por tu empresa.',
      primary: 'Agendar consulta gratuita',
      secondary: 'Escribirnos',
      contactHref: '/es/contact',
    },
  },

  en: {
    breadcrumb: { home: 'Home', current: 'About Us' },
    badge: 'The team',
    hero: {
      title: 'Technology with purpose.',
      titleAccent: 'Results that last.',
      subtitle: 'We are a small, senior team combining deep technical expertise with business vision. We are not just another vendor — we are the technical team your company needs to grow.',
    },
    stats: [
      { value: '50+', label: 'Satisfied clients', sub: 'Companies that trust us' },
      { value: '17+', label: 'Completed projects', sub: 'Production solutions' },
      { value: '2',   label: 'Senior co-founders', sub: 'Dedicated and specialized team' },
      { value: '3',   label: 'Service languages', sub: 'Spanish, English and French' },
    ],
    story: {
      label: 'Our story',
      title: 'Founded in 2023 with a',
      accent: 'clear mission.',
      sub: 'Bringing real technology to companies that want to grow — without unnecessary jargon, without tricky contracts, with measurable results.',
    },
    timeline: [
      { year: '2023', title: 'Founded', desc: 'Datheón is born with the mission to bring real technology to growing companies. First clients in Mexico and LATAM.' },
      { year: '2023', title: 'First projects', desc: 'We build our first RAG systems and SaaS platforms. We learn what works in production and what does not.' },
      { year: '2024', title: 'HydraSupport AI', desc: 'We launch our first own product: an AI helpdesk SaaS platform with 29+ automations and 24/7 support.' },
      { year: '2024', title: 'Service expansion', desc: 'We add IoT, Cloud/DevOps and Odoo ERP. We reach 17 completed projects and 50+ satisfied clients.' },
      { year: '2025', title: 'Datheón University', desc: 'Educational platform to democratize AI and technology knowledge. Free courses with verifiable certificates.' },
    ],
    team: {
      label: 'The team',
      title: 'Specialists, not',
      accent: 'generalists.',
      sub: 'You know who works on your project. Everything we offer we have deployed in real environments.',
      hiring: 'Are you a developer or data scientist? We are always looking for talent.',
      members: [
        {
          name: 'Angel Clavellina',
          role: 'Co-Founder · Sr. Data Analyst & AI',
          bio: 'Specialist in data pipelines, predictive models, RAG systems and real-time analytics dashboards. Passionate about turning data into decisions.',
        },
        {
          name: 'Arturo Chavez',
          role: 'Co-Founder · Sr. Full Stack Developer',
          bio: 'Software architect with experience in SaaS, REST/GraphQL APIs and scalable cloud infrastructure. Builds from frontend to server.',
        },
      ],
    },
    values: {
      label: 'How we work',
      title: 'Values that guide',
      accent: 'every project.',
      items: [
        { title: 'Real results', desc: 'We do not build to impress technically — we build for your business to grow. Every technical decision has a business reason.' },
        { title: 'Full transparency', desc: 'You know at all times what we are doing, why, and how much is left. No surprises at the end of the project.' },
        { title: 'Speed without shortcuts', desc: 'We deliver fast but with production quality. The code we write today will not cause problems in 6 months.' },
        { title: 'Long-term relationship', desc: 'We do not disappear after delivery. We are the trusted technical team your company needs to keep growing.' },
        { title: '2025 stack', desc: 'We work with the technologies the market demands now: LangGraph, pgvector, Next.js 15, Terraform and frontier models.' },
        { title: 'Small and senior team', desc: 'You know who works on your project. No junior learning at your expense — everything we do we have done in production.' },
      ],
    },
    stack: {
      label: 'Technologies',
      title: 'Stack we use',
      accent: 'in production.',
      sub: 'We do not sell what we have not deployed. Every technology on this list we have used in real projects.',
    },
    cta: {
      title: 'Ready to work with us?',
      sub: 'Free first consultation. We tell you in 24 hours what we can do for your company.',
      primary: 'Schedule free consultation',
      secondary: 'Write to us',
      contactHref: '/en/contact',
    },
  },

  fr: {
    breadcrumb: { home: 'Accueil', current: 'À Propos' },
    badge: "L'équipe",
    hero: {
      title: 'Technologie avec un but.',
      titleAccent: 'Des résultats durables.',
      subtitle: "Nous sommes une petite équipe senior qui combine une expertise technique approfondie avec une vision business. Nous ne sommes pas un simple fournisseur — nous sommes l'équipe technique dont votre entreprise a besoin pour grandir.",
    },
    stats: [
      { value: '50+', label: 'Clients satisfaits', sub: 'Entreprises qui nous font confiance' },
      { value: '17+', label: 'Projets complétés', sub: 'Solutions en production' },
      { value: '2',   label: 'Co-fondateurs senior', sub: 'Équipe dédiée et spécialisée' },
      { value: '3',   label: 'Langues de service', sub: 'Espagnol, Anglais et Français' },
    ],
    story: {
      label: 'Notre histoire',
      title: 'Fondés en 2023 avec une',
      accent: 'mission claire.',
      sub: "Apporter une technologie réelle aux entreprises qui veulent grandir — sans jargon inutile, sans contrats pièges, avec des résultats mesurables.",
    },
    timeline: [
      { year: '2023', title: 'Fondation', desc: "Datheón naît avec la mission d'apporter une technologie réelle aux entreprises en croissance. Premiers clients au Mexique et en LATAM." },
      { year: '2023', title: 'Premiers projets', desc: "Nous développons nos premiers systèmes RAG et plateformes SaaS. Nous apprenons ce qui fonctionne en production." },
      { year: '2024', title: 'HydraSupport AI', desc: "Nous lançons notre premier produit : une plateforme SaaS de helpdesk IA avec 29+ automatisations et support 24/7." },
      { year: '2024', title: 'Expansion des services', desc: "Nous ajoutons IoT, Cloud/DevOps et Odoo ERP. Nous atteignons 17 projets complétés et 50+ clients satisfaits." },
      { year: '2025', title: 'Datheón University', desc: "Plateforme éducative pour démocratiser les connaissances en IA et technologie. Cours gratuits avec certificats vérifiables." },
    ],
    team: {
      label: "L'équipe",
      title: 'Spécialistes, pas',
      accent: 'généralistes.',
      sub: "Vous savez qui travaille sur votre projet. Tout ce que nous proposons, nous l'avons déployé dans des environnements réels.",
      hiring: 'Êtes-vous développeur ou data scientist ? Nous cherchons toujours des talents.',
      members: [
        {
          name: 'Angel Clavellina',
          role: 'Co-Fondateur · Sr. Data Analyst & IA',
          bio: "Spécialiste en pipelines de données, modèles prédictifs, systèmes RAG et tableaux de bord analytiques en temps réel. Passionné par la transformation des données en décisions.",
        },
        {
          name: 'Arturo Chavez',
          role: 'Co-Fondateur · Sr. Full Stack Developer',
          bio: "Architecte logiciel avec expérience en SaaS, APIs REST/GraphQL et infrastructure cloud évolutive. Construit du frontend au serveur.",
        },
      ],
    },
    values: {
      label: 'Comment nous travaillons',
      title: 'Valeurs qui guident',
      accent: 'chaque projet.',
      items: [
        { title: 'Résultats réels', desc: "Nous ne construisons pas pour impressionner techniquement — nous construisons pour que votre entreprise grandisse. Chaque décision technique a une raison business." },
        { title: 'Transparence totale', desc: "Vous savez à tout moment ce que nous faisons, pourquoi et combien il reste. Pas de surprises en fin de projet." },
        { title: 'Vitesse sans raccourcis', desc: "Nous livrons rapidement mais avec une qualité de production. Le code que nous écrivons aujourd'hui ne posera pas de problèmes dans 6 mois." },
        { title: 'Relation à long terme', desc: "Nous ne disparaissons pas après la livraison. Nous sommes l'équipe technique de confiance dont votre entreprise a besoin pour continuer à grandir." },
        { title: 'Stack 2025', desc: "Nous travaillons avec les technologies que le marché demande maintenant : LangGraph, pgvector, Next.js 15, Terraform et modèles frontier." },
        { title: 'Petite équipe senior', desc: "Vous savez qui travaille sur votre projet. Pas de junior qui apprend à vos dépens — tout ce que nous faisons, nous l'avons fait en production." },
      ],
    },
    stack: {
      label: 'Technologies',
      title: 'Stack que nous utilisons',
      accent: 'en production.',
      sub: "Nous ne vendons pas ce que nous n'avons pas déployé. Chaque technologie de cette liste a été utilisée dans de vrais projets.",
    },
    cta: {
      title: 'Prêt à travailler avec nous ?',
      sub: 'Première consultation gratuite. Nous vous disons en 24 heures ce que nous pouvons faire pour votre entreprise.',
      primary: 'Planifier une consultation gratuite',
      secondary: 'Nous écrire',
      contactHref: '/fr/contact',
    },
  },
}

// ─── Team data (shared) ───────────────────────────────────────
const TEAM_DATA = [
  { color: '#7C3AED', avatar: 'AC', linkedin: 'https://linkedin.com', github: 'https://github.com', skills: [{ icon: <SiPython size={13}/>, name: 'Python' }, { icon: <SiPostgresql size={13}/>, name: 'PostgreSQL' }, { icon: <SiDocker size={13}/>, name: 'Docker' }] },
  { color: '#22C55E', avatar: 'AC', linkedin: 'https://linkedin.com', github: 'https://github.com', skills: [{ icon: <SiNextdotjs size={13}/>, name: 'Next.js' }, { icon: <SiNodedotjs size={13}/>, name: 'Node.js' }, { icon: <SiGo size={13}/>, name: 'Go' }] },
]

const VALUES_ICONS = [
  { icon: <FiTarget size={18}/>, color: '#00AEEF' },
  { icon: <FiShield size={18}/>, color: '#EF4444' },
  { icon: <FiZap size={18}/>,    color: '#F59E0B' },
  { icon: <FiHeart size={18}/>,  color: '#EC4899' },
  { icon: <FiCode size={18}/>,   color: '#7C3AED' },
  { icon: <FiUsers size={18}/>,  color: '#22C55E' },
]

const TECH_STACK = [
  { name: 'Next.js 15', color: '#000000' }, { name: 'FastAPI', color: '#059669' },
  { name: 'LangGraph', color: '#7C3AED' }, { name: 'pgvector', color: '#2563EB' },
  { name: 'Groq', color: '#F59E0B' }, { name: 'Terraform', color: '#6366F1' },
  { name: 'Kubernetes', color: '#3B82F6' }, { name: 'Flutter', color: '#0284C7' },
  { name: 'n8n', color: '#F59E0B' }, { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Redis', color: '#DC382D' }, { name: 'Docker', color: '#2496ED' },
  { name: 'Ollama', color: '#10B981' }, { name: 'MQTT', color: '#7C3AED' },
  { name: 'ESP32', color: '#E0234E' }, { name: 'Odoo 17/18', color: '#875A7B' },
  { name: 'Stripe', color: '#635BFF' }, { name: 'AWS', color: '#F59E0B' },
  { name: 'Grafana', color: '#F46800' }, { name: 'React Native', color: '#61DAFB' },
]

function SectionHeader({ label, title, accent, sub }: { label: string; title: string; accent: string; sub?: string }) {
  return (
    <Box sx={{ mb: { xs: 4, md: 5 } }}>
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.75, py: 0.6, border: `1px solid ${C.accentLine}`, borderRadius: '100px', bgcolor: C.accentBg, mb: 2 }}>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: C.textMid, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</Typography>
      </Box>
      <Typography variant="h2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.text, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
        {title}{' '}<Box component="span" sx={{ color: C.accent }}>{accent}</Box>
      </Typography>
      {sub && <Typography sx={{ mt: 1.25, fontSize: '1rem', color: C.textMid, maxWidth: 560, lineHeight: 1.75 }}>{sub}</Typography>}
    </Box>
  )
}

export function NosotrosClient({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t = content[l]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Box sx={{ bgcolor: C.bg }}>

      {/* ══ HERO ══ */}
      <Box sx={{ bgcolor: C.bgDark, pt: { xs: 12, md: 16 }, pb: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(0,174,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.05) 1px, transparent 1px)`, backgroundSize: '56px 56px' }}/>
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(120px)', opacity: 0.07, zIndex: 0 }}/>
        <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: C.purple, filter: 'blur(100px)', opacity: 0.06, zIndex: 0 }}/>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: easing }}>
            {/* Breadcrumb */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box component={Link} href={`/${l}/landing`} sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', '&:hover': { color: C.accent } }}>{t.breadcrumb.home}</Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>›</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: C.accent }}>{t.breadcrumb.current}</Typography>
            </Box>

            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, border: `1px solid ${alpha(C.accent, 0.3)}`, borderRadius: '100px', bgcolor: alpha(C.accent, 0.08), mb: 2.5 }}>
              <FiUsers size={12} color={C.accent}/>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: C.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.badge}</Typography>
            </Box>

            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.4rem', md: '3.8rem' }, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', mb: 1 }}>
              {t.hero.title}
            </Typography>
            <Typography variant="h1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '2.4rem', md: '3.8rem' }, color: C.accent, lineHeight: 1.1, letterSpacing: '-0.025em', mb: 3 }}>
              {t.hero.titleAccent}
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.55)', maxWidth: 580, lineHeight: 1.8, mb: 5 }}>
              {t.hero.subtitle}
            </Typography>

            {/* Stats */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
              {t.stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: easing }}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: C.accent, lineHeight: 1 }}>{s.value}</Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#fff', mt: 0.5 }}>{s.label}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', mt: 0.25 }}>{s.sub}</Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" ref={ref}>

        {/* ══ HISTORIA ══ */}
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <SectionHeader label={t.story.label} title={t.story.title} accent={t.story.accent} sub={t.story.sub}/>
          <Box sx={{ position: 'relative', pl: { xs: 3, md: 5 } }}>
            <Box sx={{ position: 'absolute', left: { xs: 8, md: 16 }, top: 12, bottom: 12, width: 2, bgcolor: C.border }}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {t.timeline.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1, ease: easing }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', left: { xs: -24, md: -32 }, top: 6, width: 14, height: 14, borderRadius: '50%', bgcolor: i === t.timeline.length - 1 ? C.accent : C.bg, border: `2px solid ${i === t.timeline.length - 1 ? C.accent : C.border}`, zIndex: 1 }}/>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
                        <Box sx={{ px: 1.25, py: 0.3, bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`, borderRadius: '6px' }}>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: C.accent }}>{item.year}</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: C.text }}>{item.title}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.875rem', color: C.textMid, lineHeight: 1.7, maxWidth: 560 }}>{item.desc}</Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ══ EQUIPO ══ */}
        <Box sx={{ py: { xs: 5, md: 7 }, borderTop: `1px solid ${C.border}` }}>
          <SectionHeader label={t.team.label} title={t.team.title} accent={t.team.accent} sub={t.team.sub}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 400px))' }, gap: 3, justifyContent: 'center' }}>
            {t.team.members.map((member, i) => {
              const data = TEAM_DATA[i]
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.15, ease: easing }}>
                  <Box sx={{ bgcolor: C.bg, border: `1px solid ${C.border}`, borderRadius: '20px', overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s', '&:hover': { borderColor: alpha(data.color, 0.35), boxShadow: `0 12px 36px ${alpha(data.color, 0.12)}`, transform: 'translateY(-4px)' } }}>
                    <Box sx={{ height: 3, bgcolor: data.color }}/>
                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, borderBottom: `1px solid ${C.border}` }}>
                      <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: alpha(data.color, 0.12), border: `3px solid ${alpha(data.color, 0.3)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', color: data.color, fontFamily: 'Poppins, sans-serif' }}>
                        {data.avatar}
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: C.text, lineHeight: 1.2 }}>{member.name}</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: data.color, mt: 0.3 }}>{member.role}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.75 }}>
                        {[{ Icon: FiLinkedin, href: data.linkedin, hoverColor: '#0A66C2' }, { Icon: FiGithub, href: data.github, hoverColor: C.text }].map(({ Icon, href, hoverColor }) => (
                          <Box key={href} component="a" href={href} target="_blank" rel="noopener noreferrer"
                            sx={{ width: 32, height: 32, borderRadius: '8px', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMute, transition: 'all 0.18s', '&:hover': { borderColor: hoverColor, color: hoverColor, bgcolor: alpha(hoverColor, 0.06) } }}>
                            <Icon size={14}/>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Typography sx={{ fontSize: '0.82rem', color: C.textMid, lineHeight: 1.7 }}>{member.bio}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {data.skills.map(skill => (
                          <Box key={skill.name} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.4, bgcolor: alpha(data.color, 0.07), border: `1px solid ${alpha(data.color, 0.18)}`, borderRadius: '6px', color: data.color }}>
                            {skill.icon}
                            <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.03em' }}>{skill.name}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              )
            })}
          </Box>
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Box sx={{ height: 1, flex: 1, maxWidth: 160, bgcolor: C.border }}/>
            <Typography sx={{ fontSize: '0.8rem', color: C.textMute }}>{t.team.hiring}</Typography>
            <Box sx={{ height: 1, flex: 1, maxWidth: 160, bgcolor: C.border }}/>
          </Box>
        </Box>

        {/* ══ VALORES ══ */}
        <Box sx={{ py: { xs: 5, md: 7 }, borderTop: `1px solid ${C.border}` }}>
          <SectionHeader label={t.values.label} title={t.values.title} accent={t.values.accent}/>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {t.values.items.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.07, ease: easing }}>
                <Box sx={{ bgcolor: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: '16px', p: 2.5, height: '100%', transition: 'border-color 0.2s, transform 0.2s', '&:hover': { borderColor: alpha(VALUES_ICONS[i].color, 0.4), transform: 'translateY(-3px)' } }}>
                  <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: alpha(VALUES_ICONS[i].color, 0.1), color: VALUES_ICONS[i].color, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                    {VALUES_ICONS[i].icon}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: C.text, mb: 0.5 }}>{v.title}</Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: C.textMid, lineHeight: 1.7 }}>{v.desc}</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* ══ STACK ══ */}
        <Box sx={{ py: { xs: 5, md: 7 }, borderTop: `1px solid ${C.border}` }}>
          <SectionHeader label={t.stack.label} title={t.stack.title} accent={t.stack.accent} sub={t.stack.sub}/>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {TECH_STACK.map(tech => (
              <Box key={tech.name} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.75, bgcolor: alpha(tech.color, 0.07), border: `1px solid ${alpha(tech.color, 0.2)}`, borderRadius: '8px' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: tech.color, flexShrink: 0 }}/>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: tech.color }}>{tech.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* ══ CTA ══ */}
      <Box sx={{ bgcolor: C.bgDark, py: { xs: 8, md: 10 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', bgcolor: C.accent, filter: 'blur(100px)', opacity: 0.07, pointerEvents: 'none' }}/>
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: '#fff', mb: 1.5 }}>{t.cta.title}</Typography>
          <Typography sx={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', mb: 4, lineHeight: 1.75 }}>{t.cta.sub}</Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" component="a" href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica" target="_blank" startIcon={<FiCalendar size={16}/>}
              sx={{ bgcolor: C.accent, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '12px', px: 3.5, py: 1.4, boxShadow: `0 4px 20px ${alpha(C.accent, 0.4)}`, '&:hover': { bgcolor: C.accentDk } }}>
              {t.cta.primary}
            </Button>
            <Button variant="outlined" size="large" component={Link} href={t.cta.contactHref} endIcon={<FiArrowRight size={15}/>}
              sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)', fontWeight: 600, textTransform: 'none', borderRadius: '12px', px: 3, py: 1.4, '&:hover': { borderColor: C.accentLine, bgcolor: alpha(C.accent, 0.08), color: '#fff' } }}>
              {t.cta.secondary}
            </Button>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <FiMail size={14} color="rgba(255,255,255,0.3)"/>
            <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>hola@datheon.com</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}