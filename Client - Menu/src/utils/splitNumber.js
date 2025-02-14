import { digitsEnToFa } from 'persian-tools';

export function splitNumber(n) {
   const getLanguage = localStorage.getItem('language');
   return (getLanguage === 'fa' || getLanguage === 'ar') ? digitsEnToFa(n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}