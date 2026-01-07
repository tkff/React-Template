import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { initSentry } from './providers/sentry';
import './i18n'; // Initialize i18n
import './styles/index.css';

// Initialize Sentry (only active when VITE_SENTRY_DSN is set)
initSentry();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
