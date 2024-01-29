import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagen from './../../imagenes/grafo_co-ocurencia_hashtags-2023-06-16-2023-06-16.PNG'
import './Graficos.css'
import { Collapse, Tooltip, Button, Select } from 'antd';

import video from './../../imagenes/TendenciasConversaciones.mp4'
//FILTRO FECHAS

import jsonFechas from './../../datos/rango_fechas.json'
//FIN FILTRO FECHAS

export default function GraphHashtags(){


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


   
    <div className='grafo-video'>
    
    <Tooltip title="Click para ver el grafo">
    <a href={`https://qsngrafos.vercel.app/co-ocurrencia/11062016/grafo_co-ocurencia_hashtags-${filtroFecha}.html`} target="_blank">
    <div className='video-explicativo cartaGrafo'>
      <img src={imagen} className='imagen-grafo' />
    </div>
    </a>
    </Tooltip>
    <div className='video-texto cartaGrafo'>
    <video src={video} autoplay muted loop type="video/mp4" controls className="video-explicativo cartaGrafo" ></video>
    <div className="texto-explicativo cartaGrafo scrollable-card" >
      <br></br>
      <br></br>
      ¡Hola! En esta oportunidad, te mostraré cómo interpretar grafos de coocurrencia de hashtags. Estos grafos son una herramienta poderosa para analizar tendencias, descubrir comunidades y visualizar las relaciones entre los hashtags. 
Cada comunidad está representada por un color, en el contexto de la coocurrencia de hashtags en un conjunto de comentarios, una comunidad representa el grupo de hashtags fuertemente relacionados entre sí, es decir, que tienden a aparecer juntos con frecuencia en los comentarios analizados. Esto puede indicar temas similares, discusiones relacionadas o tendencias compartidas dentro de esas comunidades, lo que te permite descubrir grupos temáticos o comunidades de interés.
En fin, este tipo de grafos puede serte útil para identificar las tendencias más relevantes en un conjunto de comentarios. Los hashtags fuertemente conectados en el grafo son aquellos que coocurren con mayor frecuencia, lo que indica una relación temática o una tendencia popular y los puedes identificar ya sea porque pertenecen a la misma comunidad (visualmente están pintados del mismo color) o también por el grosor de las líneas que los unen, mientras más gruesa sea, mayor es la relación o coocurrencia de dichos hashtags en los comentarios. Además, un nodo mientras mayor sea su tamaño, representará un hashtag más comentado en las redes.
Al identificar los hashtags más importantes en el grafo, también es posible determinar los influencers o usuarios más influyentes en una determinada temática. Aquellos hashtags que estén altamente conectados con otros hashtags y que tengan un tamaño de nodo grande podrían indicar la presencia de usuarios con mayor influencia en la conversación. Para conocer o identificar las menciones relacionadas a cada grupo de hashtags podrás ver el grafo de relaciones entre hashtags y menciones.
</div>
    </div>
 
    </div>
    
    
    </div>
    </div>
   
    );
    }