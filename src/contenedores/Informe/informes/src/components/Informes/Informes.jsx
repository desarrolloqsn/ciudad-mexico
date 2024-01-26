/** @format */

import React, { Fragment, useState ,useRef} from "react";
import "./Informes.css";
import { SlNotebook } from "react-icons/sl";
import logo from "./../../assest/qsocialnow.jpg";
import fb from "./../../assest/fb.png";
import tw from "./../../assest/tw.jpg";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { CiVolumeHigh } from "react-icons/ci";
import { Table, Tag, Input,message,Collapse, Space, Tour, InputNumber, Tooltip} from "antd";
import { Button, Modal } from 'antd';
import { BsFillDashCircleFill } from "react-icons/bs";
import ReactApexChart from "react-apexcharts";
import { PieChart, Pie, Cell } from "recharts";
import { TbTargetArrow } from "react-icons/tb";
import clave from "./../../assest/clave.jpg";
import hashtags from "./../../assest/hashtags.jpg";
import { BiConversation , BiUserCircle } from "react-icons/bi";
import { MdOutlineContactSupport } from "react-icons/md";
import { RiUserStarLine, RiFileUserLine, RiPushpinLine } from "react-icons/ri";
import { IoAlert } from "react-icons/io5";
import { VscCompass } from "react-icons/vsc";
import { TiHeartOutline } from "react-icons/ti";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import html2pdf from "html2pdf.js";
import TextArea from "antd/es/input/TextArea";
import editando from './../../assest/editando.png'
import editarpdf from './../../assest/editar.png'
import pdfdescargado from './../../assest/pdf.png'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import Diapositiva10 from "./Diapositivas/Diapositiva10";
import { useEffect } from "react";
import { IoChevronBackOutline } from 'react-icons/io5'
import {  useNavigate } from 'react-router-dom';
import { WordCloud } from '@ant-design/plots';
import textos from './textos.json'
import nubepalabras from './../../../../../../datos/datos_globales_nube_de_palabras.json'
import fechasNubePalabras from './../../../../../../datos/rango_fechas.json'
// ...



export default function Informes() {

  const location = useLocation();
  const { state } = location;
  // console.log(selectedDiapositivas)
  const datosInforme = useSelector((state)=> state.datosPeriodoActual)
  const datosInformeAnterior = useSelector((state)=> state.datosPeriodoAnterior)
  // console.log("ACTUAL",datosInforme)
  //  console.log("ANTERIOR",datosInformeAnterior)
  const navigate = useNavigate();
  // console.log(textos.textos).
  const propiedadesNubePalabras = Object.keys(nubepalabras[fechasNubePalabras.fechas[0]]);
  const nubePalabras = nubepalabras[fechasNubePalabras.fechas[0]][propiedadesNubePalabras[0]]
 
  const { Panel } = Collapse;
  const [editable,setEditable] = useState({
    general: false,
    diapositiva1: false,
    diapositiva2:false,
    diapositiva3: false,
    diapositiva4: false,
    diapositiva5: false,
    diapositiva6: false,
    diapositiva7: false,
    diapositiva8: false,
    diapositiva9: false,
    diapositiva10: false,
    })

  {/*DESCARGAR PDF*/}
  function descargarPDF() {
    if (editable.general) {
      messageApi.error('No podes descargar en modo editable!');
    } else {
      // Obtener el contenedor que queremos descargar como PDF
      const contenedor = document.getElementById("contenedor");
  
      // Crear una instancia de html2pdf con las opciones deseadas
      const opciones = {
        margin: [0, 0, 0, 0], // reducir los márgenes a 0
        filename: "QSOCIALNOW - Reporte de síntesis.pdf",
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "landscape",
          compressPDF: true
        },
        pagebreak: { before: ".page-break" } // agregar saltos de página antes de elementos con clase .saltopagina
      };
      const convertir = html2pdf().set(opciones);
  
      // Convertir el HTML del contenedor en un archivo PDF y descargarlo
      convertir.from(contenedor).save();
      return convertir.from(contenedor)
    }
  }
  {/*FIN DESCARGAR PDF*/}

   {/*MODAL*/}
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessage = (diapositivaName) => {
   
      if (!editable[diapositivaName]) {
      messageApi.error('Primero debes editar la diapositiva');
      return;
    }
  
    messageApi.open({
      key,
      type: 'loading',
      content: 'Cargando...',
    });
  
    setEditable((prevState) => ({
      ...prevState,
      [diapositivaName]: !prevState[diapositivaName],
    }));
  
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Guardado!',
        duration: 2,
      });
    }, 1000);
  };

      // Función para verificar si una palabra ya está en el arreglo
function palabraRepetida(palabra, arreglo) {
  return arreglo.some(item => item.text === palabra);
}

  let arraysentimientos = ["alegria", "confianza", "anticipacion","agrado","orgullo","valentia","satisfaccion","entusiasmo","fuerza","calma",
  "certeza", "compasion", "amor", "deseo", "placer", "sorpresa","miedo",
  "tristeza",
  "aversion",
  "ira",
  "desagrado",
  "indignacion",
  "cobardia",
  "insatisfaccion",
  "desinteres",
  "debilidad",
  "intranquilidad",
  "duda",
  "impiedad",
  "odio",
  "antipatia",
  "dolor"]

  let arrayAtributos = [
    "antipatia",
    "inaccion",
    "mediocridad",
    "insensibilidad",
    "fragilidad",
    "inmoralidad",
    "frialdad",
    "maltrato",
    "ignorancia",
    "ociosidad",
    "pesimismo",
    "inexperiencia",
    "ineficiencia",
    "impopular",
    "incomunativo",
    "sumision",
    "incoherencia",
    "irresponsable",
  "simpatia",
"dinamismo",
"creatividad",
"sensibilidad",
"firmeza",
"moralidad",
"calidez",
"respeto",
"conocimiento",
"laborisidad",
"optimismo",
"experiencia",
"eficiencia",
"popular",
"comunicativo",
"autoridad",
"coherencia",
"responsable",
  ]
  // Arreglo para almacenar las palabras ya seleccionadas
const palabrasSeleccionadas = [];

// Función para obtener una palabra aleatoria que no esté repetida
function obtenerPalabraSinRepetir() {
  let palabraAleatoria;
  do {
    const emocionSentimiento =
      textos.textos.sinonimos["emociones y sentimientos"][
        arraysentimientos[Math.floor(Math.random() * arraysentimientos.length)]
      ];
    palabraAleatoria =
      emocionSentimiento[Math.floor(Math.random() * emocionSentimiento.length)];
  } while (palabraRepetida(palabraAleatoria, palabrasSeleccionadas));


   // Agregar la palabra seleccionada al arreglo
   palabrasSeleccionadas.push(palabraAleatoria);
  return palabraAleatoria;
}




const palabrasSeleccionadasAtributos = [];

