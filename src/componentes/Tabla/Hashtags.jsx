import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button, Tooltip } from 'antd';


export default function Hashtags (){
  const tweets = useSelector((state) => state.datosFiltrados);
  const location = useLocation();
  const currentUrl = location.pathname;
  const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
  const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));

  const tweetsFiltrados = tweets.filter(tweet => {
    const propiedadModelo = tweet[modeloSinEspacios];
    return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
  });


  function contarMencionesPorHashtag(tweets) {
    const mencionesPorHashtag = {};
  
    tweets.forEach((tweet) => {
      const hashTagsArray = tweet.hashTags;
      const mencionesArray = tweet.menciones;
  
      if (hashTagsArray && mencionesArray) {
        hashTagsArray.forEach((hashtag) => {
          if (!mencionesPorHashtag[hashtag]) {
            mencionesPorHashtag[hashtag] = 0;
          }
  
          mencionesPorHashtag[hashtag] += mencionesArray.length;
        });
      }
    });
  
    const data = Object.entries(mencionesPorHashtag).map(([hashtag, menciones], index) => ({
      key: (index + 1).toString(),
      Hashtags: hashtag,
      Menciones: menciones,
    })).sort((a, b) => b.Menciones - a.Menciones);
    // console.log(data)
    return data;
  }

  const mencionesPorHashtag = tweetsFiltrados.length > 0 ? contarMencionesPorHashtag(tweetsFiltrados) : contarMencionesPorHashtag(tweets);
  
//  console.log("MENCIONES",mencionesPorHashtag);
 
  const columns = [
      {
        title: 'Hashtags',
        dataIndex: 'Hashtags',
        filters: mencionesPorHashtag.map(Hashtags => ({ text: Hashtags.Hashtags, value: Hashtags.Hashtags })),
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.Hashtags.includes(value),
        width: '100%',
      },
      {
        title: 'Menciones',
        dataIndex: 'Menciones',
        sorter: (a, b) => a.Menciones - b.Menciones,
        width: '100%',
      },
     
    ];
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(mencionesPorHashtag);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // Obtener la fecha actual
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  // Nombre del archivo con la fecha actual
  const fileName = `HashtagsMencionados_${date}.xlsx`;

  saveAs(data, fileName);
   
  };

return(<div>
  <div className='titulo-carta'>Hashtags</div>
  
   
  <div className='subtitulo-carta'>
        <div>Hashtags más mencionados</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
  <div className='carta'>
  
   <Table columns={columns} dataSource={mencionesPorHashtag} onChange={onChange}  scroll={{
      y: 280,
    
    }}/></div></div>)

}


