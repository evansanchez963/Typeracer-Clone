const User = require("../models/User")
const jwt = require("jsonwebtoken")
const errorResponse = require("../utils/errorResponse")

exports.createAccount = async (req, res, next) => {

  const {email, username, password} = req.body

  try {

    const user = await User.create({
      email: email, 
      username: username, 
      password: password,
      typing_sessions: []
    })

    sendToken(user, 201, res)
  } catch (err) {
    next(err)
  }

}

exports.login = async (req, res, next) => {

  const {username, password} = req.body

  if(!username || !password) return next(errorResponse("Please provide a username and password.", 400))
  
  try {
    const user = await User.findOne({ username }).select("+password")

    if(!user) return next(errorResponse("Invalid credentials.", 401))

    const isMatch = await user.matchPassword(password)

    if(!isMatch) return next(errorResponse("Invalid credentials.", 401))

    sendToken(user, 201, res)
  } catch(err) {
    next(err)
  }
  
}

exports.forgotPassword = async (req, res, next) => {
  /*
  const {email} = req.body

  try {
    const user = await User.findOne({email})

    if(!user) return next(errorResponse("Email could not be sent.", 404))

    const resetToken = crypto.randomBytes(20).toString("hex")
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    user.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    await user.save()

    const resetUrl = process.env.RESET_URL + `/passwordreset/${resetToken}`
    const message = `
    <h1>Go to this link to reset your password</h1>
    <a href=${resetUrl} clicktracking=off></a>
    `
  } catch(err) {

  }
  */
  res.send("Forgot Password Route")
}

exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route")
}

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES })
  return res.status(statusCode).json({ success: true, token })
}
