import React, { useState, useEffect } from 'react';
import { Rose } from '@ant-design/plots';

export default function DemoRose(){
  const data = [
    {
      type: 'Alegría',
      value: 27,
    },
    {
      type: 'Miedo',
      value: 25,
    },
    {
      type: 'Ira',
      value: 18,
    },
    {
      type: 'Tristeza',
      value: 15,
    },
    {
      type: 'Aversión',
      value: 10,
    },
    {
      type: 'Confianza',
      value: 5,
    },
  ];


  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
  
    state: {
      active: {
        style: {
          lineWidth: 0,
          fillOpacity: 0.65,
        },
      },
    },
    legend: {
      position: 'bottom',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Rose {...config} />;
};
