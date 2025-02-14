import InputContainer from '../Input/InputContainer';
import { cutomersClubInputs } from '../../data/InputsData';
import FormButton from '../Form/FormButton';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { searchUser } from '../../services/Axios/Requests/User';
import { useForm } from 'react-hook-form';
import { searchUserSchema } from '../../validators/CustomerSearchSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useMemo } from 'react';
const CustomerSearchBar = memo(function CustomerSearchBar({ setSearchedUser }) {
  const methods = useForm({
    resolver: yupResolver(searchUserSchema),
    defaultValues: {
      searchUser: '',
    },
  });
  const searchUserHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (methods.getValues('searchUser')) {
        searchUser({ phoneNumber: methods.getValues('searchUser') }).then(
          (res) => {
            setSearchedUser(res.data[0]);
          },
        );
      }
    },
    [methods, setSearchedUser],
  );
  return (
    <div className='w-full h-auto mb-5 flex flex-col md:flex-row gap-x-5'>
      <div className='w-full md:w-8/12 lg:w-9/12 xl:w-10/12'>
        {useMemo(() => {
          return (
            <InputContainer
              options={cutomersClubInputs[0]}
              methods={methods}
            />
          );
        }, [methods.watch('searchUser')])}
      </div>
      <div className='w-full md:w-4/12 lg:w-3/12 xl:w-2/12 h-full flex md:pt-4 gap-3'>
        {useMemo(() => {
          return (
            <FormButton
              formState={methods.formState}
              ctaButton={{ title: 'جستوجو', handler: searchUserHandler }}
            />
          );
        }, [methods.formState, searchUserHandler])}

        {useMemo(() => {
          return (
            <button
              type='click'
              onClick={() => {
                setSearchedUser(false);
                methods.setValue('searchUser', '');
              }}
              className='primary-button h-11 mt-5 px-5 border-red-600 text-red-600 border'>
              <ArrowUturnLeftIcon className='w-5 h-5' />
            </button>
          );
        }, [setSearchedUser, methods])}
      </div>
    </div>
  );
});

export default CustomerSearchBar;
