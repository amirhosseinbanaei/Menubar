import useReactQuery from '../hooks/useReactQuery';
import MainSection from '../layouts/MainSection';
import { getReservedTables } from '../services/Axios/Requests/Reserve';
import { digitsEnToFa } from 'persian-tools';
export default function ReservedTable() {
  const { mainData } = useReactQuery('Reseved-Table', getReservedTables);
  return (
    <MainSection sectionTitle={'میز های رزرو شده'}>
      {mainData && (
        <div className='max-w-screen-md mx-auto my-5'>
          <table className='table-auto w-full text-right text-typography-700'>
            <thead>
              <tr>
                <th className='border-b border-typography-500 font-bold tracking-none text-typography-700 p-4'>
                  روز
                </th>
                <th className='border-b border-typography-500 font-bold tracking-none text-typography-700 p-4'>
                  ساعت
                </th>
                <th className='border-b border-typography-500 font-bold tracking-none text-typography-700 p-4'>
                  نام و نام خانوادگی
                </th>
                <th className='border-b border-typography-500 font-bold tracking-none text-typography-700 p-4'>
                  شماره همراه
                </th>
                <th className='border-b border-typography-500 font-bold tracking-none text-typography-700 p-4'>
                  تعداد نفرات
                </th>
              </tr>
            </thead>
            <tbody>
              {mainData.TableReserves.map((eachData, index) => {
                console.log(eachData);
                return (
                  <tr key={index}>
                    <td className='border-b border-typography-500 text-[15px] px-4 py-4'>
                      {digitsEnToFa(eachData.date.replaceAll('-','/'))}
                    </td>
                    <td className='border-b border-typography-500 text-[15px] px-4 py-4'>
                      {digitsEnToFa(eachData.time)}
                    </td>
                    <td className='border-b border-typography-500 text-[15px] px-4 py-4'>
                      {eachData.fullName}
                    </td>
                    <td className='border-b border-typography-500 text-[15px] px-4 py-4'>
                      {digitsEnToFa(eachData.phoneNumber)}
                    </td>
                    <td className='border-b border-typography-500 text-[15px] px-4 py-4'>
                      {digitsEnToFa(eachData.persons)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </MainSection>
  );
}
