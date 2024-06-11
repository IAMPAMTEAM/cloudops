import ReactApexChart from 'react-apexcharts';

const CostChart = ({ title, labels, series }: { title: string; labels: any[]; series: any[] }) => {
  return (
    <ReactApexChart
      options={{
        labels,
        chart: {
          type: 'donut',
        },
        title: {
          text: title,
          margin: 20,
          style: {
            fontSize: 15,
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
                position: 'bottom',
              },
            },
          },
        ],
      }}
      series={series}
      type='donut'
    />
  );
};

export default CostChart;
