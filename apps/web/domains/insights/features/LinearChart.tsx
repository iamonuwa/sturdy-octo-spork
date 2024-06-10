"use client";

import { Chart } from "../components/Chart";
import React from "react";
import { useInsights } from "../api/insightQuery";

export const LinearChart = () => {
  const { data } = useInsights();
  const xAxisData = data?.map((item) =>
    new Date(item.created_at).toLocaleTimeString()
  );
  const memoryData = data?.map((item) => item.memory);
  const diskData = data?.map((item) => item.disk);

  return (
    <Chart
      option={{
        title: {
          text: "Memory and Disk Usage Over Time",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Memory", "Disk"],
        },
        xAxis: {
          type: "category",
          data: xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Memory",
            type: "line",
            data: memoryData,
          },
          {
            name: "Disk",
            type: "line",
            data: diskData,
          },
        ],
      }}
    />
  );
};
