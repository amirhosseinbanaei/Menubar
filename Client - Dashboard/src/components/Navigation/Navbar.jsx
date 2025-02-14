import { useContext, useMemo } from 'react';
import { MenuContext } from '../../contexts/MenuContext';
import { AuthContext } from '../../contexts/AuthContext';

import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { showMobileMenuHandler } = useContext(MenuContext);
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      {useMemo(() => {
        return (
          <nav className='relative flex flex-wrap items-center justify-between px-0 py-1 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start'>
            <div className='flex items-center justify-between w-full py-4 mx-auto flex-wrap-inherit'>
              <div className='w-full flex justify-between'>
                <div className='w-auto h-12 flex gap-x-3 items-center'>
                  <div className='w-10 h-10 rounded-full'>
                    <img
                      src='/default-admin.jpg'
                      className='w-full h-full rounded-full'
                      alt=''
                    />
                  </div>
                  <h1 className='font-semibold text-white'>
                    {currentUser && currentUser.fullName}
                  </h1>
                </div>
                <div className='w-28 xl:w-20 h-auto flex items-center justify-end px-1 gap-x-3'>
                  <Bars3Icon
                    onClick={() => showMobileMenuHandler('open')}
                    className='w-6 h-6 text-white xl:hidden hover:cursor-pointer'
                  />
                  <ArrowLeftOnRectangleIcon
                    onClick={logout}
                    className='w-6 h-6 text-white hover:cursor-pointer hover:scale-110'
                  />
                </div>
              </div>
            </div>
          </nav>
        );
      }, [showMobileMenuHandler, logout, currentUser])}
    </>
  );
}
