import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { dbU as db } from '@/lib/db'
import { subsectionProgress, subsections, courses, certificates } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { subsectionId, courseId, completed, code, score } = await req.json()
  if (!subsectionId || !courseId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  await db.insert(subsectionProgress).values({
    userId, subsectionId, courseId,
    completed: completed ?? false,
    code:      code ?? null,
    score:     score ?? null,
    completedAt: completed ? new Date() : null,
    updatedAt:   new Date(),
  }).onConflictDoUpdate({
    target: [subsectionProgress.userId, subsectionProgress.subsectionId],
    set: {
      completed:   completed ?? false,
      code:        code ?? null,
      score:       score ?? null,
      completedAt: completed ? new Date() : null,
      updatedAt:   new Date(),
    },
  })

  // Auto-certificado si completó todas las subsecciones del curso
  let certificateId: string | null = null
  if (completed) {
    const allSubs = await db.select().from(subsections).where(eq(subsections.courseId, courseId))
    const total   = allSubs.length
    const done    = await db.select().from(subsectionProgress)
      .where(and(eq(subsectionProgress.userId, userId), eq(subsectionProgress.courseId, courseId), eq(subsectionProgress.completed, true)))

    if (done.length >= total && total > 0) {
      const [existing] = await db.select().from(certificates)
        .where(and(eq(certificates.userId, userId), eq(certificates.courseId, courseId)))
      if (!existing) {
        const user    = await currentUser()
        const [course] = await db.select().from(courses).where(eq(courses.id, courseId))
        const [cert]  = await db.insert(certificates).values({
          userId, courseId,
          userName:    user?.fullName ?? user?.username ?? 'Estudiante',
          userEmail:   user?.emailAddresses[0]?.emailAddress ?? '',
          courseTitle: course.title,
        }).returning()
        certificateId = cert.id
      } else {
        certificateId = existing.id
      }
    }
  }

  return NextResponse.json({ ok: true, certificateId })
}