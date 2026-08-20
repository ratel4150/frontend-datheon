// File: app/(lang)/components/ChatWidget.tsx
'use client'

import {
  Box, Typography, TextField, IconButton,
  Avatar, Fab, alpha, Tooltip, Chip,
} from '@mui/material'
import {
  FiMessageCircle, FiX, FiSend, FiArrowDown,
  FiRefreshCw, FiCopy, FiCheck, FiTrash2, FiWifiOff, FiPause, FiAlertCircle,
} from 'react-icons/fi'
import { Message, useChat } from 'ai/react'
import { useRef, useEffect, useState, useCallback, useLayoutEffect, useMemo } from 'react'
import { motion, AnimatePresence, type Transition } from 'framer-motion'

const C = {
  bg:         '#FFFFFF',
  border:     '#ebebeb',
  text:       '#0B0F2B',
  textMid:    '#4A5068',
  textMute:   '#8891AA',
  accent:     '#00AEEF',
  accentDk:   '#0095cc',
  accentBg:   'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.22)',
  danger:     '#EF4444',
  dangerBg:   'rgba(239,68,68,0.08)',
  online:     '#22C55E',
} as const

type Props = { lang: string }

const MAX_LEN = 4000
const STORAGE_PREFIX = 'datheon-chat-'
const storageKey = (lang: string) => `${STORAGE_PREFIX}${lang}`

const welcomeMsg: Record<string, string> = {
  es: '¡Hola! Soy el asistente de Datheón. ¿En qué puedo ayudarte hoy?',
  en: "Hi! I'm Datheón's assistant. How can I help you today?",
  fr: "Bonjour! Je suis l'assistant de Datheón. Comment puis-je vous aider?",
}

const placeholder: Record<string, string> = {
  es: 'Escribe tu pregunta...',
  en: 'Type your question...',
  fr: 'Écrivez votre question...',
}

const quickReplies: Record<string, string[]> = {
  es: ['¿Qué servicios ofrecen?', '¿Cómo puedo contactarlos?', 'Cuéntame sobre Datheón'],
  en: ['What services do you offer?', 'How can I contact you?', 'Tell me about Datheón'],
  fr: ['Quels services proposez-vous ?', 'Comment puis-je vous contacter ?', 'Parlez-moi de Datheón'],
}

const ui = {
  title:        { es: 'Asistente Datheón',  en: 'Datheón Assistant', fr: 'Assistant Datheón' },
  online:       { es: 'En línea',            en: 'Online',            fr: 'En ligne' },
  typing:       { es: 'Escribiendo...',      en: 'Typing...',         fr: 'En train d’écrire...' },
  close:        { es: 'Cerrar chat',         en: 'Close chat',        fr: 'Fermer le chat' },
  open:         { es: 'Abrir chat',          en: 'Open chat',         fr: 'Ouvrir le chat' },
  send:         { es: 'Enviar mensaje',      en: 'Send message',      fr: 'Envoyer le message' },
  stop:         { es: 'Detener respuesta',   en: 'Stop response',     fr: 'Arrêter la réponse' },
  scrollNew:    { es: 'Nuevos mensajes',     en: 'New messages',      fr: 'Nouveaux messages' },
  clear:        { es: 'Nueva conversación',  en: 'New conversation',  fr: 'Nouvelle conversation' },
  clearConfirm: { es: '¿Borrar toda la conversación? Esta acción no se puede deshacer.',
                   en: 'Clear the whole conversation? This can’t be undone.',
                   fr: 'Effacer toute la conversation ? Action irréversible.' },
  offline:      { es: 'Sin conexión a internet', en: 'No internet connection', fr: 'Pas de connexion internet' },
  errorMsg:     { es: 'Algo salió mal. Intenta de nuevo.', en: 'Something went wrong. Please try again.', fr: 'Une erreur est survenue. Réessayez.' },
  retry:        { es: 'Reintentar',          en: 'Retry',             fr: 'Réessayer' },
  regenerate:   { es: 'Regenerar respuesta', en: 'Regenerate response', fr: 'Régénérer la réponse' },
  copy:         { es: 'Copiar',              en: 'Copy',              fr: 'Copier' },
  copied:       { es: 'Copiado',             en: 'Copied',            fr: 'Copié' },
}
const tx = (k: keyof typeof ui, l: string): string =>
  (ui[k] as Record<string, string>)[l] ?? (ui[k] as Record<string, string>)['es']

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]
const panelTransition: Transition = { duration: 0.24, ease: easing }
const msgTransition: Transition   = { duration: 0.2, ease: easing }
const fabTransition: Transition   = { type: 'spring', stiffness: 340, damping: 22 }

