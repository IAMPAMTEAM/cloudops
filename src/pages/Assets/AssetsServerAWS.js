import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DefaultDataTable from '@/components/DataTables/DefaultDataTableFitWidth';
import { StackedVerticalBarChart } from '@/components/Charts/_partials/StackedVerticalBarChart';
import { UpdatingPieChart } from '@/components/Charts/_partials/UpdatingPieChart';
import { useEffect, useState } from 'react';
const AssetsServerAWS = () => {
    const tableOption = {};
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/iampam-zerotrust-v0.3_assets-server-aws.json')
            .then((result) => result.json())
            .then((data) => {
            setTableData(data);
        });
    }, []);
    const stackedVerticalBarData = [
        {
            name: 'AWS',
            data: [140, 310],
        },
        {
            name: 'Onpremise',
            data: [290, 230],
        },
    ];
    const catgegories = ['Last Week', 'This Week'];
    const stackedVerticalBarColors = ['#BC7FCD', '#FFCDEA'];
    const updatingPieChartData = [
        [200, 250],
        [305, 248],
    ];
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'panel', children: _jsx(DefaultDataTable, { tableData: tableData, tableOption: tableOption }) }), _jsxs("div", { className: 'grid lg:grid-cols-2 gap-6', children: [_jsxs("div", { className: 'panel lg:col-span-1 flex flex-col', children: [_jsx(StackedVerticalBarChart, { data: stackedVerticalBarData, categories: catgegories, title: 'Instance State Compare', colors: stackedVerticalBarColors }), _jsxs("div", { className: 'stats stats-vertical lg:stats-horizontal shadow bg-[#F0F3FF]', children: [_jsxs("div", { className: 'stat text-center hover:opacity-70 hover:cursor-pointer', children: [_jsx("div", { className: 'stat-title', children: "Stopped" }), _jsx("div", { className: 'stat-value', children: "430" })] }), _jsxs("div", { className: 'stat text-center hover:opacity-70 hover:cursor-pointer', children: [_jsx("div", { className: 'stat-title', children: "Running" }), _jsx("div", { className: 'stat-value', children: "540" })] })] })] }), _jsx("div", { className: 'panel lg:col-span-1', children: _jsx(UpdatingPieChart, { data: updatingPieChartData, labels: ['Stopped', 'Running'], title: 'Instance State Compare', colors: ['#F3D0D7', '#FFEFEF'] }) })] })] }) }));
};
export default AssetsServerAWS;
