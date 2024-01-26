import { useState } from 'react';
import './ModificarCliente.css'
import { Table, Input, Form, Popconfirm } from 'antd';
import {  SlTrash } from 'react-icons/sl'




const TablaClientes = () => {

  
  const [form] = Form.useForm();
  const [data, setData] = useState(() => {
    const initialData = []
     for (let i = 0; i < 100; i++) {
      initialData.push({
        key: i.toString(),
        Cliente: `Cliente ${i}`,
       });
    }

    return initialData;
  });
 
  
  const [editingKey, setEditingKey] = useState('');
  
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
      // console.log('Validate Failed:', errInfo);
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
    const inputNode = <Input />
  
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
      title: 'Cliente',
      dataIndex: 'Cliente',
      width: '30%',
      editable: true,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
    },
 
       {
      title: 'Eliminar',
      dataIndex: 'operation',
      width: "10%",
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
  
  
  return (
    <Form form={form} component={false}>
      
      <Table
      
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
      
      export default TablaClientes;