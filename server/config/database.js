const mongoose = require("mongoose")

const connectDB = () => {
  mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  console.log("Successfully connected to MongoDB.")
}

module.exports = connectDB