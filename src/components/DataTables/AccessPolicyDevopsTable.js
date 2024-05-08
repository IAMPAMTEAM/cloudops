import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
export default function AccessPolicyDevopsTable() {
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
            children: [
                { field: 'AWS', maxWidth: 70 },
                { field: 'IDC', maxWidth: 60 },
                { field: 'Hybrid', maxWidth: 80 },
            ],
        },
        {
            field: 'PasswordPolicy',
        },
        {
            headerName: 'Portal Policy',
            children: [
                { headerName: 'Mgmt', field: 'Management' },
                { field: 'Diag' },
                { headerName: 'Monitor', field: 'Monitoring' },
                { field: 'Audit' },
                { field: 'Approval' },
                { field: 'Admin' },
                { field: 'Debug' },
            ],
        },
        {
            headerName: 'Access Privilage',
            children: [
                { field: 'Server' },
                { field: 'DB' },
                { field: 'VPN' },
                { field: 'Network' },
                { headerName: 'AWS-IAM', field: 'AWSIAM' },
                { headerName: 'AWS EC2 Key', field: 'AWSEC2Key' },
                { headerName: 'AWS IAM/S3 Key', field: 'AWSIAMS3Key' },
                { headerName: 'LotteDFS SVN', field: 'LotteDFSSVN' },
                { headerName: 'LotteDFS VDI', field: 'LotteDFSVDI' },
                { headerName: 'LotteDFS JIRA', field: 'LotteDFSJIRA' },
            ],
        },
        {
            headerName: 'OTP Policy',
            children: [
                { field: 'OTPServer', maxWidth: 110 },
                { field: 'OTPDB', maxWidth: 90 },
                { field: 'OTPVPN', maxWidth: 110 },
                { field: 'OTPPortal', maxWidth: 110 },
            ],
        },
    ]);
    const autoSizeStrategy = useMemo(() => {
        return {
            type: 'fitCellContents',
        };
    }, []);
    const onGridReady = useCallback((params) => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/accesspolicy-devops.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);
    return (_jsx("div", { style: { height: 535 }, className: 'ag-theme-quartz', children: _jsx(AgGridReact, { rowData: rowData, columnDefs: columnDefs, autoSizeStrategy: autoSizeStrategy, onGridReady: onGridReady }) }));
}
