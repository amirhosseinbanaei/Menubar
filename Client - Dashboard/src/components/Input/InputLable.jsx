import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const InputLable = memo(function InputLable({ label = 'لییبل تستی' }) {
  const { t } = useTranslation();
  return (
    <label
      className={`block tracking-none font-medium mb-2 mx-1 text-sm text-typography-500`}>
      {t(`input.label.${label}`)}
    </label>
  );
});

export default InputLable;
