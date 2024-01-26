import { Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import perfil from './../../imagenes/user.webp';
import './Carta.css'
import { useSelector } from 'react-redux';
import { Rate } from 'antd';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button, Tooltip } from 'antd';
import { Empty } from 'antd';
export default function TablaTweetsRepetidos(){
  const dataTweets = useSelector((state) => state.datosFiltrados);
  const location = useLocation();
  const currentUrl = location.pathname;
  const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
  const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));

  const tweetsFiltrados = dataTweets.filter(tweet => {
    const propiedadModelo = tweet[modeloSinEspacios];
    return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
  });


  const decodeText = (text) => {
    try {
      return decodeURIComponent(text);
    } catch (error) {
      return text;
    }
  };


  // const textosUnicos = {};

  // for (const tweet of dataTweets) {
  //   const texto = tweet.texto;
    
  //   if (texto.trim() !== '') { // Verificar si el texto no está vacío
  //     if (!textosUnicos.hasOwnProperty(texto)) {
  //       textosUnicos[texto] = {
  //         repeticiones: 1,
  //         tweets: [tweet],
  //       };
  //     } else {
  //       textosUnicos[texto].repeticiones++;
  //       textosUnicos[texto].tweets.push(tweet);
  //     }
  //   }
  // }
  
  // const textosOrdenados = Object.entries(textosUnicos)
  //   .sort((a, b) => b[1].repeticiones - a[1].repeticiones);
  
  // const tweetsMasRepetidos = textosOrdenados.map(([texto, data]) => ({
  //   tweet: texto,
  //   repeticiones: data.repeticiones,
  //   tweets: data.tweets,
  // }));
  
  
  // const primeros100TweetsMasRepetidos = [];
  
  // for (const objeto of tweetsMasRepetidos) {
  //   const repeticiones = objeto.repeticiones;
    
  //   for (const tweet of objeto.tweets) {
  //     if (repeticiones > 1) {
  //       const primerTweet = { ...tweet, repeticiones };
  //       primeros100TweetsMasRepetidos.push(primerTweet);
  //     }
      
  //     if (primeros100TweetsMasRepetidos.length === 100) {
  //       break; // Salir del bucle después de encontrar los primeros 100 tweets más repetidos
  //     }
  //   }
 
  // }
  
  // const arrayDeTweets = tweetsMasRepetidos.flatMap(objeto => {
  //   const repeticiones = objeto.repeticiones || 0;
  //   return objeto.tweets
  //     .filter(tweet => repeticiones > 1) // Filtrar solo los tweets con repeticiones mayores a 2
  //     .map(tweet => {
  //       tweet.repeticiones = repeticiones;
  //       return tweet;
  //     });
  // });

 
  
  // const top10MasRetwitteados = primeros100TweetsMasRepetidos.slice(0, 100);
  // console.log(top10MasRetwitteados);

  const textosUnicos = {};

  for (const tweet of dataTweets) {
    const texto = tweet.texto;
  
    if (texto.trim() !== '') {
      if (!textosUnicos.hasOwnProperty(texto)) {
        textosUnicos[texto] = {
          repeticiones: 1,
          tweets: [tweet],
        };
      } else {
        textosUnicos[texto].repeticiones++;
        textosUnicos[texto].tweets.push(tweet);
      }
    }
  }
  
  const textosOrdenados = Object.entries(textosUnicos)
    .sort((a, b) => b[1].repeticiones - a[1].repeticiones);
  
  const primeros100TweetsMasRepetidos = [];
  const tweetsYaAgregados = new Set(); // Usamos un Set para rastrear tweets ya agregados
  
  for (const objeto of textosOrdenados) {
    const repeticiones = objeto[1].repeticiones;
    const tweets = objeto[1].tweets;
  
    if (primeros100TweetsMasRepetidos.length >= 100) {
      break; // Salir del bucle después de encontrar los primeros 100 tweets más repetidos
    }
  
    for (const tweet of tweets) {
      if (!tweetsYaAgregados.has(tweet.texto)) {
        const primerTweet = { ...tweet, repeticiones };
        primeros100TweetsMasRepetidos.push(primerTweet);
        tweetsYaAgregados.add(tweet.texto);
        break; // Salir del bucle interno después de agregar el primer tweet del bloque
      }
    }
  }
  
  const arrayDeTweets = textosOrdenados.flatMap(objeto => {
    const repeticiones = objeto[1].repeticiones || 0;
    return objeto[1].tweets
      .filter(tweet => repeticiones > 1)
      .map(tweet => {
        tweet.repeticiones = repeticiones;
        return tweet;
      });
  });
  
  const top10MasRetwitteados = primeros100TweetsMasRepetidos.slice(0, 10);


