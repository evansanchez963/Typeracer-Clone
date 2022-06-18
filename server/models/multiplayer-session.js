const { DateTime } = require("luxon")
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MultiplayerSessionSchema = new Schema(
  {
    P1: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    P2: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    WPM_P1: {type: Number, required: true},
    WPM_P2: {type: Number, required: true},
    date_completed: {type: Date, default: Date.now}
  }
)

// Virtual for multiplayer session date format
.virtual('date_formatted')
.get(() => {
  return DateTime.fromJSDate(this.date_completed).toLocaleString(DateTime.DATE_MED)
})

// Export model
module.exports = mongoose.model('Multiplayer Session', MultiplayerSessionSchema)