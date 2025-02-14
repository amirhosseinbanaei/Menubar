import Sidebar from '../components/Navigation/Sidebar';
import Navbar from '../components/Navigation/Navbar';
import { memo, useMemo } from 'react';

const LtrLayout = memo(function LtrLayout({ children }) {
  return (
    <>
      <div
        className='w-full h-auto'
        dir='ltr'>
        <div className='absolute w-full bg-blue-500 min-h-1/2'></div>
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
