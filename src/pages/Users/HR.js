import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SingleFlowChart } from '@/components/Charts/_partials/SingleFlowChart';
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
import { UpdatingPieChart } from '@/components/Charts/_partials/UpdatingPieChart';
import { VerticalBarChart } from '@/components/Charts/_partials/VerticalBarChart';
import DefaultDataTable from '@/components/DataTables/DefaultDataTableFitWidth';
import { useState, useEffect } from 'react';
const UserTest = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/iampam-zerotrust-v0.3_user-hr.json')
            .then((result) => result.json())
            .then((data) => {
            setTableData(data);
        });
    }, []);
    const tableOption = {};
    const data = [
        [700, 620, 340, 520, 170, 324],
        [710, 600, 310, 510, 410, 450],
    ];
    const verticalBarData = [
        {
            name: 'Full Time',
            data: [440, 550],
        },
        {
            name: 'Part Time',
            data: [680, 850],
        },
        {
            name: 'Temporary',
            data: [350, 410],
        },
        {
            name: 'Intern',
            data: [350, 410],
        },
        {
            name: 'Contactor',
            data: [350, 401],
        },
        {
            name: 'Freelance',
            data: [135, 241],
        },
    ];
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'grid lg:grid-cols-1 gap-6', children: _jsx("div", { className: 'panel', children: _jsx(DefaultDataTable, { tableData: tableData, tableOption: tableOption }) }) }), _jsxs("div", { className: 'grid lg:grid-cols-5 gap-6', children: [_jsx("div", { className: 'panel lg:col-span-2', children: _jsx(MultipleRadarChart, { data: data, title: 'Employee Type Compare - Radar Chart', colors: ['#F27BBD', '#FFCBCB'], categories: ['Full Time', 'Part Time', 'Temporary', 'Intern', 'Contractor', 'Freelance'] }) }), _jsx("div", { className: 'panel lg:col-span-2', children: _jsx(UpdatingPieChart, { data: data, labels: ['Full Time', 'Part Time', 'Temporary', 'Intern', 'Contractor', 'Freelance'], colors: ['#FFA1F5', '#BC7AF9', '#4d5dc5', '#A6FF96', '#B5F1CC', '#FF8787'], title: 'Employee Type Compare - Pie Chart' }) }), _jsx("div", { className: 'panel lg:col-span-1', children: _jsxs("div", { className: 'stats stats-vertical shadow', children: [_jsxs("div", { className: 'stat', children: [_jsx("div", { className: 'stat-figure text-primary', children: _jsx("svg", { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', className: 'inline-block w-8 h-8 stroke-current', children: _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' }) }) }), _jsx("div", { className: 'stat-title', children: "This Week" }), _jsx("div", { className: 'stat-value text-primary', children: "3.1K" }), _jsx("div", { className: 'stat-desc', children: "3% more than last week" })] }), _jsxs("div", { className: 'stat', children: [_jsx("div", { className: 'stat-figure text-secondary', children: _jsx("svg", { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', className: 'inline-block w-8 h-8 stroke-current', children: _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' }) }) }), _jsx("div", { className: 'stat-title', children: "Last Week" }), _jsx("div", { className: 'stat-value text-secondary', children: "3.0k" }), _jsx("div", { className: 'stat-desc', children: "2% more than last week" })] })] }) })] }), _jsxs("div", { className: 'grid lg:grid-cols-5 lg:grid-rows-2 gap-6', children: [_jsx("div", { className: 'panel lg:col-span-1 lg:row-span-1', children: _jsx(SingleFlowChart, { series: [21, 66], category: '\uC815\uADDC\uC9C1', categoryEn: 'Full Time', color: '#219C90', updatePoint: 0.25 }) }), _jsx("div", { className: 'panel lg:col-span-1 lg:row-span-1', children: _jsx(SingleFlowChart, { category: '\uC2DC\uAC04\uC81C', categoryEn: 'Part Time', color: '#FF204E', series: [50, 31], updatePoint: -0.1 }) }), _jsx("div", { className: 'panel lg:col-span-1 lg:row-span-1', children: _jsx(SingleFlowChart, { series: [21, 66], category: '\uACC4\uC57D\uC9C1', categoryEn: 'Temporary', color: '#219C90', updatePoint: 0.7 }) }), _jsx("div", { className: 'panel lg:col-span-2 lg:row-span-2', children: _jsx(VerticalBarChart, { data: verticalBarData, colors: ['#FFA1F5', '#BC7AF9', '#4d5dc5', '#A6FF96', '#B5F1CC', '#FF8787'], categories: ['Last Week', 'This Week'] }) }), _jsx("div", { className: 'panel lg:col-span-1 lg:row-span-1', children: _jsx(SingleFlowChart, { category: '\uC778\uD134', categoryEn: 'Intern', color: '#FF204E', series: [50, 31], updatePoint: -0.1 }) }), _jsx("div", { className: 'panel lg:col-span-1 lg:row-span-1', children: _jsx(SingleFlowChart, { series: [21, 66], category: '\uD611\uB825\uC5C5\uCCB4', categoryEn: 'contractor', color: '#219C90', updatePoint: 0.5 }) }), _jsx("div", { className: 'panel lg:col-span-1 lg:row-span-1', children: _jsx(SingleFlowChart, { category: '\uD504\uB9AC\uB79C\uC11C', categoryEn: 'Freelance', color: '#FF204E', series: [50, 31], updatePoint: -0.1 }) })] })] }) }));
};
export default UserTest;
