import { useId } from 'react';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/analog_time_picker';

export default function CustomTimePicker({ options, methods }) {
  const randomId = useId();
  return (
    <>
      <DatePicker
        containerClassName='w-full'
        disableDayPicker
        format='HH:mm'
        calendarPosition='bottom-center'
        shadow
        plugins={[
          <TimePicker
            key={randomId}
            hideSeconds
          />,
        ]}
        render={
          <input
            name={options.name}
            {...methods.register(options.name)}
            className='block text-sm w-full px-5 py-2 text-typography-700 placeholder:text-typography-500 placeholder:text-sm focus:ring-0 bg-white border border-gray-200 rounded-xl focus:outline-primary-500'
          />
        }
        onChange={(e, data) => {
          methods.setValue(options.name, data.validatedValue[0], {
            shouldDirty: true,
          });
        }}
      />
    </>
  );
}
