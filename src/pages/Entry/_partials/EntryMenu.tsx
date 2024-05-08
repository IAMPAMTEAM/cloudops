import IconLogout from '@/components/Icon/IconLogout';
import { useNavigate } from 'react-router-dom';
import IconTopology from '@/assets/icons/IconTopology.svg';
import IconLock from '@/assets/icons/IconLock.svg';
import IconLink from '@/assets/icons/IconLink.svg';
import IconCost from '@/assets/icons/IconCost.svg';
import IconUser from '@/assets/icons/IconUser.svg';
import IconResources from '@/assets/icons/IconResources.svg';
import LogoCloudOps from '@/assets/icons/LogoCloudOps.svg';

const EntryMenu = () => {
  const menuList = [
    {
      logo: IconUser,
      menu: 'Governance',
      path: '/',
    },
    {
      logo: IconResources,
      menu: 'Resources',
      path: '/',
    },
    {
      logo: IconCost,
      menu: 'Cost',
      path: '/',
    },
    {
      logo: IconTopology,
      menu: 'Topology',
      path: '/regional-resources',
    },
    {
      logo: IconLink,
      menu: 'Network Flow',
      path: '/entry',
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
    <div className='relative panel flex flex-col gap-4 w-[1000px] bg-[#F6F5F2] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100 p-14 border-none'>
      <div className='flex gap-8 justify-center items-center relative'>
        <img className='w-16 p-2 bg-[#6667AB] rounded-xl' src={LogoCloudOps} alt='' />
        <p className='text-6xl font-semibold tracking-tighter'>CloudOps Portal</p>
      </div>

      <div className='grid lg:grid-cols-3 gap-4 p-8 items-center'>
        {menuList.map((menu, idx) => {
          if (menu.menu === 'Topology' || menu.menu === 'Security Group') {
            return (
              <button className='lg:col-span-1 flex flex-col items-center rounded hover:text-[#6667AB] hover:cursor-pointer p-8 fill-[#000]' onClick={() => navigateMenu(menu['path'])}>
                <img className='w-12 fill-[#000]' src={menu['logo']} alt={menu['menu']} />
                <p className='font-extrabold text-xl tracking-tighter mt-8'>{menu['menu']}</p>
              </button>
            );
          } else {
            return (
              <button className='lg:col-span-1 flex flex-col items-center rounded hover:cursor-not-allowed p-8 fill-[#000]' onClick={() => navigateMenu(menu['path'])}>
                <img className='w-12 fill-[#000]' src={menu['logo']} alt={menu['menu']} />
                <p className='font-extrabold text-xl tracking-tighter mt-8'>{menu['menu']}</p>
              </button>
            );
          }
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
