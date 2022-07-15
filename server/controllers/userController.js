const User = require("../models/User");
const TypingSession = require("../models/TypingSession");
const errorResponse = require("../utils/errorResponse");
const { mongoose } = require("mongoose");

// Get user's username and email.
exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorResponse("This user does not exist!", 400));

    return res.status(200).json({
      success: true,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

// Get user's avg. WPM, highest recorded WPM, and number of races.
exports.getUserStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorResponse("This user does not exist!", 400));

    const getAvgWPM = async () => {
      if (!user.typing_sessions.length) return 0;

      const query = await TypingSession.aggregate([
        { $match: { _id: { $in: user.typing_sessions } } },
        {
          $group: {
            _id: user._id,
            avg: { $avg: "$WPM" },
          },
        },
      ]);

      return query[0].avg.toFixed();
    };

    const getHighestWPM = async () => {
      if (!user.typing_sessions.length) return 0;

      const query = await TypingSession.aggregate([
        { $match: { _id: { $in: user.typing_sessions } } },
        {
          $group: {
            _id: user._id,
            max: { $max: "$WPM" },
          },
        },
      ]);

      return query[0].max;
    };

    const avgWPM = await getAvgWPM();
    const highestWPM = await getHighestWPM();
    const raceCount = user.typing_sessions.length;

    return res.status(200).json({
      success: true,
      avgWPM: avgWPM,
      highestWPM: highestWPM,
      raceCount: raceCount,
    });
  } catch (err) {
    next(err);
  }
};

// Push a typing session object to a specific user's typing session array.
exports.updateUserSessions = async (req, res, next) => {
  const { WPM, time, accuracy } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorResponse("This user does not exist!", 400));

    const typingSession = await TypingSession.create({
      user: user,
      WPM: WPM,
      time: time,
      accuracy: accuracy,
    });

    await user.updateOne({
      $push: { typing_sessions: typingSession },
    });

    return res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Replace a user's typing session array with an empty one.
exports.resetUserStats = async (req, res, next) => {
  const { arr } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorResponse("This user does not exist!", 400));

    // Delete all typing sessions associated with user.
    await TypingSession.deleteMany({ user: user._id });

    // Set user's typing sessions to empty array.
    user.typing_sessions = arr;
    await user.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Delete a user document in the Mongo Atlas database by user ID.
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorResponse("This user does not exist!", 400));

    // Delete all typing sessions associated with user.
    await TypingSession.deleteMany({ user: user._id });

    await user.deleteOne();

    return res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
