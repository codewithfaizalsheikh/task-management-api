const errorHandler = (err, req, res, next) => {
  console.log("Error middleware called");
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};

module.exports = errorHandler;
