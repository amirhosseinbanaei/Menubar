import { memo } from 'react';

const TableBodyRow = memo(function TableBodyRow({
  phoneNubmer,
  name,
  index,
  currentPage,
}) {
  return (
    <tr className='w-full grid grid-flow-col-dense'>
      <td className='align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent'>
        <div className='flex py-1'>
          <div className='flex flex-col justify-center'>
            <h6 className='mb-0 text-sm font-medium leading-normal tracking-none'>
              {currentPage * index + 1}
            </h6>
          </div>
        </div>
      </td>
      <td className='align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent'>
        <div className='flex py-1'>
          <div className='flex flex-col justify-center'>
            <h6 className='mb-0 text-sm font-medium leading-normal tracking-none'>
              {name}
            </h6>
          </div>
        </div>
      </td>
      <td className='py-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent'>
        <p className='mb-0 text-sm font-medium text-center tracking-none'>
          {phoneNubmer}
        </p>
      </td>
      <td className='py-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent'>
        <p className='mb-0 text-sm text-center font-medium tracking-none'>0</p>
      </td>
    </tr>
  );
});

export default TableBodyRow;
