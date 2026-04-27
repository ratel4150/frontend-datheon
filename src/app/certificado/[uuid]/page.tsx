// File: frontend-datheon/src/app/certificado/[uuid]/page.tsx
import { dbU as db } from '@/lib/db'
import { certificates, courses, subsections } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { CertificadoView } from '../../../../components/universidad/CertificadoView'

type Props = { params: Promise<{ uuid: string }> }

export async function generateMetadata({ params }: Props) {
  const { uuid } = await params
  const [cert] = await db.select().from(certificates).where(eq(certificates.id, uuid))
  if (!cert) return { title: 'Certificado no encontrado' }
  const title = (cert.courseTitle as any)?.es ?? 'Curso'
  return {
    title: `Certificado de ${title} — ${cert.userName} | Datheón`,
    description: `${cert.userName} completó el curso de ${title} en Universidad Datheón.`,
    openGraph: {
      title: `Certificado: ${title}`,
      description: `Emitido a ${cert.userName}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  }
}

export default async function CertificadoPage({ params }: Props) {
  const { uuid } = await params

  const [cert] = await db.select().from(certificates).where(eq(certificates.id, uuid))
  if (!cert) notFound()

  const [course] = await db.select().from(courses).where(eq(courses.id, cert.courseId))

  // Calcular horas: subsecciones × 2.5, redondeado al múltiplo de 5 más cercano
  const allSubs = await db.select().from(subsections).where(eq(subsections.courseId, cert.courseId))
  const rawHours = allSubs.length * 2.5
  const hours = Math.max(20, Math.ceil(rawHours / 5) * 5)

  const certUrl = `https://datheon.io/certificado/${cert.id}`

  return (
    <CertificadoView
      certUrl={certUrl}
      cert={{
        id:          cert.id,
        userName:    cert.userName,
        courseTitle: cert.courseTitle as any,
        issuedAt:    cert.issuedAt ?? new Date(),
        courseId:    cert.courseId,
      }}
      course={{
        icon:  course?.icon  ?? '🎓',
        color: course?.color ?? '#00AEEF',
      }}
      hours={hours}
    />
  )
}