const User = require("../models/User")
const errorResponse = require("../utils/errorResponse")

exports.getUserInfo = async (req, res, next) => {
  const user = await User.findById(req.params.userId)
  if(!user) return next(errorResponse("User does not exist!", 400))

  return res.status(200).json({ success: true, username: user.username, email: user.email})
}