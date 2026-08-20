// File: frontend-datheon/components/universidad/SubseccionPlayer.tsx
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Box, Typography, Button, alpha, CircularProgress, Chip, LinearProgress } from '@mui/material'
import { FiCheck, FiX, FiPlay, FiChevronLeft, FiChevronRight, FiArrowLeft, FiBookOpen, FiCode, FiHelpCircle } from 'react-icons/fi'
import { MdOutlineAutorenew } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import type { ViewUpdate } from '@codemirror/view'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { keymap } from '@codemirror/view'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { FiFileText, FiVideo, FiLink, FiMessageSquare, FiEdit3, FiAlertTriangle, FiTarget, FiZap, FiCpu } from 'react-icons/fi'
const C = {
  bg:     '#0A0C10',
  card:   '#13161D',
  border: 'rgba(255,255,255,0.07)',
  text:   '#F1F5F9',
  muted:  'rgba(255,255,255,0.4)',
  accent: '#00AEEF',
  green:  '#22C55E',
  red:    '#EF4444',
  yellow: '#F59E0B',
} as const

type Step = 'theory' | 'exercise' | 'pdf' | 'video' | 'recursos' | 'notas' | 'errores' | 'reto' | 'ia'
type EvalType = 'quiz'|'lab'|'cloze'|'drag_drop'|'flashcard'|'timeline'|'decision'|'survey'|'challenge'|'mindmap'|'replit'|'github'

interface TestResult { id: string; description: string; passed: boolean; error?: string }

interface Subsection {
  id: string; title: any; evalType: EvalType; courseId: string
  theory:   { es?: string }
  evalData: any
  hint:     { es?: string }
}
interface Course  { id: string; slug: string; title: any; color: string; icon: string }
interface Block   { id: string; title: any }
interface Topic   { id: string; title: any }
interface Lesson  { id: string; title: any }

interface Props {
  course:      Course
  block:       Block
  topic:       Topic
  lesson:      Lesson
  subsection:  Subsection
  prev:        Subsection | null
  next:        Subsection | null
  userId:      string
  savedCode:   string | null
  completed:   boolean
  totalSubs:   number
  completedSubs: number
  
}


// ══════════════════════════════════════════════════════════
// PDFTab
// ══════════════════════════════════════════════════════════
export function PDFTab({ data, color }: { data: any; color: string }) {
  const url: string = data?.pdfUrl ?? ''
 
  if (!url) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>📄</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', mb: 0.5 }}>
        No hay PDF para esta subsección
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
        {'Agrega pdfUrl en eval_data'}
      </Typography>
    </Box>
  )
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden', height: 480 }}>
        <Box component="iframe"
          src={`${url}#toolbar=0`}
          title="PDF de la subsección"
          sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button component="a" href={url} target="_blank" download variant="contained"
          sx={{ bgcolor: '#A855F7', color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha('#A855F7', 0.85) } }}>
          📥 Descargar PDF
        </Button>
        <Button component="a" href={url} target="_blank" variant="outlined"
          sx={{ borderColor: alpha('#A855F7', 0.4), color: '#A855F7', fontWeight: 600, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha('#A855F7', 0.08) } }}>
          Abrir en nueva pestaña ↗
        </Button>
      </Box>
    </Box>
  )
}

// ══════════════════════════════════════════════════════════
// COMPONENTE: VideoTab
// ══════════════════════════════════════════════════════════
function VideoTab({ data, color }: { data: any; color: string }) {
  const url: string = data?.videoUrl ?? ''
  const getEmbedUrl = (u: string) => {
    if (!u) return ''
    const yt = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
    if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&modestbranding=1`
    const vm = u.match(/vimeo\.com\/(\d+)/)
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`
    return u
  }
  const embed = getEmbedUrl(url)
 
  if (!url) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>🎬</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', mb: 0.5 }}>No hay video para esta subsección</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontFamily: 'monospace' }}>Agrega videoUrl en eval_data</Typography>
    </Box>
  )
 
  return (
    <Box>
      {data?.videoTitle && (
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 1.5, color: '#F1F5F9' }}>{data.videoTitle}</Typography>
      )}
      <Box sx={{ position: 'relative', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden', bgcolor: '#000', border: '1px solid rgba(255,255,255,0.07)' }}>
        <Box component="iframe" src={embed} title="Video de la subsección"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}/>
      </Box>
      {data?.videoDescription && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{data.videoDescription}</Typography>
        </Box>
      )}
    </Box>
  )
}
 
