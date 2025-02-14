import SkeletonLoading from '../../Loaders/Skeleton';

export default function HorizentalItemLoading() {
  return (
    <div className='w-full h-auto flex p-2 shadow-xl rounded-xl hover:scale-105 transition-all duration-700 duration-400 hover:cursor-pointer my-2'>
      <div className='w-20 h-20'>
        <SkeletonLoading.Image />
      </div>
      <div className='w-2/3 h-auto px-3 gap-y-1 flex flex-col relative'>
        <SkeletonLoading.Title />
        <SkeletonLoading.Text count={2} />
      </div>
    </div>
  );
}
