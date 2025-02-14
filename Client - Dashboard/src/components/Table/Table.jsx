import { memo } from 'react';
import TableHeadRow from './TableHeadRow';

const Table = memo(function Table({ children, tableHeadData }) {
  return (
    <table className='w-full mb-0 align-top border-collapse text-typography-700'>
      <thead className='align-bottom'>
        <tr className='w-full flex '>
          <th className='py-3 w-14 text-right uppercase align-middle bg-transparent border-b border-collapse shadow-none text-sm border-b-solid tracking-none whitespace-nowrap text-typography-500'>
            ردیف
          </th>

          {tableHeadData.map((eachHeadTitle) => {
            return (
              <TableHeadRow
                key={eachHeadTitle}
                title={eachHeadTitle}
              />
            );
          })}
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
});

export default Table;
