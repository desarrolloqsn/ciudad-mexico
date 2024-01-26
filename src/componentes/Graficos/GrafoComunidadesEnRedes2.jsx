import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Graficos.css'
import { Collapse, Tooltip, Button, Select } from 'antd';
import { Table } from 'antd';
import video from './../../imagenes/ComunidadesRedes.mp4'
import videoTablas from './../../imagenes/TablaInfluenciadores.mp4'
//FILTRO FECHAS
import jsonFechas from './../../datos/rango_fechas.json'
// import tabla1 from '../../datos/datos_globales_influencers_destacados_menos_gob.json'
// import tabla2 from '../../datos/datos_globales_influencers_claves_menos_gob.json'
// import tabla3 from '../../datos/datos_globales_influencers_eficientes_menos_gob.json'
// import tabla4 from '../../datos/datos_globales_influencers_alto_impacto_menos_gob.json'
import imagen from './../../imagenes/grafo_comunidades_menos_gob-2023-06-17-2023-06-17.PNG'
//FIN FILTRO FECHAS

// export default function GrafoComunidadesEnRedesMenosRelevantes(){

  

//   const [displayGrafoComunidades, setdisplayGrafoComunidades] = useState('noflexne');
//   const [display, setDisplay] = useState(true)
//  //FILTRO FECHAS
//  const [fechas, setFechas] = useState(jsonFechas.fechas)
//  const [filtroFecha, setFiltroFecha] = useState(fechas[0])
//  const [dataTablas, setDataTablas] = useState({
//   "Destacados": tabla1[filtroFecha],
//   "Claves":tabla2[filtroFecha],
//   "Eficientes":tabla3[filtroFecha],
//   "AltoImpacto":tabla4[filtroFecha]
//  })

//  const actualizarDatosTablas = () => {
//   setDataTablas({
//     "Destacados": tabla1[filtroFecha],
//     "Claves": tabla2[filtroFecha],
//     "Eficientes": tabla3[filtroFecha],
//     "AltoImpacto": tabla4[filtroFecha]
//   });
// };
// useEffect(() => {
//   actualizarDatosTablas();
// }, [filtroFecha]);





//  const opciones = fechas.map((fecha, index) => {
//    return (
//      <Select.Option key={index} value={fecha}>
//        {fecha}
//      </Select.Option>
//    );
//  });

//  const handleFiltroFechaChange = (valor) => {
//    setFiltroFecha(valor);
//    console.log(valor)
//  };
//  // FIN FILTRO FECHAS

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



//   const columns1 = [
//     {
//       title: 'Influencer',
//       dataIndex: 'Influencer',
//       filters: dataTablas.Destacados.map(Influencer => ({ text: Influencer.Influencer, value: Influencer.Influencer})),
//       filterMode: 'tree',
//       filterSearch: true,
//       onFilter: (value, record) => record.Influencer.includes(value),
//       width: '200%',
     
//     },
//     {
//       title: (
//         <Tooltip title="Popularidad del influencer en relación con los demás nodos en la red">
//         % Popularidad
//         </Tooltip>
//       ),
//       dataIndex: 'Centralidad',
//       sorter: (a, b) => a.Centralidad - b.Centralidad,
//       width: '200%',
//     },

   
//   ];

//   const onChange1 = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   };


//   const columns2 = [
//     {
//       title: 'Influencer',
//       dataIndex: 'Influencer',
//       filters: dataTablas.Claves.map(Influencer => ({ text: Influencer.Influencer, value: Influencer.Influencer})),
//       filterMode: 'tree',
//       filterSearch: true,
//       onFilter: (value, record) => record.Influencer.includes(value),
//       width: '200%',
//     },
//     {
//       title: (
//         <Tooltip title="Grado de interconexión que el influencer tiene en comparación con los demás nodos en la red">
//         % Enlace
//         </Tooltip>
//       ),
//       dataIndex: 'Centralidad',
//       sorter: (a, b) => a.Centralidad - b.Centralidad,
//       width: '100%',
//     } 
//   ];

//   const onChange2 = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   };

