import { useEffect, useState } from 'react';
import './ModificarCliente.css'
import { Table, Input, Form, Typography, Popconfirm , message} from 'antd';
import { SlPencil, SlTrash } from 'react-icons/sl'
import { Select } from 'antd';
import TablaModificarUsuario from './ModificarUsuario'
import { RiUserAddLine } from 'react-icons/ri'
import { Button, Tooltip } from "antd";
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import CrearCliente from '../Formularios/Crear/FormCrearCliente'
import CrearUsuario from '../Formularios/Crear/FormCrearUsuario'
import { useDispatch, useSelector } from 'react-redux';
import { getClient } from '../../redux/actions';

const { Option } = Select;


const TablaModificarCliente = () => {

  const clients = useSelector(state => state.clientes);
  const dispatch = useDispatch()

  const planes = [
    { id: 1, plan: 'Básico' },
    { id: 2, plan: 'Intermedio' },
    { id: 3, plan: 'Avanzado' },
    // Agrega más objetos de clientes según sea necesario
  ];
 


  const estados = [
    { id: 1, estado: 'Activo' },
    { id: 2, estado: 'Inactivo' },
   
    // Agrega más objetos de clientes según sea necesario
  ];

  const [open, setOpen] = useState(false)
  const [openUsuario, setOpenUsuario] = useState(false)
  const [form] = Form.useForm();
  const [data, setData] = useState([])

  useEffect(()=>{
    (async () => {
      await  dispatch(getClient());
    })();
    
  },[dispatch])

  useEffect(()=>{

    const initialData = Array.isArray(clients)
    ? clients?.map((client) => ({
        key: `${client.id}`,
        Cliente: `${client.name}`,
        Email: `${client.email}`,
        Teléfono: `${client.phone}`,
        Plan: `${client.plan}`,
        Estado: `${client.state}`,
      }))
    : [];

    setData(initialData)
  
  },[clients])




  // const renderExpandedContent = (record) => {
  //   console.log(record)
  //   // return <div className='tablamodificarusuario'>{<TablaModificarUsuario idCliente={record.key}/>}</div>;
  // };

  
  // const defaultExpandable = {
  //   expandedRowRender: renderExpandedContent,
  // };


  const [editingKey, setEditingKey] = useState('');
  // const [expandable, setExpandable] = useState(defaultExpandable);
  // const handleExpandChange = (enable) => {
  //   setExpandable(enable ? defaultExpandable : undefined);
  // };
  const isEditing = (record) => record.key.toString() === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      Cliente: ``,
        Email: ``,
        Teléfono: '',
        Plan: '',
        Estado: '',
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
    title === 'Cliente' || title === 'Email' || title === 'Teléfono' ? 
      <Input />
     : (
      <Select style={{ width: '100%' }}>
        {dataIndex === 'Plan'
          ? planes.map((plan) => (
              <Option key={plan.id} value={plan.plan}>
                {plan.plan}
              </Option>
            ))
          : estados.map((estado) => (
              <Option key={estado.id} value={estado.estado}>
                {estado.estado}
              </Option>
            ))}
      </Select>
    );

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
      width: '20%',
      editable: true,
      filters: clients?.map(cliente => ({ text: cliente.name, value: cliente.name })),
      onFilter: (value, record) => record.Cliente === value,
      fixed: 'left',
    },
    {
      title: 'Teléfono',
      dataIndex: 'Teléfono',
      width: '15%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      width: '20%',
      editable: true,
    filters: clients?.map(cliente => ({ text: cliente.email, value: cliente.email })),
      onFilter: (value, record) => record.Email === value,
    },
    {
      title: 'Plan',
      dataIndex: 'Plan',
      width: '20%',
      editable: true,
      filters: planes.map(cliente => ({ text: cliente.plan, value: cliente.plan })),
      onFilter: (value, record) => record.Plan === value,
    },
       {
      title: 'Estado',
      dataIndex: 'Estado',
      width: '20%',
      editable: true,
      filters: estados.map(estado => ({ text: estado.estado, value: estado.estado })),
      onFilter: (value, record) => record.Estado === value,
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
      width: "10%",
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
        inputType: col.dataIndex === 'Teléfono' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  const tableProps = {
    //  expandable
  };

function handleAdd(){

  setOpen(!open)
}

function handleAddUser(){

  setOpenUsuario(!openUsuario)
}
  
  return (
    <Form form={form} component={false} >
       <div className='nombreDashboard'>Lista de Clientes</div>
       <div className='botones-agregar'>
       <div className='agregar-cliente'>
       <Tooltip title="Agregar Cliente">
              <Button type="primary" shape="circle" icon={<AiOutlineUsergroupAdd />} style={{background:"#00284e"}} onClick={handleAdd}/>
        </Tooltip>
        {open ? <CrearCliente /> : null}
        {openUsuario ? <CrearUsuario/> : null}
        </div>
        <div className='agregar-cliente'>
       <Tooltip title="Agregar Usuario">
              <Button type="primary" shape="circle" icon={<RiUserAddLine />} style={{background:"#00284e"}} onClick={handleAddUser}/>
        </Tooltip>
        </div>
        </div>
      {clients ? <Table
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
          x: 1000,
        
        }}
      /> : <Table
      {...tableProps}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      bordered
      columns={mergedColumns}
      rowClassName="editable-row"
      pagination={{
        onChange: cancel,
      }}
      scroll={{
        x: 1000,
      
      }}
    /> }
      
    </Form>
  );
  
      };
      
      export default TablaModificarCliente;