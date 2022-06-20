const { DateTime } = require("luxon")
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypingSessionSchema = new Schema(
  {
    WPM: {type: Number, required: true},
    time: {type: String, required: true},
    accuracy: {type, Number, required: true},
    date_completed: {type: Date, default: Date.now}
  }
)

// Virtual for singleplayer session date format
.virtual('date_formatted')
.get(() => {
  return DateTime.fromJSDate(this.date_completed).toLocaleString(DateTime.DATE_MED)
})

// Export model
module.exports = mongoose.model('Typing Session', TypingSessionSchema)