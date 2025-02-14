import { memo } from 'react';

const HeroSection = memo(function HeroSection() {
  return (
    <div className='w-full h-full z-40' role='document'>
      <div className='w-full h-full bg-black absolute'>
        <div className='w-full h-full bg-center bg-cover bg-no-repeat bg-[url(https://assets.menu-bar.ir/default/header.png)]'></div>
      </div>
      <div 
        className='w-full h-auto flex flex-col items-center justify-center gap-y-5 absolute z-50 
           top-24
           py-3 px-6 lg:px-20 xl:pl-12 xl:pr-80'>
        <p className='text-lg xl:text-[22px] text-typography-herosection font-bold'>
          لحظات خوشی را برای شما آرزومندیم
        </p>
      </div>
      <div className='w-full h-full bg-black absolute bg-opacity-75'></div>
    </div>
  );
});

export default HeroSection;
