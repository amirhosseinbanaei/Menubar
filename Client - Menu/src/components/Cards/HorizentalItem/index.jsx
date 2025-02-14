import { Link } from 'react-router-dom';

// Utils :
import urlFunctions from '../../../utils/urlFunctions';
import { splitNumber } from '../../../utils/splitNumber';

// Loading Component :
import SkeletonLoading from '../../Loaders/Skeleton';

// hooks :
import useLocalStorage from '../../../hooks/useLocalStorage';
import useExistingCartItem from '../../../hooks/useExistingCartItem';

// Contexts :
import { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { CartContext } from '../../../contexts/CartContext';

// Components :
import buttons from '../../Buttons/buttons';

// Icons :
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

function AddItemButton({ itemData }) {
  const { language } = useContext(LanguageContext);
  const { addToCart } = useContext(CartContext);
  const [isExistingItem, setIsExisting] = useExistingCartItem(
    itemData.name[language],
  );
  const buttonHandler = () => {
    addToCart({
      ...itemData,
      quantity: 1,
    });
    return setIsExisting(true);
  };
  return (
    <>
      {!isExistingItem ? (
        <buttons.icon
          icon={<PlusCircleIcon className='w-7 h-7 text-primary-500' />}
          handler={buttonHandler}
        />
      ) : (
        <buttons.icon
          icon={<CheckCircleIcon className='w-7 h-7 text-[#6fe260]' />}
        />
      )}
    </>
  );
}

export default function HorizentalItem({ itemData, id }) {
  const { language } = useContext(LanguageContext);
  const [direction] = useLocalStorage('Direction');
  const { t } = useTranslation();
  return (
    <div className='w-full h-auto flex p-2 shadow-xl rounded-xl hover:scale-105 transition-all duration-700 duration-400 hover:cursor-pointer'>
      <div className='w-1/3 h-full flex items-center relative'>
        <SkeletonLoading.Image
          imageOptions={{
            src: itemData.image,
            className: 'aspect-square rounded-lg',
          }}
        />
      </div>

      <div className='w-2/3 h-auto flex flex-col relative'>
        <Link
          to={`/item/${urlFunctions.addDashed(
            itemData.name[language],
          )}?id=${id}`}>
          <span className='w-full py-1 px-2 flex flex-col gap-y-1'>
            <h1 className='text-typography-700 text-sm md:text-base font-bold tracking-none'>
              {itemData.name[language]}
            </h1>
            <div className='h-8'></div>

            <p className='text-typography-500 line-clamp-2 text-[12.8px] md:text-[13.3px] leading-[23px] tracking-none'>
              {itemData.itemDescription[language]}
            </p>
          </span>
        </Link>
        <div
          className={`w-full h-8 flex justify-between items-center ${
            direction === 'rtl' ? 'pr-3' : 'pl-3'
          }`}>
          <p className='text-primary-500'>
            {splitNumber(itemData.price)}
            <span
              className={`text-[12.5px] ${
                direction === 'rtl' ? 'mr-1' : 'ml-1'
              }`}>
              {t('components.itemCard.yeka')}
            </span>
          </p>
          <AddItemButton itemData={itemData} />
        </div>
      </div>
    </div>
  );
}
