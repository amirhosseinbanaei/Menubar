import { useContext } from 'react';

// Layout
import MainSection from '../layouts/MainSection';

// Components
import { BouncingLoaderWithContainer } from '../components/Loaders/Bouncing';

// Custom Hooks
import useReactQuery from '../hooks/useReactQuery';

// Data
import { LanguageContext } from '../contexts/LanguageContext';
import { getItems } from '../services/Axios/Requests/Items';
import Card from '../components/Card/Card';

export default function Items() {
  const { mainData, isLoading: isLoadingCategories } = useReactQuery(
    'Items',
    getItems,
  );
  const { language } = useContext(LanguageContext);
  return (
    <>
      {isLoadingCategories ? (
        <BouncingLoaderWithContainer />
      ) : (
        <MainSection
          sectionTitle='آیتم ها'
          linkButton={{ title: 'اضافه کردن آیتم', href: '/items/add' }}>
          <div className='px-5 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-y-5 mt-10'>
            {mainData &&
              mainData?.map((eachItem) => {
                return (
                  <Card
                    key={eachItem._id}
                    id={eachItem._id}
                    name={eachItem[language].name}
                    image={eachItem.image}
                    href='items'
                  />
                );
              })}
          </div>
        </MainSection>
      )}
    </>
  );
}
