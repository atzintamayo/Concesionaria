// src/main.tsx (o index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // O './main.css'
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve tu componente App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);