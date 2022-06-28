const User = require("../models/User")
const bcrypt = require("bcryptjs")
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

    return res.status(201).json({
      success: true,
      user,
    })

  } catch (err) {
    next(err)
  }

}

exports.login = async (req, res) => {

  const { username, password } = req.body

  if(!username || !password) {
    return next(errorResponse(400, "Please provide a username and password."))
  }

  try {
    const user = await User.findOne({ username }).select("+password")

    if(!user) {
      return next(errorResponse(401, "Invalid credentials."))
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return next(errorResponse(401, "Invalid credentials."))
    }

    return res.status(200).json({
      success: true,
      user,
    })
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