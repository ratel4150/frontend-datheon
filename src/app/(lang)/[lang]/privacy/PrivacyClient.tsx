// File: frontend-datheon/src/app/(lang)/[lang]/privacy/PrivacyClient.tsx
'use client'

import { Box, Container, Typography, alpha } from '@mui/material'
import { FiShield, FiMail, FiCalendar } from 'react-icons/fi'
import Link from 'next/link'

const C = {
  bg:         '#FFFFFF',
  bgAlt:      '#F7FBFF',
  border:     '#ebebeb',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.22)',
} as const

type Lang = 'es' | 'en' | 'fr'

const content = {
  es: {
    badge: 'Legal',
    title: 'Aviso de Privacidad',
    updated: 'Última actualización: enero 2025',
    intro: 'En Datheón, empresa de consultoría tecnológica, nos comprometemos a proteger y respetar tu privacidad. Este aviso explica cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestro sitio web y servicios.',
    sections: [
      {
        title: '1. Responsable del tratamiento',
        content: [
          'Datheón es el responsable del tratamiento de tus datos personales.',
          'Email de contacto: hola@datheon.com',
          'Para ejercer tus derechos de privacidad puedes escribirnos directamente a ese correo.',
        ],
      },
      {
        title: '2. Datos que recopilamos',
        content: [
          'Datos de contacto que nos proporcionas voluntariamente: nombre completo, correo electrónico, nombre de empresa, y mensaje a través de nuestros formularios.',
          'Datos técnicos recopilados automáticamente: dirección IP, tipo de navegador, páginas visitadas, tiempo de visita. Estos datos se usan únicamente para análisis de uso del sitio.',
          'Cookies de funcionalidad y analítica: usamos cookies propias para el funcionamiento del sitio y cookies de Google Analytics para entender el uso del sitio. Siempre solicitamos tu consentimiento antes de activar cookies no esenciales.',
          'No recopilamos datos sensibles como información financiera, datos de salud ni datos de menores de 18 años.',
        ],
      },
      {
        title: '3. Finalidad del tratamiento',
        content: [
          'Responder a tus consultas y solicitudes de información sobre nuestros servicios.',
          'Enviarte propuestas comerciales cuando nos las solicites.',
          'Mejorar nuestro sitio web y servicios mediante análisis de uso.',
          'Cumplir con obligaciones legales aplicables.',
          'Nunca usamos tus datos para entrenar modelos de inteligencia artificial de terceros.',
        ],
      },
      {
        title: '4. Base legal del tratamiento',
        content: [
          'Tu consentimiento expreso: cuando rellenas un formulario de contacto o aceptas las cookies.',
          'Interés legítimo: para el análisis del uso de nuestro sitio web con fines de mejora.',
          'Cumplimiento de obligaciones legales: cuando así lo exija la normativa aplicable.',
        ],
      },
      {
        title: '5. Conservación de los datos',
        content: [
          'Los datos de contacto se conservan durante el tiempo necesario para gestionar tu solicitud y durante un período máximo de 2 años desde el último contacto.',
          'Los datos de analítica se conservan según la configuración de Google Analytics (máximo 26 meses).',
          'Puedes solicitar la eliminación de tus datos en cualquier momento escribiendo a hola@datheon.com.',
        ],
      },
      {
        title: '6. Compartición de datos con terceros',
        content: [
          'No vendemos ni cedemos tus datos personales a terceros con fines comerciales.',
          'Podemos compartir datos con proveedores de servicios que nos ayudan a operar el sitio (como Google Analytics, servicios de email). Estos proveedores están obligados contractualmente a proteger tus datos.',
          'Servicios que pueden recibir datos: Google Analytics (análisis web), Resend (envío de emails), Calendly (agendamiento de reuniones).',
          'Podemos divulgar información cuando sea legalmente requerido.',
        ],
      },
      {
        title: '7. Transferencias internacionales',
        content: [
          'Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de México o de tu país de residencia. Cuando realizamos transferencias internacionales, nos aseguramos de que existan las salvaguardas adecuadas, como cláusulas contractuales estándar o certificaciones de adecuación.',
        ],
      },
      {
        title: '8. Tus derechos',
        content: [
          'Acceso: puedes solicitar una copia de los datos personales que tenemos sobre ti.',
          'Rectificación: puedes pedir la corrección de datos inexactos o incompletos.',
          'Cancelación/Eliminación: puedes solicitar que eliminemos tus datos cuando ya no sean necesarios.',
          'Oposición: puedes oponerte al tratamiento de tus datos en determinadas circunstancias.',
          'Portabilidad: puedes solicitar que te enviemos tus datos en un formato estructurado.',
          'Limitación: puedes pedir que restrinjamos el uso de tus datos en ciertas situaciones.',
          'Para ejercer cualquiera de estos derechos, escríbenos a hola@datheon.com. Responderemos en un plazo máximo de 30 días hábiles.',
        ],
      },
      {
        title: '9. Cookies',
        content: [
          'Utilizamos cookies esenciales para el funcionamiento del sitio (no requieren consentimiento) y cookies analíticas para entender cómo se usa el sitio (requieren tu consentimiento).',
          'Cookies esenciales: necesarias para que el sitio funcione correctamente. No almacenan información personal identificable.',
          'Cookies analíticas: Google Analytics para medir el tráfico y comportamiento de usuarios. Solo se activan si aceptas cookies en nuestro banner.',
          'Puedes gestionar o retirar tu consentimiento en cualquier momento a través del panel de cookies del sitio o configurando tu navegador.',
        ],
      },
      {
        title: '10. Seguridad',
        content: [
          'Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos contra acceso no autorizado, pérdida o destrucción.',
          'El sitio usa HTTPS para cifrar la comunicación entre tu navegador y nuestros servidores.',
          'El acceso a los datos está restringido al personal que necesita conocerlos para prestar el servicio.',
          'A pesar de nuestras medidas, ningún sistema de transmisión por Internet es 100% seguro. Si detectas alguna brecha de seguridad, notifícanos de inmediato a hola@datheon.com.',
        ],
      },
      {
        title: '11. Cambios en este aviso',
        content: [
          'Podemos actualizar este aviso de privacidad periódicamente. Te notificaremos de cambios importantes a través del sitio web.',
          'La fecha de última actualización aparece al inicio de este documento. Te recomendamos revisarlo periódicamente.',
        ],
      },
      {
        title: '12. Contacto',
        content: [
          'Si tienes preguntas sobre este aviso de privacidad o sobre el tratamiento de tus datos, puedes contactarnos en: hola@datheon.com',
          'También puedes agendar una llamada para hablar directamente con nosotros.',
        ],
      },
    ],
  },

  en: {
    badge: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: January 2025',
    intro: 'At Datheón, a technology consulting company, we are committed to protecting and respecting your privacy. This policy explains how we collect, use and protect your personal information when you use our website and services.',
    sections: [
      {
        title: '1. Data Controller',
        content: [
          'Datheón is the controller of your personal data.',
          'Contact email: hola@datheon.com',
          'To exercise your privacy rights you can write to us directly at that email.',
        ],
      },
      {
        title: '2. Data We Collect',
        content: [
          'Contact data you voluntarily provide: full name, email address, company name, and message through our forms.',
          'Technical data collected automatically: IP address, browser type, pages visited, visit duration. This data is used solely for site usage analysis.',
          'Functionality and analytics cookies: we use first-party cookies for site operation and Google Analytics cookies to understand site usage. We always request your consent before activating non-essential cookies.',
          'We do not collect sensitive data such as financial information, health data, or data from minors under 18.',
        ],
      },
      {
        title: '3. Purpose of Processing',
        content: [
          'Responding to your inquiries and requests for information about our services.',
          'Sending you commercial proposals when requested.',
          'Improving our website and services through usage analysis.',
          'Complying with applicable legal obligations.',
          'We never use your data to train third-party artificial intelligence models.',
        ],
      },
      {
        title: '4. Legal Basis for Processing',
        content: [
          'Your explicit consent: when you fill out a contact form or accept cookies.',
          'Legitimate interest: for website usage analysis for improvement purposes.',
          'Compliance with legal obligations: when required by applicable regulations.',
        ],
      },
      {
        title: '5. Data Retention',
        content: [
          'Contact data is retained for the time necessary to handle your request and for a maximum period of 2 years from the last contact.',
          'Analytics data is retained according to Google Analytics settings (maximum 26 months).',
          'You can request deletion of your data at any time by writing to hola@datheon.com.',
        ],
      },
      {
        title: '6. Sharing Data with Third Parties',
        content: [
          'We do not sell or transfer your personal data to third parties for commercial purposes.',
          'We may share data with service providers who help us operate the site (such as Google Analytics, email services). These providers are contractually obligated to protect your data.',
          'Services that may receive data: Google Analytics (web analytics), Resend (email sending), Calendly (meeting scheduling).',
          'We may disclose information when legally required.',
        ],
      },
      {
        title: '7. International Transfers',
        content: [
          'Some of our service providers may be located outside your country of residence. When we make international transfers, we ensure that appropriate safeguards exist, such as standard contractual clauses or adequacy certifications.',
        ],
      },
      {
        title: '8. Your Rights',
        content: [
          'Access: you can request a copy of the personal data we hold about you.',
          'Rectification: you can request correction of inaccurate or incomplete data.',
          'Erasure: you can request that we delete your data when no longer necessary.',
          'Objection: you can object to the processing of your data in certain circumstances.',
          'Portability: you can request that we send your data in a structured format.',
          'Restriction: you can ask us to restrict the use of your data in certain situations.',
          'To exercise any of these rights, write to us at hola@datheon.com. We will respond within a maximum of 30 business days.',
        ],
      },
      {
        title: '9. Cookies',
        content: [
          'We use essential cookies for site operation (no consent required) and analytics cookies to understand how the site is used (require your consent).',
          'Essential cookies: necessary for the site to function correctly. They do not store personally identifiable information.',
          'Analytics cookies: Google Analytics to measure traffic and user behavior. Only activated if you accept cookies in our banner.',
          'You can manage or withdraw your consent at any time through the site cookie panel or by configuring your browser.',
        ],
      },
      {
        title: '10. Security',
        content: [
          'We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss or destruction.',
          'The site uses HTTPS to encrypt communication between your browser and our servers.',
          'Access to data is restricted to staff who need to know it to provide the service.',
          'Despite our measures, no Internet transmission system is 100% secure. If you detect a security breach, notify us immediately at hola@datheon.com.',
        ],
      },
      {
        title: '11. Changes to This Policy',
        content: [
          'We may update this privacy policy periodically. We will notify you of important changes through the website.',
          'The last update date appears at the beginning of this document. We recommend reviewing it periodically.',
        ],
      },
      {
        title: '12. Contact',
        content: [
          'If you have questions about this privacy policy or about the processing of your data, you can contact us at: hola@datheon.com',
          'You can also schedule a call to speak directly with us.',
        ],
      },
    ],
  },

  fr: {
    badge: 'Légal',
    title: 'Politique de Confidentialité',
    updated: 'Dernière mise à jour : janvier 2025',
    intro: "Chez Datheón, société de conseil technologique, nous nous engageons à protéger et respecter votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.",
    sections: [
      {
        title: '1. Responsable du traitement',
        content: [
          'Datheón est le responsable du traitement de vos données personnelles.',
          'Email de contact : hola@datheon.com',
          "Pour exercer vos droits de confidentialité, vous pouvez nous écrire directement à cet email.",
        ],
      },
      {
        title: '2. Données que nous collectons',
        content: [
          "Données de contact que vous nous fournissez volontairement : nom complet, adresse email, nom d'entreprise, et message via nos formulaires.",
          "Données techniques collectées automatiquement : adresse IP, type de navigateur, pages visitées, durée de visite. Ces données sont utilisées uniquement pour l'analyse de l'utilisation du site.",
          "Cookies de fonctionnalité et d'analyse : nous utilisons des cookies propriétaires pour le fonctionnement du site et des cookies Google Analytics pour comprendre l'utilisation du site. Nous demandons toujours votre consentement avant d'activer des cookies non essentiels.",
          "Nous ne collectons pas de données sensibles telles que des informations financières, des données de santé ou des données de mineurs de moins de 18 ans.",
        ],
      },
      {
        title: '3. Finalité du traitement',
        content: [
          "Répondre à vos demandes d'informations sur nos services.",
          "Vous envoyer des propositions commerciales lorsque vous nous le demandez.",
          "Améliorer notre site web et nos services grâce à l'analyse d'utilisation.",
          "Respecter les obligations légales applicables.",
          "Nous n'utilisons jamais vos données pour entraîner des modèles d'intelligence artificielle tiers.",
        ],
      },
      {
        title: '4. Base légale du traitement',
        content: [
          "Votre consentement explicite : lorsque vous remplissez un formulaire de contact ou acceptez les cookies.",
          "Intérêt légitime : pour l'analyse de l'utilisation du site web à des fins d'amélioration.",
          "Respect des obligations légales : lorsque la réglementation applicable l'exige.",
        ],
      },
      {
        title: '5. Conservation des données',
        content: [
          "Les données de contact sont conservées pendant le temps nécessaire pour traiter votre demande et pendant une période maximale de 2 ans à compter du dernier contact.",
          "Les données d'analyse sont conservées selon la configuration de Google Analytics (maximum 26 mois).",
          "Vous pouvez demander la suppression de vos données à tout moment en écrivant à hola@datheon.com.",
        ],
      },
      {
        title: '6. Partage de données avec des tiers',
        content: [
          "Nous ne vendons ni ne cédons vos données personnelles à des tiers à des fins commerciales.",
          "Nous pouvons partager des données avec des prestataires de services qui nous aident à exploiter le site (comme Google Analytics, services d'email). Ces prestataires sont contractuellement tenus de protéger vos données.",
          "Services pouvant recevoir des données : Google Analytics (analyse web), Resend (envoi d'emails), Calendly (planification de réunions).",
          "Nous pouvons divulguer des informations lorsque la loi l'exige.",
        ],
      },
      {
        title: '7. Transferts internationaux',
        content: [
          "Certains de nos prestataires de services peuvent être situés en dehors de votre pays de résidence. Lors de transferts internationaux, nous nous assurons que des garanties appropriées existent, telles que des clauses contractuelles types ou des certifications d'adéquation.",
        ],
      },
      {
        title: '8. Vos droits',
        content: [
          "Accès : vous pouvez demander une copie des données personnelles que nous détenons sur vous.",
          "Rectification : vous pouvez demander la correction de données inexactes ou incomplètes.",
          "Effacement : vous pouvez demander que nous supprimions vos données lorsqu'elles ne sont plus nécessaires.",
          "Opposition : vous pouvez vous opposer au traitement de vos données dans certaines circonstances.",
          "Portabilité : vous pouvez demander que nous vous envoyions vos données dans un format structuré.",
          "Limitation : vous pouvez nous demander de restreindre l'utilisation de vos données dans certaines situations.",
          "Pour exercer l'un de ces droits, écrivez-nous à hola@datheon.com. Nous répondrons dans un délai maximum de 30 jours ouvrables.",
        ],
      },
      {
        title: '9. Cookies',
        content: [
          "Nous utilisons des cookies essentiels pour le fonctionnement du site (sans consentement requis) et des cookies analytiques pour comprendre comment le site est utilisé (nécessitent votre consentement).",
          "Cookies essentiels : nécessaires au bon fonctionnement du site. Ils ne stockent pas d'informations personnellement identifiables.",
          "Cookies analytiques : Google Analytics pour mesurer le trafic et le comportement des utilisateurs. Uniquement activés si vous acceptez les cookies dans notre bannière.",
          "Vous pouvez gérer ou retirer votre consentement à tout moment via le panneau de cookies du site ou en configurant votre navigateur.",
        ],
      },
      {
        title: '10. Sécurité',
        content: [
          "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction.",
          "Le site utilise HTTPS pour chiffrer la communication entre votre navigateur et nos serveurs.",
          "L'accès aux données est limité au personnel qui en a besoin pour fournir le service.",
          "Malgré nos mesures, aucun système de transmission Internet n'est sécurisé à 100%. Si vous détectez une faille de sécurité, notifiez-nous immédiatement à hola@datheon.com.",
        ],
      },
      {
        title: '11. Modifications de cette politique',
        content: [
          "Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Nous vous informerons des changements importants via le site web.",
          "La date de dernière mise à jour apparaît au début de ce document. Nous vous recommandons de la consulter périodiquement.",
        ],
      },
      {
        title: '12. Contact',
        content: [
          "Si vous avez des questions sur cette politique de confidentialité ou sur le traitement de vos données, vous pouvez nous contacter à : hola@datheon.com",
          "Vous pouvez également planifier un appel pour nous parler directement.",
        ],
      },
    ],
  },
}

