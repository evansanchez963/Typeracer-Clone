const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {type: String, required: true, maxlength: 50, unique: true},
  user_name: {type: String, required: true, maxlength: 50, unique: true},
  password: {type: String, required: true, maxlength: 50},
  typing_sessions: [{type: Schema.Types.ObjectId, ref: 'Typing Session'}]
})

// Virtual for user's URL
UserSchema
.virtual('url')
.get(() => {
  return '/profile/user/' + this._id
})

// Export model
module.exports = mongoose.model('User', UserSchema)