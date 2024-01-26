import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { Collapse, Tooltip, Button, Select } from 'antd';

import video from './../../imagenes/video.mp4'

//FILTRO FECHAS
import json from './../../datos/datos_globales_grafo_palabras_freq.json'
import jsonFechas from './../../datos/rango_fechas.json'
//FIN FILTRO FECHAS
const { Panel } = Collapse;
const text = `
Hashtags más utilizados en el conjunto de publicaciones o mensajes analizados. Ayudan a identificar la tendencia de los temas de discusión en las redes sociales. Los nodos centrales representan las series analizadas, los nodos que los rodean son los hashtags mas frecuentes. El largo de las aristas es directamente proporcional a la ocurrencia de ese hashtag en la serie de textos analizados.`;

export default function GrafoHashtagsMasFrecuentes(){
  
  const [network, setNetwork] = useState();
  const [data, setData] = useState();
  const [display, setDisplay] = useState(false)
//FILTRO FECHAS
const [fechas, setFechas] = useState(jsonFechas.fechas)
const [filtroFecha, setFiltroFecha] = useState(fechas[0])

const opciones = fechas.slice(0, -1).map((fecha, index) => {
  return (
    <Select.Option key={index} value={fecha}>
      {fecha}
    </Select.Option>
  );
});

const handleFiltroFechaChange = (valor) => {
  setFiltroFecha(valor);
  console.log(valor)
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
      const container = document.getElementById('mynetwork');

      // parsing and collecting nodes and edges from the python
     
          //    const nodes = new DataSet([{"color": "#97c2fc", "font": {"color": "white"}, "id": "Marcelo Ebrard", "label": "Marcelo Ebrard", "shape": "dot", "size": 25}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#conmarcelosi", "label": "#conmarcelosi", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#hijosdemx", "label": "#hijosdemx", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#mxconpi\u00f1a", "label": "#mxconpi\u00f1a", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#charropoliticopodcast", "label": "#charropoliticopodcast", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#marceloebrard", "label": "#marceloebrard", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#mexico", "label": "#mexico", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#4t", "label": "#4t", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#esclaudia", "label": "#esclaudia", "shape": "dot", "size": 2}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#elcaminodemexico", "label": "#elcaminodemexico", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#avanzadanacional", "label": "#avanzadanacional", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#whatsapp", "label": "#whatsapp", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#puebla", "label": "#puebla", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#ine", "label": "#ine", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#tgd", "label": "#tgd", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#cuartatransformacion", "label": "#cuartatransformacion", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#marcelo", "label": "#marcelo", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#pollsmx", "label": "#pollsmx", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#amlo", "label": "#amlo", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#tiktok", "label": "#tiktok", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#morena", "label": "#morena", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#avanzadanacionalgamcdmx", "label": "#avanzadanacionalgamcdmx", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#powerranking", "label": "#powerranking", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#pasaporte", "label": "#pasaporte", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#conacytnocumple", "label": "#conacytnocumple", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#conacytnopaga", "label": "#conacytnopaga", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "Claudia Sheinbaum", "label": "Claudia Sheinbaum", "shape": "dot", "size": 25}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#tigresdelnorte", "label": "#tigresdelnorte", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#cdmx", "label": "#cdmx", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#trabajoenlaciudad", "label": "#trabajoenlaciudad", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#laprevencionesnuestrafuerza", "label": "#laprevencionesnuestrafuerza", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#metrocdmx", "label": "#metrocdmx", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#poderjudicialcorrupto", "label": "#poderjudicialcorrupto", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#votomasivopormorena2023y2024", "label": "#votomasivopormorena2023y2024", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#ultimahora", "label": "#ultimahora", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#segurodedesempleoactivo", "label": "#segurodedesempleoactivo", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#metro", "label": "#metro", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#noticias", "label": "#noticias", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#viral", "label": "#viral", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#ciudaddelconocimientoylaeducacion", "label": "#ciudaddelconocimientoylaeducacion", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#bienestarentucolonia", "label": "#bienestarentucolonia", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#simulacronacional2023", "label": "#simulacronacional2023", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#jefadegobierno", "label": "#jefadegobierno", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#chapultepecnaturalezaycultura", "label": "#chapultepecnaturalezaycultura", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#bienestar", "label": "#bienestar", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#jornadadesalud", "label": "#jornadadesalud", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#esclaudiacorrupta", "label": "#esclaudiacorrupta", "shape": "dot", "size": 1}, {"color": "#97c2fc", "font": {"color": "white"}, "id": "#claudiasheinbaum", "label": "#claudiasheinbaum", "shape": "dot", "size": 1}]);
          //  const       edges = new DataSet([{"from": "Marcelo Ebrard", "ocurrencia": 96, "to": "#conmarcelosi", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 57, "to": "#hijosdemx", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 57, "to": "#mxconpi\u00f1a", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 48, "to": "#charropoliticopodcast", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 36, "to": "#marceloebrard", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 27, "to": "#mexico", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 22, "to": "#4t", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 21, "to": "#esclaudia", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 19, "to": "#elcaminodemexico", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 18, "to": "#avanzadanacional", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 16, "to": "#whatsapp", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 15, "to": "#puebla", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 14, "to": "#ine", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 14, "to": "#tgd", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 13, "to": "#cuartatransformacion", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 12, "to": "#marcelo", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 10, "to": "#pollsmx", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 10, "to": "#amlo", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 10, "to": "#tiktok", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 10, "to": "#morena", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 9, "to": "#avanzadanacionalgamcdmx", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 8, "to": "#powerranking", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 8, "to": "#pasaporte", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 8, "to": "#conacytnocumple", "width": 1}, {"from": "Marcelo Ebrard", "ocurrencia": 8, "to": "#conacytnopaga", "width": 1}, {"from": "#hijosdemx", "ocurrencia": 8, "to": "Claudia Sheinbaum", "width": 1}, {"from": "#mexico", "ocurrencia": 21, "to": "Claudia Sheinbaum", "width": 1}, {"from": "#4t", "ocurrencia": 7, "to": "Claudia Sheinbaum", "width": 1}, {"from": "#esclaudia", "ocurrencia": 10, "to": "Claudia Sheinbaum", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 161, "to": "#tigresdelnorte", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 43, "to": "#cdmx", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 42, "to": "#trabajoenlaciudad", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 38, "to": "#laprevencionesnuestrafuerza", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 22, "to": "#metrocdmx", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 22, "to": "#poderjudicialcorrupto", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 22, "to": "#votomasivopormorena2023y2024", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 20, "to": "#ultimahora", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 20, "to": "#segurodedesempleoactivo", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 15, "to": "#metro", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 15, "to": "#noticias", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 15, "to": "#viral", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 14, "to": "#ciudaddelconocimientoylaeducacion", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 11, "to": "#bienestarentucolonia", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 10, "to": "#simulacronacional2023", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 8, "to": "#jefadegobierno", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 8, "to": "#chapultepecnaturalezaycultura", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 8, "to": "#bienestar", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 8, "to": "#jornadadesalud", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 8, "to": "#esclaudiacorrupta", "width": 1}, {"from": "Claudia Sheinbaum", "ocurrencia": 7, "to": "#claudiasheinbaum", "width": 1}]);

           const nodes = new DataSet(json[filtroFecha][0])
           const edges = new DataSet(json[filtroFecha][1])
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
  }, [filtroFecha]);


  
  return (
    <div className="fondo-grafo">
    <div className="card-body">
    <Collapse accordion style={{marginBottom:"1rem"}}>
    <Panel header="Información" key="1">
      <p>{text}</p>
    </Panel>
    </Collapse>
  
    {/*FILTRO FECHAS*/}
    <Select placeholder="Fechas" className='fechas-grafos' onChange={handleFiltroFechaChange} defaultValue={filtroFecha}>
      {opciones}
    </Select>
   
    {display ? 
    <div className='grafo-video'>
    <div id="mynetwork" className='cartaGrafo' style={{backgroundColor:"black"}}></div>
    <div className='video-texto cartaGrafo'>
    <video src={video} autoplay muted loop type="video/mp4" controls className="video-explicativo cartaGrafo" ></video>
    <div className="texto-explicativo cartaGrafo" >texto explicativo</div>
    </div>
    <Tooltip title='Ocultar video'>
    <Button  shape="circle" onClick={handleDisplay}>
        -
    </Button>
    </Tooltip>
    </div>
    :
    <div className='grafo-video'>
    <div id="mynetwork" className='carta2' style={{backgroundColor:"black"}}></div>
    <Tooltip title='Mostrar video'>
    <Button  shape="circle" onClick={handleDisplay}>
        +
    </Button>
    </Tooltip>
      </div>
    }
    </div>
    </div>
    );
    }