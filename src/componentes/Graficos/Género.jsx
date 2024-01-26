import React, { useState, useEffect } from 'react';
import { Pie, G2 } from '@ant-design/plots';
import foto from './../../imagenes/user.webp'
import {HiDocumentDownload} from 'react-icons/hi'
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { write, utils } from 'xlsx';
import { Button, Tooltip } from 'antd';

export default function Género() {
  const G = G2.getEngine('canvas');
  const datatweets = [
    {
      sex: 'Masculino',
      sold: 155,
    },
    {
      sex: 'Femenino',
      sold: 123,
    },
    {
      sex: 'Otros',
      sold: 12,
    },
  ];
  const config = {
    legend: {
      position: 'bottom',
    },
    appendPadding: 10,
    data:datatweets,
    angleField: 'sold',
    colorField: 'sex',
    radius: 0.66,
    color: ['#1890ff', '#f04864', '#b7b7b7'],
    label: {
      content: (obj) => {
        const group = new G.Group({});
        group.addShape({
          type: 'image',
          attrs: {
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            img:
              obj.sex === 'Masculino'
                ? 'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png'
                : obj.sex === 'Femenino'
                ? 'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png'
                : 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
              
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  const handleDownloadExcel = () => {
    if (datatweets) {
      const worksheet = utils.json_to_sheet(datatweets);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Datos');
      const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(data, 'CuentasGenero.xlsx');
    }
  };




  return (
    <div>
      <div className='titulo-carta'>Género</div>
     
      
  <div className='subtitulo-carta'>
        <div>Cantidad de cuentas</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
      <Pie {...config} className='carta genero' />
    </div>
  );
}