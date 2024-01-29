import React, { useState, useEffect } from 'react';
import { Radar } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import { Button, Tooltip } from 'antd';



export default function Radial (){
  const tweets = useSelector(state=> state.datosFiltrados)
  const location = useLocation();
  const currentUrl = location.pathname;
  const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
  const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));

  const tweetsFiltrados = tweets.filter(tweet => {
    const propiedadModelo = tweet[modeloSinEspacios];
    return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
  });
  
  // console.log(tweetsFiltrados);



  // console.log(subUrl) //obtengo que modelo es
  const seriesArray = [...new Set(tweetsFiltrados.map(obj => obj.seriesName))];
  // console.log(seriesArray);
  
  let count;
  if (tweetsFiltrados.length > 0) {
    count = tweetsFiltrados.filter(tweet => tweet.hasOwnProperty(modeloSinEspacios) && tweet[modeloSinEspacios].length > 0).length;
  } else {
    count = tweets.filter(tweet => tweet.hasOwnProperty(modeloSinEspacios) && tweet[modeloSinEspacios].length > 0).length;
  }
  
  // console.log(count);

  
  const categoriasModelos = [
    {modelo: "Atributos", categorias: ["Autoridad","Capacidad","Cercanía","Coherencia","Deshonestidad","Dinamismo","Falta de Autoridad","Falta de Capacidad","Falta de cercanía","Falta de Responsabilidad","Falta de sensibilidad","Falta de Trayectoria","Honestidad","Incoherencia","Interacción","Responsabilidad","Sensibilidad","Trayectoria" ]},
    {modelo: "Clima%20social", categorias:["Autoritarismo","Cambio","Calma","Continuidad","Democracia","Desorden","Despolitizacion","División","Estabilidad","Individualismo","Inestabilidad", "Injusticia","Irritación","Justicia","Orden", "Unidad","Pertenencia Social","Politizacion"]},
    { modelo: "Continuidad%20y%20cambio", categorias: ["Cambio", "Continuidad"] },
    {modelo: "Emociones%20B%C3%A1sicas%20(Plutchik)", categorias: ["Alegría", "Previsión", "Rechazo", "Confianza", "Ira", "Miedo", "Sorpresa", "Tristeza"] },
    {modelo: "Preocupaciones", categorias:["Seguridad", "Tránsito y Vialidad", "Corrupcion", "Inflacion", "Trabajo", "Educacion", "Contaminacion", "Salud", "Ambiente"]},
    {modelo: "Red%20motivacional%20del%20voto", categorias: ["Voto Blanco", "Voto Clientelar", "Voto Emocional", "Voto Ganador", "Voto Ideológico", "Voto Partidario", "Voto Plebiscitario", "Voto Racional", "Voto de Ira", "Voto del Miedo", "Voto por carisma", "Voto Útil"] },
    {modelo:"Sentimientos", categorias: ["Agotamiento","Agrado","Amor","Alegría","Altivez","Apatía","Aversión","Calma","Certeza","Compasíon","Desagrado","Deseo","Dolor","Duda","Entusiasmo","Frustración","Humillacion","Odio","Placer","Satisfacción","Tensíon","Valor","Vigor"]},
    // { modelo: "Voto%20Emocional%20y%20Racional", categorias: ["Voto Emocional", "Voto Racional"] }
      ];
  
  const categoriasModelosSelector = [
    {modelo: "Atributos", categorias: ["Autoridad","Capacidad","Cercanía","Coherencia","Deshonestidad","Dinamismo","Falta de Autoridad","Falta de Capacidad","Falta de cercanía","Falta de Responsabilidad","Falta de sensibilidad","Falta de Trayectoria","Honestidad","Incoherencia","Interacción","Responsabilidad","Sensibilidad","Trayectoria" ]},
    {modelo: "Clima social", categorias:["Autoritarismo","Cambio","Calma","Continuidad","Democracia","Desorden","Despolitizacion","División","Estabilidad","Individualismo","Inestabilidad", "Injusticia","Irritación","Justicia","Orden", "Unidad","Pertenencia Social","Politizacion"]},
    {modelo:"Continuidad y cambio", categorias: ["Cambio", "Continuidad"] },
    {modelo:"Emociones Básicas (Plutchik)", categorias: ["Alegría", "Previsión", "Rechazo", "Confianza", "Ira", "Miedo", "Sorpresa", "Tristeza"] },
    {modelo:"Preocupaciones", categorias: ["Seguridad", "Tránsito y Vialidad", "Corrupcion", "Inflacion", "Trabajo", "Educacion", "Contaminacion", "Salud", "Ambiente"]},
    { modelo: "Red motivacional del voto", categorias: ["Voto Blanco", "Voto Clientelar", "Voto Emocional","voto Ganador", "Voto Ideológico", "Voto Partidario", "Voto Plebiscitario", "Voto Racional", "Voto de Ira", "Voto del Miedo", "Voto por carisma", "Voto Útil"] },
    {modelo:"Sentimientos", categorias: ["Agotamiento","Agrado","Amor","Alegría","Altivez","Apatía","Aversión","Calma","Certeza","Compasíon","Desagrado","Deseo","Dolor","Duda","Entusiasmo","Frustración","Humillacion","Odio","Placer","Satisfacción","Tensíon","Valor","Vigor"]},
    // { modelo: "Voto Emocional y Racional", categorias: ["Voto Emocional", "Voto Racional"] }
    ];


