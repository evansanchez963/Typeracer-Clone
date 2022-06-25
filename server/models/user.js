const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
  user_name: {
    type: String, 
    required: [true, "Please provide a username."], 
    unique: true
  },
  password: {
    type: String, 
    required: [true, "Please provide a password."],
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  typing_sessions: [{
    type: Schema.Types.ObjectId, 
    ref: "Typing Session"
  }]
})

// Export model
module.exports = mongoose.model("User", UserSchema)