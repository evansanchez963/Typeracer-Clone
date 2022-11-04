const mongoose = require("mongoose");

const connectDB = () => {
  console.log("Connecting to database...");
  mongoose.connect(
    process.env.ATLAS_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) console.log(`Error connecting to database: ${error}`);
      else console.log("Successfully connected to database");
    }
  );
};

module.exports = connectDB;