// ══════════════════════════════════════════════════════════
// COMPONENTE: RecursosTab
// ══════════════════════════════════════════════════════════
function RecursosTab({ data, color }: { data: any; color: string }) {
  const recursos: any[] = data?.recursos ?? []
  if (!recursos.length) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>🔗</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>No hay recursos para esta subsección</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontFamily: 'monospace', mt: 0.5 }}>{'Agrega recursos: [{tipo, titulo, url, descripcion}] en eval_data'}</Typography>
    </Box>
  )
 
  const TYPE_ICON: Record<string, string> = { docs: '📚', video: '🎬', articulo: '📰', tool: '🛠️', github: '🐙', ejercicio: '💻', libro: '📖' }
  const TYPE_COLOR: Record<string, string> = { docs: '#00AEEF', video: '#EF4444', articulo: '#F59E0B', tool: '#22C55E', github: '#6366F1', ejercicio: '#A855F7', libro: '#EC4899' }
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', mb: 0.5 }}>
        {recursos.length} recursos curados
      </Typography>
      {recursos.map((r: any, i: number) => {
        const ic = TYPE_ICON[r.tipo] ?? '🔗'
        const cl = TYPE_COLOR[r.tipo] ?? color
        return (
          <Box key={i} component="a" href={r.url} target="_blank" rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px',
              bgcolor: 'rgba(255,255,255,0.02)', transition: 'all 0.2s',
              '&:hover': { borderColor: alpha(cl, 0.4), bgcolor: alpha(cl, 0.05), transform: 'translateX(4px)' } }}>
            <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: alpha(cl, 0.12), border: `1px solid ${alpha(cl, 0.25)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
              {ic}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#F1F5F9' }}>{r.titulo}</Typography>
                {r.tipo && <Box sx={{ px: 0.75, py: 0.1, bgcolor: alpha(cl, 0.1), border: `1px solid ${alpha(cl, 0.25)}`, borderRadius: '4px' }}>
                  <Typography sx={{ fontSize: '0.58rem', fontWeight: 700, color: cl, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{r.tipo}</Typography>
                </Box>}
              </Box>
              {r.descripcion && <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{r.descripcion}</Typography>}
              <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', mt: 0.5, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.url}
              </Typography>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
 
// ══════════════════════════════════════════════════════════
// COMPONENTE: ErroresTab
// ══════════════════════════════════════════════════════════
function ErroresTab({ data, color }: { data: any; color: string }) {
  const errores: any[] = data?.erroresFrecuentes ?? []
  if (!errores.length) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>⚠️</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>No hay errores documentados aún</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontFamily: 'monospace', mt: 0.5 }}> {'Agrega erroresFrecuentes: [{error, solucion, ejemplo}] en eval_data'}</Typography>
    </Box>
  )
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ px: 2, py: 1.25, bgcolor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ fontSize: '1rem' }}>⚠️</Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'rgba(239,68,68,0.8)', lineHeight: 1.5 }}>
          Estos son los errores más comunes que cometen los estudiantes en este tema. ¡Léelos antes de hacer el ejercicio!
        </Typography>
      </Box>
      {errores.map((e: any, i: number) => (
        <Box key={i} sx={{ border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
          <Box sx={{ px: 2.5, py: 1.5, bgcolor: 'rgba(239,68,68,0.06)', borderBottom: '1px solid rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#EF4444' }}>{i+1}</Typography>
            </Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#EF4444' }}>{e.error}</Typography>
          </Box>
          <Box sx={{ p: 2.5 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#22C55E', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.75 }}>✅ Solución</Typography>
            <Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, mb: e.ejemplo ? 1.5 : 0 }}>{e.solucion}</Typography>
            {e.ejemplo && (
              <Box sx={{ bgcolor: '#161b22', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', p: 1.5 }}>
                <Typography sx={{ fontSize: '0.72rem', color: '#79c0ff', fontFamily: '"Fira Code", monospace', whiteSpace: 'pre', overflowX: 'auto' }}>
                  {e.ejemplo}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
 
// ══════════════════════════════════════════════════════════
// COMPONENTE: RetoTab
// ══════════════════════════════════════════════════════════
function RetoTab({ data, color, subsectionId, userId }: { data: any; color: string; subsectionId: string; userId: string }) {
  const [code, setCode]           = useState(data?.retoExtra?.starterCode ?? '// Tu reto extra aquí\n')
  const [submitted, setSubmitted] = useState(false)
  const reto = data?.retoExtra
 
  if (!reto) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>🎯</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>No hay reto extra para esta subsección</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontFamily: 'monospace', mt: 0.5 }}>   {'Agrega retoExtra: {titulo, descripcion, starterCode, nivel} en eval_data'}</Typography>
    </Box>
  )
 
  const nivelColor = reto.nivel === 'avanzado' ? '#EF4444' : reto.nivel === 'medio' ? '#F59E0B' : '#22C55E'
  const nivelLabel = reto.nivel === 'avanzado' ? '🔴 Avanzado' : reto.nivel === 'medio' ? '🟡 Intermedio' : '🟢 Básico'
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#F1F5F9' }}>{reto.titulo ?? 'Reto extra'}</Typography>
        <Box sx={{ px: 1.25, py: 0.4, bgcolor: alpha(nivelColor, 0.1), border: `1px solid ${alpha(nivelColor, 0.3)}`, borderRadius: '100px' }}>
          <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: nivelColor }}>{nivelLabel}</Typography>
        </Box>
      </Box>
 
      {reto.descripcion && (
        <Box sx={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)',
          '& p': { mb: 1.5 }, '& ol,& ul': { pl: 2.5 }, '& li': { mb: 0.5 },
          '& code': { bgcolor: 'rgba(255,255,255,0.08)', px: 0.6, borderRadius: '4px', fontFamily: 'monospace', color: '#79c0ff' }
        }} dangerouslySetInnerHTML={{ __html: reto.descripcion }}/>
      )}
 
      <Box sx={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden', height: 260 }}>
        <Box sx={{ px: 2, py: 0.75, bgcolor: '#0d0f14', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {['#EF4444','#F59E0B','#22C55E'].map(c => <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c }}/>)}
          </Box>
          <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>reto.js</Typography>
          <Box sx={{ ml: 'auto', px: 1, py: 0.2, bgcolor: alpha(nivelColor, 0.1), borderRadius: '4px' }}>
            <Typography sx={{ fontSize: '0.6rem', color: nivelColor, fontWeight: 700 }}>OPCIONAL</Typography>
          </Box>
        </Box>
        <Box sx={{ height: 'calc(100% - 32px)', '& .cm-editor': { height: '100%' } }}>
          <CodeEditor code={code} onChange={setCode} lang="javascript"/>
        </Box>
      </Box>
 
      {!submitted ? (
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Button onClick={() => setSubmitted(true)} variant="contained" disabled={code === reto.starterCode}
            sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.85) }, '&.Mui-disabled': { bgcolor: alpha(color, 0.25), color: 'rgba(255,255,255,0.3)' } }}>
            🎯 Entregar reto extra
          </Button>
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>Opcional — no afecta tu progreso</Typography>
        </Box>
      ) : (
        <Box sx={{ px: 2, py: 1.5, bgcolor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#22C55E' }}>🏆 ¡Reto extra completado! Eres del 10% que va más lejos.</Typography>
        </Box>
      )}
    </Box>
  )
}
 
// ══════════════════════════════════════════════════════════
// COMPONENTE: NotasTab
// ══════════════════════════════════════════════════════════
function NotasTab({ subsectionId, userId, color }: { subsectionId: string; userId: string; color: string }) {
  const [notas, setNotas]     = useState('')
  const [saved, setSaved]     = useState(false)
  const [loading, setLoading] = useState(true)
  const timerRef = useRef<any>(null)
 
  useEffect(() => {
    // Cargar notas guardadas
    fetch(`/api/universidad/notas?subsectionId=${subsectionId}`)
      .then(r => r.json())
      .then(d => { setNotas(d.notas ?? ''); setLoading(false) })
      .catch(() => setLoading(false))
  }, [subsectionId])
 
  const handleChange = (val: string) => {
    setNotas(val); setSaved(false)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      await fetch('/api/universidad/notas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subsectionId, notas: val }) })
      setSaved(true)
    }, 1000)
  }
 
  const handleExport = () => {
    const blob = new Blob([notas], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `notas-${subsectionId}.txt`; a.click()
    URL.revokeObjectURL(url)
  }
 
  if (loading) return <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 4 }}><CircularProgress size={16} sx={{ color: color }}/><Typography sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>Cargando notas...</Typography></Box>
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          📝 Tus notas personales — guardado automático
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {saved && <Typography sx={{ fontSize: '0.68rem', color: '#22C55E' }}>✓ Guardado</Typography>}
          {notas.trim() && (
            <Button size="small" onClick={handleExport} sx={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', textTransform: 'none', '&:hover': { color: color } }}>
              Exportar .txt
            </Button>
          )}
        </Box>
      </Box>
      <Box component="textarea"
        value={notas}
        onChange={(e: any) => handleChange(e.target.value)}
        placeholder={"Escribe tus notas aquí...\n\n• Conceptos importantes\n• Ejemplos propios\n• Preguntas para investigar\n• Conexiones con otros temas"}
        sx={{ width: '100%', minHeight: 280, p: 2, bgcolor: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.07)`, borderRadius: '12px', color: '#F1F5F9', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical', lineHeight: 1.8, '&:focus': { borderColor: alpha(color, 0.4), bgcolor: 'rgba(255,255,255,0.04)' }, transition: 'all 0.2s' }}
      />
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {['• Importante: ', '• Ejemplo: ', '• Pregunta: ', '• TODO: ', '⚡ Truco: '].map(t => (
          <Box key={t} onClick={() => handleChange(notas + '\n' + t)}
            sx={{ px: 1.25, py: 0.5, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '100px', cursor: 'pointer', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', '&:hover': { borderColor: alpha(color, 0.4), color: color } }}>
            {t}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
 
// ══════════════════════════════════════════════════════════
// COMPONENTE: TutorIA
// ══════════════════════════════════════════════════════════
function TutorIA({ subsection, color, userId }: { subsection: any; color: string; userId: string }) {
  const [messages, setMessages] = useState<{role:'user'|'assistant', content:string}[]>([
    { role: 'assistant', content: `¡Hola! Soy tu tutor de IA para **${subsection.title?.es}**. Puedo explicarte conceptos, revisar tu código, darte ejemplos adicionales o responder cualquier duda. ¿En qué te ayudo?` }
  ])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const bottomRef               = useRef<HTMLDivElement>(null)
 
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
 
  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim(); setInput(''); setLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
 
    try {
      const res = await fetch('/api/universidad/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMsg }],
          subsectionTitle: subsection.title?.es,
          theory: subsection.theory?.es,
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply ?? 'Error al responder.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Intenta de nuevo.' }])
    } finally { setLoading(false) }
  }
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 420, border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ px: 2, py: 1.25, borderBottom: '1px solid rgba(255,255,255,0.07)', bgcolor: '#0d0f14', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: `linear-gradient(135deg, ${color}, #6366F1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 10px ${alpha(color, 0.3)}` }}>
          <Typography sx={{ fontSize: '0.85rem' }}>🤖</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#F1F5F9' }}>Tutor IA</Typography>
          <Typography sx={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)' }}>Especializado en {subsection.title?.es}</Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#22C55E', animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }}/>
          <Typography sx={{ fontSize: '0.62rem', color: '#22C55E' }}>En línea</Typography>
        </Box>
      </Box>
 
      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5, scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
        {messages.map((m, i) => (
          <Box key={i} sx={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', gap: 1, alignItems: 'flex-end' }}>
            {m.role === 'assistant' && (
              <Box sx={{ width: 22, height: 22, borderRadius: '6px', background: `linear-gradient(135deg, ${color}, #6366F1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Typography sx={{ fontSize: '0.65rem' }}>🤖</Typography>
              </Box>
            )}
            <Box sx={{ maxWidth: '78%', px: 1.75, py: 1.25, borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              bgcolor: m.role === 'user' ? alpha(color, 0.2) : 'rgba(255,255,255,0.05)',
              border: `1px solid ${m.role === 'user' ? alpha(color, 0.35) : 'rgba(255,255,255,0.07)'}` }}>
              <Typography sx={{ fontSize: '0.82rem', color: '#F1F5F9', lineHeight: 1.65, whiteSpace: 'pre-wrap',
                '& code': { bgcolor: 'rgba(255,255,255,0.1)', px: 0.5, borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#79c0ff' }
              }}>
                {m.content.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`(.*?)`/g, '$1')}
              </Typography>
            </Box>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box sx={{ width: 22, height: 22, borderRadius: '6px', background: `linear-gradient(135deg, ${color}, #6366F1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '0.65rem' }}>🤖</Typography>
            </Box>
            <Box sx={{ px: 1.75, py: 1, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px 14px 14px 4px', display: 'flex', gap: 0.5 }}>
              {[0,1,2].map(i => <Box key={i} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color, animation: `bounce 1s infinite ${i*0.15}s`, '@keyframes bounce': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } } }}/>)}
            </Box>
          </Box>
        )}
        <div ref={bottomRef}/>
      </Box>
 
      {/* Suggested questions */}
      {messages.length === 1 && (
        <Box sx={{ px: 2, pb: 1, display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {[
            `Explícame ${subsection.title?.es} con un ejemplo`,
            '¿Cuáles son los errores más comunes?',
            'Dame un ejercicio adicional',
            '¿Cómo se usa en la vida real?',
          ].map(q => (
            <Box key={q} onClick={() => { setInput(q); }}
              sx={{ px: 1.25, py: 0.5, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', cursor: 'pointer', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', transition: 'all 0.15s', '&:hover': { borderColor: alpha(color, 0.4), color: color } }}>
              {q}
            </Box>
          ))}
        </Box>
      )}
 
      {/* Input */}
      <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid rgba(255,255,255,0.07)', bgcolor: '#0d0f14', display: 'flex', gap: 1 }}>
        <Box component="input"
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Pregunta cualquier cosa sobre este tema..."
          sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', px: 1.5, py: 0.85, color: '#F1F5F9', fontSize: '0.82rem', fontFamily: 'inherit', outline: 'none', '&:focus': { borderColor: alpha(color, 0.4) }, transition: 'border-color 0.2s' }}
        />
        <Box onClick={send}
          sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: loading || !input.trim() ? 'rgba(255,255,255,0.05)' : color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: loading || !input.trim() ? 'default' : 'pointer', transition: 'all 0.2s', flexShrink: 0, '&:hover': loading || !input.trim() ? {} : { bgcolor: alpha(color, 0.85) } }}>
          {loading ? <CircularProgress size={14} sx={{ color: 'rgba(255,255,255,0.4)' }}/> : <Typography sx={{ fontSize: '0.85rem' }}>↑</Typography>}
        </Box>
      </Box>
    </Box>
  )
}

// ─── CodeMirror ───────────────────────────────────────────────
function CodeEditor({ code, onChange, lang }: { code: string; onChange: (v: string) => void; lang: string }) {
  const ref  = useRef<HTMLDivElement>(null)
  const view = useRef<EditorView | null>(null)
  useEffect(() => {
    if (!ref.current) return
    const langExt = lang === 'python' ? python() : javascript({ jsx: true, typescript: true })
    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup, langExt, oneDark,
        keymap.of([...defaultKeymap, indentWithTab]),
        EditorView.updateListener.of((u: ViewUpdate) => { if (u.docChanged) onChange(u.state.doc.toString()) }),
        EditorView.theme({ '&': { height: '100%', fontSize: '14px' }, '.cm-scroller': { fontFamily: '"Fira Code", monospace', overflow: 'auto' }, '.cm-content': { padding: '12px 0' } }),
      ],
    })
    view.current = new EditorView({ state, parent: ref.current })
    return () => { view.current?.destroy(); view.current = null }
  }, [])
  useEffect(() => {
    const v = view.current; if (!v) return
    const cur = v.state.doc.toString()
    if (cur !== code) v.dispatch({ changes: { from: 0, to: cur.length, insert: code } })
  }, [code])
  return <Box ref={ref} sx={{ height: '100%', '& .cm-editor': { height: '100%' }, '& .cm-editor.cm-focused': { outline: 'none' } }}/>
}

// ─── Test runner ──────────────────────────────────────────────
function runTests(code: string, tests: any[]): Promise<TestResult[]> {
  return new Promise(resolve => {
    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'display:none;position:fixed;'
    iframe.setAttribute('sandbox', 'allow-scripts')
    document.body.appendChild(iframe)
    const results: TestResult[] = []
    let done = 0, settled = false
    const cleanup = () => {
      if (settled) return; settled = true
      window.removeEventListener('message', handler)
      if (document.body.contains(iframe)) document.body.removeChild(iframe)
    }
    const timeout = setTimeout(() => { cleanup(); resolve(tests.map(t => ({ id: t.id, description: t.description, passed: false, error: 'Timeout' }))) }, 6000)
    const handler = (e: MessageEvent) => {
      if (e.data?.type !== 'ud-test-result') return
      results.push(e.data.result); done++
      if (done === tests.length) { clearTimeout(timeout); cleanup(); resolve(results) }
    }
    window.addEventListener('message', handler)
    const testScript = tests.map(t => `;(function(){try{var _p=(function(){${t.testFn}})();parent.postMessage({type:'ud-test-result',result:{id:'${t.id}',description:${JSON.stringify(t.description)},passed:!!_p}},'*')}catch(_e){parent.postMessage({type:'ud-test-result',result:{id:'${t.id}',description:${JSON.stringify(t.description)},passed:false,error:_e.message}},'*')}})()`).join('\n')
    // const/let no son accesibles desde IIFEs — convertir a var para scope global
    const normalizedCode = code
      .replace(/\bconst\b/g, 'var')
      .replace(/\blet\b/g, 'var')

    const html = '<!DOCTYPE html><html><body><script>'
      + 'var __logs=[];'
      + 'var __origLog=console.log;'
      + 'console.log=function(){var a=Array.prototype.slice.call(arguments);__logs.push(a.map(function(x){return String(x)}).join(" "));__origLog.apply(console,a)};'
      + 'try{' + normalizedCode + '}catch(_e){}'
      + testScript
      + '<\/script></body></html>'

    iframe.srcdoc = html
  })
}

// ─── Quiz eval ────────────────────────────────────────────────
function QuizEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [checked, setChecked] = useState(false)
  const [score, setScore]     = useState(0)
  const qs: any[] = data.questions ?? []

  const check = () => {
    let c = 0; qs.forEach(q => { if (answers[q.id] === q.correct) c++ })
    setScore(c); setChecked(true)
    if (c === qs.length) setTimeout(onComplete, 800)
  }
  const reset = () => { setAnswers({}); setChecked(false); setScore(0) }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {qs.map((q, qi) => (
        <Box key={q.id}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', mb: 1.5, lineHeight: 1.6, color: C.text }}>{qi+1}. {q.q}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {q.options.map((opt: string, oi: number) => {
              const sel = answers[q.id] === oi
              const ok  = checked && oi === q.correct
              const bad = checked && sel && oi !== q.correct
              return (
                <Box key={oi} onClick={() => !checked && setAnswers(p => ({ ...p, [q.id]: oi }))}
                  sx={{ px: 2, py: 1.25, borderRadius: '10px', cursor: checked ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 1.5, transition: 'all 0.15s',
                    border: `1px solid ${ok ? alpha(C.green, 0.6) : bad ? alpha(C.red, 0.6) : sel ? alpha(color, 0.6) : C.border}`,
                    bgcolor: ok ? alpha(C.green, 0.08) : bad ? alpha(C.red, 0.08) : sel ? alpha(color, 0.08) : 'transparent',
                    '&:hover': { bgcolor: checked ? undefined : 'rgba(255,255,255,0.04)' } }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${ok ? C.green : bad ? C.red : sel ? color : 'rgba(255,255,255,0.2)'}`,
                    bgcolor: ok ? alpha(C.green, 0.2) : bad ? alpha(C.red, 0.2) : sel ? alpha(color, 0.2) : 'transparent' }}>
                    {(ok || (sel && !bad)) && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: ok ? C.green : color }}/>}
                  </Box>
                  <Typography sx={{ fontSize: '0.85rem', color: ok ? C.green : bad ? C.red : C.text, flex: 1 }}>{opt}</Typography>
                  {ok && <FiCheck size={13} color={C.green}/>}
                  {bad && <FiX size={13} color={C.red}/>}
                </Box>
              )
            })}
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {!checked ? (
          <Button onClick={check} disabled={Object.keys(answers).length < qs.length} variant="contained"
            sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', px: 2.5, '&:hover': { bgcolor: alpha(color, 0.85) }, '&.Mui-disabled': { bgcolor: alpha(color, 0.25), color: 'rgba(255,255,255,0.3)' } }}>
            Verificar
          </Button>
        ) : (
          <>
            <Box sx={{ px: 2, py: 1.25, flex: 1, bgcolor: score === qs.length ? alpha(C.green, 0.08) : alpha(C.yellow, 0.08), border: `1px solid ${score === qs.length ? alpha(C.green, 0.3) : alpha(C.yellow, 0.3)}`, borderRadius: '10px' }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: score === qs.length ? C.green : C.yellow }}>
                {score === qs.length ? '✅ ¡Perfecto!' : `${score}/${qs.length} correctas — intenta de nuevo`}
              </Typography>
            </Box>
            {score < qs.length && (
              <Button onClick={reset} size="small" startIcon={<MdOutlineAutorenew size={14}/>} sx={{ color: C.muted, textTransform: 'none', '&:hover': { color: C.text } }}>Reintentar</Button>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

// ─── Cloze eval ───────────────────────────────────────────────
function ClozeEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const blanks: any[] = data.blanks ?? []
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})

  const check = () => {
    const r: Record<string, boolean> = {}
    let allOk = true
    blanks.forEach(b => {
      const ok = (answers[b.id] ?? '').trim().toLowerCase() === b.answer.toLowerCase()
      r[b.id] = ok
      if (!ok) allOk = false
    })
    setResults(r); setChecked(true)
    if (allOk) setTimeout(onComplete, 800)
  }

  const parts = (data.text ?? '').split('___')
  return (
    <Box>
      <Typography sx={{ fontSize: '0.88rem', lineHeight: 2.2, color: C.text, mb: 3 }}>
        {parts.map((part: string, i: number) => (
          <span key={i}>
            {part}
            {i < blanks.length && (
              <Box component="input"
                value={answers[blanks[i].id] ?? ''}
                onChange={e => !checked && setAnswers(p => ({ ...p, [blanks[i].id]: e.target.value }))}
                placeholder="___"
                sx={{
                  display: 'inline-block', width: 100, mx: 0.75,
                  border: 'none', borderBottom: `2px solid ${checked ? (results[blanks[i].id] ? C.green : C.red) : alpha(color, 0.6)}`,
                  bgcolor: 'transparent', textAlign: 'center', fontSize: '0.88rem', color: color,
                  outline: 'none', fontFamily: 'inherit', pb: 0.25,
                }}
              />
            )}
          </span>
        ))}
      </Typography>
      {!checked ? (
        <Button onClick={check} variant="contained" disabled={Object.keys(answers).length < blanks.length}
          sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.85) }, '&.Mui-disabled': { bgcolor: alpha(color, 0.25), color: 'rgba(255,255,255,0.3)' } }}>
          Verificar
        </Button>
      ) : (
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx={{ px: 2, py: 1.25, flex: 1, bgcolor: Object.values(results).every(Boolean) ? alpha(C.green, 0.08) : alpha(C.yellow, 0.08), border: `1px solid ${Object.values(results).every(Boolean) ? alpha(C.green, 0.3) : alpha(C.yellow, 0.3)}`, borderRadius: '10px' }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: Object.values(results).every(Boolean) ? C.green : C.yellow }}>
              {Object.values(results).every(Boolean) ? '✅ ¡Correcto!' : 'Algunas respuestas incorrectas — revisa e intenta'}
            </Typography>
          </Box>
          {!Object.values(results).every(Boolean) && (
            <Button onClick={() => { setAnswers({}); setChecked(false); setResults({}) }} size="small" startIcon={<MdOutlineAutorenew size={14}/>} sx={{ color: C.muted, textTransform: 'none', '&:hover': { color: C.text } }}>Reintentar</Button>
          )}
        </Box>
      )}
    </Box>
  )
}

// ─── Flashcard eval ───────────────────────────────────────────
function FlashcardEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const cards: any[] = data.cards ?? []
  const [idx, setIdx]       = useState(0)
  const [flipped, setFlip]  = useState(false)
  const [known, setKnown]   = useState<Set<string>>(new Set())
  const [unknown, setUnknown] = useState<Set<string>>(new Set())

  const card = cards[idx]
  const total = cards.length
  const done  = known.size + unknown.size

  const handleKnown = () => {
    setKnown(p => new Set([...p, card.id]))
    setFlip(false)
    if (idx < total - 1) setIdx(i => i+1)
    if (done + 1 === total && unknown.size === 0) setTimeout(onComplete, 600)
  }
  const handleUnknown = () => {
    setUnknown(p => new Set([...p, card.id]))
    setFlip(false)
    if (idx < total - 1) setIdx(i => i+1)
  }

  if (!card) return null
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: '0.78rem', color: C.muted }}>Tarjeta {idx+1} de {total}</Typography>
        <Typography sx={{ fontSize: '0.78rem', color: C.green }}>✅ {known.size} sabidas</Typography>
      </Box>
      <Box onClick={() => setFlip(f => !f)}
        sx={{ cursor: 'pointer', bgcolor: flipped ? alpha(color, 0.08) : C.card, border: `1px solid ${flipped ? alpha(color, 0.4) : C.border}`, borderRadius: '16px', p: 4, minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1.5, transition: 'all 0.25s ease', mb: 2 }}>
        <Typography sx={{ fontSize: '0.7rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{flipped ? 'Respuesta' : 'Pregunta — toca para revelar'}</Typography>
        <Typography sx={{ fontSize: flipped ? '1.2rem' : '0.95rem', fontWeight: flipped ? 700 : 400, color: flipped ? color : C.text, textAlign: 'center', lineHeight: 1.5 }}>
          {flipped ? card.back : card.front}
        </Typography>
      </Box>
      {flipped && (
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button fullWidth onClick={handleUnknown}
            sx={{ py: 1.25, border: `1px solid ${alpha(C.red, 0.4)}`, color: C.red, bgcolor: alpha(C.red, 0.06), fontWeight: 600, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(C.red, 0.12) } }}>
            No lo sabía
          </Button>
          <Button fullWidth onClick={handleKnown}
            sx={{ py: 1.25, border: `1px solid ${alpha(C.green, 0.4)}`, color: C.green, bgcolor: alpha(C.green, 0.06), fontWeight: 600, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(C.green, 0.12) } }}>
            Ya lo sabía
          </Button>
        </Box>
      )}
      {done === total && unknown.size === 0 && (
        <Box sx={{ mt: 2, p: 2, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.3)}`, borderRadius: '10px', textAlign: 'center' }}>
          <Typography sx={{ color: C.green, fontWeight: 700, fontSize: '0.88rem' }}>🎉 ¡Todas las tarjetas dominadas!</Typography>
        </Box>
      )}
      {done === total && unknown.size > 0 && (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ fontSize: '0.82rem', color: C.yellow }}>{unknown.size} tarjetas por repasar. ¿Reintentar?</Typography>
          <Button onClick={() => { setIdx(0); setFlip(false); setKnown(new Set()); setUnknown(new Set()) }} size="small" startIcon={<MdOutlineAutorenew size={14}/>} sx={{ color: C.muted, textTransform: 'none', alignSelf: 'flex-start', '&:hover': { color: C.text } }}>Reiniciar tarjetas</Button>
        </Box>
      )}
    </Box>
  )
}

