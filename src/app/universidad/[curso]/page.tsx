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

  return (
    <CursoClient
      course={course as any}
      blocks={courseBlocks as any}
      topics={courseTopics as any}
      lessons={courseLessons as any}
      subsections={courseSubsections as any}
      progress={progress}
      certificate={cert ?? null}
      userId={user.id}
    />
  )
}