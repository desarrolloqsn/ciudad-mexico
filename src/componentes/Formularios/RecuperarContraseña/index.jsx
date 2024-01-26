import { Button, Form, Input} from 'antd';
import React from "react";
import {GrUserAdmin} from 'react-icons/gr'
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default function FormCambiarContraseña(){
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

 

 return(
  <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
  <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Por favor ingresá tu mail',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
     
{/* 

      <Form.Item
    
        name="username"
        rules={[
          {
            required: true,
            message: 'Por favor ingresá una contraseña',
          },
        ]}
      >
       <Input
         prefix={<GrUserAdmin className="icon-ant"/>} 
          type="password"
          placeholder="Nueva contraseña"
        />
      </Form.Item>
      <Form.Item
      
        name="password"
        rules={[
          {
            required: true,
            message: 'Por favor ingresá una contraseña',
          },
        ]}
      >
        <Input
          prefix={<GrUserAdmin className="icon-ant" />} 
          type="password"
          placeholder="Repetir contraseña"
        />
      </Form.Item> */}



      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button boton-login" href='/'>
          ENVIAR
        </Button>
        </Form.Item>

        <br></br>
        <div>Te va a llegar un mail con la solicitud de cambio de contraseña.</div>
    </Form>

 )
}
 