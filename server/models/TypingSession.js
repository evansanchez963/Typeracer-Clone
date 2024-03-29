const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typingSessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  WPM: {
    type: Number,
    default: 0,
  },
  time: {
    type: String,
    default: "00:00",
  },
  accuracy: {
    type: Number,
    default: 0,
  },
  date_completed: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Typing Session", typingSessionSchema);
