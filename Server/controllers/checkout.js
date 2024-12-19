const Payment = require('./../models/paymentModel');
const Order = require('./../models/orderModel');
const ZarinpalCheckout = require('zarinpal-checkout');

exports.checkout = async (req, res) => {
   const { amount, items, project, type, isCash } = req.body;
   const payment = await Payment.findOne({ project: 'menubar' });

   const zarinpal = ZarinpalCheckout.create(payment.merchantId, true);
   zarinpal.PaymentRequest({
      Amount: amount,
      CallbackURL: `${req.headers.origin}/checkout/check`,
      Description: 'A Payment from Node.JS',
      Email: 'hi@siamak.work',
      Mobile: '09120000000'
   }).then(response => {
      if (response.status === 100) {
         Order.create({ items, amount, createdAt: Date.now(), authority: response.authority, userId: '656f990ccc9d3e8d9329395c', project: 'menubar', type, isCash });
         return res.status(200).json(response.url);
      }
   }).catch(error => {
      return res.status(404).json({
         message: 'خطایی در اتصال به درگاه پرداخت پیش آمد',
         error
      })
   });
}

exports.checkCheckout = async (req, res) => {
   const { authority, amount } = req.body;
   const payment = await Payment.findOne({ project: 'menubar' });
   const zarinpal = ZarinpalCheckout.create('11111111-0000-0000-0000-111111110000', false);
   zarinpal.PaymentVerification({
      Amount: amount, // In Tomans
      Authority: authority,
   }).then(response => {
      console.log(response);
      if (response.status === -21) {
         console.log('Empty!');
      } else {
         return res.status(200).json({
            message: {
               en: `Verified! Ref ID: ${response.RefID}`,
               fa: `تایید شد! شماره تراکنش : ${response.RefID}`
            }
         })
      }
   }).catch(err => {
      console.error(err);
      return res.status(404).json({
         message: {
            en: `Not Verified`,
            fa: 'تراکنش تایید نشد'
         }
      })
   });
}