function obtenerPalabraSinRepetirAtributos() {
  
  let palabraAleatoria;
  do {
    const emocionSentimiento =
      textos.textos.sinonimos.atributos[
        arrayAtributos[Math.floor(Math.random() * arrayAtributos.length)]
      ];
      
    palabraAleatoria =
      emocionSentimiento[Math.floor(Math.random() * emocionSentimiento.length)];
  } while (palabraRepetida(palabraAleatoria, palabrasSeleccionadasAtributos));
  
  // Agregar la palabra seleccionada al arreglo
  palabrasSeleccionadasAtributos.push(palabraAleatoria);
 console.log(palabrasSeleccionadasAtributos)
  return palabraAleatoria;
}









    const fechas = datosInforme.reduce(
      (result, obj) => {
        const fecha = obj.date;
    
        if (!result.fechaMasAntigua || fecha < result.fechaMasAntigua) {
          result.fechaMasAntigua = fecha;
        }
    
        if (!result.fechaMasReciente || fecha > result.fechaMasReciente) {
          result.fechaMasReciente = fecha;
        }
    
        return result;
      },
      { fechaMasAntigua: null, fechaMasReciente: null }
    );
    
    const { fechaMasAntigua, fechaMasReciente } = fechas;
    
    // console.log('Fecha más antigua:', fechaMasAntigua);
    // console.log('Fecha más reciente:', fechaMasReciente);

  const openMessageEdit = (diapositivaName) => {
 
    setEditable((prevState) => ({
      ...prevState,
      [diapositivaName]: !prevState[diapositivaName],
    }));

  };
  {/*FIN MODAL*/}

  
  {/*TOUR*/}
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: 'Descargar PDF sin editar',
      description: 'Podes descargar directamente el PDF acá sin editarlo o después de editarlo.',
      cover: (
        <img
          alt="tour.png"
          src={pdfdescargado}
        />
      ),
      target: () => ref1.current,
      nextButtonProps: {
        children:'Siguiente',
      },
      prevButtonProps:{
        children:'Anterior'
      }
    
    },
    {
      title: 'Editar el PDF',
      description: 'Apretando acá vas a poder habilitar las opciones de editar el PDF diapositiva por diapositiva.',
      cover: (
        <img
          alt="tour.png"
          src={editando}
        />
      ),
      target: () => ref2.current,
      nextButtonProps: {
        children:'Siguiente',
      },
      prevButtonProps:{
        children:'Anterior'
      }
    },
    {
      title: 'Editar, guardar o descartar',
      description: 'Cuando hayas apretado "Editar" vas a poder habilitar un menu debajo de las diapositivas para editar,guardar o descartar cambios.',
      cover: (
        <img
          alt="tour.png"
          src={editarpdf}
        />
      ),
      target: () => ref3.current,
      nextButtonProps: {
        children:'Finalizar',

      },
      prevButtonProps:{
        children:'Anterior'
      }
    },
    
  ];
  {/*FIN TOUR*/}

    const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "odd-row";
    } else {
      return "even-row";
    }
  };


  const rowClassNameTotal = (name) => {
    if (name === "TOTAL") {
      return "preocupaciones-total";
    } else if (name === "TWITTER") {
      return "preocupaciones-twitter";
    } else if (name === "EMOCIONES") {
      return "emociones-color";
    }
    else {
      return "preocupaciones-facebook";
    }
  };


    function editar() {
      const newEditableValue = !editable.general;
      setEditable({
        general: newEditableValue,
        diapositiva1: newEditableValue,
        diapositiva2: newEditableValue,
        diapositiva3: newEditableValue,
        diapositiva4: newEditableValue,
        diapositiva5: newEditableValue,
        diapositiva6: newEditableValue,
        diapositiva7: newEditableValue,
        diapositiva8: newEditableValue,
        diapositiva9: newEditableValue,
        diapositiva10: newEditableValue,
      });
    }

    const [defaultValues, setDefaultValues] =useState({
      subtitulo:"Se mide el impacto de los tweets y la comparación con el periodo anterior",
      dataAtributosComunicacion: [
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>CALIDEZ</div>
            
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>CONOCIMIENTO</div>
              
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>LABORIOSIDAD</div>
              
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>EFICIENCIA</div>
              
            </div>
          ),
        },
      ],
      estado: "",
      data2:{
        series: [
          {
            name: "Periodo Actual",
            data: [datosInforme.length],
            color: "#0083CA",
          },
          {
            name: "Periodo Anterior",
            data:  [datosInformeAnterior.length],
            color: "#b5b5b5",
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          toolbar: {
            show: false, // Deshabilitar la funcionalidad de filtro
          },
    
          xaxis: {
            categories: ["Periodo Actual", "Periodo Anterior"],
          },
          fill: {
            opacity: 0.6, // Opacidad del área
          },
        },
      },
      
      dataEmocionesComunicacion: [
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>DESEO</div>
            
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>CALMA</div>
              
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>AGRADO</div>
              
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>AMOR</div>
              
            </div>
          ),
        },
      ],
      diapositivaInicial: { display: "flex" },
      diapositiva1: { display: "flex" },
      diapositiva2: { display: "flex" },
      diapositiva3: { display: "flex" },
      diapositiva4: { display: "flex" },
      diapositiva5: { display: "flex" },
      diapositiva6: { display: "flex" },
      diapositiva7: { display: "flex" },
      diapositiva8: { display: "flex" },
      diapositiva9: { display: "flex" },
      diapositiva10: { display: "flex" },
      displayTotalVolumen:'flex',
      displayTotalFacebook:'flex',
      displayTotalTwitter:'flex',
      displayTotalMedios:'flex',
      displayFacebookIcon: 'flex',
      displayTwitterIcon: 'flex',
      displayMediosIcon: 'flex',
      fortalezasDebilidades:[{
        text:"positivo", value:"80.6%",
      },
      {
        text:"negativo", value:"19.4%"
      }],
      fortalezasDebilidadestexto1:'',
      fortalezasDebilidadestexto2:'',
      columnsPreocupacionesTotal: [
        {
          title: (
            <div className="title-total icon-nombre-columnas">
              <div className="icon-nombre-columnas">
                <BsFillDashCircleFill />{" "}
              </div>
              TOTAL
            </div>
          ),
          dataIndex: "total",
          className: "hover-black",
        },
      ],
    
      columnsPreocupacionesTw: [
        {
          title: (
            <div className="icon-nombre-columnas">
              <img className="tw" src={tw} alt="logo"/>
              TWITTER
            </div>
          ),
          dataIndex: "twitter",
          className: "hover-black",
        },
      ],
    
     columnsPreocupacionesFb:[
        {
          title: (
            <div className="icon-nombre-columnas">
              <img className="fb" src={fb} alt="logo"/>
              FACEBOOK
            </div>
          ),
          dataIndex: "facebook",
          className: "hover-black",
        },
      ],
      columns: [
        {
          title: "N°",
          dataIndex: "key",
          rowScope: "row",
          headerStyle: { backgroundColor: "#0083CA" },
        },
        {
          title: "Influenciador",
          dataIndex: "influenciador",
          render: (text) => <div>{text}</div>,
          headerStyle: { backgroundColor: "#0083CA" },
        },
        {
          title: "Interacciones",
          dataIndex: "impresiones",
        },
      ],
      palabrasRecomendadas:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas2:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas3:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas4:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas5:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
     
     
      columnsEmociones: [
        {
          title: (
            <div className="title-total icon-nombre-columnas">
              <div className="icon-nombre-columnas">
              <TiHeartOutline/>
              </div>
              EMOCIONES
            </div>
          ),
          dataIndex: "emociones",
          className: "hover-black",
        },
      ],
    columnsAtributos:[
        {
          title: (
            <div className="title-total icon-nombre-columnas">
              <div className="icon-nombre-columnas">
              <BiUserCircle/>
              </div>
              ATRIBUTOS
            </div>
          ),
          dataIndex: "emociones",
          className: "hover-black",
        },
      ],
      mapaPercepciones: [
  
        { text: "anticipación", value: 20, color:"#53b253bd" },
        { text: "insensibilidad", value: 50, color:"#ff4c4cd7" },
        { text: "decisión", value: 20, color:"#53b253bd" },
        { text: "mejora", value: 15, color:"#53b253bd" },
        { text: "optimismo", value: 12, color:"#53b253bd" },
        { text: "euforia", value: 25, color:"#53b253bd" },
        { text: "consciente", value: 45, color:"#53b253bd" },
        { text: "bienestar", value: 36, color:"#53b253bd" },
        { text: "eficiencia", value: 20, color:"#53b253bd" },
        { text: "frialdad", value: 60, color:"#ff4c4cd7" },
        { text: "indiferencia", value: 57, color:"#ff4c4cd7" },
        { text: "desatención", value:58, color:"#ff4c4cd7" },
        { text: "experto", value: 57, color:"#53b253bd" },
        { text: "laboriosidad", value: 57, color:"#53b253bd" },
        { text: "conocimiento", value: 57, color:"#53b253bd" },
        { text: "educación", value: 57, color:"#53b253bd" },
        { text: "confianza", value: 21, color:"#53b253bd" },
        { text: "distante", value: 60, color:"#ff4c4cd7" },
        
      ],
      dataPreocupaciones:[
        {
          total: (
            <div className="totalizador-preocupaciones">
              <div>TRABAJO</div>
              <div>44.83%</div>
            </div>
          ),
        },
        {
          total: (
            <div className="totalizador-preocupaciones">
              <div>VIVIENDA </div>
              <div>24.14%</div>
            </div>
          ),
        },
        {
          total: (
            <div className="totalizador-preocupaciones">
              <div>EDUCACIÓN </div>
              <div>10.34%</div>
            </div>
          ),
        },
      ],
      dataPreocupacionesTw:[
        {
          twitter: (
            <div className="totalizador-preocupaciones">
              <div>TRABAJO </div>
              <div>36.84%</div>
            </div>
          ),
        },
        {
          twitter: (
            <div className="totalizador-preocupaciones">
              <div>VIVIENDA </div>
              <div>36.84%</div>
            </div>
          ),
        },
        {
          twitter: (
            <div className="totalizador-preocupaciones">
              <div>EDUCACIÓN </div>
              <div>15.79%</div>
            </div>
          ),
        },
      ],
      dataPreocupacionesFb:[
        {
          facebook: (
            <div className="totalizador-preocupaciones">
              <div>TRABAJO </div>
              <div>60.00%</div>
            </div>
          ),
        },
        {
          facebook: (
            <div className="totalizador-preocupaciones">
              <div>VIVIENDA </div>
              <div>20.00%</div>
            </div>
          ),
        },
        {
          facebook: (
            <div className="totalizador-preocupaciones">
              <div>EDUCACIÓN </div>
              <div>10.00%</div>
            </div>
          ),
        },
      ],
      data: [
        {
          key: "1",
          influenciador: "passalacquaok",
          impresiones: 38691,
        },
        {
          key: "2",
          influenciador: "PabbloZapata",
          impresiones: 6292,
        },
        {
          key: "3",
          influenciador: "noticiasen3ok",
          impresiones: 3495,
        },
        {
          key: "4",
          influenciador: "NHoughan",
          impresiones: 65,
        },
        {
          key: "5",
          influenciador: "alejavier68",
          impresiones: 64,
        },
      ],
      data2ant:[
        {
          key: "6",
          influenciador: "",
          impresiones: "",
        },
        {
          key: "7",
          influenciador: "",
          impresiones: "",
        },
        {
          key: "8",
          influenciador: "",
          impresiones: "",
        },
        {
          key: "9",
          influenciador: "",
          impresiones: "",
        },
        {
          key: "10",
          influenciador: "",
          impresiones: "",
        },
      ],
      palabrasClaves:nubePalabras,
      principalesHashtags: [
        { text: "#posadas", value: 50 },
        { text: "#ahora", value: 50 },
        { text: "#buensabado", value: 50 },
        { text: "#puertorico", value: 50 },
      ],
      datatw:{ 
        series: [
          {
            name: "Periodo Actual",
            data: [datosInforme.length],
            color: "#0083CA",
          },
          {
            name: "Periodo Anterior",
            data:  [datosInformeAnterior.length],
            color: "#b5b5b5",
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          toolbar: {
            show: false, // Deshabilitar la funcionalidad de filtro
          },
    
          xaxis: {
            categories: ["Periodo Actual", "Periodo Anterior"],
          },
        },
      },
      datafb:{ 
        series: [
        {
          name: "Periodo Actual",
          data: [5],
          color: "#3b5998",
        },
        {
          name: "Periodo Anterior",
          data: [15],
          color: "#eaeaea",
        },
      ],
      
      options: {
        chart: {
          type: "area",
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        toolbar: {
          show: false, // Deshabilitar la funcionalidad de filtro
        },
        xaxis: {
          categories: ["Periodo Actual", "Periodo Anterior"],
        },
  
        stroke: {
          show: false, // Deshabilitar las líneas
          curve: "smooth", // Tipo de curva
          colors: undefined, // Color de las líneas
          width: 2, // Ancho de las líneas
        },
      }},
   dataOuter:[
      { name: "Positivo", value: 70, fill: "#53b253bd" },
      { name: "Negativo", value: 30, fill: "#ff4c4cd7" },
    ],
    dataInner:[
      { name: "Positivo", value: 70, fill: "#53b253bd" },
      { name: "Negativo", value: 30, fill: "#ff4c4cd7" },
    ],
    dataOuterFb:[
      { name: "Positivo", value: 90, fill: "#53b253bd" },
      { name: "Negativo", value: 10, fill: "#ff4c4cd7" },
    ],
    dataInnerFb:[
      { name: "Positivo", value: 50, fill: "#53b253bd" },
      { name: "Negativo", value: 50, fill: "#ff4c4cd7" },
    ],
    dataOuterTw:[
      { name: "Positivo", value: 60, fill: "#53b253bd" },
      { name: "Negativo", value: 40, fill: "#ff4c4cd7" },
    ],
    dataInnerTw:[
      { name: "Positivo", value: 80, fill: "#53b253bd" },
      { name: "Negativo", value: 20, fill: "#ff4c4cd7" },
    ],
    fecha: `Desde ${fechaMasAntigua} - Hasta ${fechaMasReciente}`,
    valor1: 111,
    valor2:1,
    valor3:36,
    valor4:"DESCENDENTE",
    valor5:124.524,
    texto1:"",
    texto2:"",
    texto3:"",
    texto4:"",
    texto5:"",
    texto6:"",
    texto7:"",
    texto8:"",
    texto9:"",
    texto10: "",
    texto11:"",
    texto12:"",
    texto13:"",
    texto14:"",
    texto15:"",
    texto16:'',
    sugerencia1:"",
    sugerencia2:"",
    terminos1: "",
    terminos2: "",
    cliente:"TITULO",
    tiempo:"la ultima semana",
    desdeDiaHora: "",
    hastaDiaHora: "",
    
    dataEmociones:[
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>ANTICIPACIÓN </div>
            <div>65.63%</div>
          </div>
        ),
      },
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>ALEGRÍA </div>
            <div>9.38%</div>
          </div>
        ),
      },
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>CONFIANZA </div>
            <div>6.25%</div>
          </div>
        ),
      },
    ],
    dataEmocionesTw:[
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>ANTICIPACIÓN </div>
            <div>91.30%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>INSATISFACCIÓN </div>
            <div>4.35%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>DESEO </div>
            <div>4.35%</div>
          </div>
        ),
      },
    ],
    dataEmocionesFb:[
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>ALEGRÍA </div>
            <div>33.33%</div>
          </div>
        ),
      },
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>CONFIANZA </div>
            <div>22.22%</div>
          </div>
        ),
      },
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>AGRADO </div>
            <div>11.11%</div>
          </div>
        ),
      },
    ],
    dataImagenes:[
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>FRIALDAD </div>
            <div>22.22%</div>
          </div>
        ),
      },
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>CONOCIMIENTO </div>
            <div>222.224%</div>
          </div>
        ),
      },
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>LABORASIDAD </div>
            <div>22.22%</div>
          </div>
        ),
      },
    ],
    dataImagenesTw:[
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>FRIALDAD </div>
            <div>66.67%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>EFICIENCIA </div>
            <div>33.33%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div></div>
            <div></div>
          </div>
        ),
      },
    ],
    dataImagenesFb:[
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>CONOCIMIENTO </div>
            <div>33.33%</div>
          </div>
        ),
      },
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>LABORISIDAD </div>
            <div>33.33%</div>
          </div>
        ),
      },
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>OPTIMISMO </div>
            <div>16.67%</div>
          </div>
        ),
      },
    ],
  });
    {/*FIN VALORES POR DEFECTO*/}
 

    const handleHashtagChange = (index, field, value) => {
      setCambios(prevCambios => {
        const newHashtags = [...prevCambios.principalesHashtags];
        newHashtags[index][field] = value;
        return { ...prevCambios, principalesHashtags: newHashtags };
      });
    };

    
    const handleHashtagChangePercepciones = (index, field, value) => {
      setCambios(prevCambios => {
        const newHashtags = [...prevCambios.mapaPercepciones];
        newHashtags[index][field] = value;
        return { ...prevCambios, mapaPercepciones: newHashtags };
      });
    };

    const handleHashtagChangeFortalezas= (index, field, value) => {
      setCambios(prevCambios => {
        const newPorcentaje = [...prevCambios.fortalezasDebilidades];
        newPorcentaje[index][field] = value;
        return { ...prevCambios, fortalezasDebilidades: newPorcentaje };
      });
    };

    const handleInputChangeEmociones = (e, indice) => {
      const newDataEmocionesComunicacion = cambios.dataEmocionesComunicacion.map((objeto, index) => {
        if (indice === index) {
          return {
            emociones: (
              <div className="totalizador-preocupaciones">
                <div>{e.target.value}</div>
              </div>
            ),
          };
        } else {
          return objeto;
        }
      });
      
    
      setCambios(prevState => {
        return {
          ...prevState,
          dataEmocionesComunicacion: newDataEmocionesComunicacion,
        };
      });
    };


    const handleInputChangeAtributos = (e, indice) => {
      const newDataAtributosComunicacion = cambios.dataAtributosComunicacion.map((objeto, index) => {
        if (indice === index) {
          return {
            emociones: (
              <div className="totalizador-preocupaciones">
                <div>{e.target.value}</div>
              </div>
            ),
          };
        } else {
          return objeto;
        }
      });
      
    
      setCambios(prevState => {
        return {
          ...prevState,
          dataAtributosComunicacion: newDataAtributosComunicacion,
        };
      });
    };
    
    const handleHashtagChangeClave = (index, field, value) => {
      setCambios(prevCambios => {
        const newHashtags = [...prevCambios.palabrasClaves];
        newHashtags[index][field] = value;
        return { ...prevCambios, palabrasClaves: newHashtags };
      });
    };






 
    


    {/*CAMBIOS*/}
    const [cambios, setCambios] = useState({
      subtitulo:"Se mide el impacto de los tweets y la comparación con el periodo anterior",
      dataAtributosComunicacion: [
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>CALIDEZ</div>
            
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>CONOCIMIENTO</div>
              
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>LABORIOSIDAD</div>
              
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>EFICIENCIA</div>
              
            </div>
          ),
        },
      ],
      estado: "",
      data2:{
        series: [
          {
            name: "Periodo Actual",
            data: [datosInforme.length],
            color: "#0083CA",
          },
          {
            name: "Periodo Anterior",
            data:  [datosInformeAnterior.length],
            color: "#b5b5b5",
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          toolbar: {
            show: false, // Deshabilitar la funcionalidad de filtro
          },
    
          xaxis: {
            categories: ["Periodo Actual", "Periodo Anterior"],
          },
          fill: {
            opacity: 0.6, // Opacidad del área
          },
        },
      },
      
      dataEmocionesComunicacion: [
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>DESEO</div>
            
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>CALMA</div>
              
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>AGRADO</div>
              
            </div>
          ),
        },
        {
          emociones: (
            <div className="totalizador-preocupaciones">
              <div>AMOR</div>
              
            </div>
          ),
        },
      ],
      diapositivaInicial: { display: "flex" },
      diapositiva1: { display: "flex" },
      diapositiva2: { display: "flex" },
      diapositiva3: { display: "flex" },
      diapositiva4: { display: "flex" },
      diapositiva5: { display: "flex" },
      diapositiva6: { display: "flex" },
      diapositiva7: { display: "flex" },
      diapositiva8: { display: "flex" },
      diapositiva9: { display: "flex" },
      diapositiva10: { display: "flex" },
      displayTotalVolumen:'flex',
      displayTotalFacebook:'flex',
      displayTotalTwitter:'flex',
      displayTotalMedios:'flex',
      displayFacebookIcon: 'flex',
      displayTwitterIcon: 'flex',
      displayMediosIcon: 'flex',
      fortalezasDebilidades:[{
        text:"positivo", value:"80.6%",
      },
      {
        text:"negativo", value:"19.4%"
      }],
      fortalezasDebilidadestexto1:'',
      fortalezasDebilidadestexto2:'',
      columnsPreocupacionesTotal: [
        {
          title: (
            <div className="title-total icon-nombre-columnas">
              <div className="icon-nombre-columnas">
                <BsFillDashCircleFill />{" "}
              </div>
              TOTAL
            </div>
          ),
          dataIndex: "total",
          className: "hover-black",
        },
      ],
    
      columnsPreocupacionesTw: [
        {
          title: (
            <div className="icon-nombre-columnas">
              <img className="tw" src={tw} alt="logo"/>
              TWITTER
            </div>
          ),
          dataIndex: "twitter",
          className: "hover-black",
        },
      ],
    
     columnsPreocupacionesFb:[
        {
          title: (
            <div className="icon-nombre-columnas">
              <img className="fb" src={fb} alt="logo"/>
              FACEBOOK
            </div>
          ),
          dataIndex: "facebook",
          className: "hover-black",
        },
      ],
      columns: [
        {
          title: "N°",
          dataIndex: "key",
          rowScope: "row",
          headerStyle: { backgroundColor: "#0083CA" },
        },
        {
          title: "Influenciador",
          dataIndex: "influenciador",
          render: (text) => <div>{text}</div>,
          headerStyle: { backgroundColor: "#0083CA" },
        },
        {
          title: "Interacciones",
          dataIndex: "impresiones",
        },
      ],
      palabrasRecomendadas:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas2:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas3:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas4:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas5:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],

     
      columnsEmociones: [
        {
          title: (
            <div className="title-total icon-nombre-columnas">
              <div className="icon-nombre-columnas">
              <TiHeartOutline/>
              </div>
              EMOCIONES
            </div>
          ),
          dataIndex: "emociones",
          className: "hover-black",
        },
      ],
    columnsAtributos:[
        {
          title: (
            <div className="title-total icon-nombre-columnas">
              <div className="icon-nombre-columnas">
              <BiUserCircle/>
              </div>
              ATRIBUTOS
            </div>
          ),
          dataIndex: "emociones",
          className: "hover-black",
        },
      ],
      mapaPercepciones: [
  
        { text: "anticipación", value: 20, color:"#53b253bd" },
        { text: "insensibilidad", value: 50, color:"#ff4c4cd7" },
        { text: "decisión", value: 20, color:"#53b253bd" },
        { text: "mejora", value: 15, color:"#53b253bd" },
        { text: "optimismo", value: 12, color:"#53b253bd" },
        { text: "euforia", value: 25, color:"#53b253bd" },
        { text: "consciente", value: 45, color:"#53b253bd" },
        { text: "bienestar", value: 36, color:"#53b253bd" },
        { text: "eficiencia", value: 20, color:"#53b253bd" },
        { text: "frialdad", value: 60, color:"#ff4c4cd7" },
        { text: "indiferencia", value: 57, color:"#ff4c4cd7" },
        { text: "desatención", value:58, color:"#ff4c4cd7" },
        { text: "experto", value: 57, color:"#53b253bd" },
        { text: "laboriosidad", value: 57, color:"#53b253bd" },
        { text: "conocimiento", value: 57, color:"#53b253bd" },
        { text: "educación", value: 57, color:"#53b253bd" },
        { text: "confianza", value: 21, color:"#53b253bd" },
        { text: "distante", value: 60, color:"#ff4c4cd7" },
        
      ],
      dataPreocupaciones:[
        {
          total: (
            <div className="totalizador-preocupaciones">
              <div>TRABAJO</div>
              <div>44.83%</div>
            </div>
          ),
        },
        {
          total: (
            <div className="totalizador-preocupaciones">
              <div>VIVIENDA </div>
              <div>24.14%</div>
            </div>
          ),
        },
        {
          total: (
            <div className="totalizador-preocupaciones">
              <div>EDUCACIÓN </div>
              <div>10.34%</div>
            </div>
          ),
        },
      ],
      dataPreocupacionesTw:[
        {
          twitter: (
            <div className="totalizador-preocupaciones">
              <div>TRABAJO </div>
              <div>36.84%</div>
            </div>
          ),
        },
        {
          twitter: (
            <div className="totalizador-preocupaciones">
              <div>VIVIENDA </div>
              <div>36.84%</div>
            </div>
          ),
        },
        {
          twitter: (
            <div className="totalizador-preocupaciones">
              <div>EDUCACIÓN </div>
              <div>15.79%</div>
            </div>
          ),
        },
      ],
      dataPreocupacionesFb:[
        {
          facebook: (
            <div className="totalizador-preocupaciones">
              <div>TRABAJO </div>
              <div>60.00%</div>
            </div>
          ),
        },
        {
          facebook: (
            <div className="totalizador-preocupaciones">
              <div>VIVIENDA </div>
              <div>20.00%</div>
            </div>
          ),
        },
        {
          facebook: (
            <div className="totalizador-preocupaciones">
              <div>EDUCACIÓN </div>
              <div>10.00%</div>
            </div>
          ),
        },
      ],
      data: [
        {
          key: "1",
          influenciador: "passalacquaok",
          impresiones: 38691,
        },
        {
          key: "2",
          influenciador: "PabbloZapata",
          impresiones: 6292,
        },
        {
          key: "3",
          influenciador: "noticiasen3ok",
          impresiones: 3495,
        },
        {
          key: "4",
          influenciador: "NHoughan",
          impresiones: 65,
        },
        {
          key: "5",
          influenciador: "alejavier68",
          impresiones: 64,
        },
      ],
      data2ant:[
        {
          key: "6",
          influenciador: "",
          impresiones: "",
        },
        {
          key: "7",
          influenciador: "",
          impresiones: "",
        },
        {
          key: "8",
          influenciador: "",
          impresiones: "",
        },
        {
          key: "9",
          influenciador: "",
          impresiones: "",
        },
        {
          key: "10",
          influenciador: "",
          impresiones: "",
        },
      ],
      palabrasClaves:nubePalabras,
      principalesHashtags: [
        { text: "#posadas", value: 50 },
        { text: "#ahora", value: 50 },
        { text: "#buensabado", value: 50 },
        { text: "#puertorico", value: 50 },
      ],
      datatw:{ 
        series: [
          {
            name: "Periodo Actual",
            data: [datosInforme.length],
            color: "#0083CA",
          },
          {
            name: "Periodo Anterior",
            data:  [datosInformeAnterior.length],
            color: "#b5b5b5",
          },
        ],
        options: {
          chart: {
            type: "area",
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          toolbar: {
            show: false, // Deshabilitar la funcionalidad de filtro
          },
    
          xaxis: {
            categories: ["Periodo Actual", "Periodo Anterior"],
          },
        },
      },
      datafb:{ 
        series: [
        {
          name: "Periodo Actual",
          data: [5],
          color: "#3b5998",
        },
        {
          name: "Periodo Anterior",
          data: [15],
          color: "#eaeaea",
        },
      ],
      
      options: {
        chart: {
          type: "area",
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        toolbar: {
          show: false, // Deshabilitar la funcionalidad de filtro
        },
        xaxis: {
          categories: ["Periodo Actual", "Periodo Anterior"],
        },
  
        stroke: {
          show: false, // Deshabilitar las líneas
          curve: "smooth", // Tipo de curva
          colors: undefined, // Color de las líneas
          width: 2, // Ancho de las líneas
        },
      }},
   dataOuter:[
      { name: "Positivo", value: 70, fill: "#53b253bd" },
      { name: "Negativo", value: 30, fill: "#ff4c4cd7" },
    ],
    dataInner:[
      { name: "Positivo", value: 70, fill: "#53b253bd" },
      { name: "Negativo", value: 30, fill: "#ff4c4cd7" },
    ],
    dataOuterFb:[
      { name: "Positivo", value: 90, fill: "#53b253bd" },
      { name: "Negativo", value: 10, fill: "#ff4c4cd7" },
    ],
    dataInnerFb:[
      { name: "Positivo", value: 50, fill: "#53b253bd" },
      { name: "Negativo", value: 50, fill: "#ff4c4cd7" },
    ],
    dataOuterTw:[
      { name: "Positivo", value: 60, fill: "#53b253bd" },
      { name: "Negativo", value: 40, fill: "#ff4c4cd7" },
    ],
    dataInnerTw:[
      { name: "Positivo", value: 80, fill: "#53b253bd" },
      { name: "Negativo", value: 20, fill: "#ff4c4cd7" },
    ],
    fecha: `Desde ${fechaMasAntigua} - Hasta ${fechaMasReciente}`,
    valor1: 111,
    valor2:1,
    valor3:36,
    valor4:"DESCENDENTE",
    valor5:124.524,
    texto1:"",
    texto2:"",
    texto3:"",
    texto4:"",
    texto5:"",
    texto6:"",
    texto7:"",
    texto8:"",
    texto9:"",
    texto10: "",
    texto11:"",
    texto12:"",
    texto13:"",
    texto14:"",
    texto15:"",
    texto16:'',
    sugerencia1:"",
    sugerencia2:"",
    terminos1: "",
    terminos2: "",
    cliente:"TITULO",
    tiempo:"la ultima semana",
    desdeDiaHora: "",
    hastaDiaHora: "",
    
    dataEmociones:[
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>ANTICIPACIÓN </div>
            <div>65.63%</div>
          </div>
        ),
      },
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>ALEGRÍA </div>
            <div>9.38%</div>
          </div>
        ),
      },
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>CONFIANZA </div>
            <div>6.25%</div>
          </div>
        ),
      },
    ],
    dataEmocionesTw:[
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>ANTICIPACIÓN </div>
            <div>91.30%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>INSATISFACCIÓN </div>
            <div>4.35%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>DESEO </div>
            <div>4.35%</div>
          </div>
        ),
      },
    ],
    dataEmocionesFb:[
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>ALEGRÍA </div>
            <div>33.33%</div>
          </div>
        ),
      },
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>CONFIANZA </div>
            <div>22.22%</div>
          </div>
        ),
      },
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>AGRADO </div>
            <div>11.11%</div>
          </div>
        ),
      },
    ],
    dataImagenes:[
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>FRIALDAD </div>
            <div>22.22%</div>
          </div>
        ),
      },
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>CONOCIMIENTO </div>
            <div>222.224%</div>
          </div>
        ),
      },
      {
        total: (
          <div className="totalizador-preocupaciones">
            <div>LABORASIDAD </div>
            <div>22.22%</div>
          </div>
        ),
      },
    ],
    dataImagenesTw:[
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>FRIALDAD </div>
            <div>66.67%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>EFICIENCIA </div>
            <div>33.33%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div></div>
            <div></div>
          </div>
        ),
      },
    ],
    dataImagenesFb:[
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>CONOCIMIENTO </div>
            <div>33.33%</div>
          </div>
        ),
      },
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>LABORISIDAD </div>
            <div>33.33%</div>
          </div>
        ),
      },
      {
        facebook: (
          <div className="totalizador-preocupaciones">
            <div>OPTIMISMO </div>
            <div>16.67%</div>
          </div>
        ),
      },
    ],
  });
   {/*FIN CAMBIOS*/}

   useEffect(()=>{
    setCambios((prevState)=>({
      ...prevState,
      palabrasRecomendadas:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas2:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas3:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas4:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
      palabrasRecomendadas5:[
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 },
        { text: obtenerPalabraSinRepetir(), value: 30 }
      ],
    }))
   },[])
 

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCambios((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };


  function mostrarGrafico(graficoState) {
    const botonMostrar = document.getElementById("mostrarGrafico");
    setCambios(prevState => ({ ...prevState, [graficoState]: 'flex' }));
    botonMostrar.style.display = "none"; 
    if(graficoState === 'displayTotalFacebook'){
      setCambios(prevState => ({ ...prevState, displayFacebookIcon: 'flex' }));
    } else if(graficoState === 'displayTotalMedios') {
      setCambios(prevState => ({ ...prevState,displayMediosIcon: 'flex' }));
    } else if(graficoState === 'displayTotalTwitter') {
      setCambios(prevState => ({ ...prevState, displayTwitterIcon: 'flex' }));
    }
       
  }

  
  const customLocale = {
    nextText: 'Siguiente',
    prevText: 'Anterior',
    
  };


   {/*MODAL EDITAR GRAFICO TORTA */}

  const showModalTorta = (modals) => {
    setShowModal((prevState) => ({
      ...prevState,
      [modals]: !prevState[modals],
    }));
  };
  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  
  const handleInputNumberChange = (index, isOuter, newValue, key) => {
    const newData = isOuter ? [...cambios[key]] : [...cambios[key.replace('Outer', 'Inner')]];
    newData[index].value = newValue;
  
    if (isOuter) {
      setCambios({
        ...cambios,
        [key]: newData,
      });
    } else {
      setCambios({
        ...cambios,
        [key.replace('Outer', 'Inner')]: newData,
      });
    }
  };

  const [modals, setShowModal] = useState([
    {dataGraficoTotal:false},
    {dataGraficoFb:false},
    {dataGraficoTw:false},
    { dataDatos: false },
    { showModal1: false },
    { dataTorta:false },
    { dataTortaFb:false },
    { dataTortaTw:false },
    { dataNubeHashtags: false },
    { dataNubeClave: false },
    { dataInfluenciadores: false},
    { dataPreocupaciones: false},
    {dataEmocionesComunicacion:false},
    {dataAtributosComunicacion: false},
    { dataEmociones: false },
    { dataImagenes: false },
    { dataMapaPercepciones:false },
    { fortalezasDebilidades: false},
    { showModal2: false },
    { showModal3: false },
    { showModal4: false },
    { showModal5: false },
    { showModal6: false },
    { showModal7: false },
    { showModal8: false },
    { showModal9: false },
    { showModal10: false }
  ]);

  function resetValues(valor) {
   /*  console.log(defaultValues[valor]) */
    if (Array.isArray(defaultValues[valor])) {
      setCambios(prevState => ({
        ...prevState,
        [valor]: [...defaultValues[valor]],
      }));
    } else {
      setCambios(prevState => ({
        ...prevState,
        [valor]: defaultValues[valor],
      }));
    }
     
    setShowModal(false);
    messageApi.open({
      key,
      type: 'success',
      content: 'Cambios descartados!',
      duration: 2,
    });
   
    
  };

  const handleDiscardChanges = (diapositivaName, showModal) => {
    setShowModal((prevState) => ({
      ...prevState,
      [showModal]: !prevState[showModal],
    }));
    setEditable((prevState) => ({
      ...prevState,
      [diapositivaName]: !prevState[diapositivaName],
    }));
  }

  const handleDisplay = (diapositiva) => {
    setCambios(prevState => ({
      ...prevState,
      [diapositiva]: { display: !prevState[diapositiva].display }
    }));
  };

   
  function eliminarGrafico(graficoState) {
    const botonMostrar = document.getElementById("mostrarGrafico");
    setCambios(prevState => ({ ...prevState, [graficoState]: 'none' }));
    /* || 'displayTotalMedios' || 'displayTotalTwitter'  */
    if(graficoState === 'displayTotalFacebook'){
      setCambios(prevState => ({ ...prevState, displayFacebookIcon: 'none' }));
    } else if(graficoState === 'displayTotalMedios') {
      setCambios(prevState => ({ ...prevState,displayMediosIcon: 'none' }));
    } else if(graficoState === 'displayTotalTwitter') {
      setCambios(prevState => ({ ...prevState, displayTwitterIcon: 'none' }));
    }
       
  }
 
 function handleInputNumberChangeFb2(newValue) {
    const newDatafb = {...cambios.datafb};  // Crear una copia del objeto 'datafb' del estado
    newDatafb.series[1].data = [newValue]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    setCambios({ ...cambios, datafb: newDatafb }); // Actualizar el estado con el nuevo objeto 'datafb'
  }

  function handleInputNumberChangetotal1(newValue) {
    const newDatafb = {...cambios.data2};  // Crear una copia del objeto 'datafb' del estado
    newDatafb.series[0].data = [newValue]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    setCambios({ ...cambios, data2: newDatafb }); // Actualizar el estado con el nuevo objeto 'datafb'
  }

  function handleInputNumberChangetotal2(newValue) {
    const newDatafb = {...cambios.data2};  // Crear una copia del objeto 'datafb' del estado
    newDatafb.series[1].data = [newValue]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    setCambios({ ...cambios, data2: newDatafb }); // Actualizar el estado con el nuevo objeto 'datafb'
  }

  function handleInputNumberChangeFb1(newValue) {
    const newDatafb = {...cambios.datafb};  // Crear una copia del objeto 'datafb' del estado
    newDatafb.series[0].data = [newValue]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    setCambios({ ...cambios, datafb: newDatafb }); // Actualizar el estado con el nuevo objeto 'datafb'
  }

  function handleInputNumberChangeTw1(newValue) {
    const newDataTw = {...cambios.datatw};  // Crear una copia del objeto 'datatw' del estado
    newDataTw.series[0].data = [newValue]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    setCambios({ ...cambios, datatw: newDataTw }); // Actualizar el estado con el nuevo objeto 'datatw'
  }

  function handleInputNumberChangeTw2(newValue) {
    const newDataTw = {...cambios.datatw};  // Crear una copia del objeto 'datatw' del estado
    newDataTw.series[0].data = [newValue]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    setCambios({ ...cambios, datatw: newDataTw }); // Actualizar el estado con el nuevo objeto 'datatw'
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCambios({...cambios, [name]: value});
  }

  const config = {
    data: cambios.principalesHashtags,
    wordField: 'text',
    weightField: 'value',
    colorField: 'text',
    color: ["#0083CA"],
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 30],
      rotation: 0,
    },
    random: () => 0.5,
  };

  const configPalabrasClave = {
    data: cambios.palabrasClaves,
    wordField: 'palabra',
    weightField: 'valor',
    colorField: 'palabra',
    color: ["#0083CA"],
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8,30],
      rotation: 0,
    },
    random: () => 0.5,
  };

  const configMapaPercepciones= {
    data: cambios.mapaPercepciones,
    wordField: 'text',
    weightField: 'value',
    color: [ "#ff4c4cd7","#53b253bd"],
    colorField: 'color',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [10,60],
      rotation: 0,
    },
    random: () => 0.5,
  };


  const configpalabrasRecomendadas2= {
    data: cambios.palabrasRecomendadas2,
    wordField: 'text',
    weightField: 'value',
    color: [ "#53b253bd"],
    colorField:'text',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8,50],
      rotation: 0,
    },
    random: () => 0.5,
  };

  const configpalabrasRecomendadas3= {
    data: cambios.palabrasRecomendadas3,
    wordField: 'text',
    weightField: 'value',
    color: [ "#53b253bd"],
    colorField:'text',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8,50],
      rotation: 0,
    },
    random: () => 0.5,
  };

  const configpalabrasRecomendadas4= {
    data: cambios.palabrasRecomendadas4,
    wordField: 'text',
    weightField: 'value',
    color: [ "#53b253bd"],
    colorField:'text',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8,50],
      rotation: 0,
    },
    random: () => 0.5,
  };
  const configpalabrasRecomendadas5= {
    data: cambios.palabrasRecomendadas5,
    wordField: 'text',
    weightField: 'value',
    color: [ "#53b253bd"],
    colorField:'text',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8,50],
      rotation: 0,
    },
    random: () => 0.5,
  };






 
  

  function diapositiva1(){
    
    var contadorPorHora = {};

    // Iterar sobre el array de datosInforme
    for (var i = 0; i < datosInforme.length; i++) {
      var tweet = datosInforme[i];
      var hora = tweet.hora; 
    
      // Aumentar el contador correspondiente a la hora actual
      if (contadorPorHora[hora]) {
        contadorPorHora[hora]++;
      } else {
        contadorPorHora[hora] = 1;
      }
    }
    
    // Imprimir el recuento por hora
    
    // console.log("Recuento por hora:",contadorPorHora);
    var maximo = 0;
    var horaPico = null;

    // Iterar sobre el objeto contadorPorHora
    for (var hora in contadorPorHora) {
    if (contadorPorHora[hora] > maximo) {
        maximo = contadorPorHora[hora];
        horaPico = hora;
    }
    }
    var sumaTotal = 0;
    var numeroHoras = 0;
    
    // Iterar sobre el objeto contadorPorHora para sumar la cantidad de publicaciones y contar las horas
    for (var hora in contadorPorHora) {
      sumaTotal += contadorPorHora[hora];
      numeroHoras++;
    }
    
    // Calcular el promedio
    var promedio = Math.floor(sumaTotal / numeroHoras);

    // console.log("Promedio de publicaciones por hora: " + promedio);
   
    // console.log("Pico máximo de publicaciones: Hora: " + horaPico);
    // console.log("Pico máximo de publicaciones: Cantidad: " + maximo);



    const newDataTw = {...cambios.datatw};  // Crear una copia del objeto 'datatw' del estado
    newDataTw.series[0].data = [datosInforme.length]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    newDataTw.series[1].data = [datosInformeAnterior.length]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    setCambios({ ...cambios, datatw: newDataTw }); // Actualizar el estado con el nuevo objeto 'datatw'
    const newDataTwAnt = {...cambios.data2};  // Crear una copia del objeto 'data' del estado
    newDataTwAnt.series[0].data = [datosInforme.length]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    newDataTwAnt.series[1].data = [datosInformeAnterior.length]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    setCambios({ ...cambios, data2: newDataTwAnt }); // Actualizar el estado con el nuevo objeto 'data'

    



    // const newDatafb = {...cambios.data2};  // Crear una copia del objeto 'datafb' del estado
    // newDatafb.series[0].data = [datosInforme.length]; // Actualizar el valor de la propiedad 'data' de la serie 'Periodo Anterior'
    // setCambios({ ...cambios, data2: newDatafb }); // Actualizar el estado con el nuevo objeto 'datafb'
    
    setCambios({ ...cambios, valor1: datosInforme.length , valor2: promedio, valor3: maximo , valor5:`${horaPico}:00` });
    setDefaultValues({ ...defaultValues, valor1: datosInforme.length , valor2: promedio, valor3: maximo, valor5:`${horaPico}:00`});
    }


    const datatweet = [
      { type: 'Positivo', value: 0 },
      { type: 'Negativo', value: 0 },
      
    ];
  
    const datatweetAnterior = [
      { type: 'Positivo', value: 0 },
      { type: 'Negativo', value: 0 },
    
    ];


  useEffect(()=>{
    
  },[cambios, defaultValues])

  useEffect(()=>{
   diapositiva1()
   if (datosInforme.length < datosInformeAnterior.length) {
    setCambios((prevCambios) => ({ ...prevCambios, valor4: "DESCENDENTE" }));
  } else {
  
    // console.log(datosInforme.length > datosInformeAnterior.length);
    setCambios((prevCambios) => ({ ...prevCambios, valor4: "ASCENDENTE" }));
  }

  
  if(datosInforme.length > 0){
    datosInforme.forEach(tweet => {
      if (tweet.sentimiento === 'positivo') {
        datatweet[0].value++;
      } else if (tweet.sentimiento === 'negativo') {
        datatweet[1].value++;
      } else {

      }
    });

  }

  if(datosInformeAnterior.length > 0){
    datosInformeAnterior.forEach(tweet => {
      if (tweet.sentimiento === 'positivo') {
        datatweetAnterior[0].value++;
      } else if (tweet.sentimiento === 'negativo') {
        datatweetAnterior[1].value++;
      } else {
       
      }
    });
  
  }

 /////////
 function contarMencionesPorHashtag(tweets) {
  const mencionesPorHashtag = {};

  tweets.forEach((tweet) => {
    const hashTags = tweet.hashTags;

    if (hashTags) {
      const hashTagsArray = hashTags;

      hashTagsArray.forEach((hashtag) => {
        if (!mencionesPorHashtag[hashtag]) {
          mencionesPorHashtag[hashtag] = 0;
        }

        mencionesPorHashtag[hashtag]++;
      });
    }
  });

  const data = Object.entries(mencionesPorHashtag).map(([hashtag, menciones], index) => ({
    key: (index + 1).toString(),
    Hashtags: hashtag,
    Menciones: menciones,
  })).sort((a, b) => b.Menciones - a.Menciones);

  return data;
}



const principalesHashtagsData = contarMencionesPorHashtag(datosInforme).slice(0,10)
// console.log(principalesHashtagsData)

if(principalesHashtagsData.length > 0){


setCambios((prevCambios) => ({
  ...prevCambios,
principalesHashtags: [
  { text: principalesHashtagsData?.[0].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[1].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[2].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[3].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[4].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[5].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[6].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[7].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[8].Hashtags || "", value: 80 },
  { text: principalesHashtagsData?.[9].Hashtags || "", value: 80 },
], 
}));
}
//////////////


/////////////
datosInforme.forEach(tweet => {
  // Paso 2: Sumar las propiedades "citas", "retweets", "likes", "comentarios" y "vistas"
  const { citas, retweets, likes, comentarios } = tweet;
  const totalInteracciones = citas + retweets + likes + comentarios;

  // Paso 3: Almacenar la suma en una nueva propiedad del objeto
  tweet.totalInteracciones = totalInteracciones;
});

const usuarios = {};

// Paso 2: Sumar las totalInteracciones correspondientes a cada usuario
datosInforme.forEach(tweet => {
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
const top10MasRetwitteados = tweetsNuevo;

// Generar el nuevo array de objetos con la estructura deseada
const categorizadoresData = top10MasRetwitteados.map((tweet, index) => ({
  key: (index + 1).toString(),
  Autor: tweet.usuarioOriginal,
  totalInteracciones: tweet.totalInteracciones,
}));

// Ordenar el nuevo array en base a la propiedad "totalInteracciones" de forma descendente
const categorizadores =  categorizadoresData.sort((a, b) => b.totalInteracciones - a.totalInteracciones);

if(categorizadores.length > 0){

// console.log(categorizadores)
setCambios((prevCambios) => ({
  ...prevCambios,
  data: [
    {
      key: "1",
      influenciador: categorizadores?.[0].Autor || "",
      impresiones: categorizadores?.[0].totalInteracciones || "",
    },
    {
      key: "2",
      influenciador: categorizadores?.[1].Autor || "",
      impresiones: categorizadores?.[1].totalInteracciones || "",
    },
    {
      key: "3",
      influenciador: categorizadores?.[2].Autor || "",
      impresiones: categorizadores?.[2].totalInteracciones || "",
    },
    {
      key: "4",
      influenciador: categorizadores?.[3].Autor || "",
      impresiones: categorizadores?.[3].totalInteracciones || "",
    },
    {
      key: "5",
      influenciador: categorizadores?.[4].Autor || "",
      impresiones: categorizadores?.[4].totalInteracciones || "",
    },
  ],
  data2ant:[
    {
      key: "6",
      influenciador: categorizadores?.[5].Autor || "",
      impresiones: categorizadores?.[5].totalInteracciones || "",
    },
    {
      key: "7",
      influenciador: categorizadores?.[6].Autor || "",
      impresiones: categorizadores?.[6].totalInteracciones || "",
    },
    {
      key: "8",
      influenciador: categorizadores?.[7].Autor || "",
      impresiones: categorizadores?.[7].totalInteracciones || "",
    },
    {
      key: "9",
      influenciador: categorizadores?.[8].Autor || "",
      impresiones: categorizadores?.[8].totalInteracciones || "", 
    },
    {
      key: "10",
      influenciador: categorizadores?.[9].Autor || "",
      impresiones: categorizadores?.[9].totalInteracciones || "",
    },
  ],
}));
  
}

///////////////


  const categoriasModelos = [
   { modelo: "Preocupaciones", categorias: ["Seguridad", "Tránsito y transporte", "Corrupción", "Inflación", "Trabajo", "Educación", "Contaminación", "Salud", "Ambiente", "Vivienda"] },
   { modelo: "Emociones%20B%C3%A1sicas%20(Plutchik)", categorias: ["Miedo", "Tristeza", "Alegría", "Abierto al diálogo", "Confianza", "Anticipación", "Sorpresa", "Ira", "Aversión"] },
   { modelo: "Atributos%20de%20Personalidad", categorias: ["Sociable", "Antipatico", "Dinamismo", "Creatividad", "Mediocridad", "Sensibilidad", "Insensibilidad", "Firmeza", "Fragilidad", "Moralidad", "Inmoralidad", "Calidez", "Frialdad", "Respeto", "Maltrato", "Conocimiento", "Ignorancia", "Laboriosidad", "Ociosidad", "Optimismo", "Pesimismo", "Credibilidad", "Desconfianza", "Competencia comunicativa", "Ignorancia", "Honestidad", "Deshonestidad", "Sensibilidad social", "Responsable", "Insensibilidad social", "Defensa de lo nacional", "No defensa de lo nacional", "Experiencia", "Autoridad", "Coherencia", "Agrado"] },
   { modelo: "Atributos%20de%20Politicos", categorias: ["Capacidad de gestión", "Ineptitud de gestión", "Respeto institucional", "Falta de autoridad", "Popular", "Cerrado al diálogo", "Incompetencia comunicativa", "Abierto al diálogo", "Inexperiencia", "Conocimiento", "Ignorancia", "Honestidad", "Deshonestidad", "Sensibilidad social", "Responsable", "Insensibilidad social", "Defensa de lo nacional", "No defensa de lo nacional", "Competencia comunicativa", "Inpopular", "No respeto institucional", "Incoherencia", "Experiencia", "Autoridad", "Coherencia"] },

  ];

  function generarArrayCategorias(array, modelo, tweets) {
    const modeloEncontrado = array.find((item) => item.modelo === modelo);
 
    if (!modeloEncontrado) {
      return null;
    }
  
    const atributos = modeloEncontrado.categorias;
    const totalTweetsConDatos = tweets.filter((tweet) => tweet.Preocupaciones && tweet.Preocupaciones.length > 0).length;

    const data = {
      name: 'root',
      children: atributos.map((atributo) => ({
        name: atributo,
        value: contarTweetsConDatos(tweets, "Preocupaciones", atributo),
      })),
    };
  
    return {
      ...data,
      children: data.children.map((child) => ({
        ...child,
        percentage: (child.value / totalTweetsConDatos) * 100, // Calcula el porcentaje en base al total de tweets
      })),
    };
  }



  function contarTweetsConDatos(tweets, modelo, atributo) {
    return tweets.filter((tweet) => {
      return tweet[modelo] && tweet[modelo].includes(atributo);
    }).length;
  }
  const dataPreocipacionesCategoria = generarArrayCategorias(categoriasModelos, "Preocupaciones", datosInforme)
// console.log(dataPreocipacionesCategoria.children)
const dataOrdenada2 = dataPreocipacionesCategoria.children.sort((a, b) => b.percentage - a.percentage);


///////
const totalTweet = datatweet.reduce((total, item) => total + item.value, 0);
const totalTweetAnterior = datatweetAnterior.reduce((total, item) => total + item.value, 0);

const tweetPorcentajes = datatweet.map(item => ({
  type: item.type,
  porcentaje: ((item.value / totalTweet) * 100).toFixed(2) + "%"
}));

const tweetAnteriorPorcentajes = datatweetAnterior.map(item => ({
  type: item.type,
  porcentaje: ((item.value / totalTweetAnterior) * 100).toFixed(2) + "%"
}));

const tweetPredominante = datatweet.reduce((prev, current) => (prev.value > current.value) ? prev : current);
const tweetAnteriorPredominante = datatweetAnterior.reduce((prev, current) => (prev.value > current.value) ? prev : current);

// const estadoNuevo = `Tendencia predominante en relación al mismo período anterior:\n${tweetPredominante.type.toUpperCase()} ${tweetAnteriorPorcentajes.find(item => item.type === tweetAnteriorPorcentajes.type).porcentaje}`;
setCambios((prevCambios) => ({
  ...prevCambios,
  estado: ""}))

////////////////






////////////////////////////////////////////////////////
// Función para normalizar caracteres y eliminar acentos
function normalizeString(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Buscando la propiedad sin tener en cuenta las tildes

if (tweetPredominante.type === "Negativo") {
  // console.log("TEXTOS NEGATIVOS", textos.textos.preocupaciones.negativos);
  let objetoDatos = textos.textos.preocupaciones.negativos;

  const nombresBuscados = [dataOrdenada2[0].name.toLowerCase(), dataOrdenada2[1].name.toLowerCase(), dataOrdenada2[2].name.toLowerCase()];
  const propiedadesEncontradas = [];

  for (const nombreBuscado of nombresBuscados) {
    const propiedades = Object.keys(objetoDatos);
    let propiedadEncontrada = null;

    for (const propiedad of propiedades) {
      const propiedadNormalizada = normalizeString(propiedad.toLowerCase());
      if (normalizeString(nombreBuscado) === propiedadNormalizada) {
        propiedadEncontrada = propiedad;
        break;
      }
    }

    propiedadesEncontradas.push(propiedadEncontrada);
    // console.log(nombreBuscado);
  }

  setCambios((prevCambios) => ({
    ...prevCambios,
    texto7: propiedadesEncontradas[0] !== null ? objetoDatos[propiedadesEncontradas[0]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[0]].length)] : null,
    texto8: propiedadesEncontradas[1] !== null ? objetoDatos[propiedadesEncontradas[1]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[1]].length)] : null,
    texto9: propiedadesEncontradas[2] !== null ? objetoDatos[propiedadesEncontradas[2]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[2]].length)] : null,
  }));
}

