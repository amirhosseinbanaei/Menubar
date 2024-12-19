const Admin = require('../models/adminModel');

const checkSubscription = async (req, res, next) => {
   const projectName = req.headers.project;
   try {
      const admin = await Admin.findOne({ projectName });
      const planEndDate = new Date(admin.planStartDate);
      planEndDate.setDate(planEndDate.getDate() + admin.maxDays + admin.giftDays);
      if (new Date() > planEndDate) {
         return res.status(403).json({ message: 'Subscription expired' });
      } else {
         return next()
      }
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = checkSubscription;