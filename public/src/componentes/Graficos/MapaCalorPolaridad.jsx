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

export default function MapaCalorPolaridad() {
  const datos = useSelector(state=> state.datosFiltrados)
  const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  
    const tweetsFiltrados = datos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });


  // Crear un objeto para almacenar el recuento y la suma de valor_POS por día y hora
const posCounts = {};
const posSums = {};

// Iterar sobre cada tweet para contar y sumar el valor_POS por día y hora
if (datos.length > 0) {
  datos.forEach((tweet) => {
    const tweetDate = new Date(tweet.fecha);
    const diaSemana = tweetDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const hora = tweetDate.getHours(); // Obtener solo la hora en formato numérico

    // Crear una clave única para cada día y hora
    const key = `${diaSemana}-${hora}`;

    // Incrementar el recuento de tweets para la clave correspondiente
    if (posCounts[key]) {
      posCounts[key]++;
      posSums[key] += tweet.valor_POS;
    } else {
      posCounts[key] = 1;
      posSums[key] = tweet.valor_POS;
    }
  });
}

// Ordenar los días de la semana en el orden deseado (domingo a lunes)
const diasSemanaOrdenados = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

// Calcular el promedio de valor_POS por día y hora
const datapos = Object.keys(posCounts)
  .sort()
  .map((key) => {
    const [diaSemana, hora] = key.split('-');

    const promedioPos = posSums[key] / posCounts[key];
    const value = Math.round(promedioPos * 100); // Multiplicar por 100 y redondear al entero más cercano

    return {
      week: diaSemana,
      time: Number(hora),
      value: value,
    };
  })
  .sort((a, b) => diasSemanaOrdenados.indexOf(a.week) - diasSemanaOrdenados.indexOf(b.week));

// console.log(datapos);
  

const minValue = Math.min(...datapos.map((item) => item.value));
const maxValue = Math.max(...datapos.map((item) => item.value));
const config = {
  data: datapos,
  xField: 'time',
  yField: 'week',
  colorField: 'value',
  legend: true,
  color: [ '#fa14149f',"#a1a1a196", '#cdcdcd9f','#417e4596','#14ae5c88' ],

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
      min: 0,
      max: 100,
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
                      <li>Valor de positividad: ${value}%</li>
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
  if (datapos) {
    const worksheet = utils.json_to_sheet(datapos);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Datos');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `EventosDiaHoraPolaridad_${date}.xlsx`;

  saveAs(data, fileName);
    
  }
};


  return <div>
     <div className='titulo-carta'>Eventos Polaridad</div>
   
    <div className='subtitulo-carta'>
        <div>Polaridad por dia y hora</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
   <Heatmap {...config} className='mapaCalor carta' style={{height:"432px"}}/> 
   </div>;
};