const data = [
  {
    key: '1',
    Tweets: 'Some tweet',
  },
  // ...otros datos
];


const columns = [
  {
    title: 'Tweets',
    dataIndex: 'Tweets',
    width: '50%',
  


    render: (_, record) => {
      if (top10MasRetwitteados.length > 0) {
        return (
      top10MasRetwitteados.map((item, index) => (
        <div key={index}>
          
          <div className='contendor-tweets'>
            {/* CONTENEDOR GENERAL */}
            <div className='user-twitter'>{item.fecha}</div>    
            <br></br>
            <div className='foto-texto-perfil'>
              {/* CONTENEDOR foto y texto vertical */}
              <div className='contenedor-perfil'>
                {/* CONTENEDOR FOTO PERFIL */}
                <img
                  src={item.profileImage || perfil}
                  className='fotoperfil'
                  alt='Foto de perfil'
                />
              </div>
              
              <div className='contenedor-publicacion'>
                {/* CONTENEDOR TEXTO */}
                <div className='contenedor-tituloSubtitulo'>
                  <div className='titulo-tweet'>{item.name}</div>
                  {/* Título */}
                  <div className='user-twitter'>@{item.usuarioOriginal}</div>
                         
                  
                  </div>
                  {/* Mapeo de usuarios categorizadores */}
                  {item.usuarioCategorizador_Comments.length > 0 && (
                    <div>
                      <div>Replying to</div>
                      <div className='replyingto'>
                        {item.usuarioCategorizador_Comments.map((usuario, index) => `@${usuario}`).join(' ')}
                      </div>
                    </div>
                  )}
                 <div>{decodeText(item.texto)}</div>
                {/* Texto */}
                {item.imagen_tweet !== null && item.imagen_tweet.length > 0 ? (
                  <div>
                    {item.imagen_tweet.map((elemento, index) => {
                      if (elemento.startsWith('https://video')) {
                        return (
                          <video key={index} src={elemento} controls  className='publicacion'/>
                
                        );
                      } else {
                        return (
                          <img
                            key={index}
                            src={elemento}
                            className='publicacion'
                            alt='Imagen de la publicación'
                          />
                        );
                      }
                    })}
                  </div>
                ) : null}
                {/* Imagen */}
                <div className='tags'> 
                  {/* CONTENEDOR tags */}
                  <Tag
                    key={index}
                    style={{marginBottom:"0.5rem"}}
                    color={
                      item.sentimiento === 'neutro'
                        ? 'grey'
                        : item.sentimiento === 'positivo'
                        ? '#008300'
                        : '#ff2323'
                    }
                  >
                    {item.sentimiento.toUpperCase()}
                  </Tag>
                   {/* {item.tags.map((tag, index) => (
                    <Tag style={{marginBottom:"0.5rem"}} key={index} color='blue'>{tag}</Tag>
                  ))} */}
                  {modeloSinEspacios !== null ? null :
                  <div>
                  {item[modeloSinEspacios].map((tag, index) => (
                    <Tag style={{marginBottom:"0.5rem"}} key={index} color='blue'>{tag}</Tag>
                  ))}
                  </div>
                }
                  
                  
                  
                 
                

                </div>
                <div>Repeticiones:{item.repeticiones}</div>
                 {/* <div className='retweets'>{item.retweets} retweets</div>  */}
              </div>
            </div>
          </div>
        </div>
      ))
      );
  } else {
    return <Empty description="No hay eventos repetidos"/>;
  }

      }
      
      }
];

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
  const datosConvertidos = arrayDeTweets.map(convertirArraysACadenas);
  const worksheet = XLSX.utils.json_to_sheet(datosConvertidos, { header: Object.keys(datosConvertidos[0]) });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type:'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `TweetsRepetidos_${date}.xlsx`;

  saveAs(data, fileName);
};




  return(
    <div>
    <div className='titulo-carta'>Eventos</div>
   
    <div className='subtitulo-carta'>
        <div>Eventos repetidos</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
    <div className='carta'>
      <Table columns={columns} dataSource={data} scroll={{ y: 348 }} pagination={false}/>
    </div>
    </div>
  )
}
 

