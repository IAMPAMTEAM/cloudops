import { useEffect, useState } from 'react';

import DataTable from '@/components/DataTables/DataTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import '@/assets/css/dataTableStyle.css';
import axios from 'axios';

import { MultiPieChart } from '@/components/Charts/_partials/MultiPieChart';
import { PieChart } from '@/components/Charts/_partials/PieChart';

const Resources = () => {
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [mergedTableData, setMergedTableData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableOption, setTableOption] = useState<any>({});
  const [userTag, setUserTag] = useState<any[]>([]);
  const [awsTag, setAwsTag] = useState<any[]>([]);
  const [defaultTableSettings, setDefaultTableSettings] = useState<any>({});
  const chartData1 = [
    [25, 28, 227, 16, 41, 120, 94],
    [15, 8, 6, 13, 10, 24, 18, 67, 116, 16, 26, 15, 120, 94],
  ];
  const chartData2 = [244, 83, 142];

  useEffect(() => {
    async function fetchData() {
      const { data: tableData } = await axios('https://iampam-cloudops-tenants-data.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/resources/data.json');
      const { data: tableOption } = await axios('https://iampam-cloudops-tenants-data.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/resources/schema.json');
      const { data: userTag } = await axios('https://iampam-cloudops-tenants-data.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/resources/taguser.json');
      const { data: awsTag } = await axios('https://iampam-cloudops-tenants-data.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/resources/tagaws.json');

      setTableData(tableData);
      setDefaultTableSettings(SetDefaultTableSetting(tableOption));
      setTableOption(tableOption);
      setUserTag(userTag);
      setAwsTag(awsTag);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!tableData.length || !Object.keys(tableOption).length || !Object.keys(userTag).length || !Object.keys(awsTag).length) {
      return;
    }

    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    setColumnDefs(mergedColumnDefs);

    const mergedData = MergeTagData(tableData, userTag, awsTag);
    setMergedTableData(mergedData);
  }, [tableData, tableOption, userTag, awsTag]);

  const saveEditedRow = async (datas: any[]) => {
    await axios({
      method: 'put',
      url: `${import.meta.env.VITE_API_KEY}/resources/usertag`,
      data: datas,
    });

    await axios({
      method: 'put',
      url: `${import.meta.env.VITE_API_KEY}/resources/awstag`,
      data: datas,
    });
  };

  if (!mergedTableData.length || !columnDefs.length) {
    return;
  }

  return (
    <>
      <div className='pb-4 panel'>
        <DataTable
          showSaveButton={true}
          datas={mergedTableData}
          columnDefs={columnDefs}
          defaultTableSetting={defaultTableSettings}
          tableHeight={tableOption.tableHeight}
          pagination={tableOption.pagination}
          paginationPageSize={tableOption.paginationPageSize}
          paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
          saveCallback={saveEditedRow}
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
