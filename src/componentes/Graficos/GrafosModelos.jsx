import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import atributospersonalidad from './../../imagenes/atributos-de-personalidad.PNG'
import atributospoliticos from './../../imagenes/atributos-de-politicos.PNG'
import contcambio from './../../imagenes/continuidad-y-cambio.PNG'
import emocionesbasicas from './../../imagenes/emociones-basicas.PNG'
import votoemrac from './../../imagenes/Voto-emocional-y-racional.PNG'
import preocupaciones from './../../imagenes/preocupaciones.PNG'
import redmotivacional from './../../imagenes/red-motivacional-del-voto.PNG'
import sentimientos from './../../imagenes/sentimientos.PNG'
import preocupacionesVen from './../../imagenes/preocupaciones-Ven.png'
import './Graficos.css'
import { Tooltip, Select } from 'antd';
//FILTRO FECHAS

import jsonFechas from './../../datos/rango_fechas.json'
//FIN FILTRO FECHAS

export default function GrafosModelos(){


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
   console.log(valor)
 };
 

  

  return (
    <div className="fondo-grafo">
    <div className="card-body">
  
   <Select placeholder="Fechas" className='fechas-grafos' onChange={handleFiltroFechaChange} defaultValue={filtroFecha}>
      {opciones}
    </Select>
    <div className='modelos-grafos'>
    {/* <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
        <div className='titulo-modelo'>Sentimientos</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Sentimientos-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={sentimientos} className='imagen-grafo-modelos' />
    </div>
    </a>
    </Tooltip>
    </div> */}
   
    <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
    <div className='titulo-modelo'>Atributos</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Atributos-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={atributospersonalidad} className='imagen-grafo-modelos' />
    </div>
    </a>
    </Tooltip>
    </div>
    <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
    <div className='titulo-modelo'>Clima Social</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Clima%20social-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={atributospoliticos} className='imagen-grafo-modelos' />
    </div>
    </a>
    </Tooltip>
    </div>
    <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
    <div className='titulo-modelo'>Continuidad y cambio</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Continuidad%20y%20cambio-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={contcambio} className='imagen-grafo-modelos' />
    </div>
    </a>
    
    </Tooltip>
    </div>
    <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
    <div className='titulo-modelo'>Emociones Básicas (Plutchik)</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Emociones%20Básicas%20(Plutchik)-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={emocionesbasicas} className='imagen-grafo-modelos' />
    </div>
    </a>
    </Tooltip>
    </div>
    <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
    <div className='titulo-modelo'>Preocupaciones</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Preocupaciones-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={preocupaciones} className='imagen-grafo-modelos' />
    </div>
    </a>
    </Tooltip>
    </div>
    <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
    <div className='titulo-modelo'>Red motivacional del voto</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Red%20motivacional%20del%20voto-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={redmotivacional} className='imagen-grafo-modelos' />
    </div>
    </a>
    </Tooltip>
    </div>
    {/* <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
    <div className='titulo-modelo'>Voto Emocional y Racional</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Voto%20Emocional%20y%20Racional-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={votoemrac} className='imagen-grafo-modelos' />
    </div>
    </a>
    </Tooltip>
    </div> */}

    {/* <div className='grafo-video-modelos'>
    <Tooltip title="Click para ver el grafo">
    <div className='titulo-modelo'>Preocupaciones VEN</div>
    <a href={`https://qsngrafos.vercel.app/modelos/11062016/grafo_modelo-Preocupaciones%20-%20Ven-${filtroFecha}.html`} target="_blank">
    <div className=' cartaGrafo-modelos'>
      <img src={preocupacionesVen} className='imagen-grafo-modelos'/>
    </div>
    </a>
    </Tooltip>
    </div> */}
    </div>
    </div>
    </div>
   
    );
    }