import { ResourcesComponent } from './Resources/ResourcesComponent';
import { ComplianceComponent } from './Compliance/ComplianceComponent';
import { CostComponent } from './Cost/CostComponent';
const DashboardOverviewContainer = () => {
  return (
    <>
      <div className='p-[24px] rounded-[8px]'>
        <p className='text-[1.2rem] font-semibold mb-[8px] text-[#333]'>Compliance</p>
        <hr className='mb-[8px] border-[1px] border-[#333]' />
        <ComplianceComponent />
      </div>
      <div className='p-[24px] rounded-[8px]'>
        <p className='text-[1.2rem] font-semibold mb-[8px] text-[#333]'>Resources</p>
        <hr className='mb-[8px] border-[1px] border-[#333]' />

        <ResourcesComponent />
      </div>
      <div className='p-[24px] rounded-[8px]'>
        <p className='text-[1.2rem] font-semibold mb-[8px] text-[#333]'>Cost</p>
        <hr className='mb-[8px] border-[1px] border-[#333]' />
        <CostComponent />
      </div>
    </>
  );
};

export default DashboardOverviewContainer;
