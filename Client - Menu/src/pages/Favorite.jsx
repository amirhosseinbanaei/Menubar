import toast from 'react-hot-toast';
import useLocalStorage from '../hooks/useLocalStorage';
import MainSection from '../layouts/MainSection';
import cards from '../components/Cards/cards';
export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useLocalStorage('Favorites');

  const removeHandler = (itemId) => {
    const filteredItem = favoriteItems.filter(
      (eachItem) => eachItem._id !== itemId,
    );
    setFavoriteItems(filteredItem);
    toast.success('آیتم از لیست علاقه مندی حذف شد');
  };
  return (
    <>
      <MainSection sectionTitle='لیست علاقه مندی های شما'>
        <div className='w-full h-auto grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {favoriteItems.map((eachItem) => {
            return (
              <cards.favorite.main
                key={eachItem._id}
                itemData={eachItem}
                handler={removeHandler}
              />
            );
          })}
        </div>
      </MainSection>
    </>
  );
}
