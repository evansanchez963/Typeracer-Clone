const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");

exports.createAccount = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists)
      return next(errorResponse("Username already exists!", 400));

    const emailExists = await User.findOne({ email: email });
    if (emailExists)
      return next(errorResponse("Email is already in use!", 400));

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT, 10));
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      typing_sessions: [],
    });

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(errorResponse("Please provide a username and password.", 400));

  try {
    const user = await User.findOne({ username: username }).select("+password");
    if (!user) return next(errorResponse("Invalid credentials.", 401));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(errorResponse("Invalid credentials.", 401));

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {});
  return res.status(statusCode).json({ success: true, id: user._id, token });
};
