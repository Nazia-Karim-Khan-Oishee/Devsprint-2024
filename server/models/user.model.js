const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
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
  username: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],

  rank: {
    type: String,
    default: "Beginner",
  },
  joining_date: {
    type: Date,
    default: Date.now(),
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

//static signup method
userSchema.statics.signup = async function (username, email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("User with this email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });
  return user;
};
//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
