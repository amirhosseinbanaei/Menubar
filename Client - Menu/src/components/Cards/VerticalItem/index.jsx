import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { splitNumber } from '../../../utils/splitNumber';
import urlFunctions from '../../../utils/urlFunctions';
import SkeletonLoading from '../../Loaders/Skeleton';
import { LanguageContext } from '../../../contexts/LanguageContext';

export default function VerticalItem({ itemData, id }) {
  const { language } = useContext(LanguageContext);
  return (
    <div
      className='mx-auto sm:flex-none xl:mb-0'
      aria-label={`${itemData[language].name}-card`}>
      <div
        className='relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-700 duration-400'
        aria-label='sub-card-container'>
        <div className='flex-auto px-4 pt-3 pb-5'>
          <div className='flex flex-col items-center gap-y-2'>
            <Link
              to={`/item/${urlFunctions.addDashed(
                itemData[language].name,
              )}?id=${id}`}
              className='w-full flex flex-col items-center gap-y-5'>
              {itemData.image && (
                <div className='w-[240px] h-[240px] relative'>
                  <SkeletonLoading.Image
                    imageOptions={{
                      src: `${itemData.image}`,
                      alt: `${itemData[language].name} item`,
                      className: 'w-full rounded-xl h-auto absolute top-1',
                    }}
                  />
                </div>
              )}
              <span className='w-10/12 flex flex-col items-center justify-center gap-y-3'>
                <h1 className='text-typography-700 font-bold tracking-none'>
                  {itemData[language].name}
                </h1>
                <p className='text-typography-500 text-center text-[13.3px] leading-6 tracking-none'>
                  {itemData[language].cardDescription}
                </p>
              </span>
            </Link>
            <div className='w-full mt-1 z-20 h-auto px-2 flex justify-between items-center'>
              <p className='text-primary-500'>
                {splitNumber(itemData.price)}
                <span
                  className={`text-[12.5px] ${
                    language === 'fa' || language === 'ar'
                      ? 'mr-[4px]'
                      : 'ml-[4px]'
                  }`}>
                  {language === 'fa' || language === 'ar' ? 'تومان' : 'Toman'}
                </span>
              </p>
              {/* <AddItemButton itemData={itemData} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