//   const columns3 = [
//     {
//       title: 'Influencer',
//       dataIndex: 'Influencer',
//       filters: dataTablas.Eficientes.map(Influencer => ({ text: Influencer.Influencer, value: Influencer.Influencer})),
//       filterMode: 'tree',
//       filterSearch: true,
//       onFilter: (value, record) => record.Influencer.includes(value),
//       width: '200%',
//     },
//     {
//       title:  (
//         <Tooltip title="Eficiencia o rapidez con la que el influencer puede acceder o comunicarse con otros nodos en la red">
//         % Eficiencia
//         </Tooltip>
//       ),
//       dataIndex: 'Centralidad',
//       sorter: (a, b) => a.Centralidad - b.Centralidad,
//       width: '100%',
//     },
   
//   ];

//   const onChange3 = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   };

//   const columns4 = [
//     {
//       title: 'Influencer',
//       dataIndex: 'Influencer',
//       filters: dataTablas.AltoImpacto.map(Influencer => ({ text: Influencer.Influencer, value: Influencer.Influencer})),
//       filterMode: 'tree',
//       filterSearch: true,
//       onFilter: (value, record) => record.Influencer.includes(value),
//       width: '200%',
//     },
//     {
//       title: (
//         <Tooltip title="Importancia del influencer en la red en función de su capacidad para influir en otros nodos y expandir su alcance">
//         Indice Influencia
//         </Tooltip>
//       ),
//       dataIndex: 'Centralidad',
//       sorter: (a, b) => a.Centralidad - b.Centralidad,
//       width: '100%',
//     },
   
//   ];

//   const onChange4 = (pagination, filters, sorter, extra) => {
//     console.log('params', pagination, filters, sorter, extra);
//   };


//   const abrirEnOtraPestaña = () => {
//     const url = `/dashboard/grafoComunidades`;
//     window.open(url, '_blank');
//   };


  
//   return (
//     <div className="fondo-grafo">
//     <div className="card-body">


//      {/*FILTRO FECHAS*/}
//      <Select placeholder="Fechas" className='fechas-grafos' onChange={handleFiltroFechaChange} defaultValue={filtroFecha}>
//       {opciones}
//     </Select>



  
  
 
    



   
//     <div>
    
//     <div className='carta video-texto2 scrollable-card'> 
//     <Tooltip title="Click para ver el grafo">
//     <a href={`https://qsngrafos.vercel.app/comunidades/tendencias/grafo_comunidades_menos_gob-${filtroFecha}.html`} target="_blank">
//     <div className='video-explicativo cartaGrafo'>
//       <img src={imagen} className='imagen-grafo' />
//     </div>
//     </a>
//     </Tooltip>
   
//     <video src={video} autoplay muted loop type="video/mp4" controls className="video-explicativo cartaGrafo" ></video>
//     </div>
//     <div className="carta" >
    
