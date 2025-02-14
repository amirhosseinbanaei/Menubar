import { useContext, useEffect, useMemo, useState } from 'react';
import useReactQuery from '../hooks/useReactQuery';
import { getOrders } from '../services/Axios/Requests/Orders';
import { AuthContext } from '../contexts/AuthContext';
import MainSection from '../layouts/MainSection';
import OrderCard from '../components/Ordered Item/OrderCard';
import Pagination from '../components/Navigation/Pagination';
import OrderRowContainer from '../components/Ordered Item/OrderRowContainer';
import { useForm } from 'react-hook-form';
import { digitsFaToEn, digitsEnToFa } from 'persian-tools';
import { orderedItemPageInputs } from '../data/InputsData';
import InputContainer from '../components/Input/InputContainer';
import CustomDatePicker from '../components/Input/DatePicker';
import FormButton from '../components/Form/FormButton';
import { BouncingLoaderWithContainer } from '../components/Loaders/Bouncing';

function FilterOrderedItem({ setFilterDate }) {
  const methods = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  });

  const filterOrdereHandler = async (e) => {
    e.preventDefault();
    return await setFilterDate({
      startDate: digitsFaToEn(
        methods.getValues('startDate').split('/').join('-'),
      ),
      endDate: digitsFaToEn(methods.getValues('endDate').split('/').join('-')),
    });
  };
  return (
    <MainSection sectionTitle='فیلتر سفارش ها'>
      <form
        encType='multipart/form-data'
        className='grid grid-cols-1 gap-5 md:grid-flow-col'>
        <div className='flex flex-col md:flex-row w-full gap-x-5 gap-y-8'>
          {useMemo(() => {
            return orderedItemPageInputs.map((inputData) => {
              return (
                <InputContainer
                  key={inputData.id}
                  options={inputData}
                  customInput={
                    <CustomDatePicker
                      options={inputData && inputData}
                      methods={methods}
                    />
                  }
                />
              );
            });
          }, [methods])}
        </div>

        <span className='h-auto md:h-1 md:mt-3'>
          <FormButton
            formState={methods.formState}
            ctaButton={{ title: 'فیلتر کن', handler: filterOrdereHandler }}
          />
        </span>
      </form>
    </MainSection>
  );
}

export default function OrderedItems() {
  const { currentUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDate, setFilteredDate] = useState({});
  const {
    mainData: orderedItems,
    isLoading,
    refetch,
  } = useReactQuery(['orderedItems', currentPage], getOrders, {
    projectId: currentUser.projectId,
    page: currentPage,
    limit: 10,
    startDate: filteredDate?.startDate || false,
    endDate: filteredDate?.endDate || false,
  });

  useEffect(() => {
    refetch();
  }, [filteredDate]);

  const changePageHandler = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {isLoading ? (
        <BouncingLoaderWithContainer />
      ) : (
        <>
          <FilterOrderedItem setFilterDate={setFilteredDate} />
          <MainSection
            sectionTitle={
              filteredDate?.startDate
                ? ` سفارش های ثبت شده از تاریخ ${digitsEnToFa(
                    filteredDate.startDate.replaceAll('-', '/'),
                  )}`
                : 'سفارش های ثبت شده'
            }>
            {orderedItems && (
              <>
                <div className='w-full flex mx-auto flex-col gap-y-5'>
                  {orderedItems.orders.map((eachOrderedData) => {
                    return (
                      <OrderRowContainer
                        key={eachOrderedData._id}
                        page={currentPage}
                        eachOrderedData={eachOrderedData}>
                        {eachOrderedData?.items.map(
                          (eachOrderedItems, index) => {
                            const key = eachOrderedData._id + index;
                            return (
                              <>
                                <OrderCard
                                  key={key}
                                  oderedItemsData={eachOrderedItems}
                                />
                              </>
                            );
                          },
                        )}
                      </OrderRowContainer>
                    );
                  })}
                </div>

                <Pagination
                  currentPage={currentPage}
                  dataLength={
                    orderedItems && orderedItems.totalOrdersCount.count
                  }
                  changePageHandler={changePageHandler}
                />
              </>
            )}
          </MainSection>
        </>
      )}
    </>
  );
}
