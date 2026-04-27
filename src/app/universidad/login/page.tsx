import { SignIn } from '@clerk/nextjs'
import { Box } from '@mui/material'

export default function LoginPage() {
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#0A0C10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <SignIn forceRedirectUrl="/universidad"/>
    </Box>
  )
}