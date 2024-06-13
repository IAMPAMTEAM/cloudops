import ReactApexChart from 'react-apexcharts';

const CostChart = ({ title, labels, series }: { title: string; labels: any[]; series: any[] }) => {
  return (
    <ReactApexChart
      height={412}
      options={{
        labels,
        chart: {
          type: 'donut',
        },
        title: {
          // text: title,
          margin: 70,
          style: {
            fontSize: '1rem',
          },
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
