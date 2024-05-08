import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
export default function AccessPolicyAppTable() {
    const defaultTableConfig = {
        tableHeight: 535,
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 20, 50, 100],
    };
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'PolicyName',
        },
        {
            headerName: 'Infra Policy',
            children: [{ field: 'AWS' }, { field: 'IDC' }, { field: 'Hybrid' }],
        },
        {
            field: 'PasswordPolicy',
        },
        {
            headerName: 'App Policy',
            children: [
                { headerName: 'Jira', field: 'AppJira' },
                { headerName: 'ERP', field: 'AppERP' },
                { headerName: 'Jenkins', field: 'AppJenkins' },
                { headerName: 'Git', field: 'AppGit' },
            ],
        },
        {
            headerName: 'OTP Policy',
            children: [{ headerName: 'Git', field: 'OTPGit' }],
        },
    ]);
    const autoSizeStrategy = useMemo(() => {
        return {
            type: 'fitCellContents',
        };
    }, []);
    const onGridReady = useCallback((params) => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/accesspolicy-app.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);
    return (_jsx("div", { style: { height: 535 }, className: 'ag-theme-quartz', children: _jsx(AgGridReact, { rowData: rowData, columnDefs: columnDefs, autoSizeStrategy: autoSizeStrategy, onGridReady: onGridReady }) }));
}
