import React , { useState } from 'react'
import {  Button, Col,  Statistic, Tooltip } from "antd";
import CountUp from "react-countup";
import './Graficos.css'
import {  useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import * as XLSX from 'xlsx';
import {HiDocumentDownload} from 'react-icons/hi'

export default function EventosAutores() {
  
  const datosGraficos = useSelector(state=>state.datosFiltrados)
  const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  
    const tweetsFiltrados = datosGraficos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });
    
  // console.log(datosGraficos);


    const [actores, setActores] = useState(0);
  const [eventos, setEventos] = useState(0);
  const formatter = (value) => <CountUp end={value} separator="," />;

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
  // console.log(datosGraficos)
obtenerActoresEventos()
 }, [tweetsFiltrados]);

 const convertirArraysACadenas = (data) => {
  const newData = { ...data };
  for (const key in newData) {
    if (Array.isArray(newData[key])) {
      newData[key] = newData[key].join(', ');
    }
  }
  return newData;
};
const handleDownloadExcel = () => {
  const datosConvertidos = datosGraficos.map(convertirArraysACadenas);
  const worksheet = XLSX.utils.json_to_sheet(datosConvertidos, { header: Object.keys(datosConvertidos[0]) });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type:'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `DatosGraficos_${date}.xlsx`;

  saveAs(data, fileName);
};
  
  
  return (
    <div>
        <div className='titulo-carta'>Presencia en redes sociales</div>
        <div className='subtitulo-carta'>
        <div>Cantidad total</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip></div>
      <div className="estadisticas carta">
     
      <Col span={12}>
  <Statistic
    title="Eventos"
    value={eventos}
    formatter={formatter}
    className="valor-grande" // Agrega una clase CSS personalizada
  />
</Col>
<Col span={12}>
  <Statistic
    title="Actores"
    value={actores}
    precision={2}
    formatter={formatter}
    className="valor-grande" // Agrega una clase CSS personalizada
  />
</Col>
   
      </div>
    </div>
  )
}
