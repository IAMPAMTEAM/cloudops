import IconLogout from '@/components/Icon/IconLogout';
import { useNavigate } from 'react-router-dom';
import IconUsers from '@/assets/icons/group.png';
import IconTopology from '@/assets/icons/IconTopology.svg';
import IconLock from '@/assets/icons/IconLock.svg';
import IconLink from '@/assets/icons/IconLink.svg';
import IconIAMMonitor from '@/assets/icons/IconIAMMonitor.svg';
import IconIAMAudit from '@/assets/icons/IconIAMAudit.svg';
import IconCompliance from '@/assets/icons/IconCompliance.svg';
import IconCost from '@/assets/icons/IconCost.svg';
import IconUser from '@/assets/icons/IconUser.svg';
import IconResources from '@/assets/icons/IconResources.svg';
import LogoCloudOps from '@/assets/icons/LogoCloudOps.svg';
import a from '@/assets/icons/a.svg';
import b from '@/assets/icons/b.svg';

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
    <div className='relative  panel flex flex-col gap-16 h-full w-full bg-[#F6F5F2] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100 p-12 border-none'>
      <div className='flex gap-8 justify-center items-center relative'>
        <img className='w-16 p-2 bg-[#6667AB] rounded-xl' src={LogoCloudOps} alt='' />
        <p className='text-6xl font-semibold font-mono tracking-tighter'>CloudOps Portal</p>
      </div>

      <div className='flex gap-16 p-8 items-center justify-center'>
        {menuList.map((menu, idx) => (
          <button className='lg:col-span-1 flex flex-col items-center rounded hover:text-[#FEFAF6] hover:cursor-pointer p-8' onClick={() => navigateMenu(menu['path'])}>
            <img className='w-12' src={menu['logo']} alt={menu['menu']} />
            <p className='font-extrabold text-xl tracking-tighter mt-8'>{menu['menu']}</p>
          </button>
        ))}
      </div>

      <div className=''>
        <button className='btn bg-[#6667AB] border-none w-full'>
          <IconLogout className='text-[#fff]' />
          <p className='font-bold font-mono text-[#FFF] tracking-tight text-lg ml-2 shadow-none'>LOGOUT</p>
        </button>
      </div>
    </div>
  );
};

export default EntryMenu;
