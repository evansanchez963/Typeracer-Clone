const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const errorResponse = require("../utils/errorResponse")

exports.createAccount = async (req, res, next) => {

  const {email, username, password} = req.body

  try {

    // Hash password
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALT, 10))

    const user = await User.create({
      email: email, 
      username: username, 
      password: hash,
      typing_sessions: []
    })

    sendToken(user, 201, res)
  } catch (err) {
    next(err)
  }

}

exports.login = async (req, res, next) => {

  const { username, password } = req.body

  if(!username || !password) {
    return next(errorResponse("Please provide a username and password.", 400))
  }

  try {
    const user = await User.findOne({ username }).select("+password")

    if(!user) {
      return next(errorResponse("Invalid credentials.", 401))
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return next(errorResponse("Invalid credentials.", 401))
    }

    sendToken(user, 201, res)
  } catch(err) {
    next(err)
  }
  
}

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route")
}

exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route")
}

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES })
  res.status(statusCode).json({ success: true, token })
}
