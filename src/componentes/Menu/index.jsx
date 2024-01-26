
import { BarChartOutlined } from "@ant-design/icons";
import {  Layout, Menu } from "antd";
import { useState } from "react";
import { AiOutlineCluster } from 'react-icons/ai';
import { GrGraphQl } from 'react-icons/gr'
import { Link, useLocation } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import {  FaUsers } from "react-icons/fa";
import { TbCategory } from 'react-icons/tb'
import { useDispatch } from 'react-redux';
import { filtrarDatos } from "../../redux/actions";

const { Sider } = Layout;


const MenuDesplegable = () => {
  const [collapsed, setCollapsed] = useState(true);
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  const dispatch = useDispatch()  
 

  const handleMenuClick = (e) => {
   console.log("MODELOSSS",e)
    dispatch(filtrarDatos({modelo:e}));
  };

  
  return (
    
 
    <Sider width={"35vh"} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
  
      

  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >

    <Menu.Item key="/dashboard" icon={  <BarChartOutlined />} onClick={()=>handleMenuClick("")}>
       
      <span> Dashboard</span>
      <Link to="/dashboard"></Link>
    </Menu.Item>



   
 
    <SubMenu icon={< AiOutlineCluster />} title="Modelos" >


        <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Atributos")}>
        
            <span>Atributos</span>
            <Link to="/dashboard/Atributos"></Link>
        </Menu.Item>


        <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Clima social")}>
            
            <span>Clima social</span>
            <Link to="/dashboard/Clima social"></Link>
        </Menu.Item>

        <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Continuidad y cambio")}>
        
        <span>Continuidad y cambio</span>
        <Link to="/dashboard/Continuidad y cambio"></Link>
    </Menu.Item>

    <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Emociones Básicas (Plutchik)")}>
        
        <span>Emociones básicas</span>
        <Link to="/dashboard/Emociones Básicas (Plutchik)"></Link>
    </Menu.Item>

    <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Preocupaciones")}>
        
        <span>Preocupaciones</span>
        <Link to="/dashboard/Preocupaciones"></Link>
    </Menu.Item>

    {/* <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Preocupaciones - Ven")}>
        
        <span>Preocupaciones - Ven</span>
        <Link to="/dashboard/Preocupaciones - Ven"></Link>
    </Menu.Item> */}

    <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Red motivacional del voto")}>
        
        <span>Red motivacional del voto</span>
        <Link to="/dashboard/Red motivacional del voto"></Link>
    </Menu.Item>

    <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Sentimientos")}>
        
        <span>Sentimientos</span>
        <Link to="/dashboard/Sentimientos"></Link>
    </Menu.Item>

    {/* <Menu.Item icon={<AiOutlineCluster /> } onClick={()=>handleMenuClick("Voto Emocional y Racional")}>
        
        <span>Voto emocional y racional</span>
        <Link to="/dashboard/Voto Emocional y Racional"></Link>
    </Menu.Item> */}

   

    

    </SubMenu>  

    <Menu.Item key="/grafos" icon={<GrGraphQl />}>
        <span>Grafos</span>
        <Link to="/dashboard/grafos"></Link>
      </Menu.Item>
{/* 
    <Menu.Item key="/dashboard/series" icon={  <TbCategory />}>
       
       <span>Series</span>
       <Link to="/dashboard/series"></Link>
     </Menu.Item> */}


    


 {/*    <Menu.Item key="/dashboard/perfil" icon={  <RxAvatar />}>
       
       <span>Perfil</span>
       <Link to="/dashboard/perfil"></Link>
     </Menu.Item> */}

     
      {/* <Menu.Item icon={<FaUsers/>} key="/clientes" >
          
          <span>Clientes</span>
          <Link to="/dashboard/modificarcliente"></Link>
      </Menu.Item>
 */}




 
  </Menu>


</Sider>



  );
};
export default MenuDesplegable;




