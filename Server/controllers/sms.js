const User = require('../models/userModel');
const { login, register } = require('./user');
const verifications = [];

const response = (res, user, accessToken, refreshToken, message, statusCode = 200) => {
   res.cookie('accessToken', accessToken, { httpOnly: true });
   res.cookie('refreshToken', refreshToken, { httpOnly: true });
   return res.status(statusCode).json({ status: 'success', message, user, accessToken, refreshToken });
}

exports.sendCode = async (req, res) => {
   const { phoneNumber } = req.body;
   try {
      const randomVerifyCode = String(Math.floor(Math.random() * (9999 - 1000)) + 1000);
      const newVerification = {
         phoneNumber,
         verifyCode: randomVerifyCode
      }
      verifications.push(newVerification)
      return res.status(200).json(newVerification);
   } catch (error) {
      return res.status(404).json('خطا در ارسال کد تایید');
   }
}

exports.verifyCode = async (req, res) => {
   const { phoneNumber, verifyCode } = req.body;
   const findVerificationIndex = verifications.findIndex(eachVerification => {
      return eachVerification.phoneNumber === phoneNumber && eachVerification.verifyCode === verifyCode
   });

   if (findVerificationIndex !== -1) {
      const user = await User.findOne({ phoneNumber });
      verifications.splice(findVerificationIndex, 1);
      if (user) {
         if (user.projects['name'] !== req.headers.project) {
            user.projects.push({
               name: req.headers.project,
               orders: 0
            })
            user.save()
         }
         login(user).then(tokens => {
            response(res, user, tokens.accessToken, tokens.refreshToken, 'با موفقیت به حساب خود وارد شدید');
         });

      } else {
         register(phoneNumber, req.headers.project).then(data => {
            response(res, data.newUser, data.accessToken, data.refreshToken, 'حساب شما با موفقیت ایجاد شد', 201);
         })
      }
   } else {
      return res.status(404).json('کد وارد شده صحیح نیست');
   }
}