import { memo, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { splitNumber } from '../../utils/splitNumber';

const OrderCard = memo(function OrderCard({ oderedItemsData }) {
  const { language } = useContext(LanguageContext);
  return (
    <div
      className={`relative block overflow-hidden bg-cover rounded-xl w-40 h-40`}>
      <img
        src={oderedItemsData.image}
        alt=''
        className='absolute top-0 z-0'
      />
      <div className='absolute inset-0 bg-black/40'></div>
      <div className='relative w-full h-40 flex items-end justify-between px-4 py-2'>
        <div className='text-white flex flex-col gap-y-1'>
          <h3 className='font-bold text-white tracking-none'>
            {oderedItemsData[language].name}
          </h3>
          <p className='text-sm font-medium leading-6 tracking-none'>
            {splitNumber(oderedItemsData.price)}
          </p>
        </div>

        <span className='inline-flex items-center gap-0.5 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white absolute top-3 left-3'>
          x{oderedItemsData.quantity}
        </span>
      </div>
    </div>
  );
});

export default OrderCard;
