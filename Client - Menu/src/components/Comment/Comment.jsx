import { digitsEnToFa } from 'persian-tools';
export default function Comment({ commentData }) {
  const commentDate = digitsEnToFa(commentData.createdAt.split('T')[0].replaceAll('-', '/'));
  return (
    <div className='w-full h-auto flex flex-col gap-y-4'>
      <div className='w-full h-12 flex gap-x-4'>
        <div className='w-12 h-12 rounded-full'>
          <img
            src='https://www.gravatar.com/avatar/6036e55c6302f590d81c2daf19d8c845?d=mp'
            className='w-full h-full rounded-full'
            alt='User avatar'
          />
        </div>
        <div className='flex h-full flex-col justify-center gap-y-2'>
          <h1 className='font-medium text-typography-700 tracking-none'>{commentData.author}</h1>
          <p className='text-typography-500 text-xs'>{commentDate}</p>
        </div>
      </div>
      <p className='text-typography-700 text-sm lg:text-[15px] leading-7'>
        {commentData.commentText}
      </p>
    </div>
  );
}
