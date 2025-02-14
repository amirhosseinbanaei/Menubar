import { splitNumber } from '../../utils/splitNumber';
import { memo, useContext, useMemo } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const PriceTable = memo(function PriceTable({ title, price, items }) {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <div className='w-full h-auto p-4 flex flex-col gap-y-3 rounded-md'>
        {useMemo(() => {
          return items.map((eachCartItem) => {
            const eachItemFinalPrice =
              eachCartItem.price * eachCartItem.quantity;
            return (
              <span
                key={eachCartItem._id}
                className='w-full flex justify-between'>
                <p className='text-sm text-typography-700 font-bold'>
                  {eachCartItem.name[language]}
                </p>
                <p className='text-typography-700 font-bold'>
                  {splitNumber(eachItemFinalPrice)}{' '}
                  <span className='text-xs mx-[1px]'>تومان</span>
                </p>
              </span>
            );
          });
        }, [items])}

        <span className='w-full flex justify-between'>
          <p className='text-sm text-typography-700 font-bold'>{title}</p>
          {useMemo(() => {
            return (
              <p className='text-primary-500 font-bold'>
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

const PriceTableButton = memo(function PriceTableButton({
  handler,
  buttonTitle,
}) {
  return (
    <button
      type='button'
      onClick={handler && handler}
      className='w-full mt-5 py-3 rounded-xl text-white bg-primary-500 text-sm font-bold tracking-normal hover:cursor-pointer hover:scale-105 duration-500'>
      {buttonTitle}
    </button>
  );
});
export default PriceTable;
export { PriceTableButton };
