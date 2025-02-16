import * as yup from 'yup';
export const loginValidationSchema = yup.object().shape({
   email: yup.string().required('Email is required').email('Invalid email'),
   password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});