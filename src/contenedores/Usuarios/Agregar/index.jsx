import { Layout } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import MenuDesplegable from "../../../componentes/Menu";
import './../Usuarios.css'
import FormCreacionUsuario from "../../../componentes/Formularios/Crear/Usuario";


export default function AgregarUsuario(){
    return(
      <Layout
      style={{
        
        minHeight: "100%",
      
      }}
      className="layout">
     
            <MenuDesplegable />
           
            <Content className="content">
           
              <FormCreacionUsuario/>
            </Content>
        </Layout>
    )
}