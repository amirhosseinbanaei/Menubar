import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

// Context
import { MenuContext } from '../contexts/MenuContext';
import { LanguageContext } from '../contexts/LanguageContext';

// Icons
import {
  HomeIcon,
  ShoppingCartIcon,
  HeartIcon,
  InformationCircleIcon,
  XMarkIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

import LanguageMenu from '../components/Menu/Menu';
import { defaultData } from '../data/default';

function Sidebar() {
  const { showMenu, showMobileMenuHandler } = useContext(MenuContext);
  useEffect(() => {
    showMobileMenuHandler('close');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  return (
    <>
      <aside
        className={`fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 antialiased transition-transform duration-200 border-0 bg-sidebar-background shadow-xl max-w-64 ease-nav-brand z-990 rounded-2xl xl:translate-x-0
        ${
          language !== 'fa' && language !== 'ar'
            ? 'left-0 xl:ml-4'
            : 'right-0 xl:mr-4'
        }
        ${
          showMenu
            ? language !== 'fa' && language !== 'ar'
              ? 'translate-x-4'
              : '-translate-x-4'
            : language !== 'fa' && language !== 'ar'
            ? '-translate-x-80'
            : 'translate-x-80'
        }
        `}
        aria-expanded='false'>
        <div className='w-full h-auto flex flex-col top-0 absolute z-20'>
          <div className='h-auto'>
            <XMarkIcon
              className={`absolute w-6 h-6 top-7 ${
                language !== 'fa' && language !== 'ar' ? 'right-5' : 'left-5'
              } opacity-50 xl:hidden cursor-pointer fas fa-times text-typography-700`}
              onClick={() => showMobileMenuHandler('close')}
            />
            <span className='block px-8 py-6 m-0 text-sm whitespace-nowrap text-typography-700'>
              <img
                src='/logos/logo.png'
                className='inline w-7 h-8 transition-all duration-200 dark:hidden ease-nav-brand'
                alt='main_logo'
              />
              <span
                className={`mx-4 font-semibold transition-all duration-200 ease-nav-brand`}>
                منو بار
              </span>
            </span>
          </div>
          <hr className='h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />
        </div>
        <div className='w-full h-full flex flex-col top-0 pt-20 absolute'>
          <div className='items-center block w-full h-full overflow-y-auto grow basis-full'>
            <ul className='flex flex-col pl-0 mb-0'>
              {defaultData.languages.length >= 2 && (
                <li className='mt-0.5 w-full'>
                  <LanguageMenu />
                </li>
              )}
              {navItems.map((eachNavItem) => {
                return (
                  <li
                    key={eachNavItem.id}
                    className='mt-0.5 w-full'>
                    <Link
                      className='py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors hover:bg-primary-300 hover:text-primary-500 rounded-xl'
                      to={eachNavItem.href}>
                      <div
                        className={`${
                          language === 'ltr' ? 'mr-2' : 'ml-2'
                        } flex h-9 w-9 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2`}>
                        <eachNavItem.icons className='w-6 h-6 duration-300 pointer-events-none ease' />
                      </div>
                      <span className='ml-1 tracking-normal duration-300 opacity-100 pointer-events-none ease'>
                        {t(`sidebarItems.${eachNavItem.title}`)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

// const SocialContainer = memo(function SocialContainer({
//   width,
//   imageName,
//   title,
// }) {
//   return (
//     <div
//       className={`${width} h-20 bg-white border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border flex items-center justify-center`}>
//       <img
//         src={`/icons/${imageName}.png`}
//         className='w-7 h-7'
//         alt=''
//       />
//       <p className='text-typography-700 mx-1 text-sm mt-1'>{title}</p>
//     </div>
//   );
// });

const navItems = [
  { id: 1, title: 'home', href: '/', icons: HomeIcon },
  { id: 2, title: 'cart', href: '/cart', icons: ShoppingCartIcon },
  { id: 3, title: 'favorite', href: '/favorite', icons: HeartIcon },
  { id: 7, title: 'reserve', href: '/table-reserve', icons: CalendarDaysIcon },
  { id: 6, title: 'orders', href: '/orders', icons: CurrencyDollarIcon },
  { id: 4, title: 'account', href: '/account', icons: UserCircleIcon },
  {
    id: 5,
    title: 'about',
    href: '/about',
    icons: InformationCircleIcon,
  },
];

export default Sidebar;
