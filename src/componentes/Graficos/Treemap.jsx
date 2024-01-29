import { Treemap } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import { HiDocumentDownload } from 'react-icons/hi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button, Tooltip } from 'antd';

export default function OcurrenciaModelo() {
  const tweets = useSelector((state) => state.datosFiltrados);
  // console.log(tweets)
  
  const atributos = [
    'Atributos',
    'Clima social',
    'Continuidad y cambio',
    'Emociones Básicas (Plutchik)',
    'Preocupaciones',
    'Red motivacional del voto',
    'Sentimientos',
  
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

  function contarTweetsYcategorias(tweets, categoriasModelos) {
    const conteoPorPropiedad = {};
  
    const modelosPresentes = categoriasModelos.map((categoriaModelo) => categoriaModelo.modelo);
  
    tweets.forEach((tweet) => {
      for (const propiedad in tweet) {
        if (modelosPresentes.includes(propiedad) && Array.isArray(tweet[propiedad]) && tweet[propiedad].length > 0) {
          // Contar tweets por propiedad
          conteoPorPropiedad[propiedad] = (conteoPorPropiedad[propiedad] || 0) + 1;
  
          // Contar categorías mencionadas dentro de cada propiedad
          tweet[propiedad].forEach((categoria) => {
            conteoPorPropiedad[categoria] = (conteoPorPropiedad[categoria] || 0) + 1;
          });
        }
      }
    });
  
    // Ordenar el resultado para obtener las 3 categorías más mencionadas en cada propiedad
    for (const propiedad in conteoPorPropiedad) {
      if (Array.isArray(conteoPorPropiedad[propiedad])) {
        conteoPorPropiedad[propiedad].sort((a, b) => conteoPorPropiedad[b] - conteoPorPropiedad[a]);
        conteoPorPropiedad[propiedad] = conteoPorPropiedad[propiedad].slice(0, 3);
      }
    }
  
    return conteoPorPropiedad;
  }

    // Función para contar los tweets con datos en un atributo específico
    const contarTweetsConDatos = (tweets, atributo) => {
      const totalTweets = tweets.length;
      const tweetsConDatos = tweets.filter(tweet => tweet[atributo] && tweet[atributo].length > 0);
      const tweetsConDatosCount = tweetsConDatos.length;
      const percentage = (tweetsConDatosCount / totalTweets) * 100;
      return {
        count: tweetsConDatosCount,
        percentage: percentage.toFixed(2),
      };
    };
  
  // Ejemplo de uso con el arreglo de tweets proporcionado y el array de modelos

  const resultados = contarTweetsYcategorias(tweets, categoriasModelosSelector);
  // console.log(resultados);

  function transformarDatosEnFormatoDeseado(resultados, categoriasModelos, tweets) {
    const root = { name: "root", children: [] };
  
    // Obtener los modelos con sus valores
    const modelosConValores = categoriasModelos.map((categoriaModelo) => {
    
  
      // Ordenar las categorías por mayor valor
      const categoriasOrdenadas = categoriaModelo.categorias
        .map((categoria) => ({
          name: categoria,
          value: resultados[categoria] || 0, // Valor predeterminado: 0 si no se encontró la clave en resultados
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3); // Tomar las 3 categorías con los valores más altos
  
      return {
        nameModelo: categoriaModelo.modelo,
        brand: categoriaModelo.modelo,
        value: resultados[categoriaModelo.modelo] || 0, // Valor predeterminado: 0 si no se encontró la clave en resultados
        children: categoriasOrdenadas,
      };
    });
  
    // Ordenar los modelos por mayor valor
    modelosConValores.sort((a, b) => b.value - a.value);
  
    root.children = modelosConValores;
  
    return root;
  }
  
  // Ejemplo de uso con los resultados y el array de modelos
  const formatoDeseado = transformarDatosEnFormatoDeseado(resultados, categoriasModelosSelector);
  // console.log("FORMATO DESEADO",formatoDeseado);



  const config = {
    data: formatoDeseado,
    colorField: 'nameModelo',
    label: {
      formatter: (datum) => `${datum.name}-${datum.value}`,
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
          const { name, value, nameModelo } = data[0].data;
          return <div className='tooltip-treemap-modelo'>{nameModelo} ● {name}: {value} eventos</div>;
        }
        return '';
      },
    },
  };


  
  const handleDownloadExcel = () => {
    if (formatoDeseado && formatoDeseado.children && formatoDeseado.children.length > 0) {
      // Crear una matriz para almacenar todos los datos
      const dataToExport = [];
  
      // Recorrer cada modelo y sus categorías
      formatoDeseado.children.forEach((modelo) => {
        const modeloData = {
          Modelo: modelo.nameModelo,
          Valor: modelo.value,
        };
  
        // Agregar los datos de las categorías (children) al modeloData
        modelo.children.forEach((categoria, index) => {
          modeloData[`Categoría ${index + 1}`] = categoria.name;
          modeloData[`Valor Categoría ${index + 1}`] = categoria.value;
        });
  
        dataToExport.push(modeloData);
      });
  
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      // Obtener la fecha actual
      const today = new Date();
      const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
      // Nombre del archivo con la fecha actual
      const fileName = `EventosModelos_${date}.xlsx`;
  
      saveAs(data, fileName);
    }
  };
  
  
  
  
  

  return (
    <div>
      <div className='titulo-carta'>Modelos</div>
     
      <div className='subtitulo-carta'>
        <div>Eventos categorizados por modelos</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
      <Treemap {...config} className='carta ocurrenciaModelo' />
    </div>
  );
}