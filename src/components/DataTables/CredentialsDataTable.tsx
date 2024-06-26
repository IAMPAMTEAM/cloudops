import { AgGridReact } from 'ag-grid-react';
import { ColDef, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy, ValueFormatterParams } from 'ag-grid-community';
// import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import IconFilter from '@/assets/icons/filter.png';

interface IDataTable {
  children: ReactNode;
  showSaveButton: boolean;
  result: any;
  datas: any[];
  columnDefs: any[];
  defaultTableSetting: any;
  tableHeight: number;
  pagination: boolean;
  paginationPageSize: number;
  paginationPageSizeSelector: number[];
}

export default function FilterDataTable({
  children,
  showSaveButton,
  result,
  datas,
  columnDefs,
  defaultTableSetting,
  tableHeight,
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
}: IDataTable) {
  const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy>(() => {
    return defaultTableSetting.autoSizeStrategy;
  }, [defaultTableSetting.autoSizeStrategy]);

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: 'Group',
      width: 120,
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);

  const gridRef = useRef<AgGridReact>(null);

  useEffect(() => {
    setFilteredDatas(datas);
  }, [datas]);

  const onBtnCSVExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  const onBtnExcelExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  function onBtnSave() {
    console.log(datas);
  }

  const [checkedStates, setCheckedStates] = useState(result.policyResults.map(() => false));
  const [filteredDatas, setFilteredDatas] = useState(datas);

  const handleChange = (index) => (event) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = event.target.checked;
    setCheckedStates(newCheckedStates);

    updateFilteredDatas(newCheckedStates);
  };

  // const updateFilteredDatas = (newCheckedStates) => {
  //   const filteredUsers = result.policyResults.filter((_, i) => newCheckedStates[i]).flatMap((policy) => Object.values(policy)[0]);

  //   if (filteredUsers.length === 0) {
  //     setFilteredDatas(datas);
  //   } else {
  //     setFilteredDatas(datas.filter((data) => filteredUsers.includes(data.user)));
  //     console.log(datas.filter((data) => filteredUsers.includes(data.user)));
  //   }

  const updateFilteredDatas = (newCheckedStates) => {
    const checkedPolicies = result.policyResults.filter((_, i) => newCheckedStates[i]);

    if (checkedPolicies.length === 0) {
      setFilteredDatas(datas);
    } else {
      const filteredUsersArrays = checkedPolicies.map((policy) => Object.values(policy)[0]);

      if (filteredUsersArrays.length === 1) {
        const filteredUsers = new Set(filteredUsersArrays[0]);
        const filteredData = datas.filter((data) => filteredUsers.has(data.user));
        setFilteredDatas(filteredData);
      } else {
        const commonUsers = filteredUsersArrays.reduce((acc, users) => {
          return new Set([...acc].filter((user) => users.includes(user)));
        });

        const filteredData = datas.filter((data) => commonUsers.has(data.user));
        setFilteredDatas(filteredData);
      }
    }
  };

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        {children}
        <div className='flex'>
          {showSaveButton && (
            <button onClick={onBtnSave} className='bg-[#6667AB] font-bold text-white px-2 py-2 rounded-md mr-2'>
              Save
            </button>
          )}
          <button onClick={onBtnCSVExport} className='bg-[#6667AB] font-bold text-white px-2 py-2 rounded-md mr-2'>
            Export CSV
          </button>
          <button onClick={onBtnExcelExport} className='bg-[#6667AB] font-bold text-white px-2 py-2 rounded-md'>
            Export Excel
          </button>
        </div>
      </div>
      {/* TODO: 문구 변경 */}
      <div className='border-[1px] border-[#6667AB] bg-[#f3f3f9] p-[24px] pb-[4px] mb-[24px] rounded-[8px]'>
        <div className='flex gap-[4px] justify-start items-center mb-[16px]'>
          <img src={IconFilter} className='w-[16px] h-[16px]' />
          <p className='text-[1rem] font-[500]'> Filter</p>
        </div>
        <div className='flex flex-nowrap justify-between mb-[8px]'>
          {result.policyResults.map((policy: any, index: number) => {
            const key = Object.keys(policy)[0];
            return (
              // bg-[#f3f3f9] px-[12px] py-[8px] pb-0 rounded-[20px] border-[1.2px] border-[#6667AB] border-dashed
              <div key={index} className='inline-flex gap-[8px] '>
                <label className='relative flex rounded-full cursor-pointer' htmlFor={`check${index}`}>
                  <input
                    type='checkbox'
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#ccc] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#6667AB] checked:bg-[#6667AB] checked:before:bg-gray-900 hover:before:opacity-10"
                    id={`check${index}`}
                    checked={checkedStates[index]}
                    onChange={handleChange(index)}
                  />
                  <span className='absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-3.5 w-3.5' viewBox='0 0 20 20' fill='currentColor' stroke='currentColor' strokeWidth='1'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'></path>
                    </svg>
                  </span>
                </label>
                <label className='cursor-pointer select-none' htmlFor={`check${index}`}>
                  {key}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ height: tableHeight }} className={'ag-theme-quartz'}>
        <AgGridReact
          ref={gridRef}
          rowData={filteredDatas}
          columnDefs={columnDefs}
          defaultColDef={defaultTableSetting.defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          autoSizeStrategy={autoSizeStrategy}
          suppressAggFuncInHeader={true}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  );
}
