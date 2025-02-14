import { memo, useContext, useMemo } from 'react';
import { splitNumber } from '../../../utils/splitNumber';
import {
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';
import { CartContext } from '../../../contexts/CartContext';
import { LanguageContext } from '../../../contexts/LanguageContext';
import SkeletonLoading from '../../Loaders/Skeleton';
const CartCard = memo(function CartCard({ productData }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);
  const { language } = useContext(LanguageContext);
  return (
    <div className='w-full mx-auto sm:flex-none mb-5'>
      <div className='relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border'>
        <div className='flex-auto px-4 py-5'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-3'>
              <div className='w-14 md:w-16 h-full'>
                <SkeletonLoading.Image
                  imageOptions={{
                    src: `${productData.image}`,
                    className: 'rounded-xl',
                  }}
                />
              </div>
              <span className='w-auto flex flex-col items-center justify-center gap-1'>
                <h1 className='text-typography-700 text-sm md:text-[15px] font-bold tracking-tight'>
                  {productData.name[language]}
                </h1>
                <p className='font-medium text-sm tracking-normal text-primary-500'>
                  {splitNumber(productData.price)}
                  <span className='text-typography-700 font-semibold text-[10.5px] md:text-[12.5px] mr-[4px]'>
                    تومان
                  </span>
                </p>
              </span>
            </span>
            <span className='h-full w-auto items-center flex flex-col'>
              <span className='flex items-center gap-x-2 flex-row-reverse'>
                {productData.quantity === 1 ? (
                  <TrashIcon
                    className='w-5 h-5 text-red-600 hover:cursor-pointer'
                    onClick={() => removeFromCart(productData._id)}
                  />
                ) : (
                  <MinusCircleIcon
                    className='w-5 h-5 text-typography-500 hover:cursor-pointer'
                    onClick={() => decreaseQuantity(productData._id)}
                  />
                )}
                {useMemo(() => {
                  return (
                    <p className='text-primary-500 mt-1 text-sm'>
                      {productData.quantity}
                    </p>
                  );
                }, [productData.quantity])}
                <PlusCircleIcon
                  className='w-5 h-5 text-typography-500 hover:cursor-pointer'
                  onClick={() => increaseQuantity(productData._id)}
                />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartCard;
