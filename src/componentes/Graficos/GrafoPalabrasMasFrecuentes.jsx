import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Button, Collapse, Tooltip, Select , Card} from 'antd';
import video from './../../imagenes/Palabras frecuentes.mp4'
import { MdOpenInNew } from 'react-icons/md'
import './Graficos.css'
// import 'antd/dist/antd.css';

//FILTRO FECHAS
import json from './../../datos/datos_globales_grafo_palabras_freq.json'
import jsonFechas from './../../datos/rango_fechas.json'
import jsonBigramas from './../../datos/datos_globales_grafo_bigramas_freq.json'
import jsonTrigramas from './../../datos/datos_globales_grafo_trigramas_freq.json'
//FIN FILTRO FECHAS

const { Panel } = Collapse;
const text = `
Las palabras más frecuentes ayudan a identificar los temas principales o terminos más usados. Si comparamos
    dos grupos de palabras.
`;
export default function GrafoPalabrasMasFrecuentes(){

  const [network, setNetwork] = useState();
  const [data, setData] = useState();
  const [display, setDisplay] = useState(true)

  //FILTRO FECHAS
  const [fechas, setFechas] = useState(jsonFechas.fechas)
  const [filtroFecha, setFiltroFecha] = useState(fechas[0])

  const opciones = fechas
  .filter((fecha, index) => index > fechas.length - 4) // Filtra las últimas 3 fechas
  .map((fecha, index) => (
    <Select.Option key={index} value={fecha}>
      {fecha}
    </Select.Option>
  ));


  const handleFiltroFechaChange = (valor) => {
    setFiltroFecha(valor);
  };
  // FIN FILTRO FECHAS
  function handleDisplay(){
    setDisplay(!display)
  }
 
  useEffect(() => {
    window.addEventListener('error', e => {
        if (e.message === 'ResizeObserver loop limit exceeded') {
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            );
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            );
            if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none');
            }
            if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none');
            }
        }
    });
 
}, []);
  
  useEffect(() => {
    const drawGraph = () => {
      const container = document.getElementById('palabrasMasFrecuentes');

      // parsing and collecting nodes and edges from the python
      const nodes = new DataSet(json[filtroFecha][0])
      const edges = new DataSet(json[filtroFecha][1])
      // const nodes = new DataSet([{"color": "#97c2fc", "font": {"color": "white"}, "id": "Marcelo Ebrard", "label": "Marcelo Ebrard", "shape": "dot", "size": 20}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "m_ebrard", "label": "m_ebrard", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "marcelo", "label": "marcelo", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "ebrard", "label": "ebrard", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "claudiashein", "label": "claudiashein", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "lopezobrador_", "label": "lopezobrador_", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "mexico", "label": "mexico", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "morena", "label": "morena", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "gobierno", "label": "gobierno", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "claudia", "label": "claudia", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "personas", "label": "personas", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "amlo", "label": "amlo", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "seguridad", "label": "seguridad", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "presidente", "label": "presidente", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "migrantes", "label": "migrantes", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "lopez", "label": "lopez", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "rosaicela_", "label": "rosaicela_", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "sheinbaum", "label": "sheinbaum", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "adan_augusto", "label": "adan_augusto", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "candidato", "label": "candidato", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "politica", "label": "politica", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "Claudia Sheinbaum", "label": "Claudia Sheinbaum", "shape": "dot", "size": 20}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "rosalia", "label": "rosalia", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "ciudad", "label": "ciudad", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "metro", "label": "metro", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "millones", "label": "millones", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "gracias", "label": "gracias", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "mujeres", "label": "mujeres", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "vida", "label": "vida", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "campana", "label": "campana", "shape": "dot", "size": 1}]);
      // const edges = new DataSet([{"Ocurrencias": 13497, "from": "Marcelo Ebrard", "to": "m_ebrard", "width": 1}, {"Ocurrencias": 5275, "from": "Marcelo Ebrard", "to": "marcelo", "width": 1}, {"Ocurrencias": 3852, "from": "Marcelo Ebrard", "to": "ebrard", "width": 1}, {"Ocurrencias": 2283, "from": "Marcelo Ebrard", "to": "claudiashein", "width": 1}, {"Ocurrencias": 2228, "from": "Marcelo Ebrard", "to": "lopezobrador_", "width": 1}, {"Ocurrencias": 2085, "from": "Marcelo Ebrard", "to": "mexico", "width": 1}, {"Ocurrencias": 1914, "from": "Marcelo Ebrard", "to": "morena", "width": 1}, {"Ocurrencias": 1515, "from": "Marcelo Ebrard", "to": "gobierno", "width": 1}, {"Ocurrencias": 1078, "from": "Marcelo Ebrard", "to": "claudia", "width": 1}, {"Ocurrencias": 997, "from": "Marcelo Ebrard", "to": "personas", "width": 1}, {"Ocurrencias": 836, "from": "Marcelo Ebrard", "to": "amlo", "width": 1}, {"Ocurrencias": 798, "from": "Marcelo Ebrard", "to": "seguridad", "width": 1}, {"Ocurrencias": 712, "from": "Marcelo Ebrard", "to": "presidente", "width": 1}, {"Ocurrencias": 650, "from": "Marcelo Ebrard", "to": "migrantes", "width": 1}, {"Ocurrencias": 625, "from": "Marcelo Ebrard", "to": "lopez", "width": 1}, {"Ocurrencias": 530, "from": "Marcelo Ebrard", "to": "rosaicela_", "width": 1}, {"Ocurrencias": 520, "from": "Marcelo Ebrard", "to": "sheinbaum", "width": 1}, {"Ocurrencias": 496, "from": "Marcelo Ebrard", "to": "adan_augusto", "width": 1}, {"Ocurrencias": 494, "from": "Marcelo Ebrard", "to": "candidato", "width": 1}, {"Ocurrencias": 367, "from": "Marcelo Ebrard", "to": "politica", "width": 1}, {"Ocurrencias": 2224, "from": "m_ebrard", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 637, "from": "marcelo", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 519, "from": "ebrard", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 18516, "from": "claudiashein", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1713, "from": "lopezobrador_", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1642, "from": "mexico", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 614, "from": "morena", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1947, "from": "gobierno", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 2575, "from": "claudia", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 616, "from": "personas", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 775, "from": "seguridad", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1709, "from": "sheinbaum", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1717, "from": "Claudia Sheinbaum", "to": "rosalia", "width": 1}, {"Ocurrencias": 1658, "from": "Claudia Sheinbaum", "to": "ciudad", "width": 1}, {"Ocurrencias": 1119, "from": "Claudia Sheinbaum", "to": "metro", "width": 1}, {"Ocurrencias": 618, "from": "Claudia Sheinbaum", "to": "millones", "width": 1}, {"Ocurrencias": 606, "from": "Claudia Sheinbaum", "to": "gracias", "width": 1}, {"Ocurrencias": 571, "from": "Claudia Sheinbaum", "to": "mujeres", "width": 1}, {"Ocurrencias": 507, "from": "Claudia Sheinbaum", "to": "vida", "width": 1}, {"Ocurrencias": 492, "from": "Claudia Sheinbaum", "to": "campana", "width": 1}]);
// create an array with edges

      const data = {
        nodes: nodes,
        edges: edges
      };

      const options = {
        height: '700px',
        backgroundColor: '#000000',
        
        position: 'relative',
        float: 'left'
      };

      // create a network
      const network= new Network(container, data, options);

      // store references to the network and data in the state
      setNetwork(network);
      setData(data);
    };

    drawGraph();
    const drawGraphBigramas = () => {
      const container = document.getElementById('bigramas');
      // parsing and collecting nodes and edges from the python
      const nodes = new DataSet(jsonBigramas[filtroFecha][0])
      const edges = new DataSet(jsonBigramas[filtroFecha][1])
      // const nodes = new DataSet([{"color": "#97c2fc", "font": {"color": "white"}, "id": "Marcelo Ebrard", "label": "Marcelo Ebrard", "shape": "dot", "size": 20}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "m_ebrard", "label": "m_ebrard", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "marcelo", "label": "marcelo", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "ebrard", "label": "ebrard", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "claudiashein", "label": "claudiashein", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "lopezobrador_", "label": "lopezobrador_", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "mexico", "label": "mexico", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "morena", "label": "morena", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "gobierno", "label": "gobierno", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "claudia", "label": "claudia", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "personas", "label": "personas", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "amlo", "label": "amlo", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "seguridad", "label": "seguridad", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "presidente", "label": "presidente", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "migrantes", "label": "migrantes", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "lopez", "label": "lopez", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "rosaicela_", "label": "rosaicela_", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "sheinbaum", "label": "sheinbaum", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "adan_augusto", "label": "adan_augusto", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "candidato", "label": "candidato", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "politica", "label": "politica", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "Claudia Sheinbaum", "label": "Claudia Sheinbaum", "shape": "dot", "size": 20}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "rosalia", "label": "rosalia", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "ciudad", "label": "ciudad", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "metro", "label": "metro", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "millones", "label": "millones", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "gracias", "label": "gracias", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "mujeres", "label": "mujeres", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "vida", "label": "vida", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "campana", "label": "campana", "shape": "dot", "size": 1}]);
      // const edges = new DataSet([{"Ocurrencias": 13497, "from": "Marcelo Ebrard", "to": "m_ebrard", "width": 1}, {"Ocurrencias": 5275, "from": "Marcelo Ebrard", "to": "marcelo", "width": 1}, {"Ocurrencias": 3852, "from": "Marcelo Ebrard", "to": "ebrard", "width": 1}, {"Ocurrencias": 2283, "from": "Marcelo Ebrard", "to": "claudiashein", "width": 1}, {"Ocurrencias": 2228, "from": "Marcelo Ebrard", "to": "lopezobrador_", "width": 1}, {"Ocurrencias": 2085, "from": "Marcelo Ebrard", "to": "mexico", "width": 1}, {"Ocurrencias": 1914, "from": "Marcelo Ebrard", "to": "morena", "width": 1}, {"Ocurrencias": 1515, "from": "Marcelo Ebrard", "to": "gobierno", "width": 1}, {"Ocurrencias": 1078, "from": "Marcelo Ebrard", "to": "claudia", "width": 1}, {"Ocurrencias": 997, "from": "Marcelo Ebrard", "to": "personas", "width": 1}, {"Ocurrencias": 836, "from": "Marcelo Ebrard", "to": "amlo", "width": 1}, {"Ocurrencias": 798, "from": "Marcelo Ebrard", "to": "seguridad", "width": 1}, {"Ocurrencias": 712, "from": "Marcelo Ebrard", "to": "presidente", "width": 1}, {"Ocurrencias": 650, "from": "Marcelo Ebrard", "to": "migrantes", "width": 1}, {"Ocurrencias": 625, "from": "Marcelo Ebrard", "to": "lopez", "width": 1}, {"Ocurrencias": 530, "from": "Marcelo Ebrard", "to": "rosaicela_", "width": 1}, {"Ocurrencias": 520, "from": "Marcelo Ebrard", "to": "sheinbaum", "width": 1}, {"Ocurrencias": 496, "from": "Marcelo Ebrard", "to": "adan_augusto", "width": 1}, {"Ocurrencias": 494, "from": "Marcelo Ebrard", "to": "candidato", "width": 1}, {"Ocurrencias": 367, "from": "Marcelo Ebrard", "to": "politica", "width": 1}, {"Ocurrencias": 2224, "from": "m_ebrard", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 637, "from": "marcelo", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 519, "from": "ebrard", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 18516, "from": "claudiashein", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1713, "from": "lopezobrador_", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1642, "from": "mexico", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 614, "from": "morena", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1947, "from": "gobierno", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 2575, "from": "claudia", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 616, "from": "personas", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 775, "from": "seguridad", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1709, "from": "sheinbaum", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1717, "from": "Claudia Sheinbaum", "to": "rosalia", "width": 1}, {"Ocurrencias": 1658, "from": "Claudia Sheinbaum", "to": "ciudad", "width": 1}, {"Ocurrencias": 1119, "from": "Claudia Sheinbaum", "to": "metro", "width": 1}, {"Ocurrencias": 618, "from": "Claudia Sheinbaum", "to": "millones", "width": 1}, {"Ocurrencias": 606, "from": "Claudia Sheinbaum", "to": "gracias", "width": 1}, {"Ocurrencias": 571, "from": "Claudia Sheinbaum", "to": "mujeres", "width": 1}, {"Ocurrencias": 507, "from": "Claudia Sheinbaum", "to": "vida", "width": 1}, {"Ocurrencias": 492, "from": "Claudia Sheinbaum", "to": "campana", "width": 1}]);
// create an array with edges
      const data = {
        nodes: nodes,
        edges: edges
      };
      const options = {
        height: '700px',
        backgroundColor: '#000000',
        
        position: 'relative',
        float: 'left'
      };

      // create a network
      const network= new Network(container, data, options);
      // store references to the network and data in the state
      setNetwork(network);
      setData(data);
    };

    drawGraphBigramas();
    const drawGraphTrigramas = () => {
      const container = document.getElementById('trigramas');

      // parsing and collecting nodes and edges from the python
      const nodes = new DataSet(jsonTrigramas[filtroFecha][0])
      const edges = new DataSet(jsonTrigramas[filtroFecha][1])
      // const nodes = new DataSet([{"color": "#97c2fc", "font": {"color": "white"}, "id": "Marcelo Ebrard", "label": "Marcelo Ebrard", "shape": "dot", "size": 20}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "m_ebrard", "label": "m_ebrard", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "marcelo", "label": "marcelo", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "ebrard", "label": "ebrard", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "claudiashein", "label": "claudiashein", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "lopezobrador_", "label": "lopezobrador_", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "mexico", "label": "mexico", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "morena", "label": "morena", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "gobierno", "label": "gobierno", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "claudia", "label": "claudia", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "personas", "label": "personas", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "amlo", "label": "amlo", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "seguridad", "label": "seguridad", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "presidente", "label": "presidente", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "migrantes", "label": "migrantes", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "lopez", "label": "lopez", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "rosaicela_", "label": "rosaicela_", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "sheinbaum", "label": "sheinbaum", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "adan_augusto", "label": "adan_augusto", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "candidato", "label": "candidato", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "politica", "label": "politica", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "Claudia Sheinbaum", "label": "Claudia Sheinbaum", "shape": "dot", "size": 20}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "rosalia", "label": "rosalia", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "ciudad", "label": "ciudad", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "metro", "label": "metro", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "millones", "label": "millones", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "gracias", "label": "gracias", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "mujeres", "label": "mujeres", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "vida", "label": "vida", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "campana", "label": "campana", "shape": "dot", "size": 1}]);
      // const edges = new DataSet([{"Ocurrencias": 13497, "from": "Marcelo Ebrard", "to": "m_ebrard", "width": 1}, {"Ocurrencias": 5275, "from": "Marcelo Ebrard", "to": "marcelo", "width": 1}, {"Ocurrencias": 3852, "from": "Marcelo Ebrard", "to": "ebrard", "width": 1}, {"Ocurrencias": 2283, "from": "Marcelo Ebrard", "to": "claudiashein", "width": 1}, {"Ocurrencias": 2228, "from": "Marcelo Ebrard", "to": "lopezobrador_", "width": 1}, {"Ocurrencias": 2085, "from": "Marcelo Ebrard", "to": "mexico", "width": 1}, {"Ocurrencias": 1914, "from": "Marcelo Ebrard", "to": "morena", "width": 1}, {"Ocurrencias": 1515, "from": "Marcelo Ebrard", "to": "gobierno", "width": 1}, {"Ocurrencias": 1078, "from": "Marcelo Ebrard", "to": "claudia", "width": 1}, {"Ocurrencias": 997, "from": "Marcelo Ebrard", "to": "personas", "width": 1}, {"Ocurrencias": 836, "from": "Marcelo Ebrard", "to": "amlo", "width": 1}, {"Ocurrencias": 798, "from": "Marcelo Ebrard", "to": "seguridad", "width": 1}, {"Ocurrencias": 712, "from": "Marcelo Ebrard", "to": "presidente", "width": 1}, {"Ocurrencias": 650, "from": "Marcelo Ebrard", "to": "migrantes", "width": 1}, {"Ocurrencias": 625, "from": "Marcelo Ebrard", "to": "lopez", "width": 1}, {"Ocurrencias": 530, "from": "Marcelo Ebrard", "to": "rosaicela_", "width": 1}, {"Ocurrencias": 520, "from": "Marcelo Ebrard", "to": "sheinbaum", "width": 1}, {"Ocurrencias": 496, "from": "Marcelo Ebrard", "to": "adan_augusto", "width": 1}, {"Ocurrencias": 494, "from": "Marcelo Ebrard", "to": "candidato", "width": 1}, {"Ocurrencias": 367, "from": "Marcelo Ebrard", "to": "politica", "width": 1}, {"Ocurrencias": 2224, "from": "m_ebrard", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 637, "from": "marcelo", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 519, "from": "ebrard", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 18516, "from": "claudiashein", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1713, "from": "lopezobrador_", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1642, "from": "mexico", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 614, "from": "morena", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1947, "from": "gobierno", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 2575, "from": "claudia", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 616, "from": "personas", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 775, "from": "seguridad", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1709, "from": "sheinbaum", "to": "Claudia Sheinbaum", "width": 1}, {"Ocurrencias": 1717, "from": "Claudia Sheinbaum", "to": "rosalia", "width": 1}, {"Ocurrencias": 1658, "from": "Claudia Sheinbaum", "to": "ciudad", "width": 1}, {"Ocurrencias": 1119, "from": "Claudia Sheinbaum", "to": "metro", "width": 1}, {"Ocurrencias": 618, "from": "Claudia Sheinbaum", "to": "millones", "width": 1}, {"Ocurrencias": 606, "from": "Claudia Sheinbaum", "to": "gracias", "width": 1}, {"Ocurrencias": 571, "from": "Claudia Sheinbaum", "to": "mujeres", "width": 1}, {"Ocurrencias": 507, "from": "Claudia Sheinbaum", "to": "vida", "width": 1}, {"Ocurrencias": 492, "from": "Claudia Sheinbaum", "to": "campana", "width": 1}]);
// create an array with edges
      const data = {
        nodes: nodes,
        edges: edges
      };
      const options = {
        height: '700px',
        backgroundColor: '#000000',
        
        position: 'relative',
        float: 'left'
      };
      // create a network
      const network= new Network(container, data, options);
      // store references to the network and data in the state
      setNetwork(network);
      setData(data);
    };

    drawGraphTrigramas();
    
    
  }, [filtroFecha]);

  return (
    <div className="fondo-grafo">
    <div className="card-body">
   
    {/* <Collapse accordion style={{marginBottom:"1rem"}}>
    <Panel header="Información" key="1">
      <p>{text}</p>
    </Panel>
    </Collapse> */}

    {/*FILTRO FECHAS*/}
    <Select placeholder="Fechas" className='fechas-grafos' onChange={handleFiltroFechaChange} defaultValue={filtroFecha}>
      {opciones}
    </Select>
    
    {display ? 
    <div>
    <div className='grafo-video'>
    <div id="palabrasMasFrecuentes" className='cartaGrafo' style={{backgroundColor:"black"}}></div>
   
    <div className='video-texto cartaGrafo'>
    <video src={video} autoplay muted loop type="video/mp4" controls className="video-explicativo cartaGrafo" ></video>
    <div className="texto-explicativo cartaGrafo scrollable-card" >
      <br></br>
      <br></br>
   ¡Hola!, vengo a explicarte la utilidad de este tipo de grafos y como puedes explorar la información contenida en ellos:
Los grafos de palabras frecuentes, son herramientas útiles para visualizar y comprender la relación y frecuencia de palabras en un conjunto de datos. 
Estos grafos, proporcionan información sobre la importancia relativa de las palabras y las conexiones entre ellas.
A las series seleccionadas, podrás compararlas entre sí, e identificar rápidamente los temas principales, o los términos claves de cada una.
Las aristas del grafo, representan la conexión entre palabras, y su grosor o ancho indica la frecuencia de esa conexión. 
Cuanto más gruesa sea una arista, mayor será la frecuencia de la relación entre esas palabras.
El largo de las aristas, también es un indicativo de la frecuencia de la conexión, brindando, una idea de la cercanía o intensidad de la relación entre las dos palabras que une.
Las aristas más cortas (frecuencias más altas) representarían relaciones más fuertes o directas.
Estos grafos, pueden revelar insights sobre la estructura de la información y la forma en que las palabras están relacionadas entre sí. 
Al visualizar el grafo, es posible identificar clústeres de palabras altamente conectadas, lo que puede indicar la existencia de grupos temáticos o conceptuales dentro del conjunto de datos.
Añadiendo información contextual y relaciones más específicas, los grafos de bigramas y trigramas revelan conexiones y patrones de coocurrencia, entre palabras adyacentes, proporcionando información más detallada sobre las asociaciones, en el contexto del texto, obteniéndose una perspectiva más completa, y detallada de cómo las palabras interactúan en secuencias, y cómo se combinan para formar expresiones y frases, con significado particular.
Esta combinación de grafos, proporciona una visión más profunda y precisa de la estructura, y el significado de la información contenida en el texto analizado.

    </div>
    </div>
    <Tooltip title='Ocultar video'>
    <Button  shape="circle" onClick={handleDisplay}>
        -
    </Button>
    </Tooltip>
    <Tooltip title='Abrir en otro navegador'>
    <a href={`https://qsngrafos.vercel.app/palabras/11062016/grafo_palabras-frecuentes-${filtroFecha}.html`} target="_blank"><Button  shape="circle">
 
        <MdOpenInNew/>
    </Button>
     </a>
    </Tooltip>
    </div>
    <div className='bigramas-trigramas'>
      <div id="bigramas" className='carta2' style={{backgroundColor:"black"}}></div>
      <Tooltip title='Abrir en otro navegador'>
    <a href={`https://qsngrafos.vercel.app/palabras/11062016/grafo_bigramas-frecuentes-${filtroFecha}.html`} target="_blank"><Button className='boton-abrirnavegador' shape="circle">
        <MdOpenInNew/>
    </Button>
     </a>
    </Tooltip>
      </div>
      <div className='bigramas-trigramas'>
      <div id="trigramas" className='carta2' style={{backgroundColor:"black"}}></div>
      <Tooltip title='Abrir en otro navegador'>
    <a href={`https://qsngrafos.vercel.app/palabras/11062016/grafo_trigramas-frecuentes-${filtroFecha}.html`} target="_blank"><Button className='boton-abrirnavegador' shape="circle">
        <MdOpenInNew/>
    </Button>
     </a>
    </Tooltip>
    
      </div>
    </div>
    :
    <div>
    <div className='grafo-video'>
    <div id="palabrasMasFrecuentes" className='carta2' style={{backgroundColor:"black"}}></div>
    <Tooltip title='Mostrar video'>
    <Button  shape="circle" onClick={handleDisplay}>
        +
    </Button>
     </Tooltip>
     <Tooltip title='Abrir en otro navegador'>
    <a href={`https://qsngrafos.vercel.app/palabras/11062016/grafo_palabras-frecuentes-${filtroFecha}.html`} target="_blank"><Button  shape="circle">
        <MdOpenInNew/>
    </Button>
     </a>
    </Tooltip>
    
      </div>
      <div className='bigramas-trigramas'>
      <div id="bigramas" className='carta2' style={{backgroundColor:"black"}}></div>
      <Tooltip title='Abrir en otro navegador'>
    <a href={`https://qsngrafos.vercel.app/palabras/11062016/grafo_bigramas-frecuentes-${filtroFecha}.html`} target="_blank"><Button className='boton-abrirnavegador' shape="circle">
        <MdOpenInNew/>
    </Button>
     </a>
    </Tooltip>
    
      </div>
      <div className='bigramas-trigramas'>
      <div id="trigramas" className='carta2' style={{backgroundColor:"black"}}></div>
      <Tooltip title='Abrir en otro navegador'>
    <a href={`https://qsngrafos.vercel.app/palabras/11062016/grafo_trigramas-frecuentes-${filtroFecha}.html`} target="_blank"><Button className='boton-abrirnavegador' shape="circle">
        <MdOpenInNew/>
    </Button>
     </a>
    </Tooltip>
    
      </div>
      </div>
}
    </div>
    </div>
    );
    }