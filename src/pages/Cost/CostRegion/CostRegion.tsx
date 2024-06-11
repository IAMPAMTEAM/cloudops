import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTables/DataTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import '@/assets/css/dataTableStyle.css';

import regionTableData from '@/pages/Cost/data/CostRegionDaily/tableData-cloudOps-costRegionDaily.json';
import regionTableOption from '@/pages/Cost/data/CostRegionDaily/tableOption-cloudOps-costRegionDaily.json';
import regionUserTag from '@/pages/Cost/data/CostRegionDaily/userTag-cloudOps-costRegionDaily.json';
import regionAwsTag from '@/pages/Cost/data/CostRegionDaily/awsTag-cloudOps-costRegionDaily.json';

// Tabs
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';

// chart
import { TreemapChart } from '@/components/Charts/_partials/TreemapChart';
import { StackedVerticalBarChart } from '@/components/Charts/_partials/StackedVerticalBarChart';

const CostRegion = () => {
  const [regionColumnDefs, setRegionColumnDefs] = useState<any[]>([]);
  const [mergedRegionTableData, setMergedRegionTableData] = useState<any[]>([]);
  const setDefaultRegionTableSetting = SetDefaultTableSetting(regionTableOption);

  useEffect(() => {
    const mergedRegionColumnDefs = SetColumnDefs(regionTableOption, regionUserTag, regionAwsTag);
    setRegionColumnDefs(mergedRegionColumnDefs);

    const mergedRegionData = MergeTagData(regionTableData, regionUserTag, regionAwsTag);
    setMergedRegionTableData(mergedRegionData);
  }, []);

  const data = [
    {
      label: 'Daily',
      value: 'daily',
    },
    {
      label: 'Weekly',
      value: 'weekly',
    },
    {
      label: 'Monthly',
      value: 'monthly',
    },
  ];

  const treemapData = [
    {
      x: 'Seoul',
      y: 618,
    },
    {
      x: 'Richmond',
      y: 549,
    },
    {
      x: 'Tokyo',
      y: 480,
    },
    {
      x: 'Osaka',
      y: 420,
    },
    {
      x: 'Mumbai',
      y: 390,
    },
    {
      x: 'Singapore',
      y: 160,
    },
    {
      x: 'Sydney',
      y: 220,
    },
    {
      x: 'Toronto',
      y: 394,
    },
    {
      x: 'Frankfurt',
      y: 599,
    },
    {
      x: 'Stockholm',
      y: 200,
    },
    {
      x: 'Ireland',
      y: 300,
    },
    {
      x: 'London',
      y: 415,
    },
    {
      x: 'Paris',
      y: 673,
    },
    {
      x: 'Sao Paulo',
      y: 100,
    },
    {
      x: 'Columbia',
      y: 222,
    },
    {
      x: 'Portalnd',
      y: 333,
    },
    {
      x: 'Oakland',
      y: 159,
    },
  ];

  const stackedVerticalBarData = [
    {
      name: '',
    },
  ];

  return (
    <>
      <Tabs value='daily'>
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} defaultChecked>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <div className='mt-[2.4rem]'>
            {data.map(({ value }) => (
              <TabPanel key={value} value={value}>
                {/* TODO: daily, weekly, monthly에 맞게 동적으로 수정 예정 */}
                <div className='panel'>
                  <DataTable
                    datas={mergedRegionTableData}
                    columnDefs={regionColumnDefs}
                    defaultTableSetting={setDefaultRegionTableSetting}
                    tableHeight={regionTableOption.tableHeight}
                    pagination={regionTableOption.pagination}
                    paginationPageSize={regionTableOption.paginationPageSize}
                    paginationPageSizeSelector={regionTableOption.paginationPageSizeSelector}
                  >
                    <p className='text-lg pt-4 pb-4'></p>
                  </DataTable>
                </div>
                <div className='grid lg:grid-cols-5 gap-[1.2rem] mt-[1.2rem]'>
                  <div className='panel lg:col-span-2'>
                    <TreemapChart data={treemapData} colors={['#FF9EAA']} title={'Regional Cost [Treemap]'} />
                  </div>
                  <div className='panel lg:col-span-3'>
                    <StackedVerticalBarChart data={[]} colors={[]} categories={[]} title={''} />
                  </div>
                </div>
              </TabPanel>
            ))}
          </div>
        </TabsBody>
      </Tabs>
    </>
  );
};

export default CostRegion;
