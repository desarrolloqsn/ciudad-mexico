import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';

export default function DemoArea(){

    
const data=
  [
    {
        "country": "Positivo",
        "date": 0,
        "value": 48.3
    },
    {
        "country": "Positivo",
        "date": 1,
        "value": 105
    },
    {
        "country": "Positivo",
        "date": 2,
        "value": 52.7
    },
    {
        "country": "Positivo",
        "date": 3,
        "value": 45
    },
    {
        "country": "Positivo",
        "date": 4,
        "value": 68
    },
    {
        "country": "Positivo",
        "date": 5,
        "value": 75
    },
    {
        "country": "Positivo",
        "date": 6,
        "value": 64.9
    },
    {
        "country": "Positivo",
        "date": 7,
        "value": 70.6
    },
    {
        "country": "Positivo",
        "date": 8,
        "value": 77.4
    },
    {
        "country": "Positivo",
        "date": 9,
        "value": 82.3
    },
    {
        "country": "Positivo",
        "date": 10,
        "value": 82.1
    },
    {
        "country": "Positivo",
        "date": 11,
        "value": 93
    },
    {
        "country": "Positivo",
        "date": 12,
        "value": 105.7
    },
    {
        "country": "Positivo",
        "date": 13,
        "value": 111
    },
    {
        "country": "Positivo",
        "date": 14,
        "value": 130.5
    },
    {
        "country": "Positivo",
        "date": 15,
        "value": 126.5
    },
    {
        "country": "Positivo",
        "date": 16,
        "value": 137.9
    },
    {
        "country": "Positivo",
        "date": 17,
        "value": 152.8
    },
    {
        "country": "Positivo",
        "date": 18,
        "value": 167.1
    },
    {
        "country": "Positivo",
        "date": 19,
        "value": 188.9
    },
    {
        "country": "Positivo",
        "date": 20,
        "value": 200.8
    },
    {
        "country": "Positivo",
        "date": 21,
        "value": 209.8
    },
    {
        "country": "Positivo",
        "date": 22,
        "value": 224.5
    },
    {
        "country": "Positivo",
        "date": 23,
        "value": 238.5
    },
    {
        "country": "Positivo",
        "date": 24,
        "value": 251.5
    },
    
    {
        "country": "Neutro",
        "date": 0,
        "value": 60.6
    },
    {
        "country": "Neutro",
        "date": 1,
        "value": 63.3
    },
    {
        "country": "Neutro",
        "date": 2,
        "value": 64
    },
    {
        "country": "Neutro",
        "date": 3,
        "value": 54
    },
    {
        "country": "Neutro",
        "date": 4,
        "value": 68.9
    },
    {
        "country": "Neutro",
        "date": 5,
        "value": 74.7
    },
    {
        "country": "Neutro",
        "date": 6,
        "value": 81.2
    },
    {
        "country": "Neutro",
        "date": 7,
        "value": 86.3
    },
    {
        "country": "Neutro",
        "date": 8,
        "value":25
    },
    {
        "country": "Neutro",
        "date": 9,
        "value": 97.6
    },
    {
        "country": "Neutro",
        "date": 10,
        "value": 103.3
    },
    {
        "country": "Neutro",
        "date": 11,
        "value": 112.4
    },
    {
        "country": "Neutro",
        "date": 12,
        "value": 180
    },
    {
        "country": "Neutro",
        "date": 13,
        "value": 123.1
    },
    {
        "country": "Neutro",
        "date": 14,
        "value": 134.4
    },
    {
        "country": "Neutro",
        "date": 15,
        "value": 144.8
    },
    {
        "country": "Neutro",
        "date": 16,
        "value": 161.5
    },
    {
        "country": "Neutro",
        "date": 17,
        "value": 42
    },
    {
        "country": "Neutro",
        "date": 18,
        "value": 177.5
    },
    {
        "country": "Neutro",
        "date": 19,
        "value": 183.7
    },
    {
        "country": "Neutro",
        "date": 20,
        "value": 240
    },
    {
        "country": "Neutro",
        "date": 21,
        "value": 195.1
    },
    {
        "country": "Neutro",
        "date": 22,
        "value": 201.2
    },
    {
        "country": "Neutro",
        "date": 23,
        "value": 215.7
    },
    {
        "country": "Neutro",
        "date": 24,
        "value": 216.3
    },
  
    {
        "country": "Negativo",
        "date": 0,
        "value": 75
    },
    {
        "country": "Negativo",
        "date": 1,
        "value": 482.9
    },
    {
        "country": "Negativo",
        "date": 2,
        "value": 96
    },
    {
        "country": "Negativo",
        "date": 3,
        "value": 544.1
    },
    {
        "country": "Negativo",
        "date": 4,
        "value": 619.8
    },
    {
        "country": "Negativo",
        "date": 5,
        "value": 704.9
    },
    {
        "country": "Negativo",
        "date": 6,
        "value": 771.4
    },
    {
        "country": "Negativo",
        "date": 7,
        "value": 175
    },
    {
        "country": "Negativo",
        "date": 8,
        "value": 885.1
    },
    {
        "country": "Negativo",
        "date": 9,
        "value": 902.2
    },
    {
        "country": "Negativo",
        "date": 10,
        "value": 936.1
    },
    {
        "country": "Negativo",
        "date": 11,
        "value": 465
    },
    {
        "country": "Negativo",
        "date": 12,
        "value": 1037.3
    },
    {
        "country": "Negativo",
        "date": 13,
        "value": 1106.2
    },
    {
        "country": "Negativo",
        "date": 14,
        "value": 1157.6
    },
    {
        "country": "Negativo",
        "date": 15,
        "value": 247
    },
    {
        "country": "Negativo",
        "date": 16,
        "value": 1175
    },
    {
        "country": "Negativo",
        "date": 17,
        "value": 1186.8
    },
    {
        "country": "Negativo",
        "date": 18,
        "value": 1240.7
    },
    {
        "country": "Negativo",
        "date": 19,
        "value": 1326.7
    },
    {
        "country": "Negativo",
        "date": 20,
        "value": 785
    },
    {
        "country": "Negativo",
        "date": 21,
        "value": 556
    },
    {
        "country": "Negativo",
        "date": 22,
        "value": 1200
    },
    {
        "country": "Negativo",
        "date": 23,
        "value": 1263
    },
    {
        "country": "Negativo",
        "date": 24,
        "value": 1300
    }
]




  const config = {
    color: '#14ae5c88-#a0a0a023-#ff6e6e88',
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'country',
    slider: {
      start: 0,
      end: 1,
    },
  };

  return <Area {...config} className='lineaEventos' />;
};