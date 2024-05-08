import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Account from '@/components/Approval/Account';
import Policy from '@/components/Approval/Policy';
import DefaultDataTable from '@/components/DataTables/DefaultDataTable';
import { useEffect, useState } from 'react';
const Approval = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/users-hr')
            .then((result) => result.json())
            .then((data) => {
            setRowData(data);
        });
    }, []);
    return (_jsx("div", { children: _jsxs("div", { className: "flex flex-col gap-6", children: [_jsx("div", { className: "panel min-h-[400px]", children: _jsx(DefaultDataTable, { tableData: rowData }) }), isClicked ? _jsx(Account, {}) : _jsx(Policy, {})] }) }));
};
export default Approval;
