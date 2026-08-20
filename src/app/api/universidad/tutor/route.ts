// File: src/app/api/universidad/tutor/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

// Rate limit simple
const rateMap = new Map<string, { count: number; resetAt: number }>()
function checkRate(userId: string) {
  const now = Date.now()
  const e = rateMap.get(userId)
  if (!e || now > e.resetAt) { rateMap.set(userId, { count: 1, resetAt: now + 60_000 }); return true }
  if (e.count >= 20) return false
  e.count++; return true
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!checkRate(userId)) return NextResponse.json({ error: 'Límite de mensajes alcanzado. Espera 1 minuto.' }, { status: 429 })

  const { messages, subsectionTitle, theory } = await req.json()

  const systemPrompt = `Eres un tutor experto en programación especializado en "${subsectionTitle}".
Tu objetivo es ayudar al estudiante a entender el tema con claridad, paciencia y ejemplos prácticos.

Contexto del tema que está estudiando:
${theory ? theory.replace(/<[^>]+>/g, '').substring(0, 1500) : 'No disponible'}

Reglas:
- Responde SIEMPRE en español
- Sé claro, conciso y pedagógico
- Usa ejemplos de código cuando sea útil (en bloques de código)
- Si el estudiante tiene código con errores, señala exactamente qué está mal y por qué
- No des la solución completa a los ejercicios — guía al estudiante para que llegue solo
- Máximo 200 palabras por respuesta
- Usa emojis con moderación para hacer la conversación amigable`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY ?? '', 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      system: systemPrompt,
      messages: messages.slice(-10).map((m: any) => ({ role: m.role, content: m.content })),
    })
  })

  if (!res.ok) return NextResponse.json({ reply: 'Error al conectar con el tutor. Intenta de nuevo.' })
  const data = await res.json()
  return NextResponse.json({ reply: data.content?.[0]?.text ?? 'Sin respuesta' })
}