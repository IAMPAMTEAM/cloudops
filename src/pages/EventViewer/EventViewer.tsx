import { useEffect, useRef, useState } from 'react';

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

interface IRowDataDetails {
  status: string;
  date: string;
  time: string;
  where: string;
  who: string;
  what: string;
  counts: number | null;
  details: object;
}
const defaultRowDataDetails: IRowDataDetails = {
  status: '',
  date: '',
  time: '',
  where: '',
  who: '',
  what: '',
  counts: null,
  details: {},
};

const EventViewer = () => {
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [mergedTableData, setMergedTableData] = useState<any[]>([]);
  const [rowDataDetails, setRowDataDetails] = useState<IRowDataDetails>(defaultRowDataDetails);

  const setDefaultTableSetting = SetDefaultTableSetting(tableOption);

  useEffect(() => {
    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    mergedColumnDefs.forEach((columnDef) => {
      if (columnDef.cellRenderer === 'statusRenderer') {
        columnDef.cellRenderer = statusRenderer;
      } else if (columnDef.cellRenderer === 'countsRenderer') {
        columnDef.cellRenderer = countsRenderer;
      }
    });
    setColumnDefs(mergedColumnDefs);

    const mergedData = MergeTagData(tableData, userTag, awsTag);
    setMergedTableData(mergedData);
  }, []);

  return (
    <>
      <div className='panel pb-4'>
        <EventViewerTable
          datas={mergedTableData}
          columnDefs={columnDefs}
          defaultTableSetting={setDefaultTableSetting}
          tableHeight={tableOption.tableHeight}
          pagination={tableOption.pagination}
          paginationPageSize={tableOption.paginationPageSize}
          paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
          getOnclickRowData={(data: any) => {
            setRowDataDetails(data || defaultRowDataDetails);
          }}
        >
          <p className='text-lg'>Event Viewer</p>
        </EventViewerTable>
      </div>
      <div className='panel mt-6'>
        <p className='text-lg pb-8'>Details</p>

        <div className='flex flex-row pb-4 gap-[2.4rem]'>
          <div className='basis-1/2'>
            <label className='font-medium'>Status</label>
            <input
              type='text'
              readOnly
              className='w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
              placeholder={rowDataDetails?.status || defaultRowDataDetails.status}
            />
          </div>
          <div className='basis-1/2'>
            <label className='font-medium'>Where</label>
            <input
              type='text'
              readOnly
              className='w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
              placeholder={rowDataDetails?.where || defaultRowDataDetails.where}
            />
          </div>
          <div className='basis-1/2'>
            <label className='font-medium'>Date</label>
            <input
              type='text'
              readOnly
              className='w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
              placeholder={rowDataDetails?.date || defaultRowDataDetails.date}
            />
          </div>
          <div className='basis-1/2'>
            <label className='font-medium'>Who</label>
            <input
              type='text'
              readOnly
              className='w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
              placeholder={rowDataDetails?.who || defaultRowDataDetails.who}
            />
          </div>
        </div>

        <div className='flex flex-row pb-4 gap-[2.4rem] mt-[0.8rem]'>
          <div className='basis-1/2 '>
            <label className='font-medium'>Time</label>
            <input
              type='text'
              readOnly
              className='w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
              placeholder={rowDataDetails?.time || defaultRowDataDetails.time}
            />
          </div>
          <div className='basis-1/2'>
            <label className='font-medium'>What</label>
            <input
              type='text'
              readOnly
              className='w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
              placeholder={rowDataDetails?.what || defaultRowDataDetails.what}
            />
          </div>
          <div className='basis-1/2'>
            <label className='font-medium'>Counts</label>
            <input
              type='text'
              readOnly
              className='w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
              placeholder={(rowDataDetails?.counts !== null ? rowDataDetails.counts.toString() : '') || (defaultRowDataDetails.counts !== null ? defaultRowDataDetails.counts.toString() : '')}
            />
          </div>
          <div className='basis-1/2'>
            <label className='font-medium'>Who</label>
            <input
              type='text'
              readOnly
              className='w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6'
              placeholder={rowDataDetails?.who || defaultRowDataDetails.who}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventViewer;
