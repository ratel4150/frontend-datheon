// File: frontend-datheon/src/app/api/universidad/analytics/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { dbU as db } from '@datheon/shared/api/db'
import { subsectionProgress } from '@datheon/shared/api/db/schema'
import { eq, and } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { subsectionId, courseId, timeSpentSeconds } = await req.json()
  if (!subsectionId || !timeSpentSeconds) return NextResponse.json({ ok: true }) // silent fail

  // Store time spent in the score field (repurposed) or a separate update
  // For now we just log — extend schema later with a timeSpent column
  console.log(`[analytics] user=${userId} sub=${subsectionId} time=${timeSpentSeconds}s`)

  return NextResponse.json({ ok: true })
}