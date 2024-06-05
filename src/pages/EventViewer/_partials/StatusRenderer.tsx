import { CustomCellRendererProps } from '@ag-grid-community/react';

export default (params: CustomCellRendererProps) => {
  if (params.value === 'OK') {
    // return <div className='bg-sky-500 text-white my-3 box-content rounded-md'>{params.value}</div>;
    return <span className='bg-sky-500 text-white flex justify-center items-center w-[65px] h-[34px] text-center px-2 py-2 rounded-md'>{params.value}</span>;
  } else if (params.value === 'ALERT') {
    return <span className='bg-red-500 text-white flex justify-center items-center w-[65px] h-[34px] text-center px-2 py-2 rounded-md'>{params.value}</span>;
  }
};
