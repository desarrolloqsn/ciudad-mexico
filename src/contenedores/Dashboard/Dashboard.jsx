import { Layout } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import './Dashboard.css'
import MenuDesplegable from "../../componentes/Menu";
import Graficos from "./Graficos";
import Footer from "../../componentes/Footer";


export default function Dash(){
    return(
      <Layout
      style={{
        
        minHeight: "100%",
      
      }}
      className="layout">
     
            <MenuDesplegable />
            <Content>
             <Graficos/>
             <Footer/>
            </Content>
        </Layout>
    )
}