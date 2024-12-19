const mongoose = require('mongoose');
const Admin = require('./adminModel');
const Schema = new mongoose.Schema({
   apiKey: {
      type: String,
      required: true,
      unique: true,
   },
   merchantId: {
      type: String,
      required: true,
      unique: true,
   },
   project: {
      type: String,
      required: true,
   },
})

const SubmitedPayments = mongoose.model('payments', Schema);
module.exports = SubmitedPayments;