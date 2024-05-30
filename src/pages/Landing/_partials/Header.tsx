import { useEffect, useState } from 'react';
import '@/scss/header.scss';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [headerData, setHeaderData] = useState<any>({
    logoImage: '',
    menus: [],
  });
  const [headerCnt, setHeaderCnt] = useState(0);
  useEffect(() => {
    fetch('https://sy-workflow-demodata.s3.us-west-2.amazonaws.com/landingTemplate/template.json')
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.naviMenu && headerCnt < 1) {
          const timer = setTimeout(() => {
            setHeaderData((prev: any) => {
              return { ...prev, ...data.naviMenu };
            });
            setHeaderCnt((prev) => prev + 1);
          }, 1000);

          return () => clearTimeout(timer);
        }
      });
  }, [headerData, headerCnt]);

  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <a href='#'>
          <img className='navbar__logo' src={headerData.logoImage} alt='' />
        </a>
      </div>
      <div className='navbar-center hidden lg:flex m-[2rem] text-[1.8rem]'>
        <ul className='menu menu-horizontal px-1 gap-12'>
          {headerData.menus.map(
            (
              menu: {
                text: string;
                nextPath?: string;
                subMenus?: { text: string; nextPath?: string }[];
              },
              idx: number
            ) => {
              if (menu.nextPath && !menu.subMenus) {
                return (
                  <li key={idx}>
                    <a className='text-[1.8rem]'>{menu.text}</a>
                  </li>
                );
              } else {
                return (
                  <li key={idx}>
                    <details className='relative'>
                      <summary className='text-[1.8rem]'>{menu.text}</summary>
                      <ul className='p-2 z-50 absolute'>
                        {menu.subMenus?.map((subMenu, idx) => {
                          return (
                            <li key={idx}>
                              <a className='text-[1.4rem]'>{subMenu.text}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  </li>
                );
              }
            }
          )}
        </ul>
      </div>

      <div className='navbar-end'>
        <button className='btn' onClick={() => navigate('/entry')}>
          Login
        </button>
      </div>
    </div>
  );
};
