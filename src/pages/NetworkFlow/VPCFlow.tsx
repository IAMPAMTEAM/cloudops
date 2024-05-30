import VPCTopology from './_partials/VpcTopology';

const VPCFlow = () => {
  return (
    <>
      <div className='grid grid-cols-5 grid-rows-3 gap-8'>
        <div className='panel col-span-2 row-span-3 '>
          <VPCTopology />
        </div>
        <div className='panel col-span-3 row-span-1'></div>
        <div className='panel col-span-3 row-span-2 overflow-x-auto'></div>
      </div>
    </>
  );
};

export default VPCFlow;