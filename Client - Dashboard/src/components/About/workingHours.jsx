import { useForm } from 'react-hook-form';
import MainSection from '../../layouts/MainSection';
import CustomTimePicker from '../Containers/TimePicker';
import { aboutPageWorkingHoursInputs } from '../../data/InputsData';

export default function WorkingHours() {
  const methods = useForm();

  return (
    <MainSection sectionTitle='ساعت کاری مجموعه'>
      <div className='grid grid-cols-1 pb-5 md:grid-cols-2 gap-x-6 gap-y-8'>
        {aboutPageWorkingHoursInputs.map((inputData) => {
          return (
            <CustomTimePicker
              key={inputData.id}
              methods={methods}
              options={inputData}
            />
          );
        })}
      </div>
    </MainSection>
  );
}
