const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

    let error = { ...err };
    error.message = err.message;
    error.stack = err.stack;

    //Mongoose Bad Object Id Handling
    if (err.name === 'CastError') {
        const message = `Resource not found with id: ${err.value}`;
        error = new ErrorResponse(message, 404, err.stack)
    }

    //Mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400, err.stack)
    }

    //Mongoose Validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400, err.stack);
    }


    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : null
    })
}

module.exports = errorHandler;