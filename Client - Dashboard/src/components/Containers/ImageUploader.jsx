import { useEffect, useState } from 'react';
import InputLable from '../Input/InputLable';
import Input from '../Input/Input';
export default function ImageUploader({ methods, label }) {
  const [newCover, setNewCover] = useState(null);
  useEffect(() => {
    if (methods.getValues('image')) {
      const getImage = methods.getValues('image');
      if (getImage[length] == 0 || typeof getImage === 'string') {
        return setNewCover(null);
      } else {
        setNewCover(getImage[0]);
      }
    }
  }, [methods.watch('image')]);
  return (
    <>
      <div className='mb-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='col-span-full'>
          <InputLable label={label} />
          <div
            className={`mt-3 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 ${
              !methods.getValues('image') && !newCover ? 'py-10' : 'pb-10 pt-80'
            } b relative`}>
            <div className='text-center flex flex-col items-center'>
              {!methods.getValues('image') && !newCover ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mx-auto h-14 w-14 text-gray-300'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  />
                </svg>
              ) : (
                <div className='h-auto w-full absolute top-5 px-1 md:px-0 mx-auto'>
                  <img
                    src={
                      !newCover
                        ? `${methods.getValues('image')}`
                        : URL.createObjectURL(newCover)
                    }
                    alt='Item image.'
                    className='h-72 mx-auto rounded-xl'
                  />
                </div>
              )}
              <div className='w-full flex text-sm leading-6 text-gray-600 flex-col gap-y-4 items-center'>
                <div className='w-full h-12 relative'>
                  <span className='absolute z-0 w-full h-full tracking-none flex items-center justify-center font-bold text-primary-500 text-base right-0'>
                    {!methods.getValues('image')
                      ? 'Upload a file'
                      : 'Change Image'}
                  </span>
                  <Input
                    methods={methods}
                    options={{ type: 'file', name: 'image', accept:"image/*" }}
                    customStyle={'absolute top-0 -mt-0 z-10 opacity-0'}
                  />
                </div>
                <p className='text-xs leading-5 tracking-none font-medium text-typography-500'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
