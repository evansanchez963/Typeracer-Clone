const Paragraph = require("../models/Paragraph");
const errorResponse = require("../utils/errorResponse");

exports.getRandomParagraph = async (req, res, next) => {
  try {
    const paragraph = await Paragraph.aggregate([{ $sample: { size: 1 } }]);
    if (!paragraph)
      return next(errorResponse("Could not find a paragraph.", 404));

    return res.status(200).json({
      success: true,
      text: paragraph[0].text,
    });
  } catch (err) {
    next(err);
  }
};