// ─── Lab eval (Codewars style) ──────────────────────────────
function LabEval({ data, color, code, setCode, onComplete }: {
  data: any; color: string; code: string
  setCode: (c: string) => void; onComplete: (code: string) => void
}) {
  const [activeLeft, setActiveLeft] = useState<'instructions'|'output'>('instructions')
  const testCode = data.sampleTests ?? '// No hay tests de ejemplo disponibles'
  const [results,    setResults]    = useState<TestResult[]>([])
  const [logs,       setLogs]       = useState<string[]>([])
  const [running,    setRunning]    = useState(false)
  const [panelW,     setPanelW]     = useState(50)
  const [dragging,   setDragging]   = useState(false)
  const dragRef = useRef<{ startX: number; startW: number } | null>(null)
  const tests: any[] = data.tests ?? []

  const handleRun = async () => {
    setRunning(true)
    setActiveLeft('output')

    // Capture console.log output
    const captured: string[] = []
    const runCode = `
      var _logs = [];
      var _origLog = console.log;
      console.log = function() {
        var args = Array.prototype.slice.call(arguments);
        _logs.push(args.map(function(a){ return typeof a === 'object' ? JSON.stringify(a) : String(a) }).join(' '));
        _origLog.apply(console, args);
      };
      try { ${code} } catch(e) { _logs.push('Error: ' + e.message); }
      console.log = _origLog;
    `

    const res = await runTests(runCode + '' + code, tests)
    setResults(res)
    setRunning(false)
    if (res.every(r => r.passed)) onComplete(code)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { startX: e.clientX, startW: panelW }; setDragging(true)
  }
  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return
      const el = document.getElementById('lab-shell')
      if (!el) return
      const dx = e.clientX - dragRef.current.startX
      setPanelW(Math.min(65, Math.max(30, dragRef.current.startW + (dx / el.offsetWidth) * 100)))
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [dragging])

  const passed = results.filter(r => r.passed).length
  const allPassed = results.length > 0 && results.every(r => r.passed)

  return (
    <Box id="lab-shell" sx={{ display: 'flex', height: 420, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden', userSelect: dragging ? 'none' : 'auto', mt: 1 }}>

      {/* ── Panel izquierdo ── */}
      <Box sx={{ width: `${100-panelW}%`, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${C.border}`, minWidth: 0 }}>

        {/* Tabs */}
        <Box sx={{ display: 'flex', borderBottom: `1px solid ${C.border}`, flexShrink: 0, bgcolor: '#0d0f14' }}>
          {(['instructions','output'] as const).map(tab => (
            <Box key={tab} onClick={() => setActiveLeft(tab)}
              sx={{ px: 2, py: 1, fontSize: '0.72rem', fontWeight: 500, cursor: 'pointer',
                color: activeLeft === tab ? C.text : C.muted,
                borderBottom: `2px solid ${activeLeft === tab ? color : 'transparent'}`,
                textTransform: 'capitalize', letterSpacing: '0.02em',
              }}>
              {tab === 'instructions' ? 'Instrucciones' : `Output ${results.length > 0 ? `(${passed}/${results.length})` : ''}`}
            </Box>
          ))}
        </Box>

        {/* Instructions */}
        {activeLeft === 'instructions' && (
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2,
            fontSize: '0.82rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)',
            '& ol,& ul': { pl: 2.5 }, '& li': { mb: 0.5 },
            '& code': { bgcolor: 'rgba(255,255,255,0.08)', px: 0.6, borderRadius: '4px', fontFamily: '"Fira Code", monospace', fontSize: '0.78rem', color: '#79c0ff' },
            '& h2,& h3': { color: C.text, fontWeight: 600, mb: 0.75, mt: 1.5, fontSize: '0.88rem' },
          }} dangerouslySetInnerHTML={{ __html: data.instructions ?? '<p>Completa el código según las instrucciones.</p>' }}/>
        )}

        {/* Output */}
        {activeLeft === 'output' && (
          <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5, fontFamily: '"Fira Code", monospace', fontSize: '0.78rem' }}>
            {results.length === 0 && !running && (
              <Typography sx={{ color: C.muted, fontSize: '0.78rem', fontFamily: '"Fira Code", monospace' }}>
                Corre los tests para ver el output...
              </Typography>
            )}
            {running && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={12} sx={{ color: color }}/>
                <Typography sx={{ color: C.muted, fontSize: '0.78rem', fontFamily: '"Fira Code", monospace' }}>Corriendo tests...</Typography>
              </Box>
            )}
            {results.map((r, i) => (
              <Box key={r.id} sx={{ display: 'flex', gap: 1, mb: 0.75, alignItems: 'flex-start' }}>
                <Box sx={{ flexShrink: 0, mt: '1px' }}>
                  {r.passed
                    ? <FiCheck size={12} color={C.green}/>
                    : <FiX size={12} color={C.red}/>}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', color: r.passed ? C.green : C.red, lineHeight: 1.4 }}>
                    {r.description}
                  </Typography>
                  {r.error && (
                    <Typography sx={{ fontSize: '0.72rem', color: alpha(C.red, 0.75), mt: 0.25, fontFamily: '"Fira Code", monospace' }}>
                      {r.error}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
            {allPassed && (
              <Box sx={{ mt: 1.5, px: 1.5, py: 1, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.25)}`, borderRadius: '8px' }}>
                <Typography sx={{ fontSize: '0.78rem', color: C.green, fontWeight: 600 }}>🎉 ¡Todos los tests pasaron!</Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Run button */}
        <Box sx={{ px: 1.5, py: 1.25, borderTop: `1px solid ${C.border}`, display: 'flex', gap: 1, flexShrink: 0, bgcolor: '#0d0f14' }}>
          <Button size="small" variant="contained"
            startIcon={running ? <CircularProgress size={11} sx={{ color: '#fff' }}/> : <FiPlay size={11}/>}
            onClick={handleRun} disabled={running}
            sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '7px', fontSize: '0.75rem', py: 0.6,
              '&:hover': { bgcolor: alpha(color, 0.85) }, '&.Mui-disabled': { bgcolor: alpha(color, 0.3), color: '#fff' } }}>
            {running ? 'Corriendo...' : 'Correr tests'}
          </Button>
          <Button size="small" startIcon={<MdOutlineAutorenew size={12}/>}
            onClick={() => { setCode(data.starterCode ?? ''); setResults([]); setLogs([]) }}
            sx={{ color: C.muted, textTransform: 'none', fontSize: '0.75rem', '&:hover': { color: C.text } }}>
            Reiniciar
          </Button>
        </Box>
      </Box>

      {/* ── Drag handle ── */}
      <Box onMouseDown={onMouseDown}
        sx={{ width: 4, cursor: 'col-resize', flexShrink: 0, bgcolor: dragging ? color : 'transparent', '&:hover': { bgcolor: alpha(color, 0.4) }, transition: 'background 0.15s' }}/>

      {/* ── Panel derecho: solution editor + sample tests ── */}
      <Box sx={{ width: `${panelW}%`, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Solution editor */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', borderBottom: `1px solid ${C.border}`, minHeight: 0 }}>
          <Box sx={{ px: 2, py: 0.75, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, bgcolor: '#0d0f14' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {['#EF4444','#F59E0B','#22C55E'].map(c => <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c }}/>)}
            </Box>
            <Typography sx={{ fontSize: '0.7rem', color: C.muted, ml: 0.5, fontFamily: '"Fira Code", monospace' }}>solution.js</Typography>
          </Box>
          <Box sx={{ flex: 1, overflow: 'hidden', '& .cm-editor': { height: '100%' } }}>
            <CodeEditor code={code} onChange={setCode} lang="javascript"/>
          </Box>
        </Box>

        {/* Sample tests editor */}
        <Box sx={{ height: 140, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <Box sx={{ px: 2, py: 0.6, borderBottom: `1px solid ${C.border}`, flexShrink: 0, bgcolor: '#0d0f14' }}>
            <Typography sx={{ fontSize: '0.68rem', color: C.muted, fontFamily: '"Fira Code", monospace', letterSpacing: '0.04em' }}>
              SAMPLE TESTS
            </Typography>
          </Box>
          <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5,
            fontFamily: '"Fira Code", monospace', fontSize: '0.72rem',
            lineHeight: 1.7, color: 'rgba(255,255,255,0.35)',
            whiteSpace: 'pre', userSelect: 'none', pointerEvents: 'none',
          }}>
            {testCode}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// ─── Drag & Drop eval ─────────────────────────────────────────
function DragDropEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const pairs: any[] = data.pairs ?? []
  const [checked, setChecked] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [matches, setMatches]   = useState<Record<string, string>>({})

  const lefts  = pairs.map((p: any) => p.left)
  const rights = [...new Set(pairs.map((p: any) => p.right))]

  const handleLeft = (id: string) => { if (checked) return; setSelected(id) }
  const handleRight = (right: string) => {
    if (!selected || checked) return
    setMatches(p => ({ ...p, [selected]: right }))
    setSelected(null)
  }

  const check = () => {
    const allOk = pairs.every((p: any) => matches[p.id] === p.right)
    setChecked(true)
    if (allOk) setTimeout(onComplete, 800)
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '0.82rem', color: C.muted, mb: 2 }}>{data.instruction ?? 'Asocia los elementos'}</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Typography sx={{ fontSize: '0.7rem', color: C.muted, mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Elementos</Typography>
          {pairs.map((p: any) => {
            const matched = matches[p.id]
            const ok = checked && matched === p.right
            const bad = checked && matched && matched !== p.right
            return (
              <Box key={p.id} onClick={() => handleLeft(p.id)}
                sx={{ px: 1.5, py: 1, borderRadius: '9px', cursor: checked ? 'default' : 'pointer', fontSize: '0.82rem', transition: 'all 0.15s',
                  border: `1px solid ${ok ? alpha(C.green, 0.5) : bad ? alpha(C.red, 0.5) : selected === p.id ? alpha(color, 0.6) : C.border}`,
                  bgcolor: ok ? alpha(C.green, 0.07) : bad ? alpha(C.red, 0.07) : selected === p.id ? alpha(color, 0.08) : 'transparent',
                  color: ok ? C.green : bad ? C.red : C.text }}>
                {p.left} {matched && <Box component="span" sx={{ color: C.muted, fontSize: '0.72rem' }}>→ {matched}</Box>}
              </Box>
            )
          })}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Typography sx={{ fontSize: '0.7rem', color: C.muted, mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Destinos</Typography>
          {(rights as string[]).map((r, ri) => (
            <Box key={ri} onClick={() => handleRight(r)}
              sx={{ px: 1.5, py: 1, borderRadius: '9px', cursor: selected && !checked ? 'pointer' : 'default', fontSize: '0.82rem', border: `1px solid ${C.border}`, color: C.muted, transition: 'all 0.15s', '&:hover': selected && !checked ? { borderColor: alpha(color, 0.5), color: color } : {} }}>
              {r}
            </Box>
          ))}
        </Box>
      </Box>
      {!checked ? (
        <Button onClick={check} disabled={Object.keys(matches).length < pairs.length} variant="contained"
          sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.85) }, '&.Mui-disabled': { bgcolor: alpha(color, 0.25), color: 'rgba(255,255,255,0.3)' } }}>
          Verificar
        </Button>
      ) : (
        <Box sx={{ px: 2, py: 1.25, bgcolor: pairs.every((p: any) => matches[p.id] === p.right) ? alpha(C.green, 0.08) : alpha(C.yellow, 0.08), border: `1px solid ${pairs.every((p: any) => matches[p.id] === p.right) ? alpha(C.green, 0.3) : alpha(C.yellow, 0.3)}`, borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: pairs.every((p: any) => matches[p.id] === p.right) ? C.green : C.yellow }}>
            {pairs.every((p: any) => matches[p.id] === p.right) ? '✅ ¡Todas correctas!' : 'Algunas incorrectas — revisa las marcadas en rojo'}
          </Typography>
        </Box>
      )}
    </Box>
  )
}


