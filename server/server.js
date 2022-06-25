const express = require("express")
const cors = require("cors")

// Routers
const createAccountRouter = require("./routes/create-account")
const loginRouter = require("./routes/login")
const userRouter = require("./routes/user")

const app = express()

require("dotenv").config({ path: "./config.env" })
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/create-account", createAccountRouter)
app.use("/login", loginRouter)
app.use("/user/:id", userRouter)

// get driver connection
const dbo = require("./database/connection")
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err)
 
  })
  console.log(`Server is running on port: ${port}`)
})