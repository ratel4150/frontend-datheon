'use client';

import { Box, Container, Typography, Divider, Link, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';

interface RegionContentProps {
  region: 'MX' | 'EU' | 'US' | 'ASIA';
}

function RegionContent({ region }: RegionContentProps) {
  switch (region) {
    case 'MX':
      return (
      <>
  <Typography variant="h5" sx={{ color: '#4FC3F7', mb: 2 }}>
    🇲🇽 México – Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)
  </Typography>

  <Typography paragraph>
    En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), informamos que los datos personales que recabamos son tratados de forma responsable, controlada e informada, conforme a los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad establecidos por dicha ley.
  </Typography>

  <Typography paragraph>
    Los datos personales que recopilamos incluyen nombre completo, domicilio, correo electrónico, número telefónico, identificación oficial, dirección IP y hábitos de navegación. Estos datos serán tratados para las siguientes:
  </Typography>

  <Typography paragraph>
    <strong>Finalidades primarias:</strong>
    <ul>
      <li>Proveer los productos y servicios contratados.</li>
      <li>Verificar y confirmar la identidad del titular.</li>
      <li>Dar cumplimiento a obligaciones legales y contractuales.</li>
      <li>Procesamiento de pagos y facturación.</li>
      <li>Envío de notificaciones importantes relacionadas con el servicio.</li>
    </ul>
  </Typography>

  <Typography paragraph>
    <strong>Finalidades secundarias:</strong>
    <ul>
      <li>Elaboración de estadísticas e informes internos.</li>
      <li>Mejora de experiencia en el uso de nuestros servicios.</li>
      <li>Envío de promociones, boletines y ofertas comerciales.</li>
      <li>Análisis de comportamiento de usuarios para fines de marketing digital.</li>
    </ul>
    Si no desea que sus datos personales sean tratados para estas finalidades secundarias, puede enviar una solicitud al correo:
    <Link href="mailto:team@datheon.io" sx={{ color: '#4FC3F7', ml: 1 }}>
     team@datheon.io
    </Link>.
  </Typography>

  <Typography paragraph>
    <strong>Derechos ARCO:</strong> Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer cualquiera de estos derechos, deberá enviar una solicitud al correo electrónico arriba mencionado. La solicitud debe contener al menos: nombre completo del titular, medio para comunicar la respuesta, documentos que acrediten la identidad, descripción clara de los datos y derechos a ejercer.
  </Typography>

  <Typography paragraph>
    <strong>Transferencias de datos:</strong> Informamos que sus datos podrán ser transferidos a terceros dentro y fuera del país, siempre que sea necesario para cumplir con las finalidades señaladas o requerimientos legales, incluyendo proveedores de servicios de tecnología, autoridades competentes o aliados comerciales, garantizando siempre la confidencialidad, integridad y seguridad de los mismos.
  </Typography>

  <Typography paragraph>
    <strong>Revocación del consentimiento:</strong> Usted puede revocar en cualquier momento el consentimiento otorgado para el tratamiento de sus datos personales mediante solicitud expresa al correo electrónico antes indicado. Es importante tener en cuenta que no en todos los casos será procedente la revocación inmediata si existe alguna obligación legal que requiera seguir tratando los datos.
  </Typography>

  <Typography paragraph>
    <strong>Uso de cookies:</strong> Este sitio utiliza cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el tráfico y personalizar contenido. Puede modificar la configuración de su navegador para rechazar el uso de cookies, aunque esto podría limitar la funcionalidad del sitio.
  </Typography>

  <Typography paragraph>
    <strong>Modificaciones al Aviso de Privacidad:</strong> Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso para dar cumplimiento a novedades legislativas, políticas internas o nuevos requerimientos. Cualquier cambio será notificado a través de esta misma página web.
  </Typography>

  <Typography paragraph>
    Si usted considera que su derecho a la protección de datos personales ha sido vulnerado, puede acudir ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI) en <Link href="https://home.inai.org.mx" target="_blank" sx={{ color: '#4FC3F7' }}>https://home.inai.org.mx</Link>.
  </Typography>
</>
      );

    case 'EU':
      return (
        <>
          <Typography variant="h5" sx={{ color: '#4FC3F7', mb: 2 }}>
            🇪🇺 Unión Europea – Reglamento General de Protección de Datos (GDPR)
          </Typography>
          <Typography paragraph>
            En virtud del Reglamento General de Protección de Datos de la Unión Europea (UE 2016/679), esta organización garantiza los principios de transparencia, limitación de finalidad, minimización de datos, exactitud, limitación del plazo de conservación, integridad y confidencialidad, y responsabilidad proactiva.
          </Typography>
          <Typography paragraph>
            Usted tiene derecho a: acceder, rectificar, suprimir, portar, limitar el tratamiento y oponerse al tratamiento de sus datos personales. Así mismo, tiene derecho a presentar una reclamación ante una autoridad de control.
          </Typography>
          <Typography paragraph>
            Para ejercer sus derechos, puede contactarnos a través del correo:
            <Link href="mailto:team@datheon.io" sx={{ color: '#4FC3F7', ml: 1 }}>team@datheon.io</Link>.
          </Typography>
        </>
      );

    case 'US':
      return (
        <>
          <Typography variant="h5" sx={{ color: '#4FC3F7', mb: 2 }}>
            🇺🇸 Estados Unidos – California Consumer Privacy Act (CCPA) y California Privacy Rights Act (CPRA)
          </Typography>
          <Typography paragraph>
            Bajo las leyes de privacidad del estado de California, los consumidores tienen derecho a solicitar información sobre la recopilación, uso, divulgación y venta de sus datos personales, así como el derecho a solicitar la eliminación de sus datos, optar por no vender su información personal y no ser discriminados por ejercer estos derechos.
          </Typography>
          <Typography paragraph>
            Esta organización no vende ni comparte información personal con terceros sin consentimiento previo, salvo lo requerido por ley o para el cumplimiento contractual.
          </Typography>
          <Typography paragraph>
            Las solicitudes pueden hacerse vía correo a:
            <Link href="mailto:team@datheon.io" sx={{ color: '#4FC3F7', ml: 1 }}>team@datheon.io</Link>.
          </Typography>
        </>
      );

    case 'ASIA':
      return (
        <>
          <Typography variant="h5" sx={{ color: '#4FC3F7', mb: 2 }}>
            🌏 Asia – Legislaciones LGPD (Brasil), PDPA (Singapur), APPI (Japón), PIPA (Corea del Sur)
          </Typography>
          <Typography paragraph>
            Esta organización cumple con las disposiciones establecidas en diversas legislaciones de privacidad del continente asiático, incluyendo la Ley General de Protección de Datos Personales de Brasil (LGPD), la Ley de Protección de Datos Personales de Singapur (PDPA), la Ley de Protección de la Información Personal de Japón (APPI) y la Ley de Protección de la Información Personal de Corea del Sur (PIPA).
          </Typography>
          <Typography paragraph>
            Nos comprometemos a obtener consentimiento informado, garantizar la transparencia de nuestros procesos de tratamiento de datos, implementar medidas de seguridad robustas, y facilitar el ejercicio de derechos por parte de los titulares de los datos.
          </Typography>
          <Typography paragraph>
            Para solicitudes relacionadas, contáctanos en:
            <Link href="mailto:team@datheon.io" sx={{ color: '#4FC3F7', ml: 1 }}>team@datheon.io</Link>.
          </Typography>
        </>
      );

    default:
      return null;
  }
}

