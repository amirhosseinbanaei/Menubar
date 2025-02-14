import MainSection from '../../layouts/MainSection';

export default function BouncingLoader() {
  return (
    <>
      <div className='flex justify-center'>
        <div className='dot animate-loader'></div>
        <div className='dot animate-loader animation-delay-200'></div>
        <div className='dot animate-loader animation-delay-400'></div>
      </div>
      <h1 className='text-typography-500 animate-pulse text-base tracking-normal'>
        لطفا کمی منتظر بمانید ...
      </h1>
    </>
  );
}

export function BouncingLoaderWithContainer() {
  return (
    <>
      <MainSection ctaButton={false}>
        <div className='w-full h-96 flex flex-col items-center justify-center'>
          <BouncingLoader />
        </div>
      </MainSection>
    </>
  );
}
