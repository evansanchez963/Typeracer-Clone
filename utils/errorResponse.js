const errorResponse = (message, statusCode) => {
  return { message, statusCode };
};

module.exports = errorResponse;
