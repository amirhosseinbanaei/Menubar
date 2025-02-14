import { useRef, memo } from 'react';
import cards from '../Cards/cards';

const CategoryContainer = memo(function CategoryContainer({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const tabMenuRef = useRef(null);
  const handler = (categoryData, index) => {
    const tabMenu = tabMenuRef.current;
    const tabItem = tabMenu.querySelector(`#tab-item-${index}`);
    setSelectedCategory(categoryData);
    if (tabMenu && tabItem) {
      const containerWidth = tabMenu.offsetWidth;
      const itemOffsetLeft = tabItem.offsetLeft;
      const itemWidth = tabItem.offsetWidth;
      const scrollOffset = itemOffsetLeft - containerWidth / 2 + itemWidth / 2;

      tabMenu.scrollTo({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className='white-container sticky top-0 pt-3 z-110'>
        <div
          ref={tabMenuRef}
          className='flex sticky z-40 top-2 gap-x-4 overflow-x-auto pb-3 px-4 no-scrollbar'>
          {!categories
            ? Array.from({ length: 6 }).map((_, index) => {
                return (
                  <cards.category.loading key={`loadingCategroyCard-${index}`} />
                );
              })
            : categories.map((eachCategory, index) => {
                return (
                  <cards.category.main
                    index={index}
                    handler={handler}
                    key={eachCategory._id}
                    categoryData={eachCategory}
                    activeCategoryData={selectedCategory}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
});

export default CategoryContainer;
