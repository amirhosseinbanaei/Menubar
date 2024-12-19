const mongoose = require("mongoose");

const schema = new mongoose.Schema({
   name: {
      fa: { type: String, trim: true },
      en: { type: String, trim: true },
      ar: { type: String, trim: true },
      fr: { type: String, trim: true },
   },
   subCategory: {
      type: Array,
   },
   image: {
      type: String,
      required: true,
   },
   project: {
      type: String,
      required: true
   }
}
);

const Category = mongoose.model("categories", schema);

module.exports = Category;