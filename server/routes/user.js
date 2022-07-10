const express = require("express")
const router = express.Router()
const { getPrivateData } = require("../controllers/user")
const { protect } = require("../middleware/protect")

// Get private data from specific user.
router.route("/:userId").get(protect, getPrivateData)

module.exports = router