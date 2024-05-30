import { useEffect, useState } from 'react';

import DataTable from '@/components/DataTables/DataTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import '@/assets/css/dataTableStyle.css';

import tableData from '@/pages/Resources/data/tableData-cloudOps-awsResources.json';
import tableOption from '@/pages/Resources/data/tableOption-cloudOps-awsResources.json';
import userTag from '@/pages/Resources/data/userTag-cloudOps-awsResources.json';
import awsTag from '@/pages/Resources/data/awsTag-cloudOps-awsResources.json';

const Resources = () => {
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
      <DataTable
        datas={mergedTableData}
        columnDefs={columnDefs}
        defaultTableSetting={setDefaultTableSetting}
        tableHeight={tableOption.tableHeight}
        pagination={tableOption.pagination}
        paginationPageSize={tableOption.paginationPageSize}
        paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
      />
    </>
  );
};

export default Resources;
