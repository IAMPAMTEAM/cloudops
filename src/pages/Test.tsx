import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import Flowchart from '@/components/Charts/_partials/Flowchart';
import { PolarAreaChart } from '@/components/Charts/_partials/PoloarAreaChart';
import { SingleFlowChart } from '@/components/Charts/_partials/SingleFlowChart';

function Test() {
  const [rowData, setRowData] = useState([
    {
      userName: 'John Doe',
      name: 'John',
      employeeStatus: 'Working',
      email: 'test@mz.co.kr',
      mobile: '010-1234-5678',
      category: 'HR',
      manager: 'Jane Doe',
      comment: '',
      checkDate: new Date(),
    },
    {
      userName: 'Dane Doe',
      name: 'Jane',
      employeeStatus: 'Working',
      email: 'test2@mz.co.kr',
      mobile: '010-1234-5178',
      category: 'HR',
      manager: 'John Doe',
      comment: '',
      checkDate: new Date(),
    },
    {
      userName: 'Harry Doe',
      name: 'Harry',
      employeeStatus: 'Working',
      email: 'harry@mz.co.kr',
      mobile: '010-1234-5678',
      category: 'HR',
      manager: 'Jane Doe',
      comment: '',
      checkDate: new Date(),
    },
  ]);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: 'userName', headerName: 'User Name', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'employeeStatus', headerName: 'Employee Status', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'manager', headerName: 'Manager', width: 130 },
    { field: 'comment', headerName: 'Comment', width: 350, editable: true },
    { field: 'checkDate', headerName: 'Check Date', width: 150 },
  ]);

  return (
    <div>
      <div className='grid gap-6'>
        <div className='grid lg:grid-cols-1 gap-6'>
          <div className='panel'>
            <div className='ag-theme-quartz' style={{ height: 300 }}>
              <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div>
          </div>
        </div>
        <div className='grid lg:grid-cols-3 gap-6'>
          <div className='panel lg:col-span-2'>
            <Flowchart />
          </div>
          <div className='panel lg:col-span-1'>
            <PolarAreaChart series={[42, 47, 52]} labels={['정규직', '계약직', '협력업체']} />
          </div>
        </div>
        <div className='grid lg:grid-cols-5 lg:grid-rows-2 gap-6'>
          <div className='panel lg:col-span-1 lg:row-span-1'>
            {
              // @ts-ignore
              <SingleFlowChart series={[21, 9, 36, 12, 44, 25, 59, 41, 25, 66]} category='정규직' color='#00ab55' updatePoint={0.25} />
            }
          </div>
          <div className='panel lg:col-span-1 lg:row-span-1'>
            {
              // @ts-ignore
              <SingleFlowChart series={[21, 9, 36, 12, 44, 25, 59, 41, 25, 66]} category='계약직' color='#FF204E' updatePoint={-0.7} />
            }
          </div>
          <div className='panel flex justify-center lg:col-span-3 lg:row-span-2'>
            <div className='bg-red-500 rounded-full w-10 h-10 absolute'></div>
            <div className='bg-red-500 rounded-full w-10 h-10'></div>
          </div>
          <div className='panel lg:col-span-1 lg:row-span-1'>
            {
              // @ts-ignore
              <SingleFlowChart series={[21, 9, 36, 12, 44, 25, 59, 41, 25, 66]} category='협력업체' color='#4793AF' updatePoint={0.5} />
            }
          </div>
          <div className='panel lg:col-span-1 lg:row-span-1'>
            {
              // @ts-ignore
              <SingleFlowChart category='Total' color='#219C90' series={[10, 30, 15, 40, 29, 11, 33, 66, 11]} updatePoint={0.1} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
