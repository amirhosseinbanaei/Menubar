import { toast } from 'react-hot-toast';
import requestConfig from "../Configs/config";

export const reciveAuthCode = async (phoneNumber) => {
   const isRecivedCode = requestConfig.post('/sms/send-code', {
      phoneNumber
   }).then(res => {
      res.status === 200 && alert(`کد ورود شما : ${res.data.verifyCode}`);
      return true;
   }).catch(() => false);
   return isRecivedCode;
}

export const verifyAuthCode = (phoneNumber, verifyCode) => {
   const isCorrectCode = requestConfig.post('/sms/verify-code', {
      phoneNumber,
      verifyCode
   }).then(res => {
      res.status === 200 && toast.success(`وارد حساب شدید`);
      res.status === 201 && toast.success(`حساب ساخته شد`);
      return res.data;
   }).catch((error) => {
      toast.error(error.response.data);
      return false
   });
   return isCorrectCode;
}