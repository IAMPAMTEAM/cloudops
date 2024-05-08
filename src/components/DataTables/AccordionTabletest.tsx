import { useCallback, useMemo, useState, useEffect } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import { ColDef, ColGroupDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, ModuleRegistry, createGrid } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnsToolPanelModule, MasterDetailModule, MenuModule, RangeSelectionModule]);

export default function AccordionTabletest({ tableData, detailTableCol, tableOption }) {
  const defaultTableConfig = {
    tableHeight: 535,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 50, 100],
  };
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [detailTableColumnDefs, setDetailTableColumnDefs] = useState([]);
  const [tableConfig, setTableConfig] = useState(defaultTableConfig);

  useEffect(() => {
    if (Array.isArray(tableData) && tableData.length > 0 && typeof tableData[0] === 'object' && tableData[0] !== null) {
      const keys = Object.keys(tableData[0]);
      const columns = keys.filter((key) => key !== detailTableCol).map((key, index) => ({ field: key, ...(index === 0 && { cellRenderer: 'agGroupCellRenderer' }) }));
      const detailKeys = Object.keys(tableData[0][detailTableCol][0]);
      const detailTableColumns = detailKeys.map((key) => ({ field: key }));
      // @ts-ignore
      setColumnDefs(columns);
      // @ts-ignore
      setDetailTableColumnDefs(detailTableColumns);
      // @ts-ignore
      setRowData(tableData);
    }
    setTableConfig({ ...defaultTableConfig, ...tableOption });
  }, [tableData, tableOption]);

  const defaultColDef = useMemo(
    () => ({
      filter: true,
      flex: 1,
    }),
    []
  );

  const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy>(() => {
    return {
      type: 'fitCellContents',
    };
  }, []);

  const detailCellRendererParams = {
    detailGridOptions: {
      rowSelection: 'multiple',
      suppressRowClickSelection: true,
      enableRangeSelection: true,
      // pagination: true,
      // paginationAutoPageSize: true,
      columnDefs: detailTableColumnDefs,
      defaultColDef: {
        flex: 1,
      },
      autoSizeStrategy: { type: 'fitCellContents' },
    },
    getDetailRowData: (params) => {
      const detailData = params.data[detailTableCol];
      params.successCallback(detailData);
    },
  };

  return (
    <div style={{ height: 535 }} className={'ag-theme-quartz'}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoSizeStrategy={autoSizeStrategy}
        pagination={tableConfig.pagination}
        paginationPageSize={tableConfig.paginationPageSize}
        paginationPageSizeSelector={tableConfig.paginationPageSizeSelector}
        masterDetail={true}
        detailCellRendererParams={detailCellRendererParams}
      />
    </div>
  );
}
