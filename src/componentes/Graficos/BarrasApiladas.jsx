import React, { useState, useEffect } from 'react';
import { Column, G2 } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import { Button, Tooltip } from 'antd';

export default function GraficoArreglado() {
  const [dataTweets, setData] = useState([]);
  const datos = useSelector(state => state.datosFiltrados);

  useEffect(() => {
    const formattedData = organizeTweetsByDayAndAttributes(datos);
    setData(formattedData);
  }, [datos]);

  function organizeTweetsByDayAndAttributes(data) {
    // Objeto para almacenar los tweets por día
    const tweetsByDay = {};

    // Recorrer los tweets y agruparlos por día
    data.forEach(tweet => {
      const date = tweet.date;
      if (!tweetsByDay[date]) {
        tweetsByDay[date] = [];
      }
      tweetsByDay[date].push(tweet);
    });

    // Objeto para almacenar los atributos y sus valores
    const attributes = [
      'Atributos',
      'Clima Social',
      'Continuidad y cambio',
      'Emociones Básicas (Plutchik)',
      'Preocupaciones',
      'Red motivacional del voto',
      'Sentimientos',
      'Voto Emocional y Racional'
    ];

    // Objeto para almacenar los contadores de atributos por día
    const attributeCountsByDay = {};

    // Recorrer los tweets por día y contar los atributos
    Object.entries(tweetsByDay).forEach(([date, tweets]) => {
      const attributeCounts = {};

      // Inicializar los contadores para cada atributo
      attributes.forEach(attribute => {
        attributeCounts[attribute] = 0;
      });

      // Contar los atributos por tweet
      tweets.forEach(tweet => {
        attributes.forEach(attribute => {
          const attributeArray = tweet[attribute];
          if (attributeArray && attributeArray.length > 0) {
            attributeCounts[attribute] += attributeArray.length;
          }
        });
      });

      attributeCountsByDay[date] = attributeCounts;
    });

    // Convertir los objetos a un arreglo en el formato deseado
    const formattedData = [];
    Object.entries(attributeCountsByDay)
      .sort((a, b) => new Date(a[0]) - new Date(b[0])) // Ordenar por fecha
      .forEach(([date, attributeCounts]) => {
        const formattedAttributes = Object.entries(attributeCounts).map(([attribute, value]) => {
          return {
            dia: date,
            modelo: attribute,
            valor: value
          };
        });
        formattedData.push(...formattedAttributes);
      });

    return formattedData;
  }

  G2.registerInteraction('element-link', {
    start: [
      {
        trigger: 'interval:mouseenter',
        action: 'element-link-by-color:link',
      },
    ],
    end: [
      {
        trigger: 'interval:mouseleave',
        action: 'element-link-by-color:unlink',
      },
    ],
  });
  const config = {
    data: dataTweets,
    xField: 'dia',
    yField: 'valor',
    seriesField: 'modelo',
    isPercent: true,
    isStack: true,
    meta: {
      valor: {
        min: 0,
        max: 1,
      },
    },
    label: false,
   /*  label: {
      position: 'middle',
      content: (item) => {
        return `${(item.value * 100).toFixed(2)}%`;
      },
      style: {
        fill: '#fff',
      },
    }, */
    tooltip: false,
    interactions: [
      {
        type: 'element-highlight-by-color',
      },
      {
        type: 'element-link',
      },
    ],
  };
  const handleDownloadExcel = () => {
    if (dataTweets) {
      const worksheet = utils.json_to_sheet(dataTweets);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Datos');
      const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `ModelosDiarios_${date}.xlsx`;

  saveAs(data, fileName);
      
    }
  };

 
  return <div>
  <div className='titulo-carta'>Modelos diario</div>

   <div className='subtitulo-carta'>
        <div>Eventos categorizados por modelos</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip></div>

   <Column {...config} className='carta'/>
   </div>;
}