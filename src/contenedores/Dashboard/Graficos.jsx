import React, {useState} from 'react'
import EventosAutores from '../../componentes/Graficos/EventosAutores'
import './Dashboard.css'
import LineaEventos from '../../componentes/Graficos/LineaEventos'
import MapaCalor from '../../componentes/Graficos/Polar'
import NubePalabras from '../../componentes/Graficos/NubePalabras'
import BarrasApiladas from '../../componentes/Graficos/BarrasApiladas'
import GrupoBarras from '../../componentes/Graficos/GruposBarras'
import AnilloPolaridad from '../../componentes/Graficos/Anillo'
import Hashtags from '../../componentes/Tabla/Hashtags'
import Filtros from './Filtros'
import CantidadHashtags from '../../componentes/Tabla/CantidadHashtags'
import MasEngagement from '../../componentes/Tabla/MasEngagement'
import OcurrenciaModelo from '../../componentes/Graficos/Treemap'
import TablaTweetsRepetidos from '../../componentes/Tabla/TweetsRepetidos'
import TablaTweets from '../../componentes/Tabla/Tweets'
import MapaCalorPolaridad from '../../componentes/Graficos/MapaCalorPolaridad'
import NubePalabrasBigrama from '../../componentes/Graficos/Bigrama'
import NubePalabrasTrigrama from '../../componentes/Graficos/Trigrama'
import { useSelector } from 'react-redux'
import { TreemapModeloFiltro } from '../../componentes/Graficos/TreemapModeloFiltro'
import BarrasApiladasModeloFiltro from '../../componentes/Graficos/BarrasApiladasModeloFiltro'
import Mapa from '../../componentes/Graficos/Mapa'




export default function Graficos() {
  const filtros = useSelector(state=> state.filtros)

 
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
          <NubePalabras />
        </div>
        <div className='grafico-mediano'>
        <NubePalabrasBigrama/>
        </div>
        <div className='grafico-mediano'>
       <NubePalabrasTrigrama/>
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
        <div className='grafico-treemap'>
          <OcurrenciaModelo/>
        </div>
        <div className='grafico-barras'>
          <BarrasApiladas />
        </div>
        </div>
      
     {filtros.categoria && filtros.categoria.length > 0 ?
     
     <div className='columna'>
     <div className='grafico-treemap'>
       <TreemapModeloFiltro/>
     </div>
     <div className='grafico-barras'>
          <BarrasApiladasModeloFiltro />
        </div>
     </div>
    
    
    : null } 

        
      

      

   

     
    </div>
  );
}