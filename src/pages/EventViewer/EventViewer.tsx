import { useEffect, useState } from 'react';

import EventViewerTable from '@/components/DataTables/EventViewerTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import statusRenderer from '@/pages/EventViewer/_partials/StatusRenderer';
import countsRenderer from '@/pages/EventViewer/_partials/CountsRenderer';
import '@/assets/css/dataTableStyle.css';

import tableData from '@/pages/EventViewer/data/tableData-cloudOps-eventViewer.json';
import tableOption from '@/pages/EventViewer/data/tableOption-cloudOps-eventViewer.json';
import userTag from '@/pages/EventViewer/data/userTag-cloudOps-eventViewer.json';
import awsTag from '@/pages/EventViewer/data/awsTag-cloudOps-eventViewer.json';

const EventViewer = () => {
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [mergedTableData, setMergedTableData] = useState<any[]>([]);
  const setDefaultTableSetting = SetDefaultTableSetting(tableOption);

  useEffect(() => {
    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    mergedColumnDefs.forEach((columnDef) => {
      if (columnDef.cellRenderer === 'statusRenderer') {
        columnDef.cellRenderer = statusRenderer;
      } else if (columnDef.cellRenderer === 'countsRenderer') {
        columnDef.cellRenderer = countsRenderer; // columnDef.cellRenderer = countsRenderer;
      }
    });
    setColumnDefs(mergedColumnDefs);

    const mergedData = MergeTagData(tableData, userTag, awsTag);
    setMergedTableData(mergedData);
  }, []);

  return (
    <>
      <div className='panel'>
        <EventViewerTable
          datas={mergedTableData}
          columnDefs={columnDefs}
          defaultTableSetting={setDefaultTableSetting}
          tableHeight={tableOption.tableHeight}
          pagination={tableOption.pagination}
          paginationPageSize={tableOption.paginationPageSize}
          paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
        >
          <p className='text-lg pb-4'>Event Viewer</p>
        </EventViewerTable>
      </div>
    </>
  );
};

export default EventViewer;
