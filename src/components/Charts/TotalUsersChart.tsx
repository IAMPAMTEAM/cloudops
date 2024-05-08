import { SingleFlowChart } from '@/components/Charts/_partials/SingleFlowChart';
import { MultipleRadarChart } from '@/components/Charts/_partials/MultipleRadarChart';
import { UpdatingPieChart } from '@/components/Charts/_partials/UpdatingPieChart';
import { VerticalBarChart } from '@/components/Charts/_partials/VerticalBarChart';

const TotalUsersChart = () => {
  return (
    <div>
      <div className='grid lg:grid-cols-5 gap-6'>
        <div className='panel lg:col-span-2'>
          {
            // @ts-ignore
            <MultipleRadarChart />
          }
        </div>
        <div className='panel lg:col-span-2'>
          {
            // @ts-ignore
            <UpdatingPieChart />
          }
        </div>
        <div className='panel lg:col-span-1 stats stats-vertical shadow'>
          <div className='stat'>
            <div className='stat-figure text-primary'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                ></path>
              </svg>
            </div>
            <div className='stat-title'>This Week</div>
            <div className='stat-value text-primary'>3.1K</div>
            <div className='stat-desc'>3% more than last week</div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z'></path>
              </svg>
            </div>
            <div className='stat-title'>Last Week</div>
            <div className='stat-value text-secondary'>3.0k</div>
            <div className='stat-desc'>2% more than last week</div>
          </div>
        </div>
      </div>
      <div className='grid lg:grid-cols-5 lg:grid-rows-2 gap-6 mt-6'>
        <div className='panel lg:col-span-1 lg:row-span-1'>
          <SingleFlowChart series={[21, 66]} category='정규직' categoryEn='Full Time' color='#219C90' updatePoint={0.25} />
        </div>
        <div className='panel lg:col-span-1 lg:row-span-1'>
          <SingleFlowChart category='시간제' categoryEn='Part Time' color='#FF204E' series={[50, 31]} updatePoint={-0.1} />
        </div>
        <div className='panel lg:col-span-1 lg:row-span-1'>
          <SingleFlowChart series={[21, 66]} category='계약직' categoryEn='Temporary' color='#219C90' updatePoint={0.7} />
        </div>
        <div className='panel lg:col-span-2 lg:row-span-2'>
          {
            // @ts-ignore
            <VerticalBarChart />
          }
        </div>
        <div className='panel lg:col-span-1 lg:row-span-1'>
          <SingleFlowChart category='인턴' categoryEn='Intern' color='#FF204E' series={[50, 31]} updatePoint={-0.1} />
        </div>
        <div className='panel lg:col-span-1 lg:row-span-1'>
          <SingleFlowChart series={[21, 66]} category='협력업체' categoryEn='contractor' color='#219C90' updatePoint={0.5} />
        </div>
        <div className='panel lg:col-span-1 lg:row-span-1'>
          <SingleFlowChart category='프리랜서' categoryEn='Freelance' color='#FF204E' series={[50, 31]} updatePoint={-0.1} />
        </div>
      </div>
    </div>
  );
};

export default TotalUsersChart;