/** Simple, dependency-free responsive check (no ThemeProvider breakpoints required). */
function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(false)
  useLayoutEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])
  return isMobile
}

function formatTime(ms: number | undefined, lang: string) {
  if (!ms) return ''
  try {
    return new Intl.DateTimeFormat(lang || 'es', { hour: '2-digit', minute: '2-digit' }).format(ms)
  } catch {
    return ''
  }
}

function makeWelcome(lang: string): Message {
  return { id: `welcome-${Date.now()}`, role: 'assistant', content: welcomeMsg[lang] ?? welcomeMsg['es'] }
}

/** Loads a saved conversation (and its timestamps) for this language, if any. */
function loadPersisted(lang: string): { messages: Message[]; timestamps: Record<string, number> } {
  if (typeof window === 'undefined') {
    const welcome = makeWelcome(lang)
    return { messages: [welcome], timestamps: { [welcome.id]: Date.now() } }
  }
  try {
    const raw = window.localStorage.getItem(storageKey(lang))
    if (raw) {
      const parsed = JSON.parse(raw) as { id: string; role: 'user' | 'assistant'; content: string; ts: number }[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        const timestamps: Record<string, number> = {}
        parsed.forEach(m => { timestamps[m.id] = m.ts })
        return {
          messages: parsed.map(({ id, role, content }) => ({ id, role, content })),
          timestamps,
        }
      }
    }
  } catch {
    // Corrupt or inaccessible storage — fall back to a fresh conversation.
  }
  const welcome = makeWelcome(lang)
  return { messages: [welcome], timestamps: { [welcome.id]: Date.now() } }
}

