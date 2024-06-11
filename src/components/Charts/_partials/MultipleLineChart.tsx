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
      colors: [''],
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
          colors: props.colors,
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