const categorias = categoriasModelos.find(item => item.modelo === subUrl)?.categorias || [];
const totalTweetsPorSerie = {}; // Objeto para almacenar el total de tweets por serie

const categoriasMencionadas = categorias.flatMap(categoria => {
  const mencionesPorCategoria = seriesArray.map(seriesName => {
    const tweetsEnSeries = tweets.filter(tweet => tweet.seriesName === seriesName);
    const count = tweetsEnSeries.filter(
      tweet =>
        tweet.hasOwnProperty(modeloSinEspacios) &&
        tweet[modeloSinEspacios].includes(categoria)
    ).length;

    // Calcular el total de tweets por serie
    if (!totalTweetsPorSerie[seriesName]) {
      totalTweetsPorSerie[seriesName] = tweetsEnSeries.length;
    }

    return {
      item: categoria,
      user: seriesName,
      score: count
    };
  });

  const totalMencionesCategoria = mencionesPorCategoria.reduce(
    (total, mencion) => total + mencion.score,
    0
  );

  return {
    categoria,
    menciones: totalMencionesCategoria
  };
});

function crearRadar(tweets) {
    // Ordenar las categorías por la cantidad de menciones de mayor a menor
  categoriasMencionadas.sort((a, b) => b.menciones - a.menciones);

  const categoriasFiltradas = categoriasMencionadas.slice(0, 10).map(
    mencion => mencion.categoria
  );

  return categoriasFiltradas.flatMap(categoria => {
    return seriesArray.map(seriesName => {
      const tweetsEnSeries = tweets.filter(tweet => tweet.seriesName === seriesName);
      const count = tweetsEnSeries.filter(
        tweet =>
          tweet.hasOwnProperty(modeloSinEspacios) &&
          tweet[modeloSinEspacios].includes(categoria)
      ).length;

      return {
        item: categoria,
        user: seriesName,
        score: count
      };
    });
  });
}

const datos = crearRadar(tweetsFiltrados)
// console.log(tweetsFiltrados);
// console.log(categorias);
// console.log(seriesArray);
// console.log(datos);

// Llamada a la función crearRadar para obtener los datos

// Obtener el máximo valor de score en los datos
const maxScore = Math.max(...datos.map(item => item.score));

const datosPorcentaje = datos.map(item => ({
  ...item,
  score: Math.round((item.score / tweetsFiltrados.length) * 100)
}));

const config = {
  data: datosPorcentaje,
  xField: 'item',
  yField: 'score',
  seriesField: 'user',
  meta: {
    score: {
      alias: '%',
      min: 0,
      max: 100,
    },
  },
 
  xAxis: {
    line: null,
    tickLine: null,
     grid: {
          line: {
        style: {
          lineDash: null,
          lineWidth: 2
          
        },
      },
    },
  },
  yAxis: {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: 'line',
        style: {
          lineDash: null,
          lineWidth: 2
        },
      },
      alternateColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  area: {},
  point: {
    size: 2,
  },
  interactions: [
    {
      type: 'element-highlight-by-color',
    },
    {
      type: 'element-link',
    },
    {
      type: 'element-single-selected',
    },
  ],
  tooltip: {
    position: 'bottom',
    offset: 100,
   
  },
};
const handleDownloadExcel = () => {
  if (datosPorcentaje) {
    const worksheet = utils.json_to_sheet(datosPorcentaje);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Datos');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `CategoriasEn%_${date}.xlsx`;

  saveAs(data, fileName);
    
  }
};
return (
  <div>
    <div className='titulo-carta'>Categorías</div>
    
    <div className='subtitulo-carta'>
        <div>Porcentaje de participación por categoría</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
    <div className='carta'>
    <Radar {...config} />
    </div>
  </div>
);
}
