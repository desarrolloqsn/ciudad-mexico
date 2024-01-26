import React, {useEffect,useState} from 'react';
import { Tabs } from 'antd';
import GrafoPalabrasMasFrecuentes from './../../componentes/Graficos/GrafoPalabrasMasFrecuentes'
import GrafoHashtagsMasFrecuentes from './../../componentes/Graficos/GrafoPy'
import GraphHashtags from './../../componentes/Graficos/GrafoHashtag'
import Graph2 from './../../componentes/Graficos/Grafo'
import GraphComunidades from './../../componentes/Graficos/GrafoComunidades'
import GrafoComunidadesEnRedes from './../../componentes/Graficos/GrafoComunidadesEnRedes'
import './Dashboard.css'
import { GrGraphQl } from 'react-icons/gr'

import GrafosModelos from '../../componentes/Graficos/GrafosModelos';




const { TabPane } = Tabs;

const TabsGrafos = () => {


  const abrirNuevaVentana = () => {
    window.open('/dashboard/grafos', '_blank');
  };


  return (

    <div className="dashboard">

      <div className="nombreDashboard">Grafos</div>
      <Tabs defaultActiveKey="1" className='dashboardgrafos' type="card">

        <TabPane tab="Palabras mas frecuentes" key="1">
          <GrafoPalabrasMasFrecuentes />

        </TabPane>


        <TabPane tab="Tendencias en las conversaciones" key="2">
          <GraphHashtags />
        </TabPane>


        <TabPane tab="Interacción de usuarios e influencia en las conversaciones" key="3">
          <GraphComunidades />
        </TabPane>


        <TabPane tab="Comunidades en redes" key="4" >

          <GrafoComunidadesEnRedes />
        </TabPane>

{/* 
        <TabPane tab="Comunidades en redes menos relevantes" key="5" >

          {/* <GrafoComunidadesEnRedesMenosRelevantes /> 
        </TabPane> 
      */}


    <TabPane tab="Modelos y categorías" key="6" >

            <GrafosModelos />
          </TabPane>



{/*
        <TabPane tab="Atributos políticos" key="5">
          <Graph2 />
        </TabPane>

        <TabPane tab="Modelos" key="6">

        </TabPane> */}

        {/* <TabPane tab="Resumen" key="7">
          <Videos/>
        </TabPane> */}

      </Tabs>
    </div>
  );
};

export default TabsGrafos;