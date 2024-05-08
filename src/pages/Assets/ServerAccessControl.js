import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DefaultDataTable from '@/components/DataTables/DefaultDataTableFitWidth';
import { StackedVerticalBarChart } from '@/components/Charts/_partials/StackedVerticalBarChart';
import { UpdatingPieChart } from '@/components/Charts/_partials/UpdatingPieChart';
import { useEffect, useState } from 'react';
const ServerAccessControl = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/iampam-zerotrust-v0.3_assets-server-accesscontrol.json')
            .then((result) => result.json())
            .then((data) => {
            setTableData(data);
        });
    }, []);
    const stackedVerticalBarData = [
        {
            name: 'AWS',
            data: [440, 550],
        },
        {
            name: 'Onpremise',
            data: [190, 230],
        },
    ];
    const updatingPieChartData = [
        [200, 150],
        [410, 490],
    ];
    const catgegories = ['Last Week', 'This Week'];
    const stackedVerticalBarColors = ['#FF76CE', '#A3D8FF'];
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'panel', children: _jsx(DefaultDataTable, { tableData: tableData, tableOption: {} }) }), _jsxs("div", { className: 'grid lg:grid-cols-5 gap-6', children: [_jsxs("div", { className: 'panel lg:col-span-2 flex flex-col', children: [_jsx(StackedVerticalBarChart, { data: stackedVerticalBarData, categories: catgegories, colors: stackedVerticalBarColors, title: 'Infra Type Compare' }), _jsxs("div", { className: 'stats stats-vertical lg:stats-horizontal shadow bg-[#F0F3FF]', children: [_jsxs("div", { className: 'stat text-center hover:opacity-70 hover:cursor-pointer', children: [_jsx("div", { className: 'stat-title', children: "Last Week" }), _jsx("div", { className: 'stat-value', children: "630" })] }), _jsxs("div", { className: 'stat text-center hover:opacity-70 hover:cursor-pointer', children: [_jsx("div", { className: 'stat-title', children: "This Week" }), _jsx("div", { className: 'stat-value', children: "780" })] })] })] }), _jsx("div", { className: 'panel lg:col-span-3', children: _jsx(UpdatingPieChart, { data: updatingPieChartData, labels: ['CestOS', 'Windows'], title: 'OS Type Compare', colors: ['#EA5455', '#EEB0B0'] }) })] })] }) }));
};
export default ServerAccessControl;
