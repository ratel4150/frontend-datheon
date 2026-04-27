// File: frontend-datheon/src/app/universidad/[curso]/[subseccion]/page.tsx
import { currentUser } from '@clerk/nextjs/server'
import { dbU as db } from '@/lib/db'
import { courses, blocks, topics, lessons, subsections, subsectionProgress } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { SubseccionPlayer } from '../../../../../components/universidad/SubseccionPlayer'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ curso: string; subseccion: string }> }

export default async function SubseccionPage({ params }: Props) {
  const { curso, subseccion } = await params
  const user = await currentUser()
  if (!user) return null

  const [course]  = await db.select().from(courses).where(eq(courses.slug, curso))
  if (!course) notFound()

  const [sub] = await db.select().from(subsections).where(eq(subsections.id, subseccion))
  if (!sub) notFound()

  // Navegación: todas las subsecciones del curso ordenadas
  const allSubs = await db.select().from(subsections)
    .where(eq(subsections.courseId, course.id)).orderBy(subsections.order)

  const idx  = allSubs.findIndex(s => s.id === subseccion)
  const prev = allSubs[idx - 1] ?? null
  const next = allSubs[idx + 1] ?? null

  // Lección y tema para breadcrumb
  const [lesson] = await db.select().from(lessons).where(eq(lessons.id, sub.lessonId))
  const [topic]  = lesson ? await db.select().from(topics).where(eq(topics.id, lesson.topicId)) : [null]
  const [block]  = topic  ? await db.select().from(blocks).where(eq(blocks.id, topic.blockId))  : [null]

  const [progress] = await db.select().from(subsectionProgress)
    .where(and(eq(subsectionProgress.userId, user.id), eq(subsectionProgress.subsectionId, subseccion)))

  const allProgress = await db.select().from(subsectionProgress)
    .where(and(eq(subsectionProgress.userId, user.id), eq(subsectionProgress.courseId, course.id)))

  return (
    <SubseccionPlayer
      course={course as any}
      block={block as any}
      topic={topic as any}
      lesson={lesson as any}
      subsection={sub as any}
      prev={prev as any}
      next={next as any}
      userId={user.id}
      savedCode={progress?.code ?? null}
      completed={progress?.completed ?? false}
      totalSubs={allSubs.length}
      completedSubs={allProgress.filter(p => p.completed).length}
    />
  )
}