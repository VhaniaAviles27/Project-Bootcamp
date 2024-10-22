import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CatalogPage from './pages/CatalogPage.tsx'
import ResumePage from './pages/ResumePage.tsx'
import { CartProvider } from './hooks/cartContext.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </Router>
    </CartProvider>
  </StrictMode>
)
