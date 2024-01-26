import { Layout } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import MenuDesplegable from "../../componentes/Menu";
import TablaSeries from "../../componentes/Tabla/Series";
import './Series.css'


export default function Series(){
    return(
      <Layout
      style={{
        
        minHeight: "100%",
      
      }}
      className="layout">
     
            <MenuDesplegable />
           
            <Content className="contenido">
              <TablaSeries/>
            </Content>
        </Layout>
    )
}