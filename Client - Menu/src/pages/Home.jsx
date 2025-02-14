import { useEffect, useState } from 'react';

// Containers :
import ItemsContainer from '../components/Containers/Items';
import CategoryContainer from '../components/Containers/Category';

// API Calling : 
import useReactQuery from '../hooks/useReactQuery';
import { getItems } from '../services/Axios/Requests/Items';
import { getCategories } from '../services/Axios/Requests/Category';

export default function Home() {
  const { mainData: categories, isLoading: isLoadingCategories } =
    useReactQuery('Categories', getCategories);
  const { mainData: items } = useReactQuery('Items', getItems);
  const [selectedCategory, setSelectedCategory] = useState(-1);

  useEffect(() => {
    if (categories && selectedCategory === -1) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  return (
    <>
      <CategoryContainer
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ItemsContainer
        category={
          !isLoadingCategories && selectedCategory !== -1 && selectedCategory
        }
        items={items}
      />
    </>
  );
}
