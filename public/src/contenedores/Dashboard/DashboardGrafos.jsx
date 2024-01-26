import { Layout } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import './Dashboard.css'
import MenuDesplegable from "../../componentes/Menu";
import Footer from "../../componentes/Footer";
import TabsGrafos from "./TabsGrafos";


export default function DashGrafos(){
    return(
      <Layout
      style={{
        
        minHeight: "100%",
      
      }}
      className="layout">
     
            <MenuDesplegable />
            <Content>
             <TabsGrafos/>
             <Footer/>
            </Content>
        </Layout>
    )
}