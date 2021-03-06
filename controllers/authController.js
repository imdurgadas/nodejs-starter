const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator');

// @desc Regiser User
// @route POST /api/v1/auth/register
// @access PUBLIC
exports.register = asyncHandler(async (req, res, next) => {

    const { name, email, password, role } = req.body;

    const errors = validationResult(req);
    console.log('Validation errors', errors);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(`Validation failed`, 422, errors.errors))
    }

    //Create user
    const user = await User.create({
        name, email, password, role
    })

    sendTokenResponse(user, 200, res);
});


// @desc Login User
// @route POST /api/v1/auth/login
// @access PUBLIC
exports.login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    //Validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password'), 400);
    }

    //Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials.'), 401);
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
        return next(new ErrorResponse('Invalid Credentials.'), 401);
    }

    sendTokenResponse(user, 200, res);
});


// @desc Get logged in user
// @route GET /api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = req.user;
    return res.status(200).json({
        success: true,
        data: user
    })
});

exports.logout = asyncHandler(async (req, res, next) => {
    req.user = undefined;
    return res.status(200).json({
        success: true
    });
})


//Get token from model , create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

    //Create token
    const token = user.getSignedJwtToken();
    return res.status(statusCode)
        .json({
            success: true,
            token
        })
}