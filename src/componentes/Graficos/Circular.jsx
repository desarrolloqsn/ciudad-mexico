import { Pie } from '@ant-design/plots'
import React from 'react'


export default function Circular({data}) {
  
    // const configRadialExterno = {
    //     data: data,
    //     xField: "Influencer",
    //     yField: "Centralidad",
    //     // maxAngle: 270,
    //     radius: 0.8,
    //     // innerRadius: 0.2,
    //     colorField:"Influencer",
    //     barStyle: {
    //       lineCap: "round",
    //     },
    //   };

    const configRadialExterno = {
        appendPadding: 10,
        data,
        angleField: 'Centralidad',
        colorField: 'Influencer',
        radius: 0.8,
        label: {
          type: 'outer',
          content: (dataItem) => `${dataItem.Influencer}: ${dataItem.Centralidad}`,
        },
        interactions: [
          {
            type: 'pie-legend-active',
          },
          {
            type: 'element-active',
          },
        ],
      };
  return (
    <div >
         <Pie
          {...configRadialExterno}
        />
    </div>
  )
}
