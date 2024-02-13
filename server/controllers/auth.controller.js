const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //create a token
    const token = createToken(user._id);
    console.log(token);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const signUpUserController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);
    //create a token
    const token = createToken(user._id);
    res.status(200).json({ username, email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { loginUserController, signUpUserController };
