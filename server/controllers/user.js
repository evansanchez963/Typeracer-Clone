const User = require("../models/User")
const TypingSession = require("../models/TypingSession")
const errorResponse = require("../utils/errorResponse")

// Get user's username and email.
exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if(!user) return next(errorResponse("This user does not exist!", 400))

    return res.status(200).json({ 
      success: true, 
      username: user.username, 
      email: user.email
    })
  } catch (err) {
    next(err)
  }
}

// Get user's avg. WPM, best WPM, and number of races.
exports.getUserStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if(!user) return next(errorResponse("This user does not exist!", 400))

    const avgWPM = user.typing_sessions.reduce((avg, value, _, { length }) => {
      return (avg + value.WPM / length).toFixed()
    }, 0)
    const highestWPM = user.typing_sessions.length ? Math.max(...user.typing_sessions.map(value => value.WPM)) : 0
    const raceCount = user.typing_sessions.length

    return res.status(200).json({ 
      success: true, 
      avgWPM: avgWPM,
      highestWPM: highestWPM,
      raceCount: raceCount
    })
  } catch (err) {
    next(err)
  }
}

// Push a typing session object to a specific user's typing session array.
exports.updateUserSessions = async (req, res, next) => {
  const { WPM, time, accuracy } = req.body

  try {
    const typingSession = await TypingSession.create({
      WPM: WPM,
      time: time,
      accuracy: accuracy
    })
  
    await User.findByIdAndUpdate(req.params.userId, { $push: { typing_sessions: typingSession } })
    
    return res.status(201).json({ success: true })
  } catch (err) {
    next(err)
  }
}

// Replace a user's typing session array with an empty one.
exports.resetUserStats = async (req, res, next) => {
  const { arr } = req.body
  try {
    await User.findByIdAndUpdate(req.params.userId, { typing_sessions: arr })

    return res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
}

// Delete a user document in the Mongo Atlas database by user ID.
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId)

    return res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
}