import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridApi, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function DefaultDataTable({ tableData, tableOption }) {
  const defaultTableConfig = {
    tableHeight: 535,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
  };

  const gridRef = useRef<AgGridReact>(null);
  const gridApi = useRef<GridApi>();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [tableConfig, setTableConfig] = useState(defaultTableConfig);

  useEffect(() => {
    if (Array.isArray(tableData) && tableData.length > 0 && typeof tableData[0] === 'object' && tableData[0] !== null) {
      const keys = Object.keys(tableData[0]);
      const columns = keys.map((key) => ({ field: key }));
      // @ts-ignore
      setColumnDefs(columns);
      // @ts-ignore
      setRowData(tableData);
    }
    setTableConfig({ ...defaultTableConfig, ...tableOption });
  }, [tableData, tableOption]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
    }),
    []
  );

  const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy>(() => {
    return {
      type: 'fitCellContents',
    };
  }, []);

  return (
    <div className='ag-theme-alpine' style={{ height: tableConfig.tableHeight }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoSizeStrategy={autoSizeStrategy}
        pagination={tableConfig.pagination}
        paginationPageSize={tableConfig.paginationPageSize}
        paginationPageSizeSelector={tableConfig.paginationPageSizeSelector}
      />
    </div>
  );
}
