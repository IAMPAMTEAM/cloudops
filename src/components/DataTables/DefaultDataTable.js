import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
export default function DefaultDataTable({ tableData, tableOption }) {
    const defaultTableConfig = {
        tableHeight: 535,
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 20, 50, 100],
    };
    const gridRef = useRef(null);
    const gridApi = useRef();
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [tableConfig, setTableConfig] = useState(defaultTableConfig);
    useEffect(() => {
        if (Array.isArray(tableData) && tableData.length > 0 && typeof tableData[0] === 'object' && tableData[0] !== null) {
            const keys = Object.keys(tableData[0]);
            const columns = keys.map((key) => ({ field: key }));
            setColumnDefs(columns);
            setRowData(tableData);
        }
        setTableConfig({ ...defaultTableConfig, ...tableOption });
    }, [tableData, tableOption]);
    const defaultColDef = useMemo(() => ({
        filter: true,
    }), []);
    const autoSizeStrategy = useMemo(() => {
        return {
            type: 'fitCellContents',
        };
    }, []);
    return (_jsx("div", { className: "ag-theme-alpine", style: { height: tableConfig.tableHeight }, children: _jsx(AgGridReact, { ref: gridRef, rowData: rowData, columnDefs: columnDefs, defaultColDef: defaultColDef, autoSizeStrategy: autoSizeStrategy, pagination: tableConfig.pagination, paginationPageSize: tableConfig.paginationPageSize, paginationPageSizeSelector: tableConfig.paginationPageSizeSelector }) }));
}
