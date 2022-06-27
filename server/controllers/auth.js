const { MongoClient } = require("mongodb")
const client = new MongoClient(process.env.ATLAS_URI)
const User = require("../models/User")
const bcrypt = require("bcryptjs")

exports.createAccount = async (req, res, next) => {

  const {email, username, password} = req.body

  try {
    const database = client.db("Typeracer_Clone_Database")
    const collection = database.collection("users")

    // Hash password
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALT, 10))

    const user = new User({
      email: email, 
      username: username, 
      password: hash,
      typing_sessions: []
    })

    await collection.insertOne(user)

    res.status(201).json({
      success: true,
      user,
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }

}

exports.login = async (req, res, next) => {

  const { username, password } = req.body

  if(!username || !password) {
    res.status(400).json({ success: false, error: "Please provide a username and password." })
  }

  try {
    const database = client.db("Typeracer_Clone_Database")
    const collection = database.collection("users")

    const user = collection.findOne({ username }).select("+password")

    if(!user) {
      res.status(404).json({ 
        success: false, 
        error: "Invalid credentials"
      })
    }

    const isMatch = bcrypt.compare(password, user.password)

    if(!isMatch) {
      res.status(404).json({
        success: false,
        error: "Invalid credentials"
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch(err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
  
}

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route")
}

exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route")
}