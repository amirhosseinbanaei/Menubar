const mongoose = require("mongoose");

const schema = new mongoose.Schema({
   items: Array,
   authority: {
      type: String
   },
   type: {
      type: String,
      required: true
   },
   amount: {
      type: String,
      required: true
   },
   userId: {
      type: String,
      required: true
   },
   project: {
      type: String,
      required: true
   },
   isCash: {
      type: Boolean,
      required: true,
   },
   createdAt: {
      type: Date,
      required: true
   }
}
);

const Order = mongoose.model("orders", schema);

module.exports = Order;