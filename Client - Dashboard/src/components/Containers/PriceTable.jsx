import { splitNumber } from '../../utils/splitNumber';
import { memo, useContext, useMemo } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const PriceTable = memo(function PriceTable({ title, price, items, date }) {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <div className='w-full h-auto p-4 flex flex-col gap-y-4 rounded-md'>
        <div className='w-full h-auto flex items-center'>
          <div className='w-1/3'>
            <span className='block py-6 m-0 text-sm whitespace-nowrap text-typography-700'>
              <span className={`text-lg font-semibold text-typography-700`}>
                کافه رستوران منوبار
              </span>
            </span>
          </div>
          <div className='w-2/3 h-full justify-end items-center flex gap-x-2'>
            <p className='text-typography-700 font-bold text-sm'>تاریخ ثبت :</p>
            <p className='text-typography-700 font-bold text-sm'>{date}</p>
          </div>
        </div>
        <span className='w-full flex justify-between'>
          <p className='text-sm text-typography-700 font-bold'>سفارش</p>
          <p className='text-sm text-typography-700 font-bold'>تعداد</p>
          <p className='text-typography-700 font-bold'>قیمت</p>
        </span>
        {useMemo(() => {
          return items.map((eachCartItem) => {
            const eachItemFinalPrice =
              eachCartItem.price;
            return (
              <span
                key={eachCartItem._id}
                className='w-full flex justify-between items-center'>
                <p className='text-sm text-typography-700 font-bold'>
                  {eachCartItem[language].name}
                </p>
                <p className='text-sm text-typography-700 font-bold'>
                  x{eachCartItem.quantity}
                </p>
                <p className='text-typography-700 font-bold'>
                  {splitNumber(eachItemFinalPrice)}{' '}
                  <span className='text-xs mx-[1px]'>تومان</span>
                </p>
              </span>
            );
          });
        }, [items])}

        <span className='w-full flex justify-between items-center'>
          <p className='text-sm text-typography-700 font-bold mt-1'>{title}</p>
          {useMemo(() => {
            return (
              <p className='text-typography-700 font-bold'>
                {splitNumber(price)}{' '}
                <span className='text-xs mx-[1px]'>تومان</span>
              </p>
            );
          }, [price])}
        </span>
      </div>
    </>
  );
});

export default PriceTable;
