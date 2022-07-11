const express = require("express")
const router = express.Router()
const { getUserInfo, getUserStats } = require("../controllers/user")
const { protect } = require("../middleware/protect")

/* These are operations that only authenticated users can perform. */

// Get private data from specific user.
router.route("/:userId").get(protect, getUserInfo)

// Get avg. WPM, highest WPM, and number of races from specific user.
router.route("/:userId/stats").get(protect, getUserStats)

module.exports = router