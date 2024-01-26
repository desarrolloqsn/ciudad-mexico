import React, { useState, useRef, useEffect } from 'react';
import { Pie, measureTextWidth , Column} from '@ant-design/plots';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import {HiDocumentDownload} from 'react-icons/hi'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import { Button, Tooltip } from 'antd';





export default function AnilloPolaridad() {
  const datos = useSelector(state=> state.datosFiltrados)
  const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  
    const tweetsFiltrados = datos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });

  const datatweet = [
  { type: 'Positivo', value: 0 },
  { type: 'Negativo', value: 0 },
  { type: 'Neutral', value: 0 }
];

if(tweetsFiltrados.length > 0){
  tweetsFiltrados.forEach(tweet => {
    if (tweet.sentimiento === 'positivo') {
      datatweet[0].value++;
    } else if (tweet.sentimiento === 'negativo') {
      datatweet[1].value++;
    } else {
      datatweet[2].value++;
    }
  });
  
} else {
  datos.forEach(tweet => {
    if (tweet.sentimiento === 'positivo') {
      datatweet[0].value++;
    } else if (tweet.sentimiento === 'negativo') {
      datatweet[1].value++;
    } else {
      datatweet[2].value++;
    }
  });

}


// console.log(data);




function renderStatistic(containerWidth, text, style) {
  const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
  const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

  let scale = 1;

  if (containerWidth < textWidth) {
    scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
  }

  const textStyleStr = `width:${containerWidth}px;`;
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
}

  const config = {
    color: ['#14ae5c88', '#fa14149f', '#7676769f'],
    appendPadding: 20,
    data: datatweet,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} %`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const totalValue = data.reduce((total, d) => total + d.value, 0);
          const percentage = totalValue !== 0 ? ((datum ? datum.value : totalValue) / totalValue * 100).toFixed(2) : 0;
          const text = datum ? datum.type : 'Polaridad';
          // const displayText = datum ? ` ${percentage} %` : '';
          const finalText = `${text}`;
          return renderStatistic(width, finalText, {
            fontSize: 10,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '20px',
        },
        customHtml: (container, view, datum, data) => {
          console.log(data)
          const { width } = container.getBoundingClientRect();
          const totalValue = data.reduce((total, d) => total + d.value, 0);
          const percentage = totalValue !== 0 ? ((datum ? datum.value : totalValue) / totalValue * 100).toFixed(2) : 0;
          const text = datum ? datum.type : 'Polaridad';
          const displayText = datum ? ` ${percentage} %` : '';
          const finalText = `${displayText}`;
          return renderStatistic(width, finalText, {
            fontSize: 10,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };


  const chartContainerRef = useRef(null);
  // const [filter, setFilter] = useState(null);

  // const handleClick = (event) => {
  //   const { data } = event;
  //   if (data) {
  //     // console.log('Item clicked:', data.type);
  //     setFilter(data.type);
  //     // Otras operaciones o llamadas a funciones según sea necesario
  //   }
  // };

  // useEffect(() => {
  //   const chartContainer = chartContainerRef.current;
  //   if (chartContainer) {
  //     chartContainer.addEventListener('click', handleClick);
  //   }

  //   return () => {
  //     if (chartContainer) {
  //       chartContainer.removeEventListener('click', handleClick);
  //     }
  //   };
  // }, []);



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
  const fileName = `Polaridad_${date}.xlsx`;

  saveAs(data, fileName);
    
    }
  };

  
  return (
    <div>
    <div className='titulo-carta'>Polaridad</div>
    <div className='subtitulo-carta'>
        <div>Eventos Categorizados</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
    <div className='chart carta' ref={chartContainerRef}>
      <Pie {...config} className='polaridad' />
    </div>
    </div>
  );
};