// File: frontend-datheon/src/app/universidad/page.tsx
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { dbU as db } from '@datheon/shared/api/db'
import { courses, subsectionProgress, certificates, subsections, lessons, topics, blocks } from '@datheon/shared/api/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { UniversidadDashboard } from '@datheon/widgets/universidad-dashboard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Universidad Datheón',
  description: 'Aprende JavaScript, Python, Frontend y Backend con certificados verificables.',
}

// Calcular racha de días
function calcStreak(progress: { completedAt: Date | null }[]): number {
  const days = [...new Set(
    progress
      .filter(p => p.completedAt)
      .map(p => new Date(p.completedAt!).toDateString())
  )].sort().reverse()

  if (!days.length) return 0
  let streak = 0
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  if (days[0] !== today && days[0] !== yesterday) return 0

  for (let i = 0; i < days.length; i++) {
    const expected = new Date(Date.now() - i * 86400000).toDateString()
    if (days[i] === expected) streak++
    else break
  }
  return streak
}

export default async function UniversidadPage() {
  const user = await currentUser()
  if (!user) redirect('/universidad/login')

  const allCourses = await db.select().from(courses)
    .where(eq(courses.published, true))
    .orderBy(courses.order)

  const progress = await db.select().from(subsectionProgress)
    .where(eq(subsectionProgress.userId, user.id))
    .orderBy(desc(subsectionProgress.updatedAt))

  const certs = await db.select().from(certificates)
    .where(eq(certificates.userId, user.id))

  // Última actividad — últimas 5 subsecciones completadas con nombre
  const recentCompleted = progress.filter(p => p.completed).slice(0, 5)
  const recentActivity = await Promise.all(
    recentCompleted.map(async p => {
      const [sub] = await db.select().from(subsections).where(eq(subsections.id, p.subsectionId))
      const course = allCourses.find(c => c.id === p.courseId)
      return {
        subsectionId:    p.subsectionId,
        subsectionTitle: (sub?.title as any)?.es ?? 'Subsección',
        courseId:        p.courseId,
        courseTitle:     (course?.title as any)?.es ?? '',
        courseColor:     course?.color ?? '#00AEEF',
        courseSlug:      course?.slug ?? '',
        completedAt:     p.completedAt,
      }
    })
  )

  // Siguiente subsección recomendada
  const completedIds = new Set(progress.filter(p => p.completed).map(p => p.subsectionId))
  let nextSub: any = null
  for (const course of allCourses) {
    const courseSubs = await db.select().from(subsections)
      .where(eq(subsections.courseId, course.id))
      .orderBy(subsections.order)
    const next = courseSubs.find(s => !completedIds.has(s.id))
    if (next) {
      nextSub = {
        id:      next.id,
        title:   (next.title as any)?.es ?? '',
        courseId:    course.id,
        courseTitle: (course.title as any)?.es ?? '',
        courseSlug:  course.slug,
        courseColor: course.color,
        courseIcon:  course.icon,
      }
      break
    }
  }

  const streak = calcStreak(progress)

  return (
    <UniversidadDashboard
      user={{ id: user.id, name: user.fullName ?? user.username ?? 'Estudiante', email: user.emailAddresses[0]?.emailAddress ?? '' }}
      courses={allCourses as any}
      progress={progress}
      certificates={certs}
      streak={streak}
      recentActivity={recentActivity}
      nextSub={nextSub}
    />
  )
}