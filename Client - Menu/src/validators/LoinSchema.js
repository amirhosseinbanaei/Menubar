import * as yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const loginValidationSchema = yup.object().shape({
   phoneNumber: yup.string().required('Phone number is required').matches(phoneRegExp, 'Phone number is not valid'),
   digit1: yup.string(),
   digit2: yup.string(),
   digit3: yup.string(),
   digit4: yup.string()
});