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

    //Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token
    });
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

    //Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token
    });
});