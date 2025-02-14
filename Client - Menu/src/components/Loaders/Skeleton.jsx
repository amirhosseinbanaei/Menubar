import Skeleton from 'react-loading-skeleton';

function Image({ imageOptions }) {
  return (
    <div className={`w-full h-full aspect-square relative`}>
      <Skeleton
        className={`h-full`}
        containerClassName={`flex h-full`}
      />
      {imageOptions && (
        <img
          {...imageOptions}
          loading='lazy'
          onLoad={(e) => e.target.previousSibling.remove()}
        />
      )}
    </div>
  );
}

function Rounded({ imageOptions }) {
  return (
    <div className={`w-full h-full relative`}>
      <Skeleton
        className={`h-full`}
        circle
        containerClassName={`flex h-full`}
      />
      {imageOptions && (
        <img
          {...imageOptions}
          loading='lazy'
          style={{ position: 'absolute', top: 0 }}
          onLoad={(e) => e.target.previousSibling.remove()}
        />
      )}
    </div>
  );
}

function Title() {
  return <Skeleton className='h-6' />;
}

function Text({ count }) {
  return (
    <Skeleton
      className='h-3 leading-1'
      count={count}
    />
  );
}

const SkeletonLoading = {
  Image,
  Title,
  Text,
  Rounded,
};

export default SkeletonLoading;
