import { Treemap } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import { HiDocumentDownload } from 'react-icons/hi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button, Tooltip } from 'antd';
import { useLocation } from 'react-router';
import './Graficos.css'

export const TreemapModeloFiltro = () => {
  const datos = useSelector(state=> state.datosFiltrados)
  const filtros = useSelector(state=>state.filtros)
  const filtroModelo = filtros.modelo
  const filtroCategoria = filtros.categoria

  function contarTweetsConDatos(tweets, modelo, categoria) {
    return tweets.filter((tweet) => {
      return tweet[modelo] && tweet[modelo].includes(categoria);
    }).length;
  }


    function generarArrayCategorias(modelos, categorias, tweets) {
      const totalTweets = tweets.length;
    
      const data = {
        name: 'root',
        children: categorias.map((categoria, index) => {
          const modelo = modelos[index];
          const value = contarTweetsConDatos(tweets, modelo, categoria);
          const percentage = (value / totalTweets) * 100;
          return {
            name: categoria,
            value,
            percentage,
          };
        }),
      };
    
      return data;
    }
    
      const datatweet = generarArrayCategorias(filtroModelo, filtroCategoria, datos);
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
        <div>Eventos categorizados por categorias filtradas</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
    <Treemap {...config} className='carta'/>
    </div>;
};
