import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: {
    name: string;
    data: number[];
  }[];
  colors: string[];
  categories: string[];
}

export const VerticalBarChart = (props: Props) => {
  const [chartData, setChartData] = useState({
    series: props.data,
    options: {
      chart: {
        type: 'bar',
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '35%',
          endingShape: 'rounded',
        },
      },
      colors: props.colors,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: props.categories,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        // @ts-ignore

        options={chartData.options}
        series={chartData.series}
        type='bar'
      />
    </div>
  );
};
