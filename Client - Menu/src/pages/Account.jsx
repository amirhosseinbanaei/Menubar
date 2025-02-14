// Input Option Data
import { AccountPageInputData } from '../components/Input/InputData';

// Contexts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// UI Containers
import InputContainer from '../components/Input/InputContainer';

// Hooks
import useLoginUser from '../hooks/useLoginUser';

// Third Party Library
import { useForm } from 'react-hook-form';
import MainSection from '../layouts/MainSection';
import { PrimaryButton, SecondaryButton } from '../components/Button';

export default function Account() {
  useLoginUser({
    shouldNavigate: true,
    navigate: '/login',
    backRef: 'account',
  });

  const { currentUser, logout } = useContext(AuthContext);
  const methods = useForm({
    defaultValues: async () => {
      if (currentUser) {
        return {
          fullName: currentUser.fullName,
          phoneNumber: currentUser.phoneNumber,
          email: currentUser.email,
        };
      }
    },
  });
  return (
    <MainSection sectionTitle='ویرایش اطلاعات کاربری'>
      <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {AccountPageInputData.map((eachInputData) => {
          return (
            <InputContainer
              key={eachInputData.id}
              options={eachInputData}
              methods={methods}
            />
          );
        })}
      </form>
      <div className='w-full my-5 flex justify-end gap-x-5'>
        <SecondaryButton
          buttonValue={'خروج از حساب'}
          handler={logout}
        />
        <PrimaryButton buttonValue={'ویرایش اطلاعات'} />
      </div>
    </MainSection>
  );
}
