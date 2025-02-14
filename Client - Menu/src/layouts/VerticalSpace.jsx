import { memo } from 'react';

const VerticalSpace = memo(function VerticalSpace({ children }) {
  return (
    <div className={`flex flex-wrap mt-40`} aria-label='spacing-container'>
      <div className='flex-none w-full max-w-full'>{children}</div>
    </div>
  );
});

export default VerticalSpace;
