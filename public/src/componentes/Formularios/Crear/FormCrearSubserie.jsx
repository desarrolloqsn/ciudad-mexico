
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
const { Option } = Select;
const CrearSubSerie = () => {
  const [open, setOpen] = useState(true);
 
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title="Crear un nueva Subserie"
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
        
          </Row>
          <Row>
          <Col span={12}>
              <Form.Item
                name="Filtro"
                label="Filtro booleano"
                
              >
                <TextArea
                  style={{
                    width: '100%',
                    height: '400px'
                  }}
                  placeholder='"leerdescoloniza" OR "poesiaparalapaz" OR "guerra de carteles" OR "altum" OR "feliz miercoles" OR "reutilizar y reciclar" OR "pdvs-acripto" OR (("influencer") ("leito" OR "walmart")) OR "policia anticorrupcion" lang:es'
                />
              </Form.Item>
            </Col>
          </Row>
          
          
        </Form>
      </Drawer>
    </>
  );
};
export default CrearSubSerie;