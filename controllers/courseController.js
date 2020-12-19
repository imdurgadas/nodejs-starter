const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('express-async-handler')

// @desc Get all Courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @access PUBLIC
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        //populaate entire bootcamp within course
        //query = Course.find().populate('bootcamp');

        //get courses, populate bootcamp but only name description
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        course: courses.length,
        data: courses
    })
});