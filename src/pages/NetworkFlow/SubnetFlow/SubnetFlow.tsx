import SubnetChart from '@/components/Charts/SubnetChart';
import SubnetTopology from './_partials/SubnetTopology';
import { useEffect, useState } from 'react';

import DataTable from '@/components/DataTables/DataTable';
import SetColumnDefs from '@/utils/SetColumnDefs';
import SetDefaultTableSetting from '@/utils/SetDefaultTableSetting';
import '@/assets/css/dataTableStyle.css';

import tableOption from '@/pages/NetworkFlow/data/tableOption-cloudOps-networkFlow.json';
import userTag from '@/pages/NetworkFlow/data/userTag-cloudOps-networkFlow.json';
import awsTag from '@/pages/NetworkFlow/data/awsTag-cloudOps-networkFlow.json';

const SubnetFlow = () => {
  const [selectedVpc, setSelectedVpc] = useState('');
  const [selectedFromSubnet, setSelectedFromSubnet] = useState('');
  const [selectedToSubnet, setSelectedToSubnet] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const setDefaultTableSetting = SetDefaultTableSetting(tableOption);

  useEffect(() => {
    const mergedColumnDefs = SetColumnDefs(tableOption, userTag, awsTag);
    setColumnDefs(mergedColumnDefs);
  }, []);

  const handleVpcFromTopology = (value: string) => {
    setSelectedVpc(value);
  };

  const handleSubnetFromTopology = (value: string) => {
    setSelectedFromSubnet(value);
  };

  const handleSubnetToTopology = (value: string) => {
    setSelectedToSubnet(value);
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
        <div className='col-span-2 row-span-2'>
          {/* @ts-ignore */}
          <div className='panel'>
            {/* @ts-ignore */}
            <SubnetTopology onVpcChange={handleVpcFromTopology} onFromSubnetChange={handleSubnetFromTopology} onToSubnetChange={handleSubnetToTopology} filteredData={handleFilteredData} />
          </div>
        </div>
        <div className='panel col-span-3 row-span-1'>
          <DataTable
            showSaveButton={false}
            datas={filteredData}
            columnDefs={columnDefs}
            defaultTableSetting={setDefaultTableSetting}
            tableHeight={tableOption.tableHeight}
            pagination={tableOption.pagination}
            paginationPageSize={tableOption.paginationPageSize}
            paginationPageSizeSelector={tableOption.paginationPageSizeSelector}
          >
            <p></p>
          </DataTable>
        </div>
        <div className='col-span-3 row-span-1 overflow-x-auto'>
          <div className='panel'>
            {/* @ts-ignore */}
            {!(selectedVpc && selectedFromSubnet && selectedToSubnet) ? <p className='text-lg text-center'>Please select vpc and subnet</p> : null}
            {/* @ts-ignore */}
            <SubnetChart selectedVpc={selectedVpc} fromSubnet={selectedFromSubnet} toSubnet={selectedToSubnet} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubnetFlow;
