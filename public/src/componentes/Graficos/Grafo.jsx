import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Collapse, Tooltip, Button, Select } from 'antd';
import video from './../../imagenes/AtributosPoliticos.mp4'
import imagen from './../../imagenes/grafo.png'

// //FILTRO FECHAS
// import json from './../../datos/datos_globales_grafo_atributos_politicos.json'
// import jsonFechas from './../../datos/rango_fechas.json'
// //FIN FILTRO FECHAS
// const { Panel } = Collapse;
// const text = `
// Este grafo representa una comparación entre dos políticos basada en tweets relacionados con ellos. Cada político tiene atributos asignados que están rodeados por las palabras que formaron dicho atributo y se mencionaron en los tweets.`;



export default function Graph2(){

  const [network, setNetwork] = useState();
  const [data, setData] = useState();
  const [displayGrafoTendencias, setdisplayGrafoTendencias] = useState('none');
  const [showGraphTendencias, setShowGraphTendencias] = useState(false);
  const [display, setDisplay] = useState(true)
//FILTRO FECHAS
// const [fechas, setFechas] = useState(jsonFechas.fechas)
// const [filtroFecha, setFiltroFecha] = useState(fechas[0])

// const opciones = fechas.map((fecha, index) => {
//   return (
//     <Select.Option key={index} value={fecha}>
//       {fecha}
//     </Select.Option>
//   );
// });

// const handleFiltroFechaChange = (valor) => {
//   setFiltroFecha(valor);
//   // console.log(valor)
// };
// // FIN FILTRO FECHAS

//   function handleDisplay(){
//     setDisplay(!display)
//   }

//   useEffect(() => {
//     window.addEventListener('error', e => {
//         if (e.message === 'ResizeObserver loop limit exceeded') {
//             const resizeObserverErrDiv = document.getElementById(
//                 'webpack-dev-server-client-overlay-div'
//             );
//             const resizeObserverErr = document.getElementById(
//                 'webpack-dev-server-client-overlay'
//             );
//             if (resizeObserverErr) {
//                 resizeObserverErr.setAttribute('style', 'display: none');
//             }
//             if (resizeObserverErrDiv) {
//                 resizeObserverErrDiv.setAttribute('style', 'display: none');
//             }
//         }
//     });
// }, []);

  
  
  // useEffect(() => {
  //   const drawGraph = () => {
  //     const container = document.getElementById('mynetwork2');

  //     // parsing and collecting nodes and edges from the python
  //     const nodes = new DataSet(json[filtroFecha][0])
  //     const edges = new DataSet(json[filtroFecha][1])
  //                 // const nodes = new DataSet([{"color": ["blue", "yellow"], "font": {"color": "white"}, "id": "Marcelo Ebrard", "label": "Marcelo Ebrard", "shape": "dot", "size": 11}, {"color": "green", "font": {"color": "white"}, "id": "Capacidad de gestion(m)", "label": "Capacidad de gestion(m)", "shape": "dot", "size": 3}, {"color": "green", "font": {"color": "white"}, "id": "Ineptitud de gestion(m)", "label": "Ineptitud de gestion(m)", "shape": "dot", "size": 4}, {"color": "green", "font": {"color": "white"}, "id": "Falta de autoridad(m)", "label": "Falta de autoridad(m)", "shape": "dot", "size": 4}, {"color": "green", "font": {"color": "white"}, "id": "Popular(m)", "label": "Popular(m)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Cerrado al dialogo(m)", "label": "Cerrado al dialogo(m)", "shape": "dot", "size": 3}, {"color": "green", "font": {"color": "white"}, "id": "Honestidad(m)", "label": "Honestidad(m)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Deshonestidad(m)", "label": "Deshonestidad(m)", "shape": "dot", "size": 3}, {"color": "green", "font": {"color": "white"}, "id": "No defensa de lo nacional(m)", "label": "No defensa de lo nacional(m)", "shape": "dot", "size": 4}, {"color": "green", "font": {"color": "white"}, "id": "Inpopular(m)", "label": "Inpopular(m)", "shape": "dot", "size": 5}, {"color": "green", "font": {"color": "white"}, "id": "Incoherencia(m)", "label": "Incoherencia(m)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Autoridad(m)", "label": "Autoridad(m)", "shape": "dot", "size": 15}, {"color": ["blue", "yellow"], "font": {"color": "white"}, "id": "Claudia Sheinbaum", "label": "Claudia Sheinbaum", "shape": "dot", "size": 14}, {"color": "green", "font": {"color": "white"}, "id": "Capacidad de gestion(c)", "label": "Capacidad de gestion(c)", "shape": "dot", "size": 3}, {"color": "green", "font": {"color": "white"}, "id": "Ineptitud de gestion(c)", "label": "Ineptitud de gestion(c)", "shape": "dot", "size": 6}, {"color": "green", "font": {"color": "white"}, "id": "Respeto institucional(c)", "label": "Respeto institucional(c)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Falta de autoridad(c)", "label": "Falta de autoridad(c)", "shape": "dot", "size": 6}, {"color": "green", "font": {"color": "white"}, "id": "Popular(c)", "label": "Popular(c)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Incompetencia comunicativa(c)", "label": "Incompetencia comunicativa(c)", "shape": "dot", "size": 4}, {"color": "green", "font": {"color": "white"}, "id": "Irresponsable(c)", "label": "Irresponsable(c)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Ignorancia(c)", "label": "Ignorancia(c)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Honestidad(c)", "label": "Honestidad(c)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Deshonestidad(c)", "label": "Deshonestidad(c)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Inpopular(c)", "label": "Inpopular(c)", "shape": "dot", "size": 3}, {"color": "green", "font": {"color": "white"}, "id": "Incoherencia(c)", "label": "Incoherencia(c)", "shape": "dot", "size": 4}, {"color": "green", "font": {"color": "white"}, "id": "Experiencia(c)", "label": "Experiencia(c)", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "Autoridad(c)", "label": "Autoridad(c)", "shape": "dot", "size": 8}, {"color": "green", "font": {"color": "white"}, "id": "es un pol\u00edtico eficiente", "label": "es un pol\u00edtico eficiente", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "inauguraron", "label": "inauguraron", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "no funciona", "label": "no funciona", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "peor", "label": "peor", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "peores", "label": "peores", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "cobarde", "label": "cobarde", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "pusil\u00e1nime", "label": "pusil\u00e1nime", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "payaso", "label": "payaso", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "crecer en las encuestas", "label": "crecer en las encuestas", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "censurar", "label": "censurar", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "censura", "label": "censura", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "no roba", "label": "no roba", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "es un hip\u00f3crita", "label": "es un hip\u00f3crita", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "es mentiroso", "label": "es mentiroso", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "traidores a la patria", "label": "traidores a la patria", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "mercenario", "label": "mercenario", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "mercenarios", "label": "mercenarios", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "perdedor", "label": "perdedor", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "perdedores", "label": "perdedores", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "desplome", "label": "desplome", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "bajo en las encuestas", "label": "bajo en las encuestas", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "ahora resulta que", "label": "ahora resulta que", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "a gusto", "label": "a gusto", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "un gusto", "label": "un gusto", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "me gusta", "label": "me gusta", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "nos gusta", "label": "nos gusta", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "les gusta", "label": "les gusta", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "agrada", "label": "agrada", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "agradan", "label": "agradan", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "agrade", "label": "agrade", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "grato", "label": "grato", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "gratos", "label": "gratos", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "encanta", "label": "encanta", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "amena", "label": "amena", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "interesa", "label": "interesa", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "interesan", "label": "interesan", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "es emprendedor", "label": "es emprendedor", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "inauguraci\u00f3n", "label": "inauguraci\u00f3n", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "no funcionan", "label": "no funcionan", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "es una inepta", "label": "es una inepta", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "respetando la ley", "label": "respetando la ley", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "mansa", "label": "mansa", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "vulnerable", "label": "vulnerable", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "vulnerables", "label": "vulnerables", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "bufon", "label": "bufon", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "creciendo en las encuestas", "label": "creciendo en las encuestas", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "incongruente", "label": "incongruente", "shape": "dot", "size": 2}, {"color": "green", "font": {"color": "white"}, "id": "no dice nada", "label": "no dice nada", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "no dicen nada", "label": "no dicen nada", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "demagogia", "label": "demagogia", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "sabe nada", "label": "sabe nada", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "es recto", "label": "es recto", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "es corrupto", "label": "es corrupto", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "derrota", "label": "derrota", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "impresentable", "label": "impresentable", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "impresentables", "label": "impresentables", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "son expertos", "label": "son expertos", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "grata", "label": "grata", "shape": "dot", "size": 1}, {"color": "green", "font": {"color": "white"}, "id": "encantar", "label": "encantar", "shape": "dot", "size": 1}]);
  //                 // const edges = new DataSet([{"from": "Marcelo Ebrard", "ocurrencia": 3, "to": "Capacidad de gestion(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 23, "to": "Ineptitud de gestion(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 7, "to": "Falta de autoridad(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 4, "to": "Popular(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 2, "to": "Cerrado al dialogo(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 4, "to": "Honestidad(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 2, "to": "Deshonestidad(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 4, "to": "No defensa de lo nacional(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 3, "to": "Inpopular(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 3, "to": "Incoherencia(m)", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 61, "to": "Autoridad(m)", "width": 1}, {"from": "Capacidad de gestion(m)", "ocurrencia": 2, "to": "es un pol\u00edtico eficiente", "width": 1}, {"from": "Capacidad de gestion(m)", "ocurrencia": 1, "to": "inauguraron", "width": 1}, {"from": "Ineptitud de gestion(m)", "ocurrencia": 3, "to": "no funciona", "width": 1}, {"from": "Ineptitud de gestion(m)", "ocurrencia": 20, "to": "peor", "width": 1}, {"from": "Ineptitud de gestion(m)", "ocurrencia": 3, "to": "peores", "width": 1}, {"from": "Falta de autoridad(m)", "ocurrencia": 3, "to": "cobarde", "width": 1}, {"from": "Falta de autoridad(m)", "ocurrencia": 1, "to": "pusil\u00e1nime", "width": 1}, {"from": "Falta de autoridad(m)", "ocurrencia": 3, "to": "payaso", "width": 1}, {"from": "Popular(m)", "ocurrencia": 4, "to": "crecer en las encuestas", "width": 1}, {"from": "Cerrado al dialogo(m)", "ocurrencia": 2, "to": "censurar", "width": 1}, {"from": "Cerrado al dialogo(m)", "ocurrencia": 2, "to": "censura", "width": 1}, {"from": "Honestidad(m)", "ocurrencia": 4, "to": "no roba", "width": 1}, {"from": "Deshonestidad(m)", "ocurrencia": 1, "to": "es un hip\u00f3crita", "width": 1}, {"from": "Deshonestidad(m)", "ocurrencia": 1, "to": "es mentiroso", "width": 1}, {"from": "No defensa de lo nacional(m)", "ocurrencia": 2, "to": "traidores a la patria", "width": 1}, {"from": "No defensa de lo nacional(m)", "ocurrencia": 2, "to": "mercenario", "width": 1}, {"from": "No defensa de lo nacional(m)", "ocurrencia": 2, "to": "mercenarios", "width": 1}, {"from": "Inpopular(m)", "ocurrencia": 1, "to": "perdedor", "width": 1}, {"from": "Inpopular(m)", "ocurrencia": 1, "to": "perdedores", "width": 1}, {"from": "Inpopular(m)", "ocurrencia": 1, "to": "desplome", "width": 1}, {"from": "Inpopular(m)", "ocurrencia": 1, "to": "bajo en las encuestas", "width": 1}, {"from": "Incoherencia(m)", "ocurrencia": 3, "to": "ahora resulta que", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 2, "to": "a gusto", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 3, "to": "un gusto", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 8, "to": "me gusta", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 1, "to": "nos gusta", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 1, "to": "les gusta", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 3, "to": "agrada", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 3, "to": "agradan", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 8, "to": "agrade", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 2, "to": "grato", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 1, "to": "gratos", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 1, "to": "encanta", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 21, "to": "amena", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 12, "to": "interesa", "width": 1}, {"from": "Autoridad(m)", "ocurrencia": 9, "to": "interesan", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 3, "to": "Capacidad de gestion(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 31, "to": "Ineptitud de gestion(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 1, "to": "Respeto institucional(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 9, "to": "Falta de autoridad(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 1, "to": "Popular(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 4, "to": "Incompetencia comunicativa(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 1, "to": "Irresponsable(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 1, "to": "Ignorancia(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 7, "to": "Honestidad(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 1, "to": "Deshonestidad(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 2, "to": "Inpopular(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 4, "to": "Incoherencia(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 1, "to": "Experiencia(c)", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 11, "to": "Autoridad(c)", "width": 1}, {"from": "Capacidad de gestion(c)", "ocurrencia": 2, "to": "es emprendedor", "width": 1}, {"from": "Capacidad de gestion(c)", "ocurrencia": 1, "to": "inauguraci\u00f3n", "width": 1}, {"from": "Ineptitud de gestion(c)", "ocurrencia": 1, "to": "no funciona", "width": 1}, {"from": "Ineptitud de gestion(c)", "ocurrencia": 1, "to": "no funcionan", "width": 1}, {"from": "Ineptitud de gestion(c)", "ocurrencia": 29, "to": "peor", "width": 1}, {"from": "Ineptitud de gestion(c)", "ocurrencia": 21, "to": "peores", "width": 1}, {"from": "Ineptitud de gestion(c)", "ocurrencia": 1, "to": "es una inepta", "width": 1}, {"from": "Respeto institucional(c)", "ocurrencia": 1, "to": "respetando la ley", "width": 1}, {"from": "Falta de autoridad(c)", "ocurrencia": 4, "to": "cobarde", "width": 1}, {"from": "Falta de autoridad(c)", "ocurrencia": 1, "to": "mansa", "width": 1}, {"from": "Falta de autoridad(c)", "ocurrencia": 3, "to": "vulnerable", "width": 1}, {"from": "Falta de autoridad(c)", "ocurrencia": 2, "to": "vulnerables", "width": 1}, {"from": "Falta de autoridad(c)", "ocurrencia": 1, "to": "bufon", "width": 1}, {"from": "Popular(c)", "ocurrencia": 1, "to": "creciendo en las encuestas", "width": 1}, {"from": "Incompetencia comunicativa(c)", "ocurrencia": 2, "to": "incongruente", "width": 1}, {"from": "Incompetencia comunicativa(c)", "ocurrencia": 1, "to": "no dice nada", "width": 1}, {"from": "Incompetencia comunicativa(c)", "ocurrencia": 1, "to": "no dicen nada", "width": 1}, {"from": "Irresponsable(c)", "ocurrencia": 1, "to": "demagogia", "width": 1}, {"from": "Ignorancia(c)", "ocurrencia": 1, "to": "sabe nada", "width": 1}, {"from": "Honestidad(c)", "ocurrencia": 7, "to": "es recto", "width": 1}, {"from": "Deshonestidad(c)", "ocurrencia": 1, "to": "es corrupto", "width": 1}, {"from": "Inpopular(c)", "ocurrencia": 1, "to": "perdedor", "width": 1}, {"from": "Inpopular(c)", "ocurrencia": 1, "to": "derrota", "width": 1}, {"from": "Incoherencia(c)", "ocurrencia": 2, "to": "incongruente", "width": 1}, {"from": "Incoherencia(c)", "ocurrencia": 2, "to": "impresentable", "width": 1}, {"from": "Incoherencia(c)", "ocurrencia": 2, "to": "impresentables", "width": 1}, {"from": "Experiencia(c)", "ocurrencia": 1, "to": "son expertos", "width": 1}, {"from": "Autoridad(c)", "ocurrencia": 1, "to": "les gusta", "width": 1}, {"from": "Autoridad(c)", "ocurrencia": 2, "to": "agrade", "width": 1}, {"from": "Autoridad(c)", "ocurrencia": 3, "to": "grata", "width": 1}, {"from": "Autoridad(c)", "ocurrencia": 1, "to": "encantar", "width": 1}, {"from": "Autoridad(c)", "ocurrencia": 1, "to": "encanta", "width": 1}, {"from": "Autoridad(c)", "ocurrencia": 3, "to": "amena", "width": 1}, {"from": "Autoridad(c)", "ocurrencia": 1, "to": "interesa", "width": 1}]);
  //     // create an array with edges

  //     const data = {
  //       nodes: nodes,
  //       edges: edges
  //     };

  //     const options = {
  //       height: '700px',
  //       backgroundColor: '#000000',
        
  //       position: 'relative',
  //       float: 'left'
  //     };

  //     // create a network
  //     const network= new Network(container, data, options);

  //     // store references to the network and data in the state
  //     setNetwork(network);
  //     setData(data);
  //   };

  //   drawGraph();
  // }, [filtroFecha]);
  

  return (
    <div className="fondo-grafo">
    <div className="card-body">
    {/* <Collapse accordion style={{marginBottom:"1rem"}}>
    <Panel header="Información" key="1">
      <p>{text}</p>
    </Panel>
    </Collapse> */}


      {/*FILTRO FECHAS*/}
      {/* <Select placeholder="Fechas" className='fechas-grafos' onChange={handleFiltroFechaChange} defaultValue={filtroFecha}>
          {opciones}
        </Select>
         */}
   
    {display ? 
    <div className='grafo-video'>
    <div className='cartaGrafo' style={{backgroundColor:"black"}}><img src={imagen}></img></div>
    <div className='video-texto cartaGrafo'>
    <video src={video} autoplay muted loop type="video/mp4" controls className="video-explicativo cartaGrafo" ></video>
    <div className="texto-explicativo cartaGrafo scrollable-card" >
      <br></br>
      
      Este grafo construido a partir de dos conjuntos de datos, que representan políticos o series, contiene información valiosa sobre las categorías asociadas a los atributos de los políticos mencionados en los tweets de cada serie. El grosor de las líneas en el grafo refleja la frecuencia con la que esas categorías aparecen en los tweets, proporcionando una indicación visual de su relevancia.
Al analizar este grafo, podemos extraer información importante. Primero, podemos identificar las categorías más frecuentes en los tweets de cada serie, lo que nos da una idea de los temas y atributos que están en el centro de atención. Además, las conexiones entre los políticos a través de las palabras asociadas revelan similitudes o interacciones en sus discursos o acciones, lo que podría indicar alianzas, rivalidades o agendas políticas comunes.
En resumen, este grafo nos permite visualizar y comprender de manera intuitiva las categorías de atributos políticos más relevantes en cada serie, así como las relaciones y similitudes entre los políticos basadas en las palabras asociadas en los tweets. Proporciona una valiosa herramienta para el análisis de la información y el descubrimiento de patrones en el mundo político y las narrativas mediáticas.
    </div>
    </div>
    {/* <Tooltip title='Ocultar video'>
    <Button  shape="circle" onClick={handleDisplay}>
        -
    </Button>
    </Tooltip> */}
    </div>
    :
    <div className='grafo-video'>
    <div className='carta2' style={{backgroundColor:"black"}}><img src={imagen}></img></div>
    {/* <Tooltip title='Mostrar video'>
    <Button  shape="circle" onClick={handleDisplay}>
        +
    </Button>
    </Tooltip> */}
      </div>
    }
    </div>
    </div>
    );
    }