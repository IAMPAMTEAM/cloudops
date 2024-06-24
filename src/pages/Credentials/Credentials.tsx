import { useEffect, useState } from 'react';

import CredentialsDataTable from '@/components/DataTables/CredentialsDataTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import '@/assets/css/dataTableStyle.css';

import tableData from '@/pages/Credentials/data/tableData-cloudOps-credentials.json';
import tableOption from '@/pages/Credentials/data/tableOption-cloudOps-credentials.json';
import userTag from '@/pages/Credentials/data/userTag-cloudOps-credentials.json';
import awsTag from '@/pages/Credentials/data/awsTag-cloudOps-credentials.json';
import result from '@/pages/Credentials/data/result.json';

const Credentials = () => {
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [mergedTableData, setMergedTableData] = useState<any[]>([]);
  const setDefaultTableSetting = SetDefaultTableSetting(tableOption);

  useEffect(() => {
    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    setColumnDefs(mergedColumnDefs);

    const mergedData = MergeTagData(tableData, userTag, awsTag);
    setMergedTableData(mergedData);
  }, []);

  return (
    <>
      <div className='panel'>
        <CredentialsDataTable
          showSaveButton={false}
          result={result}
          datas={mergedTableData}
          columnDefs={columnDefs}
          defaultTableSetting={setDefaultTableSetting}
          tableHeight={tableOption.tableHeight}
          pagination={tableOption.pagination}
          paginationPageSize={tableOption.paginationPageSize}
          paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
        >
          <p className='text-lg'>Credentials</p>
        </CredentialsDataTable>
      </div>
    </>
  );
};

export default Credentials;
