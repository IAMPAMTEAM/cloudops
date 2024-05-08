import IconLogout from '@/components/Icon/IconLogout';
import { useNavigate } from 'react-router-dom';
import IconUsers from '@/assets/icons/group.png';
import IconAssets from '@/assets/icons/IconAssets.svg';
import IconIAMPolicy from '@/assets/icons/IconIAMPolicy.svg';
import IconIAMMonitor from '@/assets/icons/IconIAMMonitor.svg';
import IconIAMAudit from '@/assets/icons/IconIAMAudit.svg';
import IconCompliance from '@/assets/icons/IconCompliance.svg';
import IconAdmin from '@/assets/icons/user.png';
import LogoZeroTrust from '@/assets/icons/LogoZeroTrust.svg';
import a from '@/assets/icons/a.svg';
import b from '@/assets/icons/b.svg';

const EntryMenu = () => {
  const menuList = [
    {
      logo: IconAssets,
      menu: 'Topology',
      path: '/topology',
    },
    {
      logo: IconIAMPolicy,
      menu: 'Security Group',
      path: '/sg',
    },
  ];

  const navigate = useNavigate();

  const navigateMenu = (path: string) => navigate(path);

  return (
    <div className='relative  panel flex flex-col gap-16 h-full w-full bg-[#F6F5F2] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-100 p-12 border-none'>
      <div className='flex gap-8 justify-center items-center relative'>
        <img className='w-16 p-2 bg-[#6667AB] rounded-xl' src={LogoZeroTrust} alt='' />
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

      <div className='flex flex-col '>
        <p className='font-semibold text-lg mt-0 mr-auto ml-auto mb-4'>CS Download Link</p>
        <div className='grid lg:grid-cols-2 lg:grid-rows-2 gap-8'>
          <button className='btn lg:col-span-1 bg-opacity-0 border-2 border-[#236969] hover:bg-opacity-20 shadow-none'>
            <p className='text-[#236969]'>[Online] Server-CS</p>
          </button>
          <button className='btn lg:col-span-1 bg-opacity-0 border-2 border-[#2794EB] hover:bg-opacity-20 shadow-none'>
            <p className='text-[#2794EB]'>[Online] DB-CS</p>
          </button>
          <button className='btn lg:col-span-1 bg-opacity-0 border-2 border-[#236969] hover:bg-opacity-20 shadow-none'>
            <p className='text-[#236969]'>[Online] Server-CS</p>
          </button>
          <button className='btn lg:col-span-1 bg-opacity-0 border-2 border-[#2794EB] hover:bg-opacity-20 shadow-none'>
            <p className='text-[#2794EB]'>[Online] DB-CS</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryMenu;
