const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {type: String, required: true, maxlength: 50},
  user_name: {type: String, required: true, maxlength: 50},
  password: {type: String, required: true, maxlength: 50},
  highest_WPM: {type: Number}
})

// Virtual for user's URL
UserSchema
.virtual('url')
.get(() => {
  return '/profile/user/' + this._id
})

// Export model
module.exports = mongoose.model('User', UserSchema)