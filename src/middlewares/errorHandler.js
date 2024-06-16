function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error for debugging

  // Respond with an appropriate error status and message
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
}

module.exports = errorHandler;
