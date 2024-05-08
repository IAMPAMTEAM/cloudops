import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DefaultDataTable from '@/components/DataTables/DefaultDataTableFitWidth';
import { useEffect, useState } from 'react';
import { TreemapChart } from '@/components/Charts/_partials/TreemapChart';
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
import { VerticalBarChart } from '@/components/Charts/_partials/VerticalBarChart';
const UsersSaaS = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/iampam-zerotrust-v0.3_users-saas.json')
            .then((result) => result.json())
            .then((data) => {
            setTableData(data);
        });
    }, []);
    const radarData = [
        [365, 250, 119, 370],
        [448, 279, 89, 410],
    ];
    const categories = ['Notion', 'Office365', 'Bitbucket', 'Slack'];
    const treemapData = [
        {
            x: 'Notion',
            y: 165,
        },
        {
            x: 'Office365',
            y: 250,
        },
        {
            x: 'Bitbucket',
            y: 119,
        },
        {
            x: 'Slack',
            y: 310,
        },
    ];
    const verticalBarData = [
        {
            name: 'Notion',
            data: [365, 448],
        },
        {
            name: 'Office365',
            data: [250, 279],
        },
        {
            name: 'Bitbucket',
            data: [119, 89],
        },
        {
            name: 'Slack',
            data: [370, 410],
        },
    ];
    const treemapColors = ['#5356FF'];
    const sortByDescendingOrder = (categories, radarData) => {
        return [...categories].sort((a, b) => {
            const valueA = radarData[categories.indexOf(a)];
            const valueB = radarData[categories.indexOf(b)];
            return valueB - valueA;
        });
    };
    // categories에 따라 내림차순으로 정렬된 배열 생성
    const sortedCategories1 = sortByDescendingOrder(categories, radarData[0]);
    const sortedCategories2 = sortByDescendingOrder(categories, radarData[1]);
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'panel', children: _jsx(DefaultDataTable, { tableData: tableData, tableOption: {} }) }), _jsxs("div", { className: 'grid gap-6 lg:grid-cols-5', children: [_jsxs("div", { className: 'panel lg:col-span-2 flex flex-col', children: [_jsx(MultipleRadarChart, { data: radarData, title: '', colors: ['#7A316F', '#CD6688'], categories: categories }), _jsxs("div", { className: 'stats stats-vertical lg:stats-horizontal shadow bg-[#F0F3FF]', children: [_jsxs("div", { className: 'stat text-center hover:opacity-70 hover:cursor-pointer', children: [_jsx("div", { className: 'stat-title', children: "1st of Last Week" }), _jsx("div", { className: 'stat-value', children: "Slack" })] }), _jsxs("div", { className: 'stat text-center hover:opacity-70 hover:cursor-pointer', children: [_jsx("div", { className: 'stat-title', children: "1st of This Week" }), _jsx("div", { className: 'stat-value', children: "Notion" })] })] })] }), _jsx("div", { className: 'panel lg:col-span-3', children: _jsx(TreemapChart, { data: treemapData, title: 'Allowed APP Users Compare', colors: treemapColors }) })] }), _jsxs("div", { className: 'grid lg:grid-cols-5 lg:grid-rows-2 gap-6', children: [_jsxs("div", { className: 'panel lg:col-span-1 lg:row-span-1', children: [_jsx("p", { children: "Last Week" }), _jsx("div", { className: 'overflow-x-auto', children: _jsxs("table", { className: 'table', children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", {}), _jsx("th", { children: "Category" }), _jsx("th", { children: "Users Count" })] }) }), _jsx("tbody", { children: sortedCategories1.map((category, idx) => {
                                                    return (_jsxs("tr", { children: [_jsx("th", { children: idx + 1 }), _jsx("td", { children: category }), _jsx("td", { children: radarData[0][categories.indexOf(category)] })] }, idx));
                                                }) })] }) })] }), _jsxs("div", { className: 'panel lg:col-span-1 lg:row-span-1', children: [_jsx("p", { children: "This Week" }), _jsx("div", { className: 'overflow-x-auto', children: _jsxs("table", { className: 'table', children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", {}), _jsx("th", { children: "Category" }), _jsx("th", { children: "Users Count" })] }) }), _jsx("tbody", { children: sortedCategories2.map((category, idx) => {
                                                    return (_jsxs("tr", { children: [_jsx("th", { children: idx + 1 }), _jsx("td", { children: category }), _jsx("td", { children: radarData[1][categories.indexOf(category)] })] }, idx));
                                                }) })] }) })] }), _jsx("div", { className: 'panel lg:col-span-3 lg:row-span-2', children: _jsx(VerticalBarChart, { data: verticalBarData, colors: ['#0C356A', '#279EFF', '#40F8FF', '#D5FFD0'], categories: ['Last Week', 'This Week'] }) }), _jsx("div", { className: 'panel lg:col-span-2 lg:row-span-1', children: "TODO: Stats Card" })] })] }) }));
};
export default UsersSaaS;
