import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: number[][];
  labels: string[];
  colors: string[];
  title: string;
}

export const UpdatingPieChart = (props: Props) => {
  const thisWeekData: number[] = props.data[0];
  const lastWeekData: number[] = props.data[1];

  const THIS_WEEK_SUB: string = 'This Week';
  const LAST_WEEK_SUB: string = 'Last Week';

  const [chartData, setChartData] = useState({
    series: thisWeekData,
    options: {
      chart: {
        width: 380,
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
        text: THIS_WEEK_SUB,
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
      series: lastWeekData,
      options: {
        // @ts-ignore
        subtitle: {
          text: LAST_WEEK_SUB,
        },
      },
    });
  };

  const updateThisWeek = () => {
    setChartData({
      ...chartData,
      series: thisWeekData,
      options: {
        // @ts-ignore
        subtitle: {
          text: THIS_WEEK_SUB,
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
          {THIS_WEEK_SUB}
        </button>
        <button className='btn join-item bg-[#A79277] border-none text-white' onClick={updateLastWeek}>
          {LAST_WEEK_SUB}
        </button>
      </div>
    </section>
  );
};
