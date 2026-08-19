// File: frontend-datheon/src/app/certificado/[uuid]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { dbU as db } from '@datheon/shared/api/db'
import { certificates, courses } from '@datheon/shared/api/db/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

type Props = { params: Promise<{ uuid: string }> }

export default async function OGImage({ params }: Props) {
  const { uuid } = await params
  const [cert] = await db.select().from(certificates).where(eq(certificates.id, uuid))
  const [course] = cert ? await db.select().from(courses).where(eq(courses.id, cert.courseId)) : [null]

  const name   = cert?.userName ?? 'Estudiante'
  const title  = (cert?.courseTitle as any)?.es ?? 'Curso'
  const color  = course?.color ?? '#00AEEF'
  const icon   = course?.icon ?? '🎓'

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#080A10', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: -100, left: -100, width: 600, height: 600, borderRadius: '50%', backgroundColor: color, filter: 'blur(150px)', opacity: 0.15 }}/>
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, borderRadius: '50%', backgroundColor: '#6366F1', filter: 'blur(120px)', opacity: 0.1 }}/>

      {/* Grid pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}/>

      {/* Content */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '60px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #00AEEF, #6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 24 }}>D</span>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>Datheón</div>
              <div style={{ color: '#00AEEF', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Universidad</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 100, backgroundColor: 'rgba(34,197,94,0.1)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22C55E' }}/>
            <span style={{ color: '#22C55E', fontSize: 13, fontWeight: 700 }}>CERTIFICADO VERIFICADO</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>Certificado de finalización</div>
          <div style={{ color: '#fff', fontWeight: 900, fontSize: 68, lineHeight: 1, letterSpacing: '-0.03em' }}>{name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: color + '22', border: `2px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{icon}</div>
            <div style={{ color: color, fontWeight: 700, fontSize: 32 }}>{title}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontFamily: 'monospace' }}>datheon.io/certificado/{uuid.substring(0,18)}...</div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>Verifica en datheon.io</div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}