// ─── Timeline eval ───────────────────────────────────────────
function TimelineEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const events: any[] = data.events ?? []
  const correct: string[] = data.correct_order ?? []
  const [order, setOrder] = useState<string[]>(events.map((e: any) => e.id))
  const [checked, setChecked] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const moveUp   = (i: number) => { if (i === 0 || checked) return; const o = [...order]; [o[i-1],o[i]] = [o[i],o[i-1]]; setOrder(o) }
  const moveDown = (i: number) => { if (i === order.length-1 || checked) return; const o = [...order]; [o[i],o[i+1]] = [o[i+1],o[i]]; setOrder(o) }

  const check = () => {
    setChecked(true)
    if (JSON.stringify(order) === JSON.stringify(correct)) setTimeout(onComplete, 800)
  }

  const getEvent = (id: string) => events.find((e: any) => e.id === id)

  return (
    <Box>
      <Typography sx={{ fontSize: '0.82rem', color: C.muted, mb: 2 }}>{data.instruction ?? 'Ordena los eventos cronológicamente'}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 2 }}>
        {order.map((id, i) => {
          const ev = getEvent(id)
          const isCorrect = checked && correct[i] === id
          const isWrong   = checked && correct[i] !== id
          return (
            <Box key={id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.25, borderRadius: '10px', border: `1px solid ${isCorrect ? alpha(C.green, 0.5) : isWrong ? alpha(C.red, 0.5) : C.border}`, bgcolor: isCorrect ? alpha(C.green, 0.06) : isWrong ? alpha(C.red, 0.06) : 'rgba(255,255,255,0.02)' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                <Box onClick={() => moveUp(i)} sx={{ cursor: i === 0 || checked ? 'default' : 'pointer', opacity: i === 0 || checked ? 0.2 : 0.6, fontSize: '0.7rem', lineHeight: 1, '&:hover': { opacity: 1 } }}>▲</Box>
                <Box onClick={() => moveDown(i)} sx={{ cursor: i === order.length-1 || checked ? 'default' : 'pointer', opacity: i === order.length-1 || checked ? 0.2 : 0.6, fontSize: '0.7rem', lineHeight: 1, '&:hover': { opacity: 1 } }}>▼</Box>
              </Box>
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: alpha(color, 0.15), border: `1px solid ${alpha(color, 0.3)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: color }}>{i+1}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.85rem', color: isCorrect ? C.green : isWrong ? C.red : C.text }}>{ev?.label}</Typography>
                {ev?.year && <Typography sx={{ fontSize: '0.72rem', color: C.muted }}>{ev.year}</Typography>}
              </Box>
              {isCorrect && <FiCheck size={14} color={C.green}/>}
              {isWrong   && <FiX size={14} color={C.red}/>}
            </Box>
          )
        })}
      </Box>
      {!checked ? (
        <Button onClick={check} variant="contained"
          sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.85) } }}>
          Verificar orden
        </Button>
      ) : (
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx={{ px: 2, py: 1.25, flex: 1, bgcolor: JSON.stringify(order) === JSON.stringify(correct) ? alpha(C.green, 0.08) : alpha(C.yellow, 0.08), border: `1px solid ${JSON.stringify(order) === JSON.stringify(correct) ? alpha(C.green, 0.3) : alpha(C.yellow, 0.3)}`, borderRadius: '10px' }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: JSON.stringify(order) === JSON.stringify(correct) ? C.green : C.yellow }}>
              {JSON.stringify(order) === JSON.stringify(correct) ? '✅ ¡Orden correcto!' : 'Orden incorrecto — intenta de nuevo'}
            </Typography>
          </Box>
          {JSON.stringify(order) !== JSON.stringify(correct) && (
            <Button onClick={() => { setOrder(events.map((e:any) => e.id)); setChecked(false) }} size="small" startIcon={<MdOutlineAutorenew size={14}/>} sx={{ color: C.muted, textTransform: 'none', '&:hover': { color: C.text } }}>Reintentar</Button>
          )}
        </Box>
      )}
    </Box>
  )
}

// ─── Decision eval ───────────────────────────────────────────
function DecisionEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const options: any[] = data.options ?? []
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (id: string) => {
    if (revealed) return
    setSelected(id)
    setRevealed(true)
    const opt = options.find((o:any) => o.id === id)
    if (opt?.correct) setTimeout(onComplete, 1200)
  }

  return (
    <Box>
      <Box sx={{ px: 2.5, py: 2, bgcolor: alpha(color, 0.06), border: `1px solid ${alpha(color, 0.2)}`, borderRadius: '12px', mb: 3 }}>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: C.text, lineHeight: 1.6 }}>
          📋 {data.scenario}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {options.map((opt: any) => {
          const isSel = selected === opt.id
          const isCorrect = revealed && opt.correct
          const isWrong   = revealed && isSel && !opt.correct
          return (
            <Box key={opt.id} onClick={() => handleSelect(opt.id)}
              sx={{ px: 2, py: 1.5, borderRadius: '10px', cursor: revealed ? 'default' : 'pointer', transition: 'all 0.2s',
                border: `1px solid ${isCorrect ? alpha(C.green, 0.5) : isWrong ? alpha(C.red, 0.5) : isSel ? alpha(color, 0.5) : C.border}`,
                bgcolor: isCorrect ? alpha(C.green, 0.06) : isWrong ? alpha(C.red, 0.06) : isSel ? alpha(color, 0.06) : 'transparent',
                '&:hover': { bgcolor: revealed ? undefined : 'rgba(255,255,255,0.04)' } }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: isCorrect ? C.green : isWrong ? C.red : C.text, mb: revealed && isSel ? 0.5 : 0 }}>
                {opt.label}
              </Typography>
              {revealed && isSel && opt.outcome && (
                <Typography sx={{ fontSize: '0.78rem', color: opt.correct ? C.green : alpha(C.red, 0.8), lineHeight: 1.5 }}>
                  {opt.outcome}
                </Typography>
              )}
              {revealed && isCorrect && !isSel && (
                <Typography sx={{ fontSize: '0.75rem', color: C.green, mt: 0.25 }}>✅ Esta era la mejor opción</Typography>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

// ─── Survey eval ─────────────────────────────────────────────
function SurveyEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const questions: any[] = data.questions ?? []
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== '')

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(onComplete, 600)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {questions.map((q: any) => (
        <Box key={q.id}>
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: C.text, mb: 1.5, lineHeight: 1.6 }}>{q.q}</Typography>
          {q.type === 'scale' ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[1,2,3,4,5].map(n => (
                <Box key={n} onClick={() => !submitted && setAnswers(p => ({ ...p, [q.id]: n }))}
                  sx={{ width: 40, height: 40, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: submitted ? 'default' : 'pointer',
                    border: `1px solid ${answers[q.id] === n ? alpha(color, 0.6) : C.border}`,
                    bgcolor: answers[q.id] === n ? alpha(color, 0.12) : 'transparent',
                    color: answers[q.id] === n ? color : C.muted,
                    fontWeight: answers[q.id] === n ? 700 : 400, fontSize: '0.88rem',
                    transition: 'all 0.15s', '&:hover': { bgcolor: submitted ? undefined : 'rgba(255,255,255,0.04)' } }}>
                  {n}
                </Box>
              ))}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1 }}>
                <Typography sx={{ fontSize: '0.7rem', color: C.muted }}>Difícil</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: C.muted }}>→</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: C.muted }}>Fácil</Typography>
              </Box>
            </Box>
          ) : (
            <Box component="textarea" rows={3}
              value={answers[q.id] as string ?? ''}
              onChange={(e: any) => !submitted && setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
              placeholder="Escribe tu reflexión aquí..."
              sx={{ width: '100%', p: 1.5, bgcolor: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRadius: '10px', color: C.text, fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none', resize: 'none', '&:focus': { borderColor: alpha(color, 0.5) } }}
            />
          )}
        </Box>
      ))}
      {!submitted ? (
        <Button onClick={handleSubmit} disabled={!allAnswered} variant="contained"
          sx={{ alignSelf: 'flex-start', bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.85) }, '&.Mui-disabled': { bgcolor: alpha(color, 0.25), color: 'rgba(255,255,255,0.3)' } }}>
          Enviar reflexión
        </Button>
      ) : (
        <Box sx={{ px: 2, py: 1.5, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.3)}`, borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: C.green }}>✅ ¡Gracias por tu reflexión!</Typography>
        </Box>
      )}
    </Box>
  )
}

