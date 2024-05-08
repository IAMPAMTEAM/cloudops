import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  series: number[];
  labels: string[];
}

export const PolarAreaChart = (props: Props) => {
  const [chartData, setChartData] = useState({
    series: props.series,
    options: {
      chart: {
        width: 380,
        type: 'polarArea',
      },
      labels: props.labels,
      fill: {
        opacity: 1,
        colors: ['#FFD700', '#FFA500', '#FF6347'],
      },
      stroke: {
        width: 1,
        colors: '#FEFDED',
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: 'bottom',
        markers: {
          fillColors: ['#FFD700', '#FFA500', '#FF6347'],
        },
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: 'light',
          shadeIntensity: 0.6,
        },
      },
      tooltip: {
        color: ['#FFD700', '#FFA500', '#FF6347'],
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        // @ts-ignore
        options={chartData.options}
        series={chartData.series}
        type='polarArea'
        height={350}
      />
    </div>
  );
};
