import { useEffect, useState } from 'react';

import DataTable from '@/components/DataTables/DataTable';
import MergeTagData from '@/utils/MergeTagData';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import '@/assets/css/dataTableStyle.css';
import axios from 'axios';

const NetworkNodes = () => {
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [mergedTableData, setMergedTableData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableOption, setTableOption] = useState<any>({});
  const [userTag, setUserTag] = useState<any[]>([]);
  const [awsTag, setAwsTag] = useState<any[]>([]);
  const [defaultTableSettings, setDefaultTableSettings] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      const { data: tableData } = await axios('https://iampam-tenants.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/network-nodes/data.json');
      const { data: tableOption } = await axios('https://iampam-tenants.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/network-nodes/schema.json');
      const { data: userTag } = await axios('https://iampam-tenants.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/network-nodes/taguser.json');
      const { data: awsTag } = await axios('https://iampam-tenants.s3.ap-northeast-2.amazonaws.com/tenants/330886885966/network-nodes/tagaws.json');

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
      url: `${import.meta.env.VITE_API_KEY}/network-nodes/usertag`,
      data: datas,
    });

    await axios({
      method: 'put',
      url: `${import.meta.env.VITE_API_KEY}/network-nodes/awstag`,
      data: datas,
    });
  };

  if (!mergedTableData.length || !columnDefs.length) {
    return;
  }

  return (
    <>
      <div className='panel'>
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
          <p className='text-lg'>Network Nodes</p>
        </DataTable>
      </div>
    </>
  );
};

export default NetworkNodes;
