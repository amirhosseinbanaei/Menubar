import { memo } from 'react';
const MainSection = memo(function MainSection({ sectionTitle, children }) {
  return (
    <div className='flex flex-wrap mb-5'>
      <div className='flex-none w-full max-w-full'>
        <div className='relative flex flex-col pb-5 break-words bg-white shadow-xl rounded-2xl'>
          {sectionTitle ? (
            <div className='px-3 lg:px-5 my-6'>
              <h6 className='font-bold'>{sectionTitle}</h6>
            </div>
          ) : (
            <div className='px-3 lg:px-5 mt-6'></div>
          )}
          <div className='px-3 lg:px-5 w-full'>{children}</div>
        </div>
      </div>
    </div>
  );
});

export default MainSection;
