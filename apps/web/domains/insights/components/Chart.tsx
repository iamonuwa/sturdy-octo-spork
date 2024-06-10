import * as echarts from "echarts";

import React, { FC, useEffect } from "react";

type EChartsOption = echarts.EChartsOption;

type Props = {
  option?: EChartsOption;
};

export const Chart: FC<Props> = ({ option }) => {
  useEffect(() => {
    const chartDom = document.getElementById("main")!;
    const myChart = echarts.init(chartDom);

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [option]);

  return <div id="main" style={{ width: "100%", height: "400px" }} />;
};
