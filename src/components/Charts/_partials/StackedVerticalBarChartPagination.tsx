import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: {
    name: string;
    data: number[];
  }[];
  colors: string[];
  categories: string[];
  title: string;
  itemsPerPage: number; // 페이지당 항목 수
}

export const StackedVerticalBarChartPagination = (props: Props) => {
  // 데이터와 카테고리를 역순으로 정렬
  const sortedCategories = [...props.categories].reverse();
  const sortedData = props.data.map((series) => ({
    ...series,
    data: [...series.data].reverse(),
  }));

  // 데이터의 총 페이지 수를 계산합니다.
  const totalPages = Math.ceil(sortedCategories.length / props.itemsPerPage);
  // 초기 페이지를 가장 최신 날짜가 있는 페이지로 설정합니다.
  const [currentPage, setCurrentPage] = useState(0);

  // 데이터를 페이지 단위로 분할하는 함수입니다.
  const paginateData = (data: any[], page: number, itemsPerPage: number) => {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    return data.map((series) => ({
      ...series,
      data: series.data.slice(start, end).reverse(), // 페이지 데이터도 역순으로
    }));
  };

  const paginatedSeries = paginateData(sortedData, currentPage, props.itemsPerPage);
  const paginatedCategories = sortedCategories.slice(currentPage * props.itemsPerPage, (currentPage + 1) * props.itemsPerPage).reverse();

  const [chartData, setChartData] = useState({
    series: paginatedSeries,
    options: {
      colors: props.colors,
      title: {
        text: props.title,
        margin: 40,
      },
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          columnWidth: '20%',
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: 'end', // 'around', 'end'
          borderRadiusWhenStacked: 'last', // 'all', 'last'
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: 'string',
        categories: paginatedCategories,
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      series: paginatedSeries,
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: paginatedCategories,
        },
      },
    });
  }, [currentPage, props.data, props.categories]);

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ReactApexChart
        // @ts-ignore
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height={350}
      />
      <div className='flex items-center justify-between'>
        <button className='btn shadow-none' onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button className='btn shadow-none' onClick={handleNextPage} disabled={(currentPage + 1) * props.itemsPerPage >= props.categories.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StackedVerticalBarChartPagination;
