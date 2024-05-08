import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import OnclickGetRowDataTable from '@/components/DataTables/OnclickGetRowDataTable';
import { useEffect, useState } from 'react';
import Account from '@/components/Approval/Account';
import Policy from '@/components/Approval/Policy';
const WorkflowMain = () => {
    const [tableData, setTableData] = useState([]);
    const [rowData, setRowData] = useState({
        formCategory: null,
        formType: '',
        formRequestWho: '',
        formRequestWhat: 'new',
        formRequestWhen: '',
        formStatus: 'approved',
        formDueDate: '',
        formProcess: '',
        formNotes: '',
        formAccountUri: '',
        formAccessResourcesUri: '',
    });
    const [formType, setFormType] = useState('');
    // const [onclickRowData, setOnclickRowData] = useState('');
    // const getOnclickRowData = useCallback((d) => {
    //   setRowData(d);
    // }, []);
    // const getOnclickRowData = (d) => {
    //   console.log(d);
    //   // console.log('rowdata', rowData);
    // };
    useEffect(() => {
        fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/workflow-origin.json')
            .then((result) => result.json())
            .then((data) => setTableData(data));
        setFormType(rowData['formType']);
    }, []);
    return (_jsxs("div", { children: [_jsx("div", { className: 'grid gap-6', children: _jsx("div", { className: 'panel', children: _jsx(OnclickGetRowDataTable, { tableData: tableData, tableOption: {}, getOnclickRowData: (d) => {
                            setRowData(d);
                        } }) }) }), _jsx("div", { className: 'pt-6', children: rowData['formCategory'] === null ? _jsx("div", {}) : rowData['formCategory'] === 'account' ? _jsx(Account, {}) : rowData['formCategory'] === 'access' ? _jsx(Policy, { formType: rowData['formType'] }) : '' })] }));
};
export default WorkflowMain;
