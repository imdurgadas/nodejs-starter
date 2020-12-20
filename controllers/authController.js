const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('express-async-handler')

// @desc Regiser User
// @route POST /api/v1/auth/register
// @access PUBLIC
exports.register = asyncHandler(async (req, res, next) => {

    const { name, email, password, role } = req.body;

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



//Get token from model , create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    return res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })
}