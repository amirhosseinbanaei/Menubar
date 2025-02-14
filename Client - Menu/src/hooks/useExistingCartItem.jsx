import { useContext, useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { LanguageContext } from '../contexts/LanguageContext';

export default function useExistingCartItem(currentItemName) {
  const { language } = useContext(LanguageContext);
  const [storageItem] = useLocalStorage('cart');
  const [isExisting, setIsExisting] = useState(false);
  useEffect(() => {
    (async () => {
      const findExistingItem =
        storageItem &&
        storageItem.find((allCartItems) => {
          return allCartItems[language].name === currentItemName;
        });
      !findExistingItem ? setIsExisting(false) : setIsExisting(true);
    })();
  }, [currentItemName]);
  const isExistingItem = isExisting && isExisting;
  return [isExistingItem, setIsExisting];
}