//       ¡Felicitaciones, llegaste al grafo más poderoso en lo que respecta a comprender la estructura y dinámica de las interacciones sociales en las redes! Estos grafos de comunidades, en el contexto del análisis de texto en las redes, proporcionan una visión profunda de las interacciones sociales en la plataforma. Permiten identificar a los usuarios influyentes, descubrir indirectamente temas y conversaciones relevantes, y comprender cómo se conectan y relacionan los usuarios en la red. Estos conocimientos pueden ser valiosos para la toma de decisiones estratégicas, la identificación de oportunidades de colaboración y el diseño de estrategias de contenido y comunicaciones efectivas.
// Los usuarios más influyentes o centrales en la red pueden ser considerados líderes de opinión o influencers, ya que su participación en conversaciones y su capacidad para generar interacciones los posiciona como actores claves en la difusión de información y la influencia social.
// También se pueden identificar los puentes o enlaces que conectan grupos diferentes, analizando las conexiones entre comunidades. Esto permite identificar oportunidades de colaboración, identificar posibles líderes de opinión que pueden actuar como conectores entre comunidades y comprender cómo se propaga la información a través de la red.
// En el grafo podrás identificar las comunidades por colores, los nodos representan los usuarios y las aristas o líneas del grafo representan las conexiones entre ellos. 
// En un gráfico de comunidades, las conexiones entre nodos claves para difundir mensajes se ven más fuertes, como líneas más gruesas, mientras que las conexiones con nodos menos relevantes para la difusión se ven más débiles, como líneas más delgadas. 
// Las conexiones cercanas a nodos importantes se acortan, como si fueran líneas más cortas, lo que significa que tienen acceso rápido y directo al resto de la red. Por otro lado, las conexiones a nodos menos relevantes se alargan, como si fueran líneas más largas, lo que implica un acceso menos eficiente a otros nodos en la red. Esto refleja la capacidad de los nodos para comunicarse de manera rápida y directa con el resto de la red.

    
//     </div>
//     <div className='contenedorTablasGrafo' style={{display:displayGrafoComunidades}}>
//           {/*VIDEO Y EXPLICACIÓN*/}
//           <div className='video-texto2 carta scrollable-card'>
//             <video src={videoTablas} autoplay muted loop type="video/mp4" controls className="video-explicativo-tabla cartaGrafo" ></video>
//             <div className="texto-explicativo-tablas carta scrollable-card" >
//               <br></br>
//               <br></br>
//               <br></br>
//               <ul>
//                   <li><strong>Influencers Destacados (Centralidad general):</strong> Aquí puedes identificar los influencers con mayor centralidad en la red. Estos influencers son importantes en términos generales, por su alto número de conexiones o interacciones con otros usuarios en la red. </li>
//                   <li><strong>Influencers Claves (Centralidad de intermediación):</strong>  Los influencers con alta centralidad de intermediación actúan como puentes o conectores importantes entre diferentes partes de la red. Pueden no tener necesariamente un alto número de conexiones directas, no ser un influencer destacado, pero su posición estratégica les permite influir en la difusión de información o mensajes en la red conectando diferentes comunidades. </li>
//                   <li><strong>Influencers Eficientes (Centralidad de cercanía):</strong>  Los influencers con alta centralidad de cercanía tienen una capacidad rápida y directa para acceder al resto de la red. Pueden tener un tiempo de respuesta rápido o una gran influencia en su comunidad inmediata, es decir, aquellos que tienen una posición estratégica para acceder rápidamente a otros usuarios y establecer conexiones efectivas en la red.</li>
//                   <li><strong>Influencers de Alto Impacto (Centralidad del autovector):</strong>  Los influencers con alta centralidad del autovector son aquellos que están conectados con otros influencers importantes. Esto indica que su influencia se extiende a través de conexiones fuertes en la red y que tienen una influencia significativa en el comportamiento de otros influencers.</li>
//               </ul>
            
//             </div>
//             </div>




//           <div className='Tablas'>{/*TABLAS*/}
//           <div>
//           <div className='subtitulo-carta'>Influencers Destacados</div>
//           <Table columns={columns1}  showTitle={false} dataSource={dataTablas.Destacados} onChange={onChange1} style={{width:"500px"}} scroll={{
//             y: 280,
//             x:280
//           }}/>
//           </div>

//           <div>
//           <div className='subtitulo-carta'>Influencers Claves</div>
//           <Table columns={columns2}  showTitle={false} dataSource={dataTablas.Claves} onChange={onChange2} style={{width:"500px"}}  scroll={{
//             y: 280,
//             x:280
//           }}/>
//           </div>

//           <div>
//           <div className='subtitulo-carta'>Influencers Eficientes</div>
//           <Table columns={columns3}  showTitle={false} dataSource={dataTablas.Eficientes} onChange={onChange3} style={{width:"500px"}}  scroll={{
//             y: 280,
//             x:280
//           }}/>
//           </div>

//           <div>
//           <div className='subtitulo-carta'>Influencers de Alto Impacto</div>
//           <Table columns={columns4}  showTitle={false} dataSource={dataTablas.AltoImpacto} onChange={onChange4} style={{width:"500px"}}  scroll={{
//             y: 280,
//             x:280
//           }}/>
//           </div>
//           </div>

//           </div> 
//       </div>


//     </div>

     
//     </div>
//     );
//     }