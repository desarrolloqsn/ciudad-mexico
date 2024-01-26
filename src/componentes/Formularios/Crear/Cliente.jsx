import { Button,Form, Input, Select} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import {notification } from 'antd';
import React from "react";
import './fromcreacion.css'


export default function FormCreacionCliente(){

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: (
        <SmileOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  };
  const onFinish = (values) => {
    openNotification()
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const { Option } = Select;
  
 

 return(
  <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className='tituloagregar'>Agregar Cliente</div>
      <hr></hr>
      <br></br>
      <Form.Item
      label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: 'Por favor ingresá un nombre al cliente',
          },
        ]}
      >
        <div className="input-container">
       <Input
              placeholder="Cliente"
        />
        </div>
      </Form.Item>

      <Form.Item
      name="plan"
      label="Plan"
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Por favor elegir un plan para el cliente',
        },
      ]}
    >
      <div className="input-container">
      <Select placeholder="Básico, Intermedio, Avanzado" className='input-ant'>
    
        <Option value="basico">Básico</Option>
        <Option value="intermedio">Intermedio</Option>
        <Option value="avanzado">Avanzado</Option>
       
      </Select>
      </div>
    </Form.Item>


    <Form.Item
      label="Teléfono"
        name="telefono"
        rules={[
          {
            required: true,
            message: 'Por favor ingresá un teléfono de contacto',
          },
        ]}
      >
        <div className="input-container">
       <Input className='input-ant'
              placeholder="112233445566"
        />
        </div>
      </Form.Item>

      <Form.Item
      label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Por favor ingresá un email corporativo',
          },
        ]}
      >
        <div className="input-container">
       <Input className='input-ant'
              placeholder="ejemplo@ejemplo.com"
        />
        </div>
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button boton-login">
          CREAR
        </Button>
      </Form.Item>

    </Form>

 )
}