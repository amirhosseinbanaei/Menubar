import { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import SkeletonLoading from '../../Loaders/Skeleton';
import useLocalStorage from '../../../hooks/useLocalStorage';
export default function CategroyCard({
  handler,
  categoryData,
  activeCategoryData,
  index,
}) {
  const { language } = useContext(LanguageContext);
  const [direction] = useLocalStorage('Direction');
  return (
    <>
      <div
        id={`tab-item-${index}`}
        onClick={() => handler(categoryData, index)}
        className={`flex hover:cursor-pointer items-center shadow gap-x-3 p-2 rounded-[100px] ${
          activeCategoryData._id === categoryData._id
            ? 'bg-primary-500'
            : 'bg-white'
        }`}>
        <div className='w-10 h-10 rounded-full'>
          <SkeletonLoading.Rounded
            imageOptions={{
              src: `${categoryData.image}`,
              className: 'w-full h-full rounded-full',
            }}
          />
        </div>
        <h1
          className={`text-[13.5px] md:text-[14.2px] font-semibold flex-shrink-0 whitespace-nowrap tracking-none 
          ${direction == 'rtl' ? 'ml-2' : 'mr-2'}
          ${
            activeCategoryData._id === categoryData._id
              ? 'text-white'
              : 'text-typography-700'
          }
          `}>
          {categoryData.name[language]}
        </h1>
      </div>
    </>
  );
}
