const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TypingSessionSchema = new Schema({
  WPM: {
    type: Number, 
    required: true
  },
  time: {
    type: String, 
    required: true
  },
  accuracy: {
    type: Number, 
    required: true
  },
  date_completed: {
    type: Date, 
    default: Date.now
  }
})

// Export model
module.exports = mongoose.model("Typing Session", TypingSessionSchema)