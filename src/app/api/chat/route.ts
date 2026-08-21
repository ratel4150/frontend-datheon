// File: src/app/api/chat/route.ts
export async function POST(req: Request) {
  const body = await req.json()

  const response = await fetch(
    `${process.env.FASTAPI_URL}/api/v1/chat/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Key': process.env.INTERNAL_API_KEY ?? '',
      },
      body: JSON.stringify(body),
    }
  )

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'X-Vercel-AI-Data-Stream': 'v1',
    },
  })
}