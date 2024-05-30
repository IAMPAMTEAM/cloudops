import { AgGridReact } from 'ag-grid-react';
import { SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useMemo } from 'react';

interface IDataTable {
  datas: any[];
  columnDefs: any[];
  defaultTableSetting: any;
  tableHeight: number;
  pagination: boolean;
  paginationPageSize: number;
  paginationPageSizeSelector: number[];
}

export default function DataTable({ datas, columnDefs, defaultTableSetting, tableHeight, pagination, paginationPageSize, paginationPageSizeSelector }: IDataTable) {
  const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy>(() => {
    return defaultTableSetting.autoSizeStrategy;
  }, [defaultTableSetting.autoSizeStrategy]);

  return (
    <div style={{ height: tableHeight }} className={'ag-theme-quartz'}>
      <AgGridReact
        rowData={datas}
        columnDefs={columnDefs}
        defaultColDef={defaultTableSetting.defaultColDef}
        autoSizeStrategy={autoSizeStrategy}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
}
