import React, {useState} from 'react'
import EventosAutores from '../../componentes/Graficos/EventosAutores'
import './Dashboard.css'
import LineaEventos from '../../componentes/Graficos/LineaEventos'
import MapaCalor from '../../componentes/Graficos/Polar'
import NubePalabras from '../../componentes/Graficos/NubePalabras'
import Género from '../../componentes/Graficos/Género'
import BarrasApiladasModelo from '../../componentes/Graficos/BarrasApiladasModelo'
import GrupoBarras from '../../componentes/Graficos/GruposBarras'
import AnilloPolaridad from '../../componentes/Graficos/Anillo'
import Hashtags from '../../componentes/Tabla/Hashtags'
import TablaTweets from '../../componentes/Tabla/Tweets'
import NubePalabrasBigrama from '../../componentes/Graficos/Bigrama'
import NubePalabrasTrigrama from '../../componentes/Graficos/Trigrama'
import Radial from '../../componentes/Graficos/Radar'
import ColumnaRadial from '../../componentes/Graficos/ColumnaRadial'
import MasEngagement from '../../componentes/Tabla/MasEngagement'
import Filtros from './Filtros'
import CantidadHashtags from '../../componentes/Tabla/CantidadHashtags'
import { TreemapModelo } from '../../componentes/Graficos/TreemapModelo'
import MapaCalorPolaridad from '../../componentes/Graficos/MapaCalorPolaridad'
import TablaTweetsRepetidos from '../../componentes/Tabla/TweetsRepetidos'
import Mapa from '../../componentes/Graficos/Mapa'


export default function GraficosModelos() {
 


  return (
    <div className='dashboard'>
    <div className='contenedor-filtros'>
      <Filtros />
      </div>

      <div className='columna'>
        <div className='grafico-grande'>
          <LineaEventos />
        </div>
        <div className='grafico-pequeño'>
          <EventosAutores />
        </div>
      </div>

      <div className='columna'>
        <div className='grafico-unico'>
          <Mapa/>
        </div>
      </div>

      <div className='columna'>
        <div className='grafico-mediano'>
          <MapaCalor />
        </div>
        <div className='grafico-mediano'>
          <TablaTweets />
        </div>
        <div className='grafico-mediano'>
          <TablaTweetsRepetidos />
        </div>
     
      
      </div>

      <div className='columna'>
        <div className='grafico-mediano'>
          <MapaCalorPolaridad/>
        </div>
        
        <div className='grafico-mediano'>
       <AnilloPolaridad/>
       </div> 
       <div className='grafico-mediano'>
       <GrupoBarras/>
       </div> 

   
      </div>

      <div className='columna'>
        <div className='grafico-mediano'>
        <MasEngagement/>
        </div>
         <div className='grafico-mediano'>
        <CantidadHashtags/>
        </div>
        <div className='grafico-mediano'>
          <Hashtags />
        </div> 
        </div> 

    
   

        
      <div className='columna'>
        <div className='grafico-doble'>
          <Radial/>
        </div>
        <div className='grafico-doble'>
         <ColumnaRadial/>
        </div>
      </div>

     

      <div className='columna'>
        <div className='grafico-treemap'>
          <TreemapModelo />
        </div>
        <div className='grafico-barras'>
          <BarrasApiladasModelo />
        </div>
      </div>

   
    </div>
  );
}