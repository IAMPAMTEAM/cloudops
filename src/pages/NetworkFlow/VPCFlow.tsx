import VPCTopology from './_partials/VpcTopology';
import VpcChart from '@/components/Charts/VpcChart';
import { useEffect, useState } from 'react';

import DataTable from '@/components/DataTables/DataTable';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import '@/assets/css/dataTableStyle.css';
import tableOption from '@/pages/NetworkFlow/data/tableOption-cloudOps-vpcFlow.json';
import userTag from '@/pages/NetworkFlow/data/userTag-cloudOps-networkFlow.json';
import awsTag from '@/pages/NetworkFlow/data/awsTag-cloudOps-networkFlow.json';

const VPCFlow = () => {
  const [selectedFromVpc, setSelectedFromVpc] = useState('');
  const [selectedToVpc, setSelectedToVpc] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const setDefaultTableSetting = SetDefaultTableSetting(tableOption);

  useEffect(() => {
    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    setColumnDefs(mergedColumnDefs);
  }, []);

  const handleVpcFromTopology = (value: string) => {
    setSelectedFromVpc(value);
  };
  const handleVpcToTopology = (value: string) => {
    setSelectedToVpc(value);
  };
  const handleFilteredData = (value: any) => {
    setFilteredData((prev) => {
      prev = [];
      return [...value];
    });
  };

  return (
    <>
      <div className='grid grid-cols-5 grid-rows-2 gap-8'>
        <div className='col-span-2 row-span-2 '>
          {/* @ts-ignore */}
          <div className='panel'>
            {/* @ts-ignore */}
            <VPCTopology onFromVpcChange={handleVpcFromTopology} onToVpcChange={handleVpcToTopology} filteredData={handleFilteredData} />
          </div>
        </div>
        <div className='panel col-span-3 row-span-1'>
          {/* @ts-ignore */}
          <DataTable
            datas={filteredData}
            columnDefs={columnDefs}
            defaultTableSetting={setDefaultTableSetting}
            tableHeight={tableOption.tableHeight}
            pagination={tableOption.pagination}
            paginationPageSize={tableOption.paginationPageSize}
            paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
          />
        </div>
        <div className='col-span-3 row-span-1 overflow-x-auto'>
          <div className='panel'>
            {!(selectedFromVpc && selectedToVpc) ? <p className='text-lg text-center'>Please select fromVPC and toVPC</p> : null}
            {/* @ts-ignore */}
            <VpcChart fromVpc={selectedFromVpc} toVpc={selectedToVpc} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VPCFlow;
