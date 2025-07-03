// src/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus vistas
import InicioSesion from './views/InicioSesion';
import Patios from './views/Patios';
import VehiculosView from './views/VehiculosView'; // Tu nueva vista de vehículos

const AppRouter = () => {
  return (
    // <Router> debe envolver todo el AppRouter para que los Links funcionen.
    // Si App.tsx ya envuelve todo con <Router>, no lo necesitas aquí de nuevo.
    // Para la estructura que estamos construyendo, App.tsx ya lo contiene.
    // Solo necesitamos Routes y Route.
    <Routes>
      {/* Ruta para la página de inicio (Inicio de Sesión) */}
      <Route path="/" element={<InicioSesion />} />

      {/* Ruta para la vista de Patios */}
      <Route path="/patios" element={<Patios />} />

      {/* Ruta para la nueva vista de Vehículos */}
      <Route path="/vehiculos" element={<VehiculosView />} />

      {/* Rutas para otras vistas que puedas crear */}
      {/* <Route path="/inbox" element={<InboxView />} /> */}
      {/* <Route path="/notifications" element={<NotificationsView />} /> */}

      {/* Opcional: Ruta para 404 Not Found */}
      {/* <Route path="*" element={<div><h1>404 - Página no encontrada</h1></div>} /> */}
    </Routes>
  );
};

export default AppRouter;
