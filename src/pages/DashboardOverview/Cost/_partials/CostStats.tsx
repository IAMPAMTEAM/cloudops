interface Props {
  costData: any[];
  category: string;
}

export const CostStats = (props: Props) => {
  const { costData, category } = props;
  return (
    <>
      <div className='stat lg:col-span-1 panel'>
        <div className='stat-figure text-secondary'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
          </svg>
        </div>
        <div className='stat-title mb-2'>Total Cost</div>
        <div className='stat-value mb-2 flex gap-1'>
          <p>$</p>
          {costData
            .map((data) => {
              return data.totalCost;
            })
            .reduce((acc, cur) => {
              return Number(acc) + Number(cur);
            }, 0)
            .toFixed(2)}
        </div>
        <div className='stat-desc'>Jan 1st - Mar 31st</div>
      </div>

      <div className='stat lg:col-span-1 panel'>
        <div className='stat-figure text-secondary'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
            ></path>
          </svg>
        </div>
        <div className='stat-title mb-2'>Average Daily Cost</div>
        <div className='stat-value mb-2 flex gap-1'>
          <p>$</p>
          {(
            costData
              .map((data) => {
                return data.totalCost;
              })
              .reduce((acc, cur) => {
                return Number(acc) + Number(cur);
              }, 0) / costData.length
          ).toFixed(2)}
        </div>
        <div className='stat-desc'>↗︎ 100 (0.022%)</div>
      </div>

      <div className='stat lg:col-span-1 panel'>
        <div className='stat-figure text-secondary'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'></path>
          </svg>
        </div>
        <div className='stat-title mb-2'>{category === 'service' ? 'Service Count' : category === 'region' ? 'Region Count' : 'Account Count'}</div>
        <div className='stat-value mb-2'>{category === 'service' ? 30 : category === 'region' ? 15 : costData.length}</div>
        <div className='stat-desc'>↘︎ 10 (0.01%)</div>
      </div>
    </>
  );
};
