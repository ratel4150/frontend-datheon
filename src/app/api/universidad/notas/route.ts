// File: src/app/api/universidad/notas/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { dbU as db } from '@/lib/db'
import { subsectionProgress } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const subsectionId = req.nextUrl.searchParams.get('subsectionId')
  if (!subsectionId) return NextResponse.json({ notas: '' })
  const [row] = await db.select().from(subsectionProgress)
    .where(and(eq(subsectionProgress.userId, userId), eq(subsectionProgress.subsectionId, subsectionId)))
  return NextResponse.json({ notas: row?.code ?? '' })
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { subsectionId, notas } = await req.json()
  if (!subsectionId) return NextResponse.json({ error: 'Missing subsectionId' }, { status: 400 })
  await db.insert(subsectionProgress).values({ userId, subsectionId, courseId: 'notas', completed: false, code: notas, updatedAt: new Date() })
    .onConflictDoUpdate({ target: [subsectionProgress.userId, subsectionProgress.subsectionId], set: { code: notas, updatedAt: new Date() } })
  return NextResponse.json({ ok: true })
}