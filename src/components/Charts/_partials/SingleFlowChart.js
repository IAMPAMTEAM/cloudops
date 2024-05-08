import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import IconCircleCheck from '../../Icon/IconCircleCheck';
export const SingleFlowChart = (props) => {
    const [chartData, setChartData] = useState({
        series: [
            {
                data: props.series,
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: [props.color],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    });
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex", children: [_jsx(IconCircleCheck, { className: "m-1 mr-2" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-lg", children: props.categoryEn }), _jsx("p", { className: "font-thin", children: props.category })] })] }), _jsx(ReactApexChart, { options: { ...chartData.options, chart: { ...chartData.options.chart, type: 'line' } }, series: chartData.series, type: "line", height: 45 }), _jsx("div", { className: "mt-5", children: props.updatePoint > 0 ? _jsxs("p", { className: "text-[#219C90]", children: ["+", props.updatePoint, "%"] }) : _jsxs("p", { className: "text-[#FF204E]", children: [props.updatePoint, "%"] }) })] }));
};
