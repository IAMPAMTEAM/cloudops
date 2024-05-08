import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: {
    x: string;
    y: number;
  }[];
  colors: string[];
  title: string;
}

export const TreemapChart = (props: Props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: props.data,
      },
    ],
    options: {
      legend: {
        show: false,
      },
      colors: props.colors,
      chart: {
        height: 150,
        type: 'treemap',
      },
      title: {
        text: props.title,
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        // @ts-ignore
        options={chartData.options}
        series={chartData.series}
        type='treemap'
      />
    </div>
  );
};