export function ChatWidget({ lang }: Props) {
  const [open, setOpen]         = useState(false)
  const [unread, setUnread]     = useState(0)
  const [atBottom, setAtBottom] = useState(true)
  const [isOnline, setIsOnline] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [, forceTick]           = useState(0)

  const scrollRef      = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef        = useRef<HTMLInputElement>(null)
  const isMobile         = useIsMobile()

  const persisted = useMemo(() => loadPersisted(lang), [lang])
  const timestampsRef = useRef<Record<string, number>>(persisted.timestamps)

  const {
    messages, input, handleInputChange, handleSubmit,
    isLoading, error, reload, stop, setMessages, append,
  } = useChat({
    api: '/api/chat',
    body: { lang },
    initialMessages: persisted.messages,
    onFinish: () => {
      if (!open) setUnread(u => u + 1)
    },
  })

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }, [])

  // Auto-scroll only when the user is already near the bottom, so reading
  // older messages while a reply streams in doesn't get yanked away.
  useEffect(() => {
    if (atBottom) scrollToBottom()
  }, [messages, isLoading, atBottom, scrollToBottom])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setAtBottom(distanceFromBottom < 48)
  }, [])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setAtBottom(true)
      const t = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(t)
    }
  }, [open])

  // Lock background scroll while the mobile full-screen sheet is open.
  useEffect(() => {
    if (open && isMobile) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [open, isMobile])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Track connectivity so we can stop people typing into a dead end.
  useEffect(() => {
    setIsOnline(navigator.onLine)
    const goOnline  = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  // Stamp new messages with a timestamp and persist the conversation locally.
  useEffect(() => {
    let addedNew = false
    messages.forEach(m => {
      if (!(m.id in timestampsRef.current)) {
        timestampsRef.current[m.id] = Date.now()
        addedNew = true
      }
    })
    try {
      const toStore = messages.map(m => ({
        id: m.id, role: m.role, content: m.content,
        ts: timestampsRef.current[m.id] ?? Date.now(),
      }))
      window.localStorage.setItem(storageKey(lang), JSON.stringify(toStore))
    } catch {
      // Storage can fail (quota, private mode) — the widget still works, just without persistence.
    }
    if (addedNew) forceTick(t => t + 1)
  }, [messages, lang])

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && input.length <= MAX_LEN && !isLoading && isOnline) {
        handleSubmit(e as unknown as React.FormEvent)
      }
    }
  }

  const handleCopy = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(c => (c === id ? null : c)), 1500)
    } catch {
      // Clipboard API unavailable — silently ignore, nothing broke.
    }
  }

  const clearConversation = () => {
    if (typeof window !== 'undefined' && !window.confirm(tx('clearConfirm', lang))) return
    const welcome = makeWelcome(lang)
    timestampsRef.current = { [welcome.id]: Date.now() }
    setMessages([welcome])
    setAtBottom(true)
    try { window.localStorage.removeItem(storageKey(lang)) } catch { /* ignore */ }
  }

  const sendQuickReply = (text: string) => {
    if (isLoading) return
    append({ role: 'user', content: text })
  }

  const overLimit    = input.length > MAX_LEN
  const nearLimit     = input.length > MAX_LEN - 150
  const canSend       = !!input.trim() && !overLimit && !isLoading && isOnline
  const lastMessage   = messages[messages.length - 1]
  const canRegenerate = !isLoading && messages.length > 1 && lastMessage?.role === 'assistant'
  const showQuickReplies = messages.length === 1 && !isLoading

  const panelStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed', inset: 0, zIndex: 1300,
        display: 'flex', flexDirection: 'column',
        backgroundColor: C.bg, width: '100%', height: '100%',
        borderRadius: 0,
      }
    : {
        position: 'fixed', bottom: 24, right: 24, zIndex: 1200,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        borderRadius: '20px', border: `1px solid ${C.border}`,
        boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
        backgroundColor: C.bg,
        width: 'min(384px, calc(100vw - 32px))',
        height: 'min(600px, calc(100vh - 96px))',
      }

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={fabTransition}
            style={{
              position: 'fixed',
              bottom: 'max(20px, calc(env(safe-area-inset-bottom, 0px) + 16px))',
              right: 'max(20px, env(safe-area-inset-right, 0px))',
              zIndex: 1200,
            }}
          >
            <Tooltip title={tx('open', lang)} placement="left">
              <Fab
                onClick={() => setOpen(true)}
                aria-label={tx('open', lang)}
                sx={{
                  bgcolor: C.accent, color: '#fff',
                  boxShadow: `0 6px 24px ${alpha(C.accent, 0.5)}`,
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease',
                  '&:hover': { bgcolor: C.accentDk, transform: 'scale(1.06)', boxShadow: `0 8px 28px ${alpha(C.accent, 0.6)}` },
                  '&:active': { transform: 'scale(0.96)' },
                  '&:focus-visible': { outline: `2px solid ${C.accentDk}`, outlineOffset: 3 },
                }}
              >
                <FiMessageCircle size={22}/>
              </Fab>
            </Tooltip>
            {unread > 0 && (
              <Box
                aria-label={`${unread} ${tx('scrollNew', lang)}`}
                sx={{
                  position: 'absolute', top: -4, right: -4,
                  minWidth: 20, height: 20, px: '4px', borderRadius: '10px',
                  bgcolor: C.danger, color: '#fff',
                  fontSize: '0.7rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff',
                }}
              >
                {unread > 9 ? '9+' : unread}
              </Box>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={tx('title', lang)}
            initial={isMobile ? { y: '100%' } : { opacity: 0, y: 20, scale: 0.96 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, y: 20, scale: 0.96 }}
            transition={panelTransition}
            style={panelStyle}
          >
            {/* Header */}
            <Box sx={{
              px: 2.5,
              pt: isMobile ? 'max(14px, env(safe-area-inset-top, 0px))' : 1.75,
              pb: 1.75,
              bgcolor: C.accent, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar sx={{
                    width: 36, height: 36,
                    bgcolor: alpha('#fff', 0.2),
                    fontSize: '0.88rem', fontWeight: 700, color: '#fff',
                  }}>D</Avatar>
                  <Box sx={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 10, height: 10, borderRadius: '50%',
                    bgcolor: isOnline ? C.online : C.textMute, border: '2px solid #fff',
                    animation: isOnline ? 'pulse 2s infinite' : 'none',
                    '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.55 } },
                  }}/>
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography noWrap sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff', lineHeight: 1.25 }}>
                    {tx('title', lang)}
                  </Typography>
                  <Typography noWrap sx={{ fontSize: '0.72rem', color: alpha('#fff', 0.85) }}>
                    {!isOnline ? tx('offline', lang) : isLoading ? tx('typing', lang) : tx('online', lang)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, flexShrink: 0 }}>
                <Tooltip title={tx('clear', lang)}>
                  <IconButton
                    onClick={clearConversation}
                    aria-label={tx('clear', lang)}
                    sx={{
                      color: '#fff', p: 1, borderRadius: '10px',
                      transition: 'background-color 0.15s ease',
                      '&:hover': { bgcolor: alpha('#fff', 0.18) },
                      '&:focus-visible': { outline: `2px solid #fff`, outlineOffset: 2 },
                    }}
                  >
                    <FiTrash2 size={isMobile ? 18 : 16}/>
                  </IconButton>
                </Tooltip>
                <IconButton
                  onClick={() => setOpen(false)}
                  aria-label={tx('close', lang)}
                  sx={{
                    color: '#fff', p: 1, borderRadius: '10px',
                    transition: 'background-color 0.15s ease',
                    '&:hover': { bgcolor: alpha('#fff', 0.18) },
                    '&:focus-visible': { outline: `2px solid #fff`, outlineOffset: 2 },
                  }}
                >
                  <FiX size={isMobile ? 22 : 18}/>
                </IconButton>
              </Box>
            </Box>

            {/* Offline banner */}
            <AnimatePresence>
              {!isOnline && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <Box sx={{
                    display: 'flex', alignItems: 'center', gap: 0.75,
                    px: 2, py: 0.75, bgcolor: '#FFF7ED', borderBottom: `1px solid ${C.border}`,
                    color: '#9A5B0F', fontSize: '0.75rem',
                  }}>
                    <FiWifiOff size={13}/> {tx('offline', lang)}
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <Box sx={{ position: 'relative', flex: 1, minHeight: 0 }}>
              <Box
                ref={scrollRef}
                onScroll={handleScroll}
                sx={{
                  height: '100%', overflowY: 'auto', overscrollBehavior: 'contain',
                  px: 2, py: 2,
                  display: 'flex', flexDirection: 'column', gap: 1.5,
                  bgcolor: '#FBFCFE',
                  '&::-webkit-scrollbar': { width: '4px' },
                  '&::-webkit-scrollbar-thumb': { bgcolor: C.border, borderRadius: 2 },
                }}
              >
                {messages.map((m: Message, i: number) => {
                  const isUser = m.role === 'user'
                  const prevSameRole = i > 0 && messages[i - 1].role === m.role
                  const isLastAssistant = m.role === 'assistant' && i === messages.length - 1
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={msgTransition}
                      style={{
                        alignSelf: isUser ? 'flex-end' : 'flex-start',
                        maxWidth: '84%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                        marginTop: prevSameRole ? -4 : 0,
                      }}
                    >
                      <Box sx={{
                        px: 1.75, py: 1.1,
                        bgcolor: isUser ? C.accent : '#fff',
                        color:   isUser ? '#fff'    : C.text,
                        border:  isUser ? 'none'    : `1px solid ${C.border}`,
                        boxShadow: isUser ? `0 2px 8px ${alpha(C.accent, 0.28)}` : '0 1px 2px rgba(11,15,43,0.04)',
                        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        fontSize: '0.86rem', lineHeight: 1.6,
                        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                      }}>
                        {m.content}
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.4, px: 0.5 }}>
                        <Typography sx={{ fontSize: '0.65rem', color: C.textMute }}>
                          {formatTime(timestampsRef.current[m.id], lang)}
                        </Typography>

                        {!isUser && (
                          <Tooltip title={copiedId === m.id ? tx('copied', lang) : tx('copy', lang)}>
                            <IconButton
                              size="small"
                              onClick={() => handleCopy(m.id, m.content)}
                              aria-label={tx('copy', lang)}
                              sx={{ p: 0.3, color: C.textMute, '&:hover': { color: C.accentDk } }}
                            >
                              {copiedId === m.id ? <FiCheck size={11}/> : <FiCopy size={11}/>}
                            </IconButton>
                          </Tooltip>
                        )}

                        {isLastAssistant && canRegenerate && (
                          <Tooltip title={tx('regenerate', lang)}>
                            <IconButton
                              size="small"
                              onClick={() => reload()}
                              aria-label={tx('regenerate', lang)}
                              sx={{ p: 0.3, color: C.textMute, '&:hover': { color: C.accentDk } }}
                            >
                              <FiRefreshCw size={11}/>
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </motion.div>
                  )
                })}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    <Box sx={{
                      px: 1.75, py: 1.2, bgcolor: '#fff',
                      border: `1px solid ${C.border}`,
                      boxShadow: '0 1px 2px rgba(11,15,43,0.04)',
                      borderRadius: '16px 16px 16px 4px',
                      display: 'flex', gap: 0.5, alignItems: 'center',
                    }}>
                      {[0, 1, 2].map(i => (
                        <Box key={i} sx={{
                          width: 6, height: 6, borderRadius: '50%', bgcolor: C.accent,
                          animation: `bounce 1s ${i * 0.15}s infinite`,
                          '@keyframes bounce': {
                            '0%,100%': { transform: 'translateY(0)', opacity: 0.5 },
                            '50%':     { transform: 'translateY(-4px)', opacity: 1 },
                          },
                        }}/>
                      ))}
                    </Box>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    style={{ alignSelf: 'flex-start', maxWidth: '90%' }}
                  >
                    <Box sx={{
                      display: 'flex', alignItems: 'center', gap: 1,
                      px: 1.5, py: 1, borderRadius: '12px',
                      bgcolor: C.dangerBg, border: `1px solid ${alpha(C.danger, 0.25)}`,
                    }}>
                      <FiAlertCircle size={15} color={C.danger}/>
                      <Typography sx={{ fontSize: '0.78rem', color: '#7F1D1D', flex: 1 }}>
                        {tx('errorMsg', lang)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => reload()}
                        aria-label={tx('retry', lang)}
                        sx={{
                          bgcolor: C.danger, color: '#fff', width: 26, height: 26,
                          '&:hover': { bgcolor: '#DC2626' },
                        }}
                      >
                        <FiRefreshCw size={12}/>
                      </IconButton>
                    </Box>
                  </motion.div>
                )}

                {showQuickReplies && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{ alignSelf: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: '100%' }}
                  >
                    {(quickReplies[lang] ?? quickReplies['es']).map(qr => (
                      <Chip
                        key={qr}
                        label={qr}
                        onClick={() => sendQuickReply(qr)}
                        sx={{
                          bgcolor: C.accentBg, color: C.accentDk, fontSize: '0.75rem',
                          border: `1px solid ${C.accentLine}`,
                          '&:hover': { bgcolor: alpha(C.accent, 0.15) },
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Screen-reader announcement for the latest reply, without visual duplication. */}
                <Box sx={{
                  position: 'absolute', width: 1, height: 1, overflow: 'hidden',
                  clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap',
                }} aria-live="polite">
                  {!isLoading && lastMessage?.role === 'assistant' ? lastMessage.content : ''}
                </Box>

                <div ref={messagesEndRef}/>
              </Box>

              {/* Jump-to-latest affordance when scrolled up */}
              <AnimatePresence>
                {!atBottom && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)' }}
                  >
                    <IconButton
                      onClick={() => { setAtBottom(true); scrollToBottom() }}
                      aria-label={tx('scrollNew', lang)}
                      size="small"
                      sx={{
                        bgcolor: C.accent, color: '#fff', width: 34, height: 34,
                        boxShadow: `0 4px 12px ${alpha(C.accent, 0.4)}`,
                        '&:hover': { bgcolor: C.accentDk },
                      }}
                    >
                      <FiArrowDown size={16}/>
                    </IconButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            {/* Input */}
            <Box
              component="form"
              onSubmit={(e) => { e.preventDefault(); if (canSend) handleSubmit(e) }}
              sx={{
                px: 1.5,
                pt: 1.25,
                pb: isMobile ? 'max(12px, env(safe-area-inset-bottom, 0px))' : 1.25,
                borderTop: `1px solid ${C.border}`,
                display: 'flex', flexDirection: 'column', gap: 0.5,
                flexShrink: 0, bgcolor: C.bg,
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <TextField
                  fullWidth size="small" multiline maxRows={4}
                  inputRef={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKey}
                  disabled={!isOnline}
                  placeholder={placeholder[lang] ?? placeholder['es']}
                  inputProps={{ 'aria-label': placeholder[lang] ?? placeholder['es'] }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '14px', fontSize: '0.86rem', bgcolor: C.accentBg,
                      transition: 'background-color 0.15s ease',
                      '& fieldset': { borderColor: overLimit ? C.danger : C.accentLine },
                      '&:hover fieldset': { borderColor: overLimit ? C.danger : C.accent },
                      '&.Mui-focused fieldset': { borderColor: overLimit ? C.danger : C.accent, borderWidth: 1.5 },
                      '&.Mui-disabled': { bgcolor: alpha(C.accentBg, 0.5) },
                    },
                  }}
                />
                {isLoading ? (
                  <Tooltip title={tx('stop', lang)}>
                    <IconButton
                      type="button"
                      onClick={() => stop()}
                      aria-label={tx('stop', lang)}
                      sx={{
                        bgcolor: C.text, color: '#fff',
                        borderRadius: '14px', width: 42, height: 42, flexShrink: 0,
                        transition: 'transform 0.15s ease, background-color 0.15s ease',
                        '&:hover': { bgcolor: '#1a2040' },
                        '&:active': { transform: 'scale(0.92)' },
                      }}
                    >
                      <FiPause size={16}/>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton
                    type="submit"
                    disabled={!canSend}
                    aria-label={tx('send', lang)}
                    sx={{
                      bgcolor: C.accent, color: '#fff',
                      borderRadius: '14px', width: 42, height: 42, flexShrink: 0,
                      transition: 'transform 0.15s ease, background-color 0.15s ease',
                      '&:hover': { bgcolor: C.accentDk },
                      '&:active': { transform: 'scale(0.92)' },
                      '&.Mui-disabled': { bgcolor: alpha(C.accent, 0.3), color: '#fff' },
                      '&:focus-visible': { outline: `2px solid ${C.accentDk}`, outlineOffset: 2 },
                    }}
                  >
                    <FiSend size={16}/>
                  </IconButton>
                )}
              </Box>
              {nearLimit && (
                <Typography sx={{
                  alignSelf: 'flex-end', fontSize: '0.68rem',
                  color: overLimit ? C.danger : C.textMute, pr: 0.5,
                }}>
                  {input.length}/{MAX_LEN}
                </Typography>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}