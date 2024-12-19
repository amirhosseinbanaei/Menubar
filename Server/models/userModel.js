const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
   fullName: {
      type: String,
      trim: true,
   },
   phoneNumber: {
      type: String,
      trim: true,
      required: true,
   },
   otp: {
      code: { type: Number, default: 0},
      expiresIn: { type: Date, default: 0},
   },
   projects: [
      {
         name: {
            type: String,
            trim: true,
         },
         orders: {
            type: Number,
            default: 0,
         },
      },
   ],
})

const SubmitedUsers = mongoose.model('users', Schema);
module.exports = SubmitedUsers;