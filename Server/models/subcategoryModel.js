const mongoose = require("mongoose");
const translationSchema = new mongoose.Schema({
   name: { type: String, trim: true },
});

const schema = new mongoose.Schema({
   fa: translationSchema,
   en: translationSchema,
   ar: translationSchema,
   categoryId: {
      type: String,
      required: true
   }
}
);

const subcategory = mongoose.model("subcategory", schema);

module.exports = subcategory;