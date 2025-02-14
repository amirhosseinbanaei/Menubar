import { t } from 'i18next';
export const translationInputErrors = (field, key) => {
   return t(`inputErrors.${field}.${key}`)
}