import { useForm } from 'react-hook-form';
import MainSection from '../../layouts/MainSection';
import { orderedItemPageInputs } from '../../data/InputsData';
import InputContainer from '../Input/InputContainer';
import FormButton from '../Form/FormButton';
import { useMemo } from 'react';
import CustomDatePicker from '../Input/DatePicker';
import { getOrders } from '../../services/Axios/Requests/Orders';
import { digitsFaToEn } from 'persian-tools';
export default function FilterOrderedItem() {
  const methods = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  });

  const filterOrderedItemHandler = async (e) => {
    e.preventDefault();
    const startDate = digitsFaToEn(
      methods.getValues('startDate').split('/').join('-'),
    );
    const endDate = digitsFaToEn(
      methods.getValues('endDate').split('/').join('-'),
    );
    const req = await getOrders({
      projectId: '6504c2827f588b6c80b4a02b',
      page: 1,
      limit: 2,
      startDate,
      endDate,
    });
    console.log(req.data);
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
            ctaButton={{ title: 'فیلتر کن', handler: filterOrderedItemHandler }}
          />
        </span>
      </form>
    </MainSection>
  );
}
