import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Flowchart from '@/components/Charts/_partials/Flowchart';
import { PolarAreaChart } from '@/components/Charts/_partials/PoloarAreaChart';
import { SingleFlowChart } from '@/components/Charts/_partials/SingleFlowChart';
function Test() {
    const [rowData, setRowData] = useState([
        {
            userName: 'John Doe',
            name: 'John',
            employeeStatus: 'Working',
            email: 'test@mz.co.kr',
            mobile: '010-1234-5678',
            category: 'HR',
            manager: 'Jane Doe',
            comment: '',
            checkDate: new Date(),
        },
        {
            userName: 'Dane Doe',
            name: 'Jane',
            employeeStatus: 'Working',
            email: 'test2@mz.co.kr',
            mobile: '010-1234-5178',
            category: 'HR',
            manager: 'John Doe',
            comment: '',
            checkDate: new Date(),
        },
        {
            userName: 'Harry Doe',
            name: 'Harry',
            employeeStatus: 'Working',
            email: 'harry@mz.co.kr',
            mobile: '010-1234-5678',
            category: 'HR',
            manager: 'Jane Doe',
            comment: '',
            checkDate: new Date(),
        },
    ]);
    const [colDefs, setColDefs] = useState([
        { field: 'userName', headerName: 'User Name', width: 200 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'employeeStatus', headerName: 'Employee Status', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'manager', headerName: 'Manager', width: 130 },
        { field: 'comment', headerName: 'Comment', width: 350, editable: true },
        { field: 'checkDate', headerName: 'Check Date', width: 150 },
    ]);
    return (_jsx("div", { children: _jsxs("div", { className: "grid gap-6", children: [_jsx("div", { className: "grid lg:grid-cols-1 gap-6", children: _jsx("div", { className: "panel", children: _jsx("div", { className: "ag-theme-quartz", style: { height: 300 }, children: _jsx(AgGridReact, { rowData: rowData, columnDefs: colDefs }) }) }) }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "panel lg:col-span-2", children: _jsx(Flowchart, {}) }), _jsx("div", { className: "panel lg:col-span-1", children: _jsx(PolarAreaChart, { series: [42, 47, 52], labels: ['정규직', '계약직', '협력업체'] }) })] }), _jsxs("div", { className: "grid lg:grid-cols-5 lg:grid-rows-2 gap-6", children: [_jsx("div", { className: "panel lg:col-span-1 lg:row-span-1", children: _jsx(SingleFlowChart, { series: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66], category: "\uC815\uADDC\uC9C1", color: "#00ab55", updatePoint: 0.25 }) }), _jsx("div", { className: "panel lg:col-span-1 lg:row-span-1", children: _jsx(SingleFlowChart, { series: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66], category: "\uACC4\uC57D\uC9C1", color: "#FF204E", updatePoint: -0.7 }) }), _jsxs("div", { className: "panel flex justify-center lg:col-span-3 lg:row-span-2", children: [_jsx("div", { className: "bg-red-500 rounded-full w-10 h-10 absolute" }), _jsx("div", { className: "bg-red-500 rounded-full w-10 h-10" })] }), _jsx("div", { className: "panel lg:col-span-1 lg:row-span-1", children: _jsx(SingleFlowChart, { series: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66], category: "\uD611\uB825\uC5C5\uCCB4", color: "#4793AF", updatePoint: 0.5 }) }), _jsx("div", { className: "panel lg:col-span-1 lg:row-span-1", children: _jsx(SingleFlowChart, { category: "Total", color: "#219C90", series: [10, 30, 15, 40, 29, 11, 33, 66, 11], updatePoint: 0.1 }) })] })] }) }));
}
export default Test;
