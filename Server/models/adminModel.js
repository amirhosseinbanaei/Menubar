const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
   fullName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      lowercase: true
   },
   phoneNumber: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   projectName: {
      type: String,
      required: true
   },
   projectNameFa: {
      type: String,
      required: true
   },
   languages: {
      type: Array,
      required: true
   },
   domain: {
      type: String,
      required: true
   },
   plan: {
      type: String,
      enum: ['didari', 'plan-two'],
      required: true
   },
   planStartDate: {
      type: Date,
      required: true
   },
   giftDays: {
      type: Number,
      default: 0,
   },
   role: {
      type: String,
      enum: ['ADMIN'],
      default: 'ADMIN',
   },
   maxDays: {
      type: Number,
      default: 30,
   },
})

const SubmitedAdmin = mongoose.model('admins', Schema);
module.exports = SubmitedAdmin;