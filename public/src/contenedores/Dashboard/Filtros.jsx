import React, {useState} from 'react'
import './Dashboard.css'
import { DatePicker, Input, Select, Button , Tooltip ,Modal , Form, Space } from 'antd';
import { TimePicker } from 'antd';
import {HiOutlineDocumentReport} from 'react-icons/hi'
import { Checkbox, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  filtrarDatos, filtrarDatosPorTitulo, filtrarDatosPorTituloNoContiene, filtrarDatosSubserie, filtrarTweets, guardarFechas, guardarHoras } from '../../redux/actions';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AiOutlineSearch, AiFillInfoCircle } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import isBetween from 'dayjs/plugin/isBetween';
import { TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;

// Importa la extensión `isBetween`
dayjs.extend(isBetween);

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;


export default function Filtros() {
    const datos = useSelector((state) => state.datosParaFiltros);
    const datosFiltrados = useSelector((state)=> state.datosFiltrados)
    const location = useLocation();
    const currentUrl = location.pathname;
    const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
    const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
     const tweetsFiltrados = datos.filter(tweet => {
      const propiedadModelo = tweet[modeloSinEspacios];
      return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
    });

    const formatDate = (fecha) => {
      const year = fecha.$y;
      const month = String(fecha.$M+1).padStart(2, "0");
      const day = String(fecha.$D).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  
    const handleFechaChange = (dates) => {
      if (!dates || dates.length < 2) {
        dispatch(filtrarDatos());
        return
      }
    
      const fechaInicio = dates && dates[0];
      const fechaFin = dates && dates[1];
    
      const formattedFechaInicio = formatDate(fechaInicio);
      const formattedFechaFin = formatDate(fechaFin);
    
      // console.log(formattedFechaInicio, formattedFechaFin);
      setFiltros((prevFiltros) => ({
        ...prevFiltros,
        fechaInicio: formattedFechaInicio,
        fechaFin:formattedFechaFin
      }));
     
    };


    const dates = datos.map(tweet => dayjs(tweet.date));

    let minDate, maxDate;
    
    if (dates.length > 0) {
      minDate = dates.reduce((min, date) => (date.isBefore(min) ? date : min));
      maxDate = dates.reduce((max, date) => (date.isAfter(max) ? date : max));
    }
    
    // console.log('Fecha mínima:', formatDate(minDate));
    // console.log('Fecha máxima:', formatDate(maxDate));
    

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

    // Función recursiva para construir el árbol
function buildTree(data) {
  const tree = [];

  for (let i = 0; i < data.length; i++) {
    const model = data[i];

    const node = {
      title: model.modelo,
      value: `${model.modelo}`,
      key: `${model.modelo}`,
      children: []
    };

    for (let j = 0; j < model.categorias.length; j++) {
      const category = model.categorias[j];

      const childNode = {
        title: category,
        value: `${model.modelo}-${category}`,
        key: `${model.modelo}-${category}`
      };

      node.children.push(childNode);
    }

    tree.push(node);
  }

  return tree;
}

// Generar el array treeData
const treeData = buildTree(categoriasModelosSelector);

// console.log(treeData);

    const dispatch = useDispatch();

    // console.log("data", datos)
 
    const [filtroCumple, setFiltroCumple] = useState(null);
    const [filtros, setFiltros] = useState({
      serie: [],
      subserie: [],
      palabra: [],
      sinpalabra: [], // Agregar esta línea para inicializar la propiedad sinpalabra
      fechaInicio: formatDate(minDate),
      fechaFin: formatDate(maxDate),
      horaInicio: "00:00",
      horaFin: "23:59",
      polaridad:[],
      modelo:[],
      categoria: [],
      anidados: false,
      datos: datosFiltrados
    });

    useEffect(() => {

      let modelo = [modeloSinEspacios]
      setFiltros((prevFiltros) => ({
        ...prevFiltros,
        modelo: modelo ? [...modelo] : [],
      }));
    }, [modeloSinEspacios]);
  
   
    const handleFiltrarEventos = (value) => {
      if (value.trim() === "") {
        // El valor está vacío, puedes mostrar un mensaje de error o realizar alguna acción apropiada.
        return;
      }
    
      // Obtener las palabras individuales del valor
      const palabras = value.split(" ");
    
      // Eliminar palabras vacías y duplicadas
      const palabrasUnicas = [...new Set(palabras.filter(palabra => palabra !== ""))];
    
      // Realizar alguna acción con las palabras únicas
      // console.log(palabrasUnicas);
    
      if (filtroCumple === 'Eventos que cumplen') {
        setFiltros((prevFiltros) => ({
          ...prevFiltros,
          palabra: filtros.palabra.concat(palabrasUnicas),
          datos:datosFiltrados
        }));
      } else if (filtroCumple === 'Eventos que no cumplen') {
        setFiltros((prevFiltros) => ({
          ...prevFiltros,
          sinpalabra: filtros.sinpalabra.concat(palabrasUnicas),
          datos:datosFiltrados
        }));
      } else {
        setFiltros((prevFiltros) => ({
          ...prevFiltros,
          palabra: filtros.palabra.concat(palabrasUnicas),
          datos:datosFiltrados
        }));
      }
    };

    const handleFiltroCumpleChange = (value) => {
      setFiltroCumple(value);
    };
  
    const [duplications, setDuplications] = useState([
      { key: 0 },
    ]);
  
    const handleButtonClick = () => {
      const newDuplications = [...duplications, { key: duplications.length }];
      setDuplications(newDuplications);
    };
  
    const handleButtonClickDelete = (i) => {
      const newDuplications = duplications.filter((duplication) => duplication.key !== i);
      setDuplications(newDuplications);
   
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

      // Paso 5
      const seriesArray = Array.from(seriesSet);
      // console.log(seriesArray);
        

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

      // Paso 4: Mostrar el array de subseries únicas
      // console.log(subSeriesArray);


      const handleSeriesChange = (serieDato) => {
        // console.log(serie)
        setFiltros((prevFiltros) => ({
          ...prevFiltros,
          serie: serieDato,
        }));
       
      };

      const handleSubSeriesChange = (subserieDato) => {
        setFiltros((prevFiltros) => ({
          ...prevFiltros,
          subserie: subserieDato,
        }));
       
      };
    
      
     
    const renderCode = () => {
        return duplications.map((duplication) => (
          <div key={duplication.key} className="filtro-texto">
            <Select placeholder="Filtro por palabra/autor/hashtag/mención" className="selectores-dash-eventos"  allowClear onChange={handleFiltroCumpleChange}>
              <Select.Option value="Eventos que cumplen" allowClear>Eventos que cumplen</Select.Option>
              <Select.Option value="Eventos que no cumplen" allowClear>Eventos que no cumplen</Select.Option>
            </Select>
            <Tooltip placement="top" title='Eliminar filtro' >
            <Button type="primary" shape="circle" onClick={(e) => handleButtonClickDelete(duplication.key, e)} className='subtitulo-boton'>
              -
            </Button>
            </Tooltip>
            {/* <Select placeholder="Categoria" className="selectores-dash-eventos" allowClear>
              <Select.Option value="Texto" allowClear>Texto</Select.Option>
              <Select.Option value="Autores" allowClear>Autores</Select.Option>
              <Select.Option value="Hashtags" allowClear>Hashtags</Select.Option>
              <Select.Option value="Menciones" allowClear>Menciones</Select.Option>
            </Select> */}
           <Input placeholder="Texto/Autor/Hashtag/Mención" allowClear onBlur={(e) => handleFiltrarEventos(e.target.value)}></Input>
          </div>
        ));
      };



      const [value, setValue] = useState([]);
      const onChange = (newValue) => {
        setValue(newValue);
        const categorias = newValue.map(item => {
          const parts = item.split('-');
          if (parts.length === 2) {
            return parts[1];
          }
          return null;
        }).filter(item => item !== null);
      
        setFiltros(prevFiltros => ({
          ...prevFiltros,
          modelo: newValue.map(value => value.split('-')[0]),
          categoria: categorias
        }));
      }
      const tProps = {
        treeData,
        value,
        onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Categorías',
        style: {
          width: '100%',
        },
      };


      function obtenerHora(objeto) {
        // Obtener la propiedad $d.$D del objeto
        const fechaCompleta = objeto.$d;
      
        // Crear un objeto de fecha a partir de la cadena de fecha completa
        const fecha = new Date(fechaCompleta);
      
        // Obtener la hora y minutos de la fecha
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();
      
        // Formatear la hora en formato "22:09"
        const horaFormateada = `${agregarCeroDelante(horas)}:${agregarCeroDelante(minutos)}:00`;
      
        // Devolver la hora formateada
        return horaFormateada;
      }
      
      function agregarCeroDelante(numero) {
        // Agregar un cero delante del número si es menor a 10
        return numero < 10 ? `0${numero}` : numero;
      }
      
      const handleHoraChange = (times) => {
       
        if(times){
          const [horaInicio, horaFin] = times;
          if (!times || times.length === 0) {
            // Establecer las times predeterminadas '00:00' y '23:59'
            times = [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')];
          }
          
      
          // Realizar la validación de horaInicio > horaFin
          if (horaInicio > horaFin) {
            // Mostrar un mensaje de error o realizar la acción correspondiente
            // console.log("La hora de inicio no puede ser mayor que la hora de fin");
            // Otra acción...
            return; // Salir de la función para evitar continuar con el flujo
          }
        
          // console.log(times);
          guardarHoras(horaInicio, horaFin);
        
          const horaIn = obtenerHora(horaInicio);
          const horaFi = obtenerHora(horaFin);
          setFiltros((prevFiltros) => ({
            ...prevFiltros,
            horaInicio: horaIn,
            horaFin: horaFi
          }));
          // console.log(horaIn, horaFi);
        }
       
       
      };
     

   
const initialValues = [formatDate(minDate), formatDate(maxDate)];
 
const initialValuesHora = [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')];

// Buscar el objeto correspondiente al modelo en categoriasModelos
const modeloEncontrado = categoriasModelos.find(item => item.modelo === subUrl);

// Obtener la lista de categorías del modelo
const categorias = modeloEncontrado ? modeloEncontrado.categorias : [];

// console.log ('categorias', categorias)


const selectProps = {
  mode: 'multiple',
  placeholder: 'Categorias',
  maxTagCount: 'responsive',
};

const selectPropsSub = {
  mode: 'multiple',
  placeholder: 'Subseries',
  maxTagCount: 'responsive',
};

const selectPropsPolaridad = {
  mode: 'multiple',
  placeholder: 'Polaridad',
  maxTagCount: 'responsive',
};

const selectPropsSerie = {
  mode: 'multiple',
  placeholder: 'Serie',
  maxTagCount: 'responsive',
};

const handlePolaridadChange = value => {
  setFiltros(prevFiltros => ({
    ...prevFiltros,
    polaridad: value
  }));
};

const handleCategoriaChange = value => {
  setFiltros(prevFiltros => ({
    ...prevFiltros,
    categoria: value
  }));
};



const onChangeCheck = (e) => {
  setFiltros(prevFiltros => ({
    ...prevFiltros,
    anidados: !filtros.anidados
  }));
};


const startDate = dayjs(initialValues[0]);
const endDate = dayjs(initialValues[1]);

const disabledDate = current => {
  // Verifica si la fecha actual está fuera del rango permitido
  return !dayjs(current).isBetween(startDate, endDate, null, '[]');
};


  function sendFilter(){
    if(filtros.horaInicio === "" && filtros.horaFin === ""){
      filtros.horaInicio = '00:00'
      filtros.horaFin = '23:59'
    }
    if(filtros.palabra.length < 1){
    let valores =   
    {serie: filtros.serie,
    subserie: filtros.subserie,
    palabra: [],
    sinpalabra: filtros.sinpalabra,
    fechaInicio: filtros.fechaInicio,
    fechaFin: filtros.fechaFin,
    horaInicio: filtros.horaInicio,
    horaFin: filtros.horaFin,
    polaridad: filtros.polaridad,
    modelo:filtros.modelo,
    categoria: filtros.categoria,
    anidados: filtros.anidados,
    datos: filtros.datos
    }
    // console.log(valores)
    dispatch(filtrarDatos(valores));
    }
    if(filtros.sinpalabra.length < 1){
      let valores =   
      {serie: filtros.serie,
      subserie: filtros.subserie,
      palabra: filtros.palabra,
      sinpalabra: [],
      fechaInicio: filtros.fechaInicio,
      fechaFin: filtros.fechaFin,
      horaInicio: filtros.horaInicio,
      horaFin: filtros.horaFin,
      polaridad: filtros.polaridad,
      modelo:filtros.modelo,
      categoria: filtros.categoria,
      anidados: filtros.anidados,
      datos: filtros.datos
      }
      // console.log(valores)
      dispatch(filtrarDatos(valores));
    }
    // console.log(filtros.palabra)
    dispatch(filtrarDatos(filtros));
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      palabra:[],
      sinpalabra:[]
    }));
  
  }
  return (
    <div>
    <div className='nombreDashboard'>VEN- Referendo Guyana- TW {modeloSinEspacios ? `- ${modeloSinEspacios}` : null}</div>
    <div className='contenedor-filtros'>
     <div className='boton-informe'>
     <Tooltip placement="top" title='Generar informe' >
     <Link to="/informes" ><Button type="primary" shape="circle" className='subtitulo-boton'><HiOutlineDocumentReport/></Button></Link>
    </Tooltip>
    </div>
   
    <div className='filtro-texto'>
    
    
    <DatePicker.RangePicker
        name="dias"
        placeholder={['Día Inicio', 'Día Fin']}
        allowClear={false}
        onChange={handleFechaChange}
        defaultValue={[dayjs(initialValues[0], dateFormat), dayjs(initialValues[1], dateFormat)]}
        format={dateFormat}
        disabledDate={disabledDate}  // Propiedad para deshabilitar fechas específicas
        className="selectores-dash-eventos"
      />
      <div className='filtro-texto-hora'>
    
      <TimePicker.RangePicker
       name="horas"
        placeholder={['Hora Inicio', 'Hora Fin']}
        format='HH:mm'
        allowClear={true}
        onChange={handleHoraChange}
        // defaultValue={initialValuesHora}
      className="selectores-dash-hora"
        
      />
      <Tooltip title='Si se quiere ver el horario por defecto poner 00:00 a 23:59'>
      <AiFillInfoCircle/>
      </Tooltip>
      </div>
    </div>
    <div className='filtro-texto'>
    

      <Select
        placeholder="Serie"
        onChange={handleSeriesChange}
        allowClear // Habilitar la funcionalidad de borrado
        {...selectPropsSerie}
        className="selectores-dash-eventos"
      >
        {seriesArray.map((serie, index) => (
          <Select.Option key={index} value={serie}>
            {serie}
          </Select.Option>
        ))}
      </Select>


      
      <Select
        placeholder="Subserie"
        className="selectores-dash-eventos"
        onChange={handleSubSeriesChange}
        allowClear // Habilitar la funcionalidad de borrado
        disabled={subSeriesArray.length === 0}
        {...selectPropsSub}
      >
        {subSeriesArray.map((subserie, index) => (
          <Select.Option key={index} value={subserie}>
            {subserie}
          </Select.Option>
        ))}
      </Select>

      </div>


    
      <div className='filtro-texto'>
    <Select
      placeholder="Polaridad"
      className="selectores-dash-eventos"
      onChange={handlePolaridadChange}
      allowClear
      {...selectPropsPolaridad}
    >
      <Select.Option value="neutro" allowClear>Neutro</Select.Option>
      <Select.Option value="positivo" allowClear>Positivo</Select.Option>
      <Select.Option value="negativo" allowClear>Negativo</Select.Option>
    </Select>
    
  


   
   {tweetsFiltrados.length > 0 ? 
    
    <Select
      placeholder="Categorias"
      className="selectores-dash-eventos"
      onChange={handleCategoriaChange}
      {...selectProps}
    >
      {categorias.map(categoria => (
        <Select.Option key={categoria} value={categoria} allowClear>
          {categoria}
        </Select.Option>
      ))}
    </Select>
  
    
    
    : <TreeSelect {...tProps} /> }


</div>



   <div className='filtro-texto'>
   <Select placeholder="Filtro por palabra/autor/hashtag/mención" className="selectores-dash-eventos"  allowClear onChange={handleFiltroCumpleChange}  >
       <Select.Option value="Eventos que cumplen" allowClear>Eventos que cumplen</Select.Option>
       <Select.Option value="Eventos que no cumplen" allowClear>Eventos que no cumplen</Select.Option>
       
     </Select>
      <Tooltip placement="top" title='Agregar filtro' >
     <Button type="primary" shape="circle" onClick={handleButtonClick} className='subtitulo-boton'>
     +
     </Button>
     </Tooltip> 
    
     
     <Input placeholder="Texto/Autor/Hashtag/Mención" allowClear onBlur={(e) => handleFiltrarEventos(e.target.value)}></Input>

     </div> 

     
     {renderCode()} 
    <Checkbox onChange={onChangeCheck}>Añadir filtro con datos anidados</Checkbox>
    <Button type='primary' onClick={sendFilter} className='subtitulo-boton'>Filtrar</Button>
   </div>
   </div>
  )
}
