import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { memo, useMemo } from 'react';

const RtlLayout = memo(function RtlLayout({ children }) {
  return (
    <>
      <div
        className='w-full h-auto font-rtl'
        dir='rtl'>
        <div className='absolute w-full bg-black min-h-1/2'></div>
        <Sidebar />
        <main className='relative lg:pt-2 px-2 md:px-3 lg:px-5 xl:px-7 h-full max-h-screen transition-all duration-200 ease-in-out xl:mr-68 rounded-xl'>
          <Navbar />
          {useMemo(() => {
            return (
              <div className={`flex flex-wrap`}>
                <div className='flex-none w-full max-w-full'>{children}</div>
              </div>
            );
          }, [children])}
        </main>
      </div>
    </>
  );
});

export default RtlLayout;
