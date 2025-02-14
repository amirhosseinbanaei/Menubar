// import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../validators/LoginSchema';
// import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormButton from '../components/Form/FormButton';
import InputContainer from '../components/Input/InputContainer';
import { LanguageContext } from '../contexts/LanguageContext';
import { loginAdmin } from '../services/Axios/Requests/Admin';
export default function Login() {
  const { login, currentUser } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate('');
  useEffect(() => {
    currentUser && navigate('/');
  }, []);

  const methods = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const data = methods.getValues();
    try {
      toast.loading('درحال ورود به حساب کاربری ...');
      const req = await loginAdmin(data);
      if (req.status === 200) {
        toast.dismiss();
        login(req.data);
        toast.success('با موفقیت به حساب کاربری خود وارد شدید .');
        navigate('/');
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div
        className='h-screen bg-white flex flex-col justify-center items-center'
        dir={language === 'fa' ? 'rtl' : 'ltr'}>
        <div className='bg-white w-96 shadow-xl rounded p-5'>
          <h1 className='text-center font-medium tracking-normal my-5'>
            به پنل ادمین منوبار خوش آمدید
          </h1>
          <form className='space-y-5'>
            {useMemo(() => {
              return (
                <InputContainer
                  methods={methods}
                  options={{ type: 'text', name: 'email' }}
                />
              );
            }, [methods, methods.getValues('email')])}
            {useMemo(() => {
              return (
                <InputContainer
                  methods={methods}
                  options={{ type: 'password', name: 'password' }}
                />
              );
            }, [methods, methods.getValues('password')])}
            {useMemo(() => {
              return (
                <FormButton
                  formState={methods.formState}
                  ctaButton={{ title: 'وارد شوید', handler: onSubmitForm }}
                />
              );
            }, [methods.formState, onSubmitForm])}
          </form>
        </div>
      </div>
    </>
  );
}
