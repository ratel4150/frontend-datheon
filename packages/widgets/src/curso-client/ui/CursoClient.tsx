// File: frontend-datheon/packages/widgets/src/curso-client/ui/CursoClient.tsx
'use client'

import { Box, Typography, LinearProgress, alpha, Collapse } from '@mui/material'
import { FiCheck, FiChevronDown, FiAward, FiArrowLeft, FiChevronRight } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const C = {
  bg:     '#0A0C10',
  card:   '#13161D',
  border: 'rgba(255,255,255,0.07)',
  text:   '#F1F5F9',
  muted:  'rgba(255,255,255,0.4)',
  green:  '#22C55E',
} as const

interface Block      { id: string; courseId: string; title: any; order: number }
interface Topic      { id: string; blockId: string; title: any; order: number }
interface Lesson     { id: string; topicId: string; title: any; order: number }
interface Subsection { id: string; lessonId: string; courseId: string; title: any; order: number; evalType: string }
interface Course     { id: string; slug: string; title: any; description: any; icon: string; color: string }
interface Cert       { id: string; courseId: string; issuedAt: string | Date | null }

interface Props {
  course:      Course
  blocks:      Block[]
  topics:      Topic[]
  lessons:     Lesson[]
  subsections: Subsection[]
  progress:    { subsectionId: string; completed: boolean }[]
  certificate: Cert | null
  userId:      string
}

const EVAL_ICON: Record<string, string> = {
  quiz:'❓', lab:'💻', cloze:'✏️', drag_drop:'🔀',
  flashcard:'🃏', timeline:'📅', decision:'🔀', survey:'📝',
  challenge:'🚀', mindmap:'🗺️', replit:'☁️',
}

