const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],

  rank: {
    type: String,
    required: true,
  },
  joining_date: {
    type: Date,
    required: true,
  },
  resources: [
    {
      type: String,
    },
  ],
  projects: [
    {
      type: String,
    },
  ],
  contribution_point: {
    type: Number,
    default: 0,
  },
  badges: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
