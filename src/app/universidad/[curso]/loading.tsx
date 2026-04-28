// File: frontend-datheon/src/app/universidad/[curso]/loading.tsx
"use client"
import { Box } from '@mui/material'

export default function Loading() {
  return (
    <Box sx={{ bgcolor: '#0A0C10', minHeight: '100vh', color: '#F1F5F9' }}>
      {/* Header */}
      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.07)', px: 4, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 60, height: 14, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }}/>
      </Box>

      <Box sx={{ maxWidth: 860, mx: 'auto', px: 4, py: 6 }}>
        {/* Hero */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ width: 60, height: 60, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }}/>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ width: 200, height: 22, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.08)', animation: 'pulse 1.5s ease-in-out infinite' }}/>
            <Box sx={{ width: 300, height: 14, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s ease-in-out infinite 0.1s' }}/>
          </Box>
        </Box>

        {/* Progress card */}
        <Box sx={{ borderRadius: 3, bgcolor: 'rgba(255,255,255,0.03)', p: 2.5, mb: 4 }}>
          <Box sx={{ width: '100%', height: 8, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }}/>
        </Box>

        {/* Block skeletons */}
        {[1,2,3].map(i => (
          <Box key={i} sx={{ mb: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', p: 2.5, animation: `pulse 1.5s ease-in-out infinite ${i*0.15}s` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.06)' }}/>
              <Box sx={{ width: 180, height: 16, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)' }}/>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}