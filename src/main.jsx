import React from 'react';
import { createRoot } from 'react-dom/client';

/* Tokens and base styles must land in the bundle BEFORE any component
   stylesheet, otherwise global rules win every equal-specificity tie
   and component media queries silently lose. */
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
