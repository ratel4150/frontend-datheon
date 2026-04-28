import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { dbU as db } from '@/lib/db'
import { subsectionProgress, subsections, courses, certificates } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

// Simple in-memory rate limiter (resets on server restart — use Redis in prod)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(userId: string): boolean {
  const now   = Date.now()
  const key   = `progress:${userId}`
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + 60_000 }) // 60s window
    return true
  }
  if (entry.count >= 30) return false // max 30 requests/min
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Rate limit check
  if (!checkRateLimit(userId)) {
    return NextResponse.json({ error: 'Too many requests. Espera un momento.' }, { status: 429 })
  }

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

  // Auto-certificado
  let certificateId: string | null = null
  if (completed) {
    const allSubs = await db.select().from(subsections).where(eq(subsections.courseId, courseId))
    const total   = allSubs.length
    const done    = await db.select().from(subsectionProgress)
      .where(and(eq(subsectionProgress.userId, userId), eq(subsectionProgress.courseId, courseId), eq(subsectionProgress.completed, true)))

    const MIN_SUBSECTIONS: Record<string, number> = { javascript: 40, python: 40, frontend: 40, backend: 40 }
    const minRequired = MIN_SUBSECTIONS[courseId] ?? 40

    if (done.length >= total && total >= minRequired) {
      const [existing] = await db.select().from(certificates)
        .where(and(eq(certificates.userId, userId), eq(certificates.courseId, courseId)))
      if (!existing) {
        const user     = await currentUser()
        const [course] = await db.select().from(courses).where(eq(courses.id, courseId))
        const [cert]   = await db.insert(certificates).values({
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