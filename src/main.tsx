import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CartProvider } from './hooks/cartContext';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </StrictMode>
);

