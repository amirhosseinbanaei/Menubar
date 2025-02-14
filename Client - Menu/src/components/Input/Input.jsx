import { useTranslation } from 'react-i18next';
function Input({
  methods,
  options = { type: 'text', name: 'name' },
  customStyle,
}) {
  const { t } = useTranslation();
  return (
    <input
      name={options.name}
      type={options.type}
      {...methods.register(options.name)}
      placeholder={t(`input.placeholder.${options.name}`)}
      className={`block text-sm w-full px-5 py-3 mt-2 text-typography-700 placeholder:text-typography-500 placeholder:text-sm focus:ring-0 bg-white border border-gray-200 rounded-xl focus:outline-primary-500 ${
        customStyle && customStyle
      }`}
    />
  );
}

export default Input;

// import { memo } from 'react';
// import { useTranslation } from 'react-i18next';

// const Input = memo(function Input({
//   registerHookForm,
//   values,
//   options = { type: 'text', name: 'name', placeholder: 'input' },
// }) {
//   const { t } = useTranslation();
//   return (
//     <input
//       type={options.type}
//       name={options.name}
//       {...registerHookForm(`${options.name}`)}
//       value={values[options.name] || ' '}
//       placeholder={t(`input.placeholder.${options.name}`)}
//       className='block text-sm w-full px-5 py-3 mt-2 text-typography-700 placeholder:text-typography-500 placeholder:text-sm focus:ring-0 focus:outline-0 bg-white border border-gray-200 rounded-xl'
//     />
//   );
// });

// export default Input;
