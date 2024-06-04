import { CustomCellRendererProps } from '@ag-grid-community/react';

export default (params: CustomCellRendererProps) => {
  if (params.value <= 5) {
    return <span className='bg-green-500 text-white w-120 px-5 py-2 rounded-full'>{params.value}</span>;
  } else if (params.value <= 10) {
    return <span className='bg-sky-500 text-white w-120 px-2 py-2 rounded-full'>{params.value}</span>;
  } else if (params.value <= 20) {
    return <span className='bg-red-500 text-white w-120 px-2 py-2 rounded-full'>{params.value}</span>;
  }
};
