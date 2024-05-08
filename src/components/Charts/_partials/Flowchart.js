import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
const Flowchart = () => {
    const isDark = useSelector((state) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 0,
                type: 'area',
                fontFamily: 'inherit',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: false,
                curve: '',
                width: 0,
                lineCap: '',
            },
            dropShadow: {
                enabled: false,
                opacity: 0,
                blur: 0,
                left: 0,
                top: 0,
            },
            colors: {
                dark: [],
                light: [],
            },
            markers: {
                discrete: [],
            },
            labels: [],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: false,
                },
                labels: {
                    offsetX: {
                        right: 0,
                        left: 0,
                    },
                    offsetY: 0,
                    style: {
                        fontSize: '',
                        cssClass: '',
                    },
                },
            },
            yaxis: {
                tickAmount: 0,
                labels: {
                    formatter: function (value) {
                        throw new Error('Function not implemented.');
                    },
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        fontSize: '',
                        cssClass: '',
                    },
                },
                opposite: false,
            },
            grid: {
                borderColor: {
                    dark: '',
                    light: '',
                },
                strokeDashArray: 0,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: '',
                horizontalAlign: '',
                fontSize: '',
                markers: {
                    width: 0,
                    height: 0,
                    offsetX: 0,
                },
                itemMargin: {
                    horizontal: 0,
                    vertical: 0,
                },
            },
            tooltip: {
                marker: {
                    show: false,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: '',
                gradient: {
                    shadeIntensity: 0,
                    inverseColors: false,
                    opacityFrom: {
                        dark: 0,
                        light: 0,
                    },
                    opacityTo: 0,
                    stops: {
                        dark: [],
                        light: [],
                    },
                },
            },
        },
    });
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3002/datas');
                const json = await response.json();
                setChartData(json.datas);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    const revenueChart = {
        series: [
            {
                name: 'Income',
                data: 'TODO: Add data',
            },
            {
                name: 'Expenses',
                data: 'TODO: Add data',
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: ['#0079FF', '#FF4B91'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#0079FF',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#FF4B91',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.28,
                    opacityTo: 0.05,
                    stops: [45, 100],
                },
            },
        },
    };
    return (_jsx("div", { children: loading ? (_jsx("div", { className: "min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ", children: _jsx("span", { className: "animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex" }) })) : (_jsx(ReactApexChart, { series: chartData.series, options: revenueChart.options, type: "area", height: 325 })) }));
};
export default Flowchart;
