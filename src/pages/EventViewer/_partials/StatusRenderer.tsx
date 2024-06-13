import { CustomCellRendererProps } from '@ag-grid-community/react';

export default (params: CustomCellRendererProps) => {
  if (params.value === 'OK') {
    // return <div className='bg-blue-500 text-white my-3 box-content rounded-md'>{params.value}</div>;
    return <span className=' text-[#999] flex justify-center items-center w-[65px] h-[34px] text-center px-2 py-2 rounded-md'>⊖</span>;
  } else if (params.value === 'ALERT') {
    return <span className=' text-[red] flex justify-center items-center w-[65px] h-[34px] text-center px-2 py-2 rounded-md'>⚠️</span>;
  }
};
