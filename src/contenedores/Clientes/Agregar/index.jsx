import { Layout } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import MenuDesplegable from "../../../componentes/Menu";
import FormCreacionCliente from "../../../componentes/Formularios/Crear/Cliente.jsx";
import './../Clientes.css'


export default function AgregarCliente(){
    return(
      <Layout
      style={{
        
        minHeight: "100%",
      
      }}
      className="layout">
     
            <MenuDesplegable />
           
            <Content className="content">
           
              <FormCreacionCliente/>
            </Content>
        </Layout>
    )
}