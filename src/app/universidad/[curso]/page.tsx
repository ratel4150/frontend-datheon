// File: frontend-datheon/src/app/universidad/[curso]/page.tsx

import { currentUser } from '@clerk/nextjs/server'
import { dbU as db } from '@/lib/db'
import { courses, blocks, topics, lessons, subsections, subsectionProgress, certificates } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { CursoClient } from '../../../../components/universidad/CursoClient'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ curso: string }> }

export async function generateMetadata({ params }: Props) {
  const { curso } = await params
  const [course] = await db.select().from(courses).where(eq(courses.slug, curso))
  if (!course) return {}
  return { title: `${(course.title as any).es} | Universidad Datheón` }
}

export default async function CursoPage({ params }: Props) {
  const { curso } = await params
  const user = await currentUser()
  if (!user) return null

  const [course] = await db.select().from(courses).where(eq(courses.slug, curso))
  if (!course) notFound()

  const courseBlocks      = await db.select().from(blocks).where(eq(blocks.courseId, course.id)).orderBy(blocks.order)
  const courseTopics      = await db.select().from(topics).orderBy(topics.order)
  const courseLessons     = await db.select().from(lessons).orderBy(lessons.order)
  const courseSubsections = await db.select().from(subsections).where(eq(subsections.courseId, course.id)).orderBy(subsections.order)
  const progress          = await db.select().from(subsectionProgress).where(and(eq(subsectionProgress.userId, user.id), eq(subsectionProgress.courseId, course.id)))
  const [cert]            = await db.select().from(certificates).where(and(eq(certificates.userId, user.id), eq(certificates.courseId, course.id)))

  // Serializar fechas para evitar errores de Server → Client Component
  const serializedCert = cert ? {
    id:       cert.id,
    courseId: cert.courseId,
    issuedAt: cert.issuedAt?.toISOString() ?? null,
  } : null

  const serializedProgress = progress.map(p => ({
    subsectionId: p.subsectionId,
    courseId:     p.courseId,
    completed:    p.completed,
  }))

  const serializedSubsections = courseSubsections.map(s => ({
    id:       s.id,
    lessonId: s.lessonId,
    courseId: s.courseId,
    title:    s.title,
    order:    s.order,
    evalType: s.evalType,
  }))

  return (
    <CursoClient
      course={{ id: course.id, slug: course.slug, title: course.title, description: course.description, icon: course.icon, color: course.color }}
      blocks={courseBlocks.map(b => ({ id: b.id, courseId: b.courseId, title: b.title, order: b.order }))}
      topics={courseTopics.map(t => ({ id: t.id, blockId: t.blockId, title: t.title, order: t.order }))}
      lessons={courseLessons.map(l => ({ id: l.id, topicId: l.topicId, title: l.title, order: l.order }))}
      subsections={serializedSubsections}
      progress={serializedProgress}
      certificate={serializedCert}
      userId={user.id}
    />
  )
}