// File: frontend-datheon/src/app/universidad/[curso]/[subseccion]/loading.tsx
"use client"
import { Box } from '@mui/material'

export default function Loading() {
  return (
    <Box sx={{ bgcolor: '#0A0C10', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top bar skeleton */}
      <Box sx={{ height: 48, borderBottom: '1px solid rgba(255,255,255,0.07)', px: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 80, height: 14, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }}/>
        <Box sx={{ width: 1, height: 14, bgcolor: 'rgba(255,255,255,0.06)' }}/>
        <Box sx={{ width: 200, height: 14, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite 0.2s' }}/>
        <Box sx={{ flex: 1 }}/>
        <Box sx={{ width: 100, height: 6, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite 0.3s' }}/>
      </Box>

      {/* Tabs skeleton */}
      <Box sx={{ height: 44, borderBottom: '1px solid rgba(255,255,255,0.07)', px: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        {[80, 70].map((w, i) => (
          <Box key={i} sx={{ width: w, height: 12, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)', animation: `pulse 1.5s ease-in-out infinite ${i*0.15}s` }}/>
        ))}
      </Box>

      {/* Content skeleton */}
      <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ width: 240, height: 22, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.08)', animation: 'pulse 1.5s ease-in-out infinite' }}/>
        {[100, 85, 92, 70, 88, 60, 95].map((w, i) => (
          <Box key={i} sx={{ width: `${w}%`, height: 14, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', animation: `pulse 1.5s ease-in-out infinite ${i*0.1}s` }}/>
        ))}
        <Box sx={{ mt: 2, width: '100%', height: 120, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s ease-in-out infinite 0.5s' }}/>
        {[78, 65, 90].map((w, i) => (
          <Box key={i} sx={{ width: `${w}%`, height: 14, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', animation: `pulse 1.5s ease-in-out infinite ${0.6+i*0.1}s` }}/>
        ))}
      </Box>

      {/* Footer skeleton */}
      <Box sx={{ height: 64, borderTop: '1px solid rgba(255,255,255,0.07)', px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ width: 120, height: 36, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }}/>
        <Box sx={{ width: 160, height: 36, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite 0.2s' }}/>
      </Box>
    </Box>
  )
}