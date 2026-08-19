// File: frontend-datheon/packages/shared/src/ui/theme/theme.ts
// src\theme\theme.ts
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00AEEF',
    },
    secondary: {
      main: '#7FFF00',
    },
    background: {
      default: '#0B0F2B',
      paper: '#121735',
    },
    text: {
      primary: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
})
