import { Area, Line } from '@ant-design/plots';
import { Button, Modal, Spin, Tooltip } from 'antd';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import './Graficos.css';
import React, { useEffect , useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'

export default function LineaEventos() {
    const [isModalVisible, setIsModalVisible] = useState(false);


    const loading = useSelector(state=>state.loadingGetDataDash)
    const error = useSelector(state=>state.errorFiltros)



    const datos = useSelector(state=> state.datosFiltrados)
    const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
   const [modo, setModo] = useState('serie'); // Estado para almacenar el modo actual
    const tweetsFiltrados = datos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });
    // console.log(datos)
    const dias = datos.map(tweet => tweet.date);
    const diasUnicos = [...new Set(dias)];
    const filtros = useSelector(state=> state.filtros)
    // console.log("filtros subserie", filtros.subserie)
    // console.log(diasUnicos);
    // console.log(tweetsFiltrados);
const handleModoClick = () => {
    if (modo === 'serie') {
      setModo('subserie');
    } else {
      setModo('serie');
    }
  };

    const handleLineClick = () => {
      setIsModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setIsModalVisible(false);
    };
    const dispatch = useDispatch();


    
    let countBySeriesAndDate 
    
  
  if (diasUnicos.length > 1) {
    if (tweetsFiltrados.length > 0) {
      countBySeriesAndDate = tweetsFiltrados ? tweetsFiltrados.reduce((count, tweet) => {
        const seriesNames = modo === 'serie' ? [tweet.seriesName] : tweet.subSeriesName;
        const date = tweet.date;
  
        seriesNames.forEach(name => {
          const seriesName = String(name);
  
          if (!count[seriesName]) {
            count[seriesName] = {};
          }
          if (!count[seriesName][date]) {
            count[seriesName][date] = 0;
          }
  
          count[seriesName][date]++;
        });
  
        return count;
      }, {}) : null;
    } else {
      countBySeriesAndDate = datos ? datos.reduce((count, tweet) => {
        const seriesNames = modo === 'serie' ? [tweet.seriesName] : tweet.subSeriesName;
        const date = tweet.date;
  
        seriesNames.forEach(name => {
          const seriesName = String(name);
  
          if (!count[seriesName]) {
            count[seriesName] = {};
          }
          if (!count[seriesName][date]) {
            count[seriesName][date] = 0;
          }
  
          count[seriesName][date]++;
        });
  
        return count;
      }, {}) : null;
    }
  } else if (diasUnicos.length >= 1) {
    if (tweetsFiltrados.length > 0) {
      countBySeriesAndDate = tweetsFiltrados ? tweetsFiltrados.reduce((count, tweet) => {
        const seriesNames = modo === 'serie' ? [tweet.seriesName] : tweet.subSeriesName;
        const date = tweet.hora;
  
        seriesNames.forEach(name => {
          const seriesName = String(name);
  
          if (!count[seriesName]) {
            count[seriesName] = {};
          }
          if (!count[seriesName][date]) {
            count[seriesName][date] = 0;
          }
  
          count[seriesName][date]++;
        });
  
        return count;
      }, {}) : null;
    } else {
      countBySeriesAndDate = datos ? datos.reduce((count, tweet) => {
        const seriesNames = modo === 'serie' ? [tweet.seriesName] : tweet.subSeriesName;
        const date = tweet.hora;
  
        seriesNames.forEach(name => {
          const seriesName = String(name);
  
          if (!count[seriesName]) {
            count[seriesName] = {};
          }
          if (!count[seriesName][date]) {
            count[seriesName][date] = 0;
          }
  
          count[seriesName][date]++;
        });
  
        return count;
      }, {}) : null;
    }
  }
  
  // Filtrar subseries si filtros.subserie está definido
  if (filtros && filtros.subserie && Array.isArray(filtros.subserie) && filtros.subserie.length > 0) {
    const subSeriesFiltradas = filtros.subserie.map(subserie => String(subserie));
  
    Object.keys(countBySeriesAndDate).forEach(seriesName => {
      if (!subSeriesFiltradas.includes(seriesName)) {
        delete countBySeriesAndDate[seriesName];
      }
    });
  }




     // console.log(countBySeriesAndDate);
     
     const data = countBySeriesAndDate ? Object.entries(countBySeriesAndDate).flatMap(([seriesName, dates]) => {
       return Object.entries(dates).map(([date, value]) => {
         return {
           Series: seriesName,
           Dia: date, // Si se necesita convertir a número
           Valor: value,
         };
       });
     }) : null;
     let sortedData = []
    
     // console.log(data);
     if(diasUnicos.length > 1){
       sortedData = data ? data.sort((a, b) => new Date(a.Dia) - new Date(b.Dia)) : null;
     } else {
        sortedData = data ? data.sort((a, b) =>a.Dia - b.Dia) : null;
     }

     const config = {
      data: sortedData,
      xField: 'Dia',
      yField: 'Valor',
      seriesField: 'Series',
      slider: {
        start: 0,
        end: 1,
      },
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
      seriesField: 'Series',
      smooth: true,
      tension: 1, // Hace que las líneas sean curvas
    };


     
        // Paso 1
        const seriesSet = new Set();

        // Paso 2
        for (let i = 0; i < datos.length; i++) {
          const tweet = datos[i];
  
          // Paso 3
          if (tweet.seriesName !== "") {
            // Paso 4
            seriesSet.add(tweet.seriesName);
          }
        }
          
  
      // Paso 1: Crear un conjunto para las subseries únicas
        const subSeriesSet = new Set();
  
        // Paso 2: Recorrer los datos y agregar las subseries al conjunto
        for (let i = 0; i < datos.length; i++) {
          const tweet = datos[i];
          const subSeries = tweet.subSeriesName;
  
          if (Array.isArray(subSeries)) {
            subSeries.forEach((subSerie) => {
              subSeriesSet.add(subSerie);
            });
          }
        }
  
        // Paso 3: Convertir el conjunto en un array de subseries
        const subSeriesArray = Array.from(subSeriesSet);
   
  


    const handleDownloadExcel = () => {
      if (sortedData) {
        const worksheet = utils.json_to_sheet(sortedData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Datos');
        const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `LineaEventos_${date}.xlsx`;

  saveAs(data, fileName);
       
      }
    };

  return (
    <div>
      <div className='titulo-carta'>Linea de eventos</div>
      <div className='subtitulo-carta'>
        <div>Cantidad de eventos por día</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip> </div>
      
      
        <Line {...config} className='lineaEventos carta' style={{ height: '300px' }} />

      
      <Modal title="Mi Modal" open={isModalVisible} onCancel={handleCloseModal} onOk={handleCloseModal}>
        Contenido del modal
      </Modal>
    </div>
  );
}