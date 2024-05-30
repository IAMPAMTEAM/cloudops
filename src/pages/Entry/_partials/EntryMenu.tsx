import IconLogout from '@/components/Icon/IconLogout';
import { useNavigate } from 'react-router-dom';
import IconTopology from '@/assets/icons/IconTopology.svg';
import IconLock from '@/assets/icons/IconLock.svg';
import IconLink from '@/assets/icons/IconLink.svg';
import IconCost from '@/assets/icons/IconCost.svg';
import IconUser from '@/assets/icons/IconUser.svg';
import IconResources from '@/assets/icons/IconResources.svg';
import LogoCloudOps from '@/assets/icons/LogoCloudOps.svg';
import { useEffect, useLayoutEffect } from 'react';

const EntryMenu = () => {
  const menuList = [
    {
      logo: IconUser,
      menu: 'Governance',
      path: '/governance',
    },
    {
      logo: IconResources,
      menu: 'Resources',
      path: '/resources',
    },
    {
      logo: IconCost,
      menu: 'Cost',
      path: '/cost',
    },
    {
      logo: IconTopology,
      menu: 'Topology',
      path: '/regional-resources',
    },
    {
      logo: IconLink,
      menu: 'Network Flow',
      path: '/network-flow/subnet',
    },
    {
      logo: IconLock,
      menu: 'Security Group',
      path: '/sg',
    },
  ];

  const navigate = useNavigate();

  const navigateMenu = (path: string) => navigate(path);

  return (
    <div className='relative'>
      <div className='flex gap-4 justify-center items-center'>
        <img className='w-16 p-2 bg-[#6667AB] rounded-xl ' src={LogoCloudOps} alt='' />
        <p className='text-6xl font-bold uppercase tracking-tighter text-[#fff]'>CloudOps Portal</p>
      </div>

      <div className='flex m-[2.4rem]'>
        {menuList.map((menu, idx) => {
          return (
            <button
              className='w-[12.5rem] flex flex-col items-center rounded hover:text-[#6667AB] hover:cursor-pointer p-8 fill-[#000] opacity-80 hover:opacity-100 hover:mt-[-8px] delay-50 duration-500'
              onClick={() => navigateMenu(menu['path'])}
            >
              <img className='w-12 fill-[#000]' src={menu['logo']} alt={menu['menu']} />
              <p className='font-extrabold uppercase text-[1rem] tracking-tighter mt-8 text-[#fff]  '>{menu['menu']}</p>
            </button>
          );
          // if (menu.menu === 'Topology' || menu.menu === 'Security Group' || menu.menu === 'Network Flow') {
          // } else {
          //   return (
          //     <button className='lg:col-span-1 flex flex-col items-center rounded hover:cursor-not-allowed p-8 fill-[#000]' onClick={() => navigateMenu(menu['path'])}>
          //       <img className='w-12 fill-[#000]' src={menu['logo']} alt={menu['menu']} />
          //       <p className='font-extrabold text-xl tracking-tighter mt-8'>{menu['menu']}</p>
          //     </button>
          //   );
          // }
        })}
      </div>

      <div className=''>
        <button className='btn bg-[#6667AB] border-none w-full'>
          <IconLogout className='text-[#fff]' />
          <p className='font-bold text-[#FFF] tracking-tight text-lg ml-2 shadow-none'>LOGOUT</p>
        </button>
      </div>
    </div>
  );
};

export default EntryMenu;
