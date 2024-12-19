const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
   author: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      required: true,
   },
   commentText: {
      type: String,
      required: true,
      trim: true
   },
   itemId: {
      type: String,
      required: true
   },
})

const SubmitedComment = mongoose.model('comments', Schema);
module.exports = SubmitedComment;