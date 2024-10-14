import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CatalogPage from './pages/CatalogPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CatalogPage />
  </StrictMode>
)
