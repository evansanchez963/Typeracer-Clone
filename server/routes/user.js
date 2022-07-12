const express = require("express")
const router = express.Router()
const { 
  getUserInfo, 
  getUserStats, 
  updateUserSessions,
  resetUserStats, 
  deleteUser 
} = require("../controllers/user")
const { protect } = require("../middleware/protect")

/* These are operations that only authenticated users can perform. */

// Get private data from specific user.
router.route("/:userId").get(protect, getUserInfo)

// Get avg. WPM, highest WPM, and number of races from specific user.
router.route("/:userId/stats").get(protect, getUserStats)

// Push a typing session to a specific user.
router.route("/:userId/session").put(protect, updateUserSessions)

// Delete a user's progress.
router.route("/:userId/restart").post(protect, resetUserStats)

// Delete a user.
router.route("/:userId/delete").delete(protect, deleteUser)

module.exports = router