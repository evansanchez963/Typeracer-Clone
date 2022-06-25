var express = require('express')
var router = express.Router()

const createAccountController = require("../controllers/createAccountController")

router.put("/create-account", createAccountController.createUser)

module.exports = router