else {
  // console.log("TEXTOS POSITIVOS", textos.textos.preocupaciones.positivos);
  let objetoDatos = textos.textos.preocupaciones.positivos;

  const nombresBuscados = [dataOrdenada2[0].name.toLowerCase(), dataOrdenada2[1].name.toLowerCase(), dataOrdenada2[2].name.toLowerCase()];
  const propiedadesEncontradas = [];

  for (const nombreBuscado of nombresBuscados) {
    const propiedades = Object.keys(objetoDatos);
    let propiedadEncontrada = null;

    for (const propiedad of propiedades) {
      const propiedadNormalizada = normalizeString(propiedad.toLowerCase());
      if (normalizeString(nombreBuscado) === propiedadNormalizada) {
        propiedadEncontrada = propiedad;
        break;
      }
    }

    propiedadesEncontradas.push(propiedadEncontrada);
    // console.log(nombreBuscado);
  }

  setCambios((prevCambios) => ({
    ...prevCambios,
    texto7: propiedadesEncontradas[0] !== null ? objetoDatos[propiedadesEncontradas[0]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[0]].length)] : null,
    texto8: propiedadesEncontradas[1] !== null ? objetoDatos[propiedadesEncontradas[1]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[1]].length)] : null,
    texto9: propiedadesEncontradas[2] !== null ? objetoDatos[propiedadesEncontradas[2]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[2]].length)] : null,
  }));
}

///////////////////////////////////////////////////////////////////











  setCambios((prevCambios) => ({
    ...prevCambios,
  dataPreocupacionesTw:[
    {
      twitter: (
        <div className="totalizador-preocupaciones">
          <div>{dataOrdenada2[0].name.toUpperCase() }</div>
          <div>{dataOrdenada2[0].percentage.toFixed(2)}%</div>
        </div>
      ),
    },
    {
      twitter: (
        <div className="totalizador-preocupaciones">
          <div>{dataOrdenada2[1].name.toUpperCase()}</div>
          <div>{dataOrdenada2[1].percentage.toFixed(2)}%</div>
        </div>
      ),
    },
    {
      twitter: (
        <div className="totalizador-preocupaciones">
          <div>{dataOrdenada2[2].name.toUpperCase() } </div>
          <div>{dataOrdenada2[2].percentage.toFixed(2)}%</div>
        </div>
      ),
    },
  ],

}));




  /////////////
   function generarArrayCategoriasEmociones(array, modelo, tweets) {
     const modeloEncontrado = array.find((item) => item.modelo === modelo);
   
     if (!modeloEncontrado) {
       return null;
     }
   
     const atributos = modeloEncontrado.categorias;
     
     const totalTweetsConDatos = tweets.filter((tweet) => tweet["Emociones Básicas (Plutchik)"] && tweet["Emociones Básicas (Plutchik)"].length > 0).length;
     const data = {
       name: 'root',
       children: atributos.map((atributo) => ({
         name: atributo,
         value: contarTweetsConDatosEmociones(tweets, "Emociones Básicas (Plutchik)", atributo),
       })),
     };
   
     return {
       ...data,
       children: data.children.map((child) => ({
         ...child,
         percentage: (child.value / totalTweetsConDatos) * 100, // Calcula el porcentaje en base al total de tweets
       })),
     };
   }
 
 
 
   function contarTweetsConDatosEmociones(tweets, modelo, atributo) {
     return tweets.filter((tweet) => {
       return tweet[modelo] && tweet[modelo].includes(atributo);
     }).length;
   }
   const dataEmocionesTop = generarArrayCategoriasEmociones(categoriasModelos, "Emociones%20B%C3%A1sicas%20(Plutchik)", datosInforme)
