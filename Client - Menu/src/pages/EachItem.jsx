import Comment from '../components/Comment/Comment';

import { BouncingLoaderWithContainer } from '../components/Loaders/Bouncing';
// import ItemPrice from '../components/Item/ItemPrice';
import useReactQuery from '../hooks/useReactQuery';
import { getSingleItem } from '../services/Axios/Requests/Items';
import urlFunctions from '../utils/urlFunctions';
import Rating from '../components/Rating';
import FormButton from '../components/FormButton';
import { useForm } from 'react-hook-form';
import { addComment, getComments } from '../services/Axios/Requests/Comment';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import MainSection from '../layouts/MainSection';
import { PureButton } from '../components/Button';
import { HeartIcon } from '@heroicons/react/24/solid';
import useLocalStorage from '../hooks/useLocalStorage';
export default function EachItem() {
  const itemId = urlFunctions.getParamsFromUrl('id');
  const { currentUser } = useContext(AuthContext);
  const [favoriteItems, setFavoriteItems] = useLocalStorage('Favorites');
  const { mainData: currentItem, isLoading } = useReactQuery(
    ['Items', itemId],
    getSingleItem,
    {
      itemId,
    },
  );
  const {
    mainData: comments,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useReactQuery(['ItemComments', itemId], getComments, { itemId });
  const methods = useForm();
  const submitCommentHandler = async (e) => {
    e.preventDefault();
    const commetData = {
      author: currentUser.fullName,
      commentText: methods.getValues('commentText'),
      itemId,
    };
    const req = await addComment(commetData);
    if (req.status === 201) {
      toast.success('نظر شما باموفقیت ثبت شد');
      refetchComments();
      methods.reset();
    }
    req.response.status === 400 && toast.error('نظر شما قبل ثبت شده است');
    req.response.status === 404 && toast.error('خطایی در ثبت نظر پیش آمد');
  };

  const checkItemIsFavorite = (itemId) => {
    return (
      favoriteItems && favoriteItems.find((eachItem) => eachItem._id === itemId)
    );
  };
  const addFavoriteItemHandler = () => {
    if (!checkItemIsFavorite(itemId)) {
      setFavoriteItems([...favoriteItems, currentItem]);
      toast.success('آیتم به لیست علاقه مندی اضافه شد');
    } else {
      const filteredItem = favoriteItems.filter(
        (eachItem) => eachItem._id !== itemId,
      );
      setFavoriteItems(filteredItem);
      toast.success('آیتم از لیست علاقه مندی حذف شد');
    }
  };
  return (
    <>
      {isLoading ? (
        <BouncingLoaderWithContainer />
      ) : (
        currentItem && (
          <>
            <div className='grid grid-cols-12 gap-5 h-auto relative'>
              <div className='w-full relative col-span-full md:col-span-4 2xl:col-span-3'>
                <div className='w-full h-auto flex flex-col gap-y-5 md:sticky top-5'>
                  <img
                    src={`${currentItem.image}`}
                    className='w-full h-auto xl:max-w-80 2xl:max-w-96 rounded-xl'
                    alt=''
                  />

                  <Rating />
                </div>
              </div>

              <div className='w-full flex flex-col gap-y-5 col-span-full md:col-span-8 2xl:col-span-9 mb-5'>
                <div className='w-full h-auto'>
                  <div className='w-full col-span-full md:col-span-8 xl:col-span-5 flex-none relative flex flex-col p-3 justify-center md:flex-row md:items-start min-w-0 bg-white border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border mx-auto'>
                    <div
                      className='w-full h-auto absolute z-50 left-5 top-4'
                      dir='ltr'>
                      <PureButton
                        customStyle='p-2 shadow-xl border rounded-full'
                        handler={addFavoriteItemHandler}
                        buttonValue={
                          <HeartIcon
                            className={`w-5 h-5 ${
                              checkItemIsFavorite(itemId)
                                ? 'text-red-600 stroke-red-600'
                                : 'text-white stroke-red-600'
                            }`}
                          />
                        }
                      />
                    </div>
                    <div className='w-full py-3 px-4 flex flex-col gap-y-3'>
                      <h6 className='font-bold text-lg'>
                        {currentItem.fa.name}
                      </h6>

                      <p className='text-typography-700 text-sm whitespace-pre-line'>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است
                      </p>

                      <div className='w-full h-auto flex justify-between items-center'>
                        {/* <ItemPrice price={currentItem.price} /> */}
                        {/* <AddItemButtonTwo productData={currentItem} /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <MainSection sectionTitle='نظرات ثبت شده'>
                  <div className='w-full'>
                    <textarea
                      type='text'
                      placeholder='نظر خود را وارد کنید ...'
                      className='primary-input mt-0 h-40 resize-none'
                      {...methods.register('commentText')}
                      name='commentText'
                    />
                  </div>
                  <FormButton
                    formState={methods.formState}
                    ctaButton={{
                      title: 'افزودن نظر',
                      handler: submitCommentHandler,
                    }}
                  />
                  <div className='w-full flex flex-col gap-y-10 px-6'>
                    {isLoadingComments && <BouncingLoaderWithContainer />}
                    {!isLoadingComments &&
                      comments &&
                      comments.map((commentData) => {
                        return (
                          <Comment
                            key={commentData._id}
                            commentData={commentData}
                          />
                        );
                      })}
                  </div>
                </MainSection>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}
