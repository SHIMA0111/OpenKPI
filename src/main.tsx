import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/UserContext'

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    50: '#e6f6ff',
    100: '#b3e0ff',
    500: '#0078d4',
    600: '#0067b8',
    700: '#005a9e',
  },
}

const theme = extendTheme({ colors })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </StrictMode>,
)
