import { useEffect, useState } from 'react';

import DataTable from '@/components/DataTables/DataTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import '@/assets/css/dataTableStyle.css';

import serviceTableData from '@/pages/Cost/data/CostServiceDaily/tableData-cloudOps-costServiceDaily.json';
import serviceTableOption from '@/pages/Cost/data/CostServiceDaily/tableOption-cloudOps-costServiceDaily.json';
import serviceUserTag from '@/pages/Cost/data/CostServiceDaily/userTag-cloudOps-costServiceDaily.json';
import serviceAwsTag from '@/pages/Cost/data/CostServiceDaily/awsTag-cloudOps-costServiceDaily.json';

import regionTableData from '@/pages/Cost/data/CostRegionDaily/tableData-cloudOps-costRegionDaily.json';
import regionTableOption from '@/pages/Cost/data/CostRegionDaily/tableOption-cloudOps-costRegionDaily.json';
import regionUserTag from '@/pages/Cost/data/CostRegionDaily/userTag-cloudOps-costRegionDaily.json';
import regionAwsTag from '@/pages/Cost/data/CostRegionDaily/awsTag-cloudOps-costRegionDaily.json';

const Cost = () => {
  const [serviceColumnDefs, setServiceColumnDefs] = useState<any[]>([]);
  const [mergedServiceTableData, setMergedServiceTableData] = useState<any[]>([]);
  const setDefaultServiceTableSetting = SetDefaultTableSetting(serviceTableOption);

  const [regionColumnDefs, setRegionColumnDefs] = useState<any[]>([]);
  const [mergedRegionTableData, setMergedRegionTableData] = useState<any[]>([]);
  const setDefaultRegionTableSetting = SetDefaultTableSetting(regionTableOption);

  useEffect(() => {
    const numberFormatter = (params) => {
      if (!params.value || params.value === 0) return '0';
      return '' + Math.round(params.value * 100) / 100;
    };

    const mergedServiceColumnDefs = SetColumnDefs(serviceTableOption, serviceUserTag, serviceAwsTag);
    mergedServiceColumnDefs.forEach((columnDef) => {
      if (columnDef.valueFormatter === 'numberFormatter') {
        columnDef.valueFormatter = numberFormatter;
      }
    });
    setServiceColumnDefs(mergedServiceColumnDefs);

    const mergedRegionColumnDefs = SetColumnDefs(regionTableOption, regionUserTag, regionAwsTag);
    mergedRegionColumnDefs.forEach((columnDef) => {
      if (columnDef.valueFormatter === 'numberFormatter') {
        columnDef.valueFormatter = numberFormatter;
      }
    });
    setRegionColumnDefs(mergedRegionColumnDefs);

    const mergedServiceData = MergeTagData(serviceTableData, serviceUserTag, serviceAwsTag);
    setMergedServiceTableData(mergedServiceData);
    const mergedRegionData = MergeTagData(regionTableData, regionUserTag, regionAwsTag);
    setMergedRegionTableData(mergedRegionData);
  }, []);

  return (
    <>
      <div className='pb-4 panel'>
        <DataTable
          showSaveButton={false}
          datas={mergedServiceTableData}
          columnDefs={serviceColumnDefs}
          defaultTableSetting={setDefaultServiceTableSetting}
          tableHeight={serviceTableOption.tableHeight}
          pagination={serviceTableOption.pagination}
          paginationPageSize={serviceTableOption.paginationPageSize}
          paginationPageSizeSelector={serviceTableOption.paginationPageSizeSelector}
        >
          <p className='text-lg pb-4'>Service Cost</p>
        </DataTable>
      </div>
      <div className='pb-4 panel mt-6'>
        <DataTable
          datas={mergedRegionTableData}
          columnDefs={regionColumnDefs}
          defaultTableSetting={setDefaultRegionTableSetting}
          tableHeight={regionTableOption.tableHeight}
          pagination={regionTableOption.pagination}
          paginationPageSize={regionTableOption.paginationPageSize}
          paginationPageSizeSelector={regionTableOption.paginationPageSizeSelector}
        >
          <p className='text-lg pt-4 pb-4'>Region Cost</p>
        </DataTable>
      </div>
    </>
  );
};

export default Cost;
