import { Layout } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import MenuDesplegable from "../../componentes/Menu";



export default function Perfil(){
    return(
      <Layout
      style={{
        
        minHeight: "100%",
      
      }}
      className="layout">
     
            <MenuDesplegable />
           
            <Content >
           
            </Content>
        </Layout>
    )
}