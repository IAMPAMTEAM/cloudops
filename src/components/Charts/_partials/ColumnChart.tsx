import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: number[];
  categories: string[];
  name: string;
}

export const ColumnChart = (props: Props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: props.name,
        data: props.data,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false,
        },
        // export svg 버튼 삭제
        toolbar: {
          show: false,
        },
      },
      // bar color
      colors: ['#6667AB'],
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: props.categories,
        position: 'bottom',
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: true,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + '%';
          },
        },
      },
      title: {
        text: '',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444',
        },
      },
      grid: {
        show: false,
      },
    },
  });

  return (
    <section>
      {/* @ts-ignore */}
      <ReactApexChart options={chartData.options} series={chartData.series} type='bar' height={130} />
    </section>
  );
};