//  console.log(dataEmocionesTop.children)
 const dataOrdenada1 = dataEmocionesTop.children.sort((a, b) => b.percentage - a.percentage);

 ////////////////////////////////////



  // console.log("TEXTOS NEGATIVOS", textos.textos.emociones);
  let objetoDatos = textos.textos.emociones;

  const nombresBuscados = [dataOrdenada1[0].name.toLowerCase(), dataOrdenada1[1].name.toLowerCase(), dataOrdenada1[2].name.toLowerCase()];
  const propiedadesEncontradas = [];

  for (const nombreBuscado of nombresBuscados) {
    const propiedades = Object.keys(objetoDatos);
    let propiedadEncontrada = null;

    for (const propiedad of propiedades) {
      const propiedadNormalizada = normalizeString(propiedad.toLowerCase());
      if (normalizeString(nombreBuscado) === propiedadNormalizada) {
        propiedadEncontrada = propiedad;
        break;
      }
    }

    propiedadesEncontradas.push(propiedadEncontrada);
    // console.log(nombreBuscado);
  }

  setCambios((prevCambios) => ({
    ...prevCambios,
    texto10: propiedadesEncontradas[0] !== null ? objetoDatos[propiedadesEncontradas[0]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[0]].length)] : null,
    texto11: propiedadesEncontradas[1] !== null ? objetoDatos[propiedadesEncontradas[1]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[1]].length)] : null,
    texto12: propiedadesEncontradas[2] !== null ? objetoDatos[propiedadesEncontradas[2]][Math.floor(Math.random() * objetoDatos[propiedadesEncontradas[2]].length)] : null,
  }));






  const sentimientosPositivos = [
    'agrado',
    'alegría',
    'amor',
    'calma',
    'certeza',
    'compasión',
    'confianza',
    'entusiasmo',
    'fuerza',
    'placer',
    'satisfacción',
    'valentia'
  ];
  const sentimientosNegativos = [
    'antipatia',
    'aversion',
    'cobardia',
    'desagrado',
    'desinteres',
    'dolor',
    'duda',
    'impiedad',
    'indignacion',
    'insatisfaccion',
    'intranquilidad',
    'ira',
    'miedo',
    'odio',
    'orgullo',
    'sorpresa',
    'tristeza'
  ];


  function verificarSentimiento(palabra) {
    if (sentimientosPositivos.includes(palabra)) {
      return palabra
    } else if (sentimientosNegativos.includes(palabra)) {
      const sentimientoPositivoAleatorio = sentimientosPositivos[Math.floor(Math.random() * sentimientosPositivos.length)];
      return sentimientoPositivoAleatorio;
    } else {
      return 'iniciativa';
    }
  }

// console.log("textos",textos.textos.sinonimos["emociones y sentimientos"])

/////////////////////////////////////////
 let primerSentimiento = dataOrdenada1[0].name.toLowerCase()
 let segundoSentimiento = dataOrdenada1[1].name.toLowerCase()
 let tercerSentimiento = dataOrdenada1[2].name.toLowerCase()
   setCambios((prevCambios) => ({
     ...prevCambios,
     dataEmocionesComunicacion: [
      {
        emociones: (
          <div className="totalizador-preocupaciones">
            <div>{verificarSentimiento(primerSentimiento).toUpperCase()}</div>
          
          </div>
        ),
      },
      {
        emociones: (
          <div className="totalizador-preocupaciones">
            <div>{verificarSentimiento(segundoSentimiento).toUpperCase()}</div>
            
          </div>
        ),
      },
      {
        emociones: (
          <div className="totalizador-preocupaciones">
            <div>{verificarSentimiento(tercerSentimiento).toUpperCase()}</div>
            
          </div>
        ),
      },
      {
        emociones: (
          <div className="totalizador-preocupaciones">
            <div>{verificarSentimiento(tercerSentimiento).toUpperCase()}</div>
            
          </div>
        ),
      },
    ],
  dataEmocionesTw:[
    {
      twitter: (
        <div className="totalizador-preocupaciones">
              <div>{dataOrdenada1[0].name.toUpperCase()}</div>
          <div>{dataOrdenada1[0].percentage.toFixed(2)}%</div>
        </div>
      ),
    },
    {
      twitter: (
        <div className="totalizador-preocupaciones">
            <div>{dataOrdenada1[1].name.toUpperCase()}</div>
          <div>{dataOrdenada1[1].percentage.toFixed(2)}%</div>
        </div>
      ),
    },
    {
      twitter: (
        <div className="totalizador-preocupaciones">
          <div>{dataOrdenada1[2].name.toUpperCase()}</div>
          <div>{dataOrdenada1[2].percentage.toFixed(2)}%</div>
        </div>
      ),
    },
  ],
}));



////////////////


///////////////
const sumaValores = datatweet.reduce((sum, item) => sum + item.value, 0);

// Calcular el porcentaje para cada objeto en datatweet
  const datosPorcentaje = datatweet.map(item => {
    const porcentaje = (item.value / sumaValores) * 100;
    return { ...item, porcentaje };
  });
  const sumaValoresAnterior = datatweetAnterior.reduce((sum, item) => sum + item.value, 0);

  // Calcular el porcentaje para cada objeto en datatweet
    const datosPorcentajeAnterior = datatweetAnterior.map(item => {
      const porcentaje = (item.value / sumaValoresAnterior) * 100;
      return { ...item, porcentaje };
    });


// console.log(datosPorcentaje);

  setCambios((prevCambios) => ({
    ...prevCambios,
  fortalezasDebilidades:[{
    text:"positivo", value: `${datosPorcentaje[0].porcentaje.toFixed(2)}%`,
  },
  {
    text:"negativo", value: `${datosPorcentaje[1].porcentaje.toFixed(2)}%`
  }],
  }));
///////////////


////////////// 
function generarArrayCategoriasImagenes(array, modelo, tweets) {
  const modeloEncontrado = array.find((item) => item.modelo === modelo);

  if (!modeloEncontrado) {
    return null;
  }

  const atributos = modeloEncontrado.categorias;
  
  const totalTweetsConDatos = tweets.filter((tweet) => tweet["Atributos de Personalidad"] && tweet["Atributos de Personalidad"].length > 0).length;

  const data = {
    name: 'root',
    children: atributos.map((atributo) => ({
      name: atributo,
      value: contarTweetsConDatosImagenes(tweets, "Atributos de Personalidad", atributo),
    })),
  };

  return {
    ...data,
    children: data.children.map((child) => ({
      ...child,
      percentage: (child.value / totalTweetsConDatos) * 100, // Calcula el porcentaje en base al total de tweets
    })),
  };
 
}




function contarTweetsConDatosImagenes(tweets, modelo, atributo) {
  return tweets.filter((tweet) => {
    return tweet[modelo] && tweet[modelo].includes(atributo);
  }).length;
}
const dataImagenesTop = generarArrayCategoriasImagenes(categoriasModelos, "Atributos%20de%20Personalidad", datosInforme)
// console.log(dataImagenesTop.children)
const dataOrdenada = dataImagenesTop.children.sort((a, b) => b.percentage - a.percentage);

//////////////////////////////////
// console.log("TEXTOS NEGATIVOS", textos.textos.atributos);
  let objetoDatos1 = textos.textos.atributos;

  const nombresBuscados1 = [dataOrdenada[0].name.toLowerCase(), dataOrdenada[1].name.toLowerCase(), dataOrdenada[2].name.toLowerCase()];
  const propiedadesEncontradas1 = [];

  for (const nombreBuscado of nombresBuscados1) {
    const propiedades = Object.keys(objetoDatos1);
    let propiedadEncontrada = null;

    for (const propiedad of propiedades) {
      const propiedadNormalizada = normalizeString(propiedad.toLowerCase());
      if (normalizeString(nombreBuscado) === propiedadNormalizada) {
        propiedadEncontrada = propiedad;
        break;
      }
    }

    propiedadesEncontradas1.push(propiedadEncontrada);
    // console.log(nombreBuscado);
  }

  setCambios((prevCambios) => ({
    ...prevCambios,
    texto13: propiedadesEncontradas1[0] !== null ? objetoDatos1[propiedadesEncontradas1[0]][Math.floor(Math.random() * objetoDatos1[propiedadesEncontradas1[0]].length)] : null,
    texto14: propiedadesEncontradas1[1] !== null ? objetoDatos1[propiedadesEncontradas1[1]][Math.floor(Math.random() * objetoDatos1[propiedadesEncontradas1[1]].length)] : null,
    texto15: propiedadesEncontradas1[2] !== null ? objetoDatos1[propiedadesEncontradas1[2]][Math.floor(Math.random() * objetoDatos1[propiedadesEncontradas1[2]].length)] : null,
  }));




///////////////////////////////////
const imagenNegativas = [
  'ANTIPATÍA',
  'INACCIÓN',
  'MEDIOCRIDAD',
  'INSENSIBILIDAD',
  'FRAGILIDAD',
  'INMORALIDAD',
  'FRIALDAD',
  'MALTRATO',
  'IGNORANCIA',
  'OCIOSIDAD',
  'PESIMISMO',
  'INEXPERIENCIA',
  'INEFICIENCIA',
  'IMPOPULAR',
  'INCOMUNICATIVO',
  'SUMISIÓN',
  'INCOHERENCIA',
  'IRRESPONSABLE'
];

const imagenesPositivas = [
  'SIMPATÍA',
  'DINAMISMO',
  'CREATIVIDAD',
  'SENSIBILIDAD',
  'FIRMEZA',
  'MORALIDAD',
  'CALIDEZ',
  'RESPETO',
  'CONOCIMIENTO',
  'LABORIOSIDAD',
  'OPTIMISMO',
  'EXPERIENCIA',
  'EFICIENCIA',
  'POPULAR',
  'COMUNICATIVO',
  'AUTORIDAD',
  'COHERENCIA',
  'RESPONSABLE'
];

function verificarImagen(palabra) {
  if (imagenesPositivas.includes(palabra)) {
    return palabra
  } else if (imagenNegativas.includes(palabra)) {
    const sentimientoPositivoAleatorio = imagenesPositivas[Math.floor(Math.random() * imagenesPositivas.length)];
    return sentimientoPositivoAleatorio;
  } else {
    return 'honestidad';
  }
}
let primeraImagen = dataOrdenada[0].name.toUpperCase()
let segundaImagen =  dataOrdenada[1].name.toUpperCase()
let terceraImagen =  dataOrdenada[2].name.toUpperCase()
// console.log("textos",verificarImagen(primeraImagen).toUpperCase())
setCambios((prevCambios) => ({
  ...prevCambios,
  dataAtributosComunicacion: [
    {
      emociones: (
        <div className="totalizador-preocupaciones">
          <div>{verificarImagen(primeraImagen).toUpperCase()}</div>
        
        </div>
      ),
    },
    {
      emociones: (
        <div className="totalizador-preocupaciones">
          <div>{verificarImagen(segundaImagen).toUpperCase()}</div>
          
        </div>
      ),
    },
    {
      emociones: (
        <div className="totalizador-preocupaciones">
          <div>{verificarImagen(terceraImagen).toUpperCase()}</div>
          
        </div>
      ),
    },
    {
      emociones: (
        <div className="totalizador-preocupaciones">
          <div>{verificarImagen("IMPOPULAR").toUpperCase()}</div>
          
        </div>
      ),
    },
  ],
dataImagenesTw:[
      {
        twitter: (
          <div className="totalizador-preocupaciones">
            <div>{dataOrdenada[0].name.toUpperCase()}</div>
            <div>{dataOrdenada[0].percentage.toFixed(2)}%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
          <div>{dataOrdenada[1].name.toUpperCase()}</div>
            <div>{dataOrdenada[1].percentage.toFixed(2)}%</div>
          </div>
        ),
      },
      {
        twitter: (
          <div className="totalizador-preocupaciones">
           <div>{dataOrdenada[2].name.toUpperCase()}</div>
            <div>{dataOrdenada[2].percentage.toFixed(2)}%</div>
          </div>
        ),
      },
    ],
  }));


  ////////////////

 
  

    ////////////////

   




// Obtener porcentajes de la categoría de mayor porcentaje en el período de análisis y el período anterior
const porcentajeActual = obtenerPorcentajeCategoriaMayorActual()
const porcentajeAnterior = obtenerPorcentajeCategoriaMayorAnterior();

// Comprobar si los porcentajes son iguales
if (porcentajeActual.porcentaje && porcentajeAnterior.porcentaje === 50) {
 
  // Si los porcentajes son iguales, la tendencia es POSITIVIDAD
  const tendencia = "POSITIVIDAD";
  // console.log("La tendencia es", tendencia);
  const estadoNuevo = `Tendencia predominante en relación al mismo período anterior:\n ${tendencia}: Actual:${porcentajeActual.porcentaje}% Anterior:${porcentajeAnterior.porcentaje}%`;
setCambios((prevCambios) => ({
  ...prevCambios,
  estado: estadoNuevo}))

} else if (porcentajeActual.predominante === porcentajeAnterior.predominante){
  const tendencia = porcentajeActual.predominante
  // console.log("La tendencia es", tendencia);
  const estadoNuevo = `Tendencia predominante en relación al mismo período anterior:\n ${tendencia}: Actual:${porcentajeActual.porcentaje}% Anterior:${porcentajeAnterior.porcentaje}%`;
setCambios((prevCambios) => ({
  ...prevCambios,
  estado: estadoNuevo}))
} else {
  // Si los porcentajes son diferentes, comparar y elegir la categoría de mayor porcentaje
  const tendencia = (porcentajeActual.porcentaje > porcentajeAnterior.porcentaje) ? porcentajeActual.predominante : porcentajeAnterior.predominante;
  const porcentaje = (porcentajeActual.porcentaje > porcentajeAnterior.porcentaje) ? porcentajeActual.porcentaje : porcentajeAnterior.porcentaje;
  // console.log("La tendencia es", tendencia);
  const estadoNuevo = `Tendencia predominante en relación al mismo período anterior:\n ${tendencia}: Actual:${porcentajeActual.porcentaje}% Anterior:${porcentajeAnterior.porcentaje}%`;
  setCambios((prevCambios) => ({
    ...prevCambios,
    estado: estadoNuevo}))
}

// Función para obtener el porcentaje de la categoría de mayor porcentaje en un período
function obtenerPorcentajeCategoriaMayorActual() {
  // Obtener porcentajes de POSITIVIDAD y NEGATIVIDAD
  const porcentajePositividad = parseInt(datosPorcentaje[0].porcentaje.toFixed(0));
  const porcentajeNegatividad = parseInt(datosPorcentaje[1].porcentaje.toFixed(0));
  const retornarPositivo = {
    predominante : "POSITIVIDAD",
    porcentaje: porcentajePositividad
  }
  const retornarNegativo = {
    predominante : "NEGATIVIDAD",
    porcentaje: porcentajeNegatividad
  }
  // Obtener la categoría de mayor porcentaje
  const categoriaMayor = (porcentajePositividad > porcentajeNegatividad) ? retornarPositivo : retornarNegativo;
 
  // Retornar porcentaje de la categoría de mayor porcentaje
  return categoriaMayor;
}

// Función para obtener el porcentaje de la categoría de mayor porcentaje en un período
function obtenerPorcentajeCategoriaMayorAnterior() {
  // Obtener porcentajes de POSITIVIDAD y NEGATIVIDAD
  const porcentajePositividad = parseInt(datosPorcentajeAnterior[0].porcentaje.toFixed(0));
  const porcentajeNegatividad = parseInt(datosPorcentajeAnterior[1].porcentaje.toFixed(0));

  const retornarPositivo = {
    predominante : "POSITIVIDAD",
    porcentaje: porcentajePositividad
  }
  const retornarNegativo = {
    predominante : "NEGATIVIDAD",
    porcentaje: porcentajeNegatividad
  }
  // Obtener la categoría de mayor porcentaje
  const categoriaMayor = (porcentajePositividad > porcentajeNegatividad) ? retornarPositivo : retornarNegativo;
 
  // Retornar porcentaje de la categoría de mayor porcentaje
  return categoriaMayor;
}




if(propiedadesEncontradas.length > 0 && propiedadesEncontradas1.length >0){
let colorPalabras = tweetPredominante.type === "Negativo" ? "red" : "green"
// console.log("ERROR",propiedadesEncontradas[0])
const propiedades = Object.keys(textos.textos.sinonimos["emociones y sentimientos"]);
const arrayPropiedades = [];
  propiedades.forEach(propiedad => {
    arrayPropiedades.push(propiedad);
  });
  if (arrayPropiedades.includes(propiedadesEncontradas1[0])) {
    // console.log("El elemento existe en arrayPropiedades.");
  } else {
    // console.log("El elemento no existe en arrayPropiedades.");
  }



  function obtenerColor(palabraPrincipal) {
    const atributosNegativos = [
      "temor", "terror", "alarma", "susto", "desconfianza", "cobardía", "pánico", "fobia", "inseguridad", "espanto",
      "asombro", "susto", "desconcierto", "confusión", "desorientación", "trastorno", "inquietud", "nerviosismo", "intranquilidad", "ansiedad",
      "pena", "amargura", "desdicha", "nostalgia", "angustia", "depresión", "desaliento", "pesimismo", "pesadumbre", "aflicción",
      "rechazo", "repulsión", "hostilidad", "odio", "oposición", "rencor", "rabia", "resentimiento", "distancia", "disconformidad",
      "rabia", "enojo", "cólera", "furia", "indignación", "irritación", "exasperación", "malhumor", "odio", "disgusto",
      "disgusto", "descontento", "fastidio", "enfado", "enojo", "incomodidad", "irritación", "molestia", "rechazo", "asco", "repugnancia", "repulsión",
      "ira", "enfado", "irritación", "enojo", "cabreo", "rabia", "furia", "cólera", "disgusto", "exasperación",
      "miedo", "temor", "timidez", "amilanamiento", "acobardamiento", "apocamiento", "pusilanamidad", "cortedad", "desconfianza", "pavor",
      "descontento", "disgusto", "infelicidad", "desdicha", "desagrado", "inconformidad", "enfado", "malestar", "decepción",
      "indiferencia", "apatía", "abandono", "desgano", "abulia", "dejadez", "hastío", "tedio", "desapego", "despreocupación",
      "fragilidad", "cansancio", "decaimiento", "debilitamiento", "endeblez", "desnutrición", "desfallecimiento", "agotamiento", "flojedad", "desvanecimiento",
      "inquietud", "excitación", "preocupación", "alarma", "desasosiego", "nerviosismo", "turbación", "angustia", "desazón", "tormento",
      "desconfianza", "incertidumbre", "indecisión", "perplejidad", "titubeo", "vacilación", "problema", "cuestión", "reparo", "sospecha", "recelo", "suspicacia", "temor",
      "irreligiosidad", "irreverencia", "incredulidad", "agnosticismo", "ateísmo", "inflexibilidad", "dureza", "crueldad", "maldad", "perversidad",
      "rencor", "aversión", "aborrecimiento", "animadversión", "abominación", "antipatía", "tirria", "repulsión", "desprecio", "fobia", "saña", "rabia",
      "animadversión", "animosidad", "aversión", "desagrado", "enemistad", "envidia", "hostilidad", "rencor", "repugnancia", "repulsión", "hincha", "manía", "odio", "resentimiento",
      "desconsuelo", "mal", "pesar", "suplicio", "tortura", "aflicción", "angustia", "congoja", "daño", "pena", "tormento", "calvario",
      "desafecto", "aversión", "tirria", "desafección", "repugnancia", "repulsión", "rencor", "desestimación", "aborrecimiento", "animosidad", "manía", "odio", "resentimiento",
      "inactividad", "desocupación", "inercia", "apatía", "inoperancia", "inmovilidad", "estancamiento", "pasividad", "carencia", "flojedad",
      "vulgaridad", "mezquindad", "deficiencia", "pobreza", "defectuosidad", "ordinario", "inferioridad", "trivialidad", "bizarro", "grosería",
      "impasibilidad", "inconsciencia", "abulia", "apatía", "indolencia", "crueldad", "indiferencia", "letargo", "entumecimiento", "lejano",
      "debilidad", "inconsistencia", "flojedad", "inseguridad", "endeblez", "precariedad", "vulnerabilidad", "inestabilidad", "agotamiento", "desfallecimiento",
      "indecencia", "deshonestidad", "iniquidad", "injusticia", "corrupción", "perversidad", "sordidez", "impudicia", "insolencia", "falsedad",
      "indiferencia", "desafecto", "desapego", "desinterés", "apatía", "impasibilidad", "aplomo", "inhumano", "insensibilidad", "desdén",
      "ofensa", "agravio", "vejación", "atropello", "ofensa", "injuria", "humillación", "daño", "perjuicio", "ultraje",
      "incapacidad", "insuficiencia", "ineptitud", "incompetencia", "necedad", "desconocimiento", "analfabetismo", "torpeza", "inepcia", "inhabilidad",
      "vagancia", "pereza", "inactividad", "holgazaneria", "granduleria", "desidia", "apatía", "letargo", "indolencia", "haraganería",
      "desmoralización", "desesperanza", "desilusión", "decepción", "desánimo", "tristeza", "fatalismo", "derrotismo", "desesperación", "apatía",
      "impericia", "inhabilidad", "incompetencia", "ineptitud", "insuficiencia", "incapacidad", "ignorancia", "torpeza", "inutilidad", "incomprensión",
      "ineficacia", "inoperancia", "incompetencia", "deficiencia", "insuficiencia", "fracaso", "incapacidad", "inacción", "inutilidad", "ineptitud",
      "desconocido", "lejano", "antipático", "desprestigiado", "torpe", "odiado", "despreciado", "desagradable", "distante", "descomprometido",
      "aislado", "apartado", "solitario", "separado", "retraído", "introvertido", "retirado", "inaccesible", "desconfiado", "encerrado",
      "acatamiento", "obediencia", "dependencia", "servilismo", "supeditación", "rendimiento", "sometimiento", "subordinación",
      "incongruencia", "inconsecuencia", "barbaridad", "anacronismo", "contradictorio", "absurdo", "ilógico", "desatinado", "delirante", "disparate",
      "imprudente", "inconsciente", "insensato", "informal", "irreflexivo", "temerario", "negligente", "incumplidor", "inconstante", "indolente"
    ];
    
  
  
    if (atributosNegativos.includes(palabraPrincipal.toLowerCase())) {
      // Si está en la lista, asignar color rojo
      return "red"; // Código de color rojo en formato hexadecimal
    } else {
      // Si no está en la lista, asignar otro color o no hacer nada
      return "green"; // Por defecto, se asigna el color negro (#000000) si no está en la lista
    }
  }

  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[0]], palabrasSeleccionadasAtributos)
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[0]], palabrasSeleccionadasAtributos)
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[0]], palabrasSeleccionadasAtributos)
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[0]], palabrasSeleccionadas)  
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[0]], palabrasSeleccionadas)  
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[0]], palabrasSeleccionadas)  
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[0]], palabrasSeleccionadas)  
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[1]], palabrasSeleccionadasAtributos) 
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[1]], palabrasSeleccionadasAtributos) 
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[1]], palabrasSeleccionadasAtributos) 
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[1]], palabrasSeleccionadasAtributos) 
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[1]], palabrasSeleccionadas) 
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[1]], palabrasSeleccionadas) 
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[1]], palabrasSeleccionadas) 
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[1]], palabrasSeleccionadas) 
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[2]], palabrasSeleccionadasAtributos)
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[2]], palabrasSeleccionadasAtributos)
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[2]], palabrasSeleccionadasAtributos)
  obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[2]], palabrasSeleccionadasAtributos)
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[2]], palabrasSeleccionadas)
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[2]], palabrasSeleccionadas)
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[2]], palabrasSeleccionadas)
  obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[2]], palabrasSeleccionadas)

