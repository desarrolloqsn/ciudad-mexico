import React from 'react'
import logo from './../../imagenes/LogoHead.png'
import './Nav.css'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { AiOutlineLogout} from 'react-icons/ai'
import { Button } from 'antd';


export default function Nav() {
  return (
    <div>
      <nav class="navbar bg-light">
        <div class="container-fluid contenedor-nav-dashboard">
            <Link to='/dashboard' class="navbar-brand" >
            <img src={logo} alt="Logo" className='logo'/>
            </Link>
            <div className='logo-logout'>
            <Avatar size="medium" icon={<UserOutlined />} className='icono-avatar'/>
           <div className='linea'>|</div>
            <Button type='boton'><AiOutlineLogout className='icon-logout'/></Button>
            
            </div>
        </div>
        </nav>
    </div>
  )
}
