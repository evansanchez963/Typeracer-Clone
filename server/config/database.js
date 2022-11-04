const mongoose = require("mongoose");

const connectDB = () => {
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
