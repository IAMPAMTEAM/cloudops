import { Resources } from './_partials/Resources';
import { ResourcesVirginia } from './_partials/ResourcesVirginia';
import { ResourcesSingapore } from './_partials/ResourcesSingapore';

const RegionalResources = () => {
  return (
    <>
      <div className='grid lg:grid-cols-2 gap-[16px]'>
        <div className='panel lg:col-span-1'>
          <Resources region='seoul' />
        </div>
        <div className='panel lg:col-span-1'>
          <ResourcesVirginia region='virginia' />
        </div>
        <div className='panel lg:col-span-1'>
          <ResourcesSingapore region='singapore' />
        </div>
      </div>
    </>
  );
};
export default RegionalResources;
