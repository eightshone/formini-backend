const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    trim: true
  },
  cover_url: {
    type: String,
    trim: true
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  instructors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Course = new mongoose.model("Course", courseSchema);

module.exports = Course;