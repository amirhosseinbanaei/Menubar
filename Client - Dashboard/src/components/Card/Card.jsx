import { Link } from 'react-router-dom';
// import Modal from '../Overlays/Modal';
import modals from '../Overlays/Modals';
export default function Card({ id, name, image, href }) {
  return (
    <div className='w-11/12 mx-auto sm:flex-none xl:mb-0'>
      <div className='relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border'>
        <div className='flex-auto px-4 py-5'>
          <div className='flex flex-col items-center gap-y-5'>
            {image ? (
              <img
                src={`${image}`}
                className='w-full rounded-xl h-auto'
                alt=''
              />
            ) : (
              <span className='w-12 rounded-xl h-auto'></span>
            )}
            <p className='text-gray-600'>{name}</p>
            <div className='w-8/12 flex justify-center gap-x-3'>
              <modals.pure
                title='حذف' customButtonStyle='text-xxs px-3 py-2 primary-button
                text-white bg-red-500 shadow-sm'>
                <p className='text-gray-600 text-right'>حذف دسته بندی</p>
                <p className='text-gray-700 text-center my-2 text-sm'>
                  آیا از حذف این دسته بندی مطمئن هستید ؟
                </p>
              </modals.pure>
              <Link to={`/${href}/${name.replaceAll(' ', '-')}?id=${id}`}>
                <button
                  type='button'
                  className='text-xxs px-3 py-2 primary-button bg-blue-500 text-white shadow-sm'>
                  ویرایش
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
