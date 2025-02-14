import urlFunctions from '../utils/urlFunctions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSection from '../layouts/MainSection';
import { checkVerifyPayment } from '../services/Axios/Requests/Checkout';

export default function CheckCheckout() {
  const navigate = useNavigate('');
  const status = urlFunctions.getParamsFromUrl('Status');
  const authority = urlFunctions.getParamsFromUrl('Authority');
  const res = checkVerifyPayment({ authority, amount: '149000' }).then((res) =>
    res.data,
  ).then(res => res.message);
  console.log(res);
  useEffect(() => {
    !status && !authority && navigate('/');
  }, [status, authority, navigate]);

  return (
    <>
      {status === 'NOK' ? (
        <CheckoutStatus status='failed' />
      ) : (
        <CheckoutStatus status='success' />
      )}
    </>
  );
}

function CheckoutStatus({ status }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);
  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    //  navigate('/checkout');
  }, [time]);

  return (
    <div
      className='w-10/12 mx-auto mt-10'
      dir='rtl'>
      <MainSection sectionTitle='پیگیری سفارش'>
        <h1
          className={`${
            status === 'failed' ? 'text-red-500' : 'text-green-500'
          }`}>
          {status === 'failed'
            ? 'سفارش شما با خطا مواجه شد'
            : 'سفارش شما با موفقیت ثبت شد'}
        </h1>
        <div className='w-full my-5'>asdf</div>
        <button onClick={() => navigate('/checkout')}>
          درحال بازگشت به سایت اصلی : {time}
        </button>
      </MainSection>
    </div>
  );
}
