require("dotenv").config({ path: "./config.env" })
const express = require("express")
const app = express()

app.use(express.json())
app.use("/api/auth", require("./routes/auth"))

// get driver connection
const port = process.env.PORT || 3000
const dbo = require("./database/connection")
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer((err) => {
    if (err) console.error(err)
  })
  console.log(`Server is running on port: ${port}`)
})