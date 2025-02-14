import { useLocation } from 'react-router-dom';
import HeroSection from './Herosection';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { memo, useMemo } from 'react';

const LtrLayout = memo(function LtrLayout({ children }) {
  const pathname = useLocation().pathname.split('/');
  return (
    <>
      <div
        className='w-full h-auto'
        dir='ltr'>
        <div className='absolute w-full bg-black min-h-1/2'>
          {pathname[1] === '' && <HeroSection />}
        </div>
        {pathname[1] === 'about' && (
          <div className='w-full h-full z-40'>
            <div className='w-full h-screen bg-black absolute'>
              <div className='w-full h-full bg-center bg-cover bg-no-repeat bg-[url(/header.png)]'></div>
            </div>
            <div className='w-full h-auto flex flex-col items-center justify-center gap-y-5 absolute z-50 top-24'></div>
            <div className='w-full h-full bg-black absolute bg-opacity-75'></div>
          </div>
        )}
        <Sidebar />
        <main className='relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl'>
          <Navbar />
          {useMemo(() => {
            return (
              <div className={`flex flex-wrap mx-3`}>
                <div className='flex-none w-full max-w-full px-3 my-10'>
                  {children}
                </div>
              </div>
            );
          }, [children])}
        </main>
      </div>
    </>
  );
});

export default LtrLayout;
