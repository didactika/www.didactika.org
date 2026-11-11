import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Resources from './Resources.tsx'
import { getPageLang } from './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Resources lang={getPageLang()} />
  </StrictMode>,
)
