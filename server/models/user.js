const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const UserSchema = new Schema({
  email: {
    type: String, 
    required: [true, "Please provide a username."],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide a valid email."
    ]
  },
  username: {
    type: String, 
    required: [true, "Please provide a username."], 
    unique: true
  },
  password: {
    type: String, 
    required: [true, "Please provide a password."],
    select: false
  },
  typing_sessions: [{
    type: Schema.Types.ObjectId, 
    ref: "Typing Session"
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  })
}

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex")

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  // Set token expire to ten minutes
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken
}

// Export model
module.exports = mongoose.model("User", UserSchema)