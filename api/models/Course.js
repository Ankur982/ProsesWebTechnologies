const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  teacher: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    require: true
  },
  validity: {
    type: Number,
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  postData: {
    type: String,
    default: new Date().toLocaleDateString()
  }

}, { timestamps: true });


module.exports = mongoose.model("Course", courseSchema);