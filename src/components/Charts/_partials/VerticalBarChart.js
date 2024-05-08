import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
export const VerticalBarChart = (props) => {
    const [chartData, setChartData] = useState({
        series: props.data,
        options: {
            chart: {
                type: 'bar',
                height: 300,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '35%',
                    endingShape: 'rounded',
                },
            },
            colors: props.colors,
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: props.categories,
            },
            fill: {
                opacity: 1,
            },
        },
    });
    return (_jsx("div", { children: _jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: 'bar' }) }));
};
