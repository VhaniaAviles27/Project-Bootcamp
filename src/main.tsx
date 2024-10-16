import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CatalogPage from './pages/CatalogPage.tsx'
import ResumePage from './pages/ResumePage.tsx'
import { CartProvider } from './hooks/cart.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
    < CatalogPage /> 
    < ResumePage />
    </CartProvider>
    
  </StrictMode>
)
