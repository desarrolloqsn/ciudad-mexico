import axios from "axios";


// export function cargarDatos() {
//   const datos = require('./../datos/datos_globales_graficos.json');

//   return {
//     type: 'CARGAR_DATOS',
//     datos: datos
//   };
// };
const FROM_HOME = true; 
const endPoint = 'http://190.2.16.169:3080';
export function getClient() {
    return async function (dispatch) {
      try {
        let results = await axios.get(`http://localhost:8085/clients/`)
          
        // console.log("CLIENTES",results.data);
        return dispatch({
          type: "GET_CLIENTE",
          payload: results.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "GET_CLIENTE_ERROR",
          payload: error.message,
        });
      }
    };
  }

  


  export function getUsers() {
    return async function (dispatch) {
      try {
        let results = await axios.get(`http://localhost:8085/users/`)
        // console.log("USUARIOS",results.data);
        dispatch({
          type: "GET_USUARIOS",
          payload: results.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "GET_USUARIOS_ERROR",
          payload: error.message,
        });
      }
    };
  }
  
  export function getRoles() {
    return async function (dispatch) {
      try {
        let results = await axios.get(`http://localhost:8085/roles/`)
        // console.log("ROLES",results.data);
        dispatch({
          type: "GET_ROLES",
          payload: results.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "GET_ROLES_ERROR",
          payload: error.message,
        });
      }
    };
  }


  export function postClient(valores) {
    return async function (dispatch) {
      try {
        let results = await axios.post(`http://localhost:8085/clients/`, valores)
        // console.log("Clientes",results.data);
        dispatch({
          type: "POST_CLIENTE",
          payload: results.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "POST_CLIENTE_ERROR",
          payload: error.message,
        });
      }
    };
  }

  export function postUsuarios(valores) {
    return async function (dispatch) {
      try {
        let results = await axios.post(`http://localhost:8085/users/`, valores)
        // console.log("Usuarios",results.data);
        dispatch({
          type: "POST_USUARIO",
          payload: results.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "POST_USUARIO_ERROR",
          payload: error.message,
        });
      }
    };
  }

 

  export const presenciaEnRedesSociales = (datos) => {
    //  console.log("DATOS REDUX",datos)
    return {
      type: 'PRESENCIA_EN_REDES_SOCIALES',
      datos
    };
  };

 
  
  // export const filtrarDatos = (serie, subserie, palabra, sinpalabra, fechaInicio, fechaFin) => {
  //   return {
  //     type: 'FILTRAR_DATOS',
  //     serie,
  //     subserie,
  //     palabra,
  //     sinpalabra,
  //     fechaFin,
  //     fechaInicio
  //   };
  // };

  export const filtrarDatos = (filtros) => {
    return {
      type: 'FILTRAR_DATOS',
      filtros
    };
  };

  export const filtrarDatosSubserie = (subserie) => {
    return {
      type: 'FILTRAR_DATOS_SUBSERIE',
      subserie
    };
  };

  export const filtrarDatosPorTitulo = (palabra) => {
    return {
      type: 'FILTRAR_DATOS_TITULO',
      palabra: palabra
    };
  };


  
  export const filtrarDatosPorTituloNoContiene = (sinpalabra) => {
    return {
      type: 'FILTRAR_DATOS_TITULO_NO_CONTIENE',
      sinpalabra: sinpalabra
    };
  };
  
  export const guardarFechas = (fechaInicio, fechaFin) => ({
    type: 'GUARDAR_FECHAS',
    fechaInicio,
    fechaFin,
  });
  
  export const guardarHoras = (horaInicio, horaFin) => ({
    type: 'GUARDAR_HORAS',
    horaInicio,
    horaFin,
  });


  export const filtrarTweets = (fechaInicio, fechaFin) => {
    return {
      type: 'FILTRAR_TWEETS',
      fechaInicio,
      fechaFin,
     
    };
  };
 


  ////////////////AUTH 
  export const loginSuccess = (user) => {
    return {
      type: 'LOGIN_SUCCESS',
      payload: user,
    };
  };
  
  // export const loginFailure = (error) => {
  //   return {
  //     type: 'LOGIN_FAILURE',
  //     payload: error,
  //   };
  // };
  
  export const logout = () => {
    return {
      type: 'LOGOUT',
    };
  };