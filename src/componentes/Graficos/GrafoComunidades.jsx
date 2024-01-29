import React, { useState, useEffect } from 'react';
import './Graficos.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Collapse, Tooltip, Button, Select} from 'antd';
import video from './../../imagenes/InteraccionUsuariosInfluencia.mp4'
import imagen from './../../imagenes/grafo_hashtags_menciones-2023-06-18-2023-06-18.PNG'
//FILTRO FECHAS

import jsonFechas from './../../datos/rango_fechas.json'
//FIN FILTRO FECHAS

export default function GraphComunidades(){


// FILTRO FECHAS
const [fechas, setFechas] = useState(jsonFechas.fechas)
console.log(jsonFechas)
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
// // FIN FILTRO FECHAS



  return (
    <div className="fondo-grafo">
    <div className="card-body">

    {/* FILTRO FECHAS */}
    <Select placeholder="Fechas" className='fechas-grafos' onChange={handleFiltroFechaChange} defaultValue={filtroFecha}>
      {opciones}
    </Select> 
    


    <div className='grafo-video' >
  
    <Tooltip title="Click para ver el grafo">
    <a href={`https://qsngrafos.vercel.app/hasgtags-menciones/11062016/grafo_hashtags_menciones-${filtroFecha}.html`} target="_blank">
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
      <br></br>
    ¡Qué bueno que hayas elegido este grafo! Anteriormente, habíamos visto el grafo de coocurrencia de hashtags y te explicaba como podías descubrir los hashtags más comentados y su coocurrencia con otros, para poder identificar las tendencias en las conversaciones y los temas más populares. Ahora, con esta nueva representación visual, podrás detectar los hashtags con mayor relevancia o centralidad en las conversaciones en función de las menciones, eso quiere decir, aquellos que estuvieron más conectados con menciones en las publicaciones. 
Cuando un hashtag está acompañado de varias menciones, es probable que esté vinculado a discusiones y conversaciones específicas en la red. Las menciones representan la interacción de los usuarios con ese hashtag en particular, lo que puede indicar que están participando en conversaciones relacionadas con ese tema. Esto puede ser una herramienta útil para comprender como interactúan los usuarios entre sí, e identificar aquellos más influyentes. También, puede ser relevante para comprender cómo se difunde la información en la red y cómo se conectan diferentes actores o temas a través de menciones y hashtags. 
Comprendiendo que el alcance y la difusión de un hashtag puede estar relacionado con la cantidad de menciones que recibe; en el grafo se muestra la comunidad más relevante, identificando aquellas menciones y hashtags más conectados o con mayor influencia en la red, por ende, podemos identificar los hashtags que están siendo utilizados con mayor grupo de usuarios y seguramente con intereses comunes, pudiéndolos considerar líderes de opción o influenciadores en la comunidad.
<strong>Cada nodo representa un hashtag (color rosa) o una mención (color azul) y las aristas la relación entre ellos</strong>. Cada arista tiene un peso que indique la frecuencia o intensidad de la relación entre los nodos, de ahí su grosor. 
Un hashtag acompañado de múltiples menciones en el grafo sugiere que ese hashtag tiene una mayor visibilidad, participación y potencial influencia en la red social. Está generando discusiones, atrayendo la atención de los usuarios y posiblemente formando comunidades en torno a él.

    </div>
    </div>
   
    </div>
    
    </div>
    </div>
    );
    }