
import React from "react";
import { Funnel } from "@ant-design/plots";

export default function EmbudoSimple(data) {
    const datos = data.data.map(item => ({
        stage: item.Influencer,
        centrality: item.Centralidad,
      }));
    
      const configCentrality = {
        data: datos,
        xField: "stage",
        yField: "centrality",
        meta: {
          stage: {
            alias: "Influencer",
          },
          centrality: {
            alias: "Centralidad (%)",
            formatter: v => `${v}%`,
          },
        },
        tooltip: {
          fields: ["stage", "centrality"],
          formatter: v => ({
            name: `Influencer: ${v.stage}`,
            value: `Centralidad: ${v.centrality}%`,
          }),
        },
        legend: false,
        conversionTag: false,
      };
    
      
    
      return (
        <div>
          <div >
            <Funnel {...configCentrality} />
          </div>
        </div>
      );
}
