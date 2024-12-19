const Admin = require('./../models/adminModel');
module.exports = async (req, res, next) => {
   const admin = await Admin.findOne({ _id: req.userId })
   if (admin && admin.role === 'ADMIN') return next();

   return res
      .status(403)
      .json({ message: {
         fa: 'شما دسترسی به این فیچر را ندارید !',
         en: "Don't have access to this feature",
      } });
};