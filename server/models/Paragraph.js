const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paragraphSchema = new Schema({
  text: {
    type: String,
  },
});

module.exports = mongoose.model("Paragraph", paragraphSchema);
