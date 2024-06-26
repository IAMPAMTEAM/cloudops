import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTables/DataTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import CostServiceTop from '@/assets/images/Cost_Top Services.svg';
import '@/assets/css/dataTableStyle.css';

import axios from 'axios';

// chart
import { TreemapChart } from '@/components/Charts/_partials/TreemapChart';
import { StackedVerticalBarChart } from '@/components/Charts/_partials/StackedVerticalBarChart';
import CostChart from '@/components/Charts/_partials/CostChart';

const CostServiceDaily = () => {
  const [regionColumnDefs, setRegionColumnDefs] = useState<any[]>([]);
  const [mergedRegionTableData, setMergedRegionTableData] = useState<any[]>([]);

  const [regionTableData, setRegionTableData] = useState<any[]>([]);
  const [regionTableOption, setRegionTableOption] = useState<any>({});
  const [regionUserTag, setRegionUserTag] = useState<any[]>([]);
  const [regionAwsTag, setRegionAwsTag] = useState<any[]>([]);
  const [defaultTableSettings, setDefaultTableSettings] = useState<any>({});

  const [lastSeries, setLastSeries] = useState<any[]>([]);
  const [lastLabels, setLastLabels] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: tableData } = await axios('https://iampam-cloudops-tenants-data.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/cost/service-daily/data.json');
      const { data: tableOption } = await axios('https://iampam-cloudops-tenants-data.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/cost/service-daily/schema.json');
      const { data: userTag } = await axios('https://iampam-cloudops-tenants-data.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/cost/service-daily/taguser.json');
      const { data: awsTag } = await axios('https://iampam-cloudops-tenants-data.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/cost/service-daily/tagaws.json');

      const lastTableDataKeys: string[] = [];
      const lastTableDataVals: any[] = [];

      Object.entries(tableData[tableData.length - 2]).forEach(([key, value]) => {
        if (key === 'month' || key === 'date' || key === 'totalCost') {
          return;
        }

        if (value !== 0) {
          lastTableDataKeys.push(key);
          lastTableDataVals.push(value);
        }
      });

      setLastLabels(lastTableDataKeys);
      setLastSeries(lastTableDataVals);

      const tableDataKeys: string[] = [];
      const tableDataVals: any[] = [];

      Object.entries(tableData[tableData.length - 1]).forEach(([key, value]) => {
        if (key === 'month' || key === 'date' || key === 'totalCost') {
          return;
        }

        if (value !== 0) {
          tableDataKeys.push(key);
          tableDataVals.push(value);
        }
      });

      setLabels(tableDataKeys);
      setSeries(tableDataVals);

      setRegionTableData(tableData);
      setDefaultTableSettings(SetDefaultTableSetting(tableOption));
      setRegionTableOption(tableOption);
      setRegionUserTag(userTag);
      setRegionAwsTag(awsTag);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!regionTableData.length || !Object.keys(regionTableOption).length || !Object.keys(regionUserTag).length || !Object.keys(regionAwsTag).length) {
      return;
    }

    const mergedRegionColumnDefs = SetColumnDefs(regionTableOption, regionUserTag, regionAwsTag);
    console.log(mergedRegionColumnDefs);
    setRegionColumnDefs(mergedRegionColumnDefs);

    const mergedRegionData = MergeTagData(regionTableData, regionUserTag, regionAwsTag);
    setMergedRegionTableData(mergedRegionData);
  }, [regionTableData, regionTableOption, regionUserTag, regionAwsTag]);

  if (!mergedRegionTableData.length || !regionColumnDefs.length) {
    return;
  }
  return (
    <>
      <img src={CostServiceTop} className='w-full h-full mb-4' />
      <div className='panel'>
        <DataTable
          datas={mergedRegionTableData}
          columnDefs={regionColumnDefs}
          defaultTableSetting={defaultTableSettings}
          tableHeight={regionTableOption.tableHeight}
          pagination={regionTableOption.pagination}
          paginationPageSize={regionTableOption.paginationPageSize}
          paginationPageSizeSelector={regionTableOption.paginationPageSizeSelector}
        >
          <p className='text-lg pt-4 pb-4'></p>
        </DataTable>
      </div>
      <div className='grid lg:grid-cols-4 gap-[1.2rem] mt-[1.2rem]'>
        <div className='panel lg:col-span-2'>
          <p className='text-[16px] font-semibold'>Yesterday</p>
          <CostChart title='YesterDay' labels={lastLabels} series={lastSeries} />
        </div>
        <div className='panel lg:col-span-2'>
          <p className='text-[16px] font-semibold'>Today</p>
          <CostChart title='Today' labels={labels} series={series} />
        </div>
      </div>
    </>
  );
};

export default CostServiceDaily;
