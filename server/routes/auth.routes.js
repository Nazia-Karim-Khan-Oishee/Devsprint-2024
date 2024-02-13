const express = require("express");
const router = express.Router();
const {
  loginUserController,
  signUpUserController,
} = require("../controllers/auth.controller");
router.post("/login", loginUserController);
router.post("/signUp", signUpUserController);
module.exports = router;
