import { Layout } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import MenuDesplegable from "../../../componentes/Menu";
import './../Clientes.css'
import TablaModificarCliente from "../../../componentes/Tabla/ModificarCliente";




export default function ModificarCliente(){
    return(
      <Layout
      style={{
        
        minHeight: "100%",
      
      }}
      className="layout">
     
            <MenuDesplegable />
           
            <Content className="content-tabla">
             <TablaModificarCliente/>
            </Content>
        </Layout>
    )
}