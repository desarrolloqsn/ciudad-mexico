import { useState } from 'react';
import './ModificarCliente.css'
import { Table, Input, Form, Typography, Popconfirm  } from 'antd';
import { SlPencil, SlTrash } from 'react-icons/sl'
import TextArea from 'antd/es/input/TextArea';
import { Button } from 'antd';



const TablaSubSeries = () => {

  const isEditing = (record) => record.key.toString() === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      Cliente: ``,
       
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const renderExpandedContent = (record) => {
    return (
      <div className='tablamodificarusuario'>
        <div className='contenedor-modal'>
          <TextArea placeholder='"leerdescoloniza" OR "poesiaparalapaz" OR "guerra de carteles" OR "altum" OR "feliz miercoles" OR "reutilizar y reciclar" OR "pdvs-acripto" OR (("influencer") ("leito" OR "walmart")) OR "policia anticorrupcion" lang:es' style={{width:"70%"}}/>
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
             <Button className='boton-subserie'>Guardar</Button> 
            </Typography.Link>
            <Popconfirm title="¿Seguro que deseas cancelar?" onConfirm={cancel}>
              <br></br>
              <Button className='boton-subserie'><a>Cancelar</a></Button>
            </Popconfirm>
          </span>
        </div>
      </div>
    );
  };
  const defaultExpandable = {
    expandedRowRender: renderExpandedContent,
  };
  const [expandable, setExpandable] = useState(defaultExpandable);
  const handleExpandChange = (enable) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };




  
  
  const [form] = Form.useForm();
  const [data, setData] = useState(() => {
    const initialData = []
     for (let i = 0; i < 100; i++) {
      initialData.push({
        key: i.toString(),
        SubSeries: `SubSerie ${i}`,
       });
    }

    return initialData;
  });
 
  
  const [editingKey, setEditingKey] = useState('');
  
 

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input/>
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={title}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  const columns = [
    {
      title: 'SubSeries',
      dataIndex: 'SubSeries',
      width: '60%',
      editable: true,
      
    },
  
 
    {
      title: 'Editar',
      dataIndex: 'operation',
      width: '30%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Guardar
            </Typography.Link>
            <Popconfirm title="¿Seguro que deseas cancelar?" onConfirm={cancel}>
              <br></br>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            onClick={() => edit(record)}
            style={{
              marginRight: 8,
            }} className='contenedor-modal'
          >
           < SlPencil/>
          </Typography.Link>
        );
      },
    },
    {
      title: 'Eliminar',
      dataIndex: 'operation',
      width: "30%",
      render: (_, record) => {
        return (
          <Popconfirm title="¿Seguro que deseas eliminar?" onConfirm={() => handleDelete(record.key)}>
            <a className='contenedor-modal'><SlTrash/></a>
          </Popconfirm>
        );
      },
    },
  ];
      
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  const tableProps = {
    expandable
  };
  
  return (
    <Form form={form} component={false}>
      
      <Table
      {...tableProps}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        scroll={{
          x: 500,
        
        }}
      />
    </Form>
  );
  
      };
      
      export default TablaSubSeries;