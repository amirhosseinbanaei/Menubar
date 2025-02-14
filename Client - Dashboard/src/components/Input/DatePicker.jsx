import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
export default function CustomDatePicker({ options, methods }) {
  return (
    <>
      <DatePicker
        containerClassName='w-full'
        render={
          <input
            name={options.name}
            {...methods.register(options.name)}
            className='block text-sm w-full px-5 py-2 text-typography-700 placeholder:text-typography-500 placeholder:text-sm focus:ring-0 bg-white border border-gray-200 rounded-xl focus:outline-primary-500'
          />
        }
        format='YYYY/MM/DD'
        calendar={persian}
        locale={persian_fa}
        calendarPosition='bottom-center'
        onChange={(e, data) => {
          methods.setValue(options.name, data.validatedValue[0], {
            shouldDirty: true,
          });
        }}
      />
    </>
  );
}
