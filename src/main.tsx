import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initSquircles } from '@/lib/squircle'
import { initSounds } from '@/lib/sound'

initSquircles()
initSounds()
// micro-animations start hidden from the first paint, so nothing flashes (see useReveal)
document.documentElement.classList.add('reveal-ready')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
