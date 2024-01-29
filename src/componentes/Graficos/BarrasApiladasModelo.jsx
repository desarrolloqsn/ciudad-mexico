import React, { useState, useEffect } from 'react';
import { Column, G2 } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Button, Tooltip } from 'antd';
import {HiDocumentDownload} from 'react-icons/hi'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';


export default function BarrasApiladasModelo() {
  const datos = useSelector(state=> state.datosFiltrados)
  const [dataTweets, setData] = useState([]);
  const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  
    const tweetsFiltrados = datos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });

    const attribute = modeloSinEspacios; // Atributo específico para mostrar categorías
    

    useEffect(() => {
      const formattedData = organizeTweetsByDayAndCategories(datos , attribute);
      setData(formattedData);
    }, [datos]);


    const categoriasModelos = [
      {modelo: "Atributos", categorias: ["Autoridad","Capacidad","Cercanía","Coherencia","Deshonestidad","Dinamismo","Falta de Autoridad","Falta de Capacidad","Falta de cercanía","Falta de Responsabilidad","Falta de sensibilidad","Falta de Trayectoria","Honestidad","Incoherencia","Interacción","Responsabilidad","Sensibilidad","Trayectoria" ]},
      {modelo: "Clima%20social", categorias:["Autoritarismo","Cambio","Calma","Continuidad","Democracia","Desorden","Despolitizacion","División","Estabilidad","Individualismo","Inestabilidad", "Injusticia","Irritación","Justicia","Orden", "Unidad","Pertenencia Social","Politizacion"]},
      { modelo: "Continuidad%20y%20cambio", categorias: ["Cambio", "Continuidad"] },
      {modelo: "Emociones%20B%C3%A1sicas%20(Plutchik)", categorias: ["Alegría", "Previsión", "Rechazo", "Confianza", "Ira", "Miedo", "Sorpresa", "Tristeza"] },
      {modelo:"Preocupaciones", categorias: ["Ambiente", "Conflictividad", "Corrupción", "Derechos Humanos","Educación", "Economía", "Trabajo","Tránsito y Vialidad", "Salud","Seguridad", "Vivienda","Obra Pública"]},
      {modelo: "Red%20motivacional%20del%20voto", categorias: ["Voto Blanco", "Voto Clientelar", "Voto Emocional", "Voto Ganador", "Voto Ideológico", "Voto Partidario", "Voto Plebiscitario", "Voto Racional", "Voto de Ira", "Voto del Miedo", "Voto por carisma", "Voto Útil"] },
      {modelo:"Sentimientos", categorias: ["Agotamiento","Agrado","Amor","Alegría","Altivez","Apatía","Aversión","Calma","Certeza","Compasíon","Desagrado","Deseo","Dolor","Duda","Entusiasmo","Frustración","Humillacion","Odio","Placer","Satisfacción","Tensíon","Valor","Vigor"]},
      // { modelo: "Voto%20Emocional%20y%20Racional", categorias: ["Voto Emocional", "Voto Racional"] }
        ];
    
    const categoriasModelosSelector = [
      {modelo: "Atributos", categorias: ["Autoridad","Capacidad","Cercanía","Coherencia","Deshonestidad","Dinamismo","Falta de Autoridad","Falta de Capacidad","Falta de cercanía","Falta de Responsabilidad","Falta de sensibilidad","Falta de Trayectoria","Honestidad","Incoherencia","Interacción","Responsabilidad","Sensibilidad","Trayectoria" ]},
      {modelo: "Clima social", categorias:["Autoritarismo","Cambio","Calma","Continuidad","Democracia","Desorden","Despolitizacion","División","Estabilidad","Individualismo","Inestabilidad", "Injusticia","Irritación","Justicia","Orden", "Unidad","Pertenencia Social","Politizacion"]},
      {modelo:"Continuidad y cambio", categorias: ["Cambio", "Continuidad"] },
      {modelo:"Emociones Básicas (Plutchik)", categorias: ["Alegría", "Previsión", "Rechazo", "Confianza", "Ira", "Miedo", "Sorpresa", "Tristeza"] },
      {modelo:"Preocupaciones", categorias: ["Ambiente", "Conflictividad", "Corrupción", "Derechos Humanos","Educación", "Economía", "Trabajo","Tránsito y Vialidad", "Salud","Seguridad", "Vivienda","Obra Pública"]},
      { modelo: "Red motivacional del voto", categorias: ["Voto Blanco", "Voto Clientelar", "Voto Emocional","voto Ganador", "Voto Ideológico", "Voto Partidario", "Voto Plebiscitario", "Voto Racional", "Voto de Ira", "Voto del Miedo", "Voto por carisma", "Voto Útil"] },
      {modelo:"Sentimientos", categorias: ["Agotamiento","Agrado","Amor","Alegría","Altivez","Apatía","Aversión","Calma","Certeza","Compasíon","Desagrado","Deseo","Dolor","Duda","Entusiasmo","Frustración","Humillacion","Odio","Placer","Satisfacción","Tensíon","Valor","Vigor"]},
      // { modelo: "Voto Emocional y Racional", categorias: ["Voto Emocional", "Voto Racional"] }
      ];
    function organizeTweetsByDayAndCategories(data, attribute) {
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
    
      // Objeto para almacenar los contadores de categorías por día
      const categoryCountsByDay = {};
    
      // Recorrer los tweets por día y contar las categorías
      Object.entries(tweetsByDay).forEach(([date, tweets]) => {
        const categoryCounts = {};
    
        // Inicializar los contadores para las categorías del atributo especificado
        categoryCounts[attribute] = {};
        tweets.forEach(tweet => {
          const attributeValues = tweet[attribute];
          if (attributeValues) {
            attributeValues.forEach(value => {
              categoryCounts[attribute][value] = 0;
            });
          }
        });
    
        // Contar las categorías por tweet
        tweets.forEach(tweet => {
          const attributeValues = tweet[attribute];
          if (attributeValues) {
            attributeValues.forEach(value => {
              if (categoryCounts[attribute].hasOwnProperty(value)) {
                categoryCounts[attribute][value]++;
              }
            });
          }
        });
    
        categoryCountsByDay[date] = categoryCounts;
      });
    
      // Convertir los objetos a un arreglo en el formato deseado
      const formattedData = [];
      Object.entries(categoryCountsByDay)
        .sort((a, b) => new Date(a[0]) - new Date(b[0])) // Ordenar por fecha
        .forEach(([date, categoryCounts]) => {
          if (categoryCounts.hasOwnProperty(attribute)) {
            Object.entries(categoryCounts[attribute]).forEach(([category, value]) => {
              if (value !== 0) { // Filtrar las categorías con valor diferente de cero
                formattedData.push({
                  dia: date,
                  categoria: category,
                  valor: value
                });
              }
            });
          }
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
      seriesField: 'categoria',
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
  const fileName = `EventosCategorias%_${date}.xlsx`;

  saveAs(data, fileName);
      
    }
  };


  return <div>

  <div className='titulo-carta'>{tweetsFiltrados.length > 0 ? "Categorias diario" : "Modelos diario"}</div>

   <div className='subtitulo-carta'>{tweetsFiltrados.length > 0 ? "Eventos categorizados por categorias en %" : "Eventos categorizados por modelos"}
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
   <Column {...config} className='carta'/>
   </div>;
};