export default function PrivacyPolicyPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const regions = ['MX', 'EU', 'US', 'ASIA'] as const;

  return (
    <Box sx={{ backgroundColor: '#FFF', color: '#000', py: 10, fontFamily: 'Poppins' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <FaShieldAlt size={50} color="#4FC3F7" />
          <Typography variant="h3" sx={{ fontWeight: 700, mt: 2 }}>
            Aviso de Privacidad Internacional
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Última actualización: 04 de agosto de 2025
          </Typography>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          centered
          sx={{
            mb: 4,
            '& .MuiTab-root': { fontWeight: 'bold' },
            '& .Mui-selected': { color: '#4FC3F7' },
            '& .MuiTabs-indicator': { backgroundColor: '#4FC3F7' },
          }}
        >
          <Tab sx={{color:"black"}} label="🇲🇽 México" />
          <Tab sx={{color:"black"}} label="🇪🇺 Europa" />
          <Tab sx={{color:"black"}} label="🇺🇸 EE.UU." />
          <Tab sx={{color:"black"}} label="🌏 Asia" />
        </Tabs>

        <Divider sx={{ mb: 4 }} />

        <Box>
          <RegionContent region={regions[selectedTab]} />
        </Box>

        <Divider sx={{ mt: 6, mb: 4 }} />

        <Box textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Si tienes dudas, contáctanos en:
            <Link href="mailto:team@datheon.io" sx={{ color: '#4FC3F7', ml: 1 }}>team@datheon.io</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
