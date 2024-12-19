const JalaliMoment = require('jalali-moment');
const Order = require('./../models/orderModel');

exports.getOrders = async (req, res) => {
   const { userId, projectId, limit, page, startDate, endDate } = req.query;
   const currentPage = page * 1 || 10;
   const pageLimit = limit * 1 || 10;
   const skip = (currentPage - 1) * pageLimit;
   try {
      let query = {};
      if (userId) {
         query.userId = userId;
      } else if (projectId) {
         query.projectId = projectId;
         if (startDate !== 'false' && endDate !== 'false') {
            query.createdAt = {
               $gte: new Date(`${startDate}T00:00:00`),
               $lt: new Date(`${endDate}T23:59:59`)
            }
         }
      }
      const aggregationPipeline = [
         { $match: query },
         { $group: { _id: null, count: { $sum: 1 } } }
      ];
      const [totalOrdersCount] = await Order.aggregate(aggregationPipeline);
      const userOrders = await Order.find(query).sort({ createdAt: 'desc' }).skip(skip).limit(pageLimit);
      return res.status(200).json({
         totalOrdersCount,
         orders: userOrders
      });
   } catch (error) {
      return res.status(404).json('خطایی در دریافت سفارشات پیش آمد');
   }
}

exports.addOrder = async (req, res) => {
   const { amount, items, userId, projectId, type, isCash } = req.body;
   try {
      const jalaliCurrentDateTime = new JalaliMoment();
      const iranCurrentDate = jalaliCurrentDateTime.format('jYYYY-jMM-jDD HH:mm:ss');
      const newOrder = await Order.create({ items, amount, createdAt: iranCurrentDate, userId, projectId, type, isCash });
      return res.status(201).json('سفارش با موفقیت ثبت شد');
   } catch (error) {
      return res.status(404).json('خطایی در دریافت سفارشات پیش آمد');
   }
}
