// src/App.tsx
import React, { useEffect, useState } from 'react';
import logo from "./utils/logo.png";
import './App.css';

import { Link } from 'react-router-dom'; // Importa Link
// import { setupEventListeners } from "./utils/effects"; // Solo si es global, si no, muévelo a AppRouter o a la vista específica.
// NO importamos VehiculosList ni ModalForm aquí, ya que serán parte de las vistas.
// import { VehiculosList } from "./components/comps";
// import { ModalForm } from "./components/forms";

// Importa AppRouter
import AppRouter from './AppRouter';

function App() {
  const [id, setId] = useState('');

  // La lógica para setupEventListeners y el fetch a la API
  // debe ejecutarse una vez para el layout global o por cada vista
  // Si setupEventListeners afecta elementos de todo el DOM, déjalo aquí.
  // Si el fetch del ID es para toda la app, déjalo aquí.
  useEffect(() => {
    // setupEventListeners(); // Si es necesario para el layout general
    /*
    fetch('http://localhost:3000/api',{
      mode: 'cors'
    }).then( res => {
      return res.json()
    }).then(data => {
      setId(data.res)
    })
    */
  }, []);

  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [isLightMode]);

  // Si isModalOpen y ModalForm son para toda la aplicación y se abren desde el sidebar,
  // entonces mantén el estado aquí y pasa las props al ModalForm.
  // Si el modal es específico de una vista, muévelo a esa vista.
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="app-icon">
              <img src={logo} className="img-logo" alt="App Logo" />
            </div>
          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/vehiculos">
                <span>Automóviles</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/patios">
                <span>Patios</span>
              </Link>
            </li>
            
          </ul>
          <div className="account-info">
            <div className="account-info-picture">
              <img
                src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHx3b21hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="Account"
              />
            </div>
            <div className="account-info-name">Usuario</div>
            <button className="account-info-more">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-horizontal"
              >
                <circle cx={12} cy={12} r={1} />
                <circle cx={19} cy={12} r={1} />
                <circle cx={5} cy={12} r={1} />
              </svg>
            </button>
          </div>
        </div>
        {/* Aquí es donde AppRouter renderizará el contenido de la vista actual */}
        {/* Mover el botón de switch de tema y ModalForm aquí si son globales */}
        
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
