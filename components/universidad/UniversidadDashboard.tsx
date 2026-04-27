'use client'

import { useState, useRef, useEffect } from 'react'
import { Box, Typography, Button, alpha } from '@mui/material'
import { FiAward, FiArrowRight, FiLogOut, FiMoon, FiSun, FiBook, FiClock, FiZap } from 'react-icons/fi'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useClerk } from '@clerk/nextjs'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────
interface Course { id: string; slug: string; title: any; description: any; icon: string; color: string; level: string; free: boolean }
interface RecentItem { subsectionId: string; subsectionTitle: string; courseId: string; courseTitle: string; courseColor: string; courseSlug: string; completedAt: Date | null }
interface NextSub { id: string; title: string; courseId: string; courseTitle: string; courseSlug: string; courseColor: string; courseIcon: string }

interface Props {
  user:           { id: string; name: string; email: string }
  courses:        Course[]
  progress:       { subsectionId: string; completed: boolean; courseId: string; completedAt?: Date | null; updatedAt?: Date | null }[]
  certificates:   { id: string; courseId: string; issuedAt: Date | null }[]
  streak:         number
  recentActivity: RecentItem[]
  nextSub:        NextSub | null
}

// ─── Quotes ───────────────────────────────────────────────────
const QUOTES = [
  { text: "El único modo de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs" },
  { text: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.", author: "Nelson Mandela" },
  { text: "Cualquier tecnología suficientemente avanzada es indistinguible de la magia.", author: "Arthur C. Clarke" },
  { text: "El conocimiento es poder.", author: "Francis Bacon" },
  { text: "Primero hazlo, luego hazlo bien, luego hazlo mejor.", author: "Addy Osmani" },
  { text: "Los programadores del mañana son los magos del futuro.", author: "Gabe Newell" },
]


// ─── Ranks (Apex style) ───────────────────────────────────────
const RANKS = [
  { name: 'Bronce',   min: 0,   max: 10,  icon: '🥉', color: '#CD7F32', glow: 'rgba(205,127,50,0.4)',  next: 11  },
  { name: 'Plata',    min: 11,  max: 30,  icon: '🥈', color: '#A8A9AD', glow: 'rgba(168,169,173,0.4)', next: 31  },
  { name: 'Oro',      min: 31,  max: 75,  icon: '🥇', color: '#F7DF1E', glow: 'rgba(247,223,30,0.4)',  next: 76  },
  { name: 'Platino',  min: 76,  max: 150, icon: '💎', color: '#00AEEF', glow: 'rgba(0,174,239,0.4)',   next: 151 },
  { name: 'Diamante', min: 151, max: 300, icon: '💠', color: '#6366F1', glow: 'rgba(99,102,241,0.4)',  next: 301 },
  { name: 'Maestro',  min: 301, max: 500, icon: '👑', color: '#A855F7', glow: 'rgba(168,85,247,0.4)',  next: 501 },
  { name: 'Predator', min: 501, max: 9999,icon: '🔴', color: '#EF4444', glow: 'rgba(239,68,68,0.4)',   next: null},
]

function getRank(total: number) {
  return RANKS.find(r => total >= r.min && total <= r.max) ?? RANKS[0]
}

// ─── Particle canvas ──────────────────────────────────────────
function ParticleField({ color }: { color: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    let id: number
    const W = c.width = c.offsetWidth, H = c.height = c.offsetHeight
    const rgb = { r: parseInt(color.slice(1,3),16)||0, g: parseInt(color.slice(3,5),16)||174, b: parseInt(color.slice(5,7),16)||239 }
    const pts = Array.from({length:70}, () => ({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35, r:Math.random()*1.2+.3, o:Math.random()*.45+.1 }))
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      pts.forEach((p,i) => {
        pts.slice(i+1).forEach(q => {
          const d = Math.hypot(p.x-q.x, p.y-q.y)
          if (d < 110) { ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle=`rgba(${rgb.r},${rgb.g},${rgb.b},${(1-d/110)*.1})`; ctx.lineWidth=.5; ctx.stroke() }
        })
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(${rgb.r},${rgb.g},${rgb.b},${p.o})`; ctx.fill()
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1
      })
      id = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(id)
  }, [color])
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}/>
}

// ─── Glow orb ─────────────────────────────────────────────────
function GlowOrb({ color, size, top, left, opacity=.1 }: any) {
  return <Box sx={{ position:'absolute', top, left, width:size, height:size, borderRadius:'50%', bgcolor:color, filter:`blur(${size*.4}px)`, opacity, pointerEvents:'none', animation:'orbF 9s ease-in-out infinite', '@keyframes orbF': { '0%,100%': { transform:'translateY(0) scale(1)' }, '50%': { transform:'translateY(-18px) scale(1.04)' } } }}/>
}

// ─── Streak widget ────────────────────────────────────────────
function StreakWidget({ streak, dark }: { streak: number; dark: boolean }) {
  const BORDER = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'
  const MUTED  = dark ? 'rgba(255,255,255,0.35)' : '#8891AA'
  return (
    <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', px:3, py:2.5, border:`1px solid ${streak>0 ? 'rgba(251,146,60,0.35)' : BORDER}`, borderRadius:'16px', bgcolor: streak>0 ? 'rgba(251,146,60,0.06)' : dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', minWidth:110, position:'relative', overflow:'hidden' }}>
      {streak>0 && <Box sx={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 0%, rgba(251,146,60,0.12) 0%, transparent 60%)', pointerEvents:'none' }}/>}
      <Box component={motion.div} animate={streak>0 ? { scale:[1,1.15,1], rotate:[0,5,-5,0] } : {}} transition={{ duration:1.5, repeat:Infinity, repeatDelay:2 }}
        sx={{ fontSize:'2rem', lineHeight:1, mb:.5 }}>
        {streak>0 ? '🔥' : '💤'}
      </Box>
      <Typography sx={{ fontWeight:900, fontSize:'1.8rem', lineHeight:1, color: streak>0 ? '#FB923C' : MUTED }}>{streak}</Typography>
      <Typography sx={{ fontSize:'0.62rem', color: streak>0 ? 'rgba(251,146,60,0.7)' : MUTED, letterSpacing:'0.08em', textTransform:'uppercase', mt:.25 }}>día{streak!==1?'s':''} racha</Typography>
    </Box>
  )
}

// ─── Quote widget ─────────────────────────────────────────────
function QuoteWidget({ dark }: { dark: boolean }) {
  const MUTED = dark ? 'rgba(255,255,255,0.35)' : '#8891AA'
  const TEXT  = dark ? '#F1F5F9' : '#0B0F2B'
  const idx   = new Date().getDay() % QUOTES.length
  const q     = QUOTES[idx]
  return (
    <Box sx={{ flex:1, px:3, py:2.5, border:`1px solid ${dark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.08)'}`, borderRadius:'16px', bgcolor:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
      <Typography sx={{ fontSize:'0.65rem', color:'#00AEEF', letterSpacing:'0.12em', textTransform:'uppercase', fontWeight:700, mb:1 }}>💬 Frase del día</Typography>
      <Typography sx={{ fontSize:'0.88rem', color:TEXT, lineHeight:1.6, fontStyle:'italic', mb:.75 }}>"{q.text}"</Typography>
      <Typography sx={{ fontSize:'0.72rem', color:MUTED }}>— {q.author}</Typography>
    </Box>
  )
}

// ─── Next sub card ────────────────────────────────────────────
function NextSubCard({ sub, dark }: { sub: NextSub; dark: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <Box onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      sx={{ position:'relative', borderRadius:'16px', overflow:'hidden', transition:'transform 0.3s', transform:hov?'translateY(-4px)':'none' }}>
      <Box sx={{ position:'absolute', inset:0, background:`linear-gradient(135deg, ${alpha(sub.courseColor,.45)}, ${alpha(sub.courseColor,.08)}, transparent)`, padding:'1px', borderRadius:'16px' }}>
        <Box sx={{ position:'absolute', inset:'1px', borderRadius:'15px', bgcolor:dark?'#0a0c12':'#fff' }}/>
      </Box>
      {hov && <Box sx={{ position:'absolute', top:-30, right:-30, width:140, height:140, borderRadius:'50%', bgcolor:sub.courseColor, filter:'blur(50px)', opacity:.18, pointerEvents:'none', zIndex:0 }}/>}
      <Box sx={{ position:'relative', zIndex:1, p:2.5, display:'flex', alignItems:'center', gap:2 }}>
        <Box sx={{ width:48, height:48, borderRadius:'14px', bgcolor:alpha(sub.courseColor,.15), border:`1px solid ${alpha(sub.courseColor,.3)}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>
          {sub.courseIcon}
        </Box>
        <Box sx={{ flex:1, minWidth:0 }}>
          <Typography sx={{ fontSize:'0.62rem', color:sub.courseColor, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', mb:.25 }}>
            ▶ Continúa donde dejaste
          </Typography>
          <Typography sx={{ fontSize:'0.88rem', fontWeight:700, color:dark?'#F1F5F9':'#0B0F2B', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {sub.title}
          </Typography>
          <Typography sx={{ fontSize:'0.72rem', color:dark?'rgba(255,255,255,0.4)':'#8891AA', mt:.2 }}>{sub.courseTitle}</Typography>
        </Box>
        <Button component={Link} href={`/universidad/${sub.courseSlug}/${sub.id}`}
          sx={{ flexShrink:0, bgcolor:sub.courseColor, color:'#fff', fontWeight:700, textTransform:'none', borderRadius:'10px', px:2, py:.85, fontSize:'0.78rem', boxShadow:`0 4px 16px ${alpha(sub.courseColor,.35)}`, '&:hover':{ bgcolor:alpha(sub.courseColor,.85) } }}>
          Ir →
        </Button>
      </Box>
    </Box>
  )
}

// ─── Recent activity ──────────────────────────────────────────
function RecentActivity({ items, dark }: { items: RecentItem[]; dark: boolean }) {
  const BORDER = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'
  const MUTED  = dark ? 'rgba(255,255,255,0.35)' : '#8891AA'
  const TEXT   = dark ? '#F1F5F9' : '#0B0F2B'

  const timeAgo = (d: Date | null) => {
    if (!d) return ''
    const diff = Date.now() - new Date(d).getTime()
    const mins = Math.floor(diff/60000)
    if (mins < 60) return `hace ${mins}m`
    const hrs = Math.floor(mins/60)
    if (hrs < 24) return `hace ${hrs}h`
    return `hace ${Math.floor(hrs/24)}d`
  }

  return (
    <Box sx={{ border:`1px solid ${BORDER}`, borderRadius:'16px', overflow:'hidden', bgcolor:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)' }}>
      <Box sx={{ px:2.5, py:1.75, borderBottom:`1px solid ${BORDER}`, display:'flex', alignItems:'center', gap:1 }}>
        <FiClock size={13} color="#00AEEF"/>
        <Typography sx={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:MUTED }}>Actividad reciente</Typography>
      </Box>
      {items.length === 0 ? (
        <Box sx={{ px:2.5, py:3, textAlign:'center' }}>
          <Typography sx={{ fontSize:'0.82rem', color:MUTED }}>Completa tu primera subsección 🚀</Typography>
        </Box>
      ) : (
        items.map((item, i) => (
          <Box key={item.subsectionId} component={Link} href={`/universidad/${item.courseSlug}/${item.subsectionId}`}
            sx={{ display:'flex', alignItems:'center', gap:2, px:2.5, py:1.5, textDecoration:'none', borderBottom: i < items.length-1 ? `1px solid ${BORDER}` : 'none', transition:'background 0.15s', '&:hover':{ bgcolor:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.02)' } }}>
            <Box sx={{ width:8, height:8, borderRadius:'50%', bgcolor:item.courseColor, boxShadow:`0 0 6px ${item.courseColor}`, flexShrink:0 }}/>
            <Box sx={{ flex:1, minWidth:0 }}>
              <Typography sx={{ fontSize:'0.8rem', fontWeight:500, color:TEXT, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.subsectionTitle}</Typography>
              <Typography sx={{ fontSize:'0.68rem', color:MUTED }}>{item.courseTitle}</Typography>
            </Box>
            <Typography sx={{ fontSize:'0.65rem', color:MUTED, flexShrink:0 }}>{timeAgo(item.completedAt)}</Typography>
          </Box>
        ))
      )}
    </Box>
  )
}

// ─── Course progress bar ──────────────────────────────────────
function CourseProgressRow({ course, completed, total, dark }: any) {
  const pct  = total > 0 ? Math.round((completed/total)*100) : 0
  const MUTED = dark ? 'rgba(255,255,255,0.35)' : '#8891AA'
  return (
    <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
      <Typography sx={{ fontSize:'1rem', flexShrink:0 }}>{course.icon}</Typography>
      <Box sx={{ flex:1, minWidth:0 }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', mb:.5 }}>
          <Typography sx={{ fontSize:'0.75rem', fontWeight:600, color:dark?'rgba(255,255,255,0.7)':'#0B0F2B', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{course.title?.es}</Typography>
          <Typography sx={{ fontSize:'0.68rem', fontWeight:700, color:pct>0?course.color:MUTED, flexShrink:0, ml:1 }}>{pct}%</Typography>
        </Box>
        <Box sx={{ height:3, bgcolor:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)', borderRadius:2 }}>
          <Box component={motion.div} initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:.8, ease:'easeOut'}}
            sx={{ height:'100%', borderRadius:2, bgcolor:course.color, boxShadow:pct>0?`0 0 6px ${course.color}`:undefined }}/>
        </Box>
      </Box>
    </Box>
  )
}

// ─── 3D Course card ───────────────────────────────────────────
function CourseCard3D({ course, completedCount, totalSubs, certified, color, darkMode: dark }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt]  = useState({ x:0, y:0 })
  const [hov,  setHov]   = useState(false)
  const pct = totalSubs > 0 ? Math.round((completedCount/totalSubs)*100) : 0

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    setTilt({ x:((e.clientY-r.top-r.height/2)/r.height)*-12, y:((e.clientX-r.left-r.width/2)/r.width)*12 })
  }

  return (
    <Box ref={ref} onMouseMove={onMove} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setTilt({x:0,y:0})}}
      component={motion.div} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.5}}
      style={{ transform:`perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hov?8:0}px)`, transition:hov?'transform 0.1s ease':'transform 0.4s ease' }}
      sx={{ position:'relative', borderRadius:'20px', overflow:'hidden', cursor:'pointer' }}>
      <Box sx={{ position:'absolute', inset:0, bgcolor:dark?'rgba(19,22,29,0.85)':'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', border:`1px solid ${hov?alpha(color,.5):dark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.08)'}`, borderRadius:'20px', transition:'border-color 0.3s ease' }}/>
      {hov && <Box sx={{ position:'absolute', inset:0, borderRadius:'20px', background:`radial-gradient(circle at 50% 0%, ${alpha(color,.12)} 0%, transparent 60%)`, pointerEvents:'none' }}/>}
      <Box sx={{ position:'relative', height:3, background:pct>0?`linear-gradient(90deg,${color},${alpha(color,.3)})`:dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)' }}/>
      <Box sx={{ position:'relative', p:2.5 }}>
        <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', mb:2 }}>
          <Box sx={{ width:52, height:52, borderRadius:'16px', bgcolor:hov?color:alpha(color,.12), display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', transition:'all 0.3s ease', boxShadow:hov?`0 8px 24px ${alpha(color,.4)}`:'none' }}>{course.icon}</Box>
          {certified && (
            <Box sx={{ display:'flex', alignItems:'center', gap:.5, px:1, py:.4, bgcolor:alpha('#22C55E',.12), border:`1px solid ${alpha('#22C55E',.3)}`, borderRadius:'100px' }}>
              <FiAward size={11} color="#22C55E"/>
              <Typography sx={{ fontSize:'0.6rem', fontWeight:700, color:'#22C55E' }}>CERT</Typography>
            </Box>
          )}
        </Box>
        <Typography sx={{ fontWeight:800, fontSize:'1rem', color:dark?'#F1F5F9':'#0B0F2B', mb:.4, fontFamily:'Poppins, sans-serif' }}>{course.title?.es}</Typography>
        <Typography sx={{ fontSize:'0.75rem', color:dark?'rgba(255,255,255,0.4)':'#8891AA', lineHeight:1.5, mb:2, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{course.description?.es}</Typography>
        {pct > 0 && (
          <Box sx={{ mb:2 }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', mb:.75 }}>
              <Typography sx={{ fontSize:'0.68rem', color:dark?'rgba(255,255,255,0.4)':'#8891AA' }}>{completedCount}/{totalSubs} subsecciones</Typography>
              <Typography sx={{ fontSize:'0.68rem', fontWeight:700, color:color }}>{pct}%</Typography>
            </Box>
            <Box sx={{ height:4, bgcolor:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)', borderRadius:2, overflow:'hidden' }}>
              <Box component={motion.div} initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:.8,ease:'easeOut'}} sx={{ height:'100%', bgcolor:color, borderRadius:2, boxShadow:`0 0 8px ${alpha(color,.5)}` }}/>
            </Box>
          </Box>
        )}
        <Button component={Link} href={`/universidad/${course.slug}`} fullWidth endIcon={<FiArrowRight size={13}/>}
          sx={{ bgcolor:hov?color:alpha(color,.1), color:hov?'#fff':color, fontWeight:700, textTransform:'none', borderRadius:'12px', py:1, fontSize:'0.82rem', boxShadow:hov?`0 4px 20px ${alpha(color,.35)}`:'none', transition:'all 0.25s ease', '&:hover':{ bgcolor:color, color:'#fff' } }}>
          {certified?'Ver certificado':completedCount>0?'Continuar':'Empezar'}
        </Button>
      </Box>
    </Box>
  )
}


// ─── Rank Card ────────────────────────────────────────────────
function RankCard({ total, dark }: { total: number; dark: boolean }) {
  const rank     = getRank(total)
  const nextRank = RANKS[RANKS.indexOf(rank) + 1]
  const pct      = nextRank
    ? Math.round(((total - rank.min) / (rank.next! - rank.min)) * 100)
    : 100
  const BORDER = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'
  const MUTED  = dark ? 'rgba(255,255,255,0.35)' : '#8891AA'

  return (
    <Box sx={{ position: 'relative', border: `1px solid ${alpha(rank.color, 0.4)}`, borderRadius: '16px', overflow: 'hidden', bgcolor: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', p: 2.5 }}>
      {/* Glow bg */}
      <Box sx={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', bgcolor: rank.color, filter: 'blur(60px)', opacity: 0.1, pointerEvents: 'none' }}/>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box component={motion.div} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              sx={{ fontSize: '2.2rem', lineHeight: 1, filter: `drop-shadow(0 0 8px ${rank.color})` }}>
              {rank.icon}
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: rank.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Rango actual</Typography>
              <Typography sx={{ fontWeight: 900, fontSize: '1.4rem', color: rank.color, lineHeight: 1, textShadow: `0 0 20px ${rank.glow}` }}>{rank.name}</Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', color: rank.color, lineHeight: 1 }}>{total}</Typography>
            <Typography sx={{ fontSize: '0.62rem', color: MUTED, letterSpacing: '0.08em', textTransform: 'uppercase' }}>subsecciones</Typography>
          </Box>
        </Box>

        {/* Progress to next rank */}
        {nextRank && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
              <Typography sx={{ fontSize: '0.65rem', color: MUTED }}>Próximo: <Box component="span" sx={{ color: nextRank.color, fontWeight: 700 }}>{nextRank.icon} {nextRank.name}</Box></Typography>
              <Typography sx={{ fontSize: '0.65rem', color: MUTED }}>{rank.next! - total} subsecciones para subir</Typography>
            </Box>
            <Box sx={{ height: 6, bgcolor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: 3, overflow: 'hidden' }}>
              <Box component={motion.div} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2, ease: 'easeOut' }}
                sx={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${rank.color}, ${nextRank.color})`, boxShadow: `0 0 10px ${rank.glow}` }}/>
            </Box>
          </Box>
        )}
        {!nextRank && (
          <Box sx={{ px: 2, py: 1, bgcolor: alpha(rank.color, 0.1), border: `1px solid ${alpha(rank.color, 0.3)}`, borderRadius: '10px', textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: rank.color }}>🏆 Rango máximo alcanzado</Typography>
          </Box>
        )}

        {/* All ranks mini */}
        <Box sx={{ display: 'flex', gap: 0.75, mt: 2, flexWrap: 'wrap' }}>
          {RANKS.map(r => {
            const unlocked = total >= r.min
            return (
              <Box key={r.name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25, opacity: unlocked ? 1 : 0.25, transition: 'opacity 0.2s' }}>
                <Typography sx={{ fontSize: '1rem', filter: unlocked ? `drop-shadow(0 0 4px ${r.color})` : 'grayscale(1)' }}>{r.icon}</Typography>
                <Typography sx={{ fontSize: '0.5rem', color: unlocked ? r.color : MUTED, fontWeight: 600, letterSpacing: '0.04em' }}>{r.name.slice(0,4).toUpperCase()}</Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

// ─── Charts section ───────────────────────────────────────────
function ChartsSection({ progress, courses, dark }: { progress: any[]; courses: any[]; dark: boolean }) {
  const MUTED  = dark ? 'rgba(255,255,255,0.35)' : '#8891AA'
  const BORDER = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'
  const GRID   = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'

  // Weekly activity — last 7 days
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
    const label = d.toLocaleDateString('es-MX', { weekday: 'short' })
    const count = progress.filter(p => {
      if (!p.completedAt && !p.updatedAt) return false
      const pd = new Date(p.completedAt ?? p.updatedAt)
      return pd.toDateString() === d.toDateString() && p.completed
    }).length
    return { day: label.charAt(0).toUpperCase() + label.slice(1), count }
  })

  // Cumulative progress line
  const sorted = [...progress].filter(p => p.completed && (p.completedAt || p.updatedAt)).sort((a, b) => new Date(a.completedAt ?? a.updatedAt).getTime() - new Date(b.completedAt ?? b.updatedAt).getTime())
  const lineData = sorted.map((_, i) => ({
    n: i + 1,
    label: `#${i+1}`,
    rank: getRank(i + 1).name,
  })).filter((_, i) => i % Math.max(1, Math.floor(sorted.length / 20)) === 0 || i === sorted.length - 1)

  // Pie by course
  const pieData = courses.map(c => ({
    name: c.title?.es ?? c.id,
    value: progress.filter(p => p.courseId === c.id && p.completed).length,
    color: c.color,
  })).filter(d => d.value > 0)

  const customTooltipStyle = {
    backgroundColor: dark ? '#0d1017' : '#fff',
    border: `1px solid ${BORDER}`,
    borderRadius: '10px',
    fontSize: '0.75rem',
    color: dark ? '#F1F5F9' : '#0B0F2B',
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 2, mb: 3 }}>

      {/* Weekly bar chart */}
      <Box sx={{ border: `1px solid ${BORDER}`, borderRadius: '16px', p: 2.5, bgcolor: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, mb: 2 }}>
          📊 Actividad últimos 7 días
        </Typography>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weekData} margin={{ top: 0, right: 0, bottom: 0, left: -30 }}>
            <XAxis dataKey="day" tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: GRID }}/>
            <Bar dataKey="count" fill="#00AEEF" radius={[6,6,0,0]} name="Completadas">
              {weekData.map((entry, i) => (
                <Cell key={i} fill={entry.count > 0 ? '#00AEEF' : dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Pie by course */}
      <Box sx={{ border: `1px solid ${BORDER}`, borderRadius: '16px', p: 2.5, bgcolor: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, mb: 2 }}>
          🍩 Distribución por curso
        </Typography>
        {pieData.length === 0 ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
            <Typography sx={{ fontSize: '0.82rem', color: MUTED }}>Completa subsecciones para ver la distribución</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle}/>
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
              {pieData.map((d, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: d.color, flexShrink: 0, boxShadow: `0 0 4px ${d.color}` }}/>
                  <Typography sx={{ fontSize: '0.75rem', color: dark ? 'rgba(255,255,255,0.6)' : '#4A5068', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: d.color }}>{d.value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// ─── Main ─────────────────────────────────────────────────────
export function UniversidadDashboard({ user, courses, progress, certificates, streak, recentActivity, nextSub }: Props) {
  const { signOut } = useClerk()
  const [dark, setDark]     = useState(true)
  const [menu, setMenu]     = useState(false)
  const avatarRef           = useRef<HTMLDivElement>(null)
  const { scrollY }         = useScroll()
  const heroY               = useTransform(scrollY, [0,300], [0,-50])
  const heroOp              = useTransform(scrollY, [0,200], [1,.4])

  useEffect(() => {
    const h = (e: MouseEvent) => { if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setMenu(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const completedBy = (id: string) => progress.filter(p => p.courseId===id && p.completed).length
  const hasCert     = (id: string) => certificates.some(c => c.courseId===id)
  const totalDone   = progress.filter(p => p.completed).length
  const firstName   = user.name.split(' ')[0]

  const BG     = dark ? '#060810' : '#F0F4FF'
  const TEXT   = dark ? '#F1F5F9' : '#0B0F2B'
  const MUTED  = dark ? 'rgba(255,255,255,0.35)' : '#8891AA'
  const BORDER = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'

  return (
    <Box sx={{ bgcolor:BG, minHeight:'100vh', color:TEXT, transition:'all 0.4s ease', fontFamily:'Poppins, sans-serif', position:'relative', overflowX:'hidden' }}>
      <GlowOrb color="#00AEEF" size={600} top="-100px" left="-100px" opacity={.07}/>
      <GlowOrb color="#6366F1" size={400} top="30%"    left="70%"   opacity={.06}/>
      <GlowOrb color="#22C55E" size={300} top="70%"    left="10%"   opacity={.05}/>

      {/* ── AppBar ── */}
      <Box sx={{ position:'sticky', top:0, zIndex:100, px:{xs:2,md:4}, height:60, display:'flex', alignItems:'center', justifyContent:'space-between', bgcolor:dark?'rgba(6,8,16,0.85)':'rgba(240,244,255,0.85)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${BORDER}`, transition:'all 0.3s ease' }}>
        <Box component={Link} href="/universidad" sx={{ display:'flex', alignItems:'center', gap:1.5, textDecoration:'none' }}>
          <Box sx={{ width:34, height:34, borderRadius:'10px', background:'linear-gradient(135deg, #00AEEF, #6366F1)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,174,239,0.3)' }}>
            <Typography sx={{ fontWeight:900, fontSize:'1.1rem', color:'#fff', fontFamily:'Poppins' }}>D</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight:800, fontSize:'1rem', color:TEXT, lineHeight:1, fontFamily:'Poppins' }}>
              Dathe<Box component="span" sx={{ background:'linear-gradient(90deg,#00AEEF,#6366F1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>ó</Box>n
            </Typography>
            <Typography sx={{ fontSize:'0.55rem', fontWeight:700, color:'#00AEEF', letterSpacing:'0.14em', textTransform:'uppercase' }}>Universidad</Typography>
          </Box>
        </Box>

        <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
          {/* Streak badge en navbar */}
          {streak > 0 && (
            <Box sx={{ display:'flex', alignItems:'center', gap:.5, px:1.25, py:.4, bgcolor:'rgba(251,146,60,0.1)', border:'1px solid rgba(251,146,60,0.3)', borderRadius:'100px' }}>
              <Typography sx={{ fontSize:'0.85rem' }}>🔥</Typography>
              <Typography sx={{ fontSize:'0.72rem', fontWeight:700, color:'#FB923C' }}>{streak}</Typography>
            </Box>
          )}

          <Box onClick={()=>setDark(d=>!d)} sx={{ width:36, height:36, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:`1px solid ${BORDER}`, bgcolor:dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.04)', transition:'all 0.2s', '&:hover':{bgcolor:dark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.08)'} }}>
            {dark?<FiSun size={15} color="#F59E0B"/>:<FiMoon size={15} color="#6366F1"/>}
          </Box>

          <Box ref={avatarRef} sx={{ position:'relative' }}>
            <Box onClick={()=>setMenu(o=>!o)} sx={{ display:'flex', alignItems:'center', gap:1, px:1.25, py:.6, borderRadius:'10px', cursor:'pointer', border:`1px solid ${menu?'rgba(0,174,239,0.4)':BORDER}`, bgcolor:menu?'rgba(0,174,239,0.06)':'transparent', transition:'all 0.15s' }}>
              <Box sx={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#00AEEF,#6366F1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Typography sx={{ fontSize:'0.75rem', fontWeight:700, color:'#fff' }}>{firstName.charAt(0).toUpperCase()}</Typography>
              </Box>
              <Typography sx={{ fontSize:'0.8rem', fontWeight:500, color:MUTED, display:{xs:'none',sm:'block'} }}>{firstName}</Typography>
              <Typography sx={{ fontSize:'0.6rem', color:MUTED }}>▾</Typography>
            </Box>
            <AnimatePresence>
              {menu && (
                <Box component={motion.div} initial={{opacity:0,y:-8,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:.96}} transition={{duration:.15}}
                  sx={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:220, bgcolor:dark?'#0d1017':'#fff', border:`1px solid ${BORDER}`, borderRadius:'14px', boxShadow:'0 16px 48px rgba(0,0,0,0.3)', overflow:'hidden', zIndex:200 }}>
                  <Box sx={{ px:2, py:1.5, borderBottom:`1px solid ${BORDER}` }}>
                    <Typography sx={{ fontSize:'0.85rem', fontWeight:600, color:TEXT }}>{user.name}</Typography>
                    <Typography sx={{ fontSize:'0.72rem', color:MUTED, mt:.25 }}>{user.email}</Typography>
                  </Box>
                  {[{icon:<FiBook size={13}/>,label:'Mis cursos',href:'/universidad'},{icon:<FiAward size={13}/>,label:'Certificados',href:'/universidad'}].map(item=>(
                    <Box key={item.label} component={Link} href={item.href} onClick={()=>setMenu(false)} sx={{ display:'flex', alignItems:'center', gap:1.5, px:2, py:1.1, textDecoration:'none', color:MUTED, fontSize:'0.82rem', '&:hover':{bgcolor:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.03)',color:TEXT} }}>
                      {item.icon}{item.label}
                    </Box>
                  ))}
                  <Box sx={{ borderTop:`1px solid ${BORDER}` }}>
                    <Box onClick={()=>{setMenu(false);signOut({redirectUrl:'/es/landing'})}} sx={{ display:'flex', alignItems:'center', gap:1.5, px:2, py:1.1, cursor:'pointer', color:'#EF4444', fontSize:'0.82rem', '&:hover':{bgcolor:'rgba(239,68,68,0.05)'} }}>
                      <FiLogOut size={13}/> Cerrar sesión
                    </Box>
                  </Box>
                </Box>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>

      {/* ── Hero ── */}
      <Box sx={{ position:'relative', overflow:'hidden', minHeight:300, display:'flex', alignItems:'center' }}>
        <ParticleField color="#00AEEF"/>
        <Box component={motion.div} style={{y:heroY,opacity:heroOp}} sx={{ position:'relative', zIndex:1, px:{xs:3,md:6}, py:5, width:'100%' }}>
          <Box component={motion.div} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <Typography sx={{ fontSize:'0.72rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#00AEEF', mb:1, fontWeight:600 }}>Bienvenido de vuelta</Typography>
            <Typography sx={{ fontFamily:'Poppins', fontWeight:900, fontSize:{xs:'2rem',md:'3rem'}, lineHeight:1.05, mb:1 }}>
              Hola, {firstName}{' '}
              <Box component={motion.span} animate={{rotate:[0,15,-10,15,0]}} transition={{duration:1.5,delay:.8,repeat:Infinity,repeatDelay:4}} style={{display:'inline-block'}}>👋</Box>
            </Typography>
            <Typography sx={{ fontSize:'0.95rem', color:MUTED, maxWidth:500 }}>
              {totalDone===0?'Empieza tu primer curso hoy.':`${totalDone} subsección${totalDone!==1?'es':''} completadas. ¡Sigue así!`}
            </Typography>
          </Box>

          {/* Stats */}
          <Box component={motion.div} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.5}}
            sx={{ display:'flex', flexWrap:'wrap', gap:1.5, mt:3 }}>
            {[{label:'Completadas',value:totalDone,icon:'⚡'},{label:'Cursos',value:courses.length,icon:'📚'},{label:'Certificados',value:certificates.length,icon:'🏆'}].map((s,i)=>(
              <Box key={i} component={motion.div} initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{delay:.4+i*.1}}
                sx={{ display:'flex', alignItems:'center', gap:1.25, px:2, py:1, bgcolor:dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.04)', backdropFilter:'blur(10px)', border:`1px solid ${BORDER}`, borderRadius:'100px' }}>
                <Typography sx={{ fontSize:'1rem' }}>{s.icon}</Typography>
                <Typography sx={{ fontWeight:800, fontSize:'1.1rem', color:'#00AEEF', lineHeight:1 }}>{s.value}</Typography>
                <Typography sx={{ fontSize:'0.72rem', color:MUTED }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ px:{xs:2,md:6}, pb:8 }}>

        {/* ── Widgets row: streak + quote ── */}
        <Box sx={{ display:'grid', gridTemplateColumns:{xs:'1fr',sm:'auto 1fr'}, gap:2, mb:3 }}>
          <StreakWidget streak={streak} dark={dark}/>
          <QuoteWidget dark={dark}/>
        </Box>

        {/* ── Rank + Charts ── */}
        {/* ── Rank ── */}
        <Box sx={{ mb:3 }}>
          <RankCard total={totalDone} dark={dark}/>
        </Box>

        {/* ── Charts ── */}
        <ChartsSection progress={progress} courses={courses} dark={dark}/>

        {/* ── Next sub + progress ── */}
        <Box sx={{ display:'grid', gridTemplateColumns:{xs:'1fr',lg:'1fr 1fr'}, gap:2, mb:3 }}>
          {/* Continúa donde dejaste */}
          {nextSub && <NextSubCard sub={nextSub} dark={dark}/>}

          {/* Progreso por curso */}
          <Box sx={{ border:`1px solid ${BORDER}`, borderRadius:'16px', p:2.5, bgcolor:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)' }}>
            <Box sx={{ display:'flex', alignItems:'center', gap:1, mb:2 }}>
              <FiZap size={13} color="#00AEEF"/>
              <Typography sx={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:MUTED }}>Progreso por curso</Typography>
            </Box>
            <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>
              {courses.map(c => (
                <CourseProgressRow key={c.id} course={c}
                  completed={completedBy(c.id)}
                  total={progress.filter(p=>p.courseId===c.id).length || 1}
                  dark={dark}/>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Actividad reciente ── */}
        <Box sx={{ mb:4 }}>
          <RecentActivity items={recentActivity} dark={dark}/>
        </Box>

        {/* ── Cursos ── */}
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb:3 }}>
          <Typography sx={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:MUTED }}>Todos los cursos</Typography>
          <Typography sx={{ fontSize:'0.72rem', color:MUTED }}>{courses.length} cursos</Typography>
        </Box>
        <Box sx={{ display:'grid', gridTemplateColumns:{xs:'1fr',sm:'repeat(2,1fr)',lg:'repeat(4,1fr)'}, gap:2.5 }}>
          {courses.map((c,i)=>(
            <motion.div key={c.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*.08,duration:.5}}>
              <CourseCard3D course={c} completedCount={completedBy(c.id)} totalSubs={progress.filter(p=>p.courseId===c.id).length||7} certified={hasCert(c.id)} color={c.color} darkMode={dark}/>
            </motion.div>
          ))}
        </Box>

        {/* ── Certificates ── */}
        <AnimatePresence>
          {certificates.length > 0 && (
            <Box component={motion.div} initial={{opacity:0}} animate={{opacity:1}} sx={{ mt:4 }}>
              <Typography sx={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:MUTED, mb:2 }}>Tus certificados</Typography>
              <Box sx={{ display:'flex', flexWrap:'wrap', gap:1.5 }}>
                {certificates.map(cert=>(
                  <Box key={cert.id} component={Link} href={`/certificado/${cert.id}`} target="_blank"
                    sx={{ display:'flex', alignItems:'center', gap:1, px:2, py:1, border:`1px solid ${alpha('#22C55E',.25)}`, borderRadius:'10px', textDecoration:'none', bgcolor:alpha('#22C55E',.04), transition:'all 0.2s', '&:hover':{borderColor:alpha('#22C55E',.5),bgcolor:alpha('#22C55E',.08)} }}>
                    <FiAward size={13} color="#22C55E"/>
                    <Typography sx={{ fontSize:'0.78rem', fontWeight:600, color:'#22C55E' }}>{courses.find(c=>c.id===cert.courseId)?.title?.es}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  )
}