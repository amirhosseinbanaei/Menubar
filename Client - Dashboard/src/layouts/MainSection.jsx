import { memo } from 'react';
import { Link } from 'react-router-dom';
const MainSection = memo(function MainSection({
  sectionTitle,
  children,
  linkButton = false,
}) {
  return (
    <div className='flex flex-wrap mb-5'>
      <div className='flex-none w-full max-w-full'>
        <div className='relative flex flex-col pb-5 break-words bg-white shadow-xl rounded-2xl'>
          <div className='px-3 lg:px-5 my-6'>
            <h6 className='dark:text-white font-bold'>{sectionTitle}</h6>
          </div>

          {linkButton ? (
            <div className='flex flex-col md:items-start'>
              <Link to={linkButton.href}>
                <div className='w-11/12 md:mr-6 md:w-96 h-auto mx-auto sm:flex-none xl:mb-0'>
                  <div className='relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border'>
                    <div className='flex-auto px-4 py-7'>
                      <div className='flex h-6 flex-row items-center justify-center'>
                        <p className='text-gray-600'>{linkButton.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              {children}
            </div>
          ) : (
            <div className='px-3 lg:px-5 w-full'>{children}</div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MainSection;