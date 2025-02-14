import cards from '../Cards/cards';
import MainSection from '../../layouts/MainSection';
import { memo, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
const ItemsContainer = memo(function ItemContainer({ category, items }) {
  const { language } = useContext(LanguageContext);
  console.log(items)
  const filteredItems =
    items && items.filter((eachItem) => eachItem.category._id === category._id);
  return (
    <>
      <MainSection {...(category && { sectionTitle: category.name[language] })}>
        <div className='flex flex-col md:items-start gap-y-5'>
          {category &&
            category['subCategory'].map((eachSubCategory) => {
              return (
                <div
                  key={eachSubCategory[language]}
                  className='w-full mb-5 flex flex-col gap-y-5'>
                  <div className='w-full h-auto flex justify-center items-center gap-x-3'>
                    <span className='w-8 h-[2px] rounded bg-primary-500'></span>
                    <h1 className='text-xl font-bold tracking-normal text-typography-700'>
                      {eachSubCategory[language]}
                    </h1>
                    <span className='w-8 h-[2px] rounded bg-primary-500'></span>
                  </div>

                  <div
                    key={eachSubCategory}
                    className='w-full grid grid-cols-1 sm-custom:grid-cols-2 md:grid-cols-2 2xl-custom:grid-cols-3 3xl:grid-cols-4 gap-3'>
                    {!items
                      ? Array.from({ length: 12 }).map((_, index) => {
                          return (
                            <cards.horizentalItem.loading
                              key={`loadingCard-${index}`}
                            />
                          );
                        })
                      : filteredItems.map((eachItem) => {
                        console.log(eachSubCategory.id, eachItem['subCategory'])
                          return (
                            eachItem['subCategory'] ===
                              eachSubCategory.id && (
                              <cards.horizentalItem.main
                                key={eachItem._id}
                                id={eachItem._id}
                                itemData={eachItem}
                              />
                            )
                          );
                        })}
                  </div>
                </div>
              );
            })}
        </div>
      </MainSection>
    </>
  );
});

export default ItemsContainer;
