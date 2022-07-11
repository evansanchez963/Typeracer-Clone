const User = require("../models/User")
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