import { useMemo } from 'react';
import MainSection from '../../layouts/MainSection';
import { aboutPageContactInputs } from '../../data/InputsData';
import InputContainer from '../Input/InputContainer';
import { useForm } from 'react-hook-form';
import FormButton from '../Form/FormButton';
import { editProjectData } from '../../services/Axios/Requests/About';

export default function Socials() {
  const methods = useForm();
  const contactHandler = async (e) => {
     e.preventDefault();
     console.log(methods.getValues());
     await editProjectData({ contact: methods.getValues() });

  };
  return (
    <MainSection sectionTitle='شبکه های اجتماعی'>
      <div className='grid grid-cols-1 py-5 md:grid-cols-2 lg:md:grid-cols-3 gap-x-6 gap-y-8'>
        {useMemo(() => {
          return aboutPageContactInputs.map((inputData) => {
            return (
              <InputContainer
                key={inputData.id}
                methods={methods}
                options={inputData}
              />
            );
          });
        }, [methods])}
      </div>
      <FormButton
        formState={methods.formState}
        ctaButton={{ title: 'ویرایش', handler: contactHandler }}
      />
    </MainSection>
  );
}
