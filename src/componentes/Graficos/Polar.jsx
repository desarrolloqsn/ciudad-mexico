import React from 'react';
import { Heatmap } from '@ant-design/plots';
import './Graficos.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import { Button, Tooltip } from 'antd';

export default function MapaCalor() {
  const datos = useSelector(state=> state.datosFiltrados)
  const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  
    const tweetsFiltrados = datos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });











  // Crear un objeto para almacenar el recuento de tweets por día y hora
  const tweetCounts = {};

  // Iterar sobre cada tweet para contar los tweets por día y hora
  if (tweetsFiltrados.length > 0) {
    tweetsFiltrados.forEach((tweet) => {
    const tweetDate = new Date(tweet.fecha);
    const diaSemana = tweetDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const hora = tweetDate.getHours(); // Obtener solo la hora en formato numérico

    // Crear una clave única para cada día y hora
    const key = `${diaSemana}-${hora}`;

    // Incrementar el recuento de tweets para la clave correspondiente
    if (tweetCounts[key]) {
      tweetCounts[key]++;
    } else {
      tweetCounts[key] = 1;
    }
  });
}
else {
  datos.forEach((tweet) => {
    const tweetDate = new Date(tweet.fecha);
    const diaSemana = tweetDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const hora = `${tweetDate.getHours()}`; // Obtener solo la hora en formato numérico

    // Crear una clave única para cada día y hora
    const key = `${diaSemana}-${hora}`;

    // Incrementar el recuento de tweets para la clave correspondiente
    if (tweetCounts[key]) {
      tweetCounts[key]++;
    } else {
      tweetCounts[key] = 1;
    }
  });
}

  // Ordenar los días de la semana en el orden deseado (domingo a lunes)
  const diasSemanaOrdenados = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  // Convertir los recuentos de tweets en el formato deseado para el gráfico
  const datatweets = Object.keys(tweetCounts)
    .sort() // Ordenar las claves en orden alfabético (días y horas)
    .map((key) => {
      const [diaSemana, hora] = key.split('-');

      return {
        week: diaSemana,
        time: Number(hora), // Convertir la hora de nuevo a formato numérico
        value: tweetCounts[key],
      };
    })
    .sort((a, b) => diasSemanaOrdenados.indexOf(a.week) - diasSemanaOrdenados.indexOf(b.week)); // Ordenar los datos según el orden de los días de la semana

  const maxValue = Math.max(...datatweets.map((tweet) => tweet.value));
  const minValue = Math.min(...Object.values(tweetCounts));
    // console.log(datatweets)

  const config = {
    data:datatweets,
    xField: 'time',
    yField: 'week',
    colorField: 'value',
    legend: true,
    color: ['#c7edfd', '#2a47db', '#000036'], // Colores de inicio y fin del degradado
  
    coordinate: {
      type: 'polar',
      cfg: {
        innerRadius: 0.2,
      },
    },
    heatmapStyle: {
      stroke: '#f5f5f5',
      opacity: 0.8,
    },
    meta: {
      time: {
        type: 'cat',
        values: [...Array(24).keys()], // Valores personalizados para las horas (0-23)
      },
      value: {
        min: minValue,
        max: maxValue,
      },
    },
    xAxis: {
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 12,
        style: {
          fill: '#2b2b2b',
          fontSize: 12,
          textBaseline: 'top',
        },
      },
    },
    yAxis: {
      top: true,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 0,
        style: {
          fill: '#2b2b2b',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    },
    tooltip: {
      showMarkers: false,
      customContent: (title, data) => {
        if (data && data.length > 0 && data[0].data) {
          const { week, time, value } = data[0].data;
          const diaSemana = week.charAt(0).toUpperCase() + week.slice(1); // Capitalizar el primer carácter del día de la semana
  
          return `<div class="ant-tooltip-inner contenedor-tooltip-polar">
                    <div>
                      <span class="ant-tooltip-title">${diaSemana} ${time}:00</span>
                    </div>
                    <div class="ant-tooltip-content">
                      <ul class="ant-tooltip-list">
                       <li>Tweets: ${value}</li>
                      </ul>
                    </div>
                  </div>`;
        }
  
        return '';
      },
    },
  
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };


  
 const handleDownloadExcel = () => {
  if (datatweets) {
    const worksheet = utils.json_to_sheet(datatweets);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Datos');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `EventosDiaHora_${date}.xlsx`;

  saveAs(data, fileName);
    
  }
};


  return <div>
     <div className='titulo-carta'>Eventos</div>
   
      <div className='subtitulo-carta'>
        <div>Cantidad por dia y hora</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
   <Heatmap {...config} className='mapaCalor carta' style={{height:"432px"}}/> 
   </div>;
};