const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('express-async-handler')
const geocoder = require('../utils/geocode');

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access PUBLIC
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    const reqQuery = { ...req.params }

    // Fields to exclude during filtering
    const removeFields = ['select'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //Create operators like gte, gt, lt, in etc
    //Doing this to manipulate the query and add $ to gte, gt as its needed
    let query;
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    console.log(queryStr);

    query = Bootcamp.find(JSON.parse(queryStr));

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);

    }

    const bootcamps = await query;

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


// @desc Get bootcamp within Radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //divide by earth 
    const radius = distance / 6378;
    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: { $centerSphere: [[lng, lat], radius] }
        }
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
});