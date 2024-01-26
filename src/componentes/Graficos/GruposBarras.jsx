import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import { Button, Tooltip } from 'antd';

export default function GrupoBarras(){
  const [actores, setActores] = useState(0);
  const [eventos, setEventos] = useState(0);
  const dispatch = useDispatch()
  const datosGraficos = useSelector(state=>state.datosFiltrados)
  const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  
    const tweetsFiltrados = datosGraficos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });








//OBTENGO LOS USUARIOS ORIGINALES SIN REPETIR
const uniqueUserOriginals = [];
function obtenerActoresEventos(){

  if (tweetsFiltrados.length > 0) {
    tweetsFiltrados.forEach((tweet) => {
    
     const userOriginal = tweet.usuarioOriginal;
     if (!uniqueUserOriginals.includes(userOriginal)) {
       uniqueUserOriginals.push(userOriginal);
     }
   });
  const countUniqueUserOriginals = uniqueUserOriginals.length;
  setEventos(tweetsFiltrados.length)
  setActores(countUniqueUserOriginals);
  } else {
    datosGraficos.forEach((tweet) => {
    
      const userOriginal = tweet.usuarioOriginal;
      if (!uniqueUserOriginals.includes(userOriginal)) {
        uniqueUserOriginals.push(userOriginal);
      }
    });
   const countUniqueUserOriginals = uniqueUserOriginals.length;
   setEventos(datosGraficos.length)
   setActores(countUniqueUserOriginals);
  }
  }


  useEffect(() => {
    //console.log(datosGraficos)
  obtenerActoresEventos()
  }, [tweetsFiltrados]);

  const eventosPorDia = {};
  const autoresPorDia = {};
  const autoresUnicosPorDia = {};
  
  if (tweetsFiltrados.length > 0) {
    tweetsFiltrados.forEach((tweet) => {
    const fecha = tweet.date; // Asegúrate de tener una propiedad "date" en tus datosGraficos que represente la fecha del evento
    const dia = fecha && fecha.slice(0, 10); // Extrae el día de la fecha
    
    // Cuenta los eventos por día
    if (!eventosPorDia[dia]) {
      eventosPorDia[dia] = 0;
    }
    eventosPorDia[dia]++;
    
    // Cuenta los autores por día
    const autor = tweet.usuarioOriginal;
    if (!autoresPorDia[dia]) {
      autoresPorDia[dia] = 0;
    }
    autoresPorDia[dia]++;
    
    // Cuenta los autores únicos por día
    if (!autoresUnicosPorDia[dia]) {
      autoresUnicosPorDia[dia] = new Set();
    }
    autoresUnicosPorDia[dia].add(autor);
  });
} else {
  datosGraficos.forEach((tweet) => {
    const fecha = tweet.date; // Asegúrate de tener una propiedad "date" en tus datosGraficos que represente la fecha del evento
    const dia = fecha && fecha.slice(0, 10); // Extrae el día de la fecha
    
    // Cuenta los eventos por día
    if (!eventosPorDia[dia]) {
      eventosPorDia[dia] = 0;
    }
    eventosPorDia[dia]++;
    
    // Cuenta los autores por día
    const autor = tweet.usuarioOriginal;
    if (!autoresPorDia[dia]) {
      autoresPorDia[dia] = 0;
    }
    autoresPorDia[dia]++;
    
    // Cuenta los autores únicos por día
    if (!autoresUnicosPorDia[dia]) {
      autoresUnicosPorDia[dia] = new Set();
    }
    autoresUnicosPorDia[dia].add(autor);
  });

}
 
  const datatweets = [];
  
  for (const dia in eventosPorDia) {
    if (eventosPorDia.hasOwnProperty(dia)) {
      const eventosPorEsteDia = eventosPorDia[dia];

      const autoresUnicosPorEsteDia = autoresUnicosPorDia[dia].size;
  
      const itemEventos = {
        name: "Eventos",
        dia: dia,
        valor: eventosPorEsteDia
      };
  
      
      const itemAutoresUnicos = {
        name: "Autores",
        dia: dia,
        valor: autoresUnicosPorEsteDia
      };
  
      datatweets.push(itemEventos, itemAutoresUnicos);
    }
  }

  datatweets.sort((a, b) => {
    const diaA = a.dia;
    const diaB = b.dia;
    return diaA.localeCompare(diaB, 'en', { numeric: true });
  });
  



  const config = {
    color: '#ff9e6e88-#a0a0a023',
    data: datatweets,
    isGroup: true,
    xField: 'dia',
    yField: 'valor',
    seriesField: 'name',
    // 分组柱状图 组内柱子间的间距 (像素级别)
    dodgePadding: 2,
    // 分组柱状图 组间的间距 (像素级别)
    intervalPadding: 20,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
    columnStyle: {
      radius: [5, 5, 0, 0],
    },
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
  const fileName = `EventosAutoresDiario_${date}.xlsx`;

  saveAs(data, fileName);
     
    }
  };


  return <div>
  <div className='titulo-carta'>Eventos/Autores</div>
  
   <div className='subtitulo-carta'>
        <div>Presencia en redes sociales por día</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
   <Column {...config} className='carta'/>
   </div>;
};