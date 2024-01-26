import React from 'react'
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from 'antd';
import './fromcreacion.css'


export default function FormularioInformes() {

  
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };



  return (
    <div className='contenedor-form'>


    <div className='carta'>
  <Form
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
  >
   
    



    

   

    <Form.Item
      wrapperCol={{
        span: 12,
        offset: 6,
      }}
    >
      <Space>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        
      </Space>
    </Form.Item>
  </Form>

  </div>
    </div>
  )
}
