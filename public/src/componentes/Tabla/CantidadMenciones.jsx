import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';


export default function CantidadMenciones (){
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
  

 
  const columns = [
      {
        title: 'Autores',
        dataIndex: 'Hashtags',
        filters: mencionesPorHashtag.map(Hashtags => ({ text: Hashtags.Hashtags, value: Hashtags.Hashtags })),
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.Hashtags.includes(value),
        width: '100%',
      },
      {
        title: 'Cant. Menciones',
        dataIndex: 'Menciones',
        sorter: (a, b) => a.Menciones - b.Menciones,
        width: '100%',
      },
     
    ];
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };


return(<div>
  <div className='titulo-carta'>Influenciadores</div>
   <div className='subtitulo-carta'>Mas Mencionados</div>
  <div className='carta'>
  
   <Table columns={columns} dataSource={mencionesPorHashtag} onChange={onChange}  scroll={{
      y: 280,
    
    }}/></div></div>)

}