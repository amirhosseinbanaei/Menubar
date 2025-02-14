import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function SelectBox({ methods, options, boxOptions }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className='w-full'>
      <select
        className='block text-sm w-full px-5 py-3 mt-2 text-typography-700 placeholder:text-typography-500 placeholder:text-sm focus:ring-0 bg-white border border-gray-200 rounded-xl focus:outline-primary-500'
        {...methods.register(options.name)}>
        <option value='0'>{language === 'fa' ? 'انتخاب نشده' : 'None'}</option>
        {boxOptions && !boxOptions[0].id ?
          boxOptions.map((option, index) => {
            return (
              <option
                key={index}
                value={option}>
                {option}
              </option>
            );
          }): boxOptions.map((option) => {
            return (
              <option
                key={option.id}
                value={option.id}>
                {option.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
