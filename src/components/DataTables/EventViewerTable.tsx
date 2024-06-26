import { AgGridReact } from 'ag-grid-react';
import { ColDef, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
// import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CreateData from '@/pages/EventViewer/_partials/CreateData';

interface IDataTable {
  children: ReactNode;
  datas: any[];
  columnDefs: any[];
  defaultTableSetting: any;
  tableHeight: number;
  pagination: boolean;
  paginationPageSize: number;
  paginationPageSizeSelector: number[];
  getOnclickRowData: any;
}

export default function EventViewer({ children, datas, columnDefs, defaultTableSetting, tableHeight, pagination, paginationPageSize, paginationPageSizeSelector, getOnclickRowData }: IDataTable) {
  const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy>(() => {
    return defaultTableSetting.autoSizeStrategy;
  }, [defaultTableSetting.autoSizeStrategy]);

  const [rowData, setRowData] = useState<any[]>([]);

  const gridRef = useRef<AgGridReact>(null);

  const onBtnCSVExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  const onBtnExcelExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    getOnclickRowData(selectedRows[0]);
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      setRowData(datas);

      const interval = setInterval(() => {
        const newData = CreateData();
        setRowData((prevData) => [...newData, ...prevData]);

        setTimeout(() => {
          for (let i = 0; i < newData.length; i++) {
            gridRef.current!.api.flashCells({ flashDuration: 2000, fadeDuration: 1000, rowNodes: [gridRef.current!.api.getDisplayedRowAtIndex(i)!] });
          }
        }, 1);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [datas]);

  // const autoGroupColumnDef = useMemo<ColDef>(() => {
  //   return {
  //     headerCheckboxSelection: true,
  //     field: 'status',
  //     flex: 1,
  //     cellRendererParams: {
  //       checkbox: true,
  //     },
  //   };
  // }, []);

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        {children}
        <div className='flex'>
          <button onClick={onBtnCSVExport} className='bg-[#6667AB] font-bold text-white px-2 py-2 rounded-md mr-2'>
            Download CSV
          </button>
          <button onClick={onBtnExcelExport} className='bg-[#6667AB] font-bold text-white px-2 py-2 rounded-md'>
            Download Excel
          </button>
        </div>
      </div>

      <div style={{ height: tableHeight }} className={'ag-theme-quartz'}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          // autoGroupColumnDef={autoGroupColumnDef}
          defaultColDef={defaultTableSetting.defaultColDef}
          autoSizeStrategy={autoSizeStrategy}
          rowSelection={'multiple'}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </>
  );
}
