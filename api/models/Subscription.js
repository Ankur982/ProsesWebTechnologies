const mongoose = require("mongoose");


const SubscriptionSchema = new mongoose.Schema({

  name: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },

}, { timestamps: true });


module.exports = mongoose.model("Subscription", SubscriptionSchema);