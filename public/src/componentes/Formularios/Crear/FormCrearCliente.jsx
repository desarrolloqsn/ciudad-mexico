
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import { useState } from 'react';
import { getClient, postClient } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
const { Option } = Select;
const CrearCliente = () => {
  const [open, setOpen] = useState(true);
  const [inicialValues, setValues] = useState({
    name: "",
    email: "",
    phone:"",
    plan: "",
  })
  const dispatch = useDispatch();
  const onClose = () => {
    setOpen(false);
  };


  const onFinish = (values) => {
    console.log(values)
    
      dispatch(postClient(values))
      dispatch(getClient());
      message.success('¡Cliente creado exitosamente!');
  }  
  return (

    <>
   
      <Drawer
        title="Crear un nuevo Cliente"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
          
          </Space>
        }
      >

      <Form
          name="basic"
          
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        
          autoComplete="off"
          className='crear-evento'
        >
            
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresá un nombre',
                  },
                ]}
              >
                <Input placeholder="Por favor ingresá un nombre" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Teléfono"
                rules={[
                  {
                    
                    required: true,
                    message: 'Por favor ingresá un teléfono',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  placeholder="112233885599"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="plan"
                label="Plan"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresá un plan',
                  },
                ]}
              >
                <Select placeholder="Por favor ingresá un plan">
                  <Option value="BASIC">Básico</Option>
                  <Option value="INTERMEDIATE">Intermedio</Option>
                  <Option value="ADVANCED">Avanzado</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Por favor ingresá un email',
                  },
                ]}
              >
                <Input placeholder="ejemplo@ejemplo.com"/>
                
              </Form.Item>


            </Col>

            <Form.Item>
            <Button  type="primary" htmlType="submit" >
              Cargar
            </Button>
            </Form.Item>
          </Row>
          
        </Form>
        </Drawer>
    </>
  );
};
export default CrearCliente;