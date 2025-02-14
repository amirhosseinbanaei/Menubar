import SkeletonLoading from '../../Loaders/Skeleton';
import buttons from '../../Buttons/buttons';
export default function FavoriteCard({ itemData, handler }) {
  return (
    <div className='w-full h-auto p-3 flex flex-col gap-5 rounded-lg shadow-xl bg-white'>
      <SkeletonLoading.Image
        imageOptions={{
          src: `${itemData.image}`,
          className: 'aspect-square rounded',
        }}
      />
      <buttons.secondary
        handler={handler}
        buttonValue={'حذف'}
      />
    </div>
  );
}
