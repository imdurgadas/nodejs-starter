const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.session.user) {
        return next();
    } else if (req.headers.authorization && req.header.authorization.startsWith('Bearer')) {
        token = req.header.authorization.split(' ')[1]
        //Make sure token exists
        if (!token) {
            return next(new ErrorResponse('Not authorized', 401, {}));
        }

        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.session.user = decoded;
        next();
    } else {
        return next(new ErrorResponse('Not authorized', 401, {}));
    }
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${user.req.role} not authorized to access the route`, 403, {}))
        }
        next();
    }
}