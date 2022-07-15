const express = require("express");
const router = express.Router();

const {
  createAccount,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.route("/createaccount").post(createAccount);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

module.exports = router;
