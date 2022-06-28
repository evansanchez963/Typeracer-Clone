require("dotenv").config({ path: "./config.env" })

const express = require("express")
const connectDB = require("./config/database")
const errorHandler = require("./middleware/error")

// Connect to database.
connectDB()

const app = express()

app.use(express.json())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/private", require("./routes/private"))
app.use(errorHandler)

const port = process.env.PORT || 3000
 
const server = app.listen(port, () => console.log(`Server is running on port: ${port}`))

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})