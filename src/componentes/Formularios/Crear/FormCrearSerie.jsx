
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const CrearSerie = () => {
  const [open, setOpen] = useState(true);
 
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title="Crear un nueva Serie"
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
                name="Nombre de la serie"
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
            
          </Row>
          
          
        </Form>
      </Drawer>
    </>
  );
};
export default CrearSerie;