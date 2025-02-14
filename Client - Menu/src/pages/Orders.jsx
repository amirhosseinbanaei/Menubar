import OrderCard from '../components/Order/OrderCard';
import useLoginUser from '../hooks/useLoginUser';
import { digitsEnToFa } from 'persian-tools';
import MainSection from '../layouts/MainSection';
import useReactQuery from '../hooks/useReactQuery';
import { getOrders } from '../services/Axios/Requests/Orders';
import { useContext, memo } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Orders() {
  useLoginUser({
    shouldNavigate: true,
    navigate: '/login',
    backRef: 'orders',
  });
  const { currentUser } = useContext(AuthContext);
  const { mainData: orders } = useReactQuery('Orders', getOrders, {
    userId: currentUser._id,
    page: 1,
    limit: 10,
  });
  return (
    <>
      <div className='w-full h-auto'>
        <MainSection sectionTitle='سفارش های ثبت شده'>
          <div className='w-full flex mx-auto flex-col gap-y-5'>
            {orders &&
              orders.orders.map((eachOrderedData) => {
                return (
                  <>
                    <OrderRowContainer eachOrderedData={eachOrderedData}>
                      <div className='w-full h-40 flex pt-1 gap-x-5'>
                        {eachOrderedData?.items.map((eachOrderedItems) => {
                          return (
                            <OrderCard
                              key={eachOrderedData._id}
                              oderedItemsData={eachOrderedItems}
                            />
                          );
                        })}
                      </div>
                    </OrderRowContainer>
                  </>
                );
              })}
          </div>
        </MainSection>
      </div>
    </>
  );
}

const OrderRowContainer = memo(function OrderRowContainer({
  eachOrderedData,
  children,
}) {
  const splitTime = eachOrderedData.createdAt.split('T');
  const orderDate = splitTime[0].replaceAll('-', '/');
  const orderClock = splitTime[1].split('.')[0];
  return (
    <>
      <hr className='h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />
      <div className='w-full h-auto flex flex-col gap-y-3 rounded-lg px-5 pb-3'>
        <div className='w-full h-auto flex items-center justify-between'>
          <div className='w-full h-auto flex gap-x-5 items-center'>
            <h1 className='text-typography-700 mt-1 font-bold text-[15px] tracking-none'>{`سفارش ${digitsEnToFa(
              orderDate,
            )} در ساعت ${digitsEnToFa(orderClock)}`}</h1>
          </div>
        </div>
        <div className='w-full h-auto flex pt-1 gap-x-5'>{children}</div>
      </div>
    </>
  );
});
