import { AgGridReact } from 'ag-grid-react';
import { SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface IDataTable {
  children: ReactNode;
  datas: any[];
  columnDefs: any[];
  defaultTableSetting: any;
  tableHeight: number;
  pagination: boolean;
  paginationPageSize: number;
  paginationPageSizeSelector: number[];
}

export default function EventViewer({ children, datas, columnDefs, defaultTableSetting, tableHeight, pagination, paginationPageSize, paginationPageSizeSelector }: IDataTable) {
  const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy>(() => {
    return defaultTableSetting.autoSizeStrategy;
  }, [defaultTableSetting.autoSizeStrategy]);

  const gridRef = useRef<AgGridReact>(null);

  const onBtnCSVExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  const onBtnExcelExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        {children}
        <div className='flex'>
          <button onClick={onBtnCSVExport} className='bg-sky-500 font-bold text-white px-2 py-2 rounded-md mr-2'>
            Download CSV
          </button>
          <button onClick={onBtnExcelExport} className='bg-sky-500 font-bold text-white px-2 py-2 rounded-md'>
            Download Excel
          </button>
        </div>
      </div>
      <div style={{ height: tableHeight }} className={'ag-theme-quartz'}>
        <AgGridReact
          ref={gridRef}
          rowData={datas}
          columnDefs={columnDefs}
          defaultColDef={defaultTableSetting.defaultColDef}
          autoSizeStrategy={autoSizeStrategy}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  );
}