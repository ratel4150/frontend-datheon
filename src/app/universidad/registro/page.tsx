import { SignUp } from '@clerk/nextjs'
import { Box } from '@mui/material'

export default function RegistroPage() {
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#0A0C10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <SignUp forceRedirectUrl="/universidad"/>
    </Box>
  )
}