import MainSection from '../layouts/MainSection';
import CustomDatePicker from '../components/DatePicker';
import InputContainer from '../components/Input/InputContainer';
import { useForm } from 'react-hook-form';
import inputsData from '../data/InputsData';
import CustomTimePicker from '../components/TimePicker';
import FormButton from '../components/FormButton';
import { digitsFaToEn } from 'persian-tools';
import { addTableReserve } from '../services/Axios/Requests/TableReserve';
import toast from 'react-hot-toast';

export default function TableReserve() {
  const methods = useForm({
    defaultValues: {
      date: '',
      time: '',
      fullName: '',
      persons: '',
      phoneNumber: '',
    },
  });
  const tableReserveHandler = async (e) => {
    e.preventDefault();
    toast.loading('درحال رزرو میز ...');
    const date = digitsFaToEn(methods.getValues('date').replaceAll('/', '-'));
    const req = await addTableReserve({
      ...methods.getValues(),
      date,
    });
    if (req.status === 201) {
      toast.dismiss();
      toast.success('رزرو میز با موفقیت انجام شد');
      methods.reset();
    }
  };
  return (
    <MainSection sectionTitle='رزرو میز'>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {inputsData.page.reserveTable.map((currentPageInputData) => {
          return (
            <>
              {currentPageInputData.name !== 'time' &&
                currentPageInputData.name !== 'date' && (
                  <InputContainer
                    key={currentPageInputData.id}
                    methods={methods}
                    options={currentPageInputData}
                  />
                )}
              {currentPageInputData.name === 'date' && (
                <InputContainer
                  key={currentPageInputData.id}
                  options={currentPageInputData}
                  customInput={
                    <CustomDatePicker
                      methods={methods}
                      options={currentPageInputData}
                    />
                  }
                />
              )}
              {currentPageInputData.name === 'time' && (
                <InputContainer
                  key={currentPageInputData.id}
                  options={currentPageInputData}
                  customInput={
                    <CustomTimePicker
                      methods={methods}
                      options={currentPageInputData}
                    />
                  }
                />
              )}
            </>
          );
        })}
      </div>

      <div className='w-full mt-5 flex justify-end'>
        <FormButton
          formState={methods.formState}
          ctaButton={{ title: 'رزرو میز', handler: tableReserveHandler }}
        />
      </div>
    </MainSection>
  );
}
