import { useState } from 'react';
import './ModificarCliente.css'
import { Table, Input, Form, Typography, Popconfirm, Tooltip, Button } from 'antd';
import { SlPencil, SlTrash } from 'react-icons/sl'
import TablaSubSeries from './Subseries';
import TablaClientes from './Clientes';
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { RiUserAddLine } from 'react-icons/ri'
import CrearSerie from '../Formularios/Crear/FormCrearSerie';
import CrearSubSerie from '../Formularios/Crear/FormCrearSubserie';
import { TbBrowserPlus } from 'react-icons/tb';
import { SiServerfault } from 'react-icons/si'


const TablaSeries = () => {

  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState(false)
  const [form] = Form.useForm();
  const [data, setData] = useState(() => {
    const initialData = []
     for (let i = 0; i < 100; i++) {
      initialData.push({
        key: i.toString(),
        Series: `Serie ${i}`,
       });
    }

    return initialData;
  });
 
  const renderExpandedContent = () => {
     
    return <div className='tablas-series-clientes'><div className='tabla'><TablaSubSeries /></div><div className='tabla'><TablaClientes/></div></div>
  };
  const defaultExpandable = {
    expandedRowRender: renderExpandedContent,
  };
  const [editingKey, setEditingKey] = useState('');
  const [expandable, setExpandable] = useState(defaultExpandable);
  const handleExpandChange = (enable) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };
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
      title: 'Series',
      dataIndex: 'Series',
      width: '50%',
      editable: true,
      
      fixed: 'left',
    },
 
    {
      title: 'Editar',
      dataIndex: 'operation',
      width: '20%',
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
      width: "20%",
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
  
  const tableProps = {
    expandable
  };

  function handleAdd(){
    setOpen(!open)
  }

  function handleAddSub(){
    setOpenSub(!openSub)
  }
  
  return (
    <Form form={form} component={false}>
      <div className='nombreDashboard'>Lista de Series</div>
      <div className='botones-agregar'>
       <div className='agregar-cliente'>
       <Tooltip title="Agregar Serie">
              <Button type="primary" shape="circle" icon={<TbBrowserPlus />} style={{background:"#00284e"}} onClick={handleAdd}/>
        </Tooltip>
        {open ? <CrearSerie/> : null}
        {openSub ? <CrearSubSerie/> : null}
        </div>
        <div className='agregar-cliente'>
       <Tooltip title="Agregar SubSerie">
              <Button type="primary" shape="circle" icon={<SiServerfault />} style={{background:"#00284e"}} onClick={handleAddSub}/>
        </Tooltip>
        </div>
        </div>
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
          x: 1000,
        
        }}
      />
    </Form>
  );
  
      };
      
      export default TablaSeries;

      