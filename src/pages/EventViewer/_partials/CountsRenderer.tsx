import { CustomCellRendererProps } from '@ag-grid-community/react';
import CountsIcon from '@/pages/EventViewer/_partials/countsIcon.svg';

export default (params: CustomCellRendererProps) => {
  if (params.value <= 5) {
    return <span className='bg-green-500 text-white flex justify-center items-center w-[34px] h-[34px] text-center px-2 py-2 mt-0.5 rounded-full'>{params.value}</span>;
  } else if (params.value <= 10) {
    return <span className='bg-blue-500 text-white flex justify-center items-center w-[34px] h-[34px] text-center px-2 py-2 mt-0.5 rounded-full'>{params.value}</span>;
  } else {
    return <span className='bg-red-500 text-white flex justify-center items-center w-[34px] h-[34px] text-center px-2 py-2 mt-0.5 rounded-full'>{params.value}</span>;
  }
  // return (
  //   <div style={{ display: 'flex', alignItems: 'center' }}>
  //     <span className='mr-1' style={{ display: 'inline-flex', alignItems: 'center' }}>
  //       <svg
  //         style={{ verticalAlign: 'middle', transform: 'translateY(-2px)' }}
  //         className='w-6 h-6 text-gray-800 dark:text-white'
  //         aria-hidden='true'
  //         xmlns='http://www.w3.org/2000/svg'
  //         width='20'
  //         height='20'
  //         fill='none'
  //         viewBox='0 0 24 24'
  //       >
  //         <path
  //           stroke='currentColor'
  //           strokeLinecap='round'
  //           strokeLinejoin='round'
  //           strokeWidth='2'
  //           d='M12 5.464V3.099m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C19 17.4 19 18 18.462 18H5.538C5 18 5 17.4 5 16.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.464ZM6 5 5 4M4 9H3m15-4 1-1m1 5h1M8.54 18a3.48 3.48 0 0 0 6.92 0H8.54Z'
  //         />
  //       </svg>
  //     </span>
  //     {params.value}
  //   </div>
  // );
};
