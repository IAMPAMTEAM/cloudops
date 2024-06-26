import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconUser from '../Icon/IconUser';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconCashBanknotes from '../Icon/IconCashBanknotes';
import IconBarChart from '../Icon/IconBarChart';
import IconLock from '../Icon/IconLock';
import IconNotes from '../Icon/IconNotes';
import IconChartSquare from '../Icon/IconChartSquare';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import IconVideo from '../Icon/IconVideo';
import IconLink from '../Icon/IconLink';
import IconCreditCard from '../Icon/IconCreditCard';
import IconListCheck from '../Icon/IconListCheck';
import IconTrendingUp from '../Icon/IconTrendingUp';
import IconChatNotification from '../Icon/IconChatNotification';
import IconInfoHexagon from '../Icon/IconInfoHexagon';
import LogoHybrix from '@/assets/icons/LogoHybrix.svg';

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  return (
    <div>
      <nav className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300`}>
        <div className='bg-white dark:bg-black h-full'>
          <div className='flex justify-between items-center px-4 py-3'>
            <NavLink to='/' className='main-logo flex items-center shrink-0'>
              <img className='w-8 ml-[5px] flex-none' src={LogoHybrix} alt='logo' />
              <span className='text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light'>CloudOps</span>
            </NavLink>

            <button
              type='button'
              className='collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180'
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className='m-auto rotate-90' />
            </button>
          </div>
          <PerfectScrollbar className='h-[calc(100vh-80px)] relative'>
            <ul className='relative font-semibold space-y-0.5 p-4 py-0'>
              <li className='menu nav-item'>
                <NavLink to='/dashboard-summary' className='group'>
                  <div className='flex items-center'>
                    <IconMenuDashboard className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('dashboardSummary')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/dashboard-overview' className='group'>
                  <div className='flex items-center'>
                    <IconMenuApps className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('dashboardOverview')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <button type='button' className={`${currentMenu === 'network' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('network')}>
                  <div className='flex items-center'>
                    <IconLink className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('network')}</span>
                  </div>

                  <div className={currentMenu !== 'network' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight className='seungyeon' duration={300} height={currentMenu === 'network' ? 'auto' : 0}>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/network/cidr'>{t('networkCidr')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/network/ports'>{t('networkPorts')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/network/nodes'>{t('networkNodes')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className='menu nav-item'>
                <NavLink to='/governance' className='group'>
                  <div className='flex items-center'>
                    <IconMenuUsers className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('governance')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/resources' className='group'>
                  <div className='flex items-center'>
                    <IconNotes className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('resources')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <button type='button' className={`${currentMenu === 'cost' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('cost')}>
                  <div className='flex items-center'>
                    <IconCashBanknotes className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('cost')}</span>
                  </div>

                  <div className={currentMenu !== 'cost' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'cost' ? 'auto' : 0}>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/cost/region/daily'>{t('costRegionDaily')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/cost/region/monthly'>{t('costRegionMonthly')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/cost/service/daily'>{t('costServiceDaily')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/cost/service/monthly'>{t('costServiceMonthly')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/cost/account/daily'>{t('costAccountDaily')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/cost/account/monthly'>{t('costAccountMonthly')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <li className='menu nav-item'>
                <button type='button' className={`${currentMenu === 'topology' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('topology')}>
                  <div className='flex items-center'>
                    <IconBarChart className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('topology')}</span>
                  </div>

                  <div className={currentMenu !== 'topology' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'topology' ? 'auto' : 0}>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/regional-resources'>{t('regionalResources')}</NavLink>
                    </li>
                    <li>
                      <NavLink to='/subnets'>{t('subnets')}</NavLink>
                    </li>
                    <li>
                      <NavLink to='/vpc-gateways'>{t('vpcGateways')}</NavLink>
                    </li>
                    <li>
                      <NavLink to='/subnet-routes'>{t('subnetRoutes')}</NavLink>
                    </li>
                    <li>
                      <NavLink to='/load-balancers'>{t('loadBalancers')}</NavLink>
                    </li>
                    <li>
                      <NavLink to='/vpc-peering'>{t('vpcPeering')}</NavLink>
                    </li>
                    <li>
                      <NavLink to='/internet-elb'>{t('internetElb')}</NavLink>
                    </li>
                    <li>
                      <NavLink to='/subnets-nodes'>{t('subnetsNodes')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <li className='menu nav-item'>
                <button type='button' className={`${currentMenu === 'networkflow' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('networkflow')}>
                  <div className='flex items-center'>
                    <IconChartSquare className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('networkflow')}</span>
                  </div>

                  <div className={currentMenu !== 'networkflow' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'networkflow' ? 'auto' : 0}>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/network-flow/subnet'>{t('networkFlowSubnet')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/network-flow/vpc'>{t('networkFlowVpc')}</NavLink>
                    </li>
                  </ul>
                  {/* <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/network-flow/internal-elb'>{t('networkFlowInternalElb')}</NavLink>
                    </li>
                  </ul>
                  <ul className='sub-menu text-gray-500'>
                    <li>
                      <NavLink to='/network-flow/internet-elb'>{t('networkFlowInternetElb')}</NavLink>
                    </li>
                  </ul> */}
                </AnimateHeight>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/sg' className='group'>
                  <div className='flex items-center'>
                    <IconLock className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('securitygroup')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/credentials' className='group'>
                  <div className='flex items-center'>
                    <IconCreditCard className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('credentials')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/event-viewer' className='group'>
                  <div className='flex items-center'>
                    <IconVideo className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('EventViewer')}</span>
                  </div>
                </NavLink>
              </li>

              {/* compliance */}
              <li className='menu nav-item'>
                <NavLink to='/compliance' className='group'>
                  <div className='flex items-center'>
                    <IconListCheck className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('compliance')}</span>
                  </div>
                </NavLink>
              </li>

              {/* log */}
              <li className='menu nav-item'>
                <NavLink to='/log' className='group'>
                  <div className='flex items-center'>
                    <IconInfoHexagon className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('log')}</span>
                  </div>
                </NavLink>
              </li>

              {/* monitor */}
              <li className='menu nav-item'>
                <NavLink to='/monitor' className='group hover:cursor-not-allowed opacity-50'>
                  <div className='flex items-center'>
                    <IconTrendingUp className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('monitor')}</span>
                  </div>
                </NavLink>
              </li>

              {/* chatbot */}
              <li className='menu nav-item'>
                <NavLink to='/chatbot' className='group hover:cursor-not-allowed opacity-50'>
                  <div className='flex items-center'>
                    <IconChatNotification className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('chatbot')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/admin' className='group hover:cursor-not-allowed opacity-50'>
                  <div className='flex items-center'>
                    <IconUser className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('admin')}</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
