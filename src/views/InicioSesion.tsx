// src/views/Productos.tsx
import React from 'react';

const InicioSesion = () => {
  return (
    <div className='Main-Cont-Login'>
      <h1>Ford</h1>
      <div className="login-container">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="login-form">
          <h3 className='Text-Info'>Inicio de Sesión</h3>

          <label htmlFor="username" className='Text-Info'>Usuario</label>
          <input type="text" placeholder="Username" id="username" className='Text-Info'/>

          <label htmlFor="password" className='Text-Info'>Contraseña</label>
          <input type="password" placeholder="Password" id="password" className='Text-Info'/>

          <button type="submit">Inicia sesión</button>
          
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;