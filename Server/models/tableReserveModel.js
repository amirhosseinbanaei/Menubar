const mongoose = require("mongoose");

const schema = new mongoose.Schema({
   phoneNumber: {
      type: String,
      required: true
   },
   fullName: {
      type: String,
      required: true
   },
   persons: {
      type: Number,
      required: true
   },
   project: {
      type: String,
      required: true
   },
   date: {
      type: String,
      required: true
   },
   time: {
      type: String,
      required: true
   }
}
);

const TableReserve = mongoose.model("table reserves", schema);

module.exports = TableReserve;