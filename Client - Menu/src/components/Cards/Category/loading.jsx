import SkeletonLoading from '../../Loaders/Skeleton';

export default function CategroyCardLoading() {
  return (
    <>
      <div
        className={`flex hover:cursor-pointer items-center shadow p-2 rounded-[100px] `}>
        <div className='w-10 h-10 rounded-full'>
          <SkeletonLoading.Rounded />
        </div>
        <div className='w-20 h-6 mb-1 pb-1 mx-2'>
          <SkeletonLoading.Title />
        </div>
      </div>
    </>
  );
}
