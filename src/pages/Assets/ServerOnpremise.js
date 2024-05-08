import { jsx as _jsx } from "react/jsx-runtime";
import DefaultDataTable from '@/components/DataTables/DefaultDataTableFitWidth';
import { useEffect, useState } from 'react';
const ServerOnpremise = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch('https://lhh-iampam-demodata.s3.ap-northeast-2.amazonaws.com/iampam-zerotrust-v0.3_assets-server-onpremise.json')
            .then((result) => result.json())
            .then((data) => {
            setTableData(data);
        });
    }, []);
    return (_jsx("div", { children: _jsx("div", { className: 'grid gap-6', children: _jsx("div", { className: 'panel', children: _jsx(DefaultDataTable, { tableData: tableData, tableOption: {} }) }) }) }));
};
export default ServerOnpremise;
