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
      colors: [
        '#9aa7e8',
        '#8b5795',
        '#6667ab',
        '#e087b5',
        '#ea435d',
        '#d75078',
        '#e53935',
        '#c22626',
        '#d67d6f',
        '#e2c0be',
        '#d3927e',
        '#c5acaf',
        '#d67d6f',
        '#8e7860',
        '#7b635f',
        '#edc371',
        '#ed8c00',
        '#cfbe54',
        '#fbf665',
        '#dbe961',
        '#92c766',
        '#47996b',
        '#a1c9c8',
        '#668b8a',
        '#849fa8',
        '#568392',
        '#75b0de',
        '#3c71a5',
        '#585dc6',
      ],
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
        colors: [
          '#9aa7e8',
          '#8b5795',
          '#6667ab',
          '#e087b5',
          '#ea435d',
          '#d75078',
          '#e53935',
          '#c22626',
          '#d67d6f',
          '#e2c0be',
          '#d3927e',
          '#c5acaf',
          '#d67d6f',
          '#8e7860',
          '#7b635f',
          '#edc371',
          '#ed8c00',
          '#cfbe54',
          '#fbf665',
          '#dbe961',
          '#92c766',
          '#47996b',
          '#a1c9c8',
          '#668b8a',
          '#849fa8',
          '#568392',
          '#75b0de',
          '#3c71a5',
          '#585dc6',
        ],
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
        colors: [
          '#9aa7e8',
          '#8b5795',
          '#6667ab',
          '#e087b5',
          '#ea435d',
          '#d75078',
          '#e53935',
          '#c22626',
          '#d67d6f',
          '#e2c0be',
          '#d3927e',
          '#c5acaf',
          '#d67d6f',
          '#8e7860',
          '#7b635f',
          '#edc371',
          '#ed8c00',
          '#cfbe54',
          '#fbf665',
          '#dbe961',
          '#92c766',
          '#47996b',
          '#a1c9c8',
          '#668b8a',
          '#849fa8',
          '#568392',
          '#75b0de',
          '#3c71a5',
          '#585dc6',
        ],
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
      <div className='flex justify-center mt-[2.4rem] join'>
        <button className='btn join-item bg-[#999] border-none text-white min-w-[100px] hover:bg-[#333]' onClick={updateThisWeek}>
          {SUB1}
        </button>
        <button className='btn join-item bg-[#999] border-none text-white min-w-[100px] hover:bg-[#333]' onClick={updateLastWeek}>
          {SUB2}
        </button>
      </div>
    </section>
  );
};