setCambios((prevCambios) => ({
...prevCambios,
mapaPercepciones:[
  { text: propiedadesEncontradas1?.[0] || "anticipación", value: 80, color: colorPalabras },
    { text: propiedadesEncontradas1?.[1] || "insensibilidad", value: 50, color: colorPalabras },
    { text: propiedadesEncontradas1?.[2] || "decisión", value: 30, color: colorPalabras },
    { text: propiedadesEncontradas?.[0] || "valor", value: 80, color: colorPalabras },
    { text: propiedadesEncontradas?.[1] || "mejora", value: 50, color: colorPalabras },
    { text: propiedadesEncontradas?.[2] || "optimismo", value: 30, color: colorPalabras },
  { text: palabrasSeleccionadasAtributos[0], value: 80, color:obtenerColor(palabrasSeleccionadasAtributos[0]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[1], value: 80, color:obtenerColor(palabrasSeleccionadasAtributos[1]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[2], value: 80, color:obtenerColor(palabrasSeleccionadasAtributos[2]).toLowerCase() },
  { text: palabrasSeleccionadas[0], value: 80, color:obtenerColor(palabrasSeleccionadas[0]).toLowerCase() },
  { text: palabrasSeleccionadas[1], value: 80, color:obtenerColor(palabrasSeleccionadas[1]).toLowerCase() },
  { text: palabrasSeleccionadas[2], value: 80, color:obtenerColor(palabrasSeleccionadas[2]).toLowerCase() },
  { text: palabrasSeleccionadas[3], value: 80, color:obtenerColor(palabrasSeleccionadas[3]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[3], value: 50, color:obtenerColor(palabrasSeleccionadasAtributos[3]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[4], value: 50, color:obtenerColor(palabrasSeleccionadasAtributos[4]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[5], value: 50, color:obtenerColor(palabrasSeleccionadasAtributos[5]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[6], value: 50, color:obtenerColor(palabrasSeleccionadasAtributos[6]).toLowerCase() },
  { text: palabrasSeleccionadas[4], value: 50, color:obtenerColor(palabrasSeleccionadas[4]).toLowerCase() },
  { text: palabrasSeleccionadas[5], value: 50, color:obtenerColor(palabrasSeleccionadas[5]).toLowerCase() },
  { text: palabrasSeleccionadas[6], value: 50, color:obtenerColor(palabrasSeleccionadas[6]).toLowerCase() },
  { text: palabrasSeleccionadas[7], value: 50, color:obtenerColor(palabrasSeleccionadas[7]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[7], value: 50, color:obtenerColor(palabrasSeleccionadasAtributos[7]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[8], value: 50, color:obtenerColor(palabrasSeleccionadasAtributos[8]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[9], value: 50, color:obtenerColor(palabrasSeleccionadasAtributos[9]).toLowerCase() },
  { text: palabrasSeleccionadasAtributos[10], value: 50, color:obtenerColor(palabrasSeleccionadasAtributos[10]).toLowerCase() },
  { text: palabrasSeleccionadas[8], value: 50, color:obtenerColor(palabrasSeleccionadas[8]).toLowerCase() },
  { text: palabrasSeleccionadas[9], value: 50, color:obtenerColor(palabrasSeleccionadas[9]).toLowerCase() },
  { text: palabrasSeleccionadas[10], value: 50, color:obtenerColor(palabrasSeleccionadas[10]).toLowerCase() },
  { text: palabrasSeleccionadas[11], value: 50, color:obtenerColor(palabrasSeleccionadas[11]).toLowerCase() },
  // { text: obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[2]], palabrasSeleccionadasAtributos) || "aislado", value: 50, color:obtenerColor(propiedadesEncontradas1[2]).toLowerCase() },
  // { text: obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[2]], palabrasSeleccionadasAtributos) || "Dicha", value: 50, color:obtenerColor(propiedadesEncontradas1[2]).toLowerCase()},
  // { text: obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[2]], palabrasSeleccionadasAtributos) || "disgusto", value: 50, color:obtenerColor(propiedadesEncontradas1[2]).toLowerCase()},
  // { text: obtenerPalabraSinRepetirAtributos(textos.textos.sinonimos.atributos[propiedadesEncontradas1?.[2]], palabrasSeleccionadasAtributos) || "regocijo", value: 50, color:obtenerColor(propiedadesEncontradas1[2]).toLowerCase()},
  // { text: obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[2]], palabrasSeleccionadas) || "emoción", value: 50, color:obtenerColor(propiedadesEncontradas[2]).toLowerCase() },
  // { text: obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[2]], palabrasSeleccionadas) || "Poder", value: 50, color:obtenerColor(propiedadesEncontradas[2]).toLowerCase() },
  // { text: obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[2]], palabrasSeleccionadas) || "Debilidad", value: 50, color:obtenerColor(propiedadesEncontradas[2]).toLowerCase() },
  // { text: obtenerPalabraSinRepetir(textos.textos.sinonimos["emociones y sentimientos"][propiedadesEncontradas?.[2]], palabrasSeleccionadas) || "Incapacidad", value: 50, color:obtenerColor(propiedadesEncontradas[2]).toLowerCase() },
],

dataInner: [
  { name: "Positivo", value: parseInt(datosPorcentaje[0].porcentaje.toFixed(0)), fill: "#53b253bd" },
  { name: "Negativo", value: parseInt(datosPorcentaje[1].porcentaje.toFixed(0)), fill: "#ff4c4cd7"},
  // Agrega aquí los demás objetos o actualiza los existentes según tus necesidades
],
dataOuter: [
  { name: "Positivo", value: parseInt(datosPorcentajeAnterior[0].porcentaje.toFixed(0)), fill:"#53b253bd" },
  { name: "Negativo", value: parseInt(datosPorcentajeAnterior[1].porcentaje.toFixed(0)), fill:"#ff4c4cd7"},
  // Agrega aquí los demás objetos o actualiza los existentes según tus necesidades
],
}))
}

console.log(palabrasSeleccionadasAtributos[0].toLowerCase())

setCambios((prevCambios) => ({
  ...prevCambios,
    dataInner: [
    { name: "Positivo", value: parseInt(datosPorcentaje[0].porcentaje.toFixed(0)), fill: "#53b253bd" },
    { name: "Negativo", value: parseInt(datosPorcentaje[1].porcentaje.toFixed(0)), fill: "#ff4c4cd7"},
    // Agrega aquí los demás objetos o actualiza los existentes según tus necesidades
  ],
  dataOuter: [
    { name: "Positivo", value: parseInt(datosPorcentajeAnterior[0].porcentaje.toFixed(0)), fill:"#53b253bd" },
    { name: "Negativo", value: parseInt(datosPorcentajeAnterior[1].porcentaje.toFixed(0)), fill:"#ff4c4cd7"},
    // Agrega aquí los demás objetos o actualiza los existentes según tus necesidades
  ],
  }))




},[datosInforme, datosInformeAnterior])

// { text: "anticipación", value: 20, color:"#53b253bd" },
// { text: "decisión", value: 20, color:"#53b253bd" },
// { text: "mejora", value: 15, color:"#53b253bd" },
// { text: "optimismo", value: 12, color:"#53b253bd" },
// { text: "euforia", value: 25, color:"#53b253bd" },
// { text: "consciente", value: 45, color:"#53b253bd" },
// { text: "bienestar", value: 36, color:"#53b253bd" },
// { text: "eficiencia", value: 20, color:"#53b253bd" },
// { text: "experto", value: 57, color:"#53b253bd" },
// { text: "laboriosidad", value: 57, color:"#53b253bd" },
// { text: "conocimiento", value: 57, color:"#53b253bd" },
// { text: "educación", value: 57, color:"#53b253bd" },
// { text: "confianza", value: 21, color:"#53b253bd" },

function sugerencias(){

  if(cambios.dataPreocupacionesTw[0]?.twitter?.props?.children?.[0]?.props?.children){

    const preocupaciones = Object.keys(textos.textos.recomendaciones.preocupacion);

  // Generar un número aleatorio para seleccionar una propiedad al azar
  const indicePreocupacionAleatoria = Math.floor(Math.random() * preocupaciones.length);
  const preocupacionAleatoria = preocupaciones[indicePreocupacionAleatoria];
    let preocupacion1 = cambios.dataPreocupacionesTw[0]?.twitter?.props?.children?.[0]?.props?.children;
    let preocupacion1LowerCase = preocupacion1?.toLowerCase();
  
    let preocupacion2 = cambios.dataPreocupacionesTw[1]?.twitter?.props?.children?.[0]?.props?.children;
    let preocupacion2toLowerCase = preocupacion2?.toLowerCase();
  
    // Verificar si las preocupaciones y textos correspondientes existen
    if (preocupacion1LowerCase && preocupacion2toLowerCase) {
      // Obtener el objeto de texto correspondiente a la preocupación seleccionada
      const textoPreocupacion = textos.textos.recomendaciones.preocupacion[preocupacion1LowerCase]?.texto;
      const textoPreocupacion2 = textos.textos.recomendaciones.preocupacion[preocupacion2toLowerCase]?.texto;
      const terminoPreocupacion =textos.textos.recomendaciones.preocupacion[preocupacion1LowerCase]?.terminos
      const terminoPreocupacion2 =textos.textos.recomendaciones.preocupacion[preocupacion2toLowerCase]?.terminos
      // Verificar si los textos existen y no están vacíos
      if (textoPreocupacion && textoPreocupacion2 && textoPreocupacion.length > 0 && textoPreocupacion2.length > 0) {
        // Generar un número aleatorio para seleccionar un índice del array de texto al azar
        const indiceTextoAleatorio = Math.floor(Math.random() * textoPreocupacion.length);
  
        // Obtener el texto seleccionado
        const textoSeleccionado = textoPreocupacion[indiceTextoAleatorio];
        const textoSeleccionado2 = textoPreocupacion2[indiceTextoAleatorio];
        const terminosSeleccionados1 = terminoPreocupacion[indiceTextoAleatorio]
        const terminosSeleccionados2 = terminoPreocupacion2[indiceTextoAleatorio]



        setCambios((prevCambios) => ({
          ...prevCambios,
          sugerencia1: textoSeleccionado,
          sugerencia2: textoSeleccionado2,
          terminos1:terminosSeleccionados1,
          terminos2:terminosSeleccionados2,
             }));
      } else {
        
        // console.log("No se encontraron textos para la preocupación:", preocupacionAleatoria);
        // Puedes manejar esta situación de acuerdo a tus necesidades, como asignar un valor por defecto o mostrar un mensaje de error.
      }    
    } else {
      // console.log("No se encontraron preocupaciones");
      // Puedes manejar esta situación de acuerdo a tus necesidades, como asignar un valor por defecto o mostrar un mensaje de error.
    }
  }
    
}


useEffect(()=>{

setCambios((prevCambios) => ({
  ...prevCambios,
  palabrasRecomendadas:[
    { text: obtenerPalabraSinRepetir(), value: 30 },
    { text: obtenerPalabraSinRepetir(), value: 30 },
    { text: obtenerPalabraSinRepetir(), value: 30 },
    { text: obtenerPalabraSinRepetir(), value: 30 },
    { text: obtenerPalabraSinRepetir(), value: 30 },
    { text: obtenerPalabraSinRepetir(), value: 30 }
  ],
}));
},[])





useEffect(()=>{
  sugerencias()
},[cambios.dataPreocupacionesTw])







//////////////////////////////////////


  return (
    <Fragment>
      <Collapse className="contenedor-botones">
      
        <Panel /* header="Botones" */ key="1">
          <Space direction="vertical" >
            <div>
              <Tooltip title='Dashboard'>
              <Link to="#" onClick={() => navigate(-1)}>
              <Button style={{ marginRight: '1rem' }} type="primary" shape="circle" className="subtitulo-boton">
                <IoChevronBackOutline />
              </Button>
            </Link>
              </Tooltip>
            <Button  style={{marginRight:'1rem'}} onClick={() => setOpen(true)}>
              Pasos
            </Button>
            <Button style={{marginRight:'1rem'}} onClick={editar} ref={ref2}>{editable.general ? 'Dejar de Editar' : 'Editar'}  </Button>
            <Button type="primary" onClick={descargarPDF} className="subtitulo-boton" ref={ref1}>Descargar PDF</Button>
            {/* <Button type="primary" onClick={()=>(console.log(token))}  ref={ref1}>Token</Button> */}
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} 
             locale={customLocale}/>
            </div>
          </Space>
        </Panel>
      </Collapse>
      <div className="contenedor-margin">
      <div className="contenedor" id="contenedor">
       
        {/*DIAPOSITIVA INICIO*/}
        <div style={{ display: cambios.diapositivaInicial.display ? "flex" : "none", flexDirection:'column'}}>
          
        <div className="contenedor-extremo" >
          {/*Nav*/}
         <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            {/* {editable.general && <Button onClick={()=>handleDisplay('diapositivaInicial')}>X</Button>} */}
        
            <img src={logo} className="img" alt="logo"></img>
          </div>

          {/*Titulo*/}
          <div>
          {editable.diapositiva1 ? (
              <Input
              style={{ width: '500px' , height:'70px'}}
                type="text"
                name="cliente"
                value={cambios.cliente}
                onChange={handleChange}
                className="titulo"
              />
            ) : (
              <div className="titulo">{cambios.cliente}</div>
            )}
        {editable.diapositiva1 ? (
                 <p className="subtitulo-principal">
                  <Input
              style={{ width: '1000px' , height:'20px', paddingTop:'0.8rem'}}
              type="text"
              name="subtitulo"
              value={cambios.subtitulo}
              onChange={handleChange}
              className="subtitulo-editar"
              />
               </p>
                            
                   
            ) : (
            <p className="subtitulo-principal">
              {cambios.subtitulo}
            </p>
            )} 
            
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo0">MONITOREO Y ANÁLISIS DE:</div>

          {editable.general 
          ? 
          <>
          <Button type="primary" onClick={()=>showModalTorta('dataDatos')} disabled={!editable.diapositiva1}>Editar</Button>
          <Modal
                title="Análisis de redes sociales"
                open={modals.dataDatos}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="datos">
                
                {/* <div className="img-red"><img className="fb" src={fb} alt="logo"></img> <Button onClick={()=>eliminarGrafico('displayTotalFacebook')} >x</Button></div> */}
                {/* <div className="img-red"><img className="noticias" src={noticias} alt="logo"></img> <Button onClick={()=>eliminarGrafico('displayTotalMedios')}>x</Button></div>  */}
             <div className="img-red"><img className="tw" src={tw} alt="logo"></img> <Button onClick={()=>eliminarGrafico('displayTotalTwitter')}>x</Button></div>
              </div>
              </Modal>
        
                {/* <img className="fb" src={fb} alt="logo" style={{display:cambios.displayFacebookIcon}}></img> */}
                {/* <img className="noticias" src={noticias} alt="logo" style={{display:cambios.displayMediosIcon}}></img> */}
                 <img className="tw" src={tw} alt="logo" style={{display:cambios.displayTwitterIcon}}></img> 
          </> 
          :
          <>
         {/* <img className="fb" src={fb} alt="logo" style={{display:cambios.displayFacebookIcon}}></img> */}
                {/* <img className="noticias" src={noticias} alt="logo" style={{display:cambios.displayMediosIcon}}></img> */}
                <img className="tw" src={tw} alt="logo" style={{display:cambios.displayTwitterIcon}}></img>
          </>  }
         |
          <div className="titulo1">PERíODO</div>
          <div className="cuerpo">
            <div className="titulo1">
              <AiOutlineClockCircle />
            </div>
            {editable.diapositiva1 ? (
                            
              <Input
              style={{ width: '450px' , height:'20px', paddingTop:'0.8rem'}}
              type="text"
              name="fecha"
              value={cambios.fecha}
              onChange={handleChange}
              className="subtitulo-editar"
              />
                        
              ) : (
            <div className="titulo1">
           {cambios.fecha}
            </div>
            )}
      
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <CiVolumeHigh />
          </div>

          <div className="titulo2">PUBLICACIONES </div>
        </div>
        <Tag className="tag">
          Eventos analizados y su comparación con el mismo período anterior
        </Tag>

        <div className="cuerpo" style={{ marginTop: "15px" }}>
          <div className="titulo1" style={{ color: "#0083CA" }}>
            <BsFillDashCircleFill />{" "}
          </div>
          <div className="titulo1">TOTAL (VOLUMEN DE PUBLICACIONES)</div>
        </div>

        <div className="graficos-cuerpo">
        {editable.diapositiva1 ? ( 
        <div className="graficoInforme" >
            <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataGraficoTotal')} disabled={!editable.diapositiva1}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones"
                open={modals.dataGraficoTotal}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Actual</div>
                <InputNumber 
                value={cambios.data2.series[0].data[0]} 
                name='datafb'  
                onChange={(value) => handleInputNumberChangetotal1(value)}
              ></InputNumber>
               
                <div>Período Anterior</div>
                <InputNumber 
                value={cambios.data2.series[1].data[0]} 
                name='datafb'  
                onChange={(value) => handleInputNumberChangetotal2(value)}
              ></InputNumber>
                
              </div>
              </Modal>
            </>
            <div id="totalVolumenPublicaciones"style={{display:cambios.displayTotalVolumen}} >
            <ReactApexChart
              options={cambios.data2.options}
              series={cambios.data2.series}
              type="bar"
              height={150}
              width={250}
            />
            <Button onClick={()=>eliminarGrafico('displayTotalVolumen')}>x</Button>
            </div>
            {cambios.displayTotalVolumen === 'none' && editable.diapositiva1 === true 
            ? <Button id="mostrarGrafico" style={{display:'flex'}} onClick={()=>mostrarGrafico('displayTotalVolumen')}>+</Button> 
            : <Button id="mostrarGrafico" style={{display:'none'}} onClick={()=>mostrarGrafico('displayTotalVolumen')}>+</Button> 
            }  
          </div>
          ) : (
          <div style={{display:cambios.displayTotalVolumen, gap:'5rem', height:'250px'}}>
            <ReactApexChart
              options={cambios.data2.options}
              series={cambios.data2.series}
              type="bar"
              height={150}
              width={300}
            />
         {(cambios.displayTotalFacebook === 'flex' || cambios.displayTotalTwitter === 'flex') && <hr/>}

         
          </div>
                 
           )} 
          
          <div className="periodosfbtw">
          {/* {editable.diapositiva1 ? ( 
            
          <div className="editarfacebook facebook-grafico-bar">
             <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataGraficoFb')} disabled={!editable.diapositiva1}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones - Facebook"
                open={modals.dataGraficoFb}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Actual</div>
                <InputNumber 
                value={cambios.datafb.series[0].data[0]} 
                name='datafb'  
                onChange={(value) => handleInputNumberChangeFb1(value)}
              ></InputNumber>
               
                <div>Período Anterior</div>
                <InputNumber 
                value={cambios.datafb.series[1].data[0]} 
                name='datafb'  
                onChange={(value) => handleInputNumberChangeFb2(value)}
              ></InputNumber>
                
              </div>
              </Modal>
            </>
          <div style={{display:cambios.displayTotalFacebook, flexDirection:'column'}}>
          <div className="icon-nombre" >
            <img className="fb" src={fb} alt="logo"/>
            FACEBOOK
          </div>
          <div style={{display:'flex'}}>
          <ReactApexChart
            options={cambios.datafb.options}
            series={cambios.datafb.series}
            type="bar"
            height={250}
            width={150}
          />
          <Button onClick={()=>eliminarGrafico('displayTotalFacebook')}>x</Button>
          </div>
          </div>
            {cambios.displayTotalFacebook === 'none' && editable.diapositiva1 === true 
            ? <Button id="mostrarGrafico" style={{display:'flex'}} onClick={()=>mostrarGrafico('displayTotalFacebook')}>+</Button> 
            : <Button id="mostrarGrafico" style={{display:'none'}} onClick={()=>mostrarGrafico('displayTotalFacebook')}>+</Button> 
            }  
        
          
             
            </div>
          ) : (
          <div className="facebook-grafico-bar">
            <div style={{display:cambios.displayTotalFacebook, flexDirection:'column'}} >
          <div className="icon-nombre">
            <img className="fb" src={fb} alt="logo" />
            FACEBOOK
          </div>
          <div style={{display:'flex'}}>
          <ReactApexChart
            options={cambios.datafb.options}
            series={cambios.datafb.series}
            type="bar"
            height={250}
            width={150}
          />
            </div>
          </div>
        </div>
                 
           )} */}


        {/* {editable.diapositiva1 ? ( 
          <div className="editarfacebook twitter-grafico-bar">
          <div style={{display:cambios.displayTotalMedios, flexDirection:'column'}}>
          <div className="icon-nombre">
              <img className="noticias" src={noticias} alt="logo"/>
              MEDIOS
            </div>
            <div style={{display:'flex'}}>
            <ReactApexChart
              options={dataMedios.options}
              series={dataMedios.series}
              type="bar"
              height={250}
              width={150}
            />
          <Button onClick={()=>eliminarGrafico('displayTotalMedios')}>x</Button>
          </div>
          </div>
            {cambios.displayTotalMedios === 'none' && editable.diapositiva1 === true 
            ? <Button id="mostrarGrafico" style={{display:'flex'}} onClick={()=>mostrarGrafico('displayTotalMedios')}>+</Button> 
            : <Button id="mostrarGrafico" style={{display:'none'}} onClick={()=>mostrarGrafico('displayTotalMedios')}>+</Button> 
            }  
          </div>
          ) : (
            <div className="twitter-grafico-bar" style={{display:cambios.displayTotalMedios}}>
            <div className="icon-nombre">
              <img className="noticias" src={noticias} alt="logo"/>
              MEDIOS
            </div>
         
            <ReactApexChart
              options={dataMedios.options}
              series={dataMedios.series}
              type="bar"
              height={250}
              width={150}
            />
         
          </div>
                 
           )}   */}




         {editable.diapositiva1 ? ( 
          <div className="editarfacebook twitter-grafico-bar">
          <div style={{display:cambios.displayTotalTwitter, flexDirection:'column'}}>
          <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataGraficoTw')} disabled={!editable.diapositiva1}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones - Facebook"
                open={modals.dataGraficoTw}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Actual</div>
                <InputNumber 
                value={cambios.datatw.series[0].data[0]} 
                name='datatw'  
                onChange={(value) => handleInputNumberChangeTw1(value)}
              ></InputNumber>
               
                <div>Período Anterior</div>
                <InputNumber 
                value={cambios.datatw.series[1].data[0]} 
                name='datatw'  
                onChange={(value) => handleInputNumberChangeTw2(value)}
              ></InputNumber>
                
              </div>
              </Modal>
            </>
            <div className="icon-nombre">
              <img className="tw" src={tw} alt="logo"/>
              TWITTER
            </div>
            <div style={{display:'flex'}}>
            <ReactApexChart
              options={cambios.datatw.options}
              series={cambios.datatw.series}
              type="bar"
              height={250}
              width={150}
            />
          <Button onClick={()=>eliminarGrafico('displayTotalTwitter')}>x</Button>
          </div>
          </div>
            {cambios.displayTotalTwitter === 'none' && editable.diapositiva1 === true 
            ? <Button id="mostrarGrafico" style={{display:'flex'}} onClick={()=>mostrarGrafico('displayTotalTwitter')}>+</Button> 
            : <Button id="mostrarGrafico" style={{display:'none'}} onClick={()=>mostrarGrafico('displayTotalTwitter')}>+</Button> 
            }  
          </div>
          ) : (
            <div className="twitter-grafico-bar" style={{display:cambios.displayTotalTwitter}}>
            <div className="icon-nombre">
              <img className="tw" src={tw} alt="logo"/>
              TWITTER
            </div>
         
            <ReactApexChart
              options={cambios.datatw.options}
              series={cambios.datatw.series}
              type="bar"
              height={250}
              width={150}
            />
         
          </div>
                 
           )}  


            
      
          </div>
        </div>

        <div className="totalizador-1">
          <div className="contenedor-totales">
            <div className="box">
            {editable.diapositiva1 ? (
              <Input
              style={{ width: '70px' , height:'70px'}}
                type="text"
                name="valor1"
                value={cambios.valor1}
                onChange={handleChange}
                className="numeros frases-total"
              />
            ) : (
              <div className="numeros frases-total">{cambios.valor1}</div>
            )}
            
              <div className="frase">
                <div className="frases-total">PUBLICACIONES</div>
                <div className="frases-total">TOTALES</div>
              </div>
              <hr />
            </div>

            <div className="box">
            {editable.diapositiva1  ? (
              <Input
              style={{ width: '70px' , height:'70px'}}
                type="text"
                name="valor2"
                value={cambios.valor2}
                onChange={handleChange}
                className="numeros frases-total"
              />
            ) : (
              <div className="numeros frases-total">{cambios.valor2}</div>
            )}
      
              <div className="frase">
                <div className="frases-total">POR HORA </div>
                <div className="frases-total">TOTALES PROMEDIO</div>
              </div>
              <hr />
            </div>

            <div className="box">
            {editable.diapositiva1  ? (
              <Input
              style={{ width: '70px' , height:'70px'}}
                type="text"
                name="valor3"
                value={cambios.valor3}
                onChange={handleChange}
                className="numeros frases-total"
              />
            ) : (
              <div className="numeros frases-total">{cambios.valor3}</div>
            )}
           
              <div className="frase">
                <div className="frases-total">PICO MÁXIMO </div>
                <div className="frases-total">DE PUBLICACIONES</div>
              </div>
            </div>
          </div>

          <div className="contenedor-totales">
            <div className="box">   
            {editable.diapositiva1 ? (
              <Input
              style={{ width: '300px' , height:'70px'}}
                type="text"
                name="valor4"
                value={cambios.valor4}
                onChange={handleChange}
                className="numeros frases-total"
              />
            ) : (
              <div className="numeros frases-total">{cambios.valor4}</div>
            )}
              <div className="frase">
                <div className="frases-total">TENDENCIA </div>
                <div className="frases-total">DE PUBLICACIONES</div>
              </div>
              <hr />
            </div>

            <div className="box">
            {editable.diapositiva1 ? (
              <Input
              style={{ width: '70px' , height:'70px'}}
                type="text"
                name="valor5"
                value={cambios.valor5}
                onChange={handleChange}
                className="numeros frases-total"
              />
            ) : (
              <div className="numeros frases-total">{cambios.valor5}</div>
            )}
              <div className="frase">
                <div className="frases-total">HORA CON MAYORES</div>
                <div className="frases-total">PUBLICACIONES</div>
              </div>
            </div>
          </div>
        </div>
        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <div ref={ref3}>
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva1')} disabled={editable.diapositiva1}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva1')} disabled={!editable.diapositiva1}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva1','showModal1')} disabled={!editable.diapositiva1}>Descartar cambios</Button>
          </div>
          <Modal
          open={modals.showModal1}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva1: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('displayTotalVolumen')
            resetValues('fecha')
            resetValues('displayTotalFacebook')
            resetValues('displayTotalTwitter')
            resetValues('displayTotalMedios')
            resetValues("cliente") 
            resetValues("valor1") 
            resetValues("valor2") 
            resetValues("valor3") 
            resetValues("valor4") 
            resetValues("valor5") 
            setShowModal((prevState) => ({
              ...prevState,
              showModal1: false // Cambiar la diapositiva correspondiente a false
            }));
          }}
          onCancel={() => setShowModal((prevState) => ({
            ...prevState,
            showModal1: false // Cambiar la diapositiva correspondiente a false
          }))}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}
        </div>
        {/*FIN DIAPOSITIVA INICIO*/}
        {/*DIAPOSITIVA 1*/}
        <Tooltip title="Agregar diapositiva IMPACTO">
        {editable.general && !cambios.diapositiva1.display && <Button onClick={()=>handleDisplay('diapositiva1')} shape="circle">+</Button>}
        </Tooltip>

        {cambios.diapositiva1.display !== "none" &&
        <div class={cambios.diapositiva1.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva1.display ? "flex" : "none", flexDirection:'column'}}>
          
        {/*Nav*/}
        <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
       
            <Tooltip title="Eliminar diapositiva">
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva1')} shape="circle">X</Button>}
            </Tooltip>
            <img src={logo} className="img" alt="logo"></img>
          </div> 
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <TbTargetArrow />
          </div>

          <div className="titulo2">IMPACTO</div>
        </div>
        <Tag className="tag">
          Polaridad y su comparación con el mismo período anterior (excluye
          neutralidad)
        </Tag>

        <div className="cuerpo" style={{ marginTop: "15px" }}>
          <div className="titulo1" style={{ color: "#0083CA" }}>
            <BsFillDashCircleFill />{" "}
          </div>
          <div className="titulo1">TOTAL (VOLUMEN DE PUBLICACIONES)</div>
        </div>

        <div className="contenedor-pie-texto">
          <div className="pie">
            {editable.general === true ? 
            <div>
              <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataTorta')} disabled={!editable.diapositiva2}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones"
                open={modals.dataTorta}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Anterior</div>
                <InputNumber value={cambios.dataOuter[0].value} name='dataOuter0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, true, value,'dataOuter')}></InputNumber>
                <InputNumber value={cambios.dataOuter[1].value} name='dataOuter1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, true, value,'dataOuter')}></InputNumber>
                <div>Período Actual</div>
                <InputNumber value={cambios.dataInner[0].value} name='dataInner0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, false, value,'dataInner')}></InputNumber>
                <InputNumber value={cambios.dataInner[1].value} name='dataInner1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, false, value,'dataInner')}></InputNumber>
              </div>
              </Modal>
            </>
            <PieChart width={200} height={200}>
              <Pie
                data={cambios.dataOuter}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={30}
                outerRadius={60}
                paddingAngle={1}>
                {cambios.dataOuter.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Pie
                data={cambios.dataInner}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={10}
                outerRadius={30}
                paddingAngle={1}>
                {cambios.dataInner.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart> 
            </div>
            :
            <PieChart width={200} height={200}>
            <Pie
              data={cambios.dataOuter}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={30}
              outerRadius={60}
              paddingAngle={1}>
              {cambios.dataOuter.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Pie
              data={cambios.dataInner}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={10}
              outerRadius={30}
              paddingAngle={1}>
              {cambios.dataInner.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>}
            
          </div>

          <div className="texto">
            <div>{cambios.estado}</div>
            {editable.general && editable.diapositiva2 ? 
            // <div>
            // <div className={cambios.indicadorImpacto === "POSITIVIDAD" ? "positivo" : "negativo"}>
            //   <Input value={cambios.indicadorImpacto} name="indicadorImpacto" onChange={handleInputChange} />
            // </div>
            // <div className={cambios.indicadorImpacto === "POSITIVIDAD" ? "positivo" : "negativo"}>
            //   <Input value={cambios.porcentajeImpacto} name="porcentajeImpacto" onChange={handleInputChange} />
            // </div>
            // </div>
            null
            :
            <div>
            <div
              className={
                cambios.indicadorImpacto === "POSITIVIDAD" ? "positivo" : "negativo"
              }>
              {cambios.indicadorImpacto}
            </div>
            <div>
            <div
              className={
                cambios.indicadorImpacto === "POSITIVIDAD" ? "positivo" : "negativo"
              }>
              {cambios.porcentajeImpacto}
            </div>
            </div>
            </div>
            }
          </div>

          <hr></hr>

          {/* <div className="pie">
            <div className="icon-nombre">
              <img className="fb" src={fb} alt="logo"/>
              FACEBOOK
            </div>
            {editable.general  ? 
            <div>
              <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataTortaFb')} disabled={!editable.diapositiva2}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones"
                open={modals.dataTortaFb}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Anterior</div>
                <InputNumber value={cambios.dataOuterFb[0].value} name='dataOuterFb0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, true, value, 'dataOuterFb')}></InputNumber>
                <InputNumber value={cambios.dataOuterFb[1].value} name='dataOuterFb1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, true, value, 'dataOuterFb')}></InputNumber>
                <div>Período Actual</div>
                <InputNumber value={cambios.dataInnerFb[0].value} name='dataInnerFb0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, false, value, 'dataInnerFb')}></InputNumber>
                <InputNumber value={cambios.dataInnerFb[1].value} name='dataInnerFb1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, false, value, 'dataInnerFb')}></InputNumber>
              </div>
              </Modal>
            </>
            <PieChart width={200} height={200}>
              <Pie
                data={cambios.dataOuterFb}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={30}
                outerRadius={60}
                paddingAngle={1}>
                {cambios.dataOuterFb.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Pie
                data={cambios.dataInnerFb}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={10}
                outerRadius={30}
                paddingAngle={1}>
                {cambios.dataInnerFb.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
            </div>
           : 
        
            <PieChart width={200} height={200}>
            <Pie
              data={cambios.dataOuterFb}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={30}
              outerRadius={60}
              paddingAngle={1}>
              {cambios.dataOuterFb.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Pie
              data={cambios.dataInnerFb}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={10}
              outerRadius={30}
              paddingAngle={1}>
              {cambios.dataInnerFb.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            </PieChart>
             }
           </div> */}




          {/* <div className="pie">
            <div className="icon-nombre">
              <img className="tw" src={tw} alt="logo"/>
              TWITTER
            </div>
            {editable.general ? 
            <div>
              <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataTortaTw')}  disabled={!editable.diapositiva2}>
                Editar valores
              </Button>
              <Modal
                title="Total - Volumen de publicaciones"
                open={modals.dataTortaTw}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="modalTorta">
                <div className="">Período Anterior</div>
                <InputNumber value={cambios.dataOuterTw[0].value} name='dataOuterTw0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, true, value, 'dataOuterTw')}></InputNumber>
                <InputNumber value={cambios.dataOuterTw[1].value} name='dataOuterTw1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, true, value, 'dataOuterTw')}></InputNumber>
                <div>Período Actual</div>
                <InputNumber value={cambios.dataInnerTw[0].value} name='dataInnerTw0' className="input-positivo" onChange={(value) => handleInputNumberChange(0, false, value, 'dataOuterTw')}></InputNumber>
                <InputNumber value={cambios.dataInnerTw[1].value} name='dataInnerTw1' className="input-negativo" onChange={(value) => handleInputNumberChange(1, false, value, 'dataOuterTw')}></InputNumber>
              </div>
              </Modal>
            </>
            <PieChart width={200} height={200}>
              <Pie
                data={cambios.dataOuterTw}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={30}
                outerRadius={60}
                paddingAngle={1}>
                {cambios.dataOuterTw.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Pie
                data={cambios.dataInnerTw}
                dataKey="value"
                cx={100}
                cy={100}
                startAngle={-90}
                endAngle={270}
                innerRadius={10}
                outerRadius={30}
                paddingAngle={1}>
                {cambios.dataInnerTw.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
            </div>
           : 
        
            <PieChart width={200} height={200}>
            <Pie
              data={cambios.dataOuterTw}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={30}
              outerRadius={60}
              paddingAngle={1}>
              {cambios.dataOuterTw.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Pie
              data={cambios.dataInnerTw}
              dataKey="value"
              cx={100}
              cy={100}
              startAngle={-90}
              endAngle={270}
              innerRadius={10}
              outerRadius={30}
              paddingAngle={1}>
              {cambios.dataInnerTw.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            </PieChart>
             }
           </div>  */}
        
        </div>

        <div className="subtitulo-anillos">
          <div>ANILLO INTERNO: Período Anterior</div>
          <div>|</div>
          <div>ANILLO EXTERNO: Período Actual</div>
        </div>

        <div className="contenedor-principales">
          <div className="contenedor-img-words">
            <div className="principales-hashtags">
              <div>PRINCIPALES</div>
              <div className="titulo3">HASHTAGS</div>
              <img src={hashtags} className="hashtags"alt="logo" />
            </div>


            {editable.general ?
              <div>
                  <>
                  <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataNubeHashtags')}  disabled={!editable.diapositiva2}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Principales Hashtags"
                    open={modals.dataNubeHashtags}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                  <div className="modalTorta">
                  {cambios.principalesHashtags && cambios.principalesHashtags.length > 0 && cambios.principalesHashtags.map((hashtag, index) => (
                  <div className="modificarnube" key={index}>
                    <Input
                      className="input-nubepalabras"
                      type="text"
                      value={hashtag.text}
                      onChange={(e) =>
                        handleHashtagChange(index, "text", e.target.value)
                      }
                    />
                    <InputNumber
                      value={hashtag.value}
                      onChange={(value) =>
                        handleHashtagChange(index, "value", value)
                      }
                    />
                  </div>
                ))}
                </div>
                  </Modal>
                  </>
            
            <div className="grafico-palabras">
         <WordCloud {...config} /> 
           
            </div>
            </div>
          :
          
          <div className="grafico-palabras">
          <WordCloud {...config} /> 
           
          </div>
                }
          </div>

          <div className="contenedor-img-words">
            <div className="principales-hashtags">
              <div>PALABRAS</div>
              <div className="titulo3">CLAVE</div>
              <img src={clave} className="hashtags" alt="logo"/>
            </div>

            {editable.general ?
              <div>
                  <>
                  <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('palabrasClaves')}  disabled={!editable.diapositiva2}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Palabras Clave"
                    open={modals.palabrasClaves}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                  <div className="modalTorta">
                  {cambios.palabrasClaves && cambios.palabrasClaves.length > 0 && cambios.palabrasClaves.map((hashtag, index) => (
                  <div className="modificarnube" key={index}>
                    <Input
                      className="input-nubepalabras"
                      type="text"
                      value={hashtag.text}
                      onChange={(e) =>
                        handleHashtagChangeClave(index, "text", e.target.value)
                      }
                    />
                    <InputNumber
                      value={hashtag.value}
                      onChange={(value) =>
                        handleHashtagChangeClave(index, "value", value)
                      }
                    />
                  </div>
                ))}
                </div>
                  </Modal>
                  </>
            
            <div className="grafico-palabras">
            <WordCloud {...configPalabrasClave} /> 
           
            </div>
            </div>
          :
          
          <div className="grafico-palabras">
          <WordCloud {...configPalabrasClave} />
         
          </div>
                }
          </div>
        </div>

        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva2')} disabled={editable.diapositiva2}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva2')} disabled={!editable.diapositiva2}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva2','showModal2')} disabled={!editable.diapositiva2}>Descartar cambios</Button>
          <Modal
          open={modals.showModal2}
          title="¿Está seguro?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva2: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues("dataInner")
            resetValues("dataOuter")
            resetValues("dataInnerTw")
            resetValues("dataOuterTw")
            resetValues("dataInnerFb")
            resetValues("dataOuterFb")
            resetValues("principalesHashtags")
            resetValues("palabrasClaves")
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}

        </div>
        }
        {/*FIN DIAPOSITIVA 1*/}
        {/*DIAPOSITIVA 2*/}
        <Tooltip title="Agregar diapositiva ANÁLISIS">
        {editable.general && !cambios.diapositiva2.display && <Button onClick={()=>handleDisplay('diapositiva2')} shape="circle">+</Button>}
        </Tooltip>
        {cambios.diapositiva2.display !== "none" &&
        <div class={cambios.diapositiva2.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva2.display ? "flex" : "none", flexDirection:'column'}}>
        {/*Nav*/}
        <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            <Tooltip title="Eliminar diapositiva">
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva2')} shape="circle">X</Button>}
            </Tooltip>
            <img src={logo} className="img" alt="logo"></img>
          </div>

        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <BiConversation />
          </div>

          <div className="titulo2">ANÁLISIS</div>
        </div>

        <div className="contenedor-analisis">
          <div className="contenedor-dos-analisis">
            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto1"
                value={cambios.texto1}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto1}
              </div>
            )}
            </div>

            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto2"
                value={cambios.texto2}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto2}

              </div>
            )}
            </div>
          </div>

          <hr className="hr-estilos" />

          <div className="contenedor-dos-analisis">
            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto3"
                value={cambios.texto3}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto3}
              </div>
            )}
            </div>

            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
             
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto4"
                value={cambios.texto4}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto4}
              </div>
            )}
            
            </div>
          </div>
          <hr className="hr-estilos" />

          <div className="contenedor-dos-analisis">
            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
            
              {editable.diapositiva3  ? (
              <TextArea
                style={{ height: '100px' }}
                type="text"
                name="texto5"
                value={cambios.texto5}
                onChange={handleChange}
                maxLength={250}
              />
            ) : (
              <div>
                {cambios.texto5}
              </div>
            )}
            </div>

            <div className="contenedor-texto-analisis">
              <div className="icono-analisis">
                <MdOutlineContactSupport />
              </div>
           
              {editable.diapositiva3  ? (
              <TextArea
              style={{ height: '100px' }}
              type="text"
              name="texto6"
              value={cambios.texto6}
              onChange={handleChange}
              maxLength={250}
            />
            ) : (
              <div>
                {cambios.texto6}
              </div>
            )}
    
            </div>
          </div>
          <hr className="hr-estilos" />
        </div>


        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva3')} disabled={editable.diapositiva3}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva3')} disabled={!editable.diapositiva3}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva3',)} disabled={!editable.diapositiva3}>Descartar cambios</Button>
          <Modal
          open={modals.showModal3}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva3: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('texto1')
            resetValues('texto2')
            resetValues('texto3')
            resetValues('texto4')
            resetValues('texto5')
            resetValues('texto6')
            
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}


        </div>
        }
        {/*FIN DIAPOSITIVA 2*/}
        {/*DIAPOSITIVA 3*/}
        <Tooltip title="Agregar diapositiva INFLUENCIADORES/PREOCUPACIONES">
        {editable.general && !cambios.diapositiva3.display && <Button onClick={()=>handleDisplay('diapositiva3')} shape="circle">+</Button>}
        </Tooltip>
        {cambios.diapositiva3.display !== "none"&&
        <div class={cambios.diapositiva3.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva3.display ? "flex" : "none" , flexDirection:'column'}}>
        {/*Nav*/}
        <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            <Tooltip title="Eliminar diapositiva">
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva3')} shape="circle">X</Button>}
            </Tooltip>
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <RiUserStarLine />
          </div>

          <div className="titulo2">INFLUENCIADORES</div>
        </div>
        <Tag className="tag">Top 10 principales</Tag>

        <div className="container-table">

          {editable.general ?

            <div>
              <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataInfluenciadores')} disabled={!editable.diapositiva4}>
                Editar valores
              </Button>
              <Modal
                title="Influenciadores - Top 10"
                open={modals.dataInfluenciadores}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="Influenciadores-modal">
              {cambios.data.map((objeto, indice) => (
                <div key={objeto.key || ''} className="Influenciadores-modal">
                  <Input
                   type="number"
                   className="inputnumber"
                     value={objeto.key} onChange={(e) => {
                    const nuevosDatos = [...cambios.data];
                    nuevosDatos[indice].key = e.target.value;
                    setCambios({ ...cambios, data: nuevosDatos });
                  }} />
                  <Input className="input-influenciadores" type="text" value={objeto.influenciador || ''} onChange={(e) => {
                    const nuevosDatos = [...cambios.data];
                    nuevosDatos[indice].influenciador = e.target.value;
                    setCambios({ ...cambios, data: nuevosDatos });
                  }} />
                  <Input
                   type="number"
                   className="inputnumber" 
                     value={objeto.impresiones || ''}
                     onChange={(e) => {
                    const nuevosDatos = [...cambios.data];
                    nuevosDatos[indice].impresiones = e.target.value;
                    setCambios({ ...cambios, data: nuevosDatos });
                  }} />
                </div>
              ))}

                {cambios.data2ant.map((objeto, indice) => (
                   <div key={objeto.key} className="Influenciadores-modal">
                    <Input
                    type="number"
                    className="inputnumber"
                      value={objeto.key || ''} 
                      onChange={(e) => {
                        const nuevosDatos = [...cambios.data2ant];
                        nuevosDatos[indice] = {
                          ...nuevosDatos[indice],
                          key: e.target.value
                        };
                        setCambios({ ...cambios, data2ant: nuevosDatos });
                      }} 
                    />
                    <Input 
                    className="input-influenciadores" 
                      value={objeto.influenciador || ''} 
                      onChange={(e) => {
                        const nuevosDatos = [...cambios.data2ant];
                        nuevosDatos[indice] = {
                          ...nuevosDatos[indice],
                          influenciador: e.target.value
                        };
                        setCambios({ ...cambios, data2ant: nuevosDatos });
                      }} 
                    />
                    <Input
                     type="number"
                     className="inputnumber"
                      value={objeto.impresiones || ''}
                      onChange={(e) => {
                        const nuevosDatos = [...cambios.data2ant];
                        nuevosDatos[indice] = {
                          ...nuevosDatos[indice],
                          impresiones: e.target.value
                        };
                        setCambios({ ...cambios, data2ant: nuevosDatos });
                      }} 
                    /> 

                   
                  </div>
                ))}
              </div>
              </Modal>
              </>

          <div className="table">
            <Table
              columns={cambios.columns}
              dataSource={cambios.data}
              pagination={false}
              rowClassName={rowClassName}
              style={{ width: "100%" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{
                        backgroundColor: "#0083CA",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  ),
                },
              }}
            />
         
         {cambios.data2ant && cambios.data2ant[0].influenciador !== "" && (
        <Table
          columns={cambios.columns}
          dataSource={cambios.data2ant}
          pagination={false}
          rowClassName={rowClassName}
          style={{ width: "100%" }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{
                    backgroundColor: "#0083CA",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              ),
            },
          }}
        />
      )}
      {(!cambios.data2ant || cambios.data2ant[0].influenciador === "") && (
        <div style={{ display: 'none' }}>
          {/* Aquí puede agregar cualquier contenido que desee que se oculte cuando no hay datos */}
        </div>
      )}
          </div>
          </div>
          :
          
          
          <div className="table">
          <Table
            columns={cambios.columns}
            dataSource={cambios.data}
            pagination={false}
            rowClassName={rowClassName}
            style={{ width: "100%" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "#0083CA",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ),
              },
            }}
          />
       
       {cambios.data2ant && cambios.data2ant[0].influenciador !== "" && (
      <Table
        columns={cambios.columns}
        dataSource={cambios.data2ant}
        pagination={false}
        rowClassName={rowClassName}
        style={{ width: "100%" }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#0083CA",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            ),
          },
        }}
      />
    )}
    {(!cambios.data2ant || cambios.data2ant[0].influenciador === "") && (
      <div style={{ display: 'none' }}>
      </div>
    )}
        </div>
        }
        </div>



        <div className="cuerpo">
          <div className="titulo2">
            <IoAlert />
          </div>

          <div className="titulo2">PREOCUPACIONES</div>
        </div>
        <Tag className="tag">Top 3 principales</Tag>

        <div className="container-table">

          {editable.general ? 
          <div>
             <>
              <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataPreocupaciones')} disabled={!editable.diapositiva4}>
                Editar valores
              </Button>
              <Modal
                title="Preocupaciones - Top 3"
                open={modals.dataPreocupaciones}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
              >
              <div className="Influenciadores-modal">

               {/* <div className="contenedor-modal-preocupaciones" >
                <div>Total</div>
              {cambios.dataPreocupaciones.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                 
                 <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupaciones];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.total.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupaciones: [
                        ...prevState.dataPreocupaciones.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupaciones.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupaciones];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.total.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupaciones: [
                        ...prevState.dataPreocupaciones.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupaciones.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
              ))}
              </div> */}
          

          <div >
                <div>Twitter</div>
          {cambios.dataPreocupacionesTw.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                 
                 <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupacionesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.twitter.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupacionesTw: [
                        ...prevState.dataPreocupacionesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupacionesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupacionesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.twitter.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupacionesTw: [
                        ...prevState.dataPreocupacionesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupacionesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
              ))}
              </div> 

              {/* <div >
                <div>Facebook</div>
              {cambios.dataPreocupacionesFb.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                 
                 <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupacionesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.facebook.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupacionesFb: [
                        ...prevState.dataPreocupacionesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupacionesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataPreocupacionesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.facebook.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataPreocupacionesFb: [
                        ...prevState.dataPreocupacionesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataPreocupacionesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
              ))}
              </div> */}
              </div>
              </Modal>
              </>
         
          <div className="table">
            
            {/* <Table
              columns={cambios.columnsPreocupacionesTotal}
              dataSource={cambios.dataPreocupaciones}
              pagination={false}
              rowClassName={rowClassNameTotal("TOTAL")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />  */}
           <Table
              columns={cambios.columnsPreocupacionesTw}
              dataSource={cambios.dataPreocupacionesTw}
              pagination={false}
              rowClassName={rowClassNameTotal("TWITTER")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            /> 

            {/* <Table
              columns={cambios.columnsPreocupacionesFb}
              dataSource={cambios.dataPreocupacionesFb}
              pagination={false}
              rowClassName={rowClassNameTotal("FACEBOOK")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            /> */}
          </div>
          </div>
          : 
           <div className="table">
            {/* <Table
              columns={cambios.columnsPreocupacionesTotal}
              dataSource={cambios.dataPreocupaciones}
              pagination={false}
              rowClassName={rowClassNameTotal("TOTAL")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />  */}
            <Table
              columns={cambios.columnsPreocupacionesTw}
              dataSource={cambios.dataPreocupacionesTw}
              pagination={false}
              rowClassName={rowClassNameTotal("TWITTER")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            /> 

            {/* <Table
              columns={cambios.columnsPreocupacionesFb}
              dataSource={cambios.dataPreocupacionesFb}
              pagination={false}
              rowClassName={rowClassNameTotal("FACEBOOK")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            /> */}
          </div>
          }

        </div>

        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva4')} disabled={editable.diapositiva4}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva4')} disabled={!editable.diapositiva4}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva4','showModal4')} disabled={!editable.diapositiva4}>Descartar cambios</Button>
          <Modal
          open={modals.showModal4}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva4: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('data')
            resetValues('data2ant')
            resetValues('dataPreocupaciones')
            resetValues('dataPreocupacionesFb')
            resetValues('dataPreocupacionesTw')
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}


        </div>
        }
        {/*FIN DIAPOSITIVA 3*/}
        {/*DIAPOSITIVA 4*/}
        <Tooltip title="Agregar diapositiva EMOCIONES/IMAGEN">
        {editable.general && !cambios.diapositiva4.display && <Button onClick={()=>handleDisplay('diapositiva4')} shape="circle">+</Button>}
        </Tooltip>
        {cambios.diapositiva4.display !== "none" &&
        <div class={cambios.diapositiva4.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva4.display ? "flex" : "none", flexDirection:'column'}}>
        {/*Nav*/}
        <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            <Tooltip title="Eliminar diapositiva">
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva4')} shape="circle">X</Button>}
            </Tooltip>
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <TiHeartOutline />
          </div>

          <div className="titulo2">EMOCIONES</div>
        </div>
        <Tag className="tag">Top 3 principales</Tag>

        <div className="container-table">
          {editable.general ? 
              <div>  {/*CONTENEDOR MODAL */}
                <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataEmociones')} disabled={!editable.diapositiva5}>
                Editar valores
                </Button>
                <Modal
                title="Emociones -Top 3"
                open={modals.dataEmociones}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
                >
                <div className="Influenciadores-modal">

                {/* <div className="contenedor-modal-preocupaciones" >
                <div>Total</div>
                {cambios.dataEmociones.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmociones];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.total.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmociones: [
                        ...prevState.dataEmociones.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmociones.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmociones];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.total.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmociones: [
                        ...prevState.dataEmociones.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmociones.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div> */}


                 <div >
                <div>Twitter</div>
                {cambios.dataEmocionesTw.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmocionesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.twitter.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmocionesTw: [
                        ...prevState.dataEmocionesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmocionesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmocionesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.twitter.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmocionesTw: [
                        ...prevState.dataEmocionesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmocionesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div> 
                {/* <div >
                <div>Facebook</div>
                {cambios.dataEmocionesFb.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmocionesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.facebook.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmocionesFb: [
                        ...prevState.dataEmocionesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmocionesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataEmocionesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.facebook.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataEmocionesFb: [
                        ...prevState.dataEmocionesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataEmocionesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div> */}
                </div>
                </Modal>
          
        
          <div className="table">
         {/* <Table
            columns={cambios.columnsPreocupacionesTotal}
            dataSource={cambios.dataEmociones}
            pagination={false}
            rowClassName={rowClassNameTotal("TOTAL")}
            style={{ width: "100%", margin: "3px" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                ),
              },
            }}
          />  */}
         <Table
            columns={cambios.columnsPreocupacionesTw}
            dataSource={cambios.dataEmocionesTw}
            pagination={false}
            rowClassName={rowClassNameTotal("TWITTER")}
            style={{ width: "100%", margin: "3px" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                ),
              },
            }}
          />
      {/* <Table
            columns={cambios.columnsPreocupacionesFb}
            dataSource={cambios.dataEmocionesFb}
            pagination={false}
            rowClassName={rowClassNameTotal("FACEBOOK")}
            style={{ width: "100%", margin: "3px" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                ),
              },
            }}
          /> */}
        </div>
        </div>

          :  <div className="table">
           {/* <Table
            columns={cambios.columnsPreocupacionesTotal}
            dataSource={cambios.dataEmociones}
            pagination={false}
            rowClassName={rowClassNameTotal("TOTAL")}
            style={{ width: "100%", margin: "3px" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                ),
              },
            }}
          />  */}
            <Table
            columns={cambios.columnsPreocupacionesTw}
            dataSource={cambios.dataEmocionesTw}
            pagination={false}
            rowClassName={rowClassNameTotal("TWITTER")}
            style={{ width: "100%", margin: "3px" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                ),
              },
            }}
          /> 

          {/* <Table
            columns={cambios.columnsPreocupacionesFb}
            dataSource={cambios.dataEmocionesFb}
            pagination={false}
            rowClassName={rowClassNameTotal("FACEBOOK")}
            style={{ width: "100%", margin: "3px" }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                ),
              },
            }} 
          /> */}
        </div>
        }
        </div>



        <div className="cuerpo">
          <div className="titulo2">
            <RiFileUserLine />
          </div>

          <div className="titulo2">IMAGEN</div>
        </div>
        <Tag className="tag">Top 3 principales</Tag>

        <div className="container-table">
       
        {editable.general ? 
          <div> {/*CONTENEDOR MODAL */}

                <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataImagenes')} disabled={!editable.diapositiva5}>
                Editar valores
                </Button>
                <Modal
                title="Imagenes -Top 3"
                open={modals.dataImagenes}
                onOk={handleOk}
                okText="Guardar"
                cancelText="Cancelar"
                onCancel={handleCancel}
                >
                <div className="Influenciadores-modal">

                {/* <div className="contenedor-modal-preocupaciones" >
                <div>Total</div>
                {cambios.dataImagenes.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenes];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.total.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenes: [
                        ...prevState.dataImagenes.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenes.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.total?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenes];
                    nuevosDatos[indice].total = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.total.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenes: [
                        ...prevState.dataImagenes.slice(0, indice),
                        {
                          total: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.total.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.total.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenes.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div> */}


                <div >
                <div>Twitter</div>
                {cambios.dataImagenesTw.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.twitter.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenesTw: [
                        ...prevState.dataImagenesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.twitter?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenesTw];
                    nuevosDatos[indice].twitter = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.twitter.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenesTw: [
                        ...prevState.dataImagenesTw.slice(0, indice),
                        {
                          twitter: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.twitter.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.twitter.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenesTw.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div> 

                {/* <div >
                <div>Facebook</div>
                {cambios.dataImagenesFb.map((objeto, indice) => (
                <div key={indice} className="Influenciadores-modal">
                
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[0]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{e.target.value}</div>
                        <div>{objeto.facebook.props.children[1].props.children}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenesFb: [
                        ...prevState.dataImagenesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                <Input
                  className="input-influenciadores"
                  type="text"
                  value={objeto.facebook?.props?.children[1]?.props?.children}
                  onChange={(e) => {
                    const nuevosDatos = [...cambios.dataImagenesFb];
                    nuevosDatos[indice].facebook = (
                      <div className="totalizador-preocupaciones">
                        <div>{objeto.facebook.props.children[0].props.children}</div>
                        <div>{e.target.value}</div>
                      </div>
                    );
                    setCambios(prevState => ({
                      ...prevState,
                      dataImagenesFb: [
                        ...prevState.dataImagenesFb.slice(0, indice),
                        {
                          facebook: (
                            <div className="totalizador-preocupaciones">
                              <div>{e.target.id === "input-0" ? e.target.value : objeto.facebook.props.children[0].props.children}</div>
                              <div>{e.target.id === "input-1" ? e.target.value : objeto.facebook.props.children[1].props.children}</div>
                            </div>
                          ),
                        },
                        ...prevState.dataImagenesFb.slice(indice + 1)
                      ]
                    }));
                  }}
                />
                </div>
                ))}
                </div> */}
                </div>
                </Modal>

          <div className="table">
           {/* <Table
              columns={cambios.columnsPreocupacionesTotal}
              dataSource={cambios.dataImagenes}
              pagination={false}
              rowClassName={rowClassNameTotal("TOTAL")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            /> */}
            <Table
              columns={cambios.columnsPreocupacionesTw}
              dataSource={cambios.dataImagenesTw}
              pagination={false}
              rowClassName={rowClassNameTotal("TWITTER")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />

            {/* <Table
              columns={cambios.columnsPreocupacionesFb}
              dataSource={cambios.dataImagenesFb}
              pagination={false}
              rowClassName={rowClassNameTotal("FACEBOOK")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            /> */}
          </div>
          </div>
          :

          <div className="table">
             {/* <Table
              columns={cambios.columnsPreocupacionesTotal}
              dataSource={cambios.dataImagenes}
              pagination={false}
              rowClassName={rowClassNameTotal("TOTAL")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />  */}
             <Table
              columns={cambios.columnsPreocupacionesTw}
              dataSource={cambios.dataImagenesTw}
              pagination={false}
              rowClassName={rowClassNameTotal("TWITTER")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            /> 

            {/* <Table
              columns={cambios.columnsPreocupacionesFb}
              dataSource={cambios.dataImagenesFb}
              pagination={false}
              rowClassName={rowClassNameTotal("FACEBOOK")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            /> */}
          </div>
        }
          </div>
      

        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva5')} disabled={editable.diapositiva5}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva5')} disabled={!editable.diapositiva5}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva5', 'showModal5')} disabled={!editable.diapositiva5}>Descartar cambios</Button>
          <Modal
          open={modals.showModal5}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva5: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('dataEmocionesTw')
            resetValues('dataEmocionesFb')
            resetValues('dataEmociones')
            resetValues('dataImagenes')
            resetValues('dataImagenesFb')
            resetValues('dataImagenesTw')
            
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}

        </div>
        }
        {/*FIN DIAPOSITIVA 4*/}
        {/*DIAPOSITIVA 5*/}
        <Tooltip title="Agregar diapositiva CLAVES PARA INTERPRETAR">
        {editable.general && !cambios.diapositiva5.display && <Button onClick={()=>handleDisplay('diapositiva5')} shape="circle">+</Button>}
        </Tooltip>
        {cambios.diapositiva5.display !== "none" &&
        <div class={cambios.diapositiva5.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva5.display ? "flex" : "none", flexDirection:'column'}}>
        {/*Nav*/}
        <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            <Tooltip title="Eliminar diapositiva">
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva5')} shape="circle">X</Button>}
            </Tooltip>
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <RiPushpinLine />
          </div>

          <div className="titulo2">
            CLAVES PARA INTERPRETAR PREOCUPACIONES, EMOCIONES E IMAGENES
          </div>
        </div>


      <div className="contenedor9cartas"> {/*contenedor de 9*/}

        <div className="contenedor3cartas color"> {/*contenedor de 3*/}
          <div className="contenedor1carta"> {/*contenedor de 1*/}
            <div className="titulo2">01.</div>
            {editable.diapositiva6  ? (
              <TextArea
              style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto7"
                value={cambios.texto7}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto7}
              </div>
            )}
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">02.</div>
          {editable.diapositiva6  ? (
              <TextArea
              style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto8"
                value={cambios.texto8}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto8}
              </div>
            )}
           
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">03.</div>
          {editable.diapositiva6  ? (
              <TextArea
              style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto9"
                value={cambios.texto9}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto9}
              </div>
            )}
            
          </div>

        </div>

        <div className="contenedor3cartas"> {/*contenedor de 3*/}
          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">04.</div>
          {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto10"
                value={cambios.texto10}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto10}
              </div>
            )}
       
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
            <div className="titulo2">05.</div>
            {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto11"
                value={cambios.texto11}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto11}
              </div>
            )}
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">06.</div>
          {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto12"
                value={cambios.texto12}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto12}
              </div>
            )}
          </div>
        </div>

        <div className="contenedor3cartas color"> {/*contenedor de 3*/}
          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">07.</div>
          {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto13"
                value={cambios.texto13}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto13}
              </div>
            )}
          </div>
        
          <div className="contenedor1carta"> {/*contenedor de 1*/}
          <div className="titulo2">08.</div>
          {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto14"
                value={cambios.texto14}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto14}
              </div>
            )}            
          </div>

          <div className="contenedor1carta"> {/*contenedor de 1*/}
            <div className="titulo2">09.</div>
            {editable.diapositiva6  ? (
              <TextArea
                style={{ height: '100px', width: '250px' }}
                type="text"
                name="texto15"
                value={cambios.texto15}
                onChange={handleChange}
                maxLength={350}
              />
            ) : (
              <div>
                {cambios.texto15}
              </div>
            )}       
          </div>
        </div>

      </div>

      {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva6')} disabled={editable.diapositiva6}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva6')} disabled={!editable.diapositiva6}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva6')} disabled={!editable.diapositiva6}>Descartar cambios</Button>
          <Modal
        /*   open={modals.showModal6} */
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva6: false // Cambiar la diapositiva correspondiente a false
            }));
            /* resetValues() */
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}


        </div>
        }
        {/*FIN DIAPOSITIVA 5*/}
        {/*DIAPOSITIVA 6*/}
        <Tooltip title="Agregar diapositiva MAPA DE PERCEPCIONES">
        {editable.general && !cambios.diapositiva6.display && <Button onClick={()=>handleDisplay('diapositiva6')} shape="circle">+</Button>}
        </Tooltip>
        {cambios.diapositiva6.display !== "none" &&
        <div class={cambios.diapositiva6.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva6.display ? "flex" : "none", flexDirection:'column'}}>
          {/*Nav*/}
          <div className="contenedor-extremo">
          <div className="nav-reporte">
              <div className="reporte">
                <SlNotebook />
                <p>REPORTE DE SÍNTESIS</p>
              </div>
              <Tooltip title="Eliminar diapositiva">
              {editable.general && <Button onClick={()=>handleDisplay('diapositiva6')} shape="circle">X</Button>}
              </Tooltip>
              <img src={logo} className="img" alt="logo"></img>
            </div>
          </div>


        <div className="cuerpo">
            <div className="titulo2">
                <VscCompass /> 
            </div>

            <div className="titulo2">
              MAPA DE PERCEPCIONES
            </div>
          </div>
          <Tag className="tag">Síntesis de términos y vocablos que connotan las valoraciones positivas y negativas de las audiencias en el marco del presente análisis</Tag>

          <div className="subtitulo">
          <div className="titulo0 subtitulo">LO QUE SE DESTACADA DE LAS PERCEPCIONES POSITIVAS Y NEGATIVAS</div>
          </div>


          {editable.general ? 
          <> 
            <>
                  <Button type="primary" style={{marginLeft:'2rem', marginTop:'1rem'}} onClick={()=>showModalTorta('dataMapaPercepciones')}  disabled={!editable.diapositiva7}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Mapa de Percepciones"
                    open={modals.dataMapaPercepciones}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                  <div className="modalTorta">
                  {cambios.mapaPercepciones && cambios.mapaPercepciones.length > 0 && cambios.mapaPercepciones.map((hashtag, index) => (
                  <div className="modificarnube" key={index}>
                    <Input
                      className="input-nubepalabras"
                      type="text"
                      value={hashtag.text}
                      onChange={(e) =>
                        handleHashtagChangePercepciones(index, "text", e.target.value)
                      }
                    />
                    <InputNumber
                      value={hashtag.value}
                      onChange={(value) =>
                        handleHashtagChangePercepciones(index, "value", value)
                      }
                    />
                   <Input
                      className="input-nubepalabras"
                      type="text"
                      value={hashtag.color}
                      onChange={(e) =>
                        handleHashtagChangePercepciones(index, "color", e.target.value)
                      }
                    /> 
                  </div>
                ))}
                </div>
                  </Modal>
                  </>
          
          <div>
           <WordCloud {...configMapaPercepciones}/>
      
         
          </div>
          </>
            : 
            
            <div>
          <WordCloud {...configMapaPercepciones}/>
          </div>}
         
      
      {editable.general && (
            <div className="boton-confirmar">
              {contextHolder}
            <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva7')} disabled={editable.diapositiva7}>
              Editar
            </Button>
            <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva7')} disabled={!editable.diapositiva7}>
              Guardar cambio
            </Button>
            <Button onClick={()=>handleDiscardChanges('diapositiva7', 'showModal7')} disabled={!editable.diapositiva7}>Descartar cambios</Button>
            <Modal
            open={modals.showModal7}
            title="¿Está seguro de que desea descartar los cambios?"
            okText="Sí"
            cancelText="No"
            onOk={() => {
              setEditable((prevState) => ({
                ...prevState,
                diapositiva7: false // Cambiar la diapositiva correspondiente a false
              }));
              resetValues('mapaPercepciones')
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          >
            <p>Los cambios realizados se perderán permanentemente.</p>
          </Modal>
            </div>
            )}

        </div>
        }
        {/*FIN DIAPOSITIVA 6*/}
        {/*DIAPOSITIVA 7*/}
        <Tooltip title="Agregar diapositiva FORTALEZAS Y DEBILIDADES">
        {editable.general && !cambios.diapositiva7.display && <Button onClick={()=>handleDisplay('diapositiva7')} shape="circle">+</Button>}
        </Tooltip>
        {cambios.diapositiva7.display !== "none" &&
        <div  class={cambios.diapositiva7.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva7.display ? "flex" : "none", flexDirection:'column' }}>
      {/*Nav*/}
      <div className="contenedor-extremo">
          <div className="nav-reporte">
              <div className="reporte">
                <SlNotebook />
                <p>REPORTE DE SÍNTESIS</p>
              </div>
              <Tooltip title="Eliminar diapositiva">
              {editable.general && <Button onClick={()=>handleDisplay('diapositiva7')} shape="circle">X</Button>}
              </Tooltip>
              <img src={logo} className="img" alt="logo"></img>
            </div>
          </div>

          <div className="cuerpo">
            <div className="titulo2">
              <HiOutlineChatAlt2 />
            </div>

            <div className="titulo2">
            FORTALEZAS Y DEBILIDADES
            </div>
          </div>

          {editable.general ? 
            
            <div>
                <>
                  <Button type="primary" style={{marginTop:'1rem' , marginLeft:'2rem'}} onClick={()=>showModalTorta('fortalezasDebilidades')}  disabled={!editable.diapositiva10}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Fortalezas y Debilidades"
                    open={modals.fortalezasDebilidades}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                  <div className="modalTorta">
                  {cambios.fortalezasDebilidades && cambios.fortalezasDebilidades.length > 0 && cambios.fortalezasDebilidades.map((porcentaje, index) => (
                    <div className="modificarnube" key={index}>
                      <Input
                        className="input-nubepalabras"
                        type="text"
                        value={porcentaje.text}
                        onChange={(e) =>
                          handleHashtagChangeFortalezas(index, "text", e.target.value)
                        }
                      />
                      <Input
                        type="text"
                        value={porcentaje.value}
                        onChange={(e) =>
                          handleHashtagChangeFortalezas(index, "value", e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
                  </Modal>
                  </>

              <div className="fortalezas-debilidades"> {/*CONTENEDOR GENERAL */}
            <div className="fortalezas-positivo"> {/*CONTENEDOR HORIZONTAL POSITIVO */}
              <div className="fortalezas-circulo"> {/*CONTENEDOR CIRCULO */}
              <div className="circulo-fortalezas-positivo">{cambios.fortalezasDebilidades[0].value}</div>
              <div>
              <div className="circulo-positivo">POSITIVIDAD</div>
              {/* <div>Expansión comercial</div> */}
              </div>
              </div>
              <hr></hr>
              <div className='fortalezas-texto'> {/*CONTENEDOR TEXTO */}
              {editable.diapositiva10  ? (  
              <TextArea
                style={{ height: '150px', width: '400px' }}
                type="text"
                name="fortalezasDebilidadestexto1"
                value={cambios.fortalezasDebilidadestexto1}
                onChange={handleChange}
                maxLength={600}
              />
            ) : (
              <div>
                {cambios.fortalezasDebilidadestexto1}
              </div>
            )} 

            </div>
            </div>
            <div className="fortalezas-positivo"> {/*CONTENEDOR HORIZONTAL NEGATIVO */}
              <div className="fortalezas-circulo"> {/*CONTENEDOR CIRCULO */}
              <div className="circulo-fortalezas-negativo">{cambios.fortalezasDebilidades[1].value}</div>
              <div>
              <div className="circulo-negativo">NEGATIVIDAD</div>
              {/* <div>Vulnerabilidad habitacional</div> */}
              </div>
              </div>
              <hr></hr>
              <div className='fortalezas-texto'> {/*CONTENEDOR TEXTO */}
      
              {editable.diapositiva10  ? (  
              <TextArea
                style={{ height: '150px', width: '400px' }}
                type="text"
                name="fortalezasDebilidadestexto2"
                value={cambios.fortalezasDebilidadestexto2}
                onChange={handleChange}
                maxLength={600}
              />
            ) : (
              <div>
                {cambios.fortalezasDebilidadestexto2}
              </div>
            )}  
              </div>
            </div>
          </div>
          </div>
          :

          <div className="fortalezas-debilidades"> {/*CONTENEDOR GENERAL */}
          <div className="fortalezas-positivo"> {/*CONTENEDOR HORIZONTAL POSITIVO */}
            <div className="fortalezas-circulo"> {/*CONTENEDOR CIRCULO */}
            <div className="circulo-fortalezas-positivo">{cambios.fortalezasDebilidades[0].value}</div>
            <div>
            <div className="circulo-positivo">POSITIVIDAD</div>
            {/* <div>Expansión comercial</div> */}
            </div>
            </div>
            <hr></hr>
            <div className='fortalezas-texto'> {/*CONTENEDOR TEXTO */}
          {cambios.fortalezasDebilidadestexto1}

          </div>
          </div>
          <div className="fortalezas-positivo"> {/*CONTENEDOR HORIZONTAL NEGATIVO */}
            <div className="fortalezas-circulo"> {/*CONTENEDOR CIRCULO */}
            <div className="circulo-fortalezas-negativo">{cambios.fortalezasDebilidades[1].value}</div>
            <div>
            <div className="circulo-negativo">NEGATIVIDAD</div>
            {/* <div>Vulnerabilidad habitacional</div> */}
            </div>
            </div>
            <hr></hr>
            <div className='fortalezas-texto'> {/*CONTENEDOR TEXTO */}
         {cambios.fortalezasDebilidadestexto2}
            </div>
          </div>
        </div>
       }

        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva10')} disabled={editable.diapositiva10}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva10')} disabled={!editable.diapositiva10}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva10','showModal10')} disabled={!editable.diapositiva10}>Descartar cambios</Button>
          <Modal
          open={modals.showModal10}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva10: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('fortalezasDebilidadestexto1')
            resetValues('fortalezasDebilidadestexto2')
            resetValues('fortalezasDebilidades')
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}

        </div>
        }
       
        {/*FIN DIAPOSITIVA 7*/}
        {/*DIAPOSITIVA 8*/}
        
        <Tooltip title="Agregar diapositiva RECOMENDACIONES1">
        {editable.general && !cambios.diapositiva8.display && <Button onClick={()=>handleDisplay('diapositiva8')} shape="circle">+</Button>}
        </Tooltip>
        {cambios.diapositiva8.display !== "none" &&
        <div class={cambios.diapositiva8.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva8.display ? "flex" : "none", flexDirection:'column' }}>
    {/*Nav*/}
    <div className="contenedor-extremo">
         <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            <Tooltip title="Eliminar diapositiva">
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva8')} shape="circle">X</Button>}
            </Tooltip>
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <AiOutlineStar />
          </div>

          <div className="titulo2">RECOMENDACIONES PARA LA COMUNICACIÓN</div>
        </div>
        <Tag className="tag">
        Temas, emociones y atributos que en el marco del presente análisis se recomiendan trabajar a través de las acciones comunicacionales.
        </Tag>


        <div className="contenedorGralEmociones"> {/*CONTENEDOR GRAL */}
          <div className="contenedorSugerencia"> {/*CONTENEDOR SEGURENCIA 1 */}
          <div className="titulo2"> {/* Titulo*/}
          SUGERENCIA 1
          </div>
          <div className="contenedorTextoTerminos"> {/*Contenedor textoTerminos */}
          {editable.diapositiva8  ? (  
              <TextArea
                style={{ height: '300px', width: '400px' }}
                type="text"
                name="sugerencia1"
                value={cambios.sugerencia1}
                onChange={handleChange}
                maxLength={600}
              />
            ) : (
              <div>
                {cambios.sugerencia1}
              </div>
            )}   {/* texto*/}

          {editable.diapositiva8  ? (  
              <TextArea
                style={{ height: '100px', width: '400px' }}
                type="text"
                name="terminos1"
                value={cambios.terminos1}
                onChange={handleChange}
                maxLength={300}
              />
            ) : (
              <div>
                {cambios.terminos1}
              </div>
            )}  {/* terminos*/}
          </div>

          </div>

          <div className="contenedorEmocionesAtributos"> {/*CONTENEDOR EMOCIONES Y ATRIBUTOS */}
          <div className="emocionesAtributos"> {/*nav */}
            EMOCIONES Y ATRIBUTOS PARA INCLUIR EN EL MENSAJE*
            </div>
            <div className="contenedorTablas"> {/*Contenedor tablas */}
            {editable.general ? 
            <div className="contenedorEmociones"> {/*CONTENEDOR emociones */}

                <>
                  <Button type="primary" style={{marginTop:'1rem'}} onClick={()=>showModalTorta('dataEmocionesComunicacion')}  disabled={!editable.diapositiva8}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Emociones para incluir en el mensaje"
                    open={modals.dataEmocionesComunicacion}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                <div className="modalTorta">
             
                {cambios.dataEmocionesComunicacion.map((objeto, indice) => (
                  <div key={indice}>
                    <Input
                      className="input-influenciadores"
                      type="text"
                      value={objeto.emociones.props.children.props.children}
                      onChange={(e) => handleInputChangeEmociones(e, indice)}
                    />
                  </div>
                ))}

                </div>
                  </Modal>
                  </>







            <div> {/*tabla */}
            <Table
              columns={cambios.columnsEmociones}
              dataSource={[...cambios.dataEmocionesComunicacion]}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <WordCloud {...configpalabrasRecomendadas5}/>
    
            </div>
            </div>

            :

            <div className="contenedorEmociones"> {/*CONTENEDOR emociones */}
            <div> {/*tabla */}
            <Table
              columns={cambios.columnsEmociones}
              dataSource={[...cambios.dataEmocionesComunicacion]}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <WordCloud {...configpalabrasRecomendadas5}/>
  
            </div>
            </div>
          
            }



            {editable.general ? 
            <div class="contenedorEmociones"> {/*CONTENEDOR atributos */}
              <>
                  <Button type="primary" style={{marginTop:'1rem'}} onClick={()=>showModalTorta('dataAtributosComunicacion')}  disabled={!editable.diapositiva8}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Atributos para incluir en el mensaje"
                    open={modals.dataAtributosComunicacion}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                <div className="modalTorta">
             
                {cambios.dataAtributosComunicacion.map((objeto, indice) => (
                  <div key={indice}>
                    <Input
                      className="input-influenciadores"
                      type="text"
                      value={objeto.emociones.props.children.props.children}
                      onChange={(e) => handleInputChangeAtributos(e, indice)}
                    />
                  </div>
                ))}

                </div>
                  </Modal>
                  </>


            <div> {/*tabla */}
            <Table
              columns={cambios.columnsAtributos}
              dataSource={cambios.dataAtributosComunicacion}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <WordCloud {...configpalabrasRecomendadas2}/>
           
            </div>
            </div>
                :
                <div> {/*CONTENEDOR atributos */}
                <div> {/*tabla */}
                <Table
                  columns={cambios.columnsAtributos}
                  dataSource={cambios.dataAtributosComunicacion}
                  pagination={false}
                  rowClassName={rowClassNameTotal("EMOCIONES")}
                  style={{ width: "100%", margin: "3px" }}
                  components={{
                    header: {
                      cell: (props) => (
                        <th
                          {...props}
                          style={{ backgroundColor: "white", color: "black" }}
                        />
                      ),
                    },
                  }}
                />
                </div>
                <div className="subtitulo"> {/*subtitulo */}
                VOCABLOS SUGERIDOS
    
                </div>
                <div className="nube-palabras"> {/*nube palabras */}
                <WordCloud {...configpalabrasRecomendadas2}/>
                </div>
                </div>
                }


            </div>

          </div>
        

        </div>
        <Tag className="tag piepagina"> {/*pie de pag */}
          *Ver documento de QSocialNow "Criterios y técnicas para la producción de contenidos"
        </Tag>
        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva8')} disabled={editable.diapositiva8}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva8')} disabled={!editable.diapositiva8}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva8','showModal8')} disabled={!editable.diapositiva8}>Descartar cambios</Button>
          <Modal
          open={modals.showModal8}
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva8: false // Cambiar la diapositiva correspondiente a false
            }));
            resetValues('dataEmocionesComunicacion')
            resetValues('dataAtributosComunicacion')
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}


        </div>
        }
        {/*FIN DIAPOSITIVA 8*/}
        {/*DIAPOSITIVA 9*/} 
        <Tooltip title="Agregar diapositiva RECOMENDACIONES2">
        {editable.general && !cambios.diapositiva9.display && <Button onClick={()=>handleDisplay('diapositiva9')} shape="circle">+</Button>}
        </Tooltip>
        {cambios.diapositiva9.display !== "none" &&       
        <div class={cambios.diapositiva9.display === 'flex' ? "page-break" : ""} data-html2pdf-pagebreak style={{ display: cambios.diapositiva9.display ? "flex" : "none", flexDirection:'column' }}>
        {/*Nav*/}
    <div className="contenedor-extremo">
          <div className="nav-reporte">
            <div className="reporte">
              <SlNotebook />
              <p>REPORTE DE SÍNTESIS</p>
            </div>
            <Tooltip title="Eliminar diapositiva">
            {editable.general && <Button onClick={()=>handleDisplay('diapositiva9')} shape="circle" >X</Button>}
           </Tooltip>
            <img src={logo} className="img" alt="logo"></img>
          </div>
        </div>

        <div className="cuerpo">
          <div className="titulo2">
            <AiOutlineStar />
          </div>

          <div className="titulo2">RECOMENDACIONES PARA LA COMUNICACIÓN</div>
        </div>
        <Tag className="tag">
        Temas, emociones y atributos que en el marco del presente análisis se recomiendan trabajar a través de las acciones comunicacionales.
        </Tag>


        <div className="contenedorGralEmociones"> {/*CONTENEDOR GRAL */}
          <div className="contenedorSugerencia"> {/*CONTENEDOR SEGURENCIA 1 */}
          <div className="titulo2"> {/* Titulo*/}
          SUGERENCIA 2
          </div>
          <div className="contenedorTextoTerminos"> {/*Contenedor textoTerminos */}
          {editable.diapositiva8  ? (  
              <TextArea
                style={{ height: '300px', width: '400px' }}
                type="text"
                name="sugerencia2"
                value={cambios.sugerencia2}
                onChange={handleChange}
                maxLength={600}
              />
            ) : (
              <div>
                {cambios.sugerencia2}
              </div>
            )}   {/* texto*/}

          {editable.diapositiva8  ? (  
              <TextArea
                style={{ height: '100px', width: '400px' }}
                type="text"
                name="terminos1"
                value={cambios.terminos2}
                onChange={handleChange}
                maxLength={300}
              />
            ) : (
              <div>
                {cambios.terminos2}
              </div>
            )}  {/* terminos*/}
          </div>

          </div>

          <div className="contenedorEmocionesAtributos"> {/*CONTENEDOR EMOCIONES Y ATRIBUTOS */}
          <div className="emocionesAtributos"> {/*nav */}
            EMOCIONES Y ATRIBUTOS PARA INCLUIR EN EL MENSAJE*
            </div>
            <div className="contenedorTablas"> {/*Contenedor tablas */}
            {editable.general ? 
            <div className="contenedorEmociones"> {/*CONTENEDOR emociones */}

                <>
                  <Button type="primary" style={{marginTop:'1rem'}} onClick={()=>showModalTorta('dataEmocionesComunicacion')}  disabled={!editable.diapositiva9}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Emociones para incluir en el mensaje"
                    open={modals.dataEmocionesComunicacion}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                <div className="modalTorta">
             
                {cambios.dataEmocionesComunicacion.map((objeto, indice) => (
                  <div key={indice}>
                    <Input
                      className="input-influenciadores"
                      type="text"
                      value={objeto.emociones.props.children.props.children}
                      onChange={(e) => handleInputChangeEmociones(e, indice)}
                    />
                  </div>
                ))}

                </div>
                  </Modal>
                  </>







            <div> {/*tabla */}
            <Table
              columns={cambios.columnsEmociones}
              dataSource={[...cambios.dataEmocionesComunicacion]}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <WordCloud {...configpalabrasRecomendadas3}/>
            </div>
            </div>

            :

            <div className="contenedorEmociones"> {/*CONTENEDOR emociones */}
            <div> {/*tabla */}
            <Table
              columns={cambios.columnsEmociones}
              dataSource={[...cambios.dataEmocionesComunicacion]}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <WordCloud {...configpalabrasRecomendadas3}/>
            </div>
            </div>
          
            }



            {editable.general ? 
            <div class="contenedorEmociones"> {/*CONTENEDOR atributos */}
              <>
                  <Button type="primary" style={{marginTop:'1rem'}} onClick={()=>showModalTorta('dataAtributosComunicacion')}  disabled={!editable.diapositiva9}>
                    Editar valores
                  </Button>
                  <Modal
                    title="Atributos para incluir en el mensaje"
                    open={modals.dataAtributosComunicacion}
                    onOk={handleOk}
                    okText="Guardar"
                    cancelText="Cancelar"
                    onCancel={handleCancel}
                  >
                <div className="modalTorta">
             
                {cambios.dataAtributosComunicacion.map((objeto, indice) => (
                  <div key={indice}>
                    {/* {console.log(objeto)} */}
                    <Input
                      className="input-influenciadores"
                      type="text"
                      value={objeto.emociones.props.children.props.children}
                      onChange={(e) => handleInputChangeEmociones(e, indice)}
                    />
                  </div>
                ))}

                </div>
                  </Modal>
                  </>


            <div> {/*tabla */}
            <Table
              columns={cambios.columnsAtributos}
              dataSource={cambios.dataAtributosComunicacion}
              pagination={false}
              rowClassName={rowClassNameTotal("EMOCIONES")}
              style={{ width: "100%", margin: "3px" }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ backgroundColor: "white", color: "black" }}
                    />
                  ),
                },
              }}
            />
            </div>
            <div className="subtitulo"> {/*subtitulo */}
            VOCABLOS SUGERIDOS

            </div>
            <div className="nube-palabras"> {/*nube palabras */}
            <WordCloud {...configpalabrasRecomendadas4}/>
            </div>
            </div>
                :
                <div> {/*CONTENEDOR atributos */}
                <div> {/*tabla */}
                <Table
                  columns={cambios.columnsAtributos}
                  dataSource={cambios.dataAtributosComunicacion}
                  pagination={false}
                  rowClassName={rowClassNameTotal("EMOCIONES")}
                  style={{ width: "100%", margin: "3px" }}
                  components={{
                    header: {
                      cell: (props) => (
                        <th
                          {...props}
                          style={{ backgroundColor: "white", color: "black" }}
                        />
                      ),
                    },
                  }}
                />
                </div>
                <div className="subtitulo"> {/*subtitulo */}
                VOCABLOS SUGERIDOS
    
                </div>
                <div className="nube-palabras"> {/*nube palabras */}
                <WordCloud {...configpalabrasRecomendadas4}/>
                {/* <ReactWordcloud words={cambios.palabrasRecomendadas} options={opcionesRecomendadas} width="200" height="200" /> */}
                </div>
                </div>
                }


            </div>

          </div>
        

        </div>
        <Tag className="tag piepagina"> {/*pie de pag */}
          *Ver documento de QSocialNow "Criterios y técnicas para la producción de contenidos"
        </Tag>

        {editable.general && (
          <div className="boton-confirmar">
            {contextHolder}
          <Button type="primary" className="boton-primary" onClick={()=>openMessageEdit('diapositiva9')} disabled={editable.diapositiva9}>
            Editar
          </Button>
          <Button type="primary" className="boton-primary" onClick={()=>openMessage('diapositiva9')} disabled={!editable.diapositiva9}>
            Guardar cambio
          </Button>
          <Button onClick={()=>handleDiscardChanges('diapositiva9')} disabled={!editable.diapositiva9}>Descartar cambios</Button>
          <Modal
          /* open={modals.showModal9} */
          title="¿Está seguro de que desea descartar los cambios?"
          okText="Sí"
          cancelText="No"
          onOk={() => {
            setEditable((prevState) => ({
              ...prevState,
              diapositiva9: false // Cambiar la diapositiva correspondiente a false
            }));
            /* resetValues() */
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        >
          <p>Los cambios realizados se perderán permanentemente.</p>
        </Modal>
          </div>
          )}



        </div>
        }
        {/*FIN DIAPOSITIVA 9*/} 
        {/*DIAPOSITIVA 10*/}
        <div class="page-break" data-html2pdf-pagebreak >
        {/*ULTIMA DIAPOSITIVA */}        
        <Diapositiva10/>
        </div>
        {/*FIN DIAPOSITIVA 10*/}

      </div>
        
      </div>

      
    </Fragment>
  );
}


