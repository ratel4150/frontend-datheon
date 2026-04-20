// File: frontend-datheon/src/app/(lang)/components/ChatWidget.tsx
'use client'

import {
  Box, Typography, TextField, IconButton,
  Avatar, Fab, alpha,
} from '@mui/material'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'
import { Message, useChat } from 'ai/react'
import { useRef, useEffect, useState, BaseSyntheticEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Tokens ──────────────────────────────────────────────────
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
} as const

type Props = { lang: string }

const welcomeMsg = {
  es: '¡Hola! Soy el asistente de Datheón. ¿En qué puedo ayudarte hoy?',
  en: "Hi! I'm Datheón's assistant. How can I help you today?",
  fr: "Bonjour! Je suis l'assistant de Datheón. Comment puis-je vous aider?",
}

const placeholder = {
  es: 'Escribe tu pregunta...',
  en: 'Type your question...',
  fr: 'Écrivez votre question...',
}

const ui = {
  title:   { es: 'Asistente Datheón', en: 'Datheón Assistant', fr: 'Assistant Datheón' },
  online:  { es: 'En línea',          en: 'Online',            fr: 'En ligne'          },
  typing:  { es: 'Escribiendo...',    en: 'Typing...',         fr: 'En train d\'écrire...' },
}
const tx = (k: keyof typeof ui, l: string) =>
  (ui[k] as Record<string, string>)[l] ?? (ui[k] as Record<string, string>)['es']

export function ChatWidget({ lang }: Props) {
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { lang },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: welcomeMsg[lang as keyof typeof welcomeMsg] ?? welcomeMsg.es,
      },
    ],
    onFinish: () => {
      if (!open) setUnread(u => u + 1)
    },
  })

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input al abrir
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])
const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit(e as unknown as BaseSyntheticEvent)
  }
}

  return (
    <>
      {/* ── FAB ── */}
      <AnimatePresence>
        {!open && (
          <Box
            component={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}
          >
            <Fab
              onClick={() => setOpen(true)}
              sx={{
                bgcolor: C.accent,
                color: '#fff',
                boxShadow: `0 4px 20px ${alpha(C.accent, 0.45)}`,
                '&:hover': { bgcolor: C.accentDk },
              }}
            >
              <FiMessageCircle size={22}/>
            </Fab>

            {/* Badge de no leídos */}
            {unread > 0 && (
              <Box sx={{
                position: 'absolute', top: -4, right: -4,
                width: 20, height: 20, borderRadius: '50%',
                bgcolor: '#EF4444', color: '#fff',
                fontSize: '0.7rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff',
              }}>
                {unread}
              </Box>
            )}
          </Box>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              position: 'fixed',
              bottom: 24, right: 24,
              zIndex: 1200,
              width: { xs: 'calc(100vw - 32px)', sm: 370 },
              height: 520,
              bgcolor: C.bg,
              borderRadius: '20px',
              border: `1px solid ${C.border}`,
              boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box sx={{
              px: 2.5, py: 1.75,
              bgcolor: C.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                {/* Avatar con punto online */}
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 34, height: 34,
                      bgcolor: alpha('#fff', 0.2),
                      fontSize: '0.85rem', fontWeight: 700, color: '#fff',
                    }}
                  >
                    D
                  </Avatar>
                  <Box sx={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 9, height: 9, borderRadius: '50%',
                    bgcolor: '#22C55E',
                    border: '1.5px solid #fff',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%,100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}/>
                </Box>

                <Box>
                  <Typography sx={{
                    fontWeight: 700, fontSize: '0.88rem', color: '#fff', lineHeight: 1.2,
                  }}>
                    {tx('title', lang)}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: alpha('#fff', 0.8) }}>
                    {tx('online', lang)}
                  </Typography>
                </Box>
              </Box>

              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  color: '#fff', p: 0.5,
                  '&:hover': { bgcolor: alpha('#fff', 0.15) },
                  borderRadius: '8px',
                }}
              >
                <FiX size={18}/>
              </IconButton>
            </Box>

            {/* Messages */}
            <Box sx={{
              flex: 1, overflowY: 'auto', p: 2,
              display: 'flex', flexDirection: 'column', gap: 1.25,
              '&::-webkit-scrollbar': { width: '3px' },
              '&::-webkit-scrollbar-thumb': { bgcolor: C.border, borderRadius: 2 },
            }}>
              {messages.map((m:Message) => (
                <Box
                  key={m.id}
                  component={motion.div}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  sx={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                  }}
                >
                  <Box sx={{
                    px: 1.75, py: 1.1,
                    bgcolor: m.role === 'user' ? C.accent : C.accentBg,
                    color: m.role === 'user' ? '#fff' : C.text,
                    border: m.role === 'user' ? 'none' : `1px solid ${C.accentLine}`,
                    borderRadius: m.role === 'user'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    fontSize: '0.83rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {m.content}
                  </Box>
                </Box>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  <Box sx={{
                    px: 1.75, py: 1.1,
                    bgcolor: C.accentBg,
                    border: `1px solid ${C.accentLine}`,
                    borderRadius: '18px 18px 18px 4px',
                    display: 'flex', gap: 0.5, alignItems: 'center',
                  }}>
                    {[0, 1, 2].map(i => (
                      <Box key={i} sx={{
                        width: 6, height: 6, borderRadius: '50%',
                        bgcolor: C.accent,
                        animation: `bounce 1s ${i * 0.15}s infinite`,
                        '@keyframes bounce': {
                          '0%,100%': { transform: 'translateY(0)' },
                          '50%': { transform: 'translateY(-4px)' },
                        },
                      }}/>
                    ))}
                  </Box>
                </Box>
              )}

              <div ref={messagesEndRef}/>
            </Box>

            {/* Input */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                px: 1.5, py: 1.25,
                borderTop: `1px solid ${C.border}`,
                display: 'flex', gap: 1, alignItems: 'center',
                flexShrink: 0, bgcolor: C.bg,
              }}
            >
              <TextField
                fullWidth
                size="small"
                multiline
                maxRows={3}
                inputRef={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKey}
                placeholder={placeholder[lang as keyof typeof placeholder] ?? placeholder.es}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    fontSize: '0.83rem',
                    bgcolor: C.accentBg,
                    '& fieldset': { borderColor: C.accentLine },
                    '&:hover fieldset': { borderColor: C.accent },
                    '&.Mui-focused fieldset': { borderColor: C.accent, borderWidth: 1 },
                  },
                }}
              />
              <IconButton
                type="submit"
                disabled={isLoading || !input.trim()}
                sx={{
                  bgcolor: C.accent, color: '#fff',
                  borderRadius: '12px',
                  width: 38, height: 38,
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: C.accentDk },
                  '&.Mui-disabled': {
                    bgcolor: alpha(C.accent, 0.3),
                    color: '#fff',
                  },
                }}
              >
                <FiSend size={15}/>
              </IconButton>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </>
  )
}