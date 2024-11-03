// Define the custom error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
  
    // Set default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      error: message,
    });
  };
  
  module.exports = errorHandler;
  