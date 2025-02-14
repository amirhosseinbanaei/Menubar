import { useTranslation } from 'react-i18next';

export default function PaymentWayCard({ data, onChangeHandler, paymentWay }) {
  const { t } = useTranslation();
  return (
    <button
      className={`w-32 h-20 shadow-xl rounded-xl  ${
        paymentWay === data.title && 'outline outline-primary-500'
      }`}
      onClick={() => onChangeHandler(data.title)}>
      <div className='w-full h-2/6 flex justify-center items-end pb-1'>
        <h1 className='font-medium text-sm text-typography tracking-none'>
          {t(`pages.checkout.${data.title}`)}
        </h1>
      </div>
      {/* <div className='h-4/6 w-full flex justify-center'>
        <img
          src={`${data.image}`}
          className='h-full w-auto'
          alt=''
        />
      </div> */}
    </button>
  );
}
