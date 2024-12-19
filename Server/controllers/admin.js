const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");
const Project = require('../models/projectModel');
const { setAccessToken, setRefreshToken, deleteObjectProperty } = require('../utils/functions');
const { validateAdmin } = require('../validators/validator')
exports.register = async (req, res) => {
   try {
      const { error } = validateAdmin(req.body);
      if (error) {
         console.log(error);
         return res.status(404).json(error);
      }
      const planStartDate = new Date().toISOString();
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const admin = await Admin.create({
         ...req.body,
         planStartDate,
         password: hashedPassword,
      });

      await setAccessToken(res, admin);
      await setRefreshToken(res, admin);

      return res.status(201).json({ status: 'success', message: 'ادمین جدید اضافه شد .' });
   } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 'failed', message: 'در فرآیند ثبت نام خطایی رخ داد !', error });
   }
};

exports.login = async (req, res) => {
   const { email, password } = req.body;

   const admin = await Admin.findOne({ email });

   if (!admin) {
      return res.status(404).json({
         message: {
            fa: "کاربری با این نام کاربری وجود ندارد",
            en: 'Not found user with this user name'
         }, errorType: 'usernameError'
      });
   }

   const isPasswordValid = await bcrypt.compare(password, admin.password);

   if (!isPasswordValid) {
      return res.status(400).json({
         message: {
            fa: "پسورد وارد شده صحیح نیست",
            en: 'Invalid password'
         },
         errorType: 'passwordError'
      });
   }

   const adminObject = admin.toObject();
   const projectData = await Project.findOne({ name: adminObject.projectName });

   const newAdminObject = deleteObjectProperty(admin.toObject(), ['maxDays', 'giftDays', 'phoneNumber', '__v', 'password', 'planStartDate']);

   const planEndDate = new Date(admin.planStartDate);
   planEndDate.setDate(planEndDate.getDate() + admin.maxDays + admin.giftDays);
   const currentDate = new Date();
   const remainingDays = Math.max(0, Math.ceil((planEndDate - currentDate) / (1000 * 60 * 60 * 24)));

   newAdminObject['remainingDays'] = remainingDays

   await setAccessToken(res, adminObject);
   await setRefreshToken(res, adminObject);

   return res.json({ data: newAdminObject, userData: adminObject, projectData });
};