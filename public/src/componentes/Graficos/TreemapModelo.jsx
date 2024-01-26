import { Treemap } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import { HiDocumentDownload } from 'react-icons/hi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button, Tooltip } from 'antd';
import { useLocation } from 'react-router';
import './Graficos.css'

export const TreemapModelo = () => {
  const datos = useSelector(state=> state.datosFiltrados)
  const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  
    const tweetsFiltrados = datos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });

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
    function generarArrayCategorias(array, modelo, tweets) {
      const modeloEncontrado = array.find((item) => item.modelo === modelo);
    
      if (!modeloEncontrado) {
        return null;
      }
    
      const atributos = modeloEncontrado.categorias;
      const totalTweets = tweets.length;
    
      const data = {
        name: 'root',
        children: atributos.map((atributo) => ({
          name: atributo,
          value: contarTweetsConDatos(tweets, modeloSinEspacios, atributo),
        })),
      };
    
      return {
        ...data,
        children: data.children.map((child) => ({
          ...child,
          percentage: (child.value / totalTweets) * 100, // Calcula el porcentaje en base al total de tweets
        })),
      };
    }



    function contarTweetsConDatos(tweets, modelo, atributo) {
      return tweets.filter((tweet) => {
        return tweet[modelo] && tweet[modelo].includes(atributo);
      }).length;
    }

    const modelo = subUrl;
    
      const datatweet = generarArrayCategorias(categoriasModelos, modelo, tweetsFiltrados);
      // console.log(data);

 
      const config = {
        data: datatweet,
        colorField: 'name',
        label: {
          formatter: (datum) => `${datum.name}-${datum.value}-${datum.percentage.toFixed(2)}%`,
          style: {
            fontSize: 12,
            lineHeight: 1.2,
            fontWeight: 'normal',
            fill: 'white',
          },
        },
        tooltip: {
          customContent: (title, data) => {
            if (data && data.length > 0 && data[0].data) {
              const { name, value, percentage } = data[0].data;
              return <div className='tooltip-treemap-modelo'> ● {name}:{value} eventos -{percentage.toFixed(2)}%</div>;
            }
            return '';
          },
        },
      };


      const handleDownloadExcel = () => {
        if (datatweet) {
          const worksheet = XLSX.utils.json_to_sheet(datatweet.children);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `EventosCategoria_${date}.xlsx`;

  saveAs(data, fileName);
      
        }
      };

  return <div>
     <div className='titulo-carta'>Categorias</div>
   
      <div className='subtitulo-carta'>
        <div>Eventos categorizados por categorias</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
    <Treemap {...config} className='carta'/>
    </div>;
};
