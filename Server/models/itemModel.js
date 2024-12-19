const mongoose = require('mongoose');
const Category = require('./categoryModel');
const User = require('./../models/userModel');
const translationSchema = new mongoose.Schema({
   fa: { type: String, trim: true },
   en: { type: String, trim: true },
   ar: { type: String, trim: true },
   fr: { type: String, trim: true },
});

const itemSchema = new mongoose.Schema({
   name: translationSchema,
   itemDescription: translationSchema,
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
   },
   price: {
      type: Number,
      required: true,
   },
   discount: {
      type: Number,
      required: true,
      default: 0
   },
   available: {
      type: Boolean,
      required: true,
      default: true
   },
   hideItem: {
      type: Boolean,
      required: true,
      default: false
   },
   subCategory: {
      type: String,
      required: true,
   },
   unit: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   project: {
      type: String,
      required: true
   },
   ratings: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
         },
         rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
         },
      },
   ],
   tags: Array
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item;