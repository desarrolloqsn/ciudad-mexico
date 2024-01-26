import { Table } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button, Tooltip } from 'antd';
import './Carta.css'


export default function MasEngagement (){
    const tweets = useSelector((state) => state.datosFiltrados);
    const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  
    const tweetsFiltrados = tweets.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });


      // Paso 1: Iterar sobre cada objeto en el array
      // Paso 1: Crear objeto para almacenar sumas de totalInteracciones por usuario
       
        tweets.forEach(tweet => {
          // Paso 2: Sumar las propiedades "citas", "retweets", "likes", "comentarios" y "vistas"
          const { citas, retweets, likes, comentarios } = tweet;
          const totalInteracciones = citas + retweets + likes + comentarios;

          // Paso 3: Almacenar la suma en una nueva propiedad del objeto
          tweet.totalInteracciones = totalInteracciones;
        });

        const usuarios = {};

        // Paso 2: Sumar las totalInteracciones correspondientes a cada usuario
        tweets.forEach(tweet => {
          const { usuarioOriginal, totalInteracciones } = tweet;
          if (usuarios[usuarioOriginal]) {
            usuarios[usuarioOriginal] += totalInteracciones;
          } else {
            usuarios[usuarioOriginal] = totalInteracciones;
          }
        });

        // Paso 3: Generar nuevo array de objetos con la estructura deseada
        const resultado = Object.entries(usuarios).map(([usuarioOriginal, totalInteracciones]) => ({
          usuarioOriginal,
          totalInteracciones,
          }));

        // Paso 4: Ordenar el array de objetos en base a la propiedad "totalInteracciones" de forma descendente
        const tweetsNuevo = resultado.sort((a, b) => b.totalInteracciones - a.totalInteracciones);

        // Obtener los 100 tweets con mayor totalInteracciones
        const top10MasRetwitteados = tweetsNuevo.slice(0, 100);

        // Generar el nuevo array de objetos con la estructura deseada
        const categorizadoresData = top10MasRetwitteados.map((tweet, index) => ({
          key: (index + 1).toString(),
          Autor: tweet.usuarioOriginal,
          totalInteracciones: tweet.totalInteracciones,
        }));

        // Ordenar el nuevo array en base a la propiedad "totalInteracciones" de forma descendente
        const categorizadores =  categorizadoresData.sort((a, b) => b.totalInteracciones - a.totalInteracciones);

      
        // console.log("TWEETS",tweetsNuevo.slice(0,100));
       
      
      // console.log(categorizadores);
 
  
 
  const columns = [
    {
      title: 'Autor',
      dataIndex: 'Autor',
      filters: categorizadores.map((item) => ({ text: item.Autor, value: item.Autor })),
      filterSearch: true,
      onFilter: (value, record) => record.Autor.includes(value),
      width: '50%',
      filterDropdownVisible: false, // Ocultar el tooltip de filtro
    },
    {
      title: (
 
          <Tooltip title='Suma de me gusta, retweets, comentarios, citas.'>
         Interacciones
         </Tooltip>
         
      ),
      dataIndex: 'totalInteracciones',
      sorter: (a, b) => a.totalInteracciones - b.totalInteracciones,
      width: '50%',
      filterDropdownVisible: false
    },
  ];
  
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };


  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(categorizadores);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `AutoresEngagement_${date}.xlsx`;

  saveAs(data, fileName);
  };

return(<div>
  <div className='titulo-carta'>Autores</div>
 
   <div className='subtitulo-carta'>
        <div>Autores con más Engagement</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
  <div className='carta'>
  
   <Table columns={columns} dataSource={categorizadores} onChange={onChange}  scroll={{
      y: 280,
    
    }}/></div></div>)

}


