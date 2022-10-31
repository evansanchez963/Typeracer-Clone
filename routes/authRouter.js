const express = require("express");
const router = express.Router();

const { createAccount, login } = require("../controllers/authController");

router.route("/createaccount").post(createAccount);

router.route("/login").post(login);

module.exports = router;
