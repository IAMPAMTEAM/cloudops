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
import { MultiPieChart } from '@/components/Charts/_partials/MultiPieChart';
import { PieChart } from '@/components/Charts/_partials/PieChart';

const Resources = () => {
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [mergedTableData, setMergedTableData] = useState<any[]>([]);

  const setDefaultTableSetting = SetDefaultTableSetting(tableOption);
  const chartData1 = [
    [25, 28, 227, 16, 41, 120, 94],
    [15, 8, 6, 13, 10, 24, 18, 67, 116, 16, 26, 15, 120, 94],
  ];
  const chartData2 = [244, 83, 142];

  useEffect(() => {
    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    setColumnDefs(mergedColumnDefs);

    const mergedData = MergeTagData(tableData, userTag, awsTag);
    setMergedTableData(mergedData);
  }, []);

  return (
    <>
      <div className='pb-4 panel'>
        <DataTable
          showSaveButton={true}
          datas={mergedTableData}
          columnDefs={columnDefs}
          defaultTableSetting={setDefaultTableSetting}
          tableHeight={tableOption.tableHeight}
          pagination={tableOption.pagination}
          paginationPageSize={tableOption.paginationPageSize}
          paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
        >
          <p className='text-lg'>Resources</p>
        </DataTable>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex gap-6 mt-6'>
          <div className='w-[50%] panel'>
            <MultiPieChart
              data={chartData1}
              labels={[
                ['Analytics', 'Application Integration', 'Compute', 'Databases', 'Containers & Orchestration', 'Security & Compliance', 'Storage'],
                ['athena', 'elasticsearch', 'glue', 'sns', 'sqs', 'autoscaling', 'batch', 'ec2', 'lambda', 'rds', 'ecs', 'eks', 'iam', 's3'],
              ]}
              colors={[[], []]}
              title='AWS Resources - Service Category'
              SUB={['Service', 'Detail']}
            />
          </div>
          <div className='w-[50%] panel'>
            <PieChart data={chartData2} labels={['Seoul', 'Singapore', 'Virginia']} colors={[]} title='AWS Resources - Region Category' SUB='Region' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
