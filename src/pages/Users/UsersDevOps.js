import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DefaultDataTable from '@/components/DataTables/DefaultDataTableFitWidth';
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
import { UpdatingPieChart } from '@/components/Charts/_partials/UpdatingPieChart';
import { VerticalBarChart } from '@/components/Charts/_partials/VerticalBarChart';
import { useEffect, useState } from 'react';
const UsersDevOps = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/iampam-zerotrust-v0.3_users-devops.json')
            .then((result) => result.json())
            .then((data) => {
            setTableData(data);
        });
    }, []);
    const data = [
        [280, 175, 390, 154, 140, 245],
        [410, 165, 305, 164, 245, 245],
    ];
    const categories = ['Onpremise', 'AWS', 'Azure', 'Server', 'DB', 'Network'];
    const piechartColors = ['#A87676', '#F1EF99', '#E1AFD1', '#9CAFAA', '#8E7AB5', '#AAD7D9'];
    const verticalBarData = [
        {
            name: 'Onpremise',
            data: [440, 550],
        },
        {
            name: 'AWS',
            data: [680, 850],
        },
        {
            name: 'Azure',
            data: [350, 410],
        },
        {
            name: 'Server',
            data: [350, 410],
        },
        {
            name: 'DB',
            data: [350, 401],
        },
        {
            name: 'Network',
            data: [135, 241],
        },
    ];
    const tableOption = {};
    const sortByDescendingOrder = (categories, data) => {
        return [...categories].sort((a, b) => {
            const valueA = data[categories.indexOf(a)];
            const valueB = data[categories.indexOf(b)];
            return valueB - valueA;
        });
    };
    // categories에 따라 내림차순으로 정렬된 배열 생성
    const sortedCategories1 = sortByDescendingOrder(categories, data[0]);
    const sortedCategories2 = sortByDescendingOrder(categories, data[1]);
    return (_jsx("div", { children: _jsxs("div", { className: 'grid gap-6', children: [_jsx("div", { className: 'grid lg:grid-cols-1 gap-6', children: _jsx("div", { className: 'panel', children: _jsx(DefaultDataTable, { tableData: tableData, tableOption: tableOption }) }) }), _jsxs("div", { className: 'grid lg:grid-cols-2 gap-6', children: [_jsx("div", { className: 'panel lg:col-span-1', children: _jsx(MultipleRadarChart, { data: data, title: 'Allowed Users Compare - Radar Chart', colors: ['#FFBB70', '#FFEC9E'], categories: categories }) }), _jsx("div", { className: 'panel lg:col-span-1', children: _jsx(UpdatingPieChart, { data: data, labels: categories, colors: piechartColors, title: 'Allowed Users Compare - Pie Chart' }) })] }), _jsxs("div", { className: 'grid lg:grid-cols-5 lg:grid-rows-3 gap-6', children: [_jsxs("div", { className: 'panel lg:col-span-1 lg:row-span-2', children: [_jsx("p", { children: "Last Week" }), _jsx("div", { className: 'overflow-x-auto', children: _jsxs("table", { className: 'table', children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", {}), _jsx("th", { children: "Category" }), _jsx("th", { children: "Users Count" })] }) }), _jsx("tbody", { children: sortedCategories1.map((category, idx) => {
                                                    return (_jsxs("tr", { children: [_jsx("th", { children: idx + 1 }), _jsx("td", { children: category }), _jsx("td", { children: data[0][categories.indexOf(category)] })] }, idx));
                                                }) })] }) })] }), _jsxs("div", { className: 'panel lg:col-span-1 lg:row-span-2', children: [_jsx("p", { children: "This Week" }), _jsx("div", { className: 'overflow-x-auto', children: _jsxs("table", { className: 'table', children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", {}), _jsx("th", { children: "Category" }), _jsx("th", { children: "Users Count" })] }) }), _jsx("tbody", { children: sortedCategories1.map((category, idx) => {
                                                    return (_jsxs("tr", { children: [_jsx("th", { children: idx + 1 }), _jsx("td", { children: category }), _jsx("td", { children: data[1][categories.indexOf(category)] })] }, idx));
                                                }) })] }) })] }), _jsx("div", { className: 'panel lg:col-span-3 lg:row-span-3', children: _jsx(VerticalBarChart, { data: verticalBarData, colors: ['#B5C18E', '#F7DCB9', '#F3D0D7', '#9BB0C1', '#A5DD9B', '#E2BFB3'], categories: ['Last Week', 'This Week'] }) }), _jsx("div", { className: 'panel lg:col-span-2 lg:row-span-1' })] })] }) }));
};
export default UsersDevOps;
