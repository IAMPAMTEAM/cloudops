import { NodesSubnets } from './_partials/NodesSubnets';
import { NodesOnpremise } from './_partials/NodesOnpremise';
import { NodesElb } from './_partials/NodesElb';
import './css/nodes.css';

const SubnetsNodes = () => {
  return (
    <div className='grid lg:grid-cols-1 w-fit gap-[8px]'>
      <div className='lg:col-span-1 panel'>
        <NodesSubnets />
      </div>
      <div className=' lg:col-span-1 panel'>
        <NodesOnpremise />
      </div>
      <div className='lg:col-span-1 panel'>
        <NodesElb />
      </div>
    </div>
  );
};

export default SubnetsNodes;
