import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
export default function AccessPolicySaaSTable() {
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
            headerName: 'SaaS Policy',
            children: [
                { headerName: 'Slack', field: 'SaaSslack' },
                { headerName: 'Notion', field: 'SaaSnotion' },
                { headerName: 'BitBucket', field: 'SaaSbitbucket' },
                { headerName: 'Office365', field: 'SaaSoffice365' },
            ],
        },
        {
            headerName: 'OTP Policy',
            children: [{ headerName: 'BitBucket', field: 'OTPbitbucket' }],
        },
    ]);
    const autoSizeStrategy = useMemo(() => {
        return {
            type: 'fitCellContents',
        };
    }, []);
    const onGridReady = useCallback((params) => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/accesspolicy-saas.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);
    return (_jsx("div", { style: { height: 535 }, className: 'ag-theme-quartz', children: _jsx(AgGridReact, { rowData: rowData, columnDefs: columnDefs, autoSizeStrategy: autoSizeStrategy, onGridReady: onGridReady }) }));
}
