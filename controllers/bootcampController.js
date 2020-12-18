const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('express-async-handler')

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    const bootcamps = await Bootcamp.find();
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });

});

// @desc Get bootcamp by Id
// @route GET /api/v1/bootcamps/:id
// @access PUBLIC
exports.getBootcampById = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 404, {}));
    }

    return res.status(200).json({
        success: true,
        data: bootcamp
    });
});

// @desc Create bootcamp 
// @route POST /api/v1/bootcamps
// @access PRIVATE
exports.createBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body);
    return res.status(201).json({
        success: true,
        data: bootcamp
    });

});

// @desc Update bootcamp by Id
// @route PUT /api/v1/bootcamps/:id
// @access PUBLIC
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 404, {}));
    }

    return res.status(200).json({
        success: true,
        data: bootcamp
    });

});

// @desc Update bootcamp by Id
// @route DELETE /api/v1/bootcamps/:id
// @access PUBLIC
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.id}`, 404, {}));
    }

    return res.status(200).json({
        success: true,
        data: {}
    });
});