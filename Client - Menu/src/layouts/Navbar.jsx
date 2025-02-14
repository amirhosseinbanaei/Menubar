import { useContext, memo } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { MenuContext } from '../contexts/MenuContext';

const Navbar = memo(function Navbar() {
  const { showMobileMenuHandler } = useContext(MenuContext);
  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-0 py-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start'>
        <div className='flex items-center justify-between w-full p-4 mx-auto flex-wrap-inherit'>
          <div className='w-full flex justify-between items-center'>
            <div className='w-2/12 h-full flex items-center justify-center'>
              <div className='w-8 h-8 xl:hidden flex items-center justify-center shadow-sm bg-white rounded-xl'>
                <Bars3Icon
                  onClick={() => showMobileMenuHandler('open')}
                  className='w-5 h-5 text-black hover:cursor-pointer'
                />
              </div>
            </div>
            <div className='w-8/12 h-full flex justify-center items-center'>
              <h1 className='font-bold text-typography-navbar text-lg xl:text-xl'>
                کافه رستوران منو بار
              </h1>
            </div>
            <div className='w-2/12 h-full flex items-center justify-center'></div>
          </div>
        </div>
      </nav>
    </>
  );
});
export default Navbar;