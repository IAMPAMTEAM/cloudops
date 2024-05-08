import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
export const UpdatingPieChart = (props) => {
    const thisWeekData = props.data[0];
    const lastWeekData = props.data[1];
    const THIS_WEEK_SUB = 'This Week';
    const LAST_WEEK_SUB = 'Last Week';
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
                subtitle: {
                    text: THIS_WEEK_SUB,
                },
            },
        });
    };
    return (_jsxs("section", { children: [_jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: 'pie', height: 350 }), _jsxs("div", { className: 'flex justify-center mt-[81px] join', children: [_jsx("button", { className: 'btn join-item bg-[#A79277] border-none text-white', onClick: updateThisWeek, children: THIS_WEEK_SUB }), _jsx("button", { className: 'btn join-item bg-[#A79277] border-none text-white', onClick: updateLastWeek, children: LAST_WEEK_SUB })] })] }));
};
