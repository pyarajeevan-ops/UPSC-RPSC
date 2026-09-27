// Suppress Vite dev server HMR websocket errors in preview iframe
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const msg = typeof reason === 'string' ? reason : (reason?.message || String(reason || ''));
  if (
    msg.includes('WebSocket') ||
    msg.includes('websocket') ||
    msg.includes('closed without opened') ||
    msg.includes('failed to connect to websocket')
  ) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
});

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
