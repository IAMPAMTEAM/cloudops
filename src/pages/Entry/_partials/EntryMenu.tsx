import IconLogout from '@/components/Icon/IconLogout';
import { useNavigate } from 'react-router-dom';
import IconTopology from '@/assets/icons/TOPOLOGY.svg';
import IconLock from '@/assets/icons/NETWORKPOLICY.svg';
import IconLink from '@/assets/icons/NETWORKFLOW.svg';
import IconCost from '@/assets/icons/IconCost.svg';
import IconUser from '@/assets/icons/GOVERNANCE.svg';
import IconHome from '@/assets/icons/HOME.svg';
import IconResources from '@/assets/icons/RESOURCES.svg';
import IconDashboard from '@/assets/icons/DASHBOARD.svg';
import IconNetwork from '@/assets/icons/NETWORK.svg';
import IconCredentials from '@/assets/icons/CREDENTIALS.svg';
import IconCompliance from '@/assets/icons/COMPLIANCES.svg';
import IconMonitor from '@/assets/icons/MONITOR.svg';
import IconLog from '@/assets/icons/LOG.svg';
import IconChatbot from '@/assets/icons/AICHATBOT.svg';
import IconAdmin from '@/assets/icons/ADMIN.svg';
import LogoCloudOps from '@/assets/icons/LogoCloudOps.svg';

const EntryMenu = () => {
  const menuList = [
    {
      logo: IconHome,
      menu: 'Home',
      path: '/dashboard-summary',
    },
    {
      logo: IconDashboard,
      menu: 'Dashboard',
      path: '/dashboard-overview',
    },
    {
      logo: IconNetwork,
      menu: 'Network',
      path: '/network/cidr',
    },
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
      path: '/cost/region/daily',
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
      menu: 'Policy',
      path: '/sg',
    },
    {
      logo: IconCredentials,
      menu: 'Credentials',
      path: '/credentials',
    },
    {
      logo: IconCompliance,
      menu: 'Compliance',
      path: '/compliance',
    },
    {
      logo: IconMonitor,
      menu: 'Monitor',
      path: '/monitor',
    },
    {
      logo: IconLog,
      menu: 'Log',
      path: '/log',
    },
    {
      logo: IconChatbot,
      menu: 'Chatbot',
      path: '/chatbot',
    },
    {
      logo: IconAdmin,
      menu: 'Admin',
      path: '/admin',
    },
  ];

  const navigate = useNavigate();

  const navigateMenu = (path: string) => navigate(path);

  return (
    <div className='relative'>
      <div className='flex gap-4 justify-center items-cente'>
        <img className='w-16 p-2 bg-[#6667AB] rounded-xl ' src={LogoCloudOps} alt='' />
        <p className='text-6xl font-bold uppercase tracking-tighter text-[#fff]'>CloudOps Portal</p>
      </div>

      <div className='flex m-[2.4rem] flex-wrap w-[1000px] relative items-end'>
        {menuList.map((menu, idx) => {
          if (!(menu.menu === 'Compliance' || menu.menu === 'Monitor' || menu.menu === 'Log' || menu.menu === 'Chatbot' || menu.menu === 'Admin'))
            return (
              <div>
                <button
                  className='w-[12.5rem] flex flex-col items-center rounded hover:text-[#6667AB] hover:cursor-pointer p-8 fill-[#000] opacity-80 hover:opacity-100 hover:translate-y-[-8px] delay-50 duration-500'
                  onClick={() => navigateMenu(menu['path'] ?? '')}
                >
                  <img className='w-[2rem] fill-[#000]' src={menu['logo']} alt={menu['menu']} />
                  <p className='font-extrabold uppercase text-[1rem] tracking-tighter mt-8 text-[#fff]  '>{menu['menu']}</p>
                </button>
              </div>
            );
          else {
            return (
              <div>
                <button className='w-[12.5rem] flex flex-col items-center rounded hover:text-[#6667AB] hover:cursor-not-allowed opacity-20 p-8' onClick={() => navigateMenu(menu['path'] ?? '')}>
                  <img className='w-[2rem] fill-[#000]' src={menu['logo']} alt={menu['menu']} />
                  <p className='font-extrabold uppercase text-[1rem] tracking-tighter mt-8 text-[#fff]  '>{menu['menu']}</p>
                </button>
              </div>
            );
          }
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
