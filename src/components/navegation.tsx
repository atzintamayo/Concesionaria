// src/components/Navegacion.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link

const Navegacion = () => {
  return (

    <ul className="sidebar-list">
        <li className="sidebar-list-item">
            <a href="#">
                <Link to="../views/InicioSesion.tsx">Inicio de Sesión</Link>
                <span>Home</span>
            </a>
        </li>
        <li className="sidebar-list-item">
            <a href="#">
                <span>Automoviles</span>
            </a>
        </li>

    </ul>
  );
};

export default Navegacion;