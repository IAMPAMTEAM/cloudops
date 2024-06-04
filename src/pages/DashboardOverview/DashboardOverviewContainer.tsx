import StackedVerticalBarChartPagination from '@/components/Charts/_partials/StackedVerticalBarChartPagination';
import { ResourcesComponent } from './Resources/ResourcesComponent';
import { ComplianceComponent } from './Compliance/ComplianceComponent';
const DashboardOverviewContainer = () => {
  return (
    <>
      <div className='bg-[#f3f3f9] p-[24px] rounded-[8px]'>
        <p className='text-[1.2rem] font-semibold mb-[1.2rem] text-[#6667ab]'>Compliance</p>
        <ComplianceComponent />
      </div>
      <div className='bg-[#f3f3f9] p-[24px] rounded-[8px] mt-[1.2rem]'>
        <p className='text-[1.2rem] font-semibold mb-[1.2rem] text-[#6667ab]'>Resources</p>
        {/* <ResourcesComponent /> */}
      </div>
    </>
  );
};

export default DashboardOverviewContainer;
