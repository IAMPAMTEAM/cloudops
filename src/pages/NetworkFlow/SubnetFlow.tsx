import SubnetChart from '../../components/Charts/SubnetChart';
import SubnetTopology from './_partials/SubnetTopology';
import { useState } from 'react';

const SubnetFlow = () => {
  const [selectedVpc, setSelectedVpc] = useState('');
  const [selectedFromSubnet, setSelectedFromSubnet] = useState('');
  const [selectedToSubnet, setSelectedToSubnet] = useState('');

  const handleVpcFromTopology = (value: string) => {
    setSelectedVpc(value);
  };

  const handleSubnetFromTopology = (value: string) => {
    setSelectedFromSubnet(value);
  };

  const handleSubnetToTopology = (value: string) => {
    setSelectedToSubnet(value);
  };

  return (
    <>
      {/* <div className='panel'>
        
      </div> */}
      <div className='grid grid-cols-5 grid-rows-3 gap-8'>
        <div className='panel col-span-2 row-span-3 '>
          <SubnetTopology onVpcChange={handleVpcFromTopology} onFromSubnetChange={handleSubnetFromTopology} onToSubnetChange={handleSubnetToTopology} />
        </div>
        <div className='panel col-span-3 row-span-1'></div>
        <div className='panel col-span-3 row-span-2 overflow-x-auto'>
          <SubnetChart selectedVpc={selectedVpc} fromSubnet={selectedFromSubnet} toSubnet={selectedToSubnet} />
        </div>
      </div>
    </>
  );
};

export default SubnetFlow;
