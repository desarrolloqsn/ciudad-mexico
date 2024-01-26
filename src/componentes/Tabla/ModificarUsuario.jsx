import React, { useEffect, useState } from 'react';
import { Table, Input, Form, Typography, Popconfirm } from 'antd';
import { SlPencil, SlTrash } from 'react-icons/sl'
import { Select } from 'antd';
import { getClient, getUsers } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '@testing-library/react';

const { Option } = Select;

const TablaModificarUsuario = (props) => {
  const idCliente = props.idCliente;

  const clients = useSelector(state => state.clientes);
  const usuarios = useSelector(state => state.usuarios);
  // const roles = useSelector(state => state.roles);
  const dispatch = useDispatch()

  useEffect(()=>{
    (async () => {
      await  dispatch(getClient());
      await  dispatch(getUsers());
      await  dispatch(getRoles());
    })();
    
  },[dispatch])

  const clientes = [
    { id: 1, nombre: 'Cliente 0' },
    { id: 2, nombre: 'Cliente 1' },
    // Agrega más objetos de clientes según sea necesario
  ];
  const nombres = [
    { id: 1, nombre: 'Usuario 1' },
    { id: 2, nombre: 'Usuario 2' },
    // Agrega más objetos de clientes según sea necesario
  ];
  const mails = [
    { id: 1, mail: 'ejemplo@gmail.com' },
    { id: 2, mail: 'ejemplo1@gmail.com' },
    // Agrega más objetos de clientes según sea necesario
  ];
  const roles = [
    { id: 1, rol: 'Usuario' },
    { id: 2, rol: 'Analista' },
    { id: 3, rol: 'Administrador' },
    { id: 4, rol: 'Desarrollo' },
    // Agrega más objetos de clientes según sea necesario
  ];
  const zonas = [
    { id: 1, zona: 'Buenos Aires' },
    { id: 2, zona: 'Venezuela' },
    // Agrega más objetos de clientes según sea necesario
  ];
  const lenguajes = [
    { id: 1, lenguaje: 'ES' },
    { id: 2, lenguaje: 'EN' },
    // Agrega más objetos de clientes según sea necesario
  ];
  const [form] = Form.useForm();
  const [data, setData] = useState(() => {
    const initialData = []
     for (let i = 0; i < 1; i++) {
      initialData.push({
        key: i.toString(),
        Nombre: `Hola`,
        Email: `ejemplo@gmail.com`,
        Contraseña: '1245ad6',
        Zona: 'Buenos Aires',
        Lenguaje: 'ES',
        Cliente: 'Cliente 0',
        Rol: 'Usuario',
      });
    }

    return initialData;
  });


  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key.toString() === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      Nombre: '',
      Email: '',
      Contraseña: '',
      Zona: '',
      Lenguaje: '',
      Cliente: '',
      Rol: '',
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
    const inputNode =
  title === 'Nombre' || title === 'Email' || title === 'Contraseña' || title === 'Zona'   ? (
    <Input /> ) : (
    <Select style={{ width: '100%' }}>
      {dataIndex === 'Cliente'
        ? clientes.map((client) => (
            <Option key={client.id} value={client.nombre}>
              {client.nombre}
            </Option>
          ))
        : dataIndex === 'Lenguaje'
          ? lenguajes.map((lenguaje) => (
              <Option key={lenguaje.id} value={lenguaje.lenguaje}>
                {lenguaje.lenguaje}
              </Option>
            ))
          : roles.map((rol) => (
              <Option key={rol.id} value={rol.rol}>
                {rol.rol}
              </Option>
            ))}
    </Select>
    )
  
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
      title: 'Nombre',
      dataIndex: 'Nombre',
      width: '20%',
      editable: true,
      filters: nombres.map(nombre => ({ text: nombre.nombre, value: nombre.nombre })),
      onFilter: (value, record) => record.Nombre === value,
      fixed: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      width: '30%',
      editable: true,
      filters: mails.map(mail => ({ text: mail.mail, value: mail.mail })),
      onFilter: (value, record) => record.Email === value,
    },
    {
      title: 'Contraseña',
      dataIndex: 'Contraseña',
      width: '20%',
      editable: true,
    },
    {
      title: 'Zona',
      dataIndex: 'Zona',
      width: '25%',
      editable: true,
      filters: zonas.map(zona => ({ text: zona.zona, value: zona.zona })),
      onFilter: (value, record) => record.Zona === value,
    },
    {
      title: 'Lenguaje',
      dataIndex: 'Lenguaje',
      width: '15%',
      editable: true,
      filters: lenguajes.map(lenguaje => ({ text: lenguaje.lenguaje, value: lenguaje.lenguaje })),
      onFilter: (value, record) => record.Lenguaje === value,
    },
    {
      title: 'Cliente',
      dataIndex: 'Cliente',
      width: '25%',
  /*     editable: true,
      filters: clientes.map(cliente => ({ text: cliente.nombre, value: cliente.nombre })),
      onFilter: (value, record) => record.Cliente === value, */
    },
    {
      title: 'Rol',
      dataIndex: 'Rol',
      width: '25%',
      editable: true,
      filters: roles.map(rol => ({ text: rol.rol, value: rol.rol })),
      onFilter: (value, record) => record.Rol === value,
    },
    {
      title: 'Editar',
      dataIndex: 'operation',
      width: '15%',
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
            }}
          >
           < SlPencil/>
          </Typography.Link>
        );
      },
    },
    {
      title: 'Eliminar',
      dataIndex: 'operation',
      width: "15%",
      render: (_, record) => {
        return (
          <Popconfirm title="¿Seguro que deseas eliminar?" onConfirm={() => handleDelete(record.key)}>
            <a><SlTrash/></a>
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
        x: 1300,
       
      }}
      />
      </Form>
      );
      };
      
      export default TablaModificarUsuario;