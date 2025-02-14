// import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../validators/LoinSchema';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  reciveAuthCode,
  verifyAuthCode,
} from '../services/Axios/Requests/Auth';
import { useState } from 'react';
import OTPForm from '../components/Authentication/OTP';
export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate('');
  const [searchParams] = useSearchParams();
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '']);
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmitForm = async (data) => {
    if (data.phoneNumber && !showOtp) {
      try {
        toast.loading('درحال ارسال پیامک ...');
        const isCodeExist = reciveAuthCode(data.phoneNumber);
        isCodeExist.then((codeStatus) => {
          if (codeStatus) {
            toast.dismiss();
            setShowOtp(codeStatus);
          }
        });
      } catch (error) {
        toast.dismiss();
        toast.error(error.response.data.message);
      }
    } else if (data.digit1 !== '' && showOtp) {
      try {
        toast.loading('کمی منتظر بمانید ...');
        const isEnteredCodeTrue = verifyAuthCode(
          data.phoneNumber,
          otp.join(''),
        );
        isEnteredCodeTrue
          .then((enteredCodeStatus) => {
            if (enteredCodeStatus) {
              toast.dismiss();
              login(enteredCodeStatus);
              navigate(
                `/${
                  searchParams.get('back_ref') && searchParams.get('back_ref')
                }`,
              );
            }
          })
          .catch((error) => {
            toast.dismiss();
            toast.error(error.response.data);
          });
      } catch (error) {
        toast.dismiss();
        console.log(error)
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {!showOtp && (
        <div
          className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12'
          dir='rtl'>
          <div className='relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-11/12 md:w-full max-w-lg rounded-2xl'>
            <div className='mx-auto flex w-full max-w-md flex-col space-y-14'>
              <div className='flex flex-col items-center justify-center text-center space-y-2'>
                <div className='font-semibold text-2xl'>
                  <p className='font-bold'>ورود | ثبت نام</p>
                </div>
                <div className='flex flex-row text-sm mt-1 font-medium text-gray-400'>
                  <p>برای ورود یا ثبت نام شماره همراه خود را وارد کنید .</p>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className='flex flex-col space-y-14'>
                    <div className='flex flex-row items-center justify-between mx-auto w-full max-w-xs'>
                      <input
                        className='w-full h-14 flex flex-col items-center justify-center text-center px-5 outline-none rounded-lg text-typography-700 text-lg border border-gray-200 placeholder:text-typography-500 bg-white focus:ring-1 ring-primary-500'
                        {...register('phoneNumber')}
                        type='text'
                        placeholder='شماره همراه'
                        name='phoneNumber'
                        id=''
                      />
                      {errors.phoneNumber && (
                        <p className='text-red-500'>
                          {errors.phoneNumber?.message}
                        </p>
                      )}
                    </div>

                    <ButtonContainer
                      buttonTitle={'تایید و ادامه'}
                      isDirty={isDirty}
                      isSubmitting={isSubmitting}
                      isValid={isValid}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showOtp && (
        <div className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12'>
          <div className='relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-11/12 md:w-full max-w-lg rounded-2xl'>
            <div className='mx-auto flex w-full max-w-md flex-col space-y-16'>
              <div className='flex flex-col items-center justify-center text-center space-y-2'>
                <div className='font-semibold text-3xl'>
                  <p>Email Verification</p>
                </div>
                <div className='flex flex-row text-sm font-medium text-gray-400'>
                  <p>We have sent a code to your email ba**@dipainhouse.com</p>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className='flex flex-col space-y-16'>
                    <div className='flex flex-row items-center justify-between mx-auto w-full max-w-xs'>
                      <OTPForm
                        otp={otp}
                        setOTP={setOTP}
                      />
                    </div>
                    <div className='flex flex-col space-y-5'>
                      <ButtonContainer
                        buttonTitle={'تایید و ادامه'}
                        isDirty={isDirty}
                        isSubmitting={isSubmitting}
                        isValid={isValid}
                      />
                      {/* <div className='flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500'>
                        <p>Didn t recieve code?</p>{' '}
                        <a
                          className='flex flex-row items-center text-blue-600'
                          href='http://'
                          target='_blank'
                          rel='noopener noreferrer'>
                          Resend
                        </a>
                      </div> */}
                    </div>
                  </div>
                </form>
                {/* <DevTool control={control} /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const ButtonContainer = ({ buttonTitle, isDirty, isSubmitting, isValid }) => {
  return (
    <div>
      <button
        className='flex flex-row items-center justify-center text-center w-full border hover:cursor-pointer hover:scale-102 transition-all duration-300 rounded-xl outline-none py-5 bg-primary-500 border-none text-white shadow-sm'
        type='submit'
        disabled={!isDirty || !isValid || isSubmitting}>
        {buttonTitle}
      </button>
    </div>
  );
};
