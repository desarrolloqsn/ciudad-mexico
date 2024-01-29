import { Route, Routes,} from 'react-router';
import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './contenedores/Login';
import Dashboard from './contenedores/Dashboard/Dashboard.jsx';
import ModificarCliente from './contenedores/Clientes/Modificar';
import Perfil from './contenedores/Perfil';
import Series from './contenedores/Series';
import Nav from './componentes/Nav';
import DashGrafos from './contenedores/Dashboard/DashboardGrafos';
import DashModelo from './contenedores/Dashboard/DashboardModelo';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Informes from './contenedores/Informe/informes/src/components/Informes/Informes';
import GrafoComunidadesSolo from './componentes/Graficos/GrafoComunidadesSolo';
import { Navigate } from 'react-router-dom';
import Error404 from './contenedores/404/index.jsx';
import { loginSuccess } from './redux/actions';





const theme = {
  background: '#f5f8fb',
  fontFamily: 'sans-serif',
  headerBgColor: '#00284e',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#00284e',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

function App() {
  const user = useSelector((state) => state.user);

  const clientes = useSelector(state => state.clientes);
  const usuarios = useSelector(state => state.usuarios);
  const roles = useSelector(state => state.roles)
  const dispatch = useDispatch()

  useEffect(()=>{

  },[user])
  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getClient());
  //     await dispatch(getUsers());
  //     await dispatch(getRoles());
  //   })();
  
  // }, [dispatch]);
  
  // useEffect(() => {
  //   console.log(clientes);
  // }, [clientes]);
  
  // useEffect(() => {
  //   console.log(usuarios);
  // }, [usuarios]);
  
  // useEffect(() => {
  //   console.log(roles);
  // }, [roles]);
 



  // const steps = [
  //   {
  //     id: 'intro',
  //     message: '¡Hola! ¿En qué gráfico puedo ayudarte?',
  //     trigger: 'opcionGrafico',
  //   },
  //   {
  //     id: 'opcionGrafico',
  //     options: [
  //       { value: 'lineaEventos', label: 'Línea de Eventos', trigger: 'explicacionLineaEventos' },
  //       { value: 'presenciaRedes', label: 'Presencia en Redes Sociales', trigger: 'explicacionPresenciaRedes' },
  //       { value: 'eventosHora', label: 'Eventos por Día y Hora', trigger: 'explicacionEventosHora' },
  //       { value: 'palabrasClave', label: 'Palabras Clave', trigger: 'explicacionPalabrasClave' },
  //       { value: 'genero', label: 'Género', trigger: 'explicacionGenero' },
  //       { value: 'modelos', label: 'Modelos', trigger: 'explicacionModelos' },
  //       {value: 'mas', label: '...', trigger:'masopciones'}
     
  //     ],
  //   },

  //   {
  //     id: 'masopciones',
  //     options: [
  //       { value: 'modelosDiarios', label: 'Modelos Diarios', trigger: 'explicacionModelosDiarios' },
  //       { value: 'hashtags', label: 'Hashtags', trigger: 'explicacionHashtags' },
  //       { value: 'eventosAutores', label: 'Eventos/Autores', trigger: 'explicacionEventosAutores' },
  //       { value: 'polaridad', label: 'Polaridad', trigger: 'explicacionPolaridad' },
  //       { value: 'atributos', label: 'Atributos', trigger: 'explicacionAtributos' },
  //       { value: 'categorizacion', label: 'Categorización', trigger: 'explicacionCategorizacion' },
  //       { value: 'bigramas', label: 'Bigramas', trigger: 'explicacionBigramas' },
  //       { value: 'tigramas', label: 'Tigramas', trigger: 'explicacionTigramas' },
  //       { value: 'grafos', label: 'Grafos', trigger: 'opcionGrafos' },
  //       {value: 'anterior' , label:  '←' , trigger: 'intro'} 
  //     ],
  //   },

  //   {
  //     id: 'explicacionLineaEventos',
  //     message: 'Aquí está la explicación sobre la Línea de Eventos.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionPresenciaRedes',
  //     message: 'Aquí está la explicación sobre la Presencia en Redes Sociales.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionEventosHora',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionPalabrasClave',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionGenero',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionModelos',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionModelosDiarios',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionHashtags',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionEventosAutores',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionPolaridad',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionAtributos',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionCategorizacion',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionBigramas',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionTigramas',
  //     message: 'Aquí está la explicación sobre los Eventos por Día y Hora.',
  //     end: true,
  //   },
  

  //   // Agrega más pasos de explicación para cada opción de gráfico según sea necesario...
  
  //   {
  //     id: 'opcionGrafos',
  //     options: [
  //       { value: 'palabrasFrecuentes', label: 'Palabras más Frecuentes', trigger: 'explicacionPalabrasFrecuentes' },
  //       { value: 'hashtagsFrecuentes', label: 'Hashtags más Frecuentes', trigger: 'explicacionHashtagsFrecuentes' },
  //       { value: 'tendencias', label: 'Tendencias en las Conversaciones', trigger: 'explicacionTendencias' },
  //       { value: 'atributosPoliticos', label: 'Atributos de Políticos', trigger: 'explicacionAtributosPoliticos' },
  //       { value: 'interaccionInfluencia', label: 'Interacción e Influencia en las Conversaciones', trigger: 'explicacionInteraccionInfluencia' },
  //       { value: 'comunidadesRedes', label: 'Comunidades en Redes Sociales', trigger: 'explicacionComunidadesRedes' },
  //     ],
  //   },
  //   {
  //     id: 'explicacionPalabrasFrecuentes',
  //     message: 'Aquí está la explicación sobre las palabras más frecuentes en los grafos.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionHashtagsFrecuentes',
  //     message: 'Aquí está la explicación sobre los hashtags más frecuentes en los grafos.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionTendencias',
  //     message: 'Aquí está la explicación sobre las tendencias en las conversaciones de los grafos.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionAtributosPoliticos',
  //     message: 'Aquí está la explicación sobre los atributos de los políticos en los grafos.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionInteraccionInfluencia',
  //     message: 'Aquí está la explicación sobre la interacción e influencia en las conversaciones de los grafos.',
  //     end: true,
  //   },
  //   {
  //     id: 'explicacionComunidadesRedes',
  //     message: 'Aquí está la explicación sobre las comunidades en redes sociales en los grafos.',
  //     end: true,
  //   },
  // ];

  useEffect(() => {
    // Verificar si hay usuario y contraseña almacenados en el localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
   // Si se encuentran almacenados, realizar el inicio de sesión automáticamente
   if (storedUsername === "analistas" ||storedPassword === "qsnvzla" && storedPassword === "qsn123" || storedPassword === "qsnvzla2023") {
    const user = {
      username: storedUsername,
      roles: ['user'],
    };
    dispatch(loginSuccess(user));
  }
    
   
  }, [dispatch]);
  
  return (
    
    <div className="App">  
    <ThemeProvider theme={theme}>
      {/* <ChatBot steps={steps} floating placeholder="Escribe aquí tu mensaje..."   /> */}
    </ThemeProvider>

    {/* <Routes>
        <Route path="/" element={<Login />} />
        <PrivateRoute path="/informes" element={<Informes />} />
        <PrivateRoute path="/dashboard/*" element={<DashboardContainer />} />
    </Routes> */}
    
    <Routes> 

        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        {user && (
          <>
          <Route
            path="/dashboard/*"
            element={
              <>
                <DashboardContainer />
              </>
            }
          />
          <Route path="/informes" element={<Informes />} />
          </>
        )}
        <Route path="*" element={<Login />} />
      </Routes>

       {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/informes" element={<Informes />} />
        <Route
          path="/dashboard/*"
          element={
            <DashboardContainer />
          }
        />
      </Routes> */}
    </div>
  );
}

function DashboardContainer() {
 
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/grafos" element={<DashGrafos />} />
        <Route path="/grafoComunidades" element={<GrafoComunidadesSolo />} />
         <Route path="/modificarcliente" element={<ModificarCliente />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/series" element={<Series />} />
        <Route path="/Atributos" element={<DashModelo />} />
        <Route path="/Clima social" element={<DashModelo />} />
        <Route path="/Continuidad y cambio" element={<DashModelo />} />
        <Route path="/Emociones Básicas (Plutchik)" element={<DashModelo />} />
        <Route path="/Preocupaciones" element={<DashModelo />} />
        {/* <Route path="/Preocupaciones - Ven" element={<DashModelo />} /> */}
        <Route path="/Red motivacional del voto" element={<DashModelo />} />
        <Route path="/Sentimientos" element={<DashModelo />} />
        {/* <Route path="/Voto Emocional y Racional" element={<DashModelo />} /> */}
        
      </Routes>
     
    </>
  );
}

export default App;
