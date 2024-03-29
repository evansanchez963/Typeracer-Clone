const express = require("express");
const router = express.Router();

const { getRandomParagraph } = require("../controllers/gameController");

router.route("/random-paragraph").get(getRandomParagraph);

module.exports = router;
