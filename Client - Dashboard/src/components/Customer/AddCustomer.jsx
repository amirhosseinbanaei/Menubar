import { memo, useMemo } from 'react';
import MainSection from '../../layouts/MainSection';
import { useForm } from 'react-hook-form';
import FormButton from '../Form/FormButton';
import { cutomersClubInputs } from '../../data/InputsData';
import InputContainer from '../Input/InputContainer';

const AddCustomer = memo(function AddCustomer() {
  const methods = useForm({
    defaultValues: {
      customerFullName: '',
      phoneNumber: '',
    },
  });
  
  const addCustomerHandler = (e) => {
    e.preventDefault();
    console.log(methods.getValues());
  };
  
  return (
    <MainSection sectionTitle='افزودن مشتری'>
      <form encType='multipart/form-data'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8'>
          {useMemo(() => {
            return cutomersClubInputs.map((inputData) => {
              return (
                inputData.id > 1 && (
                  <InputContainer
                    key={inputData.id}
                    options={inputData}
                    methods={methods}
                  />
                )
              );
            });
          }, [methods])}
        </div>

        <FormButton
          formState={methods.formState}
          ctaButton={{ title: 'افزودن مشتری', handler: addCustomerHandler }}
        />
      </form>
    </MainSection>
  );
});

export default AddCustomer;
