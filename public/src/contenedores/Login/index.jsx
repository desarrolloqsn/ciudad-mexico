import React, { useState } from 'react';
import imagen from './../../imagenes/ImagenLogIn.jpg';
import logo from './../../imagenes/LogoHead.png';
import './login.css';
import FormLogin from '../../componentes/Formularios/Login/index.jsx';
import FormCambiarContraseña from '../../componentes/Formularios/RecuperarContraseña';

export default function Login() {
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const handlePasswordReset = () => {
    setIsPasswordReset(true);
  };

  return (
    <div className='contenedor-login'>
      <div className={`contenedor-mitad-login mitad-login ${isPasswordReset ? 'slide-right' : ''}`}>
      <div>
          <img src={logo} alt="logo" className='logo-login'/>
        </div>
        {!isPasswordReset ?
        <div className='formlogin'>
          <div className='iniciar-sesion-login'>Iniciar sesión</div>
          <FormLogin/>
          {/* <a onClick={handlePasswordReset} className='login-form-forgot' >RECUPERAR CONTRASEÑA</a> */}
        </div>
       : 
       <div className='formlogin'>
       <div className='iniciar-sesion-login'>Cambiar contraseña</div>
       <FormCambiarContraseña/>
      
     </div>
      }
        
        <div className='copyrigth'>Copyright © 2023 QSocialNow</div>
      </div>

      <div className={`contenedor-mitad-login mitad-login2 ${isPasswordReset ? 'slide-left' : ''}`}>
        <img src={imagen} alt="img" className='imagen-login'/>
      </div>
    </div>
  );
}