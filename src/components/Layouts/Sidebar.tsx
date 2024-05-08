import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconUserPlus from '../Icon/IconUserPlus';
import IconLink from '../Icon/IconLink';
import IconCashBanknotes from '../Icon/IconCashBanknotes';
import IconBarChart from '../Icon/IconBarChart';
import IconBox from '../Icon/IconBox';
import IconBookmark from '../Icon/IconBookmark';
import IconCloudDownload from '../Icon/IconCloudDownload';
import IconLock from '../Icon/IconLock';
import IconNotes from '../Icon/IconNotes';
import LogoHybrix from '@/assets/icons/LogoHybrix.svg';

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  const [isDisabled, setIsDisabled] = useState(false);

  const handleMouseOver = () => {
    setIsDisabled(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <NavLink to='/' className='group' onClick={(e) => e.preventDefault()}>
                  <div className='flex items-center'>
                    <IconMenuUsers className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-gray-400 dark:text-gray-600 dark:group-hover:text-white-dark'>{t('governance')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/' className='group' onClick={(e) => e.preventDefault()}>
                  <div className='flex items-center'>
                    <IconNotes className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-gray-400 dark:text-gray-600 dark:group-hover:text-white-dark'>{t('resources')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/' className='group' onClick={(e) => e.preventDefault()}>
                  <div className='flex items-center'>
                    <IconCashBanknotes className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-gray-400 dark:text-gray-600 dark:group-hover:text-white-dark'>{t('cost')}</span>
                  </div>
                </NavLink>
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
                  </ul>
                </AnimateHeight>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/' className='group' onClick={(e) => e.preventDefault()}>
                  <div className='flex items-center'>
                    <IconLink className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-gray-400 dark:text-gray-600 dark:group-hover:text-white-dark'>{t('networkflow')}</span>
                  </div>
                </NavLink>
              </li>

              <li className='menu nav-item'>
                <NavLink to='/sg' className='group'>
                  <div className='flex items-center'>
                    <IconLock className='group-hover:!text-primary shrink-0' />
                    <span className='ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark'>{t('securitygroup')}</span>
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