// ─── Challenge eval ───────────────────────────────────────────
function ChallengeEval({ data, color, code, setCode, onComplete }: { data: any; color: string; code: string; setCode: (c: string) => void; onComplete: (code: string) => void }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <Box>
      {data.description && (
        <Box sx={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', mb: 2,
          '& p': { mb: 1.5 }, '& ol,& ul': { pl: 2.5 }, '& li': { mb: 0.5 },
          '& code': { bgcolor: 'rgba(255,255,255,0.08)', px: 0.6, borderRadius: '4px', fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#79c0ff' },
        }} dangerouslySetInnerHTML={{ __html: data.description }}/>
      )}
      <Box sx={{ border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden', height: 280, mb: 2 }}>
        <Box sx={{ px: 2, py: 0.75, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#0d0f14' }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {['#EF4444','#F59E0B','#22C55E'].map(c => <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c }}/>)}
          </Box>
          <Typography sx={{ fontSize: '0.7rem', color: C.muted, ml: 0.5, fontFamily: '"Fira Code", monospace' }}>solution.js</Typography>
        </Box>
        <Box sx={{ height: 'calc(100% - 32px)', '& .cm-editor': { height: '100%' } }}>
          <CodeEditor code={code} onChange={setCode} lang="javascript"/>
        </Box>
      </Box>
      {!submitted ? (
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Button onClick={() => { setSubmitted(true); onComplete(code) }} variant="contained" disabled={!code.trim() || code === data.starterCode}
            sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.85) }, '&.Mui-disabled': { bgcolor: alpha(color, 0.25), color: 'rgba(255,255,255,0.3)' } }}>
            Entregar reto
          </Button>
          <Typography sx={{ fontSize: '0.75rem', color: C.muted }}>No hay tests automáticos — tú decides si tu solución es correcta</Typography>
        </Box>
      ) : (
        <Box sx={{ px: 2, py: 1.5, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.3)}`, borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: C.green }}>🚀 ¡Reto entregado!</Typography>
        </Box>
      )}
    </Box>
  )
}

// ─── Mindmap eval ─────────────────────────────────────────────
function MindmapEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const nodes: any[] = data.nodes ?? []
  const [connected, setConnected] = useState<Set<string>>(new Set())
  const [selected, setSelected]   = useState<string | null>(null)
  const [done, setDone]           = useState(false)

  const allConnected = nodes.every((n: any) => connected.has(n.id))

  const handleNode = (id: string) => {
    if (done) return
    if (selected === id) { setSelected(null); return }
    if (selected) {
      setConnected(p => new Set([...p, selected, id]))
      setSelected(null)
      if (allConnected) { setDone(true); setTimeout(onComplete, 800) }
    } else {
      setSelected(id)
    }
  }

  useEffect(() => {
    if (connected.size > 0 && nodes.every((n:any) => connected.has(n.id))) {
      setDone(true)
      setTimeout(onComplete, 800)
    }
  }, [connected])

  return (
    <Box>
      <Typography sx={{ fontSize: '0.82rem', color: C.muted, mb: 2 }}>
        Conecta los nodos al tema central haciendo click en dos nodos seguidos
      </Typography>
      {/* Central */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box sx={{ px: 3, py: 1.5, bgcolor: alpha(color, 0.15), border: `2px solid ${color}`, borderRadius: '100px' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: color }}>{data.central}</Typography>
        </Box>
      </Box>
      {/* Nodes grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', mb: 2 }}>
        {nodes.map((n: any) => {
          const isConn = connected.has(n.id)
          const isSel  = selected === n.id
          return (
            <Box key={n.id} onClick={() => handleNode(n.id)}
              sx={{ px: 2, py: 1, borderRadius: '10px', cursor: done ? 'default' : 'pointer', transition: 'all 0.15s',
                border: `1px solid ${isConn ? alpha(C.green, 0.5) : isSel ? alpha(color, 0.7) : C.border}`,
                bgcolor: isConn ? alpha(C.green, 0.08) : isSel ? alpha(color, 0.1) : 'transparent',
                color: isConn ? C.green : isSel ? color : C.text }}>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: isSel ? 700 : 400 }}>{n.label}</Typography>
            </Box>
          )
        })}
      </Box>
      {done && (
        <Box sx={{ px: 2, py: 1.5, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.3)}`, borderRadius: '10px', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: C.green }}>🗺️ ¡Mapa mental completado!</Typography>
        </Box>
      )}
    </Box>
  )
}

