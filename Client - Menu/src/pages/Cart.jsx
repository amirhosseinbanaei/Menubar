import { Link } from 'react-router-dom';
import CartContainer from '../components/Containers/Cart';
import ContinuBuyingContainer from '../components/Cart/ContinuBuyingContainer';
import MainSection from '../layouts/MainSection';
import { PriceTableButton } from '../components/Containers/PriceTable';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import NoticeContainer from '../components/Containers/Notice';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import buttons from '../components/Buttons/buttons';
export default function Cart() {
  const { storageItem } = useContext(CartContext);
  const { t } = useTranslation();
  return (
    <>
      {!storageItem.length ? (
        <NoticeContainer>
          <ShoppingCartIcon className='w-40 h-40 text-typography-500' />
          <h1 className='text-xl font-bold text-typography-500'>
            {t('pages.cart.emptyCart')}
          </h1>
          <Link to={'/'}>
            <buttons.secondary
              buttonValue={
                <h1 className='tracking-none text-primary-500 font-medium text-[14px]'>
                  بازگشت به صفحه اصلی
                </h1>
              }
            />
          </Link>
        </NoticeContainer>
      ) : (
        <div className='w-full h-auto flex flex-col xl:flex-row gap-x-10'>
          <div className='w-full xl:w-10/12 3xl:w-9/12'>
            <CartContainer />
          </div>

          <div className='w-full xl:w-4/12 3xl:w-3/12'>
            <MainSection sectionTitle='کد تخفیف دارید؟'>
              <ContinuBuyingContainer />
              <Link
                to={`/checkout`}
                className='flex justify-center'>
                <PriceTableButton buttonTitle={'ادامه فرآیند خرید'} />
              </Link>
            </MainSection>
          </div>
        </div>
      )}
    </>
  );
}
