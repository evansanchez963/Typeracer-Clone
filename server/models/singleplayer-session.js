const { DateTime } = require("luxon")
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SingleplayerSessionSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // Reference to associated user
    WPM: {type: Number, required: true},
    date_completed: {type: Date, default: Date.now}
  }
)

// Virtual for singleplayer session date format
.virtual('date_formatted')
.get(() => {
  return DateTime.fromJSDate(this.date_completed).toLocaleString(DateTime.DATE_MED)
})

// Export model
module.exports = mongoose.model('Singleplayer Session', SingleplayerSessionSchema)