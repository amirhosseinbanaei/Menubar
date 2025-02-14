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
      accept={options.accept}
      {...methods.register(options.name)}
      placeholder={t(`input.placeholder.${options.name}`)}
      className={`block text-sm w-full px-5 py-3 mt-2 text-typography-700 placeholder:text-typography-500 placeholder:text-sm focus:ring-0 bg-white border border-gray-200 rounded-xl focus:outline-primary-500 ${
        customStyle && customStyle
      }`}
    />
  );
}

export default Input;
