import { memo } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
const FavoriteCard = memo(function FavoriteCard({ productData, removeHandler }) {
  return (
    <div className='w-full mx-auto sm:flex-none mb-5'>
      <div className='relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border'>
        <div className='flex-auto px-4 py-5'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-3'>
              <div className='w-14 md:w-16 h-full'>
                <img
                  src={`${productData.image}`}
                  className='w-full rounded-xl h-auto'
                  alt='تصویر محصول'
                />
              </div>
              <span className='w-auto flex flex-col items-center justify-center gap-1'>
                <h1 className='text-typography-700 text-sm md:text-[15px] font-bold tracking-tight'>
                  {productData['fa'].name}
                </h1>
              </span>
            </span>
            <span className='h-full w-auto items-center flex flex-col'>
              <span className='flex items-center gap-x-2 flex-row-reverse'>
                <TrashIcon
                  className='w-5 h-5 text-red-500 hover:cursor-pointer'
                  onClick={() => removeHandler(productData._id)}
                />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FavoriteCard;