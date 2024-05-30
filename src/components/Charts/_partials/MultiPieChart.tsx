import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: number[][];
  labels: string[][];
  colors: string[][];
  title: string;
  SUB: string[];
}

export const MultiPieChart = (props: Props) => {
  const data1: number[] = props.data[0];
  const data2: number[] = props.data[1];

  const SUB1: string = props.SUB[0];
  const SUB2: string = props.SUB[1];

  const [chartData, setChartData] = useState({
    series: data1,
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
      },
      labels: props.labels[0],
      colors: props.colors[0],
      title: {
        text: props.title,
        margin: 20,
        style: {
          fontSize: 15,
        },
      },
      subtitle: {
        text: SUB1,
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

  const updateLastWeek = () => {
    setChartData({
      ...chartData,
      series: data2,
      options: {
        labels: props.labels[1],
        colors: props.colors[1],
        // @ts-ignore
        subtitle: {
          text: SUB2,
        },
      },
    });
  };

  const updateThisWeek = () => {
    setChartData({
      ...chartData,
      series: data1,
      options: {
        labels: props.labels[0],
        colors: props.colors[0],
        // @ts-ignore
        subtitle: {
          text: SUB1,
        },
      },
    });
  };

  return (
    <section>
      <ReactApexChart
        // @ts-ignore
        options={chartData.options}
        series={chartData.series}
        type='pie'
        height={350}
      />
      <div className='flex justify-center mt-[81px] join'>
        <button className='btn join-item bg-[#A79277] border-none text-white' onClick={updateThisWeek}>
          {SUB1}
        </button>
        <button className='btn join-item bg-[#A79277] border-none text-white' onClick={updateLastWeek}>
          {SUB2}
        </button>
      </div>
    </section>
  );
};
