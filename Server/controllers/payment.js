const Payment = require('./../models/paymentModel');

exports.GetProjectPayment = async (req, res) => {
   const projectPayment = await Payment.findOne({ project: req.params.project })
   return res.status(200).json(projectPayment)
}

exports.CreatePayment = async (req, res) => {
   const { apiKey, merchantId, project } = req.body;
   await Payment.create({
      apiKey,
      merchantId,
      project,
   });
   return res.status(201).json({ message: 'درگاه پرداخت ایجاد شد .' })
}