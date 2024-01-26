import React, { useState, useEffect } from 'react';
import { Column, G2 } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Button, Tooltip } from 'antd';
import {HiDocumentDownload} from 'react-icons/hi'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';


export default function BarrasApiladasModeloFiltro() {
  const datos = useSelector(state=> state.datosFiltrados)
  const filtros = useSelector(state=>state.filtros)
  const filtroModelo = filtros.modelo
  const filtroCategoria = filtros.categoria



  function organizeTweetsByDayAndCategories(data, filtroModelo, filtroCategoria) {
    
    const tweetsByDay = {};
    data.forEach(tweet => {
      const date = tweet.date;
      if (!tweetsByDay[date]) {
        tweetsByDay[date] = [];
      }
      tweetsByDay[date].push(tweet);
    });
  
    console.log("1 paso",tweetsByDay);
    const categoryCountsByDay = {};
  
    Object.entries(tweetsByDay).forEach(([date, tweets]) => {
      const categoryCounts = {};
  
      filtroCategoria.forEach(category => {
        categoryCounts[category] = 0;
      });
  
      tweets.forEach(tweet => {
        filtroModelo.forEach(model => {
          const attributeValues = tweet[model];
          if (Array.isArray(attributeValues)) {
            attributeValues.forEach(value => {
              if (filtroCategoria.includes(value)) {
                categoryCounts[value] += 1;
              }
            });
          } else {
            if (filtroCategoria.includes(attributeValues)) {
              categoryCounts[attributeValues] += 1;
            }
          }
        });
      });
  
      categoryCountsByDay[date] = categoryCounts;
    });
  
    console.log(filtroModelo, filtroCategoria);
    console.log("2 paso", categoryCountsByDay);
  
    const formattedData = [];

    Object.entries(categoryCountsByDay)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .forEach(([date, categoryCounts]) => {
        const totalCount = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
    
        Object.entries(categoryCounts).forEach(([category, count]) => {
          if (filtroCategoria.includes(category) && count > 0) {
            const valuePercentage = (count / totalCount) * 100;
    
            formattedData.push({
              dia: date,
              categoria: category,
              valor: count,
              porcentaje: valuePercentage,
            });
          }
        });
      });
  
    console.log("3 paso", formattedData);
    return formattedData;
  }
    
      const datatweet = organizeTweetsByDayAndCategories( datos,filtroModelo, filtroCategoria);
  




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
      data: datatweet,
      xField: 'dia',
      yField: 'porcentaje',
      seriesField: 'categoria',
      isPercent: true,
      isStack: true,
      meta: {
        valor: {
          min: 0,
          max: 100,
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
      tooltip: {
        customContent: (title, data) => {
          if (data && data.length > 0 && data[0].data) {
            const { categoria, valor, porcentaje } = data[0].data;
            return <div className='tooltip-treemap-modelo'> ● {categoria}:{valor} eventos </div>;
          }
          return '';
        },
      },
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
    if (datatweet) {
      const worksheet = utils.json_to_sheet(datatweet);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Datos');
      const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `EventosCategorias%_${date}.xlsx`;

  saveAs(data, fileName);
      
    }
  };


  return <div>
  <div className='titulo-carta'>Categorias diario</div>

   <div className='subtitulo-carta'>Eventos categorizados por categorias filtradas en %
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
   <Column {...config} className='carta'/>
   </div>;
};