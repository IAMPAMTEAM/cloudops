import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
export const TreemapChart = (props) => {
    const [chartData, setChartData] = useState({
        series: [
            {
                data: props.data,
            },
        ],
        options: {
            legend: {
                show: false,
            },
            colors: props.colors,
            chart: {
                height: 150,
                type: 'treemap',
            },
            title: {
                text: props.title,
            },
        },
    });
    return (_jsx("div", { children: _jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: 'treemap' }) }));
};