export function PrivacyClient({ lang }: { lang: string }) {
  const l = ((['es', 'en', 'fr'].includes(lang) ? lang : 'es')) as Lang
  const t = content[l]

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">

        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.75,
            px: 1.5, py: 0.5,
            border: `1px solid ${C.accentLine}`,
            borderRadius: '100px', bgcolor: C.accentBg, mb: 2,
          }}>
            <FiShield size={12} color={C.accent}/>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: C.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t.badge}
            </Typography>
          </Box>

          <Typography variant="h1" sx={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.75rem' },
            color: C.text, lineHeight: 1.15, letterSpacing: '-0.02em', mb: 1.5,
          }}>
            {t.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FiCalendar size={14} color={C.textMute}/>
            <Typography sx={{ fontSize: '0.82rem', color: C.textMute }}>{t.updated}</Typography>
          </Box>

          {/* Intro */}
          <Box sx={{
            mt: 3, p: 2.5,
            bgcolor: C.bgAlt,
            border: `1px solid ${C.accentLine}`,
            borderRadius: '16px',
            borderLeft: `4px solid ${C.accent}`,
          }}>
            <Typography sx={{ fontSize: '0.92rem', color: C.textMid, lineHeight: 1.75 }}>
              {t.intro}
            </Typography>
          </Box>
        </Box>

        {/* Table of contents */}
        <Box sx={{
          mb: 5, p: 2.5,
          bgcolor: C.bgAlt,
          border: `1px solid ${C.border}`,
          borderRadius: '16px',
        }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: C.text, mb: 1.5 }}>
            {l === 'es' ? 'Contenido' : l === 'en' ? 'Contents' : 'Sommaire'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {t.sections.map((s, i) => (
              <Box
                key={i}
                component="a"
                href={`#section-${i}`}
                sx={{
                  fontSize: '0.82rem', color: C.textMid,
                  textDecoration: 'none',
                  '&:hover': { color: C.accent },
                  transition: 'color 0.15s',
                }}
              >
                {s.title}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {t.sections.map((section, i) => (
            <Box key={i} id={`section-${i}`}>
              <Typography sx={{
                fontWeight: 700, fontSize: '1.1rem',
                color: C.text, mb: 1.5, lineHeight: 1.3,
              }}>
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.content.map((para, pi) => (
                  <Box key={pi} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                    <Box sx={{
                      mt: '7px', flexShrink: 0,
                      width: 5, height: 5, borderRadius: '50%',
                      bgcolor: C.accent, opacity: 0.6,
                    }}/>
                    <Typography sx={{
                      fontSize: '0.875rem', color: C.textMid,
                      lineHeight: 1.75,
                    }}>
                      {para}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {i < t.sections.length - 1 && (
                <Box sx={{ mt: 3, height: 1, bgcolor: C.border }}/>
              )}
            </Box>
          ))}
        </Box>

        {/* Contact CTA */}
        <Box sx={{
          mt: 6, p: 3,
          bgcolor: C.bgAlt,
          border: `1px solid ${C.accentLine}`,
          borderRadius: '20px',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: C.text, mb: 0.25 }}>
              {l === 'es' ? '¿Tienes preguntas sobre tu privacidad?' : l === 'en' ? 'Questions about your privacy?' : 'Des questions sur votre confidentialité ?'}
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color: C.textMute }}>
              {l === 'es' ? 'Respondemos en menos de 24 horas.' : l === 'en' ? 'We respond within 24 hours.' : 'Nous répondons en moins de 24 heures.'}
            </Typography>
          </Box>
          <Box
            component="a"
            href="mailto:hola@datheon.com"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.75,
              px: 2.25, py: 1.1,
              bgcolor: C.accent, color: '#fff',
              borderRadius: '10px', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.875rem',
              transition: 'background 0.2s',
              flexShrink: 0,
              '&:hover': { bgcolor: '#0095cc' },
            }}
          >
            <FiMail size={14}/>
            hola@datheon.com
          </Box>
        </Box>

        {/* Back link */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Box
            component={Link}
            href={`/${l}/landing`}
            sx={{
              fontSize: '0.82rem', color: C.textMute,
              textDecoration: 'none',
              '&:hover': { color: C.accent },
            }}
          >
            ← {l === 'es' ? 'Volver al inicio' : l === 'en' ? 'Back to home' : "Retour à l'accueil"}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}