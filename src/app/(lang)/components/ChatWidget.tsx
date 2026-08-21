// File: app/(lang)/components/ChatWidget.tsx
'use client'

import {
  Box, Typography, TextField, IconButton,
  Avatar, Fab, alpha, Tooltip, Chip,
} from '@mui/material'
import {
  FiMessageCircle, FiX, FiSend, FiArrowDown,
  FiRefreshCw, FiCopy, FiCheck, FiTrash2, FiWifiOff, FiPause, FiAlertCircle,
  FiExternalLink, FiPaperclip, FiMic, FiThumbsUp, FiThumbsDown,
} from 'react-icons/fi'
import { Message, useChat } from 'ai/react'
import { usePathname } from 'next/navigation'
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

type AuthUser = { name?: string; company?: string; role?: string }
type Props = { lang: string; user?: AuthUser }

type ActionCard = {
  type: 'calendly_cta'
  title: string
  body: string
  buttonLabel: string
  url: string
}
type TurnData = { action?: ActionCard | null; suggestions?: string[] }

const MAX_LEN = 4000
const MAX_ATTACHMENT_MB = 4
const NUDGE_DELAY_MS = 30_000
const STORAGE_PREFIX = 'datheon-chat-'
const VISITED_KEY = 'datheon-visited-pages'
const storageKey = (lang: string) => `${STORAGE_PREFIX}${lang}`

const welcomeMsg: Record<string, string> = {
  es: '¡Hola! Soy el asistente de Datheón. ¿En qué puedo ayudarte hoy?',
  en: "Hi! I'm Datheón's assistant. How can I help you today?",
  fr: "Bonjour! Je suis l'assistant de Datheón. Comment puis-je vous aider?",
}

const greetingWithUser: Record<string, (u: AuthUser) => string> = {
  es: u => `¡Hola${u.name ? `, ${u.name}` : ''}! Soy el asistente de Datheón${u.company ? ` — vi que eres de ${u.company}` : ''}. ¿En qué puedo ayudarte hoy?`,
  en: u => `Hi${u.name ? ` ${u.name}` : ''}! I'm Datheón's assistant${u.company ? ` — good to see someone from ${u.company}` : ''}. How can I help you today?`,
  fr: u => `Bonjour${u.name ? ` ${u.name}` : ''} ! Je suis l'assistant de Datheón${u.company ? ` — ravi de voir quelqu'un de ${u.company}` : ''}. Comment puis-je vous aider ?`,
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

// FAQs contestadas al instante, sin llamar al backend. Solo hechos ya
// verificados en otro lugar (el propio system prompt / el link de Calendly)
// — no es un lugar para inventar datos de la empresa.
type FaqEntry = { patterns: string[]; answer: string }
const FAQS: Record<string, FaqEntry[]> = {
  es: [
    {
      patterns: ['que hace datheon', 'que es datheon', 'a que se dedican', 'a que se dedica datheon'],
      answer: 'Datheón es una consultora tecnológica: construimos SaaS con IA y agentes autónomos, apps web y móvil, integraciones IoT, infraestructura cloud/DevOps y ERPs Odoo a medida.',
    },
    {
      patterns: ['como los contacto', 'como agendo', 'link de calendly', 'agendar una llamada', 'quiero agendar'],
      answer: 'Puedes agendar una llamada directamente aquí: calendly.com/d/cv8d-jjp-nhd',
    },
  ],
  en: [
    {
      patterns: ['what does datheon do', 'what is datheon', 'what do you do'],
      answer: "Datheón is a tech consultancy: we build AI SaaS and autonomous agents, web and mobile apps, IoT integrations, cloud/DevOps infrastructure, and custom Odoo ERPs.",
    },
    {
      patterns: ['how do i contact you', 'how do i book', 'calendly link', 'book a call'],
      answer: 'You can book a call directly here: calendly.com/d/cv8d-jjp-nhd',
    },
  ],
  fr: [
    {
      patterns: ['que fait datheon', "qu'est-ce que datheon", 'que faites-vous'],
      answer: "Datheón est une société de conseil technologique : SaaS avec IA et agents autonomes, applications web et mobiles, intégrations IoT, infrastructure cloud/DevOps et ERP Odoo sur mesure.",
    },
    {
      patterns: ['comment vous contacter', 'comment reserver', 'lien calendly'],
      answer: 'Vous pouvez réserver un appel ici : calendly.com/d/cv8d-jjp-nhd',
    },
  ],
}

const nudgePrompt: Record<string, string> = {
  es: 'Envíame esta información por correo, por favor.',
  en: 'Please send me this information by email.',
  fr: 'Merci de m’envoyer ces informations par e-mail.',
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
  attach:       { es: 'Adjuntar archivo',    en: 'Attach file',       fr: 'Joindre un fichier' },
  removeAttach: { es: 'Quitar adjunto',      en: 'Remove attachment', fr: 'Retirer la pièce jointe' },
  tooBig:       { es: `El archivo es muy grande (máx. ${MAX_ATTACHMENT_MB}MB).`,
                   en: `File is too large (max ${MAX_ATTACHMENT_MB}MB).`,
                   fr: `Fichier trop volumineux (max ${MAX_ATTACHMENT_MB} Mo).` },
  voice:        { es: 'Dictar por voz',      en: 'Voice input',       fr: 'Saisie vocale' },
  listening:    { es: 'Escuchando...',       en: 'Listening...',      fr: 'Écoute...' },
  up:           { es: 'Respuesta útil',      en: 'Helpful',           fr: 'Utile' },
  down:         { es: 'Respuesta no útil',   en: 'Not helpful',       fr: 'Pas utile' },
  nudgeCta:     { es: 'Enviar por correo',   en: 'Email it to me',    fr: 'Envoyer par e-mail' },
  nudgeDismiss: { es: 'No, gracias',         en: 'No thanks',         fr: 'Non merci' },
}
const nudgeText: Record<string, string> = {
  es: '¿Sigues ahí? Puedo enviarte esta información por correo si prefieres.',
  en: 'Still there? I can email you this instead.',
  fr: 'Toujours là ? Je peux vous l’envoyer par e-mail.',
}
const tx = (k: keyof typeof ui, l: string): string =>
  (ui[k] as Record<string, string>)[l] ?? (ui[k] as Record<string, string>)['es']

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]
const panelTransition: Transition = { duration: 0.24, ease: easing }
const msgTransition: Transition   = { duration: 0.2, ease: easing }
const fabTransition: Transition   = { type: 'spring', stiffness: 340, damping: 22 }

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

