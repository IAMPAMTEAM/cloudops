import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: {
    name: string;
    data: number[];
  }[];
  colors: string[];
  title: string;
  categories: string[];
  strokeWidth: number[];
}

export const MultipleLineChart = (props: Props) => {
  const [chartData, setChartData] = useState({
    series: [{}],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 0],
        curve: 'smooth',
      },
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
        text: '',
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [''],
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },
  });

  useEffect(() => {
    const connectData = async () => {
      setChartData({
        series: props.data,
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
            animations: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          stroke: {
            width: props.strokeWidth,
            curve: 'smooth',
          },
          colors: [
            '#edc371',
            '#c22626',
            '#47996b',
            '#9aa7e8',
            '#8b5795',
            '#6667ab',
            '#e087b5',
            '#ea435d',
            '#d75078',
            '#e53935',
            '#d67d6f',
            '#e2c0be',
            '#d3927e',
            '#c5acaf',
            '#d67d6f',
            '#8e7860',
            '#7b635f',
            '#ed8c00',
            '#cfbe54',
            '#fbf665',
            '#dbe961',
            '#92c766',
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
          },
          grid: {
            show: false,
          },
          xaxis: {
            categories: props.categories,
            labels: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: true,
            },
          },
        },
      });
    };

    connectData();
  }, [props.categories, props.colors, props.data, props.title]);

  return (
    <section>
      {/* @ts-ignore */}
      <ReactApexChart options={chartData.options} series={chartData.series} type='line' height={400} />
    </section>
  );
};
