import * as Yup from 'yup';

const phoneRegex = /^0\d{10}$/;

export const searchUserSchema = Yup.object().shape({
  searchUser: Yup.string().matches(
    phoneRegex,
    'شماره وارد شده صحیح نمی باشد'
  ),
});