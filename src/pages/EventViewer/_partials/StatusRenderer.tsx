import { CustomCellRendererProps } from '@ag-grid-community/react';

export default (params: CustomCellRendererProps) => {
  if (params.value === 'OK') {
    return <span className='bg-sky-500 text-white w-120 px-5 py-2 rounded-md'>{params.value}</span>;
  } else if (params.value === 'ALERT') {
    return <span className='bg-red-500 text-white w-120 px-2 py-2 rounded-md'>{params.value}</span>;
  }
};
