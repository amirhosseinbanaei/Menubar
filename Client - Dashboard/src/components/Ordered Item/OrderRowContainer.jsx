import { digitsEnToFa } from 'persian-tools';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrinterIcon } from '@heroicons/react/24/outline';
import useLocalStorage from '../../hooks/useLocalStorage';
const OrderRowContainer = memo(function OrderRowContainer({
  eachOrderedData,
  children,
}) {
  const [, setReceipt] = useLocalStorage('receipt');
  const navigate = useNavigate();
  const splitTime = eachOrderedData.createdAt.split('T');
  const orderDate = splitTime[0].replaceAll('-', '/');
  const orderClock = splitTime[1].split('.')[0];

  const printButtonHandler = async () => {
    await setReceipt(eachOrderedData);
    return navigate(`/receipt`);
  };
  return (
    <>
      <hr className='h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />
      <div className='w-full h-auto flex flex-col gap-y-3 rounded-lg px-5 pb-3'>
        <div className='w-full h-auto flex items-center justify-between'>
          <div className='w-full h-auto flex gap-x-5 items-center'>
            <h1 className='text-typography-700 mt-1 font-bold text-[15px] tracking-none'>{`سفارش ${digitsEnToFa(
              orderDate,
            )} در ساعت ${digitsEnToFa(orderClock)}`}</h1>

            <span className='w-24 h-8 bg-green-200 rounded-xl flex items-center justify-center'>
              <p className='text-sm text-green-600'>{eachOrderedData.type}</p>
            </span>
            <span className='w-24 h-8 bg-green-200 rounded-xl flex items-center justify-center'>
              <p className='text-sm text-green-600'>
                {eachOrderedData.isCash ? 'نقدی' : 'آنلاین'}
              </p>
            </span>
          </div>

          <button
            type='button'
            onClick={printButtonHandler}>
            <PrinterIcon className='w-6 h-6 text-typography-700' />
          </button>
        </div>

        <div className='w-full h-auto flex pt-1 gap-x-5'>{children}</div>
      </div>
    </>
  );
});

export default OrderRowContainer;