// ─── Replit eval ──────────────────────────────────────────────
function ReplitEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <Box>
      {data.description && (
        <Box sx={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', mb: 2,
          '& p': { mb: 1.5 }, '& ol,& ul': { pl: 2.5 }, '& li': { mb: 0.5 },
          '& code': { bgcolor: 'rgba(255,255,255,0.08)', px: 0.6, borderRadius: '4px', fontFamily: 'Fira Code, monospace', color: '#79c0ff' },
        }} dangerouslySetInnerHTML={{ __html: data.description }}/>
      )}
      {data.replitUrl && (
        <Box sx={{ border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden', mb: 2 }}>
          <Box sx={{ px: 2, py: 1, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#0d0f14' }}>
            <Typography sx={{ fontSize: '0.72rem', color: C.muted, fontFamily: '"Fira Code", monospace' }}>Replit Embed</Typography>
            <Button component="a" href={data.replitUrl} target="_blank" size="small"
              sx={{ fontSize: '0.7rem', color: color, textTransform: 'none', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
              Abrir en Replit ↗
            </Button>
          </Box>
          <Box component="iframe" src={data.replitUrl + '?embed=true'} sx={{ width: '100%', height: 320, border: 'none', display: 'block' }}/>
        </Box>
      )}
      {!data.replitUrl && (
        <Button component="a" href={data.replitUrl ?? data.repoUrl} target="_blank" variant="outlined"
          sx={{ mb: 2, borderColor: alpha(color, 0.4), color: color, textTransform: 'none', fontWeight: 600, borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.08) } }}>
          Abrir entorno externo ↗
        </Button>
      )}
      {!confirmed ? (
        <Button onClick={() => { setConfirmed(true); onComplete() }} variant="contained"
          sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.85) } }}>
          ✅ Completé el proyecto
        </Button>
      ) : (
        <Box sx={{ px: 2, py: 1.5, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.3)}`, borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: C.green }}>🎉 ¡Proyecto completado!</Typography>
        </Box>
      )}
    </Box>
  )
}

// ─── GitHub eval ──────────────────────────────────────────────
function GithubEval({ data, color, onComplete }: { data: any; color: string; onComplete: () => void }) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <Box>
      {data.description && (
        <Box sx={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', mb: 2,
          '& p': { mb: 1.5 }, '& ol,& ul': { pl: 2.5 }, '& li': { mb: 0.5 },
          '& code': { bgcolor: 'rgba(255,255,255,0.08)', px: 0.6, borderRadius: '4px', fontFamily: 'Fira Code, monospace', color: '#79c0ff' },
        }} dangerouslySetInnerHTML={{ __html: data.description }}/>
      )}
      {data.instructions && (
        <Box sx={{ fontSize: '0.82rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', mb: 2,
          '& ol': { pl: 2.5 }, '& li': { mb: 0.5 },
        }} dangerouslySetInnerHTML={{ __html: data.instructions }}/>
      )}
      <Button component="a" href={data.repoUrl} target="_blank" variant="outlined"
        sx={{ mb: 2, mr: 1, borderColor: 'rgba(255,255,255,0.2)', color: C.text, textTransform: 'none', fontWeight: 600, borderRadius: '10px', '&:hover': { borderColor: color, color: color } }}>
        🔗 Ir al repositorio
      </Button>
      {!confirmed ? (
        <Button onClick={() => { setConfirmed(true); onComplete() }} variant="contained"
          sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '10px', '&:hover': { bgcolor: alpha(color, 0.85) } }}>
          ✅ Completé el ejercicio
        </Button>
      ) : (
        <Box sx={{ px: 2, py: 1.5, bgcolor: alpha(C.green, 0.08), border: `1px solid ${alpha(C.green, 0.3)}`, borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: C.green }}>✅ ¡Repositorio completado!</Typography>
        </Box>
      )}
    </Box>
  )
}

// ─── Main player ──────────────────────────────────────────────
export function SubseccionPlayer({
  course, block, topic, lesson, subsection, prev, next,
  userId, savedCode, completed: initCompleted, totalSubs, completedSubs,
}: Props) {
  const router  = useRouter()
  const color   = course.color
  const evalType = subsection.evalType as EvalType
  const isLab   = evalType === 'lab'

  const [step,       setStep]      = useState<Step>('theory')
  const [theoryDone, setTheoryDone] = useState(initCompleted)
  const [completed,  setCompleted] = useState(initCompleted)
  const [code,       setCode]      = useState(savedCode ?? subsection.evalData?.starterCode ?? '')
  const [saving,     setSaving]    = useState(false)
  const [showHint,   setShowHint]  = useState(false)
  const [localDone,  setLocalDone] = useState(completedSubs)
  const [alertPct,   setAlertPct]  = useState(0)
  const [showAlert,  setShowAlert] = useState(false)
  const [notas, setNotas] = useState<string>('')
const [notasSaved, setNotasSaved] = useState(false)
const [iaMessages, setIaMessages] = useState<{role:'user'|'assistant', content:string}[]>([])
const [iaInput, setIaInput] = useState('')
const [iaLoading, setIaLoading] = useState(false)

  const pct = totalSubs > 0 ? Math.round((localDone / totalSubs) * 100) : 0

  // ── Time tracking ──
  const startTime = useRef<number>(Date.now())
  useEffect(() => {
    startTime.current = Date.now()
    return () => {
      const secs = Math.round((Date.now() - startTime.current) / 1000)
      if (secs > 5) {
        fetch('/api/universidad/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subsectionId: subsection.id, courseId: subsection.courseId, timeSpentSeconds: secs }),
        }).catch(() => {})
      }
    }
  }, [subsection.id])

  const saveProgress = useCallback(async (isCompleted: boolean, codeToSave?: string) => {
    setSaving(true)
    try {
      await fetch('/api/universidad/progress', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subsectionId: subsection.id, courseId: subsection.courseId, completed: isCompleted, code: codeToSave ?? code }),
      })
      if (isCompleted && !completed) {
        setCompleted(true)
        const newDone = Math.min(completedSubs + 1, totalSubs)
        setLocalDone(newDone)
        setAlertPct(totalSubs > 0 ? Math.round((newDone / totalSubs) * 100) : 0)
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 4500)
        router.refresh()
      }
    } finally { setSaving(false) }
  }, [code, subsection.id, subsection.courseId, completed, completedSubs, totalSubs, router])

  const handleTheoryDone = () => {
    setTheoryDone(true)
    setStep('exercise')
  }

  const goNext = () => {
    if (next) router.push(`/universidad/${course.slug}/${next.id}`)
    else router.push(`/universidad/${course.slug}`)
  }

  return (
    <Box sx={{ bgcolor: C.bg, height: '100vh', display: 'flex', flexDirection: 'column', color: C.text, overflow: 'hidden' }}>

      {/* ── Alerta de progreso ── */}
      <AnimatePresence>
        {showAlert && (
          <Box component={motion.div}
            initial={{ opacity: 0, y: -80 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            sx={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, width: { xs: 'calc(100vw - 32px)', sm: 420 }, bgcolor: '#13161D', border: `1px solid ${alpha(color, 0.4)}`, borderRadius: '16px', boxShadow: `0 8px 32px rgba(0,0,0,0.5)`, overflow: 'hidden' }}>
            <Box sx={{ height: 3, bgcolor: 'rgba(255,255,255,0.05)' }}>
              <Box component={motion.div} initial={{ width: 0 }} animate={{ width: `${alertPct}%` }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} sx={{ height: '100%', bgcolor: color, borderRadius: 2 }}/>
            </Box>
            <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: alpha(color, 0.15), border: `1px solid ${alpha(color, 0.3)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                {alertPct === 100 ? '🎓' : '✅'}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff', mb: 0.25 }}>{alertPct === 100 ? '¡Curso completado!' : '¡Subsección completada!'}</Typography>
                <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>{alertPct === 100 ? '¡Obtuviste tu certificado!' : `${alertPct}% del curso completado`}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: color, lineHeight: 1 }}>{alertPct}%</Typography>
                <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', mt: 0.25 }}>completado</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>

      {/* ── Top bar ── */}
      <Box sx={{
        borderBottom: `1px solid ${C.border}`,
        px: 2.5, display: 'flex', alignItems: 'center', gap: 2,
        flexShrink: 0, minHeight: 52,
        bgcolor: 'rgba(6,8,16,0.85)', backdropFilter: 'blur(12px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Progress glow bar at very bottom */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, height: 2, bgcolor: 'rgba(255,255,255,0.04)', width: '100%' }}>
          <Box component={motion.div} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
            sx={{ height: '100%', bgcolor: color, boxShadow: `0 0 8px ${color}` }}/>
        </Box>

        {/* Back button */}
        <Box component={Link} href={`/universidad/${course.slug}`}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.75, textDecoration: 'none', flexShrink: 0,
            px: 1.25, py: 0.6, borderRadius: '8px',
            border: `1px solid rgba(255,255,255,0.07)`,
            bgcolor: 'rgba(255,255,255,0.03)',
            color: C.muted, transition: 'all 0.15s',
            '&:hover': { color: C.text, bgcolor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)' },
          }}>
          <FiArrowLeft size={12}/>
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 500, lineHeight: 1 }}>{course.title?.es}</Typography>
        </Box>

        {/* Divider */}
        <Box sx={{ width: 1, height: 16, bgcolor: C.border, flexShrink: 0 }}/>

        {/* Breadcrumb */}
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 0.5, overflow: 'hidden' }}>
          {[block?.title?.es, topic?.title?.es, lesson?.title?.es].filter(Boolean).map((crumb, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: i < 2 ? 1 : 0, minWidth: 0, overflow: 'hidden' }}>
              {i > 0 && <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.18)', flexShrink: 0 }}>›</Typography>}
              <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{crumb}</Typography>
            </Box>
          ))}
          {lesson?.title?.es && <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.18)', flexShrink: 0 }}>›</Typography>}
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 0, maxWidth: { xs: 120, md: 260 } }}>
            {subsection.title?.es}
          </Typography>
        </Box>

        {/* Right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>

          {/* Progress pill */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, px: 1.5, py: 0.5,
            bgcolor: pct > 0 ? alpha(color, 0.08) : 'rgba(255,255,255,0.03)',
            border: `1px solid ${pct > 0 ? alpha(color, 0.25) : 'rgba(255,255,255,0.07)'}`,
            borderRadius: '100px', transition: 'all 0.3s' }}>
            <Box sx={{ width: 48, height: 3, bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
              <Box component={motion.div} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }}
                sx={{ height: '100%', bgcolor: color, boxShadow: `0 0 6px ${color}` }}/>
            </Box>
            <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: pct > 0 ? color : C.muted }}>{pct}%</Typography>
          </Box>

          {/* Completed badge */}
          {completed && (
            <Box component={motion.div} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.4,
                bgcolor: alpha(C.green, 0.1), border: `1px solid ${alpha(C.green, 0.3)}`,
                borderRadius: '100px', boxShadow: `0 0 10px ${alpha(C.green, 0.2)}` }}>
              <FiCheck size={10} color={C.green}/>
              <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: C.green, letterSpacing: '0.05em' }}>COMPLETADA</Typography>
            </Box>
          )}

          {/* Saving spinner */}
          {saving && <CircularProgress size={12} sx={{ color: alpha(color, 0.6), flexShrink: 0 }}/>}

          {/* Prev / Next */}
          <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
            <Box onClick={() => prev && router.push(`/universidad/${course.slug}/${prev.id}`)}
              sx={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', cursor: prev ? 'pointer' : 'default', opacity: prev ? 1 : 0.2, border: `1px solid ${prev ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`, bgcolor: 'rgba(255,255,255,0.03)', color: C.muted, transition: 'all 0.15s', '&:hover': prev ? { bgcolor: 'rgba(255,255,255,0.08)', color: C.text, borderColor: 'rgba(255,255,255,0.2)' } : {} }}>
              <FiChevronLeft size={14}/>
            </Box>
            <Box onClick={() => next && router.push(`/universidad/${course.slug}/${next.id}`)}
              sx={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', cursor: next ? 'pointer' : 'default', opacity: next ? 1 : 0.2, border: `1px solid ${next ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`, bgcolor: 'rgba(255,255,255,0.03)', color: C.muted, transition: 'all 0.15s', '&:hover': next ? { bgcolor: alpha(color, 0.1), color: color, borderColor: alpha(color, 0.3) } : {} }}>
              <FiChevronRight size={14}/>
            </Box>
          </Box>
        </Box>
      </Box>


      {/* ── Tabs ── */}
      <Box sx={{
        display: 'flex', alignItems: 'center',
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
        bgcolor: 'rgba(6,8,16,0.6)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}>
        {([
          { id: 'theory',   label: 'Teoría',                    icon: '📖', c: color,      locked: false,        done: theoryDone },
          { id: 'exercise', label: isLab ? 'Lab' : 'Ejercicio', icon: isLab ? '💻' : '✏️', c: color, locked: !theoryDone, done: completed },
          { id: 'video',    label: 'Video',    icon: '🎬', c: '#EF4444', locked: false, done: false },
          { id: 'pdf',      label: 'PDF',      icon: '📄', c: '#EC4899', locked: false, done: false },
          { id: 'recursos', label: 'Recursos', icon: '🔗', c: '#00AEEF', locked: false, done: false },
          { id: 'errores',  label: 'Errores',  icon: '⚠️', c: '#F59E0B', locked: false, done: false },
          { id: 'reto',     label: 'Reto +',   icon: '🎯', c: '#22C55E', locked: false, done: false },
          { id: 'notas',    label: 'Notas',    icon: '📝', c: '#A855F7', locked: false, done: false },
          { id: 'ia',       label: 'Tutor IA', icon: '🤖', c: '#6366F1', locked: false, done: false },
        ] as const).map((tab: any) => {
          const active = step === tab.id
          return (
            <Box key={tab.id}
              onClick={() => !tab.locked && setStep(tab.id as any)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                px: 2, py: 1.25, flexShrink: 0,
                cursor: tab.locked ? 'not-allowed' : 'pointer',
                borderBottom: `2px solid ${active ? tab.c : 'transparent'}`,
                color: active ? tab.c : 'rgba(255,255,255,0.3)',
                opacity: tab.locked ? 0.35 : 1,
                transition: 'all 0.15s',
                position: 'relative',
                '&:hover': tab.locked ? {} : {
                  color: active ? tab.c : 'rgba(255,255,255,0.6)',
                  bgcolor: alpha(tab.c, 0.04),
                },
              }}>
              <Typography sx={{ fontSize: '0.88rem', lineHeight: 1 }}>{tab.icon}</Typography>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: active ? 700 : 400, whiteSpace: 'nowrap' }}>
                {tab.label}
              </Typography>
              {tab.done && (
                <Box sx={{
                  width: 12, height: 12, borderRadius: '50%',
                  bgcolor: alpha('#22C55E', 0.15),
                  border: '1px solid rgba(34,197,94,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FiCheck size={7} color="#22C55E"/>
                </Box>
              )}
              {tab.locked && (
                <Typography sx={{ fontSize: '0.6rem', opacity: 0.5 }}>🔒</Typography>
              )}
            </Box>
          )
        })}

        {/* Pista — siempre al final */}
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', pr: 1.5, flexShrink: 0 }}>
          <Box onClick={() => setShowHint(h => !h)}
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.75,
              px: 1.5, py: 0.6, borderRadius: '8px', cursor: 'pointer',
              border: `1px solid ${showHint ? alpha(color, 0.4) : 'rgba(255,255,255,0.07)'}`,
              bgcolor: showHint ? alpha(color, 0.08) : 'transparent',
              color: showHint ? color : C.muted, transition: 'all 0.15s',
              '&:hover': { borderColor: alpha(color, 0.4), color },
            }}>
            <FiHelpCircle size={12}/>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: showHint ? 600 : 400 }}>
              {showHint ? 'Ocultar' : 'Pista'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Hint ── */}
      <AnimatePresence>
        {showHint && subsection.hint?.es && (
          <Box component={motion.div} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            sx={{ bgcolor: alpha(C.yellow, 0.08), borderBottom: `1px solid ${alpha(C.yellow, 0.2)}`, px: 3, py: 1.5, flexShrink: 0, overflow: 'hidden' }}>
            <Typography sx={{ fontSize: '0.82rem', color: C.yellow, lineHeight: 1.6 }}>
              💡 {subsection.hint.es}
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      {/* ── Content ── */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 3, scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>

        {/* Theory */}
        {step === 'theory' && (
          <>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.15rem', mb: 0.5 }}>{subsection.title?.es}</Typography>
            {subsection.theory?.es ? (
              <Box sx={{ mt: 2, fontSize: '0.88rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.82)',
                '& h2': { fontSize: '1rem', fontWeight: 700, color: C.text, mt: 3, mb: 1, borderBottom: `1px solid ${C.border}`, pb: 0.5 },
                '& h3': { fontSize: '0.9rem', fontWeight: 700, color: C.text, mt: 2.5, mb: 0.75 },
                '& p':  { mb: 1.5 },
                '& code': { bgcolor: 'rgba(255,255,255,0.08)', px: 0.75, py: 0.2, borderRadius: '4px', fontFamily: '"Fira Code", monospace', fontSize: '0.82rem', color: '#79c0ff' },
                '& pre': { bgcolor: '#161b22', border: `1px solid ${C.border}`, borderRadius: '10px', p: 2, overflow: 'auto', mb: 2, mt: 1, '& code': { bgcolor: 'transparent', p: 0, color: '#e6edf3' } },
                '& ul,& ol': { pl: 2.5, mb: 1.5 }, '& li': { mb: 0.5 },
                '& strong': { color: C.text, fontWeight: 700 },
                '& blockquote': { borderLeft: `3px solid ${color}`, pl: 2, color: C.muted, fontStyle: 'italic', my: 2, mx: 0 },
                '& table': { width: '100%', borderCollapse: 'collapse', mb: 2 },
                '& th,& td': { padding: '8px', borderBottom: `1px solid ${C.border}`, fontSize: '0.85rem' },
                '& th': { color: C.text, fontWeight: 600 }, '& td': { color: C.muted },
              }} dangerouslySetInnerHTML={{ __html: subsection.theory.es }}/>
            ) : (
              <Typography sx={{ color: C.muted, mt: 2, fontSize: '0.88rem' }}>Lee el contenido y pasa al ejercicio.</Typography>
            )}
          </>
        )} {step === 'video'    && <VideoTab   data={subsection.evalData} color={color}/>}
        {step === 'recursos' && <RecursosTab data={subsection.evalData} color={color}/>}
        {step === 'errores'  && <ErroresTab  data={subsection.evalData} color={color}/>}
        {step === 'reto'     && <RetoTab     data={subsection.evalData} color={color} subsectionId={subsection.id} userId={userId}/>}
        {step === 'notas'    && <NotasTab    subsectionId={subsection.id} userId={userId} color={color}/>}
        {step === 'ia'       && <TutorIA     subsection={subsection} color={color} userId={userId}/>}
        {step === 'pdf'      && <PDFTab      data={subsection.evalData} color={color}/>}

        {/* Exercise */}
        {step === 'exercise' && (
          <Box>
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
              {{'lab':'Lab','challenge':'Reto abierto','flashcard':'Flashcards','cloze':'Completa los huecos','drag_drop':'Arrastra y suelta','timeline':'Línea de tiempo','decision':'Escenario','survey':'Reflexión','mindmap':'Mapa mental','replit':'Proyecto Replit','github':'Repositorio GitHub','quiz':'Quiz'}[evalType] ?? 'Ejercicio'}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: C.muted, mb: 3 }}>
              {evalType === 'quiz' ? 'Responde correctamente para completar.' : evalType === 'lab' ? 'Escribe el código y corre los tests.' : evalType === 'flashcard' ? 'Repasa las tarjetas hasta dominarlas.' : 'Completa el ejercicio para continuar.'}
            </Typography>

            {evalType === 'quiz'     && <QuizEval      data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'cloze'    && <ClozeEval     data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'flashcard'&& <FlashcardEval data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'drag_drop'&& <DragDropEval  data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'timeline' && <TimelineEval  data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'decision' && <DecisionEval  data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'survey'   && <SurveyEval    data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'mindmap'  && <MindmapEval   data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'lab'      && <LabEval       data={subsection.evalData} color={color} code={code} setCode={setCode} onComplete={(c) => saveProgress(true, c)}/>}
            {evalType === 'challenge'&& <ChallengeEval data={subsection.evalData} color={color} code={code} setCode={setCode} onComplete={(c) => saveProgress(true, c)}/>}
            {evalType === 'replit'   && <ReplitEval    data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
            {evalType === 'github'   && <GithubEval    data={subsection.evalData} color={color} onComplete={() => saveProgress(true)}/>}
          </Box>
        )}
      </Box>

      {/* ── Footer ── */}
      <Box sx={{ borderTop: `1px solid ${C.border}`, px: 3, py: 1.75, display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
        {step === 'theory' && !theoryDone && (
          <Button variant="contained" onClick={handleTheoryDone}
            sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '9px', fontSize: '0.82rem', '&:hover': { bgcolor: alpha(color, 0.85) } }}>
            Ir al ejercicio →
          </Button>
        )}
        {step === 'theory' && theoryDone && (
          <Button variant="contained" onClick={() => setStep('exercise')}
            sx={{ bgcolor: color, color: '#fff', fontWeight: 700, textTransform: 'none', borderRadius: '9px', fontSize: '0.82rem', '&:hover': { bgcolor: alpha(color, 0.85) } }}>
            Ver ejercicio →
          </Button>
        )}
        <Box sx={{ flex: 1 }}/>
        {completed && (
          <Button variant="outlined" endIcon={<FiChevronRight size={13}/>} onClick={goNext}
            sx={{ borderColor: alpha(color, 0.4), color: color, fontWeight: 700, textTransform: 'none', borderRadius: '9px', fontSize: '0.82rem', '&:hover': { bgcolor: alpha(color, 0.08), borderColor: color } }}>
            {next ? 'Siguiente subsección' : 'Finalizar curso'}
          </Button>
        )}
      </Box>
    </Box>
  )
}