import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
export const StackedVerticalBarChart = (props) => {
    const [chartData, setChartData] = useState({
        series: props.data,
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
                    borderRadiusApplication: 'end',
                    borderRadiusWhenStacked: 'last',
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
                categories: props.categories,
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
    return (_jsx("div", { children: _jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: 'bar', height: 350 }) }));
};
