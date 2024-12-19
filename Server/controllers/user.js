const createError = require("http-errors");
const User = require('./../models/userModel');
const { validatePhoneNumber, validateUser } = require('../validators/validator');
const { generateRandomNumber, setAccessToken, setRefreshToken, deleteObjectProperty } = require('../utils/functions');

const { getOne, updateOne, createOne } = require('../utils/databaseFunctions');

exports.getOTP = async (req, res) => {
   try {
      const { phoneNumber } = req.body;

      const { error } = validatePhoneNumber({ phoneNumber });
      if (error) return res.status(400).json(error);

      const otpCode = generateRandomNumber(6);
      const otp = {
         code: otpCode,
         expiresIn: Date.now() + 90 * 1000
      }

      const user = await getOne(User, { phoneNumber });

      if (!user) {
         await createOne(User, { phoneNumber, otp })
      } else {
         await updateOne(User, { phoneNumber }, { otp })
      }

      res.status(200).json({ phoneNumber, code: otpCode });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: {
            fa: 'شماره موبایل یافت نشد',
            en: 'Not found phone number'
         }
      });
   }
}

exports.checkOTP = async (req, res) => {
   try {
      const { phoneNumber, code } = req.body;

      const { error } = validatePhoneNumber({ phoneNumber });
      if (error) {
         return res.status(400).json(error);
      }

      const user = await User.findOne({ phoneNumber });

      if (!user) {
         return res.status(404).json(createError.NotFound({
            fa: 'چنین کاربری یافت نشد',
            en: 'Not found user'
         }))
      }

      if (user.otp.code != code) {
         return res.status(400).json(createError.BadRequest({
            fa: 'کد ارسال شده صحیح نمی باشد',
            en: 'Invalid Code'
         }))
      }

      if (Date.now() > new Date(`${user.otp.expiresIn}`).getTime()) {
         return res.status(400).json(createError.BadRequest({
            fa: 'کد اعتبار سنجی منقضی شده است',
            en: 'Code has been expire'
         }))
      }

      await setAccessToken(res, user);
      await setRefreshToken(res, user);

      res.status(200).json({
         message: {
            fa: 'ورود شما با موفقیت انجام شد',
            en: 'Entered Successfully',
         },
         data: {
            user: deleteObjectProperty(user.toObject(), ['otp', '__v'])
         }
      })
   } catch (error) {
      return res.status(500).json({
         message: {
            fa: 'شماره موبایل یافت نشد',
            en: 'Not found phone number'
         }
      });
   }
}

exports.completeProfile = async (req, res) => {
   try {
      const {phoneNumber} = req.body
      const { error } = validateUser(req.body);
      if (error) res.status(400).json(error);

      const user = await getOne(User, { phoneNumber });

      if (!user) res.status(404).json(createError({
         fa: 'کاربری با این شماره همراه یافت نشد',
         en: 'Not found user with this phone number'
      }))
      const newUser = await updateOne(User, { phoneNumber }, req.body);
      res.status(200).json({
         message: {
            fa: 'اطلاعات حساب کاربری شما بروز شد',
            en: 'Profile information has been updated'
         },
         data: {
            user: deleteObjectProperty(newUser.toObject(), ['otp','__v'])
         }
      })
   } catch (error) {
      return res.status(500).json(createError('Server Error'));
   }
};

exports.getUsers = async (req, res) => {
   const { limit, page, startDate, endDate } = req.query;
   const currentPage = page * 1;
   const pageLimit = limit * 1;
   const skip = (currentPage - 1) * pageLimit;
   try {
      let query = { 'projects.name': req.headers.project };
      const aggregationPipeline = [
         { $match: query },
         { $group: { _id: null, count: { $sum: 1 } } }
      ];
      const [totalUsersCount] = await User.aggregate(aggregationPipeline);
      const users = await User.find(query).skip(skip).limit(pageLimit);
      return res.status(200).json({
         totalUsersCount,
         users
      });
   } catch (error) {
      return res.status(404).json('خطایی در دریافت سفارشات پیش آمد');
   }
};

exports.searchUser = async (req, res) => {
   try {
      const { phoneNumber } = req.query;
      console.log(phoneNumber)
      const results = await User.find({ phoneNumber });
      res.status(200).json(results);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
}