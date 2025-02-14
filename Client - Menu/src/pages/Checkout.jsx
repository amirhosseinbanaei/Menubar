import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { PriceTableButton } from '../components/Containers/PriceTable';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { defaultData } from '../data/default';
import ContinuBuyingContainer from '../components/Cart/ContinuBuyingContainer';
import MainSection from '../layouts/MainSection';
import PaymentWayCard from '../components/Containers/PaymentWayCard';
import { addOrder } from '../services/Axios/Requests/Orders';
import CustomTab from '../components/Tab/Tab';
import { useTranslation } from 'react-i18next';

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate('');
  const { currentUser } = useContext(AuthContext);
  const [paymentWay, setPaymentWay] = useState('online');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { finalPrice, storageItem } = useContext(CartContext);
  const tabTitleKeywords = ['order', 'pre-order', 'delivery'];

  useEffect(() => {
    !currentUser && navigate('/login?back_ref=checkout');
  }, [currentUser]);

  const finalStoreItems = () => {
    const finalStoreItemsArr = [];
    storageItem.forEach((eachItem) => {
      return finalStoreItemsArr.push({
        id: eachItem._id,
        fa: eachItem.fa,
        en: eachItem.en,
        price: eachItem.price,
        image: eachItem.image,
        quantity: eachItem.quantity,
      });
    });
    return finalStoreItemsArr;
  };

  const tabOnChangeHandler = async (e) => {
    return setSelectedTabIndex(e);
  };

  const requestBody = {
    projectId: defaultData.projectId,
    amount: finalPrice,
    userId: currentUser._id,
    items: finalStoreItems(),
    type: t(`pages.checkout.${tabTitleKeywords[selectedTabIndex]}`),
    isCash: paymentWay === 'online' ? false : true,
  };

  const checkoutHandler = async () => {
    const inTimePeriod = checkTimeHandler('درحال اتصال به درگاه پرداخت ...');
    if (inTimePeriod) {
      try {
        const req = await axios.post('/checkout/', requestBody);
        req.status === 200 && window.location.replace(`${req.data}`);
        toast.remove();
      } catch (error) {
        toast.dismiss();
        toast.error('اتصال به درگاه پرداخت با خطا مواجه شد');
      }
    }
  };

  const addOrderHandler = async () => {
    // const inTimePeriod = checkTimeHandler('درحال ثبت سفارش ...');
    // if (inTimePeriod) {
    //   try {
    //     const req = await addOrder(requestBody);
    //     if (req.status === 201) {
    //       toast.remove();
    //       toast.success('سفارش شما با موفقیت ثبت شد');
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    try {
      const req = await addOrder(requestBody);
      if (req.status === 201) {
        toast.remove();
        toast.success('سفارش شما با موفقیت ثبت شد');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePaymentWay = (paymentWay) => {
    return setPaymentWay(paymentWay);
  };

  const checkTimeHandler = (successLoadingMessage) => {
    const date = new Date();
    const currentHour = date.getHours();
    const dayWorkingHours = Object.entries(defaultData.workingHours)[0][1];
    if (
      currentHour >= dayWorkingHours.open.split(':')[0] &&
      currentHour <= dayWorkingHours.close.split(':')[0]
    ) {
      toast.loading(successLoadingMessage);
      return true;
    } else {
      toast.error('امکان ثبت سفارش در ساعت های غیر کاری وجود ندارد');
      return false;
    }
  };

  return (
    <>
      {currentUser && (
        <div className='w-full h-auto flex flex-col xl:flex-row gap-10 pb-10'>
          <div className='w-full xl:w-10/12 3xl:w-9/12'>
            <CustomTab
              tabTitleKeywords={tabTitleKeywords}
              onChangeHandler={tabOnChangeHandler}
              selectedIndex={selectedTabIndex}
            />
          </div>
          <div className='w-full xl:w-4/12 3xl:w-3/12'>
            <MainSection sectionTitle='نحوه پرداخت'>
              <div className='w-full flex justify-center mb-3 gap-5'>
                <PaymentWayCard
                  data={{
                    title: 'online',
                    image: '/icons/credit-card.png',
                  }}
                  onChangeHandler={handleChangePaymentWay}
                  paymentWay={paymentWay}
                />
                <PaymentWayCard
                  data={{ title: 'cash' }}
                  onChangeHandler={handleChangePaymentWay}
                  paymentWay={paymentWay}
                />
              </div>
              <ContinuBuyingContainer />
              <PriceTableButton
                buttonTitle={paymentWay === 'online' ? 'پرداخت' : 'ثبت سفارش'}
                handler={
                  paymentWay === 'online' ? checkoutHandler : addOrderHandler
                }
              />
            </MainSection>
          </div>
        </div>
      )}
    </>
  );
}
