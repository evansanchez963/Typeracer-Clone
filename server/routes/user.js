const express = require("express")
const router = express.Router()
const { getUserInfo } = require("../controllers/user")
const { protect } = require("../middleware/protect")

/* These are operations that only authenticated users can perform. */

// Get private data from specific user.
router.route("/:userId").get(protect, getUserInfo)

module.exports = router