export function CursoClient({ course, blocks, topics, lessons, subsections, progress, certificate, userId }: Props) {
  const router = useRouter()
  const color  = course.color
  const [openBlocks, setOpenBlocks] = useState<Set<string>>(new Set(blocks.map(b => b.id)))
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())

  useEffect(() => { router.refresh() }, [])

  const completedIds = new Set(progress.filter(p => p.completed).map(p => p.subsectionId))
  const total        = subsections.length
  const done         = subsections.filter(s => completedIds.has(s.id)).length
  const pct          = total > 0 ? Math.round((done / total) * 100) : 0
  const nextSub      = subsections.find(s => !completedIds.has(s.id))

  const toggleBlock = (id: string) => setOpenBlocks(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })
  const toggleTopic = (id: string) => setOpenTopics(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  const topicsByBlock  = (bid: string) => topics.filter(t => t.blockId  === bid).sort((a,b) => a.order-b.order)
  const lessonsByTopic = (tid: string) => lessons.filter(l => l.topicId === tid).sort((a,b) => a.order-b.order)
  const subsByLesson   = (lid: string) => subsections.filter(s => s.lessonId === lid).sort((a,b) => a.order-b.order)

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: '100vh', color: C.text }}>
      <Box sx={{ borderBottom: `1px solid ${C.border}`, px: { xs: 2, md: 4 }, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box onClick={() => router.push('/universidad')} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, cursor: 'pointer', color: C.muted, '&:hover': { color: C.text }, transition: 'color 0.15s' }}>
          <FiArrowLeft size={16}/><Typography sx={{ fontSize: '0.85rem' }}>Mis cursos</Typography>
        </Box>
        <Box sx={{ width: 1, height: 16, bgcolor: C.border }}/>
        <Typography sx={{ fontSize: '0.85rem', color: C.muted }}>{course.title?.es}</Typography>
      </Box>

      <Box sx={{ maxWidth: 860, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography sx={{ fontSize: '2.5rem' }}>{course.icon}</Typography>
            <Box>
              <Typography sx={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2rem' } }}>{course.title?.es}</Typography>
              <Typography sx={{ fontSize: '0.85rem', color: C.muted, mt: 0.25 }}>{course.description?.es}</Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.25 }}>
              <Typography sx={{ fontSize: '0.82rem', color: C.muted }}>{done} de {total} subsecciones completadas</Typography>
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: color }}>{pct}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={pct} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.06)', '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 } }}/>

            {!certificate && nextSub && (
              <Box component={Link} href={`/universidad/${course.slug}/${nextSub.id}`}
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mt: 2, px: 2.5, py: 1, bgcolor: color, borderRadius: '10px', textDecoration: 'none', '&:hover': { opacity: 0.88 } }}>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{done === 0 ? 'Empezar curso' : 'Continuar'}</Typography>
                <FiChevronRight size={14} color="#fff"/>
              </Box>
            )}
            {certificate && (
              <Box component={Link} href={`/certificado/${certificate.id}`} target="_blank"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mt: 2, px: 2.5, py: 1, bgcolor: alpha(C.green, 0.15), border: `1px solid ${alpha(C.green, 0.4)}`, borderRadius: '10px', textDecoration: 'none' }}>
                <FiAward size={15} color={C.green}/><Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: C.green }}>Ver certificado</Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {blocks.map((block, bi) => {
            const bTopics = topicsByBlock(block.id)
            const bSubs   = bTopics.flatMap(t => lessonsByTopic(t.id)).flatMap(l => subsByLesson(l.id))
            const bDone   = bSubs.filter(s => completedIds.has(s.id)).length
            const bOpen   = openBlocks.has(block.id)
            return (
              <Box key={block.id} sx={{ bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: '16px', overflow: 'hidden' }}>
                <Box onClick={() => toggleBlock(block.id)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: '10px', bgcolor: alpha(color, 0.15), color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, fontFamily: 'DM Mono, monospace' }}>B{bi+1}</Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{block.title?.es}</Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: C.muted }}>{bDone}/{bSubs.length} subsecciones</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {bDone === bSubs.length && bSubs.length > 0 && <FiCheck size={14} color={C.green}/>}
                    <Box sx={{ transform: bOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: C.muted }}><FiChevronDown size={16}/></Box>
                  </Box>
                </Box>

                <Collapse in={bOpen}>
                  <Box sx={{ borderTop: `1px solid ${C.border}` }}>
                    {bTopics.map((topic, ti) => {
                      const tLessons = lessonsByTopic(topic.id)
                      const tSubs    = tLessons.flatMap(l => subsByLesson(l.id))
                      const tDone    = tSubs.filter(s => completedIds.has(s.id)).length
                      const tOpen    = openTopics.has(topic.id)
                      return (
                        <Box key={topic.id} sx={{ borderBottom: ti < bTopics.length-1 ? `1px solid ${C.border}` : 'none' }}>
                          <Box onClick={() => toggleTopic(topic.id)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.5, cursor: 'pointer', bgcolor: 'rgba(255,255,255,0.02)', '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                              <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: alpha(color, 0.6) }}/>
                              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{topic.title?.es}</Typography>
                              <Typography sx={{ fontSize: '0.7rem', color: C.muted }}>({tDone}/{tSubs.length})</Typography>
                            </Box>
                            <Box sx={{ transform: tOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: C.muted }}><FiChevronDown size={13}/></Box>
                          </Box>

                          <Collapse in={tOpen}>
                            {tLessons.map(lesson => (
                              <Box key={lesson.id} sx={{ pl: 4 }}>
                                <Typography sx={{ fontSize: '0.7rem', color: C.muted, px: 2, py: 0.75, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{lesson.title?.es}</Typography>
                                {subsByLesson(lesson.id).map(sub => {
                                  const isDone = completedIds.has(sub.id)
                                  const isNext = sub.id === nextSub?.id
                                  return (
                                    <Box key={sub.id} component={Link} href={`/universidad/${course.slug}/${sub.id}`}
                                      sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.25, borderTop: `1px solid ${C.border}`, textDecoration: 'none', color: C.text, bgcolor: isNext ? alpha(color, 0.05) : 'transparent', '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' }, transition: 'background 0.15s' }}>
                                      <Box sx={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: isDone ? alpha(C.green, 0.15) : isNext ? alpha(color, 0.15) : 'rgba(255,255,255,0.04)', border: `1px solid ${isDone ? alpha(C.green, 0.4) : isNext ? alpha(color, 0.4) : 'rgba(255,255,255,0.1)'}` }}>
                                        {isDone ? <FiCheck size={10} color={C.green}/> : <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: isNext ? color : 'rgba(255,255,255,0.2)' }}/>}
                                      </Box>
                                      <Typography sx={{ flex: 1, fontSize: '0.82rem', color: isDone ? C.muted : C.text, textDecoration: isDone ? 'line-through' : 'none' }}>{sub.title?.es}</Typography>
                                      <Typography sx={{ fontSize: '0.75rem', opacity: 0.5 }}>{EVAL_ICON[sub.evalType] ?? '📝'}</Typography>
                                    </Box>
                                  )
                                })}
                              </Box>
                            ))}
                          </Collapse>
                        </Box>
                      )
                    })}
                  </Box>
                </Collapse>
              </Box>
            )
          })}
        </Box>

        {blocks.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10, color: C.muted }}>
            <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>🚧</Typography>
            <Typography sx={{ fontSize: '0.95rem' }}>Este curso está en construcción.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}