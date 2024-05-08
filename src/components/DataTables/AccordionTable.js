import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnsToolPanelModule, MasterDetailModule, MenuModule, RangeSelectionModule]);
const AccordionTable = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        // group cell renderer needed for expand / collapse icons
        { field: 'GroupName', cellRenderer: 'agGroupCellRenderer' },
        { field: 'GroupId' },
        { field: 'VPCId' },
        { field: 'Description' },
        { field: 'Category' },
        { field: 'SGType' },
        { field: 'Manager' },
        { field: 'RuleType' },
        { field: 'Comment' },
        { field: 'DueDate' },
        { field: 'CheckType' },
        { field: 'CheckDate' },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);
    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                rowSelection: 'multiple',
                suppressRowClickSelection: true,
                enableRangeSelection: true,
                pagination: true,
                paginationAutoPageSize: true,
                columnDefs: [
                    { field: 'Type' },
                    { field: 'ProtocolType' },
                    { field: 'Protocol', minWidth: 150 },
                    { field: 'PortRange' },
                    { field: 'SrcDst', minWidth: 150 },
                    { field: 'Description' },
                    { field: 'Category' },
                    { field: 'Manager' },
                    { field: 'RuleType' },
                    { field: 'Comment' },
                    { field: 'DueDate' },
                    { field: 'CheckType' },
                    { field: 'CheckDate' },
                ],
                defaultColDef: {
                    flex: 1,
                },
            },
            getDetailRowData: (params) => {
                console.log(params.data.Direction);
                params.successCallback(params.data.Direction);
            },
        };
    }, []);
    const onGridReady = useCallback((params) => {
        fetch('http://localhost:3001/networkpolicy-aws-sg-test')
            .then((resp) => resp.json())
            .then((data) => {
            setRowData(data);
        });
    }, []);
    return (_jsx("div", { style: { height: 535 }, className: 'ag-theme-quartz-dark', children: _jsx(AgGridReact, { rowData: rowData, columnDefs: columnDefs, defaultColDef: defaultColDef, masterDetail: true, detailCellRendererParams: detailCellRendererParams, onGridReady: onGridReady }) }));
};
export default AccordionTable;
