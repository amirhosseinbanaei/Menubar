import requestConfig from "../Configs/config";

export const checkVerifyPayment = async (paymentData) => {
   return await requestConfig.post('/checkout/check', paymentData).then(res => res.data)
}