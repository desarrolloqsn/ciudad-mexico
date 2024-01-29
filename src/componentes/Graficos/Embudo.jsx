

import React from "react";
import { Funnel } from "@ant-design/plots";

export default function Embudo(data) {
  const datos = data.data.map(item => ({
    stage: item.Influencer,
    followers: item.Seguidores,
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

  const configFollowers = {
    data: datos,
    xField: "stage",
    yField: "followers",
    meta: {
      stage: {
        alias: "Influencer",
      },
      followers: {
        alias: "Seguidores",
      },
    },
    tooltip: {
      fields: ["stage", "followers"],
      formatter: v => ({
        name: `Influencer: ${v.stage}`,
        value: `Seguidores: ${v.followers}`,
      }),
    },
    legend: false,
    conversionTag: false,
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Funnel {...configCentrality} />
        <Funnel {...configFollowers} />
      </div>
    </div>
  );
}

