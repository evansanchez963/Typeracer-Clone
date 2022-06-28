const errorResponse = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  if(err.code === 11000) {
    const message = "Duplicate Field Value Enter"
    error = errorResponse(message, 400)
  }

  if(err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message)
    error = errorResponse(message, 400)
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  })

}

module.exports = errorHandler