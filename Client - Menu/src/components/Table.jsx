import { defaultData } from '../data/default';
export default function Table() {
  return (
    <div className='max-w-screen-md mx-auto'>
      <table className='table-auto w-full text-right text-typography-700'>
        <thead>
          <tr>
            <th className='border-b border-typography-500 font-bold tracking-none text-typography-700 px-4 py-2'>
              روز ها
            </th>
            <th className='border-b border-typography-500 font-bold tracking-none text-typography-700 px-4 py-2'>
              از ساعت
            </th>
            <th className='border-b border-typography-500 font-bold tracking-none text-typography-700 px-4 py-2'>
              تا ساعت
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(defaultData.workingHours).map((eachData, index) => {
            return (
              <tr key={index}>
                <td className='border-b border-typography-500 text-[15px] px-4 py-2'>
                  {eachData[0]}
                </td>
                <td className='border-b border-typography-500 text-[15px] px-4 py-2'>
                  {eachData[1]['open']}
                </td>
                <td className='border-b border-typography-500 text-[15px] px-4 py-2'>
                  {eachData[1]['close']}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
