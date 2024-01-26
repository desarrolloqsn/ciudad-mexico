
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const CrearUsuario = () => {
  const [open, setOpen] = useState(true);
 
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title="Crear un nuevo Usuario"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={onClose} type="primary">
              Cargar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Nombre"
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
                name="Teléfono"
                label="Teléfono"
                rules={[
                  {
                    type: 'number',
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
                name="Zona"
                label="Zona"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresá una zona',
                  },
                ]}
              >
                <Select placeholder="Buenos Aires">
                  <Option value="Buenos Aires">Buenos Aires</Option>
                  <Option value="Misiones">Misiones</Option>
                  <Option value="Santa Fe">Santa Fe</Option>
                  <Option value="Venezuela">Venezuela</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Email"
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
          </Row>


          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Cliente"
                label="Cliente"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresá un cliente asociado',
                  },
                ]}
              >
                <Select placeholder="Por favor ingresá un cliente">
                  <Option value="Misiones">Misiones</Option>
                  <Option value="ARG - Presidentes">ARG - Presidentes</Option>
                  <Option value="Yerba buena">Yerba buena</Option>
                  <Option value="Republica Dominicana">Republica Dominicana</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="Lenguaje"
                label="Lenguaje"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresá un lenguaje',
                  },
                ]}
              >
                <Select placeholder="Español">
                  <Option value="Español" >Español</Option>
                  <Option value="Inglés" Form disabled>Inglés</Option>
                  <Option value="Portugues" Form disabled>Portugues</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Rol"
                label="Rol"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresá un rol',
                  },
                ]}
              >
                <Select placeholder="Por favor ingresá un rol">
                  <Option value="Usuario">Usuario</Option>
                  <Option value="Analista" Form disabled>Analista</Option>
                  <Option value="Administrador" Form disabled>Administrador</Option>
                  <Option value="Desarrollo" Form disabled>Desarrollo</Option>
                </Select>
              </Form.Item>
            </Col>
        
          </Row>
          
        </Form>
      </Drawer>
    </>
  );
};
export default CrearUsuario;