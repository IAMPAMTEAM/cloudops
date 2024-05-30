import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: number[];
  labels: string[];
  colors: string[];
  title: string;
  SUB: string;
}

export const PieChart = (props: Props) => {
  const data: number[] = props.data;

  const SUB: string = props.SUB;

  const [chartData, setChartData] = useState({
    series: data,
    options: {
      chart: {
        width: 500,
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
      },
      labels: props.labels,
      colors: props.colors,
      title: {
        text: props.title,
        margin: 20,
        style: {
          fontSize: 15,
        },
      },
      subtitle: {
        text: SUB,
        style: {
          fontSize: 12,
          fontWeight: '5',
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      },
    },
  });

  return (
    <section>
      <ReactApexChart
        // @ts-ignore
        options={chartData.options}
        series={chartData.series}
        type='pie'
        height={500}
      />
    </section>
  );
};