function uid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

function matchFaq(lang: string, text: string): string | null {
  const entries = FAQS[lang] ?? FAQS.es
  const norm = normalize(text)
  if (norm.length < 3) return null
  for (const entry of entries) {
    if (entry.patterns.some(p => norm.includes(normalize(p)))) return entry.answer
  }
  return null
}

function makeWelcome(lang: string, user?: AuthUser): Message {
  const content = user?.name
    ? (greetingWithUser[lang] ?? greetingWithUser.es)(user)
    : (welcomeMsg[lang] ?? welcomeMsg['es'])
  return { id: `welcome-${Date.now()}`, role: 'assistant', content }
}

/** Loads a saved conversation (and its timestamps) for this language, if any. */
function loadPersisted(lang: string, user?: AuthUser): { messages: Message[]; timestamps: Record<string, number> } {
  if (typeof window === 'undefined') {
    const welcome = makeWelcome(lang, user)
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
  const welcome = makeWelcome(lang, user)
  return { messages: [welcome], timestamps: { [welcome.id]: Date.now() } }
}

export function ChatWidget({ lang, user }: Props) {
  const [open, setOpen]         = useState(false)
  const [unread, setUnread]     = useState(0)
  const [atBottom, setAtBottom] = useState(true)
  const [isOnline, setIsOnline] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [votes, setVotes]       = useState<Record<string, 'up' | 'down'>>({})
  const [attachment, setAttachment]           = useState<{ name: string; type: string; dataUrl: string } | null>(null)
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const [isListening, setIsListening]         = useState(false)
  const [showNudge, setShowNudge]             = useState(false)
  const [, forceTick]           = useState(0)

  const scrollRef       = useRef<HTMLDivElement>(null)
  const messagesEndRef  = useRef<HTMLDivElement>(null)
  const inputRef         = useRef<HTMLInputElement>(null)
  const fileInputRef     = useRef<HTMLInputElement>(null)
  const recognitionRef   = useRef<any>(null)
  const nudgeShownRef    = useRef(false)
  const nudgeTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visitedRef       = useRef<string[]>([])
  const isMobile          = useIsMobile()
  const pathname          = usePathname()

  const persisted = useMemo(
    () => loadPersisted(lang, user),
    [lang, user?.name, user?.company, user?.role], // eslint-disable-line react-hooks/exhaustive-deps
  )
  const timestampsRef = useRef<Record<string, number>>(persisted.timestamps)

  // Contexto de navegación: URL actual + últimas páginas visitadas, para que
  // el backend pueda inyectárselo al prompt ("veo que estás en /servicios...").
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = JSON.parse(window.sessionStorage.getItem(VISITED_KEY) ?? '[]')
      if (Array.isArray(stored)) visitedRef.current = stored
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !pathname) return
    if (visitedRef.current[visitedRef.current.length - 1] !== pathname) {
      visitedRef.current = [...visitedRef.current, pathname].slice(-10)
      try { window.sessionStorage.setItem(VISITED_KEY, JSON.stringify(visitedRef.current)) } catch { /* ignore */ }
    }
  }, [pathname])

  const {
    messages, input, handleInputChange, handleSubmit,
    isLoading, error, reload, stop, setMessages, append,
    data, setData, setInput,
  } = useChat({
    api: '/api/chat',
    body: {
      lang,
      page_context: {
        url: typeof window !== 'undefined' ? window.location.href : '',
        path: pathname ?? '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        visited: visitedRef.current,
      },
      user: user?.name ? { name: user.name, company: user.company, role: user.role } : undefined,
      ...(attachment
        ? { attachments: [{ name: attachment.name, type: attachment.type, data_url: attachment.dataUrl }] }
        : {}),
    },
    initialMessages: persisted.messages,
    onFinish: () => {
      if (!open) setUnread(u => u + 1)
    },
    // El backend habla el protocolo de "data stream" de Vercel AI SDK
    // (líneas "0:texto", "2:data", "3:error", "d:finishReason") — lo dejamos
    // explícito para no depender de que el default del SDK no cambie.
    streamProtocol: 'data',
    keepLastMessageOnError: true,
    onError: (err) => {
      if (err?.name !== 'AbortError') {
        console.error('[ChatWidget] fallo al hablar con /api/chat:', err)
      }
    },
  })

  // Escribe en el input funcione o no `setInput` según la versión del SDK.
  const updateInput = useCallback((value: string) => {
    if (setInput) {
      setInput(value)
    } else {
      handleInputChange({ target: { value } } as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }, [setInput, handleInputChange])

  const resetTurnData = useCallback(() => {
    setData?.([])
  }, [setData])

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }, [])

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

  useEffect(() => {
    if (open && isMobile) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [open, isMobile])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

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
    } catch { /* storage can fail — widget still works without persistence */ }
    if (addedNew) forceTick(t => t + 1)
  }, [messages, lang])

  // Nudge de inactividad: 30s sin actividad tras una respuesta, una sola vez
  // por conversación para no ser insistente.
  useEffect(() => {
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current)
    setShowNudge(false)
    if (!open || isLoading || nudgeShownRef.current || messages.length < 2) return
    nudgeTimerRef.current = setTimeout(() => {
      setShowNudge(true)
      nudgeShownRef.current = true
    }, NUDGE_DELAY_MS)
    return () => { if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current) }
  }, [messages, isLoading, open])

  // Cortar cualquier respuesta en curso si el widget se desmonta.
  useEffect(() => {
    return () => stop()
  }, [stop])

  // Detener el reconocimiento de voz si el componente se desmonta.
  useEffect(() => {
    return () => { recognitionRef.current?.stop?.() }
  }, [])

  const handleCopy = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(c => (c === id ? null : c)), 1500)
    } catch { /* clipboard unavailable — ignore */ }
  }

  const clearConversation = () => {
    if (typeof window !== 'undefined' && !window.confirm(tx('clearConfirm', lang))) return
    const welcome = makeWelcome(lang, user)
    timestampsRef.current = { [welcome.id]: Date.now() }
    setMessages([welcome])
    setAtBottom(true)
    resetTurnData()
    nudgeShownRef.current = false
    try { window.localStorage.removeItem(storageKey(lang)) } catch { /* ignore */ }
  }

  const sendQuickReply = (text: string) => {
    if (isLoading) return
    resetTurnData()
    append({ role: 'user', content: text })
  }

  const regenerate = () => {
    resetTurnData()
    reload()
  }

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSend) return

    const faqAnswer = matchFaq(lang, input)
    resetTurnData()

    if (faqAnswer) {
      // Respondido localmente: ni un token de Groq gastado en esto.
      const userMsg: Message = { id: uid(), role: 'user', content: input }
      const assistantMsg: Message = { id: uid(), role: 'assistant', content: faqAnswer }
      setMessages(prev => [...prev, userMsg, assistantMsg])
      updateInput('')
      setAttachment(null)
      setAtBottom(true)
      return
    }

    handleSubmit(e)
    setAttachment(null)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (canSend) submitMessage(e as unknown as React.FormEvent)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > MAX_ATTACHMENT_MB * 1024 * 1024) {
      setAttachmentError(tx('tooBig', lang))
      return
    }
    setAttachmentError(null)
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAttachment({ name: file.name, type: file.type, dataUrl: reader.result })
      }
    }
    reader.readAsDataURL(file)
  }

  const voiceSupported = typeof window !== 'undefined'
    && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)

  const toggleVoice = () => {
    if (!voiceSupported) return
    if (isListening) {
      recognitionRef.current?.stop?.()
      return
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SR()
    recognition.lang = lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (e: any) => {
      const transcript = e.results?.[0]?.[0]?.transcript
      if (transcript) updateInput(`${input} ${transcript}`.trim())
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  const sendFeedback = async (messageId: string, rating: 'up' | 'down') => {
    setVotes(v => ({ ...v, [messageId]: rating }))
    const idx = messages.findIndex(m => m.id === messageId)
    const assistantMsg = messages[idx]
    const userMsg = [...messages.slice(0, idx)].reverse().find(m => m.role === 'user')
    try {
      await fetch('/api/chat/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message_id: messageId,
          rating,
          lang,
          user_message: userMsg?.content,
          assistant_message: assistantMsg?.content,
        }),
      })
    } catch { /* feedback is best-effort */ }
  }

  const dismissNudge = () => setShowNudge(false)
  const acceptNudge = () => {
    setShowNudge(false)
    sendQuickReply(nudgePrompt[lang] ?? nudgePrompt.es)
  }

  const overLimit    = input.length > MAX_LEN
  const nearLimit     = input.length > MAX_LEN - 150
  const canSend       = !!input.trim() && !overLimit && !isLoading && isOnline
  const lastMessage   = messages[messages.length - 1]
  const canRegenerate = !isLoading && messages.length > 1 && lastMessage?.role === 'assistant'

  // Reseteamos `data` al inicio de cada turno, así que durante un turno solo
  // debería haber a lo más un evento — el más reciente enviado por el backend.
  const latestData: TurnData | null = data && data.length > 0 ? (data[data.length - 1] as TurnData) : null
  const actionCard = !isLoading ? latestData?.action ?? null : null
  const suggestionsToShow = !isLoading
    ? (latestData?.suggestions?.length ? latestData.suggestions : (messages.length === 1 ? (quickReplies[lang] ?? quickReplies.es) : null))
    : null

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
                  const vote = votes[m.id]
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
                          <>
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

                            <Tooltip title={tx('up', lang)}>
                              <IconButton
                                size="small"
                                onClick={() => sendFeedback(m.id, 'up')}
                                aria-label={tx('up', lang)}
                                aria-pressed={vote === 'up'}
                                sx={{ p: 0.3, color: vote === 'up' ? C.online : C.textMute, '&:hover': { color: C.online } }}
                              >
                                <FiThumbsUp size={11}/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={tx('down', lang)}>
                              <IconButton
                                size="small"
                                onClick={() => sendFeedback(m.id, 'down')}
                                aria-label={tx('down', lang)}
                                aria-pressed={vote === 'down'}
                                sx={{ p: 0.3, color: vote === 'down' ? C.danger : C.textMute, '&:hover': { color: C.danger } }}
                              >
                                <FiThumbsDown size={11}/>
                              </IconButton>
                            </Tooltip>

                            {isLastAssistant && canRegenerate && (
                              <Tooltip title={tx('regenerate', lang)}>
                                <IconButton
                                  size="small"
                                  onClick={regenerate}
                                  aria-label={tx('regenerate', lang)}
                                  sx={{ p: 0.3, color: C.textMute, '&:hover': { color: C.accentDk } }}
                                >
                                  <FiRefreshCw size={11}/>
                                </IconButton>
                              </Tooltip>
                            )}
                          </>
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
                        onClick={regenerate}
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

                {/* Tarjeta accionable generada por el backend (ej. CTA de Calendly) */}
                {actionCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    style={{ alignSelf: 'flex-start', maxWidth: '92%' }}
                  >
                    <Box sx={{
                      p: 1.5, borderRadius: '14px', bgcolor: '#fff',
                      border: `1px solid ${C.accentLine}`, boxShadow: `0 2px 10px ${alpha(C.accent, 0.12)}`,
                    }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: C.text, mb: 0.4 }}>
                        {actionCard.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: C.textMid, mb: 1, lineHeight: 1.5 }}>
                        {actionCard.body}
                      </Typography>
                      <Box
                        component="a" href={actionCard.url} target="_blank" rel="noopener noreferrer"
                        sx={{
                          display: 'inline-flex', alignItems: 'center', gap: 0.6,
                          px: 1.5, py: 0.75, borderRadius: '10px',
                          bgcolor: C.accent, color: '#fff', fontSize: '0.78rem', fontWeight: 600,
                          textDecoration: 'none',
                          '&:hover': { bgcolor: C.accentDk },
                        }}
                      >
                        {actionCard.buttonLabel} <FiExternalLink size={12}/>
                      </Box>
                    </Box>
                  </motion.div>
                )}

                {/* Sugerencias: dinámicas del backend, o las iniciales en el primer turno */}
                {suggestionsToShow && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ alignSelf: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: '100%' }}
                  >
                    {suggestionsToShow.map(qr => (
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

                {/* Nudge por inactividad */}
                <AnimatePresence>
                  {showNudge && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ alignSelf: 'flex-start', maxWidth: '92%' }}
                    >
                      <Box sx={{
                        p: 1.25, borderRadius: '12px', bgcolor: C.accentBg,
                        border: `1px solid ${C.accentLine}`,
                      }}>
                        <Typography sx={{ fontSize: '0.78rem', color: C.textMid, mb: 0.75 }}>
                          {nudgeText[lang] ?? nudgeText.es}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.75 }}>
                          <Chip size="small" label={tx('nudgeCta', lang)} onClick={acceptNudge}
                            sx={{ bgcolor: C.accent, color: '#fff', fontSize: '0.72rem', '&:hover': { bgcolor: C.accentDk } }}/>
                          <Chip size="small" label={tx('nudgeDismiss', lang)} onClick={dismissNudge} variant="outlined"
                            sx={{ fontSize: '0.72rem', borderColor: C.accentLine, color: C.textMid }}/>
                        </Box>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Anuncio para lectores de pantalla, sin duplicar visualmente */}
                <Box sx={{
                  position: 'absolute', width: 1, height: 1, overflow: 'hidden',
                  clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap',
                }} aria-live="polite">
                  {!isLoading && lastMessage?.role === 'assistant' ? lastMessage.content : ''}
                </Box>

                <div ref={messagesEndRef}/>
              </Box>

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
              onSubmit={submitMessage}
              sx={{
                px: 1.5,
                pt: 1.25,
                pb: isMobile ? 'max(12px, env(safe-area-inset-bottom, 0px))' : 1.25,
                borderTop: `1px solid ${C.border}`,
                display: 'flex', flexDirection: 'column', gap: 0.5,
                flexShrink: 0, bgcolor: C.bg,
              }}
            >
              {attachment && (
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 1, px: 1, py: 0.5,
                  bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`, borderRadius: '10px',
                }}>
                  {attachment.type.startsWith('image/') ? (
                    <Box component="img" src={attachment.dataUrl} alt={attachment.name}
                      sx={{ width: 28, height: 28, borderRadius: '6px', objectFit: 'cover' }}/>
                  ) : (
                    <FiPaperclip size={14} color={C.accentDk}/>
                  )}
                  <Typography noWrap sx={{ fontSize: '0.72rem', color: C.textMid, flex: 1 }}>
                    {attachment.name}
                  </Typography>
                  <IconButton size="small" onClick={() => setAttachment(null)} aria-label={tx('removeAttach', lang)} sx={{ p: 0.3 }}>
                    <FiX size={12}/>
                  </IconButton>
                </Box>
              )}
              {attachmentError && (
                <Typography sx={{ fontSize: '0.68rem', color: C.danger }}>{attachmentError}</Typography>
              )}

              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end' }}>
                <input
                  ref={fileInputRef} type="file" accept="image/*,application/pdf"
                  onChange={handleFileSelect} style={{ display: 'none' }}
                />
                <Tooltip title={tx('attach', lang)}>
                  <IconButton
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!isOnline}
                    aria-label={tx('attach', lang)}
                    sx={{ color: C.textMute, flexShrink: 0, '&:hover': { color: C.accentDk } }}
                  >
                    <FiPaperclip size={17}/>
                  </IconButton>
                </Tooltip>

                {voiceSupported && (
                  <Tooltip title={isListening ? tx('listening', lang) : tx('voice', lang)}>
                    <IconButton
                      onClick={toggleVoice}
                      disabled={!isOnline}
                      aria-label={tx('voice', lang)}
                      sx={{
                        color: isListening ? C.danger : C.textMute, flexShrink: 0,
                        animation: isListening ? 'pulse 1.2s infinite' : 'none',
                        '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } },
                        '&:hover': { color: C.accentDk },
                      }}
                    >
                      <FiMic size={17}/>
                    </IconButton>
                  </Tooltip>
                )}

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