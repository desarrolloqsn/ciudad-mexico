import React, { useState, useEffect } from 'react';
import { BidirectionalBar } from '@ant-design/plots';

export default function DemoBidirectionalBar () {
 
  const data = [
    {
      country: 'Autoridad',
      'Positivo': 13.4,
      'Negativo': 12.3,
    },
    {
      country: 'Eficiencia',
      'Positivo': 14.4,
      'Negativo': 6.3,
    },
    {
      country: 'Responsabilidad',
      'Positivo': 18.4,
      'Negativo': 8.3,
    },
    {
      country: 'Experiencia',
      'Positivo': 34.4,
      'Negativo': 13.8,
    },
    {
      country: 'Popularidad',
      'Positivo': 44.4,
      'Negativo': 19.5,
    },
    {
      country: 'Coherencia',
      'Positivo': 24.4,
      'Negativo': 18.8,
    },
    {
      country: 'Comunicativo',
      'Positivo': 54.4,
      'Negativo': 24.7,
    },
   
  ];
  const config = {
    data,
    xField: 'country',
    xAxis: {
      position: 'bottom',
    },
    interactions: [
      {
        type: 'active-region',
      },
    ],
    yField: ['Positivo', 'Negativo'],
    tooltip: {
      shared: true,
      showMarkers: false,
    },
    color: ['#14ae5c99','#ff00006d']
    
  };
  return <div>
  <div className='titulo-carta'>Hashtags</div>
   <div className='subtitulo-carta'>Hashtags más mencionados</div>
   <BidirectionalBar {...config} className='genero' />
   